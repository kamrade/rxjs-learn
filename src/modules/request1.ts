import { of, Observable } from 'rxjs';
import { delay } from 'rxjs/operators';

export default function subject() {

  let loading = true;

  function getPosts(): Observable<any> {
    console.log(':>_ request sent')
    return of('Request complete!').pipe(delay(4000));
  }

  function setLoadingSpinner(observable: Observable<any>) {
    console.log(':>_ loading true');
    loading = true;
    observable.subscribe(() => {
      console.log(':>_ loading false');
      loading = false;
    });
  }

  const request = getPosts();
  setLoadingSpinner(request);
  request.subscribe((data) => {
    console.log(data);
  })

};
