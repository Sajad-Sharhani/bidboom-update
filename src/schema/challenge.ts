import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Challenge = {
  subject?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  answers?: Maybe<Array<Scalars['String']>>;
  correct?: Maybe<Scalars['Int']>;
  sponsors?: Maybe<Array<Maybe<Sponsor>>>;
  isActive?: Maybe<Scalars['Boolean']>;
  media?: Maybe<Array<Maybe<Files_Challenge>>>;
  winnersNumber?: Maybe<Scalars['Int']>;
  loosersNumber?: Maybe<Scalars['Int']>;
};

export type ChallengeType = {
  subject?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  answers?: Maybe<Array<Scalars['String']>>;
  correct?: Maybe<Scalars['Int']>;
  sponsors?: Maybe<Array<Maybe<Sponsor>>>;
  isActive?: Maybe<Scalars['Boolean']>;
  media?: Maybe<Array<Maybe<Files_Challenge>>>;
  winnersNumber?: Maybe<Scalars['Int']>;
  loosersNumber?: Maybe<Scalars['Int']>;
};

export type Challenger = {
  correct?: Maybe<Scalars['Boolean']>;
  answer?: Maybe<Scalars['Int']>;
  challenger?: Maybe<Scalars['ID']>;
  challenge?: Maybe<Scalars['ID']>;
};

export type CreateChallengeInput = {
  subject?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  answers?: Maybe<Array<Scalars['String']>>;
  correct?: Maybe<Scalars['Int']>;
  sponsors?: Maybe<Array<Maybe<SponsorInput>>>;
  media?: Maybe<Array<Maybe<Files_ChallengeInput>>>;
};

export type File_Challenge = {
  name: Scalars['String'];
  src: Scalars['String'];
};

export type File_ChallengeInput = {
  name: Scalars['String'];
  src: Scalars['String'];
};

export type Files_Challenge = {
  files: Array<Maybe<File_Challenge>>;
};

export type Files_ChallengeInput = {
  files: Array<Maybe<File_ChallengeInput>>;
};

export type GetChallengeType = {
  subject?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  answers?: Maybe<Array<Scalars['String']>>;
  sponsors?: Maybe<Array<Maybe<Sponsor>>>;
  isActive?: Maybe<Scalars['Boolean']>;
  media?: Maybe<Array<Maybe<Files_Challenge>>>;
  winnersNumber?: Maybe<Scalars['Int']>;
  loosersNumber?: Maybe<Scalars['Int']>;
};

export type GetChallengersSuperAdmin = {
  winners?: Maybe<Array<Maybe<Challenger>>>;
  loosers?: Maybe<Array<Maybe<Challenger>>>;
};

export type GetChallengersSuperAdminInput = {
  challenge: Scalars['ID'];
  pageNum: Scalars['Int'];
  pageSize: Scalars['Int'];
};

export type IsAnswerRight = {
  correct?: Maybe<Scalars['Boolean']>;
};

export type Mutation = {
  createChallenge: GetChallengeType;
  disableChallenge: GetChallengeType;
  deleteChallenge: GetChallengeType;
  sendAnswer: IsAnswerRight;
};


export type MutationCreateChallengeArgs = {
  input: CreateChallengeInput;
};


export type MutationDisableChallengeArgs = {
  input: Scalars['ID'];
};


export type MutationDeleteChallengeArgs = {
  input: Scalars['ID'];
};


export type MutationSendAnswerArgs = {
  input?: Maybe<Scalars['Int']>;
};

export type Query = {
  getChallenge: GetChallengeType;
  getChallengesSuperAdmin: Array<Maybe<GetChallengeType>>;
  getChallengersSuperAdmin: GetChallengersSuperAdmin;
};


export type QueryGetChallengersSuperAdminArgs = {
  input: GetChallengersSuperAdminInput;
};

