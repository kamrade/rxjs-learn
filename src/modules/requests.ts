import { of } from 'rxjs';
import { delay, concatMap, timeout, catchError } from 'rxjs/operators';

export default function subject() {

  // simulate request
  function makeRequest(timeToDelay: number) {
    return of('Request complete!').pipe( delay(timeToDelay) );
  }

  of(5000, 4000, 3000, 2000)
    .pipe(
      concatMap((duration) => {
        console.log('>_ duration:', duration);
        return makeRequest(duration).pipe(
            timeout(2500),
            catchError(() => of(`Request timed out: ${duration}`))
          )
      })
    )
    .subscribe(val => console.log(val));

};
