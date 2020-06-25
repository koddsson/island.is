import React, { FC } from 'react'
import Link from 'next/link'
import { BLOCKS, INLINES } from '@contentful/rich-text-types'
import slugify from '@sindresorhus/slugify'
import {
  Typography,
  BulletList,
  Bullet,
  ContentBlock,
  Button,
  Box,
  Stack,
  ResponsiveSpace,
  BoxProps,
  Accordion,
  AccordionItem,
} from '@island.is/island-ui/core'
import { Locale } from '../../i18n/I18n'
import { BorderedContent, Hyperlink } from '@island.is/web/components'
import RichText from '../RichText/RichText'

const mappedContentfulTypes = {
  article: 'article',
  articleCategory: 'category',
}

const simpleSpacing = [2, 2, 3] as ResponsiveSpace

const ContentContainer: FC<BoxProps> = ({ children, ...props }) => (
  <Box paddingX={[3, 3, 6, 0]} marginTop={simpleSpacing} {...props}>
    <ContentBlock width="small">{children}</ContentBlock>
  </Box>
)

const customListItemRenderNode = (locale) => ({
  ...defaultRenderNode(locale),
  [BLOCKS.LIST_ITEM]: (node, children) => {
    return <Bullet>{children}</Bullet>
  },
  [BLOCKS.PARAGRAPH]: (node, children) => {
    return <>{children}</>
  },
})

const customProcessEntryRenderNode = (locale) => ({
  ...defaultRenderNode(locale),
  [BLOCKS.PARAGRAPH]: (node, children) => {
    if (!children.find((x) => x !== '')) {
      return null
    }

    return (
      <ContentContainer paddingX="none">
        <Box marginBottom={simpleSpacing}>
          <Typography variant="p" as="p">
            {children}
          </Typography>
        </Box>
      </ContentContainer>
    )
  },
  [BLOCKS.HEADING_2]: (node, children) => (
    <ContentContainer paddingX="none">
      <Typography variant="h2" as="h2">
        <span data-sidebar-link={slugify(children.join(''))}>{children}</span>
      </Typography>
    </ContentContainer>
  ),
  [BLOCKS.HEADING_3]: (node, children) => (
    <ContentContainer paddingX="none">
      <Typography variant="h3" as="h3">
        {children}
      </Typography>
    </ContentContainer>
  ),
  [BLOCKS.UL_LIST]: (node, children) => (
    <ContentContainer paddingX="none">
      <BulletList>{children}</BulletList>
    </ContentContainer>
  ),
  [BLOCKS.LIST_ITEM]: (node, children) => {
    return (
      <RichText document={node} renderNode={customListItemRenderNode(locale)} />
    )
  },
})

const defaultRenderNode = (locale) => ({
  [INLINES.HYPERLINK]: (node, children) => {
    const {
      data: { uri: href },
    } = node

    if (
      !['http://', 'https://'].reduce((hasProtocol, protocol) => {
        if (hasProtocol || href.startsWith(protocol)) {
          return true
        }

        return false
      }, false)
    ) {
      return children
    }

    return (
      <Hyperlink locale={locale} href={href}>
        {children}
      </Hyperlink>
    )
  },
  [INLINES.ENTRY_HYPERLINK]: (node, children) => {
    const {
      data: {
        target: {
          fields: { slug },
          sys: {
            contentType: {
              sys: { id },
            },
          },
        },
      },
    } = node

    const pathType = mappedContentfulTypes[id]

    return pathType ? (
      <Hyperlink locale={locale} pathType={pathType} slug={slug}>
        {children}
      </Hyperlink>
    ) : (
      children
    )
  },
  [BLOCKS.PARAGRAPH]: (node, children) => {
    if (!children.find((x: string) => x !== '')) {
      return null
    }

    return (
      <ContentContainer>
        <Box marginBottom={simpleSpacing}>
          <Typography variant="p" as="p">
            {children}
          </Typography>
        </Box>
      </ContentContainer>
    )
  },
  [BLOCKS.HEADING_2]: (node, children) => (
    <ContentContainer>
      <Typography variant="h2" as="h2">
        <span data-sidebar-link={slugify(children.join(''))}>{children}</span>
      </Typography>
    </ContentContainer>
  ),
  [BLOCKS.HEADING_3]: (node, children) => (
    <ContentContainer>
      <Typography variant="h3" as="h3">
        <span data-sidebar-link={slugify(children.join(''))}>{children}</span>
      </Typography>
    </ContentContainer>
  ),
  [BLOCKS.UL_LIST]: (node, children) => (
    <ContentContainer>
      <BulletList>{children}</BulletList>
    </ContentContainer>
  ),
  [BLOCKS.LIST_ITEM]: (node, children) => {
    return (
      <RichText document={node} renderNode={customListItemRenderNode(locale)} />
    )
  },
  [BLOCKS.EMBEDDED_ENTRY]: (node) => {
    const embeddedNode = embeddedNodes(locale)[
      node.data.target?.sys?.contentType?.sys?.id
    ]

    if (!embeddedNode) return null

    const Component = embeddedNode.component
    const Wrapper = embeddedNode.wrapper
    const Cmp = () => (
      <Component
        {...(embeddedNode.processContent && {
          ...embeddedNode.processContent(node),
        })}
      >
        {embeddedNode.children && embeddedNode.children(node)}
      </Component>
    )

    return Wrapper ? (
      <Wrapper>
        <Cmp />
      </Wrapper>
    ) : (
      <Cmp />
    )
  },
})

