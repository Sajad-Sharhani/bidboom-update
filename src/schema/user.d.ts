import { GraphQLResolveInfo } from "graphql";

export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type RequireFields<T, K extends keyof T> = {
  [X in Exclude<keyof T, K>]?: T[X];
} & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type CreateUserInput = {
  name: Scalars["String"];
  userName?: Maybe<Scalars["String"]>;
  email?: Maybe<Scalars["String"]>;
  phoneNumber?: Maybe<Scalars["String"]>;
  image?: Maybe<Scalars["String"]>;
  description?: Maybe<Scalars["String"]>;
  identifierCode?: Maybe<Scalars["String"]>;
  code: Scalars["String"];
};

export enum Expertise {
  Cultural = "CULTURAL",
  Nature = "NATURE",
}

export enum GuideType {
  Local = "LOCAL",
  National = "NATIONAL",
}

export type JoinUserInput = {
  email?: Maybe<Scalars["String"]>;
  phoneNumber?: Maybe<Scalars["String"]>;
  code: Scalars["String"];
};

export type Mutation = {
  __typename?: "Mutation";
  createUser: Response;
  joinUser: Response;
  sendCode: SendCodeResponse;
};

export type MutationCreateUserArgs = {
  input: CreateUserInput;
};

export type MutationJoinUserArgs = {
  input: JoinUserInput;
};

export type MutationSendCodeArgs = {
  input: SendCodeInput;
};

export type Response = {
  __typename?: "Response";
  token: Scalars["String"];
  type: UserType;
};

export type SendCodeInput = {
  email?: Maybe<Scalars["String"]>;
  phoneNumber?: Maybe<Scalars["String"]>;
};

export type SendCodeResponse = {
  __typename?: "SendCodeResponse";
  done: Scalars["Boolean"];
};

export type User = {
  _id: Scalars["ID"];
  name: Scalars["String"];
  userName?: Maybe<Scalars["String"]>;
  email?: Maybe<Scalars["String"]>;
  phoneNumber?: Maybe<Scalars["String"]>;
  image?: Maybe<Scalars["String"]>;
  description?: Maybe<Scalars["String"]>;
  usersOfIdentifierCode: Array<Maybe<Scalars["String"]>>;
  identifierCode?: Maybe<Scalars["String"]>;
  type: UserType;
  nationalCode?: Maybe<Scalars["String"]>;
  instagram?: Maybe<Scalars["String"]>;
  touristGuideCard?: Maybe<Scalars["String"]>;
  guideType?: Maybe<GuideType>;
  expertise?: Maybe<Expertise>;
};

export enum UserType {
  Ambassador = "Ambassador",
  User = "User",
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
export type StitchingResolver<TResult, TParent, TContext, TArgs> =
  | LegacyStitchingResolver<TResult, TParent, TContext, TArgs>
  | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
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

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> {
  subscribe: SubscriptionSubscribeFn<
    { [key in TKey]: TResult },
    TParent,
    TContext,
    TArgs
  >;
  resolve?: SubscriptionResolveFn<
    TResult,
    { [key in TKey]: TResult },
    TContext,
    TArgs
  >;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {}
> =
  | ((
      ...args: any[]
    ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo
) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {}
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  CreateUserInput: CreateUserInput;
  String: ResolverTypeWrapper<Scalars["String"]>;
  Expertise: Expertise;
  GuideType: GuideType;
  JoinUserInput: JoinUserInput;
  Mutation: ResolverTypeWrapper<{}>;
  Response: ResolverTypeWrapper<Response>;
  SendCodeInput: SendCodeInput;
  SendCodeResponse: ResolverTypeWrapper<SendCodeResponse>;
  Boolean: ResolverTypeWrapper<Scalars["Boolean"]>;
  User: never;
  ID: ResolverTypeWrapper<Scalars["ID"]>;
  UserType: UserType;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  CreateUserInput: CreateUserInput;
  String: Scalars["String"];
  JoinUserInput: JoinUserInput;
  Mutation: {};
  Response: Response;
  SendCodeInput: SendCodeInput;
  SendCodeResponse: SendCodeResponse;
  Boolean: Scalars["Boolean"];
  User: never;
  ID: Scalars["ID"];
};

export type MutationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Mutation"] = ResolversParentTypes["Mutation"]
> = {
  createUser?: Resolver<
    ResolversTypes["Response"],
    ParentType,
    ContextType,
    RequireFields<MutationCreateUserArgs, "input">
  >;
  joinUser?: Resolver<
    ResolversTypes["Response"],
    ParentType,
    ContextType,
    RequireFields<MutationJoinUserArgs, "input">
  >;
  sendCode?: Resolver<
    ResolversTypes["SendCodeResponse"],
    ParentType,
    ContextType,
    RequireFields<MutationSendCodeArgs, "input">
  >;
};

export type ResponseResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Response"] = ResolversParentTypes["Response"]
> = {
  token?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  type?: Resolver<ResolversTypes["UserType"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SendCodeResponseResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["SendCodeResponse"] = ResolversParentTypes["SendCodeResponse"]
> = {
  done?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["User"] = ResolversParentTypes["User"]
> = {
  __resolveType: TypeResolveFn<null, ParentType, ContextType>;
  _id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  userName?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  phoneNumber?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  image?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  description?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  usersOfIdentifierCode?: Resolver<
    Array<Maybe<ResolversTypes["String"]>>,
    ParentType,
    ContextType
  >;
  identifierCode?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  type?: Resolver<ResolversTypes["UserType"], ParentType, ContextType>;
  nationalCode?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  instagram?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  touristGuideCard?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  guideType?: Resolver<
    Maybe<ResolversTypes["GuideType"]>,
    ParentType,
    ContextType
  >;
  expertise?: Resolver<
    Maybe<ResolversTypes["Expertise"]>,
    ParentType,
    ContextType
  >;
};

export type Resolvers<ContextType = any> = {
  Mutation?: MutationResolvers<ContextType>;
  Response?: ResponseResolvers<ContextType>;
  SendCodeResponse?: SendCodeResponseResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
};

/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
