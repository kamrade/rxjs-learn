import { timer } from 'rxjs';
import { tap, mapTo, share } from 'rxjs/operators';

export default function subject() {
  
  const source = timer(1000);
  
  // Log side effect, emit result
  const example = source.pipe(
    tap(() => console.log('*** SIDE EFFECT ***')),
    mapTo('*** RESULT ***')
  );

  example.subscribe(val => console.log(val));
  example.subscribe(val => console.log(val));

  const sharedExample = example.pipe(share());

  sharedExample.subscribe(val => console.log(val));
  sharedExample.subscribe(val => console.log(val));

};
