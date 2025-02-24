---
to: src/graphql/modules/<%= h.inflection.camelize(name, true) %>/resolvers/<%= h.inflection.camelize(f, true) %>/<%= h.inflection.camelize(f, true) %>.schema.ts
---
import { gql } from "apollo-server-express";

const schema = gql`
  extend type Mutation {
    <%= h.inflection.camelize(f, true) %>(id: NonEmptyString!): <%= h.inflection.camelize(f, false) %>Data
  }
  
  type <%= h.inflection.camelize(f, false) %>Data {
    id: String
  }
`;

export default schema;
