import type { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import type { LicenseModel } from 'model/types';
import type { Context } from 'internals/graphql/context';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: string;
  JSON: unknown;
  JSONObject: Record<string, unknown>;
};

export type Mutation = {
  __typename?: 'Mutation';
  _removeCache?: Maybe<Scalars['Boolean']>;
  _setCache?: Maybe<Scalars['Boolean']>;
  _updateCache?: Maybe<Scalars['Boolean']>;
  notification: NotificationMutation;
  subscription: SubscriptionMutation;
  thread: ThreadMutation;
  uuid: UuidMutation;
};


export type Mutation_RemoveCacheArgs = {
  key: Scalars['String'];
};


export type Mutation_SetCacheArgs = {
  key: Scalars['String'];
  value: Scalars['JSON'];
};


export type Mutation_UpdateCacheArgs = {
  keys: Array<Scalars['String']>;
};

export type PageInfo = {
  __typename?: 'PageInfo';
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  startCursor?: Maybe<Scalars['String']>;
  endCursor?: Maybe<Scalars['String']>;
};


export enum Instance {
  De = 'de',
  En = 'en',
  Es = 'es',
  Fr = 'fr',
  Hi = 'hi',
  Ta = 'ta'
}

export type InstanceAware = {
  instance: Instance;
};



export type License = InstanceAware & {
  __typename?: 'License';
  id: Scalars['Int'];
  instance: Instance;
  default: Scalars['Boolean'];
  title: Scalars['String'];
  url: Scalars['String'];
  content: Scalars['String'];
  agreement: Scalars['String'];
  iconHref: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  activeAuthors: UserConnection;
  activeDonors: UserConnection;
  activeReviewers: UserConnection;
  license?: Maybe<License>;
  notificationEvent?: Maybe<AbstractNotificationEvent>;
  notifications: NotificationConnection;
  subscriptions: QuerySubscriptionResult;
  uuid?: Maybe<AbstractUuid>;
};


export type QueryActiveAuthorsArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type QueryActiveDonorsArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type QueryActiveReviewersArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type QueryLicenseArgs = {
  id: Scalars['Int'];
};


export type QueryNotificationEventArgs = {
  id: Scalars['Int'];
};


export type QueryNotificationsArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  unread?: Maybe<Scalars['Boolean']>;
};


export type QuerySubscriptionsArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type QueryUuidArgs = {
  alias?: Maybe<AliasInput>;
  id?: Maybe<Scalars['Int']>;
};

export type CheckoutRevisionNotificationEvent = AbstractNotificationEvent & InstanceAware & {
  __typename?: 'CheckoutRevisionNotificationEvent';
  id: Scalars['Int'];
  instance: Instance;
  date: Scalars['DateTime'];
  actor: User;
  objectId: Scalars['Int'];
  repository: AbstractRepository;
  revision: AbstractRevision;
  reason: Scalars['String'];
};

export type CreateCommentNotificationEvent = AbstractNotificationEvent & InstanceAware & {
  __typename?: 'CreateCommentNotificationEvent';
  id: Scalars['Int'];
  instance: Instance;
  date: Scalars['DateTime'];
  actor: User;
  objectId: Scalars['Int'];
  thread: UnsupportedThread;
  comment: UnsupportedComment;
};

export type CreateEntityLinkNotificationEvent = AbstractNotificationEvent & InstanceAware & {
  __typename?: 'CreateEntityLinkNotificationEvent';
  id: Scalars['Int'];
  instance: Instance;
  date: Scalars['DateTime'];
  actor: User;
  objectId: Scalars['Int'];
  parent: AbstractEntity;
  child: AbstractEntity;
};

export type CreateEntityNotificationEvent = AbstractNotificationEvent & InstanceAware & {
  __typename?: 'CreateEntityNotificationEvent';
  id: Scalars['Int'];
  instance: Instance;
  date: Scalars['DateTime'];
  actor: User;
  objectId: Scalars['Int'];
  entity: AbstractEntity;
};

export type CreateEntityRevisionNotificationEvent = AbstractNotificationEvent & InstanceAware & {
  __typename?: 'CreateEntityRevisionNotificationEvent';
  id: Scalars['Int'];
  instance: Instance;
  date: Scalars['DateTime'];
  actor: User;
  objectId: Scalars['Int'];
  entity: AbstractEntity;
  entityRevision: AbstractEntityRevision;
};

export type CreateTaxonomyLinkNotificationEvent = AbstractNotificationEvent & InstanceAware & {
  __typename?: 'CreateTaxonomyLinkNotificationEvent';
  id: Scalars['Int'];
  instance: Instance;
  date: Scalars['DateTime'];
  actor: User;
  objectId: Scalars['Int'];
  parent: TaxonomyTerm;
  child: AbstractUuid;
};

export type CreateTaxonomyTermNotificationEvent = AbstractNotificationEvent & InstanceAware & {
  __typename?: 'CreateTaxonomyTermNotificationEvent';
  id: Scalars['Int'];
  instance: Instance;
  date: Scalars['DateTime'];
  actor: User;
  objectId: Scalars['Int'];
  taxonomyTerm: TaxonomyTerm;
};

export type CreateThreadNotificationEvent = AbstractNotificationEvent & InstanceAware & {
  __typename?: 'CreateThreadNotificationEvent';
  id: Scalars['Int'];
  instance: Instance;
  date: Scalars['DateTime'];
  actor: User;
  objectId: Scalars['Int'];
  object: AbstractUuid;
  thread: UnsupportedThread;
};

export type RejectRevisionNotificationEvent = AbstractNotificationEvent & InstanceAware & {
  __typename?: 'RejectRevisionNotificationEvent';
  id: Scalars['Int'];
  instance: Instance;
  date: Scalars['DateTime'];
  actor: User;
  objectId: Scalars['Int'];
  repository: AbstractRepository;
  revision: AbstractRevision;
  reason: Scalars['String'];
};

export type RemoveEntityLinkNotificationEvent = AbstractNotificationEvent & InstanceAware & {
  __typename?: 'RemoveEntityLinkNotificationEvent';
  id: Scalars['Int'];
  instance: Instance;
  date: Scalars['DateTime'];
  actor: User;
  objectId: Scalars['Int'];
  parent: AbstractEntity;
  child: AbstractEntity;
};

export type RemoveTaxonomyLinkNotificationEvent = AbstractNotificationEvent & InstanceAware & {
  __typename?: 'RemoveTaxonomyLinkNotificationEvent';
  id: Scalars['Int'];
  instance: Instance;
  date: Scalars['DateTime'];
  actor: User;
  objectId: Scalars['Int'];
  parent: TaxonomyTerm;
  child: AbstractUuid;
};

export type SetLicenseNotificationEvent = AbstractNotificationEvent & InstanceAware & {
  __typename?: 'SetLicenseNotificationEvent';
  id: Scalars['Int'];
  instance: Instance;
  date: Scalars['DateTime'];
  actor: User;
  objectId: Scalars['Int'];
  repository: AbstractRepository;
};

export type SetTaxonomyParentNotificationEvent = AbstractNotificationEvent & InstanceAware & {
  __typename?: 'SetTaxonomyParentNotificationEvent';
  id: Scalars['Int'];
  instance: Instance;
  date: Scalars['DateTime'];
  actor: User;
  objectId: Scalars['Int'];
  previousParent?: Maybe<TaxonomyTerm>;
  parent?: Maybe<TaxonomyTerm>;
  child: TaxonomyTerm;
};

export type SetTaxonomyTermNotificationEvent = AbstractNotificationEvent & InstanceAware & {
  __typename?: 'SetTaxonomyTermNotificationEvent';
  id: Scalars['Int'];
  instance: Instance;
  date: Scalars['DateTime'];
  actor: User;
  objectId: Scalars['Int'];
  taxonomyTerm: TaxonomyTerm;
};

export type SetThreadStateNotificationEvent = AbstractNotificationEvent & InstanceAware & {
  __typename?: 'SetThreadStateNotificationEvent';
  id: Scalars['Int'];
  instance: Instance;
  date: Scalars['DateTime'];
  actor: User;
  objectId: Scalars['Int'];
  thread: UnsupportedThread;
  archived: Scalars['Boolean'];
};

export type SetUuidStateNotificationEvent = AbstractNotificationEvent & InstanceAware & {
  __typename?: 'SetUuidStateNotificationEvent';
  id: Scalars['Int'];
  instance: Instance;
  date: Scalars['DateTime'];
  actor: User;
  objectId: Scalars['Int'];
  object: AbstractUuid;
  trashed: Scalars['Boolean'];
};

export type Notification = {
  __typename?: 'Notification';
  id: Scalars['Int'];
  unread: Scalars['Boolean'];
  event: AbstractNotificationEvent;
};

export type AbstractNotificationEvent = {
  id: Scalars['Int'];
  instance: Instance;
  date: Scalars['DateTime'];
  actor: User;
  objectId: Scalars['Int'];
};

export type NotificationMutation = {
  __typename?: 'NotificationMutation';
  setState?: Maybe<NotificationSetStateResponse>;
};


export type NotificationMutationSetStateArgs = {
  input: NotificationSetStateInput;
};

export type NotificationSetStateInput = {
  id: Array<Scalars['Int']>;
  unread: Scalars['Boolean'];
};

export type NotificationSetStateResponse = {
  __typename?: 'NotificationSetStateResponse';
  success: Scalars['Boolean'];
  query: Query;
};

export type NotificationConnection = {
  __typename?: 'NotificationConnection';
  edges: Array<NotificationEdge>;
  nodes: Array<Notification>;
  totalCount: Scalars['Int'];
  pageInfo: PageInfo;
};

export type NotificationEdge = {
  __typename?: 'NotificationEdge';
  cursor: Scalars['String'];
  node: Notification;
};

export type QuerySubscriptionResult = {
  __typename?: 'QuerySubscriptionResult';
  edges: Array<SubscriptionCursor>;
  nodes: Array<AbstractUuid>;
  totalCount: Scalars['Int'];
  pageInfo: PageInfo;
};

export type SubscriptionCursor = {
  __typename?: 'SubscriptionCursor';
  cursor: Scalars['String'];
  node: AbstractUuid;
};

export type SubscriptionMutation = {
  __typename?: 'SubscriptionMutation';
  set?: Maybe<SubscriptionSetResponse>;
};


export type SubscriptionMutationSetArgs = {
  input: SubscriptionSetInput;
};

export type SubscriptionSetInput = {
  id: Array<Scalars['Int']>;
  subscribe: Scalars['Boolean'];
  sendEmail: Scalars['Boolean'];
};

export type SubscriptionSetResponse = {
  __typename?: 'SubscriptionSetResponse';
  success: Scalars['Boolean'];
  query: Query;
};

export type Thread = {
  __typename?: 'Thread';
  id: Scalars['String'];
  createdAt: Scalars['DateTime'];
  title?: Maybe<Scalars['String']>;
  archived: Scalars['Boolean'];
  object: AbstractUuid;
  comments: CommentConnection;
};


export type ThreadCommentsArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export type Comment = AbstractUuid & {
  __typename?: 'Comment';
  id: Scalars['Int'];
  title: Scalars['String'];
  content: Scalars['String'];
  alias: Scalars['String'];
  trashed: Scalars['Boolean'];
  archived: Scalars['Boolean'];
  createdAt: Scalars['DateTime'];
  author: User;
};

export type ThreadAware = {
  threads: ThreadsConnection;
};


export type ThreadAwareThreadsArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  archived?: Maybe<Scalars['Boolean']>;
  trashed?: Maybe<Scalars['Boolean']>;
};

export type ThreadsConnection = {
  __typename?: 'ThreadsConnection';
  edges: Array<ThreadsCursor>;
  nodes: Array<Thread>;
  totalCount: Scalars['Int'];
  pageInfo: PageInfo;
};

export type ThreadsCursor = {
  __typename?: 'ThreadsCursor';
  cursor: Scalars['String'];
  node: Thread;
};

export type UnsupportedThread = {
  __typename?: 'UnsupportedThread';
  id: Scalars['Int'];
};

export type UnsupportedComment = {
  __typename?: 'UnsupportedComment';
  id: Scalars['Int'];
};

export type CommentConnection = {
  __typename?: 'CommentConnection';
  edges: Array<CommentEdge>;
  nodes: Array<Comment>;
  totalCount: Scalars['Int'];
  pageInfo: PageInfo;
};

export type CommentEdge = {
  __typename?: 'CommentEdge';
  cursor: Scalars['String'];
  node: Comment;
};

export type ThreadMutation = {
  __typename?: 'ThreadMutation';
  createThread?: Maybe<ThreadCreateThreadResponse>;
  createComment?: Maybe<ThreadCreateCommentResponse>;
  setThreadArchived?: Maybe<ThreadSetThreadArchivedResponse>;
  setThreadState?: Maybe<ThreadSetThreadStateResponse>;
  setCommentState?: Maybe<ThreadSetCommentStateResponse>;
};


export type ThreadMutationCreateThreadArgs = {
  input: ThreadCreateThreadInput;
};


export type ThreadMutationCreateCommentArgs = {
  input: ThreadCreateCommentInput;
};


export type ThreadMutationSetThreadArchivedArgs = {
  input: ThreadSetThreadArchivedInput;
};


export type ThreadMutationSetThreadStateArgs = {
  input: ThreadSetThreadStateInput;
};


export type ThreadMutationSetCommentStateArgs = {
  input: ThreadSetCommentStateInput;
};

export type ThreadCreateThreadInput = {
  title: Scalars['String'];
  content: Scalars['String'];
  objectId: Scalars['Int'];
  subscribe: Scalars['Boolean'];
  sendEmail: Scalars['Boolean'];
};

export type ThreadCreateThreadResponse = {
  __typename?: 'ThreadCreateThreadResponse';
  record?: Maybe<Thread>;
  success: Scalars['Boolean'];
  query: Query;
};

export type ThreadCreateCommentInput = {
  content: Scalars['String'];
  threadId: Scalars['String'];
  subscribe: Scalars['Boolean'];
  sendEmail: Scalars['Boolean'];
};

export type ThreadCreateCommentResponse = {
  __typename?: 'ThreadCreateCommentResponse';
  record?: Maybe<Comment>;
  success: Scalars['Boolean'];
  query: Query;
};

export type ThreadSetThreadArchivedInput = {
  id: Array<Scalars['String']>;
  archived: Scalars['Boolean'];
};

export type ThreadSetThreadArchivedResponse = {
  __typename?: 'ThreadSetThreadArchivedResponse';
  success: Scalars['Boolean'];
  query: Query;
};

export type ThreadSetThreadStateInput = {
  id: Array<Scalars['String']>;
  trashed: Scalars['Boolean'];
};

export type ThreadSetThreadStateResponse = {
  __typename?: 'ThreadSetThreadStateResponse';
  success: Scalars['Boolean'];
  query: Query;
};

export type ThreadSetCommentStateInput = {
  id: Array<Scalars['Int']>;
  trashed: Scalars['Boolean'];
};

export type ThreadSetCommentStateResponse = {
  __typename?: 'ThreadSetCommentStateResponse';
  success: Scalars['Boolean'];
  query: Query;
};

export type AbstractEntity = {
  id: Scalars['Int'];
  trashed: Scalars['Boolean'];
  date: Scalars['DateTime'];
  instance: Instance;
  alias?: Maybe<Scalars['String']>;
  license: License;
};

export type AbstractEntityRevision = {
  id: Scalars['Int'];
  trashed: Scalars['Boolean'];
  author: User;
  date: Scalars['DateTime'];
  content: Scalars['String'];
  changes: Scalars['String'];
};

export type AbstractExercise = {
  id: Scalars['Int'];
  trashed: Scalars['Boolean'];
  date: Scalars['DateTime'];
  instance: Instance;
  alias?: Maybe<Scalars['String']>;
  license: License;
  currentRevision?: Maybe<AbstractExerciseRevision>;
  solution?: Maybe<Solution>;
};

export type AbstractExerciseRevision = {
  id: Scalars['Int'];
  trashed: Scalars['Boolean'];
  alias?: Maybe<Scalars['String']>;
  author: User;
  date: Scalars['DateTime'];
  content: Scalars['String'];
  changes: Scalars['String'];
};

export type AbstractNavigationChild = {
  navigation?: Maybe<Navigation>;
};

export type Navigation = {
  __typename?: 'Navigation';
  data: Scalars['JSON'];
  path: NavigationNodeConnection;
};


export type NavigationPathArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export type NavigationNodeConnection = {
  __typename?: 'NavigationNodeConnection';
  edges?: Maybe<Array<Maybe<NavigationNodeEdge>>>;
  nodes: Array<NavigationNode>;
  totalCount: Scalars['Int'];
  pageInfo: PageInfo;
};

export type NavigationNodeEdge = {
  __typename?: 'NavigationNodeEdge';
  cursor: Scalars['String'];
  node: NavigationNode;
};

export type NavigationNode = {
  __typename?: 'NavigationNode';
  label: Scalars['String'];
  url?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
};

export type AbstractRepository = {
  id: Scalars['Int'];
  trashed: Scalars['Boolean'];
  alias?: Maybe<Scalars['String']>;
  threads: ThreadsConnection;
  date: Scalars['DateTime'];
  instance: Instance;
  license: License;
};


export type AbstractRepositoryThreadsArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  archived?: Maybe<Scalars['Boolean']>;
  trashed?: Maybe<Scalars['Boolean']>;
};

export type AbstractRevision = {
  id: Scalars['Int'];
  trashed: Scalars['Boolean'];
  alias?: Maybe<Scalars['String']>;
  threads: ThreadsConnection;
  author: User;
  date: Scalars['DateTime'];
  content: Scalars['String'];
};


export type AbstractRevisionThreadsArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  archived?: Maybe<Scalars['Boolean']>;
  trashed?: Maybe<Scalars['Boolean']>;
};

export type AbstractTaxonomyTermChild = {
  id: Scalars['Int'];
  trashed: Scalars['Boolean'];
  alias?: Maybe<Scalars['String']>;
  date: Scalars['DateTime'];
  instance: Instance;
  license: License;
  taxonomyTerms: TaxonomyTermConnection;
};


export type AbstractTaxonomyTermChildTaxonomyTermsArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export type TaxonomyTermConnection = {
  __typename?: 'TaxonomyTermConnection';
  edges?: Maybe<Array<Maybe<TaxonomyTermEdge>>>;
  nodes: Array<TaxonomyTerm>;
  totalCount: Scalars['Int'];
  pageInfo: PageInfo;
};

export type TaxonomyTermEdge = {
  __typename?: 'TaxonomyTermEdge';
  cursor: Scalars['String'];
  node: TaxonomyTerm;
};

export type AbstractUuid = {
  id: Scalars['Int'];
  trashed: Scalars['Boolean'];
  alias?: Maybe<Scalars['String']>;
};

export type AbstractUuidConnection = {
  __typename?: 'AbstractUuidConnection';
  edges: Array<AbstractUuidCursor>;
  nodes: Array<AbstractUuid>;
  totalCount: Scalars['Int'];
  pageInfo: PageInfo;
};

export type AbstractUuidCursor = {
  __typename?: 'AbstractUuidCursor';
  cursor: Scalars['String'];
  node: AbstractUuid;
};

export type UuidMutation = {
  __typename?: 'UuidMutation';
  setState?: Maybe<UuidSetStateResponse>;
};


