import { Observable } from 'rxjs';
import { share } from 'rxjs/operators';

import { addItem } from './_add-item';

/*
  An observable is hot when the producer is emitting values
  outside of the observable
*/

export default function observable() {

  let observable = Observable.create((observer: any) => {
    try {
      observer.next('first message');
      observer.next('second message');
      setInterval(() => { observer.next('ok'); }, 500);
      setTimeout(() => { observer.complete() }, 2000);
    } catch (err) { observer.error(err); }
  })
  .pipe(share())
  ;

  let observer1:any, observer2:any;

  observer1 = observable.subscribe(
    (x: any) => addItem(`s1: ${x}`),
    (error: any) => addItem(error),
    () => addItem(':: s1 completed', 'green')
  );

  setTimeout(() => {
    observer2 = observable
      .subscribe(
        (x: any) => addItem(`s2: ${x}`, 'blue'),
        (error: any) => addItem(error),
        () => addItem(':: s2 completed', 'green')
      );
  }, 1000);


}
