import { Observable } from 'rxjs';
import { merge, mapTo } from 'rxjs/operators';
import { addItem } from './_add-item';

export default function subject() {

  let observable1 = Observable.create((observer: any) => {
    observer.next('First');
  });

  let observable2 = Observable.create((observer: any) => {
    observer.next('Second');
  });

  let newObs = observable1.pipe( merge(observable2) );
  newObs.subscribe( (x:any) => addItem(x, 'blue') );

}
