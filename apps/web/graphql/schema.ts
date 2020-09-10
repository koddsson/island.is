export type Maybe<T> = T | null
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: { [key: string]: any }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: Date
}

export type HelloWorld = {
  __typename?: 'HelloWorld'
  message: Scalars['String']
}

export type ContentItem = {
  __typename?: 'ContentItem'
  id: Scalars['ID']
  title?: Maybe<Scalars['String']>
  content?: Maybe<Scalars['String']>
  tag?: Maybe<Array<Scalars['String']>>
  category?: Maybe<Scalars['String']>
  categorySlug?: Maybe<Scalars['String']>
  categoryDescription?: Maybe<Scalars['String']>
  group?: Maybe<Scalars['String']>
  subgroup?: Maybe<Scalars['String']>
  groupSlug?: Maybe<Scalars['String']>
  groupDescription?: Maybe<Scalars['String']>
  contentBlob?: Maybe<Scalars['String']>
  contentId?: Maybe<Scalars['String']>
  contentType?: Maybe<Scalars['String']>
  date?: Maybe<Scalars['String']>
  image?: Maybe<Scalars['String']>
  imageText?: Maybe<Scalars['String']>
  lang?: Maybe<Scalars['String']>
  slug?: Maybe<Scalars['String']>
}

export type SearchResult = {
  __typename?: 'SearchResult'
  total: Scalars['Int']
  items: Array<ContentItem>
}

export type ContentCategory = {
  __typename?: 'ContentCategory'
  title?: Maybe<Scalars['String']>
  slug?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
}

export type WebSearchAutocomplete = {
  __typename?: 'WebSearchAutocomplete'
  total: Scalars['Int']
  completions: Array<Scalars['String']>
}

export type ArticleCategory = {
  __typename?: 'ArticleCategory'
  title: Scalars['String']
  slug: Scalars['String']
  description?: Maybe<Scalars['String']>
}

export type ArticleGroup = {
  __typename?: 'ArticleGroup'
  title: Scalars['String']
  slug: Scalars['String']
  description?: Maybe<Scalars['String']>
  sortBy?: Maybe<Scalars['String']>
}

export type ArticleSubgroup = {
  __typename?: 'ArticleSubgroup'
  title: Scalars['String']
  slug: Scalars['String']
}

export type Organization = {
  __typename?: 'Organization'
  title: Scalars['String']
  slug: Scalars['String']
}

export type SubArticle = {
  __typename?: 'SubArticle'
  title: Scalars['String']
  slug: Scalars['String']
  content: Scalars['String']
}

export type Article = {
  __typename?: 'Article'
  id: Scalars['ID']
  contentStatus: Scalars['String']
  title: Scalars['String']
  shortTitle?: Maybe<Scalars['String']>
  slug: Scalars['String']
  content?: Maybe<Scalars['String']>
  category?: Maybe<ArticleCategory>
  group?: Maybe<ArticleGroup>
  subgroup?: Maybe<ArticleSubgroup>
  organization: Array<Organization>
  relatedArticles: Array<Article>
  subArticles: Array<SubArticle>
}

export type AdgerdirTag = {
  __typename?: 'AdgerdirTag'
  id: Scalars['ID']
  title: Scalars['String']
}

export type AdgerdirPage = {
  __typename?: 'AdgerdirPage'
  id: Scalars['ID']
  title: Scalars['String']
  description: Scalars['String']
  longDescription?: Maybe<Scalars['String']>
  content?: Maybe<Scalars['String']>
  objective?: Maybe<Scalars['String']>
  slug: Scalars['String']
  tags: Array<AdgerdirTag>
  link?: Maybe<Scalars['String']>
  linkButtonText?: Maybe<Scalars['String']>
  status: Scalars['String']
  estimatedCostIsk?: Maybe<Scalars['Float']>
  finalCostIsk?: Maybe<Scalars['Float']>
}

export type Image = {
  __typename?: 'Image'
  id: Scalars['ID']
  url: Scalars['String']
  title: Scalars['String']
  contentType: Scalars['String']
  width: Scalars['Int']
  height: Scalars['Int']
}

export type AdgerdirNews = {
  __typename?: 'AdgerdirNews'
  id: Scalars['String']
  slug: Scalars['String']
  subtitle: Scalars['String']
  title: Scalars['String']
  intro: Scalars['String']
  image?: Maybe<Image>
  date: Scalars['String']
  content?: Maybe<Scalars['String']>
  pages?: Maybe<Array<AdgerdirPage>>
}

export type AdgerdirPages = {
  __typename?: 'AdgerdirPages'
  items: Array<AdgerdirPage>
}

export type AdgerdirFrontpage = {
  __typename?: 'AdgerdirFrontpage'
  id: Scalars['ID']
  slug: Scalars['String']
  title: Scalars['String']
  description?: Maybe<Scalars['String']>
  content?: Maybe<Scalars['String']>
  slices: Array<AdgerdirSlice>
}

export type AdgerdirSlice = AdgerdirGroupSlice | AdgerdirFeaturedNewsSlice

export type AdgerdirGroupSlice = {
  __typename?: 'AdgerdirGroupSlice'
  id: Scalars['ID']
  subtitle?: Maybe<Scalars['String']>
  title: Scalars['String']
  description?: Maybe<Scalars['String']>
  image?: Maybe<Image>
  pages: Array<AdgerdirPage>
}

export type AdgerdirFeaturedNewsSlice = {
  __typename?: 'AdgerdirFeaturedNewsSlice'
  id: Scalars['ID']
  title: Scalars['String']
  featured: Array<AdgerdirNews>
}

