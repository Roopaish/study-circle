/**
 * This file was @generated using pocketbase-typegen
 */

export enum Collections {
  Answer = "answer",
  AnswerRating = "answer_rating",
  Badge = "badge",
  Department = "department",
  Question = "question",
  QuestionRating = "question_rating",
  Resource = "resource",
  ResourceRating = "resource_rating",
  Subject = "subject",
  Tags = "tags",
  University = "university",
  Users = "users",
}

// Alias types for improved usability
export type IsoDateString = string;
export type RecordIdString = string;
export type HTMLString = string;

// System fields
export type BaseSystemFields<T = never> = {
  id: RecordIdString;
  created: IsoDateString;
  updated: IsoDateString;
  collectionId: string;
  collectionName: Collections;
  expand?: T;
};

export type AuthSystemFields<T = never> = {
  email: string;
  emailVisibility: boolean;
  username: string;
  verified: boolean;
} & BaseSystemFields<T>;

// Record types for each collection

export type AnswerRecord = {
  body: string;
  user_affiliation: RecordIdString;
  question_affiliation: RecordIdString;
  rating_affiliation?: RecordIdString[];
  rating?: number;
};

export type AnswerRatingRecord = {
  value: number;
  user_affiliation: RecordIdString[];
};

export type BadgeRecord = {
  name: string;
  desc: string;
  amount?: number;
  user_affiliation?: RecordIdString[];
};

export type DepartmentRecord = {
  name: string;
  university_affiliation?: RecordIdString[];
};

export type QuestionRecord = {
  title: string;
  body?: string;
  user_affiliation: RecordIdString;
  answer_affiliation?: RecordIdString[];
  subject_affiliation: RecordIdString;
  rating_affiliation?: RecordIdString[];
  tag_affiliation: RecordIdString[];
  test?: HTMLString;
  generated_ans?: string;
  rating?: number;
};

export type QuestionRatingRecord = {
  value: number;
  user_affiliation: RecordIdString[];
};

export type ResourceRecord = {
  name: string;
  user_affiliation: RecordIdString;
  rating_affiliation?: RecordIdString[];
  file: string;
  subject_affiliation: RecordIdString;
  tag_affiliation: RecordIdString[];
};

export type ResourceRatingRecord = {
  value: number;
  user_affiliation: RecordIdString[];
};

export type SubjectRecord = {
  name: string;
  department_affiliation?: RecordIdString[];
};

export type TagsRecord = {
  tagname: string;
};

export type UniversityRecord = {
  name: string;
  location: string;
  code: string;
  image_url: string;
};

export type UsersRecord = {
  name?: string;
  avatar?: string;
  universityId?: RecordIdString;
  depId?: RecordIdString;
  tag_affiliation?: RecordIdString[];
};

// Response types include system fields and match responses from the PocketBase API
export type AnswerResponse<Texpand = unknown> = AnswerRecord &
  BaseSystemFields<Texpand>;
export type AnswerRatingResponse<Texpand = unknown> = AnswerRatingRecord &
  BaseSystemFields<Texpand>;
export type BadgeResponse<Texpand = unknown> = BadgeRecord &
  BaseSystemFields<Texpand>;
export type DepartmentResponse<Texpand = unknown> = DepartmentRecord &
  BaseSystemFields<Texpand>;
export type QuestionResponse<Texpand = unknown> = QuestionRecord &
  BaseSystemFields<Texpand>;
export type QuestionRatingResponse<Texpand = unknown> = QuestionRatingRecord &
  BaseSystemFields<Texpand>;
export type ResourceResponse<Texpand = unknown> = ResourceRecord &
  BaseSystemFields<Texpand>;
export type ResourceRatingResponse<Texpand = unknown> = ResourceRatingRecord &
  BaseSystemFields<Texpand>;
export type SubjectResponse<Texpand = unknown> = SubjectRecord &
  BaseSystemFields<Texpand>;
export type TagsResponse = TagsRecord & BaseSystemFields;
export type UniversityResponse = UniversityRecord & BaseSystemFields;
export type UsersResponse<Texpand = unknown> = UsersRecord &
  AuthSystemFields<Texpand>;

export type CollectionRecords = {
  answer: AnswerRecord;
  answer_rating: AnswerRatingRecord;
  badge: BadgeRecord;
  department: DepartmentRecord;
  question: QuestionRecord;
  question_rating: QuestionRatingRecord;
  resource: ResourceRecord;
  resource_rating: ResourceRatingRecord;
  subject: SubjectRecord;
  tags: TagsRecord;
  university: UniversityRecord;
  users: UsersRecord;
};
