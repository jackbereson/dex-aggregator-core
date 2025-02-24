---
to: src/graphql/modules/<%= h.inflection.camelize(name, true) %>/resolvers/<%= h.inflection.camelize(f, true) %>/<%= h.inflection.camelize(f, true) %>.schema.ts
---
import { gql } from "apollo-server-express";

const schema = gql`
  extend type Query {
     <%= h.inflection.camelize(f, true) %>: <%= h.inflection.camelize(name) %>
  }
`;

export default schema;
