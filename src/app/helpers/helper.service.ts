import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

const mS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'June',
  'July',
  'Aug',
  'Sept',
  'Oct',
  'Nov',
  'Dec',
];
@Injectable({
  providedIn: 'root',
})
export class HelperService {
  private is_Logout = new Subject<any>();
  private is_polistPublic = new Subject<any>();

  constructor() {}

  sendClickEvent() {
    this.is_Logout.next('');
  }
  getClickEvent(): Observable<any> {
    return this.is_Logout.asObservable();
  }
  polistPublic() {
    this.is_polistPublic.next('');
  }
  polistPublicEvent(): Observable<any> {
    return this.is_polistPublic.asObservable();
  }

  getNowTimeFormatted() {
    const date = new Date();
    const D = ('0' + date.getDate()).slice(-2);
    const M = date.getMonth();
    const Y = date.getFullYear();
    const T = date.toLocaleTimeString();

    return D + ' ' + mS[M] + ' ' + Y + ' ' + T;
  }

  getNowTimeFormattedNew() {
    const date = new Date();
    // const D = ('0' + date.getDate()).slice(-2);
    // const M = date.getMonth();
    // const Y = date.getFullYear();
    const T = date.toLocaleTimeString();

    return T;
  }

  getTimeString() {
    const time =
      String(new Date().getHours()) +
      String(new Date().getMinutes()) +
      String(new Date().getSeconds());
    return time;
  }
}
