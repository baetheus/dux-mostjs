import { scan, map } from '@most/core';
import { Scheduler } from '@most/types';

import { create } from '../subject';
import { hold } from '../hold';

import { ReducerModify, ReducerAdd, Action, Reducer, State } from './models';
import { sinkFactory } from './sinkFactory';

export const reducerFactory = <S>(scheduler: Scheduler) => {
  const [reducersModifySink, reducersModifyStream] = create<ReducerModify>();
  const reducersStream = scan(
    (rs, nr) => {
      switch (nr.change) {
        case 'add':
          return [...rs, nr];
        case 'remove':
          return rs.filter(r => r.key === nr.key);
        default:
          return rs;
      }
    },
    [] as ReducerAdd[],
    reducersModifyStream
  );
  const reducerSink = sinkFactory(scheduler)<ReducerModify>(reducersModifySink);
  const reducerStreamRaw = map(
    s =>
      s.reduce(
        (acc, r) => (s: State<S>, a: Action) => r.reducer(acc(s, a), a),
        (s: State<S>, _: Action): State<S> => s
      ),
    reducersStream
  );

  const reducerStream: typeof reducerStreamRaw = hold(reducerStreamRaw);
  const addReducer = (key: string, reducer: Reducer<S>) =>
    reducerSink({ change: 'add', key, reducer });
  const removeReducer = (key: string) => reducerSink({ change: 'remove', key });

  return {
    reducerStream,
    addReducer,
    removeReducer,
  };
};
