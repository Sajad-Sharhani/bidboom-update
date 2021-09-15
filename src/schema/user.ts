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

export type CreateGoogleUserResponse = {
  __typename?: 'CreateGoogleUserResponse';
  name: Scalars['String'];
  email: Scalars['String'];
  image: Scalars['String'];
  _id: Scalars['ID'];
  token: Scalars['String'];
  type: UserType;
};

export type CreateUserInput = {
  name: Scalars['String'];
  userName?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  phoneNumber?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  identifierCode?: Maybe<Scalars['String']>;
  code: Scalars['String'];
};

export type Entries = {
  __typename?: 'Entries';
  messageid?: Maybe<Scalars['Int']>;
  message?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['Int']>;
  statustext?: Maybe<Scalars['String']>;
  sender?: Maybe<Scalars['String']>;
  receptor?: Maybe<Scalars['String']>;
  date?: Maybe<Scalars['Int']>;
  cost?: Maybe<Scalars['Int']>;
};

export enum Expertise {
  Cultural = 'CULTURAL',
  Nature = 'NATURE'
}

export type GoogleRedirectResponse = {
  __typename?: 'GoogleRedirectResponse';
  url: Scalars['String'];
};

export enum GuideType {
  Local = 'LOCAL',
  National = 'NATIONAL'
}

export type MakeAmbassadorInput = {
  _id: Scalars['ID'];
  nationalCode: Scalars['String'];
  instagram?: Maybe<Scalars['String']>;
  touristGuideCard: Scalars['String'];
  guideType: GuideType;
  expertise: Expertise;
};

export type MutateAmbassadorInput = {
  _id: Scalars['ID'];
  nationalCode?: Maybe<Scalars['String']>;
  instagram?: Maybe<Scalars['String']>;
  touristGuideCard?: Maybe<Scalars['String']>;
  guideType?: Maybe<GuideType>;
  expertise?: Maybe<Expertise>;
};

export type MutateUserInput = {
  _id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  userName?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  phoneNumber?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createUser: Response;
  makeAmbassador: Response;
  sendCode: SendCodeResponse;
  createGoogleUser: CreateGoogleUserResponse;
  mutateUser: Response;
  mutateAmbassador: Response;
};


export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


export type MutationMakeAmbassadorArgs = {
  input: MakeAmbassadorInput;
};


export type MutationSendCodeArgs = {
  input: SendCodeInput;
};


export type MutationCreateGoogleUserArgs = {
  input: Scalars['String'];
};


export type MutationMutateUserArgs = {
  input?: Maybe<MutateUserInput>;
};


export type MutationMutateAmbassadorArgs = {
  input?: Maybe<MutateAmbassadorInput>;
};

export type Query = {
  __typename?: 'Query';
  /** input is `redirect` url that google redirects to, with a string */
  getGoogleRedirect: GoogleRedirectResponse;
};


export type QueryGetGoogleRedirectArgs = {
  input?: Maybe<Scalars['String']>;
};

export type Response = {
  __typename?: 'Response';
  _id: Scalars['ID'];
  token: Scalars['String'];
  type: UserType;
};

export type SendCodeInput = {
  email?: Maybe<Scalars['String']>;
  phoneNumber?: Maybe<Scalars['String']>;
};

export type SendCodeResponse = {
  __typename?: 'SendCodeResponse';
  sms?: Maybe<SmsResponse>;
};

export type SmsResponse = {
  __typename?: 'SmsResponse';
  status: Scalars['Int'];
  message: Scalars['String'];
};

export type User = {
  _id: Scalars['ID'];
  name: Scalars['String'];
  userName?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  phoneNumber?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  usersOfIdentifierCode: Array<Maybe<Scalars['String']>>;
  identifierCode?: Maybe<Scalars['String']>;
  type: UserType;
  nationalCode?: Maybe<Scalars['String']>;
  instagram?: Maybe<Scalars['String']>;
  touristGuideCard?: Maybe<Scalars['String']>;
  guideType?: Maybe<GuideType>;
  expertise?: Maybe<Expertise>;
};

