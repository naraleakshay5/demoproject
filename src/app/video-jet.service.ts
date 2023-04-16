import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { Injectable } from '@angular/core';
import {
  delay,
  Observable,
  of,
  retryWhen,
  Subject,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs';
import { environment } from '../environments/environment';

export const VJ_ENDPOINT = environment.videoJet;

@Injectable({
  providedIn: 'root',
})
export class VideoJetService {
  destroyed$ = new Subject();
  private connection$!: WebSocketSubject<any> | null;
  status: Subject<any> = new Subject<any>();

  RETRY_SECONDS = 1000;

  wsStatuses: any = {
    '0': 'Not Connected',
    '1': 'Connected',
    '2': 'Disconnected',
    '3': 'Reconnecting',
  };

  constructor() {
    this.connect()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((response) => {
        this.status.next(response);
      });
  }

  connect(): Observable<any> {
    return of(VJ_ENDPOINT).pipe(
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
