import { of } from 'rxjs';
import { concatMap, delay, mergeMap } from 'rxjs/operators';

export default function subject() {


  function example1 () {
    // emit delay value
    const source = of(2000, 1000);
    // map value from source into inner observable, when complete emit result and move to next
    const example = source.pipe(
      concatMap( val => of(`Delayed by ${val}ms`)
        .pipe(delay(val))
      )
    );
    example.subscribe(val => console.log(`With concatMap: ${val}`));

    // showing the difference between concatMap and mergeMap
    source.pipe(
      // just so we can log this after the first example has run
      delay(3000),
      mergeMap(val => of(`Delayed by ${val}ms`).pipe(delay(val)))
    )
    .subscribe(val => console.log(`With mergeMap: ${val}`));
  }

  function example2() {
    const source = of('Hello', 'Goodbye');
    const examplePromise = (val:string) => new Promise(resolve => resolve(`${val} World!`));
    const example = source.pipe(
      concatMap(val => examplePromise(val))
    );
    const subscribe = example.subscribe(val => console.log(`Example w/ Promise ${val}`));
  }

  example1();
  example2();

};
