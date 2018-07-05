import { addItem } from './_add-item';

import { Subject } from 'rxjs';

export default function subject() {

  let subject = new Subject();

  subject.subscribe(
    data => addItem('Observer 1' + data, 'blue'),
    err => addItem(err, 'red'),
    () => addItem('Observer 1 completed.', 'green')
  );

  let observer2 = subject.subscribe(
    data => addItem(`Observer2: ${data}`, 'blue'),
    err => addItem(err, 'red'),
    () => addItem('Observer2 completed', 'green')
  );

  subject.next('The first thing has been sent');

  setTimeout(() => {
    subject.next('The second thing');
  }, 500);

  setTimeout(() => {
    subject.next('The third thing');
  }, 1500);

  observer2.unsubscribe();

  subject.next('The fourth thing');

}