type Props = {
  locale: Locale
  document: string
}

export const ArticleContent: React.FC<Props> = ({ document, locale }) => {
  return <RichText document={document} renderNode={defaultRenderNode(locale)} />
}

const embeddedNodes = (locale) => ({
  faqList: {
    component: Box,
    wrapper: ({ children }) => {
      return (
        <Box paddingBottom={20} paddingTop={15}>
          {children}
        </Box>
      )
    },
    children: (node) => {
      const title = node.data?.target?.fields?.title || ''
      const questions = node.data?.target?.fields?.questions || []

      const items = questions
        .map((item) => {
          const question = item.fields.question
          const answer = item.fields.answer
          return { question, answer }
        })
        .filter((question) => question)

      return (
        <ContentContainer>
          <Stack space={6}>
            <Typography variant="h2" as="h2" data-sidebar-scollable>
              <span data-sidebar-link={slugify(title)}>{title}</span>
            </Typography>
            <Accordion>
              {items.map((item, index) => {
                const { answer, question } = item

                return (
                  <AccordionItem
                    key={index}
                    id={`faq_${index}`}
                    label={question}
                  >
                    <RichText
                      document={answer}
                      renderNode={customProcessEntryRenderNode(locale)}
                    />
                  </AccordionItem>
                )
              })}
            </Accordion>
          </Stack>
        </ContentContainer>
      )
    },
  },
  processEntry: {
    component: BorderedContent,
    wrapper: ({ children }) => <Box paddingY={[0, 0, 0, 6]}>{children}</Box>,
    processContent: (node) => {
      const {
        processTitle,
        processDescription,
        processLink,
        type,
        title,
        subtitle,
        details,
      } = node.data.target.fields

      return {
        topContent: (
          <ContentBlock width="small">
            <Stack space={[2, 2]}>
              {title ? (
                <Typography variant="h2" as="h3">
                  <span data-sidebar-link={slugify(title)}>{title}</span>
                </Typography>
              ) : null}
              {subtitle ? (
                <Typography variant="intro" as="p">
                  {subtitle}
                </Typography>
              ) : null}
              <RichText
                document={details}
                renderNode={customProcessEntryRenderNode(locale)}
              />
            </Stack>
          </ContentBlock>
        ),
        bottomContent: (
          <ContentBlock width="small">
            <Stack space={[2, 2]}>
              <Typography variant="eyebrow" as="h4" color="blue400">
                Innskráning og umsókn
              </Typography>
              <Typography variant="h3" as="h3">
                {processTitle || 'processTitle'}
              </Typography>
              <Typography variant="p" as="p">
                {processDescription || 'processDescription'}
              </Typography>
              <Box paddingTop={[1, 1, 2]}>
                <Link href={processLink} passHref>
                  <Button icon={type === 'Not digital' ? 'info' : 'external'}>
                    Áfram í innskráningu
                  </Button>
                </Link>
              </Box>
            </Stack>
          </ContentBlock>
        ),
      }
    },
  },
})

export default ArticleContent