export enum UserType {
  Ambassador = 'Ambassador',
  User = 'User'
}



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
  CreateGoogleUserResponse: ResolverTypeWrapper<CreateGoogleUserResponse>;
  String: ResolverTypeWrapper<Scalars['String']>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  CreateUserInput: CreateUserInput;
  Entries: ResolverTypeWrapper<Entries>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Expertise: Expertise;
  GoogleRedirectResponse: ResolverTypeWrapper<GoogleRedirectResponse>;
  GuideType: GuideType;
  MakeAmbassadorInput: MakeAmbassadorInput;
  MutateAmbassadorInput: MutateAmbassadorInput;
  MutateUserInput: MutateUserInput;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  Response: ResolverTypeWrapper<Response>;
  SendCodeInput: SendCodeInput;
  SendCodeResponse: ResolverTypeWrapper<SendCodeResponse>;
  SmsResponse: ResolverTypeWrapper<SmsResponse>;
  User: never;
  UserType: UserType;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  CreateGoogleUserResponse: CreateGoogleUserResponse;
  String: Scalars['String'];
  ID: Scalars['ID'];
  CreateUserInput: CreateUserInput;
  Entries: Entries;
  Int: Scalars['Int'];
  GoogleRedirectResponse: GoogleRedirectResponse;
  MakeAmbassadorInput: MakeAmbassadorInput;
  MutateAmbassadorInput: MutateAmbassadorInput;
  MutateUserInput: MutateUserInput;
  Mutation: {};
  Query: {};
  Response: Response;
  SendCodeInput: SendCodeInput;
  SendCodeResponse: SendCodeResponse;
  SmsResponse: SmsResponse;
  User: never;
  Boolean: Scalars['Boolean'];
};

export type CreateGoogleUserResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['CreateGoogleUserResponse'] = ResolversParentTypes['CreateGoogleUserResponse']> = {
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  image?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['UserType'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type EntriesResolvers<ContextType = any, ParentType extends ResolversParentTypes['Entries'] = ResolversParentTypes['Entries']> = {
  messageid?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  statustext?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  sender?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  receptor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  date?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  cost?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GoogleRedirectResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['GoogleRedirectResponse'] = ResolversParentTypes['GoogleRedirectResponse']> = {
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createUser?: Resolver<ResolversTypes['Response'], ParentType, ContextType, RequireFields<MutationCreateUserArgs, 'input'>>;
  makeAmbassador?: Resolver<ResolversTypes['Response'], ParentType, ContextType, RequireFields<MutationMakeAmbassadorArgs, 'input'>>;
  sendCode?: Resolver<ResolversTypes['SendCodeResponse'], ParentType, ContextType, RequireFields<MutationSendCodeArgs, 'input'>>;
  createGoogleUser?: Resolver<ResolversTypes['CreateGoogleUserResponse'], ParentType, ContextType, RequireFields<MutationCreateGoogleUserArgs, 'input'>>;
  mutateUser?: Resolver<ResolversTypes['Response'], ParentType, ContextType, RequireFields<MutationMutateUserArgs, never>>;
  mutateAmbassador?: Resolver<ResolversTypes['Response'], ParentType, ContextType, RequireFields<MutationMutateAmbassadorArgs, never>>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  getGoogleRedirect?: Resolver<ResolversTypes['GoogleRedirectResponse'], ParentType, ContextType, RequireFields<QueryGetGoogleRedirectArgs, never>>;
};

export type ResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['Response'] = ResolversParentTypes['Response']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['UserType'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SendCodeResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['SendCodeResponse'] = ResolversParentTypes['SendCodeResponse']> = {
  sms?: Resolver<Maybe<ResolversTypes['SmsResponse']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SmsResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['SmsResponse'] = ResolversParentTypes['SmsResponse']> = {
  status?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  __resolveType: TypeResolveFn<null, ParentType, ContextType>;
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  userName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  phoneNumber?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  usersOfIdentifierCode?: Resolver<Array<Maybe<ResolversTypes['String']>>, ParentType, ContextType>;
  identifierCode?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  type?: Resolver<ResolversTypes['UserType'], ParentType, ContextType>;
  nationalCode?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  instagram?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  touristGuideCard?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  guideType?: Resolver<Maybe<ResolversTypes['GuideType']>, ParentType, ContextType>;
  expertise?: Resolver<Maybe<ResolversTypes['Expertise']>, ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  CreateGoogleUserResponse?: CreateGoogleUserResponseResolvers<ContextType>;
  Entries?: EntriesResolvers<ContextType>;
  GoogleRedirectResponse?: GoogleRedirectResponseResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Response?: ResponseResolvers<ContextType>;
  SendCodeResponse?: SendCodeResponseResolvers<ContextType>;
  SmsResponse?: SmsResponseResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
