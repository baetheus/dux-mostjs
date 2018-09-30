import { currentTime } from '@most/scheduler';
import { Scheduler } from '@most/types';

import { event, AttachSink } from '../subject';

export const sinkFactory = (scheduler: Scheduler) => <S>(s: AttachSink<S>) => (
  v: S
) => event(currentTime(scheduler), v, s);
