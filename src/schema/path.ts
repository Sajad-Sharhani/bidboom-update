import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
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
  Long: any;
};

export type Comment = {
  author?: Maybe<Scalars['ID']>;
  description: Scalars['String'];
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
};

export type CommentPathInput = {
  path: Scalars['ID'];
  description: Scalars['String'];
};

export type CommentPathResponse = {
  path: Scalars['ID'];
  author?: Maybe<Scalars['String']>;
  description: Scalars['String'];
  id: Scalars['ID'];
  userName?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
};

export type CreatePathInput = {
  origin: Scalars['String'];
  destination: Scalars['String'];
  originPoint?: Maybe<Scalars['String']>;
  destinationPoint?: Maybe<Scalars['String']>;
  title: Scalars['String'];
  bestTime: Array<Scalars['Int']>;
  dangerRate: Scalars['Int'];
  suitableCar?: Maybe<Array<SuitableCar>>;
  interestingPlaces: Scalars['Int'];
  placeMap: Scalars['String'];
  suitablePeople?: Maybe<Array<SuitablePeople>>;
  facilities?: Maybe<Array<Facilities>>;
  media: Files_PathInput;
  places: Array<Maybe<PlaceInput>>;
};

export type CreatePathResponse = {
  _id: Scalars['ID'];
};

export type DeletePathResponse = {
  done: Scalars['Boolean'];
};

export enum Facilities {
  Market = 'Market',
  Restaurant = 'Restaurant',
  Park = 'Park',
  GasStation = 'GasStation',
  Mosque = 'Mosque',
  Hospital = 'Hospital',
  Residence = 'Residence',
  Checkpoint = 'Checkpoint'
}

export type File_Path = {
  name: Scalars['String'];
  src: Scalars['String'];
};

export type File_PathInput = {
  name: Scalars['String'];
  src: Scalars['String'];
};

export type Files_Path = {
  files: Array<Maybe<File_Path>>;
};

export type Files_PathInput = {
  files: Array<Maybe<File_PathInput>>;
};

export type Locality = {
  id: Scalars['String'];
  name: Scalars['String'];
  latitude?: Maybe<Scalars['Long']>;
  longitude?: Maybe<Scalars['Long']>;
  province?: Maybe<Scalars['Int']>;
};


export type MutatePathInput = {
  _id: Scalars['ID'];
  origin: Scalars['String'];
  destination: Scalars['String'];
  originPoint?: Maybe<Scalars['String']>;
  destinationPoint?: Maybe<Scalars['String']>;
  title: Scalars['String'];
  bestTime: Array<Scalars['Int']>;
  dangerRate: Scalars['Int'];
  suitableCar?: Maybe<Array<SuitableCar>>;
  interestingPlaces: Scalars['Int'];
  placeMap: Scalars['String'];
  suitablePeople?: Maybe<Array<SuitablePeople>>;
  facilities?: Maybe<Array<Facilities>>;
  media: Files_PathInput;
  places: Array<Maybe<PlaceInput>>;
};

export type Mutation = {
  createPath: CreatePathResponse;
  mutatePath: CreatePathResponse;
  deletePath: DeletePathResponse;
  likePath: PathType;
  dislikePath: PathType;
  commentPath: CommentPathResponse;
  removeCommentPath: PathType;
  archivePath: PathType;
  restorePath: PathType;
};


export type MutationCreatePathArgs = {
  input: CreatePathInput;
};


export type MutationMutatePathArgs = {
  input: MutatePathInput;
};


export type MutationDeletePathArgs = {
  input: Scalars['ID'];
};


export type MutationLikePathArgs = {
  input: Scalars['ID'];
};


export type MutationDislikePathArgs = {
  input: Scalars['ID'];
};


export type MutationCommentPathArgs = {
  input: CommentPathInput;
};


export type MutationRemoveCommentPathArgs = {
  input: RemoveCommentPath;
};


export type MutationArchivePathArgs = {
  input: Scalars['ID'];
};


export type MutationRestorePathArgs = {
  input: Scalars['ID'];
};

export type Path = {
  _id: Scalars['ID'];
  maker: Scalars['ID'];
  originPoint?: Maybe<Scalars['String']>;
  destinationPoint?: Maybe<Scalars['String']>;
  origin: Scalars['String'];
  destination: Scalars['String'];
  title: Scalars['String'];
  bestTime: Array<Scalars['Int']>;
  dangerRate: Scalars['Int'];
  suitableCar?: Maybe<Array<SuitableCar>>;
  interestingPlaces: Scalars['Int'];
  placeMap: Scalars['String'];
  suitablePeople?: Maybe<Array<SuitablePeople>>;
  facilities?: Maybe<Array<Facilities>>;
  media: Files_Path;
  places: Array<Maybe<Place>>;
  comments: Array<Maybe<Comment>>;
  likes: Array<Maybe<Scalars['String']>>;
  views: Array<Maybe<Scalars['ID']>>;
};

