---
to: src/graphql/modules/<%= h.inflection.camelize(name, true) %>/resolvers/<%= h.inflection.camelize(f, true) %>/<%= h.inflection.camelize(f, true) %>.resolver.ts
---
import { ROLES } from "../../../../../constants/role.const";
import { Context } from "../../../../../core/context";


const Mutation = {
  <%= h.inflection.camelize(f, true) %>: async (root: any, args: any, context: Context) => {
    context.auth(ROLES.ADMIN_EDITOR);
    const { id } = args;
    // code here
    return {
      id
    }
  },
};

export default { Mutation };
