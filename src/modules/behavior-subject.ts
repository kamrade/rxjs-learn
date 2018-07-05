/*

  Subject, BehaviorSubject(firstEmit: string), ReplaySubject(howManyReplays: number)

*/

import { addItem } from './_add-item';

import { ReplaySubject } from 'rxjs';

export default function subject() {

  let subject = new ReplaySubject(1);

  subject.subscribe(
    data => addItem('Observer1: ' + data, 'blue'),
    err => addItem(err, 'red'),
    () => addItem('Observer 1 completed.', 'green')
  );

  subject.next('The first thing has been sent');
  subject.next('... Observer 2 is about to subscribe');

  let observer2 = subject.subscribe(
    data => addItem(`Observer2: ${data}`, 'blue'),
    err => addItem(err, 'red'),
    () => addItem('Observer2 completed', 'green')
  );

  subject.next('Next thing has been sent');

  setTimeout(() => {
    subject.next('The third thing');
    subject.complete();
  }, 1500);

  observer2.unsubscribe();

  subject.next('The fourth thing');

}
