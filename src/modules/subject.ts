import { addItem } from './_add-item';

import { Subject } from 'rxjs';

export default function subject() {

  let subject = new Subject();

  subject.subscribe(
    data => addItem('Observer 1' + data, 'blue'),
    err => addItem(err, 'red'),
    () => addItem('Observer 1 completed.', 'green')
  );

  subject.next('The first thing has been sent');

  let observer2 = subject.subscribe(
    data => addItem(`Observer2: ${data}`, 'blue'),
    err => addItem(err, 'red'),
    () => addItem('Observer2 completed', 'green')
  );

  subject.next('The second thing');
  subject.next('The third thing');

}
