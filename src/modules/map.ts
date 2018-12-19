import { from } from 'rxjs';
import { map } from 'rxjs/operators';

export default function subject() {

  const source = from([1,2,3,4,5]);
  const example = source.pipe(map(val => val + 10));
  example.subscribe(val => console.log(val));

};
