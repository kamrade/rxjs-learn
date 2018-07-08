import { fromEvent, interval } from 'rxjs';
import { map, throttle, debounceTime } from 'rxjs/operators';
import { addItem } from './_add-item';

export default function events() {

  const controls = document.getElementById('controls');
  
  const btnThrottle = document.createElement('button');
  btnThrottle.classList.add('btn', 'btn-primary');
  btnThrottle.id = 'btn-throttle';
  btnThrottle.innerText = 'Test throttle';
  controls.appendChild( btnThrottle );
  const eventSource = fromEvent(btnThrottle, 'click');
  eventSource
    .pipe(throttle(val => interval(1000)))
    .pipe(map(event => event.timeStamp.toLocaleString()))
    .subscribe(val => addItem(val, 'blue'));
  
  const btnDebounce = document.createElement('button');
  btnDebounce.classList.add('btn', 'btn-primary');
  btnDebounce.id = 'btn-throttle';
  btnDebounce.innerText = 'Test throttle';
  controls.appendChild(btnDebounce);
  const debounceSource = fromEvent(btnDebounce, 'click');
  debounceSource
    .pipe(debounceTime(300))
    .pipe(map(event => event.timeStamp.toLocaleString()))
    .subscribe(val => addItem(val, 'red'));
  
}