import { interval, from, of } from 'rxjs';
import { flatMap, throttle, delay } from 'rxjs/operators';

import { addItem } from './_add-item';

export default function throttleExample() {

  const times = [
    { value: 0, time: 100 },
    { value: 1, time: 200 },
    { value: 2, time: 300 },
    { value: 3, time: 400 },
    { value: 4, time: 500 },
    { value: 5, time: 600 },
    { value: 6, time: 700 },
    { value: 7, time: 800 },
    { value: 8, time: 900 },
    { value: 9, time: 1000 },
    { value: 10, time: 1100 },
    { value: 11, time: 1200 },
    { value: 12, time: 1300 },
    { value: 13, time: 1400 },
    { value: 14, time: 1500 },
    { value: 15, time: 1600 },
    { value: 16, time: 1700 },
    { value: 17, time: 1800 },
    { value: 18, time: 1900 },
    { value: 19, time: 2000 },
    { value: 20, time: 2100 },
    { value: 21, time: 2200 },
    { value: 22, time: 2300 }
  ];

  let arraySource = from(times)
    .pipe(flatMap( item => {
      return of(item.value).pipe( delay(item.time))
    }))
    .pipe(throttle( val => interval(410) ));

  let subV = arraySource.subscribe((val:any) => addItem(val, 'blue'));

  
  // addItem('Throttle', 'blue');
  // const source = interval(1000);
  // const example = source.pipe( throttle(val => interval( 2000 )) );
  // const sourceV = example.subscribe((val:any) => addItem(val, 'blue'));

}