export type FrontpageSlide = {
  __typename?: 'FrontpageSlide'
  title: Scalars['String']
  subtitle: Scalars['String']
  content: Scalars['String']
  image?: Maybe<Image>
  link?: Maybe<Scalars['String']>
}

export type FrontpageSliderList = {
  __typename?: 'FrontpageSliderList'
  items: Array<FrontpageSlide>
}

export type News = {
  __typename?: 'News'
  id: Scalars['String']
  slug: Scalars['String']
  title: Scalars['String']
  subtitle: Scalars['String']
  intro: Scalars['String']
  image?: Maybe<Image>
  date: Scalars['String']
  content?: Maybe<Scalars['String']>
}

export type Pagination = {
  __typename?: 'Pagination'
  page: Scalars['Int']
  perPage: Scalars['Int']
  totalResults: Scalars['Int']
  totalPages: Scalars['Int']
}

export type PaginatedNews = {
  __typename?: 'PaginatedNews'
  page: Pagination
  news: Array<News>
}

export type Namespace = {
  __typename?: 'Namespace'
  namespace: Scalars['String']
  fields: Scalars['String']
}

export type Link = {
  __typename?: 'Link'
  text: Scalars['String']
  url: Scalars['String']
}

export type TimelineEvent = {
  __typename?: 'TimelineEvent'
  id: Scalars['ID']
  title: Scalars['String']
  date: Scalars['String']
  numerator?: Maybe<Scalars['Int']>
  denominator?: Maybe<Scalars['Int']>
  label: Scalars['String']
  body?: Maybe<Scalars['String']>
  tags: Array<Scalars['String']>
  link: Scalars['String']
}

export type Story = {
  __typename?: 'Story'
  label: Scalars['String']
  title: Scalars['String']
  logo: Image
  readMoreText: Scalars['String']
  date: Scalars['String']
  intro: Scalars['String']
  body?: Maybe<Scalars['String']>
}

export type LinkCard = {
  __typename?: 'LinkCard'
  title: Scalars['String']
  body: Scalars['String']
  link: Scalars['String']
  linkText: Scalars['String']
}

export type NumberBullet = {
  __typename?: 'NumberBullet'
  id: Scalars['ID']
  title: Scalars['String']
  body: Scalars['String']
}

export type Statistic = {
  __typename?: 'Statistic'
  id: Scalars['ID']
  value: Scalars['String']
  label: Scalars['String']
}

export type Html = {
  __typename?: 'Html'
  id: Scalars['ID']
  document: Scalars['JSON']
}

export type QuestionAndAnswer = {
  __typename?: 'QuestionAndAnswer'
  id: Scalars['ID']
  question: Scalars['String']
  answer: Html
}

export type AboutPage = {
  __typename?: 'AboutPage'
  title: Scalars['String']
  seoDescription: Scalars['String']
  theme: Scalars['String']
  slices: Array<Slice>
}

export type Slice =
  | PageHeaderSlice
  | TimelineSlice
  | HeadingSlice
  | StorySlice
  | LinkCardSlice
  | LatestNewsSlice
  | MailingListSignupSlice
  | LogoListSlice
  | BulletListSlice
  | Html
  | Image
  | Statistics
  | ProcessEntry
  | FaqList
  | EmbeddedVideo

export type PageHeaderSlice = {
  __typename?: 'PageHeaderSlice'
  id: Scalars['ID']
  title: Scalars['String']
  introduction: Scalars['String']
  navigationText: Scalars['String']
  links: Array<Link>
  slices: Array<Slice>
}

export type TimelineSlice = {
  __typename?: 'TimelineSlice'
  id: Scalars['ID']
  title: Scalars['String']
  events: Array<TimelineEvent>
}

export type HeadingSlice = {
  __typename?: 'HeadingSlice'
  id: Scalars['ID']
  title: Scalars['String']
  body: Scalars['String']
}

export type StorySlice = {
  __typename?: 'StorySlice'
  id: Scalars['ID']
  readMoreText: Scalars['String']
  stories: Array<Story>
}

export type LinkCardSlice = {
  __typename?: 'LinkCardSlice'
  id: Scalars['ID']
  title: Scalars['String']
  cards: Array<LinkCard>
}

export type LatestNewsSlice = {
  __typename?: 'LatestNewsSlice'
  id: Scalars['ID']
  title: Scalars['String']
  news: Array<News>
}

export type MailingListSignupSlice = {
  __typename?: 'MailingListSignupSlice'
  id: Scalars['ID']
  title: Scalars['String']
  description?: Maybe<Scalars['String']>
  inputLabel: Scalars['String']
  buttonText: Scalars['String']
}

export type LogoListSlice = {
  __typename?: 'LogoListSlice'
  id: Scalars['ID']
  title: Scalars['String']
  body: Scalars['String']
  images: Array<Image>
}

export type BulletListSlice = {
  __typename?: 'BulletListSlice'
  id: Scalars['ID']
  bullets: Array<BulletEntry>
}

export type BulletEntry = IconBullet | NumberBulletGroup

export type IconBullet = {
  __typename?: 'IconBullet'
  id: Scalars['ID']
  title: Scalars['String']
  body: Scalars['String']
  icon: Image
  url?: Maybe<Scalars['String']>
  linkText?: Maybe<Scalars['String']>
}

export type NumberBulletGroup = {
  __typename?: 'NumberBulletGroup'
  id: Scalars['ID']
  defaultVisible: Scalars['Int']
  bullets: Array<NumberBullet>
}

