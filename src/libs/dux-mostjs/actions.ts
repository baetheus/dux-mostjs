import { Scheduler } from '@most/types';

import { create } from '../subject';

import { Action } from './models';
import { sinkFactory } from './sinkFactory';

export const actionFactory = (scheduler: Scheduler) => {
  const [actionSink, actionStream] = create<Action>();
  const dispatch = sinkFactory(scheduler)(actionSink);

  return {
    actionSink,
    actionStream,
    dispatch,
  };
};