export type UuidMutationSetStateArgs = {
  input: UuidSetStateInput;
};

export type UuidSetStateInput = {
  id: Array<Scalars['Int']>;
  trashed: Scalars['Boolean'];
};

export type UuidSetStateResponse = {
  __typename?: 'UuidSetStateResponse';
  success: Scalars['Boolean'];
  query: Query;
};

export type AliasInput = {
  instance: Instance;
  path: Scalars['String'];
};

export type Applet = AbstractUuid & AbstractRepository & AbstractEntity & AbstractTaxonomyTermChild & InstanceAware & ThreadAware & {
  __typename?: 'Applet';
  id: Scalars['Int'];
  trashed: Scalars['Boolean'];
  threads: ThreadsConnection;
  instance: Instance;
  alias?: Maybe<Scalars['String']>;
  date: Scalars['DateTime'];
  license: License;
  currentRevision?: Maybe<AppletRevision>;
  revisions: AppletRevisionConnection;
  taxonomyTerms: TaxonomyTermConnection;
};


export type AppletThreadsArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  archived?: Maybe<Scalars['Boolean']>;
  trashed?: Maybe<Scalars['Boolean']>;
};


export type AppletRevisionsArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  unrevised?: Maybe<Scalars['Boolean']>;
};


export type AppletTaxonomyTermsArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export type AppletRevision = AbstractUuid & AbstractRevision & AbstractEntityRevision & ThreadAware & {
  __typename?: 'AppletRevision';
  id: Scalars['Int'];
  author: User;
  trashed: Scalars['Boolean'];
  alias?: Maybe<Scalars['String']>;
  threads: ThreadsConnection;
  date: Scalars['DateTime'];
  repository: Applet;
  url: Scalars['String'];
  title: Scalars['String'];
  content: Scalars['String'];
  changes: Scalars['String'];
  metaTitle: Scalars['String'];
  metaDescription: Scalars['String'];
};


export type AppletRevisionThreadsArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  archived?: Maybe<Scalars['Boolean']>;
  trashed?: Maybe<Scalars['Boolean']>;
};

export type AppletRevisionConnection = {
  __typename?: 'AppletRevisionConnection';
  edges: Array<AppletRevisionCursor>;
  nodes: Array<AppletRevision>;
  totalCount: Scalars['Int'];
  pageInfo: PageInfo;
};

export type AppletRevisionCursor = {
  __typename?: 'AppletRevisionCursor';
  cursor: Scalars['String'];
  node: AppletRevision;
};

export type Article = AbstractUuid & AbstractRepository & AbstractEntity & AbstractTaxonomyTermChild & InstanceAware & ThreadAware & {
  __typename?: 'Article';
  id: Scalars['Int'];
  trashed: Scalars['Boolean'];
  threads: ThreadsConnection;
  instance: Instance;
  alias?: Maybe<Scalars['String']>;
  date: Scalars['DateTime'];
  license: License;
  currentRevision?: Maybe<ArticleRevision>;
  revisions: ArticleRevisionConnection;
  taxonomyTerms: TaxonomyTermConnection;
};


export type ArticleThreadsArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  archived?: Maybe<Scalars['Boolean']>;
  trashed?: Maybe<Scalars['Boolean']>;
};


export type ArticleRevisionsArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  unrevised?: Maybe<Scalars['Boolean']>;
};


export type ArticleTaxonomyTermsArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export type ArticleRevision = AbstractUuid & AbstractRevision & AbstractEntityRevision & ThreadAware & {
  __typename?: 'ArticleRevision';
  id: Scalars['Int'];
  author: User;
  trashed: Scalars['Boolean'];
  alias?: Maybe<Scalars['String']>;
  threads: ThreadsConnection;
  date: Scalars['DateTime'];
  repository: Article;
  title: Scalars['String'];
  content: Scalars['String'];
  changes: Scalars['String'];
  metaTitle: Scalars['String'];
  metaDescription: Scalars['String'];
};


export type ArticleRevisionThreadsArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  archived?: Maybe<Scalars['Boolean']>;
  trashed?: Maybe<Scalars['Boolean']>;
};

export type ArticleRevisionConnection = {
  __typename?: 'ArticleRevisionConnection';
  edges: Array<ArticleRevisionCursor>;
  nodes: Array<ArticleRevision>;
  totalCount: Scalars['Int'];
  pageInfo: PageInfo;
};

export type ArticleRevisionCursor = {
  __typename?: 'ArticleRevisionCursor';
  cursor: Scalars['String'];
  node: ArticleRevision;
};

export type CoursePage = AbstractUuid & AbstractRepository & AbstractEntity & InstanceAware & ThreadAware & {
  __typename?: 'CoursePage';
  id: Scalars['Int'];
  trashed: Scalars['Boolean'];
  threads: ThreadsConnection;
  instance: Instance;
  alias?: Maybe<Scalars['String']>;
  date: Scalars['DateTime'];
  license: License;
  currentRevision?: Maybe<CoursePageRevision>;
  revisions: CoursePageRevisionConnection;
  course: Course;
};


export type CoursePageThreadsArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  archived?: Maybe<Scalars['Boolean']>;
  trashed?: Maybe<Scalars['Boolean']>;
};


export type CoursePageRevisionsArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  unrevised?: Maybe<Scalars['Boolean']>;
};

export type CoursePageRevision = AbstractUuid & AbstractRevision & AbstractEntityRevision & ThreadAware & {
  __typename?: 'CoursePageRevision';
  id: Scalars['Int'];
  author: User;
  trashed: Scalars['Boolean'];
  alias?: Maybe<Scalars['String']>;
  threads: ThreadsConnection;
  date: Scalars['DateTime'];
  repository: CoursePage;
  title: Scalars['String'];
  content: Scalars['String'];
  changes: Scalars['String'];
};


export type CoursePageRevisionThreadsArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  archived?: Maybe<Scalars['Boolean']>;
  trashed?: Maybe<Scalars['Boolean']>;
};

export type CoursePageRevisionConnection = {
  __typename?: 'CoursePageRevisionConnection';
  edges: Array<CoursePageRevisionCursor>;
  nodes: Array<CoursePageRevision>;
  totalCount: Scalars['Int'];
  pageInfo: PageInfo;
};

export type CoursePageRevisionCursor = {
  __typename?: 'CoursePageRevisionCursor';
  cursor: Scalars['String'];
  node: CoursePageRevision;
};

export type Course = AbstractUuid & AbstractRepository & AbstractEntity & AbstractTaxonomyTermChild & InstanceAware & ThreadAware & {
  __typename?: 'Course';
  id: Scalars['Int'];
  trashed: Scalars['Boolean'];
  threads: ThreadsConnection;
  instance: Instance;
  alias?: Maybe<Scalars['String']>;
  date: Scalars['DateTime'];
  license: License;
  currentRevision?: Maybe<CourseRevision>;
  revisions: CourseRevisionConnection;
  taxonomyTerms: TaxonomyTermConnection;
  pages: Array<CoursePage>;
};


export type CourseThreadsArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  archived?: Maybe<Scalars['Boolean']>;
  trashed?: Maybe<Scalars['Boolean']>;
};


export type CourseRevisionsArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  unrevised?: Maybe<Scalars['Boolean']>;
};


export type CourseTaxonomyTermsArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type CoursePagesArgs = {
  trashed?: Maybe<Scalars['Boolean']>;
  hasCurrentRevision?: Maybe<Scalars['Boolean']>;
};

export type CourseRevision = AbstractUuid & AbstractRevision & AbstractEntityRevision & ThreadAware & {
  __typename?: 'CourseRevision';
  id: Scalars['Int'];
  author: User;
  trashed: Scalars['Boolean'];
  alias?: Maybe<Scalars['String']>;
  threads: ThreadsConnection;
  date: Scalars['DateTime'];
  repository: Course;
  title: Scalars['String'];
  content: Scalars['String'];
  changes: Scalars['String'];
  metaDescription: Scalars['String'];
};


export type CourseRevisionThreadsArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  archived?: Maybe<Scalars['Boolean']>;
  trashed?: Maybe<Scalars['Boolean']>;
};

export type CourseRevisionConnection = {
  __typename?: 'CourseRevisionConnection';
  edges: Array<CourseRevisionCursor>;
  nodes: Array<CourseRevision>;
  totalCount: Scalars['Int'];
  pageInfo: PageInfo;
};

export type CourseRevisionCursor = {
  __typename?: 'CourseRevisionCursor';
  cursor: Scalars['String'];
  node: CourseRevision;
};

export type Event = AbstractUuid & AbstractRepository & AbstractEntity & AbstractTaxonomyTermChild & InstanceAware & ThreadAware & {
  __typename?: 'Event';
  id: Scalars['Int'];
  trashed: Scalars['Boolean'];
  threads: ThreadsConnection;
  instance: Instance;
  alias?: Maybe<Scalars['String']>;
  date: Scalars['DateTime'];
  license: License;
  currentRevision?: Maybe<EventRevision>;
  revisions: EventRevisionConnection;
  taxonomyTerms: TaxonomyTermConnection;
};


export type EventThreadsArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  archived?: Maybe<Scalars['Boolean']>;
  trashed?: Maybe<Scalars['Boolean']>;
};


export type EventRevisionsArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  unrevised?: Maybe<Scalars['Boolean']>;
};


export type EventTaxonomyTermsArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export type EventRevision = AbstractUuid & AbstractRevision & AbstractEntityRevision & ThreadAware & {
  __typename?: 'EventRevision';
  id: Scalars['Int'];
  author: User;
  trashed: Scalars['Boolean'];
  alias?: Maybe<Scalars['String']>;
  threads: ThreadsConnection;
  date: Scalars['DateTime'];
  repository: Event;
  title: Scalars['String'];
  content: Scalars['String'];
  changes: Scalars['String'];
  metaTitle: Scalars['String'];
  metaDescription: Scalars['String'];
};


export type EventRevisionThreadsArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  archived?: Maybe<Scalars['Boolean']>;
  trashed?: Maybe<Scalars['Boolean']>;
};

export type EventRevisionConnection = {
  __typename?: 'EventRevisionConnection';
  edges: Array<EventRevisionCursor>;
  nodes: Array<EventRevision>;
  totalCount: Scalars['Int'];
  pageInfo: PageInfo;
};

export type EventRevisionCursor = {
  __typename?: 'EventRevisionCursor';
  cursor: Scalars['String'];
  node: EventRevision;
};

export type ExerciseGroup = AbstractUuid & AbstractRepository & AbstractEntity & AbstractTaxonomyTermChild & InstanceAware & ThreadAware & {
  __typename?: 'ExerciseGroup';
  id: Scalars['Int'];
  trashed: Scalars['Boolean'];
  threads: ThreadsConnection;
  instance: Instance;
  alias?: Maybe<Scalars['String']>;
  date: Scalars['DateTime'];
  license: License;
  currentRevision?: Maybe<ExerciseGroupRevision>;
  revisions: ExerciseGroupRevisionConnection;
  taxonomyTerms: TaxonomyTermConnection;
  exercises: Array<GroupedExercise>;
};


export type ExerciseGroupThreadsArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  archived?: Maybe<Scalars['Boolean']>;
  trashed?: Maybe<Scalars['Boolean']>;
};


export type ExerciseGroupRevisionsArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  unrevised?: Maybe<Scalars['Boolean']>;
};


export type ExerciseGroupTaxonomyTermsArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export type ExerciseGroupRevision = AbstractUuid & AbstractRevision & AbstractEntityRevision & ThreadAware & {
  __typename?: 'ExerciseGroupRevision';
  id: Scalars['Int'];
  author: User;
  trashed: Scalars['Boolean'];
  alias?: Maybe<Scalars['String']>;
  threads: ThreadsConnection;
  date: Scalars['DateTime'];
  repository: ExerciseGroup;
  content: Scalars['String'];
  changes: Scalars['String'];
};


export type ExerciseGroupRevisionThreadsArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  archived?: Maybe<Scalars['Boolean']>;
  trashed?: Maybe<Scalars['Boolean']>;
};

export type ExerciseGroupRevisionConnection = {
  __typename?: 'ExerciseGroupRevisionConnection';
  edges: Array<ExerciseGroupRevisionCursor>;
  nodes: Array<ExerciseGroupRevision>;
  totalCount: Scalars['Int'];
  pageInfo: PageInfo;
};

export type ExerciseGroupRevisionCursor = {
  __typename?: 'ExerciseGroupRevisionCursor';
  cursor: Scalars['String'];
  node: ExerciseGroupRevision;
};

export type Exercise = AbstractUuid & AbstractRepository & AbstractEntity & AbstractTaxonomyTermChild & AbstractExercise & InstanceAware & ThreadAware & {
  __typename?: 'Exercise';
  id: Scalars['Int'];
  trashed: Scalars['Boolean'];
  threads: ThreadsConnection;
  instance: Instance;
  alias?: Maybe<Scalars['String']>;
  date: Scalars['DateTime'];
  license: License;
  currentRevision?: Maybe<ExerciseRevision>;
  revisions: ExerciseRevisionConnection;
  taxonomyTerms: TaxonomyTermConnection;
  solution?: Maybe<Solution>;
};


export type ExerciseThreadsArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  archived?: Maybe<Scalars['Boolean']>;
  trashed?: Maybe<Scalars['Boolean']>;
};


export type ExerciseRevisionsArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  unrevised?: Maybe<Scalars['Boolean']>;
};


export type ExerciseTaxonomyTermsArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export type ExerciseRevision = AbstractUuid & AbstractRevision & AbstractEntityRevision & AbstractExerciseRevision & ThreadAware & {
  __typename?: 'ExerciseRevision';
  id: Scalars['Int'];
  author: User;
  trashed: Scalars['Boolean'];
  alias?: Maybe<Scalars['String']>;
  threads: ThreadsConnection;
  date: Scalars['DateTime'];
  repository: Exercise;
  content: Scalars['String'];
  changes: Scalars['String'];
};


export type ExerciseRevisionThreadsArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  archived?: Maybe<Scalars['Boolean']>;
  trashed?: Maybe<Scalars['Boolean']>;
};

export type ExerciseRevisionConnection = {
  __typename?: 'ExerciseRevisionConnection';
  edges: Array<ExerciseRevisionCursor>;
  nodes: Array<ExerciseRevision>;
  totalCount: Scalars['Int'];
  pageInfo: PageInfo;
};

export type ExerciseRevisionCursor = {
  __typename?: 'ExerciseRevisionCursor';
  cursor: Scalars['String'];
  node: ExerciseRevision;
};

export type GroupedExercise = AbstractUuid & AbstractRepository & AbstractEntity & AbstractExercise & InstanceAware & ThreadAware & {
  __typename?: 'GroupedExercise';
  id: Scalars['Int'];
  trashed: Scalars['Boolean'];
  threads: ThreadsConnection;
  instance: Instance;
  alias?: Maybe<Scalars['String']>;
  date: Scalars['DateTime'];
  license: License;
  currentRevision?: Maybe<GroupedExerciseRevision>;
  revisions: GroupedExerciseRevisionConnection;
  solution?: Maybe<Solution>;
  exerciseGroup: ExerciseGroup;
};


export type GroupedExerciseThreadsArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  archived?: Maybe<Scalars['Boolean']>;
  trashed?: Maybe<Scalars['Boolean']>;
};


export type GroupedExerciseRevisionsArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  unrevised?: Maybe<Scalars['Boolean']>;
};

export type GroupedExerciseRevision = AbstractUuid & AbstractRevision & AbstractEntityRevision & AbstractExerciseRevision & ThreadAware & {
  __typename?: 'GroupedExerciseRevision';
  id: Scalars['Int'];
  author: User;
  trashed: Scalars['Boolean'];
  alias?: Maybe<Scalars['String']>;
  threads: ThreadsConnection;
  date: Scalars['DateTime'];
  repository: GroupedExercise;
  content: Scalars['String'];
  changes: Scalars['String'];
};


export type GroupedExerciseRevisionThreadsArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  archived?: Maybe<Scalars['Boolean']>;
  trashed?: Maybe<Scalars['Boolean']>;
};

export type GroupedExerciseRevisionConnection = {
  __typename?: 'GroupedExerciseRevisionConnection';
  edges: Array<GroupedExerciseRevisionCursor>;
  nodes: Array<GroupedExerciseRevision>;
  totalCount: Scalars['Int'];
  pageInfo: PageInfo;
};

export type GroupedExerciseRevisionCursor = {
  __typename?: 'GroupedExerciseRevisionCursor';
  cursor: Scalars['String'];
  node: GroupedExerciseRevision;
};

export type Page = AbstractUuid & AbstractRepository & AbstractNavigationChild & InstanceAware & ThreadAware & {
  __typename?: 'Page';
  id: Scalars['Int'];
  trashed: Scalars['Boolean'];
  threads: ThreadsConnection;
  date: Scalars['DateTime'];
  instance: Instance;
  alias?: Maybe<Scalars['String']>;
  license: License;
  currentRevision?: Maybe<PageRevision>;
  revisions: PageRevisionConnection;
  navigation?: Maybe<Navigation>;
};


export type PageThreadsArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  archived?: Maybe<Scalars['Boolean']>;
  trashed?: Maybe<Scalars['Boolean']>;
};


export type PageRevisionsArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  unrevised?: Maybe<Scalars['Boolean']>;
};

export type PageRevision = AbstractUuid & AbstractRevision & ThreadAware & {
  __typename?: 'PageRevision';
  id: Scalars['Int'];
  author: User;
  trashed: Scalars['Boolean'];
  alias?: Maybe<Scalars['String']>;
  threads: ThreadsConnection;
  date: Scalars['DateTime'];
  title: Scalars['String'];
  content: Scalars['String'];
  repository: Page;
};


export type PageRevisionThreadsArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  archived?: Maybe<Scalars['Boolean']>;
  trashed?: Maybe<Scalars['Boolean']>;
};

export type PageRevisionConnection = {
  __typename?: 'PageRevisionConnection';
  edges: Array<PageRevisionCursor>;
  nodes: Array<PageRevision>;
  totalCount: Scalars['Int'];
  pageInfo: PageInfo;
};

export type PageRevisionCursor = {
  __typename?: 'PageRevisionCursor';
  cursor: Scalars['String'];
  node: PageRevision;
};

export type Solution = AbstractUuid & AbstractRepository & AbstractEntity & InstanceAware & ThreadAware & {
  __typename?: 'Solution';
  id: Scalars['Int'];
  trashed: Scalars['Boolean'];
  threads: ThreadsConnection;
  instance: Instance;
  alias?: Maybe<Scalars['String']>;
  date: Scalars['DateTime'];
  license: License;
  currentRevision?: Maybe<SolutionRevision>;
  revisions?: Maybe<SolutionRevisionConnection>;
  exercise: AbstractExercise;
};


export type SolutionThreadsArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  archived?: Maybe<Scalars['Boolean']>;
  trashed?: Maybe<Scalars['Boolean']>;
};


export type SolutionRevisionsArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  unrevised?: Maybe<Scalars['Boolean']>;
};

export type SolutionRevision = AbstractUuid & AbstractRevision & AbstractEntityRevision & ThreadAware & {
  __typename?: 'SolutionRevision';
  id: Scalars['Int'];
  author: User;
  trashed: Scalars['Boolean'];
  alias?: Maybe<Scalars['String']>;
  threads: ThreadsConnection;
  date: Scalars['DateTime'];
  repository: Solution;
  content: Scalars['String'];
  changes: Scalars['String'];
};


export type SolutionRevisionThreadsArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  archived?: Maybe<Scalars['Boolean']>;
  trashed?: Maybe<Scalars['Boolean']>;
};

export type SolutionRevisionConnection = {
  __typename?: 'SolutionRevisionConnection';
  edges: Array<SolutionRevisionCursor>;
  nodes: Array<SolutionRevision>;
  totalCount: Scalars['Int'];
  pageInfo: PageInfo;
};

export type SolutionRevisionCursor = {
  __typename?: 'SolutionRevisionCursor';
  cursor: Scalars['String'];
  node: SolutionRevision;
};

export enum TaxonomyTermType {
  Blog = 'blog',
  Curriculum = 'curriculum',
  CurriculumTopic = 'curriculumTopic',
  CurriculumTopicFolder = 'curriculumTopicFolder',
  Forum = 'forum',
  ForumCategory = 'forumCategory',
  Locale = 'locale',
  Root = 'root',
  Subject = 'subject',
  Topic = 'topic',
  TopicFolder = 'topicFolder'
}

export type TaxonomyTerm = AbstractUuid & AbstractNavigationChild & InstanceAware & ThreadAware & {
  __typename?: 'TaxonomyTerm';
  id: Scalars['Int'];
  trashed: Scalars['Boolean'];
  threads: ThreadsConnection;
  type: TaxonomyTermType;
  instance: Instance;
  alias?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  weight: Scalars['Int'];
  parent?: Maybe<TaxonomyTerm>;
  children: AbstractUuidConnection;
  navigation?: Maybe<Navigation>;
};


export type TaxonomyTermThreadsArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  archived?: Maybe<Scalars['Boolean']>;
  trashed?: Maybe<Scalars['Boolean']>;
};


export type TaxonomyTermChildrenArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export type User = AbstractUuid & ThreadAware & {
  __typename?: 'User';
  id: Scalars['Int'];
  trashed: Scalars['Boolean'];
  threads: ThreadsConnection;
  alias?: Maybe<Scalars['String']>;
  username: Scalars['String'];
  date: Scalars['DateTime'];
  lastLogin?: Maybe<Scalars['DateTime']>;
  description?: Maybe<Scalars['String']>;
  activeAuthor: Scalars['Boolean'];
  activeDonor: Scalars['Boolean'];
  activeReviewer: Scalars['Boolean'];
};


export type UserThreadsArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  archived?: Maybe<Scalars['Boolean']>;
  trashed?: Maybe<Scalars['Boolean']>;
};

export type UserConnection = {
  __typename?: 'UserConnection';
  edges: Array<UserEdge>;
  nodes: Array<User>;
  totalCount: Scalars['Int'];
  pageInfo: PageInfo;
};

export type UserEdge = {
  __typename?: 'UserEdge';
  cursor: Scalars['String'];
  node: User;
};

export type Video = AbstractUuid & AbstractRepository & AbstractEntity & AbstractTaxonomyTermChild & InstanceAware & ThreadAware & {
  __typename?: 'Video';
  id: Scalars['Int'];
  trashed: Scalars['Boolean'];
  threads: ThreadsConnection;
  instance: Instance;
  alias?: Maybe<Scalars['String']>;
  date: Scalars['DateTime'];
  license: License;
  currentRevision?: Maybe<VideoRevision>;
  revisions: VideoRevisionConnection;
  taxonomyTerms: TaxonomyTermConnection;
};


export type VideoThreadsArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  archived?: Maybe<Scalars['Boolean']>;
  trashed?: Maybe<Scalars['Boolean']>;
};


export type VideoRevisionsArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  unrevised?: Maybe<Scalars['Boolean']>;
};


export type VideoTaxonomyTermsArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export type VideoRevision = AbstractUuid & AbstractRevision & AbstractEntityRevision & ThreadAware & {
  __typename?: 'VideoRevision';
  id: Scalars['Int'];
  author: User;
  trashed: Scalars['Boolean'];
  alias?: Maybe<Scalars['String']>;
  threads: ThreadsConnection;
  date: Scalars['DateTime'];
  repository: Video;
  url: Scalars['String'];
  title: Scalars['String'];
  content: Scalars['String'];
  changes: Scalars['String'];
};


export type VideoRevisionThreadsArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  archived?: Maybe<Scalars['Boolean']>;
  trashed?: Maybe<Scalars['Boolean']>;
};

export type VideoRevisionConnection = {
  __typename?: 'VideoRevisionConnection';
  edges: Array<VideoRevisionCursor>;
  nodes: Array<VideoRevision>;
  totalCount: Scalars['Int'];
  pageInfo: PageInfo;
};

