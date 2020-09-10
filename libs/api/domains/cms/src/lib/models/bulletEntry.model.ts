import { createUnionType } from '@nestjs/graphql'

import { IIconBullet, INumberBulletSection } from '../generated/contentfulTypes'

import {
  NumberBulletGroup,
  mapNumberBulletGroup,
} from './numberBulletGroup.model'
import { IconBullet, mapIconBullet } from './iconBullet.model'

export const BulletEntry = createUnionType({
  name: 'BulletEntry',
  types: () => [IconBullet, NumberBulletGroup],
})

export const mapBulletEntry = (
  e: IIconBullet | INumberBulletSection,
): typeof BulletEntry => {
  switch (e.sys.contentType.sys.id) {
    case 'iconBullet':
      return mapIconBullet(e as IIconBullet)

    case 'numberBulletSection':
      return mapNumberBulletGroup(e as INumberBulletSection)
  }
}