export type PathType = {
  _id: Scalars['ID'];
  maker: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
  originPoint?: Maybe<Scalars['String']>;
  destinationPoint?: Maybe<Scalars['String']>;
  origin?: Maybe<Scalars['String']>;
  destination?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  bestTime?: Maybe<Array<Scalars['Int']>>;
  dangerRate?: Maybe<Scalars['Int']>;
  suitableCar?: Maybe<Array<SuitableCar>>;
  interestingPlaces?: Maybe<Scalars['Int']>;
  suitablePeople?: Maybe<Array<SuitablePeople>>;
  facilities?: Maybe<Array<Facilities>>;
  media?: Maybe<Files_Path>;
  places?: Maybe<Array<Maybe<Place>>>;
  commentsNumber?: Maybe<Scalars['Int']>;
  views?: Maybe<Scalars['Int']>;
  archived?: Maybe<Scalars['Boolean']>;
  liked?: Maybe<Scalars['Boolean']>;
  likesNumber?: Maybe<Scalars['Int']>;
};

export type Place = {
  title?: Maybe<Scalars['String']>;
  kind?: Maybe<PlaceKind>;
  description?: Maybe<Scalars['String']>;
  map?: Maybe<Scalars['String']>;
  record?: Maybe<PlaceRecord>;
  media?: Maybe<Files_Path>;
};

export type PlaceInput = {
  title?: Maybe<Scalars['String']>;
  kind?: Maybe<PlaceKind>;
  description?: Maybe<Scalars['String']>;
  map?: Maybe<Scalars['String']>;
  record?: Maybe<PlaceRecord>;
  media?: Maybe<Files_PathInput>;
};

export enum PlaceKind {
  Cultural = 'CULTURAL',
  Nature = 'NATURE'
}

export enum PlaceRecord {
  National = 'National',
  International = 'International',
  None = 'None'
}

export type Query = {
  getPath: PathType;
  getPaths: Array<PathType>;
  getComments?: Maybe<Array<Maybe<Comment>>>;
  getCity: Array<Locality>;
  getProvince: Array<Locality>;
  getCountry: Array<Locality>;
  getPopularPaths: Array<PathType>;
  searchPath: Array<Maybe<PathType>>;
};


export type QueryGetPathArgs = {
  input: Scalars['ID'];
};


export type QueryGetPathsArgs = {
  input: Scalars['ID'];
};


export type QueryGetCommentsArgs = {
  input: Scalars['ID'];
};


export type QuerySearchPathArgs = {
  input?: Maybe<SearchPathInput>;
};

export type RemoveCommentPath = {
  path: Scalars['ID'];
  id: Scalars['ID'];
};

export type SearchPathInput = {
  originPoint?: Maybe<Scalars['String']>;
  destinationPoint?: Maybe<Scalars['String']>;
  origin?: Maybe<Scalars['String']>;
  destination?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  pageSize: Scalars['Int'];
  pageNum: Scalars['Int'];
};

export enum SuitableCar {
  RidingCar = 'RidingCar',
  Motorcycle = 'Motorcycle',
  Offroad = 'Offroad',
  Bike = 'Bike'
}

