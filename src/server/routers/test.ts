import { observable } from '@trpc/server/observable';
import EventEmitter from 'events';
import { readFile, writeFile } from 'fs/promises';
import { z } from 'zod';
import { t } from '../trpc';

const ee = new EventEmitter();

export const appRouter = t.router({
  getData: t.procedure.query(async ({ ctx }) => {
    console.log(ctx.req.headers.authorization)
    const data = await readFile("src/server/test.db");
    return data.toString();
  }),
  setData: t.procedure.input(
    z.object({
      text: z.string()
    }).required()
  ).mutation(async ({ input, ctx }) => {
    ee.emit('set', input.text)
    await writeFile("src/server/test.db", input.text);
    return input;
  }),
  subData: t.procedure.subscription(async ({ ctx }) => {
    return observable<string>((emit) => {
      ee.on('set', emit.next)
      return () => {
        ee.off('set', emit.next)
      }
    });
  }),
});

export const testRouter = appRouter;