export type Statistics = {
  __typename?: 'Statistics'
  id: Scalars['ID']
  title: Scalars['String']
  statistics: Array<Statistic>
}

export type ProcessEntry = {
  __typename?: 'ProcessEntry'
  id: Scalars['ID']
  title: Scalars['String']
  subtitle?: Maybe<Scalars['String']>
  details?: Maybe<Html>
  type: Scalars['String']
  processTitle: Scalars['String']
  processDescription?: Maybe<Scalars['String']>
  processInfo?: Maybe<Html>
  processLink: Scalars['String']
  buttonText: Scalars['String']
}

export type FaqList = {
  __typename?: 'FaqList'
  id: Scalars['ID']
  title: Scalars['String']
  questions: Array<QuestionAndAnswer>
}

export type EmbeddedVideo = {
  __typename?: 'EmbeddedVideo'
  id: Scalars['ID']
  title: Scalars['String']
  url: Scalars['String']
}

export type LinkList = {
  __typename?: 'LinkList'
  title: Scalars['String']
  links: Array<Link>
}

export type LandingPage = {
  __typename?: 'LandingPage'
  title: Scalars['String']
  slug: Scalars['String']
  introduction: Scalars['String']
  image?: Maybe<Image>
  actionButton?: Maybe<Link>
  links?: Maybe<LinkList>
  content: Array<Slice>
}

export type GenericPage = {
  __typename?: 'GenericPage'
  title: Scalars['String']
  slug: Scalars['String']
  intro?: Maybe<Scalars['String']>
  mainContent?: Maybe<Scalars['String']>
  sidebar?: Maybe<Scalars['String']>
  misc?: Maybe<Scalars['String']>
}

export type Menu = {
  __typename?: 'Menu'
  title: Scalars['String']
  links: Array<Link>
}

export type LifeEventPage = {
  __typename?: 'LifeEventPage'
  title: Scalars['String']
  slug: Scalars['String']
  intro: Scalars['String']
  image: Image
  body: Scalars['JSON']
}

export type AdgerdirTags = {
  __typename?: 'AdgerdirTags'
  items: Array<AdgerdirTag>
}

export type PaginatedAdgerdirNews = {
  __typename?: 'PaginatedAdgerdirNews'
  page: Pagination
  news: Array<AdgerdirNews>
}

export type Application = {
  __typename?: 'Application'
  id: Scalars['ID']
  created: Scalars['DateTime']
  modified: Scalars['DateTime']
  applicant: Scalars['String']
  assignee: Scalars['String']
  externalId?: Maybe<Scalars['String']>
  state: ApplicationStateEnum
  attachments?: Maybe<Scalars['JSON']>
  typeId: ApplicationTypeIdEnum
  answers: Scalars['JSON']
  externalData: Scalars['JSON']
}

export enum ApplicationStateEnum {
  Draft = 'DRAFT',
  Beingprocessed = 'BEINGPROCESSED',
  Needsinformation = 'NEEDSINFORMATION',
  Pending = 'PENDING',
  Approved = 'APPROVED',
  Manualapproved = 'MANUALAPPROVED',
  Rejected = 'REJECTED',
  Unknown = 'UNKNOWN',
}

export enum ApplicationTypeIdEnum {
  ExampleForm = 'ExampleForm',
  ExampleForm2 = 'ExampleForm2',
  ExampleForm3 = 'ExampleForm3',
  FamilyAndPets = 'FamilyAndPets',
  ParentalLeave = 'ParentalLeave',
}

export type PresignedPost = {
  __typename?: 'PresignedPost'
  url: Scalars['String']
  fields: Scalars['JSON']
}

export type Document = {
  __typename?: 'Document'
  id: Scalars['ID']
  date: Scalars['DateTime']
  subject: Scalars['String']
  senderName: Scalars['String']
  senderNatReg: Scalars['String']
  opened: Scalars['Boolean']
}

export type DocumentDetails = {
  __typename?: 'DocumentDetails'
  fileType: Scalars['String']
  content: Scalars['String']
  html: Scalars['String']
  url: Scalars['String']
}

export type DocumentCategory = {
  __typename?: 'DocumentCategory'
  id: Scalars['ID']
  name: Scalars['String']
}

export type Query = {
  __typename?: 'Query'
  helloWorld: HelloWorld
  searchResults: SearchResult
  singleItem?: Maybe<ContentItem>
  categories: Array<ContentCategory>
  articlesInCategory: Array<ContentItem>
  webSearchAutocomplete: WebSearchAutocomplete
  getArticle?: Maybe<Article>
  getNews?: Maybe<News>
  getNewsList: PaginatedNews
  getAdgerdirNewsList: PaginatedAdgerdirNews
  getNamespace?: Maybe<Namespace>
  getAboutPage: AboutPage
  getLandingPage?: Maybe<LandingPage>
  getGenericPage?: Maybe<GenericPage>
  getAdgerdirPage?: Maybe<AdgerdirPage>
  getAdgerdirNews?: Maybe<AdgerdirNews>
  getAdgerdirPages: AdgerdirPages
  getAdgerdirTags?: Maybe<AdgerdirTags>
  getFrontpageSliderList?: Maybe<FrontpageSliderList>
  getAdgerdirFrontpage?: Maybe<AdgerdirFrontpage>
  getMenu?: Maybe<Menu>
  getLifeEventPage?: Maybe<LifeEventPage>
  getApplication?: Maybe<Application>
  getApplicationsByType?: Maybe<Array<Application>>
  getDocument?: Maybe<DocumentDetails>
  listDocuments?: Maybe<Array<Document>>
  getDocumentCategories?: Maybe<Array<DocumentCategory>>
}

