import { of, Observable } from 'rxjs';
import { delay, share, tap } from 'rxjs/operators';

export default function subject() {

  let loading = true;

  function makeRequest(): Observable<any> {
    console.log(':: request');
    return of('Success request!')
      .pipe(
        tap(() => console.log('*** SIDE EFFECT 1 ***')),
        delay(2000),
        share(),
        tap(() => console.log('*** SIDE EFFECT 2 ***')),
      );
  }

  function getPosts(): Observable<any> {
    return makeRequest();
  }

  function setLoadingSpinner(observable: Observable<any>) {
    loading = true;
    observable.subscribe((data) => {
      loading = false;
    });
  }

  const request = getPosts();
  setLoadingSpinner(request);
  request.subscribe((data) => {
    console.log(data);
  } );
};
