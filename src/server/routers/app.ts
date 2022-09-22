import { t } from '../trpc';
import { testRouter } from './test';

export const appRouter = t.router({
  test: testRouter,
});

export type AppRouter = typeof appRouter;