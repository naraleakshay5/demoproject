import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AppStorage {
  get(key: string) {
    let item = localStorage.getItem(key);
    let value = null;

    if (typeof item === 'string') {
      // Todo Scope for improvement
      try {
        value = JSON.parse(item);
      } catch (e) {
        return item;
      }
    }

    return value;
  }

  set(key: string, value: number | string | object | boolean) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  clear(key: string) {
    localStorage.removeItem(key);
  }

  setOperationalLogs(operationalsLogs: any) {
    this.set('OPERATIONAL_LOGS', operationalsLogs);
  }

  getOperationalLogs() {
    const operationalsLogs = this.get('OPERATIONAL_LOGS');

    return operationalsLogs !== null ? operationalsLogs : [];
  }
}
