import React from 'react'
import { AppProps, AppContext, AppInitialProps } from 'next/app'
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from '@apollo/client'
import { NormalizedCacheObject } from 'apollo-cache-inmemory'
import { FooterLinkProps } from '@island.is/island-ui/core'
import fetch from 'isomorphic-unfetch'
import getConfig from 'next/config'
import { NextComponentType } from 'next'
import * as Sentry from '@sentry/node'
import get from 'lodash/get'
import { RewriteFrames } from '@sentry/integrations'

import appWithTranslation from '../i18n/appWithTranslation'
import initApollo from '../graphql/client'
import Layout from '../layouts/main'
import { withErrorBoundary } from '../units/ErrorBoundary'

interface AppCustomProps extends AppProps {
  layoutProps: {
    footerUpperMenu: FooterLinkProps[]
    footerLowerMenu: FooterLinkProps[]
    footerTagsMenu: FooterLinkProps[]
    footerMiddleMenu: FooterLinkProps[]
    namespace: Record<string, string>
  }
}

interface AppCustomContext extends AppContext {
  apolloClient: ApolloClient<NormalizedCacheObject>
}

const {
  publicRuntimeConfig: { SENTRY_DSN },
  serverRuntimeConfig: { rootDir },
} = getConfig()

if (SENTRY_DSN) {
  const distDir = `${rootDir}/.next`

  Sentry.init({
    integrations: [
      new RewriteFrames({
        iteratee: (frame) => {
          frame.filename = frame.filename.replace(distDir, 'app:///_next')
          return frame
        },
      }),
    ],
    dsn: SENTRY_DSN,
  })
}

const SupportApplication: NextComponentType<
  AppCustomContext,
  AppInitialProps,
  AppCustomProps
> = ({ Component, pageProps, layoutProps, router }) => {
  const { showSearchInHeader } = pageProps
  const lang = router.pathname.startsWith('en') ? 'en' : 'is'

  Sentry.configureScope((scope) => {
    scope.setExtra('lang', lang)

    scope.setContext('router', {
      route: router.route,
      pathname: router.pathname,
      query: router.query,
      asPath: router.asPath,
    })
  })

  Sentry.addBreadcrumb({
    category: 'pages/_app',
    message: `Rendering app for Component "${get(
      Component,
      'name',
      'unknown',
    )}" (${process.browser ? 'browser' : 'server'})`,
    level: Sentry.Severity.Debug,
  })

  return (
    <ApolloProvider client={initApollo(pageProps.apolloState)}>
      <Layout showSearchInHeader={showSearchInHeader} {...layoutProps}>
        <Component {...pageProps} />
      </Layout>
    </ApolloProvider>
  )
}

SupportApplication.getInitialProps = async ({ Component, ctx }) => {
  const apolloClient = initApollo({})

  // healthchecks
  if (ctx.req?.url === '/readiness') {
    // check if we have contact with api
    const { serverRuntimeConfig } = getConfig()
    const { graphqlUrl } = serverRuntimeConfig

    // this will throw when it cant connect, we dont need to know why we cant connect here
    const { status } = await fetch(
      `${graphqlUrl}/.well-known/apollo/server-health`,
    ).catch(() => ({ status: 500 }))

    // forward the api status code as readiness status code
    ctx.res.statusCode = status
    ctx.res.end('')
    return null
  }

  if (ctx.req?.url === '/liveness') {
    ctx.res.statusCode = 200
    ctx.res.end('')
    return null
  }

  const customContext = {
    ...ctx,
    apolloClient,
  }

  const pageProps = (await Component.getInitialProps(customContext)) as any
  const layoutProps = await Layout.getInitialProps({
    ...customContext,
    locale: pageProps.locale,
  })

  const apolloState = apolloClient.cache.extract()

  return {
    layoutProps: {
      ...layoutProps,
      ...pageProps.layoutConfig,
    },
    pageProps,
    apolloState,
  }
}

export default appWithTranslation(withErrorBoundary(SupportApplication))