export enum SuitablePeople {
  Blind = 'Blind',
  Deaf = 'Deaf',
  Wheelchairs = 'Wheelchairs'
}



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
  Comment: ResolverTypeWrapper<Comment>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  String: ResolverTypeWrapper<Scalars['String']>;
  CommentPathInput: CommentPathInput;
  CommentPathResponse: ResolverTypeWrapper<CommentPathResponse>;
  CreatePathInput: CreatePathInput;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  CreatePathResponse: ResolverTypeWrapper<CreatePathResponse>;
  DeletePathResponse: ResolverTypeWrapper<DeletePathResponse>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Facilities: Facilities;
  File_path: ResolverTypeWrapper<File_Path>;
  File_pathInput: File_PathInput;
  Files_path: ResolverTypeWrapper<Files_Path>;
  Files_pathInput: Files_PathInput;
  Locality: ResolverTypeWrapper<Locality>;
  Long: ResolverTypeWrapper<Scalars['Long']>;
  MutatePathInput: MutatePathInput;
  Mutation: ResolverTypeWrapper<{}>;
  Path: never;
  PathType: ResolverTypeWrapper<PathType>;
  Place: ResolverTypeWrapper<Place>;
  PlaceInput: PlaceInput;
  PlaceKind: PlaceKind;
  PlaceRecord: PlaceRecord;
  Query: ResolverTypeWrapper<{}>;
  RemoveCommentPath: RemoveCommentPath;
  SearchPathInput: SearchPathInput;
  SuitableCar: SuitableCar;
  SuitablePeople: SuitablePeople;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Comment: Comment;
  ID: Scalars['ID'];
  String: Scalars['String'];
  CommentPathInput: CommentPathInput;
  CommentPathResponse: CommentPathResponse;
  CreatePathInput: CreatePathInput;
  Int: Scalars['Int'];
  CreatePathResponse: CreatePathResponse;
  DeletePathResponse: DeletePathResponse;
  Boolean: Scalars['Boolean'];
  File_path: File_Path;
  File_pathInput: File_PathInput;
  Files_path: Files_Path;
  Files_pathInput: Files_PathInput;
  Locality: Locality;
  Long: Scalars['Long'];
  MutatePathInput: MutatePathInput;
  Mutation: {};
  Path: never;
  PathType: PathType;
  Place: Place;
  PlaceInput: PlaceInput;
  Query: {};
  RemoveCommentPath: RemoveCommentPath;
  SearchPathInput: SearchPathInput;
};