export type VideoRevisionCursor = {
  __typename?: 'VideoRevisionCursor';
  cursor: Scalars['String'];
  node: VideoRevision;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Mutation: ResolverTypeWrapper<{}>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  String: ResolverTypeWrapper<Scalars['String']>;
  PageInfo: ResolverTypeWrapper<PageInfo>;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>;
  Instance: Instance;
  InstanceAware: ResolversTypes['License'] | ResolversTypes['CheckoutRevisionNotificationEvent'] | ResolversTypes['CreateCommentNotificationEvent'] | ResolversTypes['CreateEntityLinkNotificationEvent'] | ResolversTypes['CreateEntityNotificationEvent'] | ResolversTypes['CreateEntityRevisionNotificationEvent'] | ResolversTypes['CreateTaxonomyLinkNotificationEvent'] | ResolversTypes['CreateTaxonomyTermNotificationEvent'] | ResolversTypes['CreateThreadNotificationEvent'] | ResolversTypes['RejectRevisionNotificationEvent'] | ResolversTypes['RemoveEntityLinkNotificationEvent'] | ResolversTypes['RemoveTaxonomyLinkNotificationEvent'] | ResolversTypes['SetLicenseNotificationEvent'] | ResolversTypes['SetTaxonomyParentNotificationEvent'] | ResolversTypes['SetTaxonomyTermNotificationEvent'] | ResolversTypes['SetThreadStateNotificationEvent'] | ResolversTypes['SetUuidStateNotificationEvent'] | ResolversTypes['Applet'] | ResolversTypes['Article'] | ResolversTypes['CoursePage'] | ResolversTypes['Course'] | ResolversTypes['Event'] | ResolversTypes['ExerciseGroup'] | ResolversTypes['Exercise'] | ResolversTypes['GroupedExercise'] | ResolversTypes['Page'] | ResolversTypes['Solution'] | ResolversTypes['TaxonomyTerm'] | ResolversTypes['Video'];
  JSON: ResolverTypeWrapper<Scalars['JSON']>;
  JSONObject: ResolverTypeWrapper<Scalars['JSONObject']>;
  License: ResolverTypeWrapper<LicenseModel>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Query: ResolverTypeWrapper<{}>;
  CheckoutRevisionNotificationEvent: ResolverTypeWrapper<Omit<CheckoutRevisionNotificationEvent, 'repository'> & { repository: ResolversTypes['AbstractRepository'] }>;
  CreateCommentNotificationEvent: ResolverTypeWrapper<CreateCommentNotificationEvent>;
  CreateEntityLinkNotificationEvent: ResolverTypeWrapper<Omit<CreateEntityLinkNotificationEvent, 'parent' | 'child'> & { parent: ResolversTypes['AbstractEntity'], child: ResolversTypes['AbstractEntity'] }>;
  CreateEntityNotificationEvent: ResolverTypeWrapper<Omit<CreateEntityNotificationEvent, 'entity'> & { entity: ResolversTypes['AbstractEntity'] }>;
  CreateEntityRevisionNotificationEvent: ResolverTypeWrapper<Omit<CreateEntityRevisionNotificationEvent, 'entity'> & { entity: ResolversTypes['AbstractEntity'] }>;
  CreateTaxonomyLinkNotificationEvent: ResolverTypeWrapper<CreateTaxonomyLinkNotificationEvent>;
  CreateTaxonomyTermNotificationEvent: ResolverTypeWrapper<CreateTaxonomyTermNotificationEvent>;
  CreateThreadNotificationEvent: ResolverTypeWrapper<CreateThreadNotificationEvent>;
  RejectRevisionNotificationEvent: ResolverTypeWrapper<Omit<RejectRevisionNotificationEvent, 'repository'> & { repository: ResolversTypes['AbstractRepository'] }>;
  RemoveEntityLinkNotificationEvent: ResolverTypeWrapper<Omit<RemoveEntityLinkNotificationEvent, 'parent' | 'child'> & { parent: ResolversTypes['AbstractEntity'], child: ResolversTypes['AbstractEntity'] }>;
  RemoveTaxonomyLinkNotificationEvent: ResolverTypeWrapper<RemoveTaxonomyLinkNotificationEvent>;
  SetLicenseNotificationEvent: ResolverTypeWrapper<Omit<SetLicenseNotificationEvent, 'repository'> & { repository: ResolversTypes['AbstractRepository'] }>;
  SetTaxonomyParentNotificationEvent: ResolverTypeWrapper<SetTaxonomyParentNotificationEvent>;
  SetTaxonomyTermNotificationEvent: ResolverTypeWrapper<SetTaxonomyTermNotificationEvent>;
  SetThreadStateNotificationEvent: ResolverTypeWrapper<SetThreadStateNotificationEvent>;
  SetUuidStateNotificationEvent: ResolverTypeWrapper<SetUuidStateNotificationEvent>;
  Notification: ResolverTypeWrapper<Notification>;
  AbstractNotificationEvent: ResolversTypes['CheckoutRevisionNotificationEvent'] | ResolversTypes['CreateCommentNotificationEvent'] | ResolversTypes['CreateEntityLinkNotificationEvent'] | ResolversTypes['CreateEntityNotificationEvent'] | ResolversTypes['CreateEntityRevisionNotificationEvent'] | ResolversTypes['CreateTaxonomyLinkNotificationEvent'] | ResolversTypes['CreateTaxonomyTermNotificationEvent'] | ResolversTypes['CreateThreadNotificationEvent'] | ResolversTypes['RejectRevisionNotificationEvent'] | ResolversTypes['RemoveEntityLinkNotificationEvent'] | ResolversTypes['RemoveTaxonomyLinkNotificationEvent'] | ResolversTypes['SetLicenseNotificationEvent'] | ResolversTypes['SetTaxonomyParentNotificationEvent'] | ResolversTypes['SetTaxonomyTermNotificationEvent'] | ResolversTypes['SetThreadStateNotificationEvent'] | ResolversTypes['SetUuidStateNotificationEvent'];
  NotificationMutation: ResolverTypeWrapper<Omit<NotificationMutation, 'setState'> & { setState?: Maybe<ResolversTypes['NotificationSetStateResponse']> }>;
  NotificationSetStateInput: NotificationSetStateInput;
  NotificationSetStateResponse: ResolverTypeWrapper<Omit<NotificationSetStateResponse, 'query'> & { query: ResolversTypes['Query'] }>;
  NotificationConnection: ResolverTypeWrapper<NotificationConnection>;
  NotificationEdge: ResolverTypeWrapper<NotificationEdge>;
  QuerySubscriptionResult: ResolverTypeWrapper<QuerySubscriptionResult>;
  SubscriptionCursor: ResolverTypeWrapper<SubscriptionCursor>;
  SubscriptionMutation: ResolverTypeWrapper<Omit<SubscriptionMutation, 'set'> & { set?: Maybe<ResolversTypes['SubscriptionSetResponse']> }>;
  SubscriptionSetInput: SubscriptionSetInput;
  SubscriptionSetResponse: ResolverTypeWrapper<Omit<SubscriptionSetResponse, 'query'> & { query: ResolversTypes['Query'] }>;
  Thread: ResolverTypeWrapper<Thread>;
  Comment: ResolverTypeWrapper<Comment>;
  ThreadAware: ResolversTypes['Applet'] | ResolversTypes['AppletRevision'] | ResolversTypes['Article'] | ResolversTypes['ArticleRevision'] | ResolversTypes['CoursePage'] | ResolversTypes['CoursePageRevision'] | ResolversTypes['Course'] | ResolversTypes['CourseRevision'] | ResolversTypes['Event'] | ResolversTypes['EventRevision'] | ResolversTypes['ExerciseGroup'] | ResolversTypes['ExerciseGroupRevision'] | ResolversTypes['Exercise'] | ResolversTypes['ExerciseRevision'] | ResolversTypes['GroupedExercise'] | ResolversTypes['GroupedExerciseRevision'] | ResolversTypes['Page'] | ResolversTypes['PageRevision'] | ResolversTypes['Solution'] | ResolversTypes['SolutionRevision'] | ResolversTypes['TaxonomyTerm'] | ResolversTypes['User'] | ResolversTypes['Video'] | ResolversTypes['VideoRevision'];
  ThreadsConnection: ResolverTypeWrapper<ThreadsConnection>;
  ThreadsCursor: ResolverTypeWrapper<ThreadsCursor>;
  UnsupportedThread: ResolverTypeWrapper<UnsupportedThread>;
  UnsupportedComment: ResolverTypeWrapper<UnsupportedComment>;
  CommentConnection: ResolverTypeWrapper<CommentConnection>;
  CommentEdge: ResolverTypeWrapper<CommentEdge>;
  ThreadMutation: ResolverTypeWrapper<Omit<ThreadMutation, 'createThread' | 'createComment' | 'setThreadArchived' | 'setThreadState' | 'setCommentState'> & { createThread?: Maybe<ResolversTypes['ThreadCreateThreadResponse']>, createComment?: Maybe<ResolversTypes['ThreadCreateCommentResponse']>, setThreadArchived?: Maybe<ResolversTypes['ThreadSetThreadArchivedResponse']>, setThreadState?: Maybe<ResolversTypes['ThreadSetThreadStateResponse']>, setCommentState?: Maybe<ResolversTypes['ThreadSetCommentStateResponse']> }>;
  ThreadCreateThreadInput: ThreadCreateThreadInput;
  ThreadCreateThreadResponse: ResolverTypeWrapper<Omit<ThreadCreateThreadResponse, 'query'> & { query: ResolversTypes['Query'] }>;
  ThreadCreateCommentInput: ThreadCreateCommentInput;
  ThreadCreateCommentResponse: ResolverTypeWrapper<Omit<ThreadCreateCommentResponse, 'query'> & { query: ResolversTypes['Query'] }>;
  ThreadSetThreadArchivedInput: ThreadSetThreadArchivedInput;
  ThreadSetThreadArchivedResponse: ResolverTypeWrapper<Omit<ThreadSetThreadArchivedResponse, 'query'> & { query: ResolversTypes['Query'] }>;
  ThreadSetThreadStateInput: ThreadSetThreadStateInput;
  ThreadSetThreadStateResponse: ResolverTypeWrapper<Omit<ThreadSetThreadStateResponse, 'query'> & { query: ResolversTypes['Query'] }>;
  ThreadSetCommentStateInput: ThreadSetCommentStateInput;
  ThreadSetCommentStateResponse: ResolverTypeWrapper<Omit<ThreadSetCommentStateResponse, 'query'> & { query: ResolversTypes['Query'] }>;
  AbstractEntity: ResolversTypes['Applet'] | ResolversTypes['Article'] | ResolversTypes['CoursePage'] | ResolversTypes['Course'] | ResolversTypes['Event'] | ResolversTypes['ExerciseGroup'] | ResolversTypes['Exercise'] | ResolversTypes['GroupedExercise'] | ResolversTypes['Solution'] | ResolversTypes['Video'];
  AbstractEntityRevision: ResolversTypes['AppletRevision'] | ResolversTypes['ArticleRevision'] | ResolversTypes['CoursePageRevision'] | ResolversTypes['CourseRevision'] | ResolversTypes['EventRevision'] | ResolversTypes['ExerciseGroupRevision'] | ResolversTypes['ExerciseRevision'] | ResolversTypes['GroupedExerciseRevision'] | ResolversTypes['SolutionRevision'] | ResolversTypes['VideoRevision'];
  AbstractExercise: ResolversTypes['Exercise'] | ResolversTypes['GroupedExercise'];
  AbstractExerciseRevision: ResolversTypes['ExerciseRevision'] | ResolversTypes['GroupedExerciseRevision'];
  AbstractNavigationChild: ResolversTypes['Page'] | ResolversTypes['TaxonomyTerm'];
  Navigation: ResolverTypeWrapper<Navigation>;
  NavigationNodeConnection: ResolverTypeWrapper<NavigationNodeConnection>;
  NavigationNodeEdge: ResolverTypeWrapper<NavigationNodeEdge>;
  NavigationNode: ResolverTypeWrapper<NavigationNode>;
  AbstractRepository: ResolversTypes['Applet'] | ResolversTypes['Article'] | ResolversTypes['CoursePage'] | ResolversTypes['Course'] | ResolversTypes['Event'] | ResolversTypes['ExerciseGroup'] | ResolversTypes['Exercise'] | ResolversTypes['GroupedExercise'] | ResolversTypes['Page'] | ResolversTypes['Solution'] | ResolversTypes['Video'];
  AbstractRevision: ResolversTypes['AppletRevision'] | ResolversTypes['ArticleRevision'] | ResolversTypes['CoursePageRevision'] | ResolversTypes['CourseRevision'] | ResolversTypes['EventRevision'] | ResolversTypes['ExerciseGroupRevision'] | ResolversTypes['ExerciseRevision'] | ResolversTypes['GroupedExerciseRevision'] | ResolversTypes['PageRevision'] | ResolversTypes['SolutionRevision'] | ResolversTypes['VideoRevision'];
  AbstractTaxonomyTermChild: ResolversTypes['Applet'] | ResolversTypes['Article'] | ResolversTypes['Course'] | ResolversTypes['Event'] | ResolversTypes['ExerciseGroup'] | ResolversTypes['Exercise'] | ResolversTypes['Video'];
  TaxonomyTermConnection: ResolverTypeWrapper<TaxonomyTermConnection>;
  TaxonomyTermEdge: ResolverTypeWrapper<TaxonomyTermEdge>;
  AbstractUuid: ResolversTypes['Comment'] | ResolversTypes['Applet'] | ResolversTypes['AppletRevision'] | ResolversTypes['Article'] | ResolversTypes['ArticleRevision'] | ResolversTypes['CoursePage'] | ResolversTypes['CoursePageRevision'] | ResolversTypes['Course'] | ResolversTypes['CourseRevision'] | ResolversTypes['Event'] | ResolversTypes['EventRevision'] | ResolversTypes['ExerciseGroup'] | ResolversTypes['ExerciseGroupRevision'] | ResolversTypes['Exercise'] | ResolversTypes['ExerciseRevision'] | ResolversTypes['GroupedExercise'] | ResolversTypes['GroupedExerciseRevision'] | ResolversTypes['Page'] | ResolversTypes['PageRevision'] | ResolversTypes['Solution'] | ResolversTypes['SolutionRevision'] | ResolversTypes['TaxonomyTerm'] | ResolversTypes['User'] | ResolversTypes['Video'] | ResolversTypes['VideoRevision'];
  AbstractUuidConnection: ResolverTypeWrapper<AbstractUuidConnection>;
  AbstractUuidCursor: ResolverTypeWrapper<AbstractUuidCursor>;
  UuidMutation: ResolverTypeWrapper<Omit<UuidMutation, 'setState'> & { setState?: Maybe<ResolversTypes['UuidSetStateResponse']> }>;
  UuidSetStateInput: UuidSetStateInput;
  UuidSetStateResponse: ResolverTypeWrapper<Omit<UuidSetStateResponse, 'query'> & { query: ResolversTypes['Query'] }>;
  AliasInput: AliasInput;
  Applet: ResolverTypeWrapper<Omit<Applet, 'license' | 'currentRevision' | 'revisions'> & { license: ResolversTypes['License'], currentRevision?: Maybe<ResolversTypes['AppletRevision']>, revisions: ResolversTypes['AppletRevisionConnection'] }>;
  AppletRevision: ResolverTypeWrapper<Omit<AppletRevision, 'repository'> & { repository: ResolversTypes['Applet'] }>;
  AppletRevisionConnection: ResolverTypeWrapper<Omit<AppletRevisionConnection, 'edges' | 'nodes'> & { edges: Array<ResolversTypes['AppletRevisionCursor']>, nodes: Array<ResolversTypes['AppletRevision']> }>;
  AppletRevisionCursor: ResolverTypeWrapper<Omit<AppletRevisionCursor, 'node'> & { node: ResolversTypes['AppletRevision'] }>;
  Article: ResolverTypeWrapper<Omit<Article, 'license' | 'currentRevision' | 'revisions'> & { license: ResolversTypes['License'], currentRevision?: Maybe<ResolversTypes['ArticleRevision']>, revisions: ResolversTypes['ArticleRevisionConnection'] }>;
  ArticleRevision: ResolverTypeWrapper<Omit<ArticleRevision, 'repository'> & { repository: ResolversTypes['Article'] }>;
  ArticleRevisionConnection: ResolverTypeWrapper<Omit<ArticleRevisionConnection, 'edges' | 'nodes'> & { edges: Array<ResolversTypes['ArticleRevisionCursor']>, nodes: Array<ResolversTypes['ArticleRevision']> }>;
  ArticleRevisionCursor: ResolverTypeWrapper<Omit<ArticleRevisionCursor, 'node'> & { node: ResolversTypes['ArticleRevision'] }>;
  CoursePage: ResolverTypeWrapper<Omit<CoursePage, 'license' | 'currentRevision' | 'revisions' | 'course'> & { license: ResolversTypes['License'], currentRevision?: Maybe<ResolversTypes['CoursePageRevision']>, revisions: ResolversTypes['CoursePageRevisionConnection'], course: ResolversTypes['Course'] }>;
  CoursePageRevision: ResolverTypeWrapper<Omit<CoursePageRevision, 'repository'> & { repository: ResolversTypes['CoursePage'] }>;
  CoursePageRevisionConnection: ResolverTypeWrapper<Omit<CoursePageRevisionConnection, 'edges' | 'nodes'> & { edges: Array<ResolversTypes['CoursePageRevisionCursor']>, nodes: Array<ResolversTypes['CoursePageRevision']> }>;
  CoursePageRevisionCursor: ResolverTypeWrapper<Omit<CoursePageRevisionCursor, 'node'> & { node: ResolversTypes['CoursePageRevision'] }>;
  Course: ResolverTypeWrapper<Omit<Course, 'license' | 'currentRevision' | 'revisions' | 'pages'> & { license: ResolversTypes['License'], currentRevision?: Maybe<ResolversTypes['CourseRevision']>, revisions: ResolversTypes['CourseRevisionConnection'], pages: Array<ResolversTypes['CoursePage']> }>;
  CourseRevision: ResolverTypeWrapper<Omit<CourseRevision, 'repository'> & { repository: ResolversTypes['Course'] }>;
  CourseRevisionConnection: ResolverTypeWrapper<Omit<CourseRevisionConnection, 'edges' | 'nodes'> & { edges: Array<ResolversTypes['CourseRevisionCursor']>, nodes: Array<ResolversTypes['CourseRevision']> }>;
  CourseRevisionCursor: ResolverTypeWrapper<Omit<CourseRevisionCursor, 'node'> & { node: ResolversTypes['CourseRevision'] }>;
  Event: ResolverTypeWrapper<Omit<Event, 'license' | 'currentRevision' | 'revisions'> & { license: ResolversTypes['License'], currentRevision?: Maybe<ResolversTypes['EventRevision']>, revisions: ResolversTypes['EventRevisionConnection'] }>;
  EventRevision: ResolverTypeWrapper<Omit<EventRevision, 'repository'> & { repository: ResolversTypes['Event'] }>;
  EventRevisionConnection: ResolverTypeWrapper<Omit<EventRevisionConnection, 'edges' | 'nodes'> & { edges: Array<ResolversTypes['EventRevisionCursor']>, nodes: Array<ResolversTypes['EventRevision']> }>;
  EventRevisionCursor: ResolverTypeWrapper<Omit<EventRevisionCursor, 'node'> & { node: ResolversTypes['EventRevision'] }>;
  ExerciseGroup: ResolverTypeWrapper<Omit<ExerciseGroup, 'license' | 'currentRevision' | 'revisions' | 'exercises'> & { license: ResolversTypes['License'], currentRevision?: Maybe<ResolversTypes['ExerciseGroupRevision']>, revisions: ResolversTypes['ExerciseGroupRevisionConnection'], exercises: Array<ResolversTypes['GroupedExercise']> }>;
  ExerciseGroupRevision: ResolverTypeWrapper<Omit<ExerciseGroupRevision, 'repository'> & { repository: ResolversTypes['ExerciseGroup'] }>;
  ExerciseGroupRevisionConnection: ResolverTypeWrapper<Omit<ExerciseGroupRevisionConnection, 'edges' | 'nodes'> & { edges: Array<ResolversTypes['ExerciseGroupRevisionCursor']>, nodes: Array<ResolversTypes['ExerciseGroupRevision']> }>;
  ExerciseGroupRevisionCursor: ResolverTypeWrapper<Omit<ExerciseGroupRevisionCursor, 'node'> & { node: ResolversTypes['ExerciseGroupRevision'] }>;
  Exercise: ResolverTypeWrapper<Omit<Exercise, 'license' | 'currentRevision' | 'revisions' | 'solution'> & { license: ResolversTypes['License'], currentRevision?: Maybe<ResolversTypes['ExerciseRevision']>, revisions: ResolversTypes['ExerciseRevisionConnection'], solution?: Maybe<ResolversTypes['Solution']> }>;
  ExerciseRevision: ResolverTypeWrapper<Omit<ExerciseRevision, 'repository'> & { repository: ResolversTypes['Exercise'] }>;
  ExerciseRevisionConnection: ResolverTypeWrapper<Omit<ExerciseRevisionConnection, 'edges' | 'nodes'> & { edges: Array<ResolversTypes['ExerciseRevisionCursor']>, nodes: Array<ResolversTypes['ExerciseRevision']> }>;
  ExerciseRevisionCursor: ResolverTypeWrapper<Omit<ExerciseRevisionCursor, 'node'> & { node: ResolversTypes['ExerciseRevision'] }>;
  GroupedExercise: ResolverTypeWrapper<Omit<GroupedExercise, 'license' | 'currentRevision' | 'revisions' | 'solution' | 'exerciseGroup'> & { license: ResolversTypes['License'], currentRevision?: Maybe<ResolversTypes['GroupedExerciseRevision']>, revisions: ResolversTypes['GroupedExerciseRevisionConnection'], solution?: Maybe<ResolversTypes['Solution']>, exerciseGroup: ResolversTypes['ExerciseGroup'] }>;
  GroupedExerciseRevision: ResolverTypeWrapper<Omit<GroupedExerciseRevision, 'repository'> & { repository: ResolversTypes['GroupedExercise'] }>;
  GroupedExerciseRevisionConnection: ResolverTypeWrapper<Omit<GroupedExerciseRevisionConnection, 'edges' | 'nodes'> & { edges: Array<ResolversTypes['GroupedExerciseRevisionCursor']>, nodes: Array<ResolversTypes['GroupedExerciseRevision']> }>;
  GroupedExerciseRevisionCursor: ResolverTypeWrapper<Omit<GroupedExerciseRevisionCursor, 'node'> & { node: ResolversTypes['GroupedExerciseRevision'] }>;
  Page: ResolverTypeWrapper<Omit<Page, 'license' | 'currentRevision' | 'revisions'> & { license: ResolversTypes['License'], currentRevision?: Maybe<ResolversTypes['PageRevision']>, revisions: ResolversTypes['PageRevisionConnection'] }>;
  PageRevision: ResolverTypeWrapper<Omit<PageRevision, 'repository'> & { repository: ResolversTypes['Page'] }>;
  PageRevisionConnection: ResolverTypeWrapper<Omit<PageRevisionConnection, 'edges' | 'nodes'> & { edges: Array<ResolversTypes['PageRevisionCursor']>, nodes: Array<ResolversTypes['PageRevision']> }>;
  PageRevisionCursor: ResolverTypeWrapper<Omit<PageRevisionCursor, 'node'> & { node: ResolversTypes['PageRevision'] }>;
  Solution: ResolverTypeWrapper<Omit<Solution, 'license' | 'currentRevision' | 'revisions' | 'exercise'> & { license: ResolversTypes['License'], currentRevision?: Maybe<ResolversTypes['SolutionRevision']>, revisions?: Maybe<ResolversTypes['SolutionRevisionConnection']>, exercise: ResolversTypes['AbstractExercise'] }>;
  SolutionRevision: ResolverTypeWrapper<Omit<SolutionRevision, 'repository'> & { repository: ResolversTypes['Solution'] }>;
  SolutionRevisionConnection: ResolverTypeWrapper<Omit<SolutionRevisionConnection, 'edges' | 'nodes'> & { edges: Array<ResolversTypes['SolutionRevisionCursor']>, nodes: Array<ResolversTypes['SolutionRevision']> }>;
  SolutionRevisionCursor: ResolverTypeWrapper<Omit<SolutionRevisionCursor, 'node'> & { node: ResolversTypes['SolutionRevision'] }>;
  TaxonomyTermType: TaxonomyTermType;
  TaxonomyTerm: ResolverTypeWrapper<TaxonomyTerm>;
  User: ResolverTypeWrapper<User>;
  UserConnection: ResolverTypeWrapper<UserConnection>;
  UserEdge: ResolverTypeWrapper<UserEdge>;
  Video: ResolverTypeWrapper<Omit<Video, 'license' | 'currentRevision' | 'revisions'> & { license: ResolversTypes['License'], currentRevision?: Maybe<ResolversTypes['VideoRevision']>, revisions: ResolversTypes['VideoRevisionConnection'] }>;
  VideoRevision: ResolverTypeWrapper<Omit<VideoRevision, 'repository'> & { repository: ResolversTypes['Video'] }>;
  VideoRevisionConnection: ResolverTypeWrapper<Omit<VideoRevisionConnection, 'edges' | 'nodes'> & { edges: Array<ResolversTypes['VideoRevisionCursor']>, nodes: Array<ResolversTypes['VideoRevision']> }>;
  VideoRevisionCursor: ResolverTypeWrapper<Omit<VideoRevisionCursor, 'node'> & { node: ResolversTypes['VideoRevision'] }>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Mutation: {};
  Boolean: Scalars['Boolean'];
  String: Scalars['String'];
  PageInfo: PageInfo;
  DateTime: Scalars['DateTime'];
  InstanceAware: ResolversParentTypes['License'] | ResolversParentTypes['CheckoutRevisionNotificationEvent'] | ResolversParentTypes['CreateCommentNotificationEvent'] | ResolversParentTypes['CreateEntityLinkNotificationEvent'] | ResolversParentTypes['CreateEntityNotificationEvent'] | ResolversParentTypes['CreateEntityRevisionNotificationEvent'] | ResolversParentTypes['CreateTaxonomyLinkNotificationEvent'] | ResolversParentTypes['CreateTaxonomyTermNotificationEvent'] | ResolversParentTypes['CreateThreadNotificationEvent'] | ResolversParentTypes['RejectRevisionNotificationEvent'] | ResolversParentTypes['RemoveEntityLinkNotificationEvent'] | ResolversParentTypes['RemoveTaxonomyLinkNotificationEvent'] | ResolversParentTypes['SetLicenseNotificationEvent'] | ResolversParentTypes['SetTaxonomyParentNotificationEvent'] | ResolversParentTypes['SetTaxonomyTermNotificationEvent'] | ResolversParentTypes['SetThreadStateNotificationEvent'] | ResolversParentTypes['SetUuidStateNotificationEvent'] | ResolversParentTypes['Applet'] | ResolversParentTypes['Article'] | ResolversParentTypes['CoursePage'] | ResolversParentTypes['Course'] | ResolversParentTypes['Event'] | ResolversParentTypes['ExerciseGroup'] | ResolversParentTypes['Exercise'] | ResolversParentTypes['GroupedExercise'] | ResolversParentTypes['Page'] | ResolversParentTypes['Solution'] | ResolversParentTypes['TaxonomyTerm'] | ResolversParentTypes['Video'];
  JSON: Scalars['JSON'];
  JSONObject: Scalars['JSONObject'];
  License: LicenseModel;
  Int: Scalars['Int'];
  Query: {};
  CheckoutRevisionNotificationEvent: Omit<CheckoutRevisionNotificationEvent, 'repository'> & { repository: ResolversParentTypes['AbstractRepository'] };
  CreateCommentNotificationEvent: CreateCommentNotificationEvent;
  CreateEntityLinkNotificationEvent: Omit<CreateEntityLinkNotificationEvent, 'parent' | 'child'> & { parent: ResolversParentTypes['AbstractEntity'], child: ResolversParentTypes['AbstractEntity'] };
  CreateEntityNotificationEvent: Omit<CreateEntityNotificationEvent, 'entity'> & { entity: ResolversParentTypes['AbstractEntity'] };
  CreateEntityRevisionNotificationEvent: Omit<CreateEntityRevisionNotificationEvent, 'entity'> & { entity: ResolversParentTypes['AbstractEntity'] };
  CreateTaxonomyLinkNotificationEvent: CreateTaxonomyLinkNotificationEvent;
  CreateTaxonomyTermNotificationEvent: CreateTaxonomyTermNotificationEvent;
  CreateThreadNotificationEvent: CreateThreadNotificationEvent;
  RejectRevisionNotificationEvent: Omit<RejectRevisionNotificationEvent, 'repository'> & { repository: ResolversParentTypes['AbstractRepository'] };
  RemoveEntityLinkNotificationEvent: Omit<RemoveEntityLinkNotificationEvent, 'parent' | 'child'> & { parent: ResolversParentTypes['AbstractEntity'], child: ResolversParentTypes['AbstractEntity'] };
  RemoveTaxonomyLinkNotificationEvent: RemoveTaxonomyLinkNotificationEvent;
  SetLicenseNotificationEvent: Omit<SetLicenseNotificationEvent, 'repository'> & { repository: ResolversParentTypes['AbstractRepository'] };
  SetTaxonomyParentNotificationEvent: SetTaxonomyParentNotificationEvent;
  SetTaxonomyTermNotificationEvent: SetTaxonomyTermNotificationEvent;
  SetThreadStateNotificationEvent: SetThreadStateNotificationEvent;
  SetUuidStateNotificationEvent: SetUuidStateNotificationEvent;
  Notification: Notification;
  AbstractNotificationEvent: ResolversParentTypes['CheckoutRevisionNotificationEvent'] | ResolversParentTypes['CreateCommentNotificationEvent'] | ResolversParentTypes['CreateEntityLinkNotificationEvent'] | ResolversParentTypes['CreateEntityNotificationEvent'] | ResolversParentTypes['CreateEntityRevisionNotificationEvent'] | ResolversParentTypes['CreateTaxonomyLinkNotificationEvent'] | ResolversParentTypes['CreateTaxonomyTermNotificationEvent'] | ResolversParentTypes['CreateThreadNotificationEvent'] | ResolversParentTypes['RejectRevisionNotificationEvent'] | ResolversParentTypes['RemoveEntityLinkNotificationEvent'] | ResolversParentTypes['RemoveTaxonomyLinkNotificationEvent'] | ResolversParentTypes['SetLicenseNotificationEvent'] | ResolversParentTypes['SetTaxonomyParentNotificationEvent'] | ResolversParentTypes['SetTaxonomyTermNotificationEvent'] | ResolversParentTypes['SetThreadStateNotificationEvent'] | ResolversParentTypes['SetUuidStateNotificationEvent'];
  NotificationMutation: Omit<NotificationMutation, 'setState'> & { setState?: Maybe<ResolversParentTypes['NotificationSetStateResponse']> };
  NotificationSetStateInput: NotificationSetStateInput;
  NotificationSetStateResponse: Omit<NotificationSetStateResponse, 'query'> & { query: ResolversParentTypes['Query'] };
  NotificationConnection: NotificationConnection;
  NotificationEdge: NotificationEdge;
  QuerySubscriptionResult: QuerySubscriptionResult;
  SubscriptionCursor: SubscriptionCursor;
  SubscriptionMutation: Omit<SubscriptionMutation, 'set'> & { set?: Maybe<ResolversParentTypes['SubscriptionSetResponse']> };
  SubscriptionSetInput: SubscriptionSetInput;
  SubscriptionSetResponse: Omit<SubscriptionSetResponse, 'query'> & { query: ResolversParentTypes['Query'] };
  Thread: Thread;
  Comment: Comment;
  ThreadAware: ResolversParentTypes['Applet'] | ResolversParentTypes['AppletRevision'] | ResolversParentTypes['Article'] | ResolversParentTypes['ArticleRevision'] | ResolversParentTypes['CoursePage'] | ResolversParentTypes['CoursePageRevision'] | ResolversParentTypes['Course'] | ResolversParentTypes['CourseRevision'] | ResolversParentTypes['Event'] | ResolversParentTypes['EventRevision'] | ResolversParentTypes['ExerciseGroup'] | ResolversParentTypes['ExerciseGroupRevision'] | ResolversParentTypes['Exercise'] | ResolversParentTypes['ExerciseRevision'] | ResolversParentTypes['GroupedExercise'] | ResolversParentTypes['GroupedExerciseRevision'] | ResolversParentTypes['Page'] | ResolversParentTypes['PageRevision'] | ResolversParentTypes['Solution'] | ResolversParentTypes['SolutionRevision'] | ResolversParentTypes['TaxonomyTerm'] | ResolversParentTypes['User'] | ResolversParentTypes['Video'] | ResolversParentTypes['VideoRevision'];
  ThreadsConnection: ThreadsConnection;
  ThreadsCursor: ThreadsCursor;
  UnsupportedThread: UnsupportedThread;
  UnsupportedComment: UnsupportedComment;
  CommentConnection: CommentConnection;
  CommentEdge: CommentEdge;
  ThreadMutation: Omit<ThreadMutation, 'createThread' | 'createComment' | 'setThreadArchived' | 'setThreadState' | 'setCommentState'> & { createThread?: Maybe<ResolversParentTypes['ThreadCreateThreadResponse']>, createComment?: Maybe<ResolversParentTypes['ThreadCreateCommentResponse']>, setThreadArchived?: Maybe<ResolversParentTypes['ThreadSetThreadArchivedResponse']>, setThreadState?: Maybe<ResolversParentTypes['ThreadSetThreadStateResponse']>, setCommentState?: Maybe<ResolversParentTypes['ThreadSetCommentStateResponse']> };
  ThreadCreateThreadInput: ThreadCreateThreadInput;
  ThreadCreateThreadResponse: Omit<ThreadCreateThreadResponse, 'query'> & { query: ResolversParentTypes['Query'] };
  ThreadCreateCommentInput: ThreadCreateCommentInput;
  ThreadCreateCommentResponse: Omit<ThreadCreateCommentResponse, 'query'> & { query: ResolversParentTypes['Query'] };
  ThreadSetThreadArchivedInput: ThreadSetThreadArchivedInput;
  ThreadSetThreadArchivedResponse: Omit<ThreadSetThreadArchivedResponse, 'query'> & { query: ResolversParentTypes['Query'] };
  ThreadSetThreadStateInput: ThreadSetThreadStateInput;
  ThreadSetThreadStateResponse: Omit<ThreadSetThreadStateResponse, 'query'> & { query: ResolversParentTypes['Query'] };
  ThreadSetCommentStateInput: ThreadSetCommentStateInput;
  ThreadSetCommentStateResponse: Omit<ThreadSetCommentStateResponse, 'query'> & { query: ResolversParentTypes['Query'] };
  AbstractEntity: ResolversParentTypes['Applet'] | ResolversParentTypes['Article'] | ResolversParentTypes['CoursePage'] | ResolversParentTypes['Course'] | ResolversParentTypes['Event'] | ResolversParentTypes['ExerciseGroup'] | ResolversParentTypes['Exercise'] | ResolversParentTypes['GroupedExercise'] | ResolversParentTypes['Solution'] | ResolversParentTypes['Video'];
  AbstractEntityRevision: ResolversParentTypes['AppletRevision'] | ResolversParentTypes['ArticleRevision'] | ResolversParentTypes['CoursePageRevision'] | ResolversParentTypes['CourseRevision'] | ResolversParentTypes['EventRevision'] | ResolversParentTypes['ExerciseGroupRevision'] | ResolversParentTypes['ExerciseRevision'] | ResolversParentTypes['GroupedExerciseRevision'] | ResolversParentTypes['SolutionRevision'] | ResolversParentTypes['VideoRevision'];
  AbstractExercise: ResolversParentTypes['Exercise'] | ResolversParentTypes['GroupedExercise'];
  AbstractExerciseRevision: ResolversParentTypes['ExerciseRevision'] | ResolversParentTypes['GroupedExerciseRevision'];
  AbstractNavigationChild: ResolversParentTypes['Page'] | ResolversParentTypes['TaxonomyTerm'];
  Navigation: Navigation;
  NavigationNodeConnection: NavigationNodeConnection;
  NavigationNodeEdge: NavigationNodeEdge;
  NavigationNode: NavigationNode;
  AbstractRepository: ResolversParentTypes['Applet'] | ResolversParentTypes['Article'] | ResolversParentTypes['CoursePage'] | ResolversParentTypes['Course'] | ResolversParentTypes['Event'] | ResolversParentTypes['ExerciseGroup'] | ResolversParentTypes['Exercise'] | ResolversParentTypes['GroupedExercise'] | ResolversParentTypes['Page'] | ResolversParentTypes['Solution'] | ResolversParentTypes['Video'];
  AbstractRevision: ResolversParentTypes['AppletRevision'] | ResolversParentTypes['ArticleRevision'] | ResolversParentTypes['CoursePageRevision'] | ResolversParentTypes['CourseRevision'] | ResolversParentTypes['EventRevision'] | ResolversParentTypes['ExerciseGroupRevision'] | ResolversParentTypes['ExerciseRevision'] | ResolversParentTypes['GroupedExerciseRevision'] | ResolversParentTypes['PageRevision'] | ResolversParentTypes['SolutionRevision'] | ResolversParentTypes['VideoRevision'];
  AbstractTaxonomyTermChild: ResolversParentTypes['Applet'] | ResolversParentTypes['Article'] | ResolversParentTypes['Course'] | ResolversParentTypes['Event'] | ResolversParentTypes['ExerciseGroup'] | ResolversParentTypes['Exercise'] | ResolversParentTypes['Video'];
  TaxonomyTermConnection: TaxonomyTermConnection;
  TaxonomyTermEdge: TaxonomyTermEdge;
  AbstractUuid: ResolversParentTypes['Comment'] | ResolversParentTypes['Applet'] | ResolversParentTypes['AppletRevision'] | ResolversParentTypes['Article'] | ResolversParentTypes['ArticleRevision'] | ResolversParentTypes['CoursePage'] | ResolversParentTypes['CoursePageRevision'] | ResolversParentTypes['Course'] | ResolversParentTypes['CourseRevision'] | ResolversParentTypes['Event'] | ResolversParentTypes['EventRevision'] | ResolversParentTypes['ExerciseGroup'] | ResolversParentTypes['ExerciseGroupRevision'] | ResolversParentTypes['Exercise'] | ResolversParentTypes['ExerciseRevision'] | ResolversParentTypes['GroupedExercise'] | ResolversParentTypes['GroupedExerciseRevision'] | ResolversParentTypes['Page'] | ResolversParentTypes['PageRevision'] | ResolversParentTypes['Solution'] | ResolversParentTypes['SolutionRevision'] | ResolversParentTypes['TaxonomyTerm'] | ResolversParentTypes['User'] | ResolversParentTypes['Video'] | ResolversParentTypes['VideoRevision'];
  AbstractUuidConnection: AbstractUuidConnection;
  AbstractUuidCursor: AbstractUuidCursor;
  UuidMutation: Omit<UuidMutation, 'setState'> & { setState?: Maybe<ResolversParentTypes['UuidSetStateResponse']> };
  UuidSetStateInput: UuidSetStateInput;
  UuidSetStateResponse: Omit<UuidSetStateResponse, 'query'> & { query: ResolversParentTypes['Query'] };
  AliasInput: AliasInput;
  Applet: Omit<Applet, 'license' | 'currentRevision' | 'revisions'> & { license: ResolversParentTypes['License'], currentRevision?: Maybe<ResolversParentTypes['AppletRevision']>, revisions: ResolversParentTypes['AppletRevisionConnection'] };
  AppletRevision: Omit<AppletRevision, 'repository'> & { repository: ResolversParentTypes['Applet'] };
  AppletRevisionConnection: Omit<AppletRevisionConnection, 'edges' | 'nodes'> & { edges: Array<ResolversParentTypes['AppletRevisionCursor']>, nodes: Array<ResolversParentTypes['AppletRevision']> };
  AppletRevisionCursor: Omit<AppletRevisionCursor, 'node'> & { node: ResolversParentTypes['AppletRevision'] };
  Article: Omit<Article, 'license' | 'currentRevision' | 'revisions'> & { license: ResolversParentTypes['License'], currentRevision?: Maybe<ResolversParentTypes['ArticleRevision']>, revisions: ResolversParentTypes['ArticleRevisionConnection'] };
  ArticleRevision: Omit<ArticleRevision, 'repository'> & { repository: ResolversParentTypes['Article'] };
  ArticleRevisionConnection: Omit<ArticleRevisionConnection, 'edges' | 'nodes'> & { edges: Array<ResolversParentTypes['ArticleRevisionCursor']>, nodes: Array<ResolversParentTypes['ArticleRevision']> };
  ArticleRevisionCursor: Omit<ArticleRevisionCursor, 'node'> & { node: ResolversParentTypes['ArticleRevision'] };
  CoursePage: Omit<CoursePage, 'license' | 'currentRevision' | 'revisions' | 'course'> & { license: ResolversParentTypes['License'], currentRevision?: Maybe<ResolversParentTypes['CoursePageRevision']>, revisions: ResolversParentTypes['CoursePageRevisionConnection'], course: ResolversParentTypes['Course'] };
  CoursePageRevision: Omit<CoursePageRevision, 'repository'> & { repository: ResolversParentTypes['CoursePage'] };
  CoursePageRevisionConnection: Omit<CoursePageRevisionConnection, 'edges' | 'nodes'> & { edges: Array<ResolversParentTypes['CoursePageRevisionCursor']>, nodes: Array<ResolversParentTypes['CoursePageRevision']> };
  CoursePageRevisionCursor: Omit<CoursePageRevisionCursor, 'node'> & { node: ResolversParentTypes['CoursePageRevision'] };
  Course: Omit<Course, 'license' | 'currentRevision' | 'revisions' | 'pages'> & { license: ResolversParentTypes['License'], currentRevision?: Maybe<ResolversParentTypes['CourseRevision']>, revisions: ResolversParentTypes['CourseRevisionConnection'], pages: Array<ResolversParentTypes['CoursePage']> };
  CourseRevision: Omit<CourseRevision, 'repository'> & { repository: ResolversParentTypes['Course'] };
  CourseRevisionConnection: Omit<CourseRevisionConnection, 'edges' | 'nodes'> & { edges: Array<ResolversParentTypes['CourseRevisionCursor']>, nodes: Array<ResolversParentTypes['CourseRevision']> };
  CourseRevisionCursor: Omit<CourseRevisionCursor, 'node'> & { node: ResolversParentTypes['CourseRevision'] };
  Event: Omit<Event, 'license' | 'currentRevision' | 'revisions'> & { license: ResolversParentTypes['License'], currentRevision?: Maybe<ResolversParentTypes['EventRevision']>, revisions: ResolversParentTypes['EventRevisionConnection'] };
  EventRevision: Omit<EventRevision, 'repository'> & { repository: ResolversParentTypes['Event'] };
  EventRevisionConnection: Omit<EventRevisionConnection, 'edges' | 'nodes'> & { edges: Array<ResolversParentTypes['EventRevisionCursor']>, nodes: Array<ResolversParentTypes['EventRevision']> };
  EventRevisionCursor: Omit<EventRevisionCursor, 'node'> & { node: ResolversParentTypes['EventRevision'] };
  ExerciseGroup: Omit<ExerciseGroup, 'license' | 'currentRevision' | 'revisions' | 'exercises'> & { license: ResolversParentTypes['License'], currentRevision?: Maybe<ResolversParentTypes['ExerciseGroupRevision']>, revisions: ResolversParentTypes['ExerciseGroupRevisionConnection'], exercises: Array<ResolversParentTypes['GroupedExercise']> };
  ExerciseGroupRevision: Omit<ExerciseGroupRevision, 'repository'> & { repository: ResolversParentTypes['ExerciseGroup'] };
  ExerciseGroupRevisionConnection: Omit<ExerciseGroupRevisionConnection, 'edges' | 'nodes'> & { edges: Array<ResolversParentTypes['ExerciseGroupRevisionCursor']>, nodes: Array<ResolversParentTypes['ExerciseGroupRevision']> };
  ExerciseGroupRevisionCursor: Omit<ExerciseGroupRevisionCursor, 'node'> & { node: ResolversParentTypes['ExerciseGroupRevision'] };
  Exercise: Omit<Exercise, 'license' | 'currentRevision' | 'revisions' | 'solution'> & { license: ResolversParentTypes['License'], currentRevision?: Maybe<ResolversParentTypes['ExerciseRevision']>, revisions: ResolversParentTypes['ExerciseRevisionConnection'], solution?: Maybe<ResolversParentTypes['Solution']> };
  ExerciseRevision: Omit<ExerciseRevision, 'repository'> & { repository: ResolversParentTypes['Exercise'] };
  ExerciseRevisionConnection: Omit<ExerciseRevisionConnection, 'edges' | 'nodes'> & { edges: Array<ResolversParentTypes['ExerciseRevisionCursor']>, nodes: Array<ResolversParentTypes['ExerciseRevision']> };
  ExerciseRevisionCursor: Omit<ExerciseRevisionCursor, 'node'> & { node: ResolversParentTypes['ExerciseRevision'] };
  GroupedExercise: Omit<GroupedExercise, 'license' | 'currentRevision' | 'revisions' | 'solution' | 'exerciseGroup'> & { license: ResolversParentTypes['License'], currentRevision?: Maybe<ResolversParentTypes['GroupedExerciseRevision']>, revisions: ResolversParentTypes['GroupedExerciseRevisionConnection'], solution?: Maybe<ResolversParentTypes['Solution']>, exerciseGroup: ResolversParentTypes['ExerciseGroup'] };
  GroupedExerciseRevision: Omit<GroupedExerciseRevision, 'repository'> & { repository: ResolversParentTypes['GroupedExercise'] };
  GroupedExerciseRevisionConnection: Omit<GroupedExerciseRevisionConnection, 'edges' | 'nodes'> & { edges: Array<ResolversParentTypes['GroupedExerciseRevisionCursor']>, nodes: Array<ResolversParentTypes['GroupedExerciseRevision']> };
  GroupedExerciseRevisionCursor: Omit<GroupedExerciseRevisionCursor, 'node'> & { node: ResolversParentTypes['GroupedExerciseRevision'] };
  Page: Omit<Page, 'license' | 'currentRevision' | 'revisions'> & { license: ResolversParentTypes['License'], currentRevision?: Maybe<ResolversParentTypes['PageRevision']>, revisions: ResolversParentTypes['PageRevisionConnection'] };
  PageRevision: Omit<PageRevision, 'repository'> & { repository: ResolversParentTypes['Page'] };
  PageRevisionConnection: Omit<PageRevisionConnection, 'edges' | 'nodes'> & { edges: Array<ResolversParentTypes['PageRevisionCursor']>, nodes: Array<ResolversParentTypes['PageRevision']> };
  PageRevisionCursor: Omit<PageRevisionCursor, 'node'> & { node: ResolversParentTypes['PageRevision'] };
  Solution: Omit<Solution, 'license' | 'currentRevision' | 'revisions' | 'exercise'> & { license: ResolversParentTypes['License'], currentRevision?: Maybe<ResolversParentTypes['SolutionRevision']>, revisions?: Maybe<ResolversParentTypes['SolutionRevisionConnection']>, exercise: ResolversParentTypes['AbstractExercise'] };
  SolutionRevision: Omit<SolutionRevision, 'repository'> & { repository: ResolversParentTypes['Solution'] };
  SolutionRevisionConnection: Omit<SolutionRevisionConnection, 'edges' | 'nodes'> & { edges: Array<ResolversParentTypes['SolutionRevisionCursor']>, nodes: Array<ResolversParentTypes['SolutionRevision']> };
  SolutionRevisionCursor: Omit<SolutionRevisionCursor, 'node'> & { node: ResolversParentTypes['SolutionRevision'] };
  TaxonomyTerm: TaxonomyTerm;
  User: User;
  UserConnection: UserConnection;
  UserEdge: UserEdge;
  Video: Omit<Video, 'license' | 'currentRevision' | 'revisions'> & { license: ResolversParentTypes['License'], currentRevision?: Maybe<ResolversParentTypes['VideoRevision']>, revisions: ResolversParentTypes['VideoRevisionConnection'] };
  VideoRevision: Omit<VideoRevision, 'repository'> & { repository: ResolversParentTypes['Video'] };
  VideoRevisionConnection: Omit<VideoRevisionConnection, 'edges' | 'nodes'> & { edges: Array<ResolversParentTypes['VideoRevisionCursor']>, nodes: Array<ResolversParentTypes['VideoRevision']> };
  VideoRevisionCursor: Omit<VideoRevisionCursor, 'node'> & { node: ResolversParentTypes['VideoRevision'] };
};

