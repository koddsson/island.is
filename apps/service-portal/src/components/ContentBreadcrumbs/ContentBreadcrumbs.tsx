import React, { FC } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { useStore } from '../../stateProvider'
import { Breadcrumbs, Box } from '@island.is/island-ui/core'
import { ServicePortalNavigationItem } from '@island.is/service-portal/core'

const nodeByUrl = (url: string, data: ServicePortalNavigationItem[]) => {
  let result: ServicePortalNavigationItem | null = null

  function iter(a: ServicePortalNavigationItem) {
    if (!a) return null
    if (a.url === url) {
      result = a
      return true
    }
    return Array.isArray(a.children) && a.children.some(iter)
  }

  data.some(iter)
  return result
}

const ContentBreadcrumbs: FC<{}> = () => {
  const location = useLocation()
  const [{ navigation }] = useStore()
  const node = nodeByUrl(location.pathname, [
    navigation.applications,
    navigation.documents,
  ])

  const navItem = node
    ? { name: node.name, url: node.url }
    : location.pathname === '/'
    ? { name: 'Forsíða', url: '/' }
    : null

  return (
    <Box padding={3} border="standard">
      <Breadcrumbs>
        <Link to="/">Mitt Ísland</Link>
        {navItem && <Link to={navItem.url}>{navItem.name}</Link>}
      </Breadcrumbs>
    </Box>
  )
}

export default ContentBreadcrumbs