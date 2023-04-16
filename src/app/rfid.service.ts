import { Injectable } from '@angular/core';
import {
  delay,
  Observable,
  of,
  retryWhen,
  Subject,
  switchMap,
  takeUntil,
} from 'rxjs';
import { environment } from '../environments/environment';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

export const RFID_ENDPOINT = environment.rfidNew;

@Injectable({
  providedIn: 'root',
})
export class RfidService {
  destroyed$ = new Subject();
  private connection$!: WebSocketSubject<any> | null;
  tags: Subject<any> = new Subject<any>();

  RETRY_SECONDS = 1000;

  constructor() {
    this.connect()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((response) => {
        this.tags.next(response);
      });
  }

  connect(): Observable<any> {
    return of(RFID_ENDPOINT).pipe(
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
}
