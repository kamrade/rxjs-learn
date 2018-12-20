import { interval } from 'rxjs';
import { mergeMap, take } from 'rxjs/operators';

export default function subject() {

  console.log(':: begin');

  const source = interval(1000);

  const example = source.pipe(
    mergeMap(
      val => interval(5000).pipe(take(2)),
      (oVal, iVal, oIndex, iIndex) => [oIndex, oVal, iIndex, iVal]
    )
  );

  const subscribe = example.subscribe(val => console.log(val));

  console.log(':: end');

};
