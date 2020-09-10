import { Field, ID, ObjectType } from '@nestjs/graphql'

import { ICardSection } from '../generated/contentfulTypes'

import { LinkCard, mapLinkCard } from './linkCard.model'

@ObjectType()
export class LinkCardSlice {
  constructor(initializer: LinkCardSlice) {
    Object.assign(this, initializer)
  }

  @Field(() => ID)
  id: string

  @Field()
  title: string

  @Field(() => [LinkCard])
  cards: LinkCard[]
}

export const mapLinkCardSlice = ({
  fields,
  sys,
}: ICardSection): LinkCardSlice =>
  new LinkCardSlice({
    id: sys.id,
    title: fields.title ?? '',
    cards: fields.cards.map(mapLinkCard),
  })