export type QueryHelloWorldArgs = {
  input: HelloWorldInput
}

export type QuerySearchResultsArgs = {
  query: SearcherInput
}

export type QuerySingleItemArgs = {
  input: ItemInput
}

export type QueryCategoriesArgs = {
  input: CategoriesInput
}

export type QueryArticlesInCategoryArgs = {
  category: ArticlesInCategoryInput
}

export type QueryWebSearchAutocompleteArgs = {
  input: WebSearchAutocompleteInput
}

export type QueryGetArticleArgs = {
  input: GetArticleInput
}

export type QueryGetNewsArgs = {
  input: GetNewsInput
}

export type QueryGetNewsListArgs = {
  input: GetNewsListInput
}

export type QueryGetAdgerdirNewsListArgs = {
  input: GetAdgerdirNewsListInput
}

export type QueryGetNamespaceArgs = {
  input: GetNamespaceInput
}

export type QueryGetAboutPageArgs = {
  input: GetAboutPageInput
}

export type QueryGetLandingPageArgs = {
  input: GetLandingPageInput
}

export type QueryGetGenericPageArgs = {
  input: GetGenericPageInput
}

export type QueryGetAdgerdirPageArgs = {
  input: GetAdgerdirPageInput
}

export type QueryGetAdgerdirNewsArgs = {
  input: GetAdgerdirNewsInput
}

export type QueryGetAdgerdirPagesArgs = {
  input: GetAdgerdirPagesInput
}

export type QueryGetAdgerdirTagsArgs = {
  input: GetAdgerdirTagsInput
}

export type QueryGetFrontpageSliderListArgs = {
  input: GetFrontpageSliderListInput
}

export type QueryGetAdgerdirFrontpageArgs = {
  input: GetAdgerdirFrontpageInput
}

export type QueryGetMenuArgs = {
  input: GetMenuInput
}

export type QueryGetLifeEventPageArgs = {
  input: GetLifeEventPageInput
}

export type QueryGetApplicationArgs = {
  input: GetApplicationInput
}

export type QueryGetApplicationsByTypeArgs = {
  input: GetApplicationsByTypeInput
}

export type QueryGetDocumentArgs = {
  input: GetDocumentInput
}

export type QueryListDocumentsArgs = {
  input: ListDocumentsInput
}

export type HelloWorldInput = {
  name?: Maybe<Scalars['String']>
}

export type SearcherInput = {
  queryString?: Maybe<Scalars['String']>
  language?: Maybe<ContentLanguage>
  size?: Maybe<Scalars['Int']>
  page?: Maybe<Scalars['Int']>
}

export enum ContentLanguage {
  Is = 'is',
  En = 'en',
}

export type ItemInput = {
  id?: Maybe<Scalars['ID']>
  slug?: Maybe<Scalars['String']>
  type?: Maybe<ItemType>
  language?: Maybe<ContentLanguage>
}

export enum ItemType {
  Article = 'article',
  Category = 'category',
}

export type CategoriesInput = {
  language?: Maybe<ContentLanguage>
}

export type ArticlesInCategoryInput = {
  slug?: Maybe<Scalars['String']>
  language?: Maybe<ContentLanguage>
}

export type WebSearchAutocompleteInput = {
  singleTerm: Scalars['String']
  language?: Maybe<ContentLanguage>
  size?: Maybe<Scalars['Int']>
}

export type GetArticleInput = {
  slug?: Maybe<Scalars['String']>
  lang: Scalars['String']
}

export type GetNewsInput = {
  slug: Scalars['String']
  lang?: Maybe<Scalars['String']>
}

export type GetNewsListInput = {
  lang?: Maybe<Scalars['String']>
  year?: Maybe<Scalars['Int']>
  month?: Maybe<Scalars['Int']>
  ascending?: Maybe<Scalars['Boolean']>
  page?: Maybe<Scalars['Int']>
  perPage?: Maybe<Scalars['Int']>
}

export type GetAdgerdirNewsListInput = {
  lang?: Maybe<Scalars['String']>
  year?: Maybe<Scalars['Int']>
  month?: Maybe<Scalars['Int']>
  ascending?: Maybe<Scalars['Boolean']>
  page?: Maybe<Scalars['Int']>
  perPage?: Maybe<Scalars['Int']>
}

export type GetNamespaceInput = {
  namespace?: Maybe<Scalars['String']>
  lang: Scalars['String']
}

export type GetAboutPageInput = {
  lang: Scalars['String']
}

export type GetLandingPageInput = {
  slug: Scalars['String']
  lang: Scalars['String']
}

export type GetGenericPageInput = {
  slug: Scalars['String']
  lang: Scalars['String']
}

export type GetAdgerdirPageInput = {
  slug?: Maybe<Scalars['String']>
  lang: Scalars['String']
}

export type GetAdgerdirNewsInput = {
  slug?: Maybe<Scalars['String']>
  lang: Scalars['String']
}

export type GetAdgerdirPagesInput = {
  lang?: Maybe<Scalars['String']>
  perPage?: Maybe<Scalars['Int']>
}

export type GetAdgerdirTagsInput = {
  lang?: Maybe<Scalars['String']>
}

export type GetFrontpageSliderListInput = {
  lang?: Maybe<Scalars['String']>
}

