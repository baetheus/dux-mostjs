import { Scheduler } from '@most/types';

import { scheduler as _scheduler } from './scheduler';
import { actionFactory } from './actions';
import { State } from './models';

export const storeFactory = <S extends {}>(
  initialState: State<S>,
  scheduler: Scheduler = _scheduler
) => {
  const { actionSink, actionStream, dispatch } = actionFactory(scheduler);

  return {
    scheduler,

    actionSink,
    actionStream,
    dispatch,
  };
};