export type Sponsor = {
  image?: Maybe<Scalars['String']>;
  src?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type SponsorInput = {
  image?: Maybe<Scalars['String']>;
  src?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

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
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>
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
  Challenge: never;
  String: ResolverTypeWrapper<Scalars['String']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  ChallengeType: ResolverTypeWrapper<ChallengeType>;
  Challenger: ResolverTypeWrapper<Challenger>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  CreateChallengeInput: CreateChallengeInput;
  File_challenge: ResolverTypeWrapper<File_Challenge>;
  File_challengeInput: File_ChallengeInput;
  Files_challenge: ResolverTypeWrapper<Files_Challenge>;
  Files_challengeInput: Files_ChallengeInput;
  GetChallengeType: ResolverTypeWrapper<GetChallengeType>;
  GetChallengersSuperAdmin: ResolverTypeWrapper<GetChallengersSuperAdmin>;
  GetChallengersSuperAdminInput: GetChallengersSuperAdminInput;
  IsAnswerRight: ResolverTypeWrapper<IsAnswerRight>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  Sponsor: ResolverTypeWrapper<Sponsor>;
  SponsorInput: SponsorInput;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Challenge: never;
  String: Scalars['String'];
  Int: Scalars['Int'];
  Boolean: Scalars['Boolean'];
  ChallengeType: ChallengeType;
  Challenger: Challenger;
  ID: Scalars['ID'];
  CreateChallengeInput: CreateChallengeInput;
  File_challenge: File_Challenge;
  File_challengeInput: File_ChallengeInput;
  Files_challenge: Files_Challenge;
  Files_challengeInput: Files_ChallengeInput;
  GetChallengeType: GetChallengeType;
  GetChallengersSuperAdmin: GetChallengersSuperAdmin;
  GetChallengersSuperAdminInput: GetChallengersSuperAdminInput;
  IsAnswerRight: IsAnswerRight;
  Mutation: {};
  Query: {};
  Sponsor: Sponsor;
  SponsorInput: SponsorInput;
};

export type ChallengeResolvers<ContextType = any, ParentType extends ResolversParentTypes['Challenge'] = ResolversParentTypes['Challenge']> = {
  __resolveType: TypeResolveFn<null, ParentType, ContextType>;
  subject?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  answers?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  correct?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  sponsors?: Resolver<Maybe<Array<Maybe<ResolversTypes['Sponsor']>>>, ParentType, ContextType>;
  isActive?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  media?: Resolver<Maybe<Array<Maybe<ResolversTypes['Files_challenge']>>>, ParentType, ContextType>;
  winnersNumber?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  loosersNumber?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
};

export type ChallengeTypeResolvers<ContextType = any, ParentType extends ResolversParentTypes['ChallengeType'] = ResolversParentTypes['ChallengeType']> = {
  subject?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  answers?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  correct?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  sponsors?: Resolver<Maybe<Array<Maybe<ResolversTypes['Sponsor']>>>, ParentType, ContextType>;
  isActive?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  media?: Resolver<Maybe<Array<Maybe<ResolversTypes['Files_challenge']>>>, ParentType, ContextType>;
  winnersNumber?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  loosersNumber?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ChallengerResolvers<ContextType = any, ParentType extends ResolversParentTypes['Challenger'] = ResolversParentTypes['Challenger']> = {
  correct?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  answer?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  challenger?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  challenge?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type File_ChallengeResolvers<ContextType = any, ParentType extends ResolversParentTypes['File_challenge'] = ResolversParentTypes['File_challenge']> = {
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  src?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Files_ChallengeResolvers<ContextType = any, ParentType extends ResolversParentTypes['Files_challenge'] = ResolversParentTypes['Files_challenge']> = {
  files?: Resolver<Array<Maybe<ResolversTypes['File_challenge']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GetChallengeTypeResolvers<ContextType = any, ParentType extends ResolversParentTypes['GetChallengeType'] = ResolversParentTypes['GetChallengeType']> = {
  subject?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  answers?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  sponsors?: Resolver<Maybe<Array<Maybe<ResolversTypes['Sponsor']>>>, ParentType, ContextType>;
  isActive?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  media?: Resolver<Maybe<Array<Maybe<ResolversTypes['Files_challenge']>>>, ParentType, ContextType>;
  winnersNumber?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  loosersNumber?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GetChallengersSuperAdminResolvers<ContextType = any, ParentType extends ResolversParentTypes['GetChallengersSuperAdmin'] = ResolversParentTypes['GetChallengersSuperAdmin']> = {
  winners?: Resolver<Maybe<Array<Maybe<ResolversTypes['Challenger']>>>, ParentType, ContextType>;
  loosers?: Resolver<Maybe<Array<Maybe<ResolversTypes['Challenger']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type IsAnswerRightResolvers<ContextType = any, ParentType extends ResolversParentTypes['IsAnswerRight'] = ResolversParentTypes['IsAnswerRight']> = {
  correct?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createChallenge?: Resolver<ResolversTypes['GetChallengeType'], ParentType, ContextType, RequireFields<MutationCreateChallengeArgs, 'input'>>;
  disableChallenge?: Resolver<ResolversTypes['GetChallengeType'], ParentType, ContextType, RequireFields<MutationDisableChallengeArgs, 'input'>>;
  deleteChallenge?: Resolver<ResolversTypes['GetChallengeType'], ParentType, ContextType, RequireFields<MutationDeleteChallengeArgs, 'input'>>;
  sendAnswer?: Resolver<ResolversTypes['IsAnswerRight'], ParentType, ContextType, RequireFields<MutationSendAnswerArgs, never>>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  getChallenge?: Resolver<ResolversTypes['GetChallengeType'], ParentType, ContextType>;
  getChallengesSuperAdmin?: Resolver<Array<Maybe<ResolversTypes['GetChallengeType']>>, ParentType, ContextType>;
  getChallengersSuperAdmin?: Resolver<ResolversTypes['GetChallengersSuperAdmin'], ParentType, ContextType, RequireFields<QueryGetChallengersSuperAdminArgs, 'input'>>;
};

export type SponsorResolvers<ContextType = any, ParentType extends ResolversParentTypes['Sponsor'] = ResolversParentTypes['Sponsor']> = {
  image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  src?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Challenge?: ChallengeResolvers<ContextType>;
  ChallengeType?: ChallengeTypeResolvers<ContextType>;
  Challenger?: ChallengerResolvers<ContextType>;
  File_challenge?: File_ChallengeResolvers<ContextType>;
  Files_challenge?: Files_ChallengeResolvers<ContextType>;
  GetChallengeType?: GetChallengeTypeResolvers<ContextType>;
  GetChallengersSuperAdmin?: GetChallengersSuperAdminResolvers<ContextType>;
  IsAnswerRight?: IsAnswerRightResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Sponsor?: SponsorResolvers<ContextType>;
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