export type GetAdgerdirFrontpageInput = {
  lang: Scalars['String']
}

export type GetMenuInput = {
  name: Scalars['String']
  lang: Scalars['String']
}

export type GetLifeEventPageInput = {
  slug: Scalars['String']
  lang: Scalars['String']
}

export type GetApplicationInput = {
  id: Scalars['String']
}

export type GetApplicationsByTypeInput = {
  typeId: ApplicationTypeIdEnum
}

export type GetDocumentInput = {
  id: Scalars['String']
}

export type ListDocumentsInput = {
  natReg: Scalars['String']
  dateFrom: Scalars['DateTime']
  dateTo: Scalars['DateTime']
  category: Scalars['String']
  page: Scalars['Float']
  pageSize: Scalars['Float']
}

export type Mutation = {
  __typename?: 'Mutation'
  createApplication?: Maybe<Application>
  updateApplication?: Maybe<Application>
  updateApplicationExternalData?: Maybe<Application>
  addAttachment?: Maybe<Application>
  deleteAttachment?: Maybe<Application>
  createUploadUrl: PresignedPost
}

export type MutationCreateApplicationArgs = {
  input: CreateApplicationInput
}

export type MutationUpdateApplicationArgs = {
  input: UpdateApplicationInput
}

export type MutationUpdateApplicationExternalDataArgs = {
  input: UpdateApplicationExternalDataInput
}

export type MutationAddAttachmentArgs = {
  input: AddAttachmentInput
}

export type MutationDeleteAttachmentArgs = {
  input: DeleteAttachmentInput
}

export type MutationCreateUploadUrlArgs = {
  filename: Scalars['String']
}

export type CreateApplicationInput = {
  applicant: Scalars['String']
  assignee: Scalars['String']
  externalId?: Maybe<Scalars['String']>
  state: CreateApplicationDtoStateEnum
  attachments?: Maybe<Scalars['JSON']>
  typeId: CreateApplicationDtoTypeIdEnum
  answers: Scalars['JSON']
}

export enum CreateApplicationDtoStateEnum {
  Draft = 'DRAFT',
  Beingprocessed = 'BEINGPROCESSED',
  Needsinformation = 'NEEDSINFORMATION',
  Pending = 'PENDING',
  Approved = 'APPROVED',
  Manualapproved = 'MANUALAPPROVED',
  Rejected = 'REJECTED',
  Unknown = 'UNKNOWN',
}

export enum CreateApplicationDtoTypeIdEnum {
  ExampleForm = 'ExampleForm',
  ExampleForm2 = 'ExampleForm2',
  ExampleForm3 = 'ExampleForm3',
  FamilyAndPets = 'FamilyAndPets',
  ParentalLeave = 'ParentalLeave',
}

export type UpdateApplicationInput = {
  id: Scalars['String']
  applicant?: Maybe<Scalars['String']>
  assignee?: Maybe<Scalars['String']>
  externalId?: Maybe<Scalars['String']>
  state?: Maybe<UpdateApplicationDtoStateEnum>
  attachments?: Maybe<Scalars['JSON']>
  answers?: Maybe<Scalars['JSON']>
}

export enum UpdateApplicationDtoStateEnum {
  Draft = 'DRAFT',
  Beingprocessed = 'BEINGPROCESSED',
  Needsinformation = 'NEEDSINFORMATION',
  Pending = 'PENDING',
  Approved = 'APPROVED',
  Manualapproved = 'MANUALAPPROVED',
  Rejected = 'REJECTED',
  Unknown = 'UNKNOWN',
}

export type UpdateApplicationExternalDataInput = {
  id: Scalars['String']
  dataProviders: Array<DataProvider>
}

export type DataProvider = {
  id: Scalars['String']
  type: DataProviderDtoTypeEnum
}

export enum DataProviderDtoTypeEnum {
  ExpectedDateOfBirth = 'ExpectedDateOfBirth',
  ExampleFails = 'ExampleFails',
  ExampleSucceeds = 'ExampleSucceeds',
}

export type AddAttachmentInput = {
  id: Scalars['String']
  key: Scalars['String']
  url: Scalars['String']
}

export type DeleteAttachmentInput = {
  id: Scalars['String']
  key: Scalars['String']
}

export type GetAboutPageQueryVariables = Exact<{
  input: GetAboutPageInput
}>

export type GetAboutPageQuery = { __typename?: 'Query' } & {
  getAboutPage: { __typename?: 'AboutPage' } & Pick<
    AboutPage,
    'title' | 'seoDescription' | 'theme'
  > & {
      slices: Array<
        | ({
            __typename?: 'PageHeaderSlice'
          } & AllSlicesPageHeaderSliceFragment)
        | ({ __typename?: 'TimelineSlice' } & AllSlicesTimelineSliceFragment)
        | ({ __typename?: 'HeadingSlice' } & AllSlicesHeadingSliceFragment)
        | ({ __typename?: 'StorySlice' } & AllSlicesStorySliceFragment)
        | ({ __typename?: 'LinkCardSlice' } & AllSlicesLinkCardSliceFragment)
        | ({
            __typename?: 'LatestNewsSlice'
          } & AllSlicesLatestNewsSliceFragment)
        | ({
            __typename?: 'MailingListSignupSlice'
          } & AllSlicesMailingListSignupSliceFragment)
        | ({ __typename?: 'LogoListSlice' } & AllSlicesLogoListSliceFragment)
        | ({
            __typename?: 'BulletListSlice'
          } & AllSlicesBulletListSliceFragment)
        | ({ __typename?: 'Html' } & AllSlicesHtmlFragment)
        | ({ __typename?: 'Image' } & AllSlicesImageFragment)
        | ({ __typename?: 'Statistics' } & AllSlicesStatisticsFragment)
        | ({ __typename?: 'ProcessEntry' } & AllSlicesProcessEntryFragment)
        | ({ __typename?: 'FaqList' } & AllSlicesFaqListFragment)
        | ({ __typename?: 'EmbeddedVideo' } & AllSlicesEmbeddedVideoFragment)
      >
    }
}

