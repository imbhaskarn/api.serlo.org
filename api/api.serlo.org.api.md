## API Report File for "@serlo/api.serlo.org"

> Do not edit this file. It is a report generated by [API Extractor](https://api-extractor.com/).

```ts

// @public
export type AbstractEntity = {
    date: Scalars['DateTime'];
    instance: Instance;
    alias?: Maybe<Scalars['String']>;
    license: License;
};

// @public
export type AbstractEntityRevision = {
    author: User;
    date: Scalars['DateTime'];
};

// @public (undocumented)
export type AbstractUuid = {
    id: Scalars['Int'];
    trashed: Scalars['Boolean'];
};

// @public (undocumented)
export type AliasInput = {
    instance: Instance;
    path: Scalars['String'];
};

// @public (undocumented)
export type Applet = AbstractUuid & AbstractEntity & {
    __typename?: 'Applet';
    id: Scalars['Int'];
    trashed: Scalars['Boolean'];
    instance: Instance;
    alias?: Maybe<Scalars['String']>;
    date: Scalars['DateTime'];
    license: License;
    currentRevision?: Maybe<AppletRevision>;
    taxonomyTerms: Array<TaxonomyTerm>;
};

// @public (undocumented)
export type AppletRevision = AbstractUuid & AbstractEntityRevision & {
    __typename?: 'AppletRevision';
    id: Scalars['Int'];
    author: User;
    trashed: Scalars['Boolean'];
    date: Scalars['DateTime'];
    applet: Applet;
    url: Scalars['String'];
    title: Scalars['String'];
    content: Scalars['String'];
    changes: Scalars['String'];
    metaTitle: Scalars['String'];
    metaDescription: Scalars['String'];
};

// @public (undocumented)
export type Article = AbstractUuid & AbstractEntity & {
    __typename?: 'Article';
    id: Scalars['Int'];
    trashed: Scalars['Boolean'];
    instance: Instance;
    alias?: Maybe<Scalars['String']>;
    date: Scalars['DateTime'];
    license: License;
    currentRevision?: Maybe<ArticleRevision>;
    taxonomyTerms: Array<TaxonomyTerm>;
};

// @public (undocumented)
export type ArticleRevision = AbstractUuid & AbstractEntityRevision & {
    __typename?: 'ArticleRevision';
    id: Scalars['Int'];
    author: User;
    trashed: Scalars['Boolean'];
    date: Scalars['DateTime'];
    article: Article;
    title: Scalars['String'];
    content: Scalars['String'];
    changes: Scalars['String'];
    metaTitle: Scalars['String'];
    metaDescription: Scalars['String'];
};

// @public (undocumented)
export type Course = AbstractUuid & AbstractEntity & {
    __typename?: 'Course';
    id: Scalars['Int'];
    trashed: Scalars['Boolean'];
    instance: Instance;
    alias?: Maybe<Scalars['String']>;
    date: Scalars['DateTime'];
    license: License;
    currentRevision?: Maybe<CourseRevision>;
    taxonomyTerms: Array<TaxonomyTerm>;
    pages: Array<CoursePage>;
};

// @public (undocumented)
export type CoursePage = AbstractUuid & AbstractEntity & {
    __typename?: 'CoursePage';
    id: Scalars['Int'];
    trashed: Scalars['Boolean'];
    instance: Instance;
    alias?: Maybe<Scalars['String']>;
    date: Scalars['DateTime'];
    license: License;
    currentRevision?: Maybe<CoursePageRevision>;
    course: Course;
};

// @public (undocumented)
export type CoursePageRevision = AbstractUuid & AbstractEntityRevision & {
    __typename?: 'CoursePageRevision';
    id: Scalars['Int'];
    author: User;
    trashed: Scalars['Boolean'];
    date: Scalars['DateTime'];
    coursePage: CoursePage;
    title: Scalars['String'];
    content: Scalars['String'];
    changes: Scalars['String'];
};

// @public (undocumented)
export type CourseRevision = AbstractUuid & AbstractEntityRevision & {
    __typename?: 'CourseRevision';
    id: Scalars['Int'];
    author: User;
    trashed: Scalars['Boolean'];
    date: Scalars['DateTime'];
    course: Course;
    title: Scalars['String'];
    content: Scalars['String'];
    changes: Scalars['String'];
    metaDescription: Scalars['String'];
};

// @public (undocumented)
export type Event = AbstractUuid & AbstractEntity & {
    __typename?: 'Event';
    id: Scalars['Int'];
    trashed: Scalars['Boolean'];
    instance: Instance;
    alias?: Maybe<Scalars['String']>;
    date: Scalars['DateTime'];
    license: License;
    currentRevision?: Maybe<EventRevision>;
    taxonomyTerms: Array<TaxonomyTerm>;
};

// @public (undocumented)
export type EventRevision = AbstractUuid & AbstractEntityRevision & {
    __typename?: 'EventRevision';
    id: Scalars['Int'];
    author: User;
    trashed: Scalars['Boolean'];
    date: Scalars['DateTime'];
    event: Event;
    title: Scalars['String'];
    content: Scalars['String'];
    changes: Scalars['String'];
    metaTitle: Scalars['String'];
    metaDescription: Scalars['String'];
};

// @public (undocumented)
export type Exact<T extends {
    [key: string]: any;
}> = {
    [K in keyof T]: T[K];
};

// @public (undocumented)
export type Exercise = AbstractUuid & AbstractEntity & {
    __typename?: 'Exercise';
    id: Scalars['Int'];
    trashed: Scalars['Boolean'];
    instance: Instance;
    alias?: Maybe<Scalars['String']>;
    date: Scalars['DateTime'];
    license: License;
    currentRevision?: Maybe<ExerciseRevision>;
    taxonomyTerms: Array<TaxonomyTerm>;
    solution?: Maybe<Solution>;
};

// @public (undocumented)
export type ExerciseGroup = AbstractUuid & AbstractEntity & {
    __typename?: 'ExerciseGroup';
    id: Scalars['Int'];
    trashed: Scalars['Boolean'];
    instance: Instance;
    alias?: Maybe<Scalars['String']>;
    date: Scalars['DateTime'];
    license: License;
    currentRevision?: Maybe<ExerciseGroupRevision>;
    taxonomyTerms: Array<TaxonomyTerm>;
    exercises: Array<GroupedExercise>;
};

// @public (undocumented)
export type ExerciseGroupRevision = AbstractUuid & AbstractEntityRevision & {
    __typename?: 'ExerciseGroupRevision';
    id: Scalars['Int'];
    author: User;
    trashed: Scalars['Boolean'];
    date: Scalars['DateTime'];
    exerciseGroup: ExerciseGroup;
    content: Scalars['String'];
    changes: Scalars['String'];
};

// @public (undocumented)
export type ExerciseRevision = AbstractUuid & AbstractEntityRevision & {
    __typename?: 'ExerciseRevision';
    id: Scalars['Int'];
    author: User;
    trashed: Scalars['Boolean'];
    date: Scalars['DateTime'];
    exercise: Exercise;
    content: Scalars['String'];
    changes: Scalars['String'];
};

// @public (undocumented)
export type GroupedExercise = AbstractUuid & AbstractEntity & {
    __typename?: 'GroupedExercise';
    id: Scalars['Int'];
    trashed: Scalars['Boolean'];
    instance: Instance;
    alias?: Maybe<Scalars['String']>;
    date: Scalars['DateTime'];
    license: License;
    currentRevision?: Maybe<GroupedExerciseRevision>;
    solution?: Maybe<Solution>;
    exerciseGroup: ExerciseGroup;
};

// @public (undocumented)
export type GroupedExerciseRevision = AbstractUuid & AbstractEntityRevision & {
    __typename?: 'GroupedExerciseRevision';
    id: Scalars['Int'];
    author: User;
    trashed: Scalars['Boolean'];
    date: Scalars['DateTime'];
    groupedExercise: GroupedExercise;
    content: Scalars['String'];
    changes: Scalars['String'];
};

// @public (undocumented)
export enum Instance {
    // (undocumented)
    De = "de",
    // (undocumented)
    En = "en",
    // (undocumented)
    Es = "es",
    // (undocumented)
    Fr = "fr",
    // (undocumented)
    Hi = "hi",
    // (undocumented)
    Ta = "ta"
}

// @public (undocumented)
export type License = {
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

// @public (undocumented)
export type Maybe<T> = T | null;

// @public (undocumented)
export type Mutation = {
    __typename?: 'Mutation';
    _removeCache?: Maybe<Scalars['Boolean']>;
    _setCache?: Maybe<Scalars['Boolean']>;
    setNotificationState?: Maybe<Scalars['Boolean']>;
};

// @public (undocumented)
export type Mutation_RemoveCacheArgs = {
    key: Scalars['String'];
};

// @public (undocumented)
export type Mutation_SetCacheArgs = {
    key: Scalars['String'];
    value: Scalars['JSON'];
};

// @public (undocumented)
export type MutationSetNotificationStateArgs = {
    id: Scalars['Int'];
    unread: Scalars['Boolean'];
};

// @public (undocumented)
export type Navigation = {
    __typename?: 'Navigation';
    data: Scalars['JSON'];
    path: Array<NavigationNode>;
};

// @public (undocumented)
export type NavigationNode = {
    __typename?: 'NavigationNode';
    label: Scalars['String'];
    url?: Maybe<Scalars['String']>;
    id?: Maybe<Scalars['Int']>;
};

// @public (undocumented)
export type Notification = {
    __typename?: 'Notification';
    id: Scalars['Int'];
    unread: Scalars['Boolean'];
    event: NotificationEvent;
};

// @public (undocumented)
export type NotificationCursor = {
    __typename?: 'NotificationCursor';
    cursor: Scalars['String'];
    node: Notification;
};

// @public (undocumented)
export type NotificationEvent = {
    __typename?: 'NotificationEvent';
    id: Scalars['Int'];
    type: Scalars['String'];
    instance: Instance;
    date: Scalars['DateTime'];
    actor: User;
    object: AbstractUuid;
    payload: Scalars['String'];
};

// @public
export type Page = AbstractUuid & {
    __typename?: 'Page';
    id: Scalars['Int'];
    trashed: Scalars['Boolean'];
    instance: Instance;
    alias?: Maybe<Scalars['String']>;
    license: License;
    currentRevision?: Maybe<PageRevision>;
    navigation?: Maybe<Navigation>;
};

// @public (undocumented)
export type PageInfo = {
    __typename?: 'PageInfo';
    hasNextPage: Scalars['Boolean'];
    hasPreviousPage: Scalars['Boolean'];
    startCursor?: Maybe<Scalars['String']>;
    endCursor?: Maybe<Scalars['String']>;
};

// @public
export type PageRevision = AbstractUuid & {
    __typename?: 'PageRevision';
    id: Scalars['Int'];
    author: User;
    trashed: Scalars['Boolean'];
    date: Scalars['DateTime'];
    title: Scalars['String'];
    content: Scalars['String'];
    page: Page;
};

// @public (undocumented)
export type Query = {
    __typename?: 'Query';
    activeDonors: Array<User>;
    license?: Maybe<License>;
    notifications: QueryNotificationsResult;
    uuid?: Maybe<AbstractUuid>;
};

// @public (undocumented)
export type QueryLicenseArgs = {
    id: Scalars['Int'];
};

// @public (undocumented)
export type QueryNotificationsArgs = {
    after?: Maybe<Scalars['String']>;
    before?: Maybe<Scalars['String']>;
    first?: Maybe<Scalars['Int']>;
    last?: Maybe<Scalars['Int']>;
    unread?: Maybe<Scalars['Boolean']>;
};

// @public (undocumented)
export type QueryNotificationsResult = {
    __typename?: 'QueryNotificationsResult';
    edges: Array<NotificationCursor>;
    nodes: Array<Notification>;
    totalCount: Scalars['Int'];
    pageInfo: PageInfo;
};

// @public (undocumented)
export type QueryUuidArgs = {
    alias?: Maybe<AliasInput>;
    id?: Maybe<Scalars['Int']>;
};

// @public
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

// @public (undocumented)
export type Solution = AbstractUuid & AbstractEntity & {
    __typename?: 'Solution';
    id: Scalars['Int'];
    trashed: Scalars['Boolean'];
    instance: Instance;
    alias?: Maybe<Scalars['String']>;
    date: Scalars['DateTime'];
    license: License;
    currentRevision?: Maybe<SolutionRevision>;
    exercise: Exercise;
};

// @public (undocumented)
export type SolutionRevision = AbstractUuid & AbstractEntityRevision & {
    __typename?: 'SolutionRevision';
    id: Scalars['Int'];
    author: User;
    trashed: Scalars['Boolean'];
    date: Scalars['DateTime'];
    solution: Solution;
    content: Scalars['String'];
    changes: Scalars['String'];
};

// @public (undocumented)
export type TaxonomyTerm = AbstractUuid & {
    __typename?: 'TaxonomyTerm';
    id: Scalars['Int'];
    trashed: Scalars['Boolean'];
    type: TaxonomyTermType;
    instance: Instance;
    alias?: Maybe<Scalars['String']>;
    name: Scalars['String'];
    description?: Maybe<Scalars['String']>;
    weight: Scalars['Int'];
    parent?: Maybe<TaxonomyTerm>;
    children: Array<AbstractUuid>;
    navigation?: Maybe<Navigation>;
};

// @public (undocumented)
export enum TaxonomyTermType {
    // (undocumented)
    Blog = "blog",
    // (undocumented)
    Curriculum = "curriculum",
    // (undocumented)
    CurriculumTopic = "curriculumTopic",
    // (undocumented)
    CurriculumTopicFolder = "curriculumTopicFolder",
    // (undocumented)
    Forum = "forum",
    // (undocumented)
    ForumCategory = "forumCategory",
    // (undocumented)
    Locale = "locale",
    // (undocumented)
    Root = "root",
    // (undocumented)
    Subject = "subject",
    // (undocumented)
    Topic = "topic",
    // (undocumented)
    TopicFolder = "topicFolder"
}

// @public (undocumented)
export type User = AbstractUuid & {
    __typename?: 'User';
    id: Scalars['Int'];
    trashed: Scalars['Boolean'];
    username: Scalars['String'];
    date: Scalars['DateTime'];
    lastLogin?: Maybe<Scalars['DateTime']>;
    description?: Maybe<Scalars['String']>;
    activeDonor: Scalars['Boolean'];
};

// @public (undocumented)
export type Video = AbstractUuid & AbstractEntity & {
    __typename?: 'Video';
    id: Scalars['Int'];
    trashed: Scalars['Boolean'];
    instance: Instance;
    alias?: Maybe<Scalars['String']>;
    date: Scalars['DateTime'];
    license: License;
    currentRevision?: Maybe<VideoRevision>;
    taxonomyTerms: Array<TaxonomyTerm>;
};

// @public (undocumented)
export type VideoRevision = AbstractUuid & AbstractEntityRevision & {
    __typename?: 'VideoRevision';
    id: Scalars['Int'];
    author: User;
    trashed: Scalars['Boolean'];
    date: Scalars['DateTime'];
    video: Video;
    url: Scalars['String'];
    title: Scalars['String'];
    content: Scalars['String'];
    changes: Scalars['String'];
};


// (No @packageDocumentation comment for this package)

```