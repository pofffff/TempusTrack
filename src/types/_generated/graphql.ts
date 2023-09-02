export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Date: { input: Date; output: Date; }
  DateTime: { input: Date; output: Date; }
  Time: { input: Date; output: Date; }
};

export type ActivitiesDeleteInput = {
  activityIds: Array<Scalars['ID']['input']>;
  cascade?: InputMaybe<Scalars['Boolean']['input']>;
};

export type Activity = {
  __typename?: 'Activity';
  category?: Maybe<Category>;
  createdAt: Scalars['DateTime']['output'];
  endDate?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  owner: User;
  startDate: Scalars['DateTime']['output'];
  timeRecords?: Maybe<Array<Maybe<TimeRecord>>>;
  totalTimeTraced: Scalars['Float']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type ActivityCollection = {
  __typename?: 'ActivityCollection';
  activities?: Maybe<Array<Maybe<Activity>>>;
};

export type ActivityCreateInput = {
  categoryId: Scalars['ID']['input'];
  name: Scalars['String']['input'];
  startDate: Scalars['DateTime']['input'];
};

export type ActivityUpdateInput = {
  endDate?: InputMaybe<Scalars['DateTime']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  startDate: Scalars['DateTime']['input'];
};

export type AuthPayload = {
  __typename?: 'AuthPayload';
  token: Scalars['String']['output'];
  userId: Scalars['ID']['output'];
};

export type CategoriesDeleteInput = {
  cascade?: InputMaybe<Scalars['Boolean']['input']>;
  categoryIds: Array<Scalars['ID']['input']>;
};

export type Category = {
  __typename?: 'Category';
  activities?: Maybe<Array<Maybe<Activity>>>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  owner: User;
};

export type CategoryAddActivitiesInput = {
  activityIds: Array<Scalars['ID']['input']>;
  categoryId: Scalars['ID']['input'];
};

export type CategoryCollection = {
  __typename?: 'CategoryCollection';
  categories?: Maybe<Array<Maybe<Category>>>;
};

export type CategoryCreateInput = {
  name: Scalars['String']['input'];
};

export type CategoryRemoveActivityInput = {
  activityIds: Array<Scalars['ID']['input']>;
  categoryId: Scalars['ID']['input'];
};

export type CategoryUpdateInput = {
  name: Scalars['String']['input'];
};

export type CreateUserPayload = {
  __typename?: 'CreateUserPayload';
  email?: Maybe<Scalars['String']['output']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addActivitiesToCategory?: Maybe<Category>;
  createActivity?: Maybe<Activity>;
  createCategory?: Maybe<Category>;
  createStreak?: Maybe<Streak>;
  createTimeRecord?: Maybe<TimeRecord>;
  createUser?: Maybe<CreateUserPayload>;
  deleteActivities?: Maybe<Array<Maybe<Scalars['ID']['output']>>>;
  deleteCategories?: Maybe<Array<Maybe<Scalars['ID']['output']>>>;
  deleteStreaks?: Maybe<Array<Maybe<Scalars['ID']['output']>>>;
  deleteTimeRecords?: Maybe<Array<Maybe<Scalars['ID']['output']>>>;
  removeActivitiesFromCategory?: Maybe<Category>;
  updateActivity?: Maybe<Activity>;
  updateCategory?: Maybe<Category>;
  updateStreak?: Maybe<Streak>;
  updateTimeRecord?: Maybe<TimeRecord>;
  updateUser?: Maybe<User>;
};


export type MutationAddActivitiesToCategoryArgs = {
  input: CategoryAddActivitiesInput;
};


export type MutationCreateActivityArgs = {
  input: ActivityCreateInput;
  userId: Scalars['ID']['input'];
};


export type MutationCreateCategoryArgs = {
  input: CategoryCreateInput;
  userId: Scalars['ID']['input'];
};


export type MutationCreateStreakArgs = {
  input: StreakCreateInput;
  userId: Scalars['ID']['input'];
};


export type MutationCreateTimeRecordArgs = {
  input: TimeRecordCreateInput;
  userId: Scalars['ID']['input'];
};


export type MutationCreateUserArgs = {
  input: UserCreateInput;
};


export type MutationDeleteActivitiesArgs = {
  input: ActivitiesDeleteInput;
};


export type MutationDeleteCategoriesArgs = {
  input: CategoriesDeleteInput;
};


export type MutationDeleteStreaksArgs = {
  input: StrwakDeleteInput;
};


export type MutationDeleteTimeRecordsArgs = {
  input: TimeRecordDeleteInput;
};


export type MutationRemoveActivitiesFromCategoryArgs = {
  input: CategoryRemoveActivityInput;
};


export type MutationUpdateActivityArgs = {
  activityId: Scalars['ID']['input'];
  input: ActivityUpdateInput;
};


export type MutationUpdateCategoryArgs = {
  categoryId: Scalars['ID']['input'];
  input: CategoryUpdateInput;
};


export type MutationUpdateStreakArgs = {
  input: StreakUpdateInput;
  streakId: Scalars['ID']['input'];
};


export type MutationUpdateTimeRecordArgs = {
  input: TimeRecordUpdateInput;
  timeRecordId: Scalars['ID']['input'];
};


export type MutationUpdateUserArgs = {
  input: UserUpdateInput;
  userId: Scalars['ID']['input'];
};

export type Query = {
  __typename?: 'Query';
  activity?: Maybe<Activity>;
  activityCollection?: Maybe<ActivityCollection>;
  category?: Maybe<Category>;
  categoryCollection?: Maybe<CategoryCollection>;
  getUser?: Maybe<User>;
  loginUser: AuthPayload;
  streak?: Maybe<Streak>;
  streakCollection?: Maybe<StreakCollection>;
  timeRecord?: Maybe<TimeRecord>;
  timeRecordCollection?: Maybe<TimeRecordCollection>;
};


export type QueryActivityArgs = {
  activityId: Scalars['ID']['input'];
};


export type QueryActivityCollectionArgs = {
  userId: Scalars['ID']['input'];
};


export type QueryCategoryArgs = {
  categoryId: Scalars['ID']['input'];
};


export type QueryCategoryCollectionArgs = {
  userId: Scalars['ID']['input'];
};


export type QueryGetUserArgs = {
  userId: Scalars['ID']['input'];
};


export type QueryLoginUserArgs = {
  input: UserLoginInput;
};


export type QueryStreakArgs = {
  streakId: Scalars['ID']['input'];
};


export type QueryStreakCollectionArgs = {
  userId: Scalars['ID']['input'];
};


export type QueryTimeRecordArgs = {
  timeRecordId: Scalars['ID']['input'];
};


export type QueryTimeRecordCollectionArgs = {
  activityId: Scalars['ID']['input'];
};

export type Streak = {
  __typename?: 'Streak';
  count: Scalars['Int']['output'];
  endDate?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  owner: User;
  startDate?: Maybe<Scalars['DateTime']['output']>;
};

export type StreakCollection = {
  __typename?: 'StreakCollection';
  streaks?: Maybe<Array<Maybe<Streak>>>;
};

export type StreakCreateInput = {
  count?: InputMaybe<Scalars['Int']['input']>;
  endDate?: InputMaybe<Scalars['DateTime']['input']>;
  name: Scalars['String']['input'];
  startDate?: InputMaybe<Scalars['DateTime']['input']>;
};

export type StreakUpdateInput = {
  count?: InputMaybe<Scalars['Int']['input']>;
  endDate?: InputMaybe<Scalars['DateTime']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  startDate?: InputMaybe<Scalars['DateTime']['input']>;
};

export type StrwakDeleteInput = {
  streakIds: Array<Scalars['ID']['input']>;
};

export type TimeRecord = {
  __typename?: 'TimeRecord';
  activity: Activity;
  amount: Scalars['Float']['output'];
  createdAt: Scalars['DateTime']['output'];
  date: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  owner: User;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type TimeRecordCollection = {
  __typename?: 'TimeRecordCollection';
  timeRecords?: Maybe<Array<Maybe<TimeRecord>>>;
};

export type TimeRecordCreateInput = {
  activityId: Scalars['ID']['input'];
  amount: Scalars['Float']['input'];
  date: Scalars['DateTime']['input'];
};

export type TimeRecordDeleteInput = {
  timeRecordIds: Array<Scalars['ID']['input']>;
};

export type TimeRecordUpdateInput = {
  activityId: Scalars['ID']['input'];
  amount?: InputMaybe<Scalars['Float']['input']>;
  date?: InputMaybe<Scalars['DateTime']['input']>;
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type UserCreateInput = {
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type UserLoginInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type UserUpdateInput = {
  name?: InputMaybe<Scalars['String']['input']>;
};
