import { SseService } from './sse.service';
import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  machineRunningStatus = new Subject<string>();
  machineConnectionStatus = new Subject<string>();

  constructor(
    private http: HttpClient,
    private _zone: NgZone,
    private _sseService: SseService
  ) {}

  // updateMachineStatus() {
  //   this.machineRunningStatus.next('Running');
  // }

  // updateMachineConnectionStatus(status: string) {
  //   this.machineConnectionStatus.next(status);
  // }

  getWebClientProfile() {
    return this.http.get(environment.baseUrl + '/v1/web_client/get_me');
  }

  getServerSentEvent(url: string) {
    return Observable.create((observer: any) => {
      const eventSource = this._sseService.getEventSource(url);

      eventSource.onmessage = (event) => {
        this._zone.run(() => {
          observer.next(event);
        });
      };

      eventSource.onerror = (error) => {
        this._zone.run(() => {
          observer.error(error);
        });
      };

      eventSource.onopen = (event: any) => {
        console.info('Local App Connected');
      };
    });
  }
}
