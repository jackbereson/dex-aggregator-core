import { gql } from 'apollo-server-express';

import { UserRoles } from './user.model';

const schema = gql`
extend type Query {
  getAllUser(q: QueryGetListInput): UserPageData
  getOneUser(id: NonEmptyString!): User
  # Add Query
  userGetMe: User
}

extend type Mutation {
  createUser(data: CreateUserInput!): User
  updateUser(id: NonEmptyString!, data: UpdateUserInput!): User
  deleteOneUser(id: NonEmptyString!): User
    # Add Mutation
  signin(email: NonEmptyString!): UserLoginData
}

type UserLoginData {
  user: User
  token: String
}

input CreateUserInput {
  name: String
  email: NonEmptyString!
  password: NonEmptyString!
  phone: String
  avatar: String
  role: String
}

input UpdateUserInput {
  name: String
  email: String
  password: String
  phone: String
  avatar: String
  role: String
  status: String
}

input UserUpdateMeInput {
  name: String
  phone: String
  address: String
  avatar: String
  provinceId: String
  districtId: String
  wardId: String
  """${Object.values(UserRoles).join('|')}"""
  role: String
}

type User {
  createdAt: DateTime
  updatedAt: DateTime

  name: String

  code: String
  id: String
  email: String
  role: String

  phone: String
  address: String
  
  lastLoginAt: DateTime
  activeAt: DateTime
  status: String
}


type UserPageData {
  data: [User]
  total: Int
  pagination: Pagination
}
`;

export default schema;
