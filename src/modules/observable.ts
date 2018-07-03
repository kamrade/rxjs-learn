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
      setInterval(() => { observer.next('ok'); }, 2000);
    } catch (err) { observer.error(err); }
  })
    .pipe(share())
    ;
  
  let observer = observable.subscribe(
    (x: any) => addItem(x),
    (error: any) => addItem(error),
    () => addItem(':: completed')
  );
  
  setTimeout(() => {
    let observer2 = observable
      .subscribe((x: any) => addItem(`Subscriber2: ${x}`, 'blue'));
  }, 1000);

}