export type CommentResolvers<ContextType = any, ParentType extends ResolversParentTypes['Comment'] = ResolversParentTypes['Comment']> = {
  author?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CommentPathResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['CommentPathResponse'] = ResolversParentTypes['CommentPathResponse']> = {
  path?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  author?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  userName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreatePathResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['CreatePathResponse'] = ResolversParentTypes['CreatePathResponse']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DeletePathResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['DeletePathResponse'] = ResolversParentTypes['DeletePathResponse']> = {
  done?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type File_PathResolvers<ContextType = any, ParentType extends ResolversParentTypes['File_path'] = ResolversParentTypes['File_path']> = {
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  src?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Files_PathResolvers<ContextType = any, ParentType extends ResolversParentTypes['Files_path'] = ResolversParentTypes['Files_path']> = {
  files?: Resolver<Array<Maybe<ResolversTypes['File_path']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LocalityResolvers<ContextType = any, ParentType extends ResolversParentTypes['Locality'] = ResolversParentTypes['Locality']> = {
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  latitude?: Resolver<Maybe<ResolversTypes['Long']>, ParentType, ContextType>;
  longitude?: Resolver<Maybe<ResolversTypes['Long']>, ParentType, ContextType>;
  province?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface LongScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Long'], any> {
  name: 'Long';
}

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createPath?: Resolver<ResolversTypes['CreatePathResponse'], ParentType, ContextType, RequireFields<MutationCreatePathArgs, 'input'>>;
  mutatePath?: Resolver<ResolversTypes['CreatePathResponse'], ParentType, ContextType, RequireFields<MutationMutatePathArgs, 'input'>>;
  deletePath?: Resolver<ResolversTypes['DeletePathResponse'], ParentType, ContextType, RequireFields<MutationDeletePathArgs, 'input'>>;
  likePath?: Resolver<ResolversTypes['PathType'], ParentType, ContextType, RequireFields<MutationLikePathArgs, 'input'>>;
  dislikePath?: Resolver<ResolversTypes['PathType'], ParentType, ContextType, RequireFields<MutationDislikePathArgs, 'input'>>;
  commentPath?: Resolver<ResolversTypes['CommentPathResponse'], ParentType, ContextType, RequireFields<MutationCommentPathArgs, 'input'>>;
  removeCommentPath?: Resolver<ResolversTypes['PathType'], ParentType, ContextType, RequireFields<MutationRemoveCommentPathArgs, 'input'>>;
  archivePath?: Resolver<ResolversTypes['PathType'], ParentType, ContextType, RequireFields<MutationArchivePathArgs, 'input'>>;
  restorePath?: Resolver<ResolversTypes['PathType'], ParentType, ContextType, RequireFields<MutationRestorePathArgs, 'input'>>;
};

export type PathResolvers<ContextType = any, ParentType extends ResolversParentTypes['Path'] = ResolversParentTypes['Path']> = {
  __resolveType: TypeResolveFn<null, ParentType, ContextType>;
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  maker?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  originPoint?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  destinationPoint?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  origin?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  destination?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  bestTime?: Resolver<Array<ResolversTypes['Int']>, ParentType, ContextType>;
  dangerRate?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  suitableCar?: Resolver<Maybe<Array<ResolversTypes['SuitableCar']>>, ParentType, ContextType>;
  interestingPlaces?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  placeMap?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  suitablePeople?: Resolver<Maybe<Array<ResolversTypes['SuitablePeople']>>, ParentType, ContextType>;
  facilities?: Resolver<Maybe<Array<ResolversTypes['Facilities']>>, ParentType, ContextType>;
  media?: Resolver<ResolversTypes['Files_path'], ParentType, ContextType>;
  places?: Resolver<Array<Maybe<ResolversTypes['Place']>>, ParentType, ContextType>;
  comments?: Resolver<Array<Maybe<ResolversTypes['Comment']>>, ParentType, ContextType>;
  likes?: Resolver<Array<Maybe<ResolversTypes['String']>>, ParentType, ContextType>;
  views?: Resolver<Array<Maybe<ResolversTypes['ID']>>, ParentType, ContextType>;
};

export type PathTypeResolvers<ContextType = any, ParentType extends ResolversParentTypes['PathType'] = ResolversParentTypes['PathType']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  maker?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  originPoint?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  destinationPoint?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  origin?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  destination?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  bestTime?: Resolver<Maybe<Array<ResolversTypes['Int']>>, ParentType, ContextType>;
  dangerRate?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  suitableCar?: Resolver<Maybe<Array<ResolversTypes['SuitableCar']>>, ParentType, ContextType>;
  interestingPlaces?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  suitablePeople?: Resolver<Maybe<Array<ResolversTypes['SuitablePeople']>>, ParentType, ContextType>;
  facilities?: Resolver<Maybe<Array<ResolversTypes['Facilities']>>, ParentType, ContextType>;
  media?: Resolver<Maybe<ResolversTypes['Files_path']>, ParentType, ContextType>;
  places?: Resolver<Maybe<Array<Maybe<ResolversTypes['Place']>>>, ParentType, ContextType>;
  commentsNumber?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  views?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  archived?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  liked?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  likesNumber?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PlaceResolvers<ContextType = any, ParentType extends ResolversParentTypes['Place'] = ResolversParentTypes['Place']> = {
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  kind?: Resolver<Maybe<ResolversTypes['PlaceKind']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  map?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  record?: Resolver<Maybe<ResolversTypes['PlaceRecord']>, ParentType, ContextType>;
  media?: Resolver<Maybe<ResolversTypes['Files_path']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  getPath?: Resolver<ResolversTypes['PathType'], ParentType, ContextType, RequireFields<QueryGetPathArgs, 'input'>>;
  getPaths?: Resolver<Array<ResolversTypes['PathType']>, ParentType, ContextType, RequireFields<QueryGetPathsArgs, 'input'>>;
  getComments?: Resolver<Maybe<Array<Maybe<ResolversTypes['Comment']>>>, ParentType, ContextType, RequireFields<QueryGetCommentsArgs, 'input'>>;
  getCity?: Resolver<Array<ResolversTypes['Locality']>, ParentType, ContextType>;
  getProvince?: Resolver<Array<ResolversTypes['Locality']>, ParentType, ContextType>;
  getCountry?: Resolver<Array<ResolversTypes['Locality']>, ParentType, ContextType>;
  getPopularPaths?: Resolver<Array<ResolversTypes['PathType']>, ParentType, ContextType>;
  searchPath?: Resolver<Array<Maybe<ResolversTypes['PathType']>>, ParentType, ContextType, RequireFields<QuerySearchPathArgs, never>>;
};

export type Resolvers<ContextType = any> = {
  Comment?: CommentResolvers<ContextType>;
  CommentPathResponse?: CommentPathResponseResolvers<ContextType>;
  CreatePathResponse?: CreatePathResponseResolvers<ContextType>;
  DeletePathResponse?: DeletePathResponseResolvers<ContextType>;
  File_path?: File_PathResolvers<ContextType>;
  Files_path?: Files_PathResolvers<ContextType>;
  Locality?: LocalityResolvers<ContextType>;
  Long?: GraphQLScalarType;
  Mutation?: MutationResolvers<ContextType>;
  Path?: PathResolvers<ContextType>;
  PathType?: PathTypeResolvers<ContextType>;
  Place?: PlaceResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
