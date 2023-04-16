import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FqaService {
  buttons: any[] = [];

  constructor(private http: HttpClient) {
    const buttons = localStorage.getItem('BUTTONS')!;
    this.buttons = JSON.parse(buttons);
  }

  fqaProcessLog = {
    electrical: 'ELECTRICAL_COMPLETED',
    firstMechanical: 'FIRST_MECHANICAL_COMPLETED',
    packing: 'PACKING_COMPLETED',
    secondMechanical: 'SECOND_MECHANICAL_COMPLETED',
    taping: 'TAPING_COMPLETED',
    tapingMechanicalInProcess: 'TAPING_MECHANICAL_INPROCESS',
    tapingMechanicalCompleted: 'TAPING_MECHANICAL_COMPLETED',
  };

  testComplete(value: any) {
    const buttons = localStorage.getItem('BUTTONS')!;
    this.buttons = JSON.parse(buttons);

    this.buttons = this.buttons.map((ele: any) => {
      ele.isComplete = ele.name === value ? true : ele.isComplete;
      return ele;
    });
    localStorage.setItem('BUTTONS', JSON.stringify(this.buttons));
  }

  postFqaProcessLog(reqBody: any) {
    return this.http.post(
      environment.baseUrl + '/v1/operations_module/fqa/fqa_process_log',
      reqBody
    );
  }
  postRestoBoxBind(reqBody: any) {
    return this.http.post(
      environment.baseUrl + '/v1/operations_module/fqa/resto_box_binded',
      reqBody
    );
  }

  postRestoQty(reqBody: any) {
    return this.http.post(
      environment.baseUrl + '/v1/operations_module/fqa/resto_qty_update',
      reqBody
    );
  }

  postPackingStatus(reqBody: any) {
    return this.http.post(
      environment.baseUrl + '/v1/operations_module/fqa/packing_status',
      reqBody
    );
  }

  getResult() {
    return this.http.get(environment.impulseBaseUrl + '/result');
  }
}
