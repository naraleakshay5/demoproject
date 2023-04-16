import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OfflineClearingService {
  constructor(private http: HttpClient) {}

  machineInterlocks = {
    BATCH_PRODUCTION_START_ON_MACHINE:
      '.process_monitoring.OTP_PROC_INTL_Batch_Production_Start_on_Machine',
    PROC_INTL_STOP_MACHINE: '.process_monitoring.OTP_PROC_INTL_Stop_Machine',
    PROC_INTL_BATCH_COMPLETED:
      '.process_monitoring.OTP_PROC_INTL_Batch_Completed',
  };

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
}
