// import { create } from 'most-subject';
// import { scan, map } from '@most/core';

// import {
//   MetaReducerModify,
//   MetaReducerAdd,
//   Reducer,
//   MetaReducer,
// } from './models';
// import { sink } from './utils';
// import { hold } from '@most/hold';

// export const metaReducerFactory = <S>() => {
//   const [metaReducersModifySink, metaReducersModifyStream] = create<
//     MetaReducerModify<S>
//   >();
//   const metaReducersStream = scan(
//     (rs, nr) => {
//       switch (nr.change) {
//         case 'add':
//           return [...rs, nr];
//         case 'remove':
//           return rs.filter(r => r.key === nr.key);
//         default:
//           return rs;
//       }
//     },
//     [] as MetaReducerAdd<S>[],
//     metaReducersModifyStream
//   );

//   const metaReducerSink = sink<MetaReducerModify<S>>(metaReducersModifySink);
//   const metaReducerStreamRaw = map(
//     s =>
//       s.reduce(
//         (acc, mr): MetaReducer<S> => (r: Reducer<S>) => mr.metaReducer(acc(r)),
//         (r: Reducer<S>): Reducer<S> => r
//       ),
//     metaReducersStream
//   );

//   const metaReducerStream: typeof metaReducerStreamRaw = hold(
//     metaReducerStreamRaw
//   );
//   const addMetaReducer = (key: string, metaReducer: MetaReducer<S>) =>
//     metaReducerSink({ change: 'add', key, metaReducer });
//   const removeMetaReducer = (key: string) =>
//     metaReducerSink({ change: 'remove', key });

//   return {
//     metaReducerStream,
//     addMetaReducer,
//     removeMetaReducer,
//   };
// };
