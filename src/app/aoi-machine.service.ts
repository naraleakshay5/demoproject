import { environment } from '../environments/environment';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { Injectable } from '@angular/core';
import {
  Subject,
  takeUntil,
  Observable,
  of,
  switchMap,
  retryWhen,
  delay,
} from 'rxjs';

export const AOI_ENDPOINT = environment.aoi;

@Injectable({
  providedIn: 'root',
})
export class AoiMachineService {
  destroyed$ = new Subject();
  private connection$!: WebSocketSubject<any> | null;
  status: Subject<any> = new Subject<any>();

  RETRY_SECONDS = 1000;

  constructor() {
    this.connect()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((response) => {
        this.status.next(response);
      });
  }

  connect(): Observable<any> {
    return of(AOI_ENDPOINT).pipe(
      switchMap((wsUrl) => {
        if (this.connection$) {
          return this.connection$;
        } else {
          this.connection$ = webSocket(wsUrl);
          return this.connection$;
        }
      }),
      retryWhen((errors) => {
        return errors.pipe(delay(this.RETRY_SECONDS));
      })
    );
  }

  send(data: any) {
    if (this.connection$) {
      const payload = {
        token: 'alskdniaubscuiabcae',
        ...data,
      };

      this.connection$.next(payload);
    } else {
      console.error('Did not send data, open a connection first');
    }
  }
}
