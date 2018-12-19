import { of, from } from 'rxjs';
import { tap, mapTo, switchMap, delay, share } from 'rxjs/operators';

export default function subject() {

  let collectedReports: any[] = [];

  function getStatuses() {
    return of([
      {id: '001', title: 'Backlog'},
      {id: '002',title: 'In progress'},
      {id: '003', title: 'Finished'}
    ]).pipe(
      tap(() => console.log('status side effect')),
      delay(2000),
      tap((statuses) => statuses),
      share()
      // mapTo('*** POSTS RESULT ***')
    );
  }

  function getReports() {
    return of([{
      status: '001',
      client: 'Dashboard',
      statusTitle: ''
    }, {
      status: '001',
      client: 'Orders',
      statusTitle: ''
    }, {
      status: '002',
      client: 'Terminals',
      statusTitle: ''
    }, {
      status: '003',
      client: 'Support',
      statusTitle: ''
    }, {
      status: '001',
      client: 'Analityc',
      statusTitle: ''
    }]).pipe(
      tap((reports) => console.log('reports side effect')),
      share()
    );
  }

  const statusesObs = getStatuses();
  const reportsObs = getReports();

  console.log('collected reports:', collectedReports);

  const combined = reportsObs.pipe(
    switchMap(reports => {
      return statusesObs.pipe(
        tap(statuses => {
          reports.forEach(report => {

            let statusTitle = statuses.find(status => status.id === report.status);
            collectedReports.push({
              ...report,
              statusTitle: statusTitle.title
            });

          });
          console.log('collected reports:', collectedReports);
        })
      )
    })
  );

  combined.subscribe();
  statusesObs.subscribe(val => console.log(val));
  statusesObs.subscribe(val => console.log(val));
};