export type GetArticleQueryVariables = Exact<{
  input: GetArticleInput
}>

export type GetArticleQuery = { __typename?: 'Query' } & {
  getArticle?: Maybe<
    { __typename?: 'Article' } & Pick<
      Article,
      'id' | 'slug' | 'title' | 'content'
    > & {
        group?: Maybe<
          { __typename?: 'ArticleGroup' } & Pick<
            ArticleGroup,
            'title' | 'slug' | 'description'
          >
        >
        category?: Maybe<
          { __typename?: 'ArticleCategory' } & Pick<
            ArticleCategory,
            'title' | 'slug' | 'description'
          >
        >
        relatedArticles: Array<
          { __typename?: 'Article' } & Pick<Article, 'title' | 'slug'>
        >
      }
  >
}

export type GetCategoriesQueryVariables = Exact<{
  input: CategoriesInput
}>

export type GetCategoriesQuery = { __typename?: 'Query' } & {
  categories: Array<
    { __typename?: 'ContentCategory' } & Pick<
      ContentCategory,
      'title' | 'slug' | 'description'
    >
  >
}

export type GetArticlesInCategoryQueryVariables = Exact<{
  category: ArticlesInCategoryInput
}>

export type GetArticlesInCategoryQuery = { __typename?: 'Query' } & {
  articlesInCategory: Array<
    { __typename?: 'ContentItem' } & Pick<
      ContentItem,
      | 'content'
      | 'category'
      | 'slug'
      | 'title'
      | 'subgroup'
      | 'group'
      | 'groupDescription'
      | 'groupSlug'
    >
  >
}

export type GetFrontpageSliderListQueryVariables = Exact<{
  input: GetFrontpageSliderListInput
}>

export type GetFrontpageSliderListQuery = { __typename?: 'Query' } & {
  getFrontpageSliderList?: Maybe<
    { __typename?: 'FrontpageSliderList' } & {
      items: Array<
        { __typename?: 'FrontpageSlide' } & Pick<
          FrontpageSlide,
          'subtitle' | 'title' | 'content' | 'link'
        > & {
            image?: Maybe<
              { __typename?: 'Image' } & Pick<
                Image,
                'url' | 'title' | 'contentType' | 'width' | 'height'
              >
            >
          }
      >
    }
  >
}

export type GetLandingPageQueryVariables = Exact<{
  input: GetLandingPageInput
}>

export type GetLandingPageQuery = { __typename?: 'Query' } & {
  getLandingPage?: Maybe<
    { __typename?: 'LandingPage' } & Pick<
      LandingPage,
      'title' | 'slug' | 'introduction'
    > & {
        image?: Maybe<{ __typename?: 'Image' } & ImageFieldsFragment>
        actionButton?: Maybe<
          { __typename?: 'Link' } & Pick<Link, 'text' | 'url'>
        >
        links?: Maybe<
          { __typename?: 'LinkList' } & Pick<LinkList, 'title'> & {
              links: Array<{ __typename?: 'Link' } & Pick<Link, 'text' | 'url'>>
            }
        >
        content: Array<
          | ({
              __typename?: 'PageHeaderSlice'
            } & AllSlicesPageHeaderSliceFragment)
          | ({ __typename?: 'TimelineSlice' } & AllSlicesTimelineSliceFragment)
          | ({ __typename?: 'HeadingSlice' } & AllSlicesHeadingSliceFragment)
          | ({ __typename?: 'StorySlice' } & AllSlicesStorySliceFragment)
          | ({ __typename?: 'LinkCardSlice' } & AllSlicesLinkCardSliceFragment)
          | ({
              __typename?: 'LatestNewsSlice'
            } & AllSlicesLatestNewsSliceFragment)
          | ({
              __typename?: 'MailingListSignupSlice'
            } & AllSlicesMailingListSignupSliceFragment)
          | ({ __typename?: 'LogoListSlice' } & AllSlicesLogoListSliceFragment)
          | ({
              __typename?: 'BulletListSlice'
            } & AllSlicesBulletListSliceFragment)
          | ({ __typename?: 'Html' } & AllSlicesHtmlFragment)
          | ({ __typename?: 'Image' } & AllSlicesImageFragment)
          | ({ __typename?: 'Statistics' } & AllSlicesStatisticsFragment)
          | ({ __typename?: 'ProcessEntry' } & AllSlicesProcessEntryFragment)
          | ({ __typename?: 'FaqList' } & AllSlicesFaqListFragment)
          | ({ __typename?: 'EmbeddedVideo' } & AllSlicesEmbeddedVideoFragment)
        >
      }
  >
}

export type GetMenuQueryVariables = Exact<{
  input: GetMenuInput
}>

export type GetMenuQuery = { __typename?: 'Query' } & {
  getMenu?: Maybe<
    { __typename?: 'Menu' } & Pick<Menu, 'title'> & {
        links: Array<{ __typename?: 'Link' } & Pick<Link, 'text' | 'url'>>
      }
  >
}

