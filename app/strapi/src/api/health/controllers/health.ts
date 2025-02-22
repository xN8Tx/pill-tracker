/**
 * A set of functions called "actions" for `health`
 */
import { type Context } from "koa";

export default {
  health: (ctx: Context) => {
    ctx.body = "ok";
  },
};
