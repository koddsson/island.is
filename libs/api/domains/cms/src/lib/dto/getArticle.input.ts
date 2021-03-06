import { Field, InputType } from '@nestjs/graphql'
import { IsOptional, IsString } from 'class-validator'

@InputType()
export class GetArticleInput {
  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  slug?: string

  @Field()
  @IsString()
  lang: string
}