export type GetNamespaceQueryVariables = Exact<{
  input: GetNamespaceInput
}>

export type GetNamespaceQuery = { __typename?: 'Query' } & {
  getNamespace?: Maybe<{ __typename?: 'Namespace' } & Pick<Namespace, 'fields'>>
}

export type GetNewsListQueryVariables = Exact<{
  input: GetNewsListInput
}>

export type GetNewsListQuery = { __typename?: 'Query' } & {
  getNewsList: { __typename?: 'PaginatedNews' } & {
    page: { __typename?: 'Pagination' } & Pick<
      Pagination,
      'page' | 'perPage' | 'totalPages'
    >
    news: Array<
      { __typename?: 'News' } & Pick<
        News,
        'id' | 'title' | 'subtitle' | 'date' | 'slug' | 'intro'
      > & {
          image?: Maybe<
            { __typename?: 'Image' } & Pick<
              Image,
              'url' | 'title' | 'width' | 'height'
            >
          >
        }
    >
  }
}

export type GetNewsItemQueryVariables = Exact<{
  input: GetNewsInput
}>

export type GetNewsItemQuery = { __typename?: 'Query' } & {
  getNews?: Maybe<
    { __typename?: 'News' } & Pick<
      News,
      'id' | 'title' | 'subtitle' | 'date' | 'slug' | 'intro' | 'content'
    > & {
        image?: Maybe<
          { __typename?: 'Image' } & Pick<
            Image,
            'url' | 'title' | 'width' | 'height'
          >
        >
      }
  >
}

export type GetSearchResultsQueryVariables = Exact<{
  query: SearcherInput
}>

export type GetSearchResultsQuery = { __typename?: 'Query' } & {
  searchResults: { __typename?: 'SearchResult' } & Pick<
    SearchResult,
    'total'
  > & {
      items: Array<
        { __typename?: 'ContentItem' } & Pick<
          ContentItem,
          'id' | 'title' | 'content' | 'slug' | 'category' | 'group'
        >
      >
    }
}

export type AutocompleteTermResultsQueryVariables = Exact<{
  input: WebSearchAutocompleteInput
}>

export type AutocompleteTermResultsQuery = { __typename?: 'Query' } & {
  webSearchAutocomplete: { __typename?: 'WebSearchAutocomplete' } & Pick<
    WebSearchAutocomplete,
    'completions'
  >
}

export type GetSearchResultsDetailedQueryVariables = Exact<{
  query: SearcherInput
}>

export type GetSearchResultsDetailedQuery = { __typename?: 'Query' } & {
  searchResults: { __typename?: 'SearchResult' } & Pick<
    SearchResult,
    'total'
  > & {
      items: Array<
        { __typename?: 'ContentItem' } & Pick<
          ContentItem,
          | 'id'
          | 'title'
          | 'slug'
          | 'tag'
          | 'content'
          | 'categoryDescription'
          | 'categorySlug'
          | 'category'
          | 'group'
          | 'groupSlug'
          | 'contentType'
        >
      >
    }
}

export type ImageFieldsFragment = { __typename: 'Image' } & Pick<
  Image,
  'id' | 'title' | 'url' | 'contentType' | 'width' | 'height'
>

export type PageHeaderFieldsFragment = { __typename: 'PageHeaderSlice' } & Pick<
  PageHeaderSlice,
  'id' | 'title' | 'introduction' | 'navigationText'
> & {
    links: Array<{ __typename?: 'Link' } & Pick<Link, 'text' | 'url'>>
    slices: Array<
      | { __typename?: 'PageHeaderSlice' }
      | ({ __typename?: 'TimelineSlice' } & TimelineFieldsFragment)
      | { __typename?: 'HeadingSlice' }
      | { __typename?: 'StorySlice' }
      | { __typename?: 'LinkCardSlice' }
      | { __typename?: 'LatestNewsSlice' }
      | { __typename?: 'MailingListSignupSlice' }
      | { __typename?: 'LogoListSlice' }
      | { __typename?: 'BulletListSlice' }
      | { __typename?: 'Html' }
      | { __typename?: 'Image' }
      | { __typename?: 'Statistics' }
      | { __typename?: 'ProcessEntry' }
      | { __typename?: 'FaqList' }
      | { __typename?: 'EmbeddedVideo' }
    >
  }

export type TimelineFieldsFragment = { __typename: 'TimelineSlice' } & Pick<
  TimelineSlice,
  'id' | 'title'
> & {
    events: Array<
      { __typename?: 'TimelineEvent' } & Pick<
        TimelineEvent,
        | 'id'
        | 'title'
        | 'date'
        | 'numerator'
        | 'denominator'
        | 'label'
        | 'body'
        | 'tags'
        | 'link'
      >
    >
  }

export type MailingListSignupFieldsFragment = {
  __typename: 'MailingListSignupSlice'
} & Pick<
  MailingListSignupSlice,
  'id' | 'title' | 'description' | 'inputLabel' | 'buttonText'
>

export type StoryFieldsFragment = { __typename: 'StorySlice' } & Pick<
  StorySlice,
  'id' | 'readMoreText'
> & {
    stories: Array<
      { __typename?: 'Story' } & Pick<
        Story,
        'title' | 'intro' | 'label' | 'body'
      > & { logo: { __typename?: 'Image' } & ImageFieldsFragment }
    >
  }

export type LatestNewsFieldsFragment = { __typename: 'LatestNewsSlice' } & Pick<
  LatestNewsSlice,
  'id' | 'title'
