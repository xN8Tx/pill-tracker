import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::pill.pill",
  ({ strapi }) => ({
    async find(ctx) {
      const { user } = ctx.state;

      const entities = await strapi.documents("api::pill.pill").findMany({
        filters: {
          user: user.id,
        },
      });

      return this.transformResponse(entities);
    },

    async findOne(ctx) {
      const { user } = ctx.state;
      const { id: documentId } = ctx.params;

      const entity = await strapi.documents("api::pill.pill").findOne({
        documentId,
        filters: {
          user: user.id,
        },
      });

      if (!entity) {
        return ctx.notFound("Pill not found");
      }

      return this.transformResponse(entity);
    },

    async create(ctx) {
      const { user } = ctx.state;
      const { body } = ctx.request;

      const data = {
        ...body,
        user: user.id,
      };

      const entity = await strapi.documents("api::pill.pill").create({
        data,
      });

      return this.transformResponse(entity);
    },

    async update(ctx) {
      const { user } = ctx.state;
      const { id: documentId } = ctx.params;
      const { body } = ctx.request;

      const existingEntity = await strapi.documents("api::pill.pill").findOne({
        documentId,
        filters: {
          user: user.id,
        },
      });

      if (!existingEntity) {
        return ctx.notFound("Pill not found");
      }

      const updatedEntity = await strapi.documents("api::pill.pill").update({
        documentId,
        data: body,
      });

      return this.transformResponse(updatedEntity);
    },

    async delete(ctx) {
      const { user } = ctx.state;
      const { id: documentId } = ctx.params;

      const existingEntity = await strapi.documents("api::pill.pill").findMany({
        filters: {
          documentId,
          user: user.id,
        },
      });

      if (existingEntity.length === 0) {
        return ctx.notFound("Pill not found");
      }

      await strapi.documents("api::pill.pill").delete({
        documentId,
      });

      return { message: "Pill deleted successfully" };
    },
  }),
);
