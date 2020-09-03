import React, { FC } from 'react'
import {
  Box,
  GridContainer,
  GridRow,
  GridColumn,
  Stack,
  Button,
} from '@island.is/island-ui/core'
import { AdgerdirNews } from '@island.is/api/schema'
import { Heading, BackgroundImage } from '@island.is/adgerdir/components'

import * as styles from './FeaturedNews.treat'
import Link from 'next/link'

interface FeaturedNewsProps {
  items: Array<AdgerdirNews>
}

export const FeaturedNews: FC<FeaturedNewsProps> = ({ items }) => {
  if (!items.length) {
    return null
  }

  const first = items[0]
  const second = items[1]
  const third = items[2]

  return (
    <Box paddingX={[1, 1, 1, 1, 6]}>
      {first ? (
        <GridContainer>
          <GridRow>
            <GridColumn
              span={[12, 12, 12, 12, 10]}
              offset={[null, null, null, null, 1]}
            >
              <Box marginBottom={[6, 6, 10]}>
                {first.image ? (
                  <Box marginBottom={[3, 3, 3, 3, 6]}>
                    <BackgroundImage ratio="20:10" image={first.image} />
                  </Box>
                ) : null}
                <Stack space={3}>
                  <Heading
                    subtitle={first.subtitle}
                    title={first.title}
                    intro={first.intro}
                  />
                  <Link
                    href="/frettir/[slug]"
                    as={`/frettir/${first.slug}`}
                    passHref
                  >
                    <Button variant="text" icon="arrowRight">
                      Lesa meira
                    </Button>
                  </Link>
                </Stack>
              </Box>
            </GridColumn>
          </GridRow>
        </GridContainer>
      ) : null}
      {second || third ? (
        <Box className={styles.centeredBorder} marginBottom={[6, 6, 10]}>
          <GridContainer>
            <GridRow>
              <GridColumn
                span={[12, 12, 12, 12, 10]}
                offset={[null, null, null, null, 1]}
              >
                <Box className={styles.topBorder}></Box>
              </GridColumn>
              {second ? (
                <GridColumn
                  span={[12, 12, 12, 5, 4]}
                  offset={[null, null, null, null, 1]}
                >
                  {second.image ? (
                    <Box marginTop={10} marginBottom={3}>
                      <BackgroundImage ratio="20:10" image={second.image} />
                    </Box>
                  ) : null}
                  <Stack space={3}>
                    <Heading
                      main={false}
                      subtitle={second.subtitle}
                      title={second.title}
                      intro={second.intro}
                      variant="h3"
                      as="h3"
                    />
                    <Link
                      href="/frettir/[slug]"
                      as={`/frettir/${second.slug}`}
                      passHref
                    >
                      <Button variant="text" icon="arrowRight">
                        Lesa meira
                      </Button>
                    </Link>
                  </Stack>
                </GridColumn>
              ) : null}
              {third ? (
                <GridColumn
                  span={[12, 12, 12, 5, 4]}
                  offset={[null, null, null, 2, 2]}
                >
                  {third.image ? (
                    <Box marginTop={10} marginBottom={3}>
                      <BackgroundImage ratio="20:10" image={third.image} />
                    </Box>
                  ) : null}
                  <Stack space={3}>
                    <Heading
                      main={false}
                      subtitle={third.subtitle}
                      title={third.title}
                      intro={third.intro}
                      variant="h3"
                      as="h3"
                    />
                    <Link
                      href="/frettir/[slug]"
                      as={`/frettir/${third.slug}`}
                      passHref
                    >
                      <Button variant="text" icon="arrowRight">
                        Lesa meira
                      </Button>
                    </Link>
                  </Stack>
                </GridColumn>
              ) : null}
            </GridRow>
          </GridContainer>
        </Box>
      ) : null}
    </Box>
  )
}

export default FeaturedNews