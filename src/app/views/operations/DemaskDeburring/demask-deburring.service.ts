import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DemaskDeburringService {
  private ispoStage = new Subject<any>();

  constructor(private http: HttpClient) {}

  machineInterlocks = {
    BATCH_PRODUCTION_START_ON_MACHINE:
      '.process_monitoring.OTP_PROC_INTL_Batch_Production_Start_on_Machine',
    PROC_INTL_STOP_MACHINE: '.process_monitoring.OTP_PROC_INTL_Stop_Machine',
    PROC_INTL_BATCH_COMPLETED:
      '.process_monitoring.OTP_PROC_INTL_Batch_Completed',
  };

  getActualWheelCount(poId: number) {
    return this.http.get(
      environment.baseUrl +
        '/v1/operations_module/common/material_carrier/' +
        poId
    );
  }

  getAlottedTrays(processId: number, poId: number) {
    return this.http.get(
      environment.baseUrl +
        '/v1/operations_module/common/material_carrier_binded/' +
        processId +
        '/' +
        poId
    );
  }

  getAllowedBinsTrays(processId: number) {
    return this.http.get(
      environment.baseUrl +
        '/v1/operations_module/common/allowed_material_carrier/' +
        processId
    );
  }

  postOutputCarrierBin(data: any) {
    const url =
      environment.baseUrl + '/v1/operations_module/common/material_carrier_log';
    return this.http.post(url, data);
  }

  getWheelDetails(processId: number, poId: number) {
    const url =
      environment.baseUrl +
      '/v1/operations_module/common/material_carrier_binded/' +
      processId +
      '/' +
      poId;
    return this.http.get(url);
  }

  getTemperatureDetails(sachId: number, processId: any) {
    const url =
      environment.baseUrl +
      '/v1/operations_module/recipe/temperature/' +
      sachId +
      '/' +
      processId;
    return this.http.get(url);
  }

  printLabels(
    machineId: number,
    poId: number,
    po: string,
    sach: string,
    quantity: number,
    temperature: any,
    trayCount: number
  ) {
    return this.http.post(
      environment.baseUrl +
        '/v1/operations_module/label/white_label/' +
        machineId +
        '/' +
        poId,
      {
        poNumber: po,
        sachNumber: sach,
        poQuantity: quantity,
        // temperature: temperature,
        totalBins: trayCount,
      }
    );
  }
}