export type MutationResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  _removeCache?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<Mutation_RemoveCacheArgs, 'key'>>;
  _setCache?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<Mutation_SetCacheArgs, 'key' | 'value'>>;
  _updateCache?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<Mutation_UpdateCacheArgs, 'keys'>>;
  notification?: Resolver<ResolversTypes['NotificationMutation'], ParentType, ContextType>;
  subscription?: Resolver<ResolversTypes['SubscriptionMutation'], ParentType, ContextType>;
  thread?: Resolver<ResolversTypes['ThreadMutation'], ParentType, ContextType>;
  uuid?: Resolver<ResolversTypes['UuidMutation'], ParentType, ContextType>;
};

export type PageInfoResolvers<ContextType = Context, ParentType extends ResolversParentTypes['PageInfo'] = ResolversParentTypes['PageInfo']> = {
  hasNextPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  hasPreviousPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  startCursor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  endCursor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type InstanceAwareResolvers<ContextType = Context, ParentType extends ResolversParentTypes['InstanceAware'] = ResolversParentTypes['InstanceAware']> = {
  __resolveType: TypeResolveFn<'License' | 'CheckoutRevisionNotificationEvent' | 'CreateCommentNotificationEvent' | 'CreateEntityLinkNotificationEvent' | 'CreateEntityNotificationEvent' | 'CreateEntityRevisionNotificationEvent' | 'CreateTaxonomyLinkNotificationEvent' | 'CreateTaxonomyTermNotificationEvent' | 'CreateThreadNotificationEvent' | 'RejectRevisionNotificationEvent' | 'RemoveEntityLinkNotificationEvent' | 'RemoveTaxonomyLinkNotificationEvent' | 'SetLicenseNotificationEvent' | 'SetTaxonomyParentNotificationEvent' | 'SetTaxonomyTermNotificationEvent' | 'SetThreadStateNotificationEvent' | 'SetUuidStateNotificationEvent' | 'Applet' | 'Article' | 'CoursePage' | 'Course' | 'Event' | 'ExerciseGroup' | 'Exercise' | 'GroupedExercise' | 'Page' | 'Solution' | 'TaxonomyTerm' | 'Video', ParentType, ContextType>;
  instance?: Resolver<ResolversTypes['Instance'], ParentType, ContextType>;
};

export interface JsonScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JSON'], any> {
  name: 'JSON';
}

export interface JsonObjectScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JSONObject'], any> {
  name: 'JSONObject';
}

export type LicenseResolvers<ContextType = Context, ParentType extends ResolversParentTypes['License'] = ResolversParentTypes['License']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  instance?: Resolver<ResolversTypes['Instance'], ParentType, ContextType>;
  default?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  content?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  agreement?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  iconHref?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  activeAuthors?: Resolver<ResolversTypes['UserConnection'], ParentType, ContextType, RequireFields<QueryActiveAuthorsArgs, never>>;
  activeDonors?: Resolver<ResolversTypes['UserConnection'], ParentType, ContextType, RequireFields<QueryActiveDonorsArgs, never>>;
  activeReviewers?: Resolver<ResolversTypes['UserConnection'], ParentType, ContextType, RequireFields<QueryActiveReviewersArgs, never>>;
  license?: Resolver<Maybe<ResolversTypes['License']>, ParentType, ContextType, RequireFields<QueryLicenseArgs, 'id'>>;
  notificationEvent?: Resolver<Maybe<ResolversTypes['AbstractNotificationEvent']>, ParentType, ContextType, RequireFields<QueryNotificationEventArgs, 'id'>>;
  notifications?: Resolver<ResolversTypes['NotificationConnection'], ParentType, ContextType, RequireFields<QueryNotificationsArgs, never>>;
  subscriptions?: Resolver<ResolversTypes['QuerySubscriptionResult'], ParentType, ContextType, RequireFields<QuerySubscriptionsArgs, never>>;
  uuid?: Resolver<Maybe<ResolversTypes['AbstractUuid']>, ParentType, ContextType, RequireFields<QueryUuidArgs, never>>;
};