> & {
    news: Array<
      { __typename?: 'News' } & Pick<
        News,
        'title' | 'slug' | 'date' | 'intro' | 'content'
      > & { image?: Maybe<{ __typename?: 'Image' } & ImageFieldsFragment> }
    >
  }

export type LinkCardFieldsFragment = { __typename: 'LinkCardSlice' } & Pick<
  LinkCardSlice,
  'id' | 'title'
> & {
    cards: Array<
      { __typename?: 'LinkCard' } & Pick<
        LinkCard,
        'title' | 'body' | 'link' | 'linkText'
      >
    >
  }

export type HeadingFieldsFragment = { __typename: 'HeadingSlice' } & Pick<
  HeadingSlice,
  'id' | 'title' | 'body'
>

export type LogoListFieldsFragment = { __typename: 'LogoListSlice' } & Pick<
  LogoListSlice,
  'id' | 'title' | 'body'
> & { images: Array<{ __typename?: 'Image' } & ImageFieldsFragment> }

export type BulletListFieldsFragment = { __typename: 'BulletListSlice' } & Pick<
  BulletListSlice,
  'id'
> & {
    bullets: Array<
      | ({ __typename: 'IconBullet' } & Pick<
          IconBullet,
          'id' | 'title' | 'body' | 'url' | 'linkText'
        > & { icon: { __typename?: 'Image' } & ImageFieldsFragment })
      | ({ __typename: 'NumberBulletGroup' } & Pick<
          NumberBulletGroup,
          'id' | 'defaultVisible'
        > & {
            bullets: Array<
              { __typename?: 'NumberBullet' } & Pick<
                NumberBullet,
                'title' | 'body'
              >
            >
          })
    >
  }

export type FaqListFieldsFragment = { __typename: 'FaqList' } & Pick<
  FaqList,
  'id' | 'title'
> & {
    questions: Array<
      { __typename?: 'QuestionAndAnswer' } & Pick<
        QuestionAndAnswer,
        'question'
      > & { answer: { __typename?: 'Html' } & HtmlFieldsFragment }
    >
  }

export type StatisticsFieldsFragment = { __typename: 'Statistics' } & Pick<
  Statistics,
  'id' | 'title'
> & {
    statistics: Array<
      { __typename?: 'Statistic' } & Pick<Statistic, 'id' | 'value' | 'label'>
    >
  }

export type ProcessEntryFieldsFragment = { __typename?: 'ProcessEntry' } & Pick<
  ProcessEntry,
  | 'id'
  | 'title'
  | 'subtitle'
  | 'type'
  | 'processTitle'
  | 'processDescription'
  | 'processLink'
  | 'buttonText'
> & {
    details?: Maybe<{ __typename?: 'Html' } & HtmlFieldsFragment>
    processInfo?: Maybe<{ __typename?: 'Html' } & HtmlFieldsFragment>
  }

export type HtmlFieldsFragment = { __typename: 'Html' } & Pick<
  Html,
  'id' | 'document'
>

export type AllSlicesPageHeaderSliceFragment = {
  __typename?: 'PageHeaderSlice'
} & PageHeaderFieldsFragment

export type AllSlicesTimelineSliceFragment = {
  __typename?: 'TimelineSlice'
} & TimelineFieldsFragment

export type AllSlicesHeadingSliceFragment = {
  __typename?: 'HeadingSlice'
} & HeadingFieldsFragment

export type AllSlicesStorySliceFragment = {
  __typename?: 'StorySlice'
} & StoryFieldsFragment

export type AllSlicesLinkCardSliceFragment = {
  __typename?: 'LinkCardSlice'
} & LinkCardFieldsFragment

export type AllSlicesLatestNewsSliceFragment = {
  __typename?: 'LatestNewsSlice'
} & LatestNewsFieldsFragment

export type AllSlicesMailingListSignupSliceFragment = {
  __typename?: 'MailingListSignupSlice'
} & MailingListSignupFieldsFragment

export type AllSlicesLogoListSliceFragment = {
  __typename?: 'LogoListSlice'
} & LogoListFieldsFragment

export type AllSlicesBulletListSliceFragment = {
  __typename?: 'BulletListSlice'
} & BulletListFieldsFragment

export type AllSlicesHtmlFragment = { __typename?: 'Html' } & HtmlFieldsFragment

export type AllSlicesImageFragment = { __typename?: 'Image' }

export type AllSlicesStatisticsFragment = {
  __typename?: 'Statistics'
} & StatisticsFieldsFragment

export type AllSlicesProcessEntryFragment = {
  __typename?: 'ProcessEntry'
} & ProcessEntryFieldsFragment

export type AllSlicesFaqListFragment = {
  __typename?: 'FaqList'
} & FaqListFieldsFragment

export type AllSlicesEmbeddedVideoFragment = { __typename?: 'EmbeddedVideo' }

export type AllSlicesFragment =
  | AllSlicesPageHeaderSliceFragment
  | AllSlicesTimelineSliceFragment
  | AllSlicesHeadingSliceFragment
  | AllSlicesStorySliceFragment
  | AllSlicesLinkCardSliceFragment
  | AllSlicesLatestNewsSliceFragment
  | AllSlicesMailingListSignupSliceFragment
  | AllSlicesLogoListSliceFragment
  | AllSlicesBulletListSliceFragment
  | AllSlicesHtmlFragment
  | AllSlicesImageFragment
  | AllSlicesStatisticsFragment
  | AllSlicesProcessEntryFragment
  | AllSlicesFaqListFragment
  | AllSlicesEmbeddedVideoFragment
