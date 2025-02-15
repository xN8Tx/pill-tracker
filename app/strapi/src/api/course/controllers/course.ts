/**
 * course controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::course.course",
  ({ strapi }) => ({
    async find(ctx) {
      const { user } = ctx.state;

      const entities = await strapi.documents("api::course.course").findMany({
        filters: {
          user: user.id,
        },
      });

      return this.transformResponse(entities);
    },

    async findOne(ctx) {
      const { user } = ctx.state;
      const { id: documentId } = ctx.params;

      const entity = await strapi.documents("api::course.course").findOne({
        documentId,
        filters: {
          user: user.id,
        },
      });

      if (!entity) {
        return ctx.notFound("Course not found");
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

      const entity = await strapi.documents("api::course.course").create({
        data,
      });

      return this.transformResponse(entity);
    },

    async update(ctx) {
      const { user } = ctx.state;
      const { id: documentId } = ctx.params;
      const { body } = ctx.request;

      const existingEntity = await strapi
        .documents("api::course.course")
        .findOne({
          documentId,
          filters: {
            user: user.id,
          },
        });

      if (!existingEntity) {
        return ctx.notFound("Course not found");
      }

      const updatedEntity = await strapi
        .documents("api::course.course")
        .update({
          documentId,
          data: body,
        });

      return this.transformResponse(updatedEntity);
    },

    async delete(ctx) {
      const { user } = ctx.state;
      const { id: documentId } = ctx.params;

      const existingEntity = await strapi
        .documents("api::course.course")
        .findMany({
          filters: {
            documentId,
            user: user.id,
          },
        });

      if (existingEntity.length === 0) {
        return ctx.notFound("Course not found");
      }

      await strapi.documents("api::course.course").delete({
        documentId,
      });

      return { message: "Course deleted successfully" };
    },
  }),
);