export type CheckoutRevisionNotificationEventResolvers<ContextType = Context, ParentType extends ResolversParentTypes['CheckoutRevisionNotificationEvent'] = ResolversParentTypes['CheckoutRevisionNotificationEvent']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  instance?: Resolver<ResolversTypes['Instance'], ParentType, ContextType>;
  date?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  actor?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  objectId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  repository?: Resolver<ResolversTypes['AbstractRepository'], ParentType, ContextType>;
  revision?: Resolver<ResolversTypes['AbstractRevision'], ParentType, ContextType>;
  reason?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreateCommentNotificationEventResolvers<ContextType = Context, ParentType extends ResolversParentTypes['CreateCommentNotificationEvent'] = ResolversParentTypes['CreateCommentNotificationEvent']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  instance?: Resolver<ResolversTypes['Instance'], ParentType, ContextType>;
  date?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  actor?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  objectId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  thread?: Resolver<ResolversTypes['UnsupportedThread'], ParentType, ContextType>;
  comment?: Resolver<ResolversTypes['UnsupportedComment'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreateEntityLinkNotificationEventResolvers<ContextType = Context, ParentType extends ResolversParentTypes['CreateEntityLinkNotificationEvent'] = ResolversParentTypes['CreateEntityLinkNotificationEvent']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  instance?: Resolver<ResolversTypes['Instance'], ParentType, ContextType>;
  date?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  actor?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  objectId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  parent?: Resolver<ResolversTypes['AbstractEntity'], ParentType, ContextType>;
  child?: Resolver<ResolversTypes['AbstractEntity'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreateEntityNotificationEventResolvers<ContextType = Context, ParentType extends ResolversParentTypes['CreateEntityNotificationEvent'] = ResolversParentTypes['CreateEntityNotificationEvent']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  instance?: Resolver<ResolversTypes['Instance'], ParentType, ContextType>;
  date?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  actor?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  objectId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  entity?: Resolver<ResolversTypes['AbstractEntity'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreateEntityRevisionNotificationEventResolvers<ContextType = Context, ParentType extends ResolversParentTypes['CreateEntityRevisionNotificationEvent'] = ResolversParentTypes['CreateEntityRevisionNotificationEvent']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  instance?: Resolver<ResolversTypes['Instance'], ParentType, ContextType>;
  date?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  actor?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  objectId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  entity?: Resolver<ResolversTypes['AbstractEntity'], ParentType, ContextType>;
  entityRevision?: Resolver<ResolversTypes['AbstractEntityRevision'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreateTaxonomyLinkNotificationEventResolvers<ContextType = Context, ParentType extends ResolversParentTypes['CreateTaxonomyLinkNotificationEvent'] = ResolversParentTypes['CreateTaxonomyLinkNotificationEvent']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  instance?: Resolver<ResolversTypes['Instance'], ParentType, ContextType>;
  date?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  actor?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  objectId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  parent?: Resolver<ResolversTypes['TaxonomyTerm'], ParentType, ContextType>;
  child?: Resolver<ResolversTypes['AbstractUuid'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreateTaxonomyTermNotificationEventResolvers<ContextType = Context, ParentType extends ResolversParentTypes['CreateTaxonomyTermNotificationEvent'] = ResolversParentTypes['CreateTaxonomyTermNotificationEvent']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  instance?: Resolver<ResolversTypes['Instance'], ParentType, ContextType>;
  date?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  actor?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  objectId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  taxonomyTerm?: Resolver<ResolversTypes['TaxonomyTerm'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreateThreadNotificationEventResolvers<ContextType = Context, ParentType extends ResolversParentTypes['CreateThreadNotificationEvent'] = ResolversParentTypes['CreateThreadNotificationEvent']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  instance?: Resolver<ResolversTypes['Instance'], ParentType, ContextType>;
  date?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  actor?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  objectId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  object?: Resolver<ResolversTypes['AbstractUuid'], ParentType, ContextType>;
  thread?: Resolver<ResolversTypes['UnsupportedThread'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RejectRevisionNotificationEventResolvers<ContextType = Context, ParentType extends ResolversParentTypes['RejectRevisionNotificationEvent'] = ResolversParentTypes['RejectRevisionNotificationEvent']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  instance?: Resolver<ResolversTypes['Instance'], ParentType, ContextType>;
  date?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  actor?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  objectId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  repository?: Resolver<ResolversTypes['AbstractRepository'], ParentType, ContextType>;
  revision?: Resolver<ResolversTypes['AbstractRevision'], ParentType, ContextType>;
  reason?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RemoveEntityLinkNotificationEventResolvers<ContextType = Context, ParentType extends ResolversParentTypes['RemoveEntityLinkNotificationEvent'] = ResolversParentTypes['RemoveEntityLinkNotificationEvent']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  instance?: Resolver<ResolversTypes['Instance'], ParentType, ContextType>;
  date?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  actor?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  objectId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  parent?: Resolver<ResolversTypes['AbstractEntity'], ParentType, ContextType>;
  child?: Resolver<ResolversTypes['AbstractEntity'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RemoveTaxonomyLinkNotificationEventResolvers<ContextType = Context, ParentType extends ResolversParentTypes['RemoveTaxonomyLinkNotificationEvent'] = ResolversParentTypes['RemoveTaxonomyLinkNotificationEvent']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  instance?: Resolver<ResolversTypes['Instance'], ParentType, ContextType>;
  date?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  actor?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  objectId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  parent?: Resolver<ResolversTypes['TaxonomyTerm'], ParentType, ContextType>;
  child?: Resolver<ResolversTypes['AbstractUuid'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SetLicenseNotificationEventResolvers<ContextType = Context, ParentType extends ResolversParentTypes['SetLicenseNotificationEvent'] = ResolversParentTypes['SetLicenseNotificationEvent']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  instance?: Resolver<ResolversTypes['Instance'], ParentType, ContextType>;
  date?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  actor?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  objectId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  repository?: Resolver<ResolversTypes['AbstractRepository'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SetTaxonomyParentNotificationEventResolvers<ContextType = Context, ParentType extends ResolversParentTypes['SetTaxonomyParentNotificationEvent'] = ResolversParentTypes['SetTaxonomyParentNotificationEvent']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  instance?: Resolver<ResolversTypes['Instance'], ParentType, ContextType>;
  date?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  actor?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  objectId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  previousParent?: Resolver<Maybe<ResolversTypes['TaxonomyTerm']>, ParentType, ContextType>;
  parent?: Resolver<Maybe<ResolversTypes['TaxonomyTerm']>, ParentType, ContextType>;
  child?: Resolver<ResolversTypes['TaxonomyTerm'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SetTaxonomyTermNotificationEventResolvers<ContextType = Context, ParentType extends ResolversParentTypes['SetTaxonomyTermNotificationEvent'] = ResolversParentTypes['SetTaxonomyTermNotificationEvent']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  instance?: Resolver<ResolversTypes['Instance'], ParentType, ContextType>;
  date?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  actor?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  objectId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  taxonomyTerm?: Resolver<ResolversTypes['TaxonomyTerm'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SetThreadStateNotificationEventResolvers<ContextType = Context, ParentType extends ResolversParentTypes['SetThreadStateNotificationEvent'] = ResolversParentTypes['SetThreadStateNotificationEvent']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  instance?: Resolver<ResolversTypes['Instance'], ParentType, ContextType>;
  date?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  actor?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  objectId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  thread?: Resolver<ResolversTypes['UnsupportedThread'], ParentType, ContextType>;
  archived?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SetUuidStateNotificationEventResolvers<ContextType = Context, ParentType extends ResolversParentTypes['SetUuidStateNotificationEvent'] = ResolversParentTypes['SetUuidStateNotificationEvent']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  instance?: Resolver<ResolversTypes['Instance'], ParentType, ContextType>;
  date?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  actor?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  objectId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  object?: Resolver<ResolversTypes['AbstractUuid'], ParentType, ContextType>;
  trashed?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type NotificationResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Notification'] = ResolversParentTypes['Notification']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  unread?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  event?: Resolver<ResolversTypes['AbstractNotificationEvent'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AbstractNotificationEventResolvers<ContextType = Context, ParentType extends ResolversParentTypes['AbstractNotificationEvent'] = ResolversParentTypes['AbstractNotificationEvent']> = {
  __resolveType: TypeResolveFn<'CheckoutRevisionNotificationEvent' | 'CreateCommentNotificationEvent' | 'CreateEntityLinkNotificationEvent' | 'CreateEntityNotificationEvent' | 'CreateEntityRevisionNotificationEvent' | 'CreateTaxonomyLinkNotificationEvent' | 'CreateTaxonomyTermNotificationEvent' | 'CreateThreadNotificationEvent' | 'RejectRevisionNotificationEvent' | 'RemoveEntityLinkNotificationEvent' | 'RemoveTaxonomyLinkNotificationEvent' | 'SetLicenseNotificationEvent' | 'SetTaxonomyParentNotificationEvent' | 'SetTaxonomyTermNotificationEvent' | 'SetThreadStateNotificationEvent' | 'SetUuidStateNotificationEvent', ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  instance?: Resolver<ResolversTypes['Instance'], ParentType, ContextType>;
  date?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  actor?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  objectId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
};

export type NotificationMutationResolvers<ContextType = Context, ParentType extends ResolversParentTypes['NotificationMutation'] = ResolversParentTypes['NotificationMutation']> = {
  setState?: Resolver<Maybe<ResolversTypes['NotificationSetStateResponse']>, ParentType, ContextType, RequireFields<NotificationMutationSetStateArgs, 'input'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type NotificationSetStateResponseResolvers<ContextType = Context, ParentType extends ResolversParentTypes['NotificationSetStateResponse'] = ResolversParentTypes['NotificationSetStateResponse']> = {
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  query?: Resolver<ResolversTypes['Query'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type NotificationConnectionResolvers<ContextType = Context, ParentType extends ResolversParentTypes['NotificationConnection'] = ResolversParentTypes['NotificationConnection']> = {
  edges?: Resolver<Array<ResolversTypes['NotificationEdge']>, ParentType, ContextType>;
  nodes?: Resolver<Array<ResolversTypes['Notification']>, ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type NotificationEdgeResolvers<ContextType = Context, ParentType extends ResolversParentTypes['NotificationEdge'] = ResolversParentTypes['NotificationEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['Notification'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QuerySubscriptionResultResolvers<ContextType = Context, ParentType extends ResolversParentTypes['QuerySubscriptionResult'] = ResolversParentTypes['QuerySubscriptionResult']> = {
  edges?: Resolver<Array<ResolversTypes['SubscriptionCursor']>, ParentType, ContextType>;
  nodes?: Resolver<Array<ResolversTypes['AbstractUuid']>, ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubscriptionCursorResolvers<ContextType = Context, ParentType extends ResolversParentTypes['SubscriptionCursor'] = ResolversParentTypes['SubscriptionCursor']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['AbstractUuid'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubscriptionMutationResolvers<ContextType = Context, ParentType extends ResolversParentTypes['SubscriptionMutation'] = ResolversParentTypes['SubscriptionMutation']> = {
  set?: Resolver<Maybe<ResolversTypes['SubscriptionSetResponse']>, ParentType, ContextType, RequireFields<SubscriptionMutationSetArgs, 'input'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubscriptionSetResponseResolvers<ContextType = Context, ParentType extends ResolversParentTypes['SubscriptionSetResponse'] = ResolversParentTypes['SubscriptionSetResponse']> = {
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  query?: Resolver<ResolversTypes['Query'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ThreadResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Thread'] = ResolversParentTypes['Thread']> = {
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  archived?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  object?: Resolver<ResolversTypes['AbstractUuid'], ParentType, ContextType>;
  comments?: Resolver<ResolversTypes['CommentConnection'], ParentType, ContextType, RequireFields<ThreadCommentsArgs, never>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CommentResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Comment'] = ResolversParentTypes['Comment']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  content?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  alias?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  trashed?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  archived?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  author?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ThreadAwareResolvers<ContextType = Context, ParentType extends ResolversParentTypes['ThreadAware'] = ResolversParentTypes['ThreadAware']> = {
  __resolveType: TypeResolveFn<'Applet' | 'AppletRevision' | 'Article' | 'ArticleRevision' | 'CoursePage' | 'CoursePageRevision' | 'Course' | 'CourseRevision' | 'Event' | 'EventRevision' | 'ExerciseGroup' | 'ExerciseGroupRevision' | 'Exercise' | 'ExerciseRevision' | 'GroupedExercise' | 'GroupedExerciseRevision' | 'Page' | 'PageRevision' | 'Solution' | 'SolutionRevision' | 'TaxonomyTerm' | 'User' | 'Video' | 'VideoRevision', ParentType, ContextType>;
  threads?: Resolver<ResolversTypes['ThreadsConnection'], ParentType, ContextType, RequireFields<ThreadAwareThreadsArgs, never>>;
};

export type ThreadsConnectionResolvers<ContextType = Context, ParentType extends ResolversParentTypes['ThreadsConnection'] = ResolversParentTypes['ThreadsConnection']> = {
  edges?: Resolver<Array<ResolversTypes['ThreadsCursor']>, ParentType, ContextType>;
  nodes?: Resolver<Array<ResolversTypes['Thread']>, ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ThreadsCursorResolvers<ContextType = Context, ParentType extends ResolversParentTypes['ThreadsCursor'] = ResolversParentTypes['ThreadsCursor']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['Thread'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UnsupportedThreadResolvers<ContextType = Context, ParentType extends ResolversParentTypes['UnsupportedThread'] = ResolversParentTypes['UnsupportedThread']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UnsupportedCommentResolvers<ContextType = Context, ParentType extends ResolversParentTypes['UnsupportedComment'] = ResolversParentTypes['UnsupportedComment']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CommentConnectionResolvers<ContextType = Context, ParentType extends ResolversParentTypes['CommentConnection'] = ResolversParentTypes['CommentConnection']> = {
  edges?: Resolver<Array<ResolversTypes['CommentEdge']>, ParentType, ContextType>;
  nodes?: Resolver<Array<ResolversTypes['Comment']>, ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CommentEdgeResolvers<ContextType = Context, ParentType extends ResolversParentTypes['CommentEdge'] = ResolversParentTypes['CommentEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['Comment'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ThreadMutationResolvers<ContextType = Context, ParentType extends ResolversParentTypes['ThreadMutation'] = ResolversParentTypes['ThreadMutation']> = {
  createThread?: Resolver<Maybe<ResolversTypes['ThreadCreateThreadResponse']>, ParentType, ContextType, RequireFields<ThreadMutationCreateThreadArgs, 'input'>>;
  createComment?: Resolver<Maybe<ResolversTypes['ThreadCreateCommentResponse']>, ParentType, ContextType, RequireFields<ThreadMutationCreateCommentArgs, 'input'>>;
  setThreadArchived?: Resolver<Maybe<ResolversTypes['ThreadSetThreadArchivedResponse']>, ParentType, ContextType, RequireFields<ThreadMutationSetThreadArchivedArgs, 'input'>>;
  setThreadState?: Resolver<Maybe<ResolversTypes['ThreadSetThreadStateResponse']>, ParentType, ContextType, RequireFields<ThreadMutationSetThreadStateArgs, 'input'>>;
  setCommentState?: Resolver<Maybe<ResolversTypes['ThreadSetCommentStateResponse']>, ParentType, ContextType, RequireFields<ThreadMutationSetCommentStateArgs, 'input'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ThreadCreateThreadResponseResolvers<ContextType = Context, ParentType extends ResolversParentTypes['ThreadCreateThreadResponse'] = ResolversParentTypes['ThreadCreateThreadResponse']> = {
  record?: Resolver<Maybe<ResolversTypes['Thread']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  query?: Resolver<ResolversTypes['Query'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ThreadCreateCommentResponseResolvers<ContextType = Context, ParentType extends ResolversParentTypes['ThreadCreateCommentResponse'] = ResolversParentTypes['ThreadCreateCommentResponse']> = {
  record?: Resolver<Maybe<ResolversTypes['Comment']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  query?: Resolver<ResolversTypes['Query'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ThreadSetThreadArchivedResponseResolvers<ContextType = Context, ParentType extends ResolversParentTypes['ThreadSetThreadArchivedResponse'] = ResolversParentTypes['ThreadSetThreadArchivedResponse']> = {
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  query?: Resolver<ResolversTypes['Query'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ThreadSetThreadStateResponseResolvers<ContextType = Context, ParentType extends ResolversParentTypes['ThreadSetThreadStateResponse'] = ResolversParentTypes['ThreadSetThreadStateResponse']> = {
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  query?: Resolver<ResolversTypes['Query'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ThreadSetCommentStateResponseResolvers<ContextType = Context, ParentType extends ResolversParentTypes['ThreadSetCommentStateResponse'] = ResolversParentTypes['ThreadSetCommentStateResponse']> = {
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  query?: Resolver<ResolversTypes['Query'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AbstractEntityResolvers<ContextType = Context, ParentType extends ResolversParentTypes['AbstractEntity'] = ResolversParentTypes['AbstractEntity']> = {
  __resolveType: TypeResolveFn<'Applet' | 'Article' | 'CoursePage' | 'Course' | 'Event' | 'ExerciseGroup' | 'Exercise' | 'GroupedExercise' | 'Solution' | 'Video', ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  trashed?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  date?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  instance?: Resolver<ResolversTypes['Instance'], ParentType, ContextType>;
  alias?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  license?: Resolver<ResolversTypes['License'], ParentType, ContextType>;
};

export type AbstractEntityRevisionResolvers<ContextType = Context, ParentType extends ResolversParentTypes['AbstractEntityRevision'] = ResolversParentTypes['AbstractEntityRevision']> = {
  __resolveType: TypeResolveFn<'AppletRevision' | 'ArticleRevision' | 'CoursePageRevision' | 'CourseRevision' | 'EventRevision' | 'ExerciseGroupRevision' | 'ExerciseRevision' | 'GroupedExerciseRevision' | 'SolutionRevision' | 'VideoRevision', ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  trashed?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  author?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  date?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  content?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  changes?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type AbstractExerciseResolvers<ContextType = Context, ParentType extends ResolversParentTypes['AbstractExercise'] = ResolversParentTypes['AbstractExercise']> = {
  __resolveType: TypeResolveFn<'Exercise' | 'GroupedExercise', ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  trashed?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  date?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  instance?: Resolver<ResolversTypes['Instance'], ParentType, ContextType>;
  alias?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  license?: Resolver<ResolversTypes['License'], ParentType, ContextType>;
  currentRevision?: Resolver<Maybe<ResolversTypes['AbstractExerciseRevision']>, ParentType, ContextType>;
  solution?: Resolver<Maybe<ResolversTypes['Solution']>, ParentType, ContextType>;
};

export type AbstractExerciseRevisionResolvers<ContextType = Context, ParentType extends ResolversParentTypes['AbstractExerciseRevision'] = ResolversParentTypes['AbstractExerciseRevision']> = {
  __resolveType: TypeResolveFn<'ExerciseRevision' | 'GroupedExerciseRevision', ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  trashed?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  alias?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  author?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  date?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  content?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  changes?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type AbstractNavigationChildResolvers<ContextType = Context, ParentType extends ResolversParentTypes['AbstractNavigationChild'] = ResolversParentTypes['AbstractNavigationChild']> = {
  __resolveType: TypeResolveFn<'Page' | 'TaxonomyTerm', ParentType, ContextType>;
  navigation?: Resolver<Maybe<ResolversTypes['Navigation']>, ParentType, ContextType>;
};

export type NavigationResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Navigation'] = ResolversParentTypes['Navigation']> = {
  data?: Resolver<ResolversTypes['JSON'], ParentType, ContextType>;
  path?: Resolver<ResolversTypes['NavigationNodeConnection'], ParentType, ContextType, RequireFields<NavigationPathArgs, never>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type NavigationNodeConnectionResolvers<ContextType = Context, ParentType extends ResolversParentTypes['NavigationNodeConnection'] = ResolversParentTypes['NavigationNodeConnection']> = {
  edges?: Resolver<Maybe<Array<Maybe<ResolversTypes['NavigationNodeEdge']>>>, ParentType, ContextType>;
  nodes?: Resolver<Array<ResolversTypes['NavigationNode']>, ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type NavigationNodeEdgeResolvers<ContextType = Context, ParentType extends ResolversParentTypes['NavigationNodeEdge'] = ResolversParentTypes['NavigationNodeEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['NavigationNode'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type NavigationNodeResolvers<ContextType = Context, ParentType extends ResolversParentTypes['NavigationNode'] = ResolversParentTypes['NavigationNode']> = {
  label?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AbstractRepositoryResolvers<ContextType = Context, ParentType extends ResolversParentTypes['AbstractRepository'] = ResolversParentTypes['AbstractRepository']> = {
  __resolveType: TypeResolveFn<'Applet' | 'Article' | 'CoursePage' | 'Course' | 'Event' | 'ExerciseGroup' | 'Exercise' | 'GroupedExercise' | 'Page' | 'Solution' | 'Video', ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  trashed?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  alias?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  threads?: Resolver<ResolversTypes['ThreadsConnection'], ParentType, ContextType, RequireFields<AbstractRepositoryThreadsArgs, never>>;
  date?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  instance?: Resolver<ResolversTypes['Instance'], ParentType, ContextType>;
  license?: Resolver<ResolversTypes['License'], ParentType, ContextType>;
};

export type AbstractRevisionResolvers<ContextType = Context, ParentType extends ResolversParentTypes['AbstractRevision'] = ResolversParentTypes['AbstractRevision']> = {
  __resolveType: TypeResolveFn<'AppletRevision' | 'ArticleRevision' | 'CoursePageRevision' | 'CourseRevision' | 'EventRevision' | 'ExerciseGroupRevision' | 'ExerciseRevision' | 'GroupedExerciseRevision' | 'PageRevision' | 'SolutionRevision' | 'VideoRevision', ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  trashed?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  alias?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  threads?: Resolver<ResolversTypes['ThreadsConnection'], ParentType, ContextType, RequireFields<AbstractRevisionThreadsArgs, never>>;
  author?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  date?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  content?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type AbstractTaxonomyTermChildResolvers<ContextType = Context, ParentType extends ResolversParentTypes['AbstractTaxonomyTermChild'] = ResolversParentTypes['AbstractTaxonomyTermChild']> = {
  __resolveType: TypeResolveFn<'Applet' | 'Article' | 'Course' | 'Event' | 'ExerciseGroup' | 'Exercise' | 'Video', ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  trashed?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  alias?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  date?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  instance?: Resolver<ResolversTypes['Instance'], ParentType, ContextType>;
  license?: Resolver<ResolversTypes['License'], ParentType, ContextType>;
  taxonomyTerms?: Resolver<ResolversTypes['TaxonomyTermConnection'], ParentType, ContextType, RequireFields<AbstractTaxonomyTermChildTaxonomyTermsArgs, never>>;
};

export type TaxonomyTermConnectionResolvers<ContextType = Context, ParentType extends ResolversParentTypes['TaxonomyTermConnection'] = ResolversParentTypes['TaxonomyTermConnection']> = {
  edges?: Resolver<Maybe<Array<Maybe<ResolversTypes['TaxonomyTermEdge']>>>, ParentType, ContextType>;
  nodes?: Resolver<Array<ResolversTypes['TaxonomyTerm']>, ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TaxonomyTermEdgeResolvers<ContextType = Context, ParentType extends ResolversParentTypes['TaxonomyTermEdge'] = ResolversParentTypes['TaxonomyTermEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['TaxonomyTerm'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AbstractUuidResolvers<ContextType = Context, ParentType extends ResolversParentTypes['AbstractUuid'] = ResolversParentTypes['AbstractUuid']> = {
  __resolveType: TypeResolveFn<'Comment' | 'Applet' | 'AppletRevision' | 'Article' | 'ArticleRevision' | 'CoursePage' | 'CoursePageRevision' | 'Course' | 'CourseRevision' | 'Event' | 'EventRevision' | 'ExerciseGroup' | 'ExerciseGroupRevision' | 'Exercise' | 'ExerciseRevision' | 'GroupedExercise' | 'GroupedExerciseRevision' | 'Page' | 'PageRevision' | 'Solution' | 'SolutionRevision' | 'TaxonomyTerm' | 'User' | 'Video' | 'VideoRevision', ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  trashed?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  alias?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
};

export type AbstractUuidConnectionResolvers<ContextType = Context, ParentType extends ResolversParentTypes['AbstractUuidConnection'] = ResolversParentTypes['AbstractUuidConnection']> = {
  edges?: Resolver<Array<ResolversTypes['AbstractUuidCursor']>, ParentType, ContextType>;
  nodes?: Resolver<Array<ResolversTypes['AbstractUuid']>, ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AbstractUuidCursorResolvers<ContextType = Context, ParentType extends ResolversParentTypes['AbstractUuidCursor'] = ResolversParentTypes['AbstractUuidCursor']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['AbstractUuid'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UuidMutationResolvers<ContextType = Context, ParentType extends ResolversParentTypes['UuidMutation'] = ResolversParentTypes['UuidMutation']> = {
  setState?: Resolver<Maybe<ResolversTypes['UuidSetStateResponse']>, ParentType, ContextType, RequireFields<UuidMutationSetStateArgs, 'input'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UuidSetStateResponseResolvers<ContextType = Context, ParentType extends ResolversParentTypes['UuidSetStateResponse'] = ResolversParentTypes['UuidSetStateResponse']> = {
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  query?: Resolver<ResolversTypes['Query'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AppletResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Applet'] = ResolversParentTypes['Applet']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  trashed?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  threads?: Resolver<ResolversTypes['ThreadsConnection'], ParentType, ContextType, RequireFields<AppletThreadsArgs, never>>;
  instance?: Resolver<ResolversTypes['Instance'], ParentType, ContextType>;
  alias?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  date?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  license?: Resolver<ResolversTypes['License'], ParentType, ContextType>;
  currentRevision?: Resolver<Maybe<ResolversTypes['AppletRevision']>, ParentType, ContextType>;
  revisions?: Resolver<ResolversTypes['AppletRevisionConnection'], ParentType, ContextType, RequireFields<AppletRevisionsArgs, never>>;
  taxonomyTerms?: Resolver<ResolversTypes['TaxonomyTermConnection'], ParentType, ContextType, RequireFields<AppletTaxonomyTermsArgs, never>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AppletRevisionResolvers<ContextType = Context, ParentType extends ResolversParentTypes['AppletRevision'] = ResolversParentTypes['AppletRevision']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  author?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  trashed?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  alias?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  threads?: Resolver<ResolversTypes['ThreadsConnection'], ParentType, ContextType, RequireFields<AppletRevisionThreadsArgs, never>>;
  date?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  repository?: Resolver<ResolversTypes['Applet'], ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  content?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  changes?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  metaTitle?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  metaDescription?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AppletRevisionConnectionResolvers<ContextType = Context, ParentType extends ResolversParentTypes['AppletRevisionConnection'] = ResolversParentTypes['AppletRevisionConnection']> = {
  edges?: Resolver<Array<ResolversTypes['AppletRevisionCursor']>, ParentType, ContextType>;
  nodes?: Resolver<Array<ResolversTypes['AppletRevision']>, ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AppletRevisionCursorResolvers<ContextType = Context, ParentType extends ResolversParentTypes['AppletRevisionCursor'] = ResolversParentTypes['AppletRevisionCursor']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['AppletRevision'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ArticleResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Article'] = ResolversParentTypes['Article']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  trashed?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  threads?: Resolver<ResolversTypes['ThreadsConnection'], ParentType, ContextType, RequireFields<ArticleThreadsArgs, never>>;
  instance?: Resolver<ResolversTypes['Instance'], ParentType, ContextType>;
  alias?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  date?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  license?: Resolver<ResolversTypes['License'], ParentType, ContextType>;
  currentRevision?: Resolver<Maybe<ResolversTypes['ArticleRevision']>, ParentType, ContextType>;
  revisions?: Resolver<ResolversTypes['ArticleRevisionConnection'], ParentType, ContextType, RequireFields<ArticleRevisionsArgs, never>>;
  taxonomyTerms?: Resolver<ResolversTypes['TaxonomyTermConnection'], ParentType, ContextType, RequireFields<ArticleTaxonomyTermsArgs, never>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ArticleRevisionResolvers<ContextType = Context, ParentType extends ResolversParentTypes['ArticleRevision'] = ResolversParentTypes['ArticleRevision']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  author?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  trashed?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  alias?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  threads?: Resolver<ResolversTypes['ThreadsConnection'], ParentType, ContextType, RequireFields<ArticleRevisionThreadsArgs, never>>;
  date?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  repository?: Resolver<ResolversTypes['Article'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  content?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  changes?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  metaTitle?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  metaDescription?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ArticleRevisionConnectionResolvers<ContextType = Context, ParentType extends ResolversParentTypes['ArticleRevisionConnection'] = ResolversParentTypes['ArticleRevisionConnection']> = {
  edges?: Resolver<Array<ResolversTypes['ArticleRevisionCursor']>, ParentType, ContextType>;
  nodes?: Resolver<Array<ResolversTypes['ArticleRevision']>, ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ArticleRevisionCursorResolvers<ContextType = Context, ParentType extends ResolversParentTypes['ArticleRevisionCursor'] = ResolversParentTypes['ArticleRevisionCursor']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['ArticleRevision'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CoursePageResolvers<ContextType = Context, ParentType extends ResolversParentTypes['CoursePage'] = ResolversParentTypes['CoursePage']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  trashed?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  threads?: Resolver<ResolversTypes['ThreadsConnection'], ParentType, ContextType, RequireFields<CoursePageThreadsArgs, never>>;
  instance?: Resolver<ResolversTypes['Instance'], ParentType, ContextType>;
  alias?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  date?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  license?: Resolver<ResolversTypes['License'], ParentType, ContextType>;
  currentRevision?: Resolver<Maybe<ResolversTypes['CoursePageRevision']>, ParentType, ContextType>;
  revisions?: Resolver<ResolversTypes['CoursePageRevisionConnection'], ParentType, ContextType, RequireFields<CoursePageRevisionsArgs, never>>;
  course?: Resolver<ResolversTypes['Course'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CoursePageRevisionResolvers<ContextType = Context, ParentType extends ResolversParentTypes['CoursePageRevision'] = ResolversParentTypes['CoursePageRevision']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  author?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  trashed?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  alias?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  threads?: Resolver<ResolversTypes['ThreadsConnection'], ParentType, ContextType, RequireFields<CoursePageRevisionThreadsArgs, never>>;
  date?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  repository?: Resolver<ResolversTypes['CoursePage'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  content?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  changes?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CoursePageRevisionConnectionResolvers<ContextType = Context, ParentType extends ResolversParentTypes['CoursePageRevisionConnection'] = ResolversParentTypes['CoursePageRevisionConnection']> = {
  edges?: Resolver<Array<ResolversTypes['CoursePageRevisionCursor']>, ParentType, ContextType>;
  nodes?: Resolver<Array<ResolversTypes['CoursePageRevision']>, ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CoursePageRevisionCursorResolvers<ContextType = Context, ParentType extends ResolversParentTypes['CoursePageRevisionCursor'] = ResolversParentTypes['CoursePageRevisionCursor']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['CoursePageRevision'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CourseResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Course'] = ResolversParentTypes['Course']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  trashed?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  threads?: Resolver<ResolversTypes['ThreadsConnection'], ParentType, ContextType, RequireFields<CourseThreadsArgs, never>>;
  instance?: Resolver<ResolversTypes['Instance'], ParentType, ContextType>;
  alias?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  date?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  license?: Resolver<ResolversTypes['License'], ParentType, ContextType>;
  currentRevision?: Resolver<Maybe<ResolversTypes['CourseRevision']>, ParentType, ContextType>;
  revisions?: Resolver<ResolversTypes['CourseRevisionConnection'], ParentType, ContextType, RequireFields<CourseRevisionsArgs, never>>;
  taxonomyTerms?: Resolver<ResolversTypes['TaxonomyTermConnection'], ParentType, ContextType, RequireFields<CourseTaxonomyTermsArgs, never>>;
  pages?: Resolver<Array<ResolversTypes['CoursePage']>, ParentType, ContextType, RequireFields<CoursePagesArgs, never>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CourseRevisionResolvers<ContextType = Context, ParentType extends ResolversParentTypes['CourseRevision'] = ResolversParentTypes['CourseRevision']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  author?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  trashed?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  alias?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  threads?: Resolver<ResolversTypes['ThreadsConnection'], ParentType, ContextType, RequireFields<CourseRevisionThreadsArgs, never>>;
  date?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  repository?: Resolver<ResolversTypes['Course'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  content?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  changes?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  metaDescription?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CourseRevisionConnectionResolvers<ContextType = Context, ParentType extends ResolversParentTypes['CourseRevisionConnection'] = ResolversParentTypes['CourseRevisionConnection']> = {
  edges?: Resolver<Array<ResolversTypes['CourseRevisionCursor']>, ParentType, ContextType>;
  nodes?: Resolver<Array<ResolversTypes['CourseRevision']>, ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CourseRevisionCursorResolvers<ContextType = Context, ParentType extends ResolversParentTypes['CourseRevisionCursor'] = ResolversParentTypes['CourseRevisionCursor']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['CourseRevision'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type EventResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Event'] = ResolversParentTypes['Event']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  trashed?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  threads?: Resolver<ResolversTypes['ThreadsConnection'], ParentType, ContextType, RequireFields<EventThreadsArgs, never>>;
  instance?: Resolver<ResolversTypes['Instance'], ParentType, ContextType>;
  alias?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  date?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  license?: Resolver<ResolversTypes['License'], ParentType, ContextType>;
  currentRevision?: Resolver<Maybe<ResolversTypes['EventRevision']>, ParentType, ContextType>;
  revisions?: Resolver<ResolversTypes['EventRevisionConnection'], ParentType, ContextType, RequireFields<EventRevisionsArgs, never>>;
  taxonomyTerms?: Resolver<ResolversTypes['TaxonomyTermConnection'], ParentType, ContextType, RequireFields<EventTaxonomyTermsArgs, never>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type EventRevisionResolvers<ContextType = Context, ParentType extends ResolversParentTypes['EventRevision'] = ResolversParentTypes['EventRevision']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  author?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  trashed?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  alias?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  threads?: Resolver<ResolversTypes['ThreadsConnection'], ParentType, ContextType, RequireFields<EventRevisionThreadsArgs, never>>;
  date?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  repository?: Resolver<ResolversTypes['Event'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  content?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  changes?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  metaTitle?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  metaDescription?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type EventRevisionConnectionResolvers<ContextType = Context, ParentType extends ResolversParentTypes['EventRevisionConnection'] = ResolversParentTypes['EventRevisionConnection']> = {
  edges?: Resolver<Array<ResolversTypes['EventRevisionCursor']>, ParentType, ContextType>;
  nodes?: Resolver<Array<ResolversTypes['EventRevision']>, ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type EventRevisionCursorResolvers<ContextType = Context, ParentType extends ResolversParentTypes['EventRevisionCursor'] = ResolversParentTypes['EventRevisionCursor']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['EventRevision'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ExerciseGroupResolvers<ContextType = Context, ParentType extends ResolversParentTypes['ExerciseGroup'] = ResolversParentTypes['ExerciseGroup']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  trashed?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  threads?: Resolver<ResolversTypes['ThreadsConnection'], ParentType, ContextType, RequireFields<ExerciseGroupThreadsArgs, never>>;
  instance?: Resolver<ResolversTypes['Instance'], ParentType, ContextType>;
  alias?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  date?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  license?: Resolver<ResolversTypes['License'], ParentType, ContextType>;
  currentRevision?: Resolver<Maybe<ResolversTypes['ExerciseGroupRevision']>, ParentType, ContextType>;
  revisions?: Resolver<ResolversTypes['ExerciseGroupRevisionConnection'], ParentType, ContextType, RequireFields<ExerciseGroupRevisionsArgs, never>>;
  taxonomyTerms?: Resolver<ResolversTypes['TaxonomyTermConnection'], ParentType, ContextType, RequireFields<ExerciseGroupTaxonomyTermsArgs, never>>;
  exercises?: Resolver<Array<ResolversTypes['GroupedExercise']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ExerciseGroupRevisionResolvers<ContextType = Context, ParentType extends ResolversParentTypes['ExerciseGroupRevision'] = ResolversParentTypes['ExerciseGroupRevision']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  author?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  trashed?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  alias?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  threads?: Resolver<ResolversTypes['ThreadsConnection'], ParentType, ContextType, RequireFields<ExerciseGroupRevisionThreadsArgs, never>>;
  date?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  repository?: Resolver<ResolversTypes['ExerciseGroup'], ParentType, ContextType>;
  content?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  changes?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ExerciseGroupRevisionConnectionResolvers<ContextType = Context, ParentType extends ResolversParentTypes['ExerciseGroupRevisionConnection'] = ResolversParentTypes['ExerciseGroupRevisionConnection']> = {
  edges?: Resolver<Array<ResolversTypes['ExerciseGroupRevisionCursor']>, ParentType, ContextType>;
  nodes?: Resolver<Array<ResolversTypes['ExerciseGroupRevision']>, ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ExerciseGroupRevisionCursorResolvers<ContextType = Context, ParentType extends ResolversParentTypes['ExerciseGroupRevisionCursor'] = ResolversParentTypes['ExerciseGroupRevisionCursor']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['ExerciseGroupRevision'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ExerciseResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Exercise'] = ResolversParentTypes['Exercise']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  trashed?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  threads?: Resolver<ResolversTypes['ThreadsConnection'], ParentType, ContextType, RequireFields<ExerciseThreadsArgs, never>>;
  instance?: Resolver<ResolversTypes['Instance'], ParentType, ContextType>;
  alias?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  date?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  license?: Resolver<ResolversTypes['License'], ParentType, ContextType>;
  currentRevision?: Resolver<Maybe<ResolversTypes['ExerciseRevision']>, ParentType, ContextType>;
  revisions?: Resolver<ResolversTypes['ExerciseRevisionConnection'], ParentType, ContextType, RequireFields<ExerciseRevisionsArgs, never>>;
  taxonomyTerms?: Resolver<ResolversTypes['TaxonomyTermConnection'], ParentType, ContextType, RequireFields<ExerciseTaxonomyTermsArgs, never>>;
  solution?: Resolver<Maybe<ResolversTypes['Solution']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ExerciseRevisionResolvers<ContextType = Context, ParentType extends ResolversParentTypes['ExerciseRevision'] = ResolversParentTypes['ExerciseRevision']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  author?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  trashed?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  alias?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  threads?: Resolver<ResolversTypes['ThreadsConnection'], ParentType, ContextType, RequireFields<ExerciseRevisionThreadsArgs, never>>;
  date?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  repository?: Resolver<ResolversTypes['Exercise'], ParentType, ContextType>;
  content?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  changes?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ExerciseRevisionConnectionResolvers<ContextType = Context, ParentType extends ResolversParentTypes['ExerciseRevisionConnection'] = ResolversParentTypes['ExerciseRevisionConnection']> = {
  edges?: Resolver<Array<ResolversTypes['ExerciseRevisionCursor']>, ParentType, ContextType>;
  nodes?: Resolver<Array<ResolversTypes['ExerciseRevision']>, ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ExerciseRevisionCursorResolvers<ContextType = Context, ParentType extends ResolversParentTypes['ExerciseRevisionCursor'] = ResolversParentTypes['ExerciseRevisionCursor']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['ExerciseRevision'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GroupedExerciseResolvers<ContextType = Context, ParentType extends ResolversParentTypes['GroupedExercise'] = ResolversParentTypes['GroupedExercise']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  trashed?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  threads?: Resolver<ResolversTypes['ThreadsConnection'], ParentType, ContextType, RequireFields<GroupedExerciseThreadsArgs, never>>;
  instance?: Resolver<ResolversTypes['Instance'], ParentType, ContextType>;
  alias?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  date?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  license?: Resolver<ResolversTypes['License'], ParentType, ContextType>;
  currentRevision?: Resolver<Maybe<ResolversTypes['GroupedExerciseRevision']>, ParentType, ContextType>;
  revisions?: Resolver<ResolversTypes['GroupedExerciseRevisionConnection'], ParentType, ContextType, RequireFields<GroupedExerciseRevisionsArgs, never>>;
  solution?: Resolver<Maybe<ResolversTypes['Solution']>, ParentType, ContextType>;
  exerciseGroup?: Resolver<ResolversTypes['ExerciseGroup'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GroupedExerciseRevisionResolvers<ContextType = Context, ParentType extends ResolversParentTypes['GroupedExerciseRevision'] = ResolversParentTypes['GroupedExerciseRevision']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  author?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  trashed?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  alias?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  threads?: Resolver<ResolversTypes['ThreadsConnection'], ParentType, ContextType, RequireFields<GroupedExerciseRevisionThreadsArgs, never>>;
  date?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  repository?: Resolver<ResolversTypes['GroupedExercise'], ParentType, ContextType>;
  content?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  changes?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GroupedExerciseRevisionConnectionResolvers<ContextType = Context, ParentType extends ResolversParentTypes['GroupedExerciseRevisionConnection'] = ResolversParentTypes['GroupedExerciseRevisionConnection']> = {
  edges?: Resolver<Array<ResolversTypes['GroupedExerciseRevisionCursor']>, ParentType, ContextType>;
  nodes?: Resolver<Array<ResolversTypes['GroupedExerciseRevision']>, ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GroupedExerciseRevisionCursorResolvers<ContextType = Context, ParentType extends ResolversParentTypes['GroupedExerciseRevisionCursor'] = ResolversParentTypes['GroupedExerciseRevisionCursor']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['GroupedExerciseRevision'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PageResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Page'] = ResolversParentTypes['Page']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  trashed?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  threads?: Resolver<ResolversTypes['ThreadsConnection'], ParentType, ContextType, RequireFields<PageThreadsArgs, never>>;
  date?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  instance?: Resolver<ResolversTypes['Instance'], ParentType, ContextType>;
  alias?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  license?: Resolver<ResolversTypes['License'], ParentType, ContextType>;
  currentRevision?: Resolver<Maybe<ResolversTypes['PageRevision']>, ParentType, ContextType>;
  revisions?: Resolver<ResolversTypes['PageRevisionConnection'], ParentType, ContextType, RequireFields<PageRevisionsArgs, never>>;
  navigation?: Resolver<Maybe<ResolversTypes['Navigation']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PageRevisionResolvers<ContextType = Context, ParentType extends ResolversParentTypes['PageRevision'] = ResolversParentTypes['PageRevision']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  author?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  trashed?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  alias?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  threads?: Resolver<ResolversTypes['ThreadsConnection'], ParentType, ContextType, RequireFields<PageRevisionThreadsArgs, never>>;
  date?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  content?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  repository?: Resolver<ResolversTypes['Page'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PageRevisionConnectionResolvers<ContextType = Context, ParentType extends ResolversParentTypes['PageRevisionConnection'] = ResolversParentTypes['PageRevisionConnection']> = {
  edges?: Resolver<Array<ResolversTypes['PageRevisionCursor']>, ParentType, ContextType>;
  nodes?: Resolver<Array<ResolversTypes['PageRevision']>, ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PageRevisionCursorResolvers<ContextType = Context, ParentType extends ResolversParentTypes['PageRevisionCursor'] = ResolversParentTypes['PageRevisionCursor']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['PageRevision'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SolutionResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Solution'] = ResolversParentTypes['Solution']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  trashed?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  threads?: Resolver<ResolversTypes['ThreadsConnection'], ParentType, ContextType, RequireFields<SolutionThreadsArgs, never>>;
  instance?: Resolver<ResolversTypes['Instance'], ParentType, ContextType>;
  alias?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  date?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  license?: Resolver<ResolversTypes['License'], ParentType, ContextType>;
  currentRevision?: Resolver<Maybe<ResolversTypes['SolutionRevision']>, ParentType, ContextType>;
  revisions?: Resolver<Maybe<ResolversTypes['SolutionRevisionConnection']>, ParentType, ContextType, RequireFields<SolutionRevisionsArgs, never>>;
  exercise?: Resolver<ResolversTypes['AbstractExercise'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SolutionRevisionResolvers<ContextType = Context, ParentType extends ResolversParentTypes['SolutionRevision'] = ResolversParentTypes['SolutionRevision']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  author?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  trashed?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  alias?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  threads?: Resolver<ResolversTypes['ThreadsConnection'], ParentType, ContextType, RequireFields<SolutionRevisionThreadsArgs, never>>;
  date?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  repository?: Resolver<ResolversTypes['Solution'], ParentType, ContextType>;
  content?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  changes?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SolutionRevisionConnectionResolvers<ContextType = Context, ParentType extends ResolversParentTypes['SolutionRevisionConnection'] = ResolversParentTypes['SolutionRevisionConnection']> = {
  edges?: Resolver<Array<ResolversTypes['SolutionRevisionCursor']>, ParentType, ContextType>;
  nodes?: Resolver<Array<ResolversTypes['SolutionRevision']>, ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SolutionRevisionCursorResolvers<ContextType = Context, ParentType extends ResolversParentTypes['SolutionRevisionCursor'] = ResolversParentTypes['SolutionRevisionCursor']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['SolutionRevision'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TaxonomyTermResolvers<ContextType = Context, ParentType extends ResolversParentTypes['TaxonomyTerm'] = ResolversParentTypes['TaxonomyTerm']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  trashed?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  threads?: Resolver<ResolversTypes['ThreadsConnection'], ParentType, ContextType, RequireFields<TaxonomyTermThreadsArgs, never>>;
  type?: Resolver<ResolversTypes['TaxonomyTermType'], ParentType, ContextType>;
  instance?: Resolver<ResolversTypes['Instance'], ParentType, ContextType>;
  alias?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  weight?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  parent?: Resolver<Maybe<ResolversTypes['TaxonomyTerm']>, ParentType, ContextType>;
  children?: Resolver<ResolversTypes['AbstractUuidConnection'], ParentType, ContextType, RequireFields<TaxonomyTermChildrenArgs, never>>;
  navigation?: Resolver<Maybe<ResolversTypes['Navigation']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<ContextType = Context, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  trashed?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  threads?: Resolver<ResolversTypes['ThreadsConnection'], ParentType, ContextType, RequireFields<UserThreadsArgs, never>>;
  alias?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  date?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  lastLogin?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  activeAuthor?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  activeDonor?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  activeReviewer?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserConnectionResolvers<ContextType = Context, ParentType extends ResolversParentTypes['UserConnection'] = ResolversParentTypes['UserConnection']> = {
  edges?: Resolver<Array<ResolversTypes['UserEdge']>, ParentType, ContextType>;
  nodes?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserEdgeResolvers<ContextType = Context, ParentType extends ResolversParentTypes['UserEdge'] = ResolversParentTypes['UserEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type VideoResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Video'] = ResolversParentTypes['Video']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  trashed?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  threads?: Resolver<ResolversTypes['ThreadsConnection'], ParentType, ContextType, RequireFields<VideoThreadsArgs, never>>;
  instance?: Resolver<ResolversTypes['Instance'], ParentType, ContextType>;
  alias?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  date?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  license?: Resolver<ResolversTypes['License'], ParentType, ContextType>;
  currentRevision?: Resolver<Maybe<ResolversTypes['VideoRevision']>, ParentType, ContextType>;
  revisions?: Resolver<ResolversTypes['VideoRevisionConnection'], ParentType, ContextType, RequireFields<VideoRevisionsArgs, never>>;
  taxonomyTerms?: Resolver<ResolversTypes['TaxonomyTermConnection'], ParentType, ContextType, RequireFields<VideoTaxonomyTermsArgs, never>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type VideoRevisionResolvers<ContextType = Context, ParentType extends ResolversParentTypes['VideoRevision'] = ResolversParentTypes['VideoRevision']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  author?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  trashed?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  alias?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  threads?: Resolver<ResolversTypes['ThreadsConnection'], ParentType, ContextType, RequireFields<VideoRevisionThreadsArgs, never>>;
  date?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  repository?: Resolver<ResolversTypes['Video'], ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  content?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  changes?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type VideoRevisionConnectionResolvers<ContextType = Context, ParentType extends ResolversParentTypes['VideoRevisionConnection'] = ResolversParentTypes['VideoRevisionConnection']> = {
  edges?: Resolver<Array<ResolversTypes['VideoRevisionCursor']>, ParentType, ContextType>;
  nodes?: Resolver<Array<ResolversTypes['VideoRevision']>, ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type VideoRevisionCursorResolvers<ContextType = Context, ParentType extends ResolversParentTypes['VideoRevisionCursor'] = ResolversParentTypes['VideoRevisionCursor']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['VideoRevision'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = Context> = {
  Mutation?: MutationResolvers<ContextType>;
  PageInfo?: PageInfoResolvers<ContextType>;
  DateTime?: GraphQLScalarType;
  InstanceAware?: InstanceAwareResolvers<ContextType>;
  JSON?: GraphQLScalarType;
  JSONObject?: GraphQLScalarType;
  License?: LicenseResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  CheckoutRevisionNotificationEvent?: CheckoutRevisionNotificationEventResolvers<ContextType>;
  CreateCommentNotificationEvent?: CreateCommentNotificationEventResolvers<ContextType>;
  CreateEntityLinkNotificationEvent?: CreateEntityLinkNotificationEventResolvers<ContextType>;
  CreateEntityNotificationEvent?: CreateEntityNotificationEventResolvers<ContextType>;
  CreateEntityRevisionNotificationEvent?: CreateEntityRevisionNotificationEventResolvers<ContextType>;
  CreateTaxonomyLinkNotificationEvent?: CreateTaxonomyLinkNotificationEventResolvers<ContextType>;
  CreateTaxonomyTermNotificationEvent?: CreateTaxonomyTermNotificationEventResolvers<ContextType>;
  CreateThreadNotificationEvent?: CreateThreadNotificationEventResolvers<ContextType>;
  RejectRevisionNotificationEvent?: RejectRevisionNotificationEventResolvers<ContextType>;
  RemoveEntityLinkNotificationEvent?: RemoveEntityLinkNotificationEventResolvers<ContextType>;
  RemoveTaxonomyLinkNotificationEvent?: RemoveTaxonomyLinkNotificationEventResolvers<ContextType>;
  SetLicenseNotificationEvent?: SetLicenseNotificationEventResolvers<ContextType>;
  SetTaxonomyParentNotificationEvent?: SetTaxonomyParentNotificationEventResolvers<ContextType>;
  SetTaxonomyTermNotificationEvent?: SetTaxonomyTermNotificationEventResolvers<ContextType>;
  SetThreadStateNotificationEvent?: SetThreadStateNotificationEventResolvers<ContextType>;
  SetUuidStateNotificationEvent?: SetUuidStateNotificationEventResolvers<ContextType>;
  Notification?: NotificationResolvers<ContextType>;
  AbstractNotificationEvent?: AbstractNotificationEventResolvers<ContextType>;
  NotificationMutation?: NotificationMutationResolvers<ContextType>;
  NotificationSetStateResponse?: NotificationSetStateResponseResolvers<ContextType>;
  NotificationConnection?: NotificationConnectionResolvers<ContextType>;
  NotificationEdge?: NotificationEdgeResolvers<ContextType>;
  QuerySubscriptionResult?: QuerySubscriptionResultResolvers<ContextType>;
  SubscriptionCursor?: SubscriptionCursorResolvers<ContextType>;
  SubscriptionMutation?: SubscriptionMutationResolvers<ContextType>;
  SubscriptionSetResponse?: SubscriptionSetResponseResolvers<ContextType>;
  Thread?: ThreadResolvers<ContextType>;
  Comment?: CommentResolvers<ContextType>;
  ThreadAware?: ThreadAwareResolvers<ContextType>;
  ThreadsConnection?: ThreadsConnectionResolvers<ContextType>;
  ThreadsCursor?: ThreadsCursorResolvers<ContextType>;
  UnsupportedThread?: UnsupportedThreadResolvers<ContextType>;
  UnsupportedComment?: UnsupportedCommentResolvers<ContextType>;
  CommentConnection?: CommentConnectionResolvers<ContextType>;
  CommentEdge?: CommentEdgeResolvers<ContextType>;
  ThreadMutation?: ThreadMutationResolvers<ContextType>;
  ThreadCreateThreadResponse?: ThreadCreateThreadResponseResolvers<ContextType>;
  ThreadCreateCommentResponse?: ThreadCreateCommentResponseResolvers<ContextType>;
  ThreadSetThreadArchivedResponse?: ThreadSetThreadArchivedResponseResolvers<ContextType>;
  ThreadSetThreadStateResponse?: ThreadSetThreadStateResponseResolvers<ContextType>;
  ThreadSetCommentStateResponse?: ThreadSetCommentStateResponseResolvers<ContextType>;
  AbstractEntity?: AbstractEntityResolvers<ContextType>;
  AbstractEntityRevision?: AbstractEntityRevisionResolvers<ContextType>;
  AbstractExercise?: AbstractExerciseResolvers<ContextType>;
  AbstractExerciseRevision?: AbstractExerciseRevisionResolvers<ContextType>;
  AbstractNavigationChild?: AbstractNavigationChildResolvers<ContextType>;
  Navigation?: NavigationResolvers<ContextType>;
  NavigationNodeConnection?: NavigationNodeConnectionResolvers<ContextType>;
  NavigationNodeEdge?: NavigationNodeEdgeResolvers<ContextType>;
  NavigationNode?: NavigationNodeResolvers<ContextType>;
  AbstractRepository?: AbstractRepositoryResolvers<ContextType>;
  AbstractRevision?: AbstractRevisionResolvers<ContextType>;
  AbstractTaxonomyTermChild?: AbstractTaxonomyTermChildResolvers<ContextType>;
  TaxonomyTermConnection?: TaxonomyTermConnectionResolvers<ContextType>;
  TaxonomyTermEdge?: TaxonomyTermEdgeResolvers<ContextType>;
  AbstractUuid?: AbstractUuidResolvers<ContextType>;
  AbstractUuidConnection?: AbstractUuidConnectionResolvers<ContextType>;
  AbstractUuidCursor?: AbstractUuidCursorResolvers<ContextType>;
  UuidMutation?: UuidMutationResolvers<ContextType>;
  UuidSetStateResponse?: UuidSetStateResponseResolvers<ContextType>;
  Applet?: AppletResolvers<ContextType>;
  AppletRevision?: AppletRevisionResolvers<ContextType>;
  AppletRevisionConnection?: AppletRevisionConnectionResolvers<ContextType>;
  AppletRevisionCursor?: AppletRevisionCursorResolvers<ContextType>;
  Article?: ArticleResolvers<ContextType>;
  ArticleRevision?: ArticleRevisionResolvers<ContextType>;
  ArticleRevisionConnection?: ArticleRevisionConnectionResolvers<ContextType>;
  ArticleRevisionCursor?: ArticleRevisionCursorResolvers<ContextType>;
  CoursePage?: CoursePageResolvers<ContextType>;
  CoursePageRevision?: CoursePageRevisionResolvers<ContextType>;
  CoursePageRevisionConnection?: CoursePageRevisionConnectionResolvers<ContextType>;
  CoursePageRevisionCursor?: CoursePageRevisionCursorResolvers<ContextType>;
  Course?: CourseResolvers<ContextType>;
  CourseRevision?: CourseRevisionResolvers<ContextType>;
  CourseRevisionConnection?: CourseRevisionConnectionResolvers<ContextType>;
  CourseRevisionCursor?: CourseRevisionCursorResolvers<ContextType>;
  Event?: EventResolvers<ContextType>;
  EventRevision?: EventRevisionResolvers<ContextType>;
  EventRevisionConnection?: EventRevisionConnectionResolvers<ContextType>;
  EventRevisionCursor?: EventRevisionCursorResolvers<ContextType>;
  ExerciseGroup?: ExerciseGroupResolvers<ContextType>;
  ExerciseGroupRevision?: ExerciseGroupRevisionResolvers<ContextType>;
  ExerciseGroupRevisionConnection?: ExerciseGroupRevisionConnectionResolvers<ContextType>;
  ExerciseGroupRevisionCursor?: ExerciseGroupRevisionCursorResolvers<ContextType>;
  Exercise?: ExerciseResolvers<ContextType>;
  ExerciseRevision?: ExerciseRevisionResolvers<ContextType>;
  ExerciseRevisionConnection?: ExerciseRevisionConnectionResolvers<ContextType>;
  ExerciseRevisionCursor?: ExerciseRevisionCursorResolvers<ContextType>;
  GroupedExercise?: GroupedExerciseResolvers<ContextType>;
  GroupedExerciseRevision?: GroupedExerciseRevisionResolvers<ContextType>;
  GroupedExerciseRevisionConnection?: GroupedExerciseRevisionConnectionResolvers<ContextType>;
  GroupedExerciseRevisionCursor?: GroupedExerciseRevisionCursorResolvers<ContextType>;
  Page?: PageResolvers<ContextType>;
  PageRevision?: PageRevisionResolvers<ContextType>;
  PageRevisionConnection?: PageRevisionConnectionResolvers<ContextType>;
  PageRevisionCursor?: PageRevisionCursorResolvers<ContextType>;
  Solution?: SolutionResolvers<ContextType>;
  SolutionRevision?: SolutionRevisionResolvers<ContextType>;
  SolutionRevisionConnection?: SolutionRevisionConnectionResolvers<ContextType>;
  SolutionRevisionCursor?: SolutionRevisionCursorResolvers<ContextType>;
  TaxonomyTerm?: TaxonomyTermResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  UserConnection?: UserConnectionResolvers<ContextType>;
  UserEdge?: UserEdgeResolvers<ContextType>;
  Video?: VideoResolvers<ContextType>;
  VideoRevision?: VideoRevisionResolvers<ContextType>;
  VideoRevisionConnection?: VideoRevisionConnectionResolvers<ContextType>;
  VideoRevisionCursor?: VideoRevisionCursorResolvers<ContextType>;
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = Context> = Resolvers<ContextType>;
