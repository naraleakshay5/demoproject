import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ElTestingService {
  isLoadedOnce: number = 0;
  machineInterlocks = {
    BATCH_PRODUCTION_START_ON_MACHINE:
      '.process_monitoring.OTP_PROC_INTL_Batch_Production_Start_on_Machine',
    PROC_INTL_STOP_MACHINE: '.process_monitoring.OTP_PROC_INTL_Stop_Machine',
    PROC_INTL_BATCH_COMPLETED:
      '.process_monitoring.OTP_PROC_INTL_Batch_Completed',
    PROC_INTL_HV_ENABLE: '.process_monitoring.OTP_PROC_MON_HV_Enable',
    PROC_INTL_HV_RESET_COUNT:
      '.machine_monitoring.PTO_MC_STATE_MON_HV_Count_Reset',
    // kept for further discussion
    // PROC_INTL_IR_RESET_COUNT:
    //   '.machine_monitoring.PTO_MC_STATE_MON_IR_Count_Reset',
    // PROC_INTL_CAP_RESET_COUNT:
    //   '.machine_monitoring.PTO_MC_STATE_MON_Cap_Count_Reset',
    // PROC_INTL_TAN_D_1K_RESET_COUNT:
    //   '.machine_monitoring.PTO_MC_STATE_MON_TanD1K_Count_Reset',
    // PROC_INTL_TAN_D_10K_100k_RESET_COUNT:
    //   '.machine_monitoring.PTO_MC_STATE_MON_TanD10K_100K_Count_Reset',
    PROC_INTL_COUNT_RESET: '.machine_monitoring.OTP_MC_STATE_MON_Count_Reset',
  };
  reTestCount: number = 2;
  constructor(private http: HttpClient) {}

  getJson(sachId: number) {
    return this.http.get(
      environment.baseUrl + '/v1/operations_module/testing/json/' + sachId
    );
  }

  getYearCode() {
    return this.http.get(
      environment.baseUrl + '/v1/operations_module/testing/getYearCode'
    );
  }

  getMonthCode() {
    return this.http.get(
      environment.baseUrl + '/v1/operations_module/testing/getMonthCode'
    );
  }

  getTools(processId: number, sachId: string) {
    return this.http.get(
      environment.baseUrl +
        '/v1/operations_module/testing/getRequiredTools/' +
        processId +
        '/' +
        sachId
    );
  }

  getLeadSpace() {
    return this.http.get(
      environment.baseUrl + '/v1/operations_module/common/get_lead_space'
    );
  }

  getLinkedBins(processId: number, poId: number) {
    return this.http.get(
      environment.baseUrl +
        '/v1/operations_module/common/material_carrier_binded/' +
        processId +
        '/' +
        poId
    );
  }

  postInputScannedBin(data: any) {
    return this.http.post(
      environment.baseUrl +
        '/v1/operations_module/common/material_carrier_log/',
      data
    );
  }

  doSpcCheck(
    processId: number,
    poId: number,
    spcType: string,
    elementCount: number
  ) {
    return this.http.post(
      environment.baseUrl +
        '/v1/operations_module/spc/log_spc_schedule/' +
        processId +
        '/' +
        poId,
      {
        spc_type: spcType,
        element_count: elementCount,
      }
    );
  }

  getLabelDetails(sachId: number) {
    const url =
      environment.baseUrl +
      '/v1/operations_module/label/label_detail/' +
      sachId;
    return this.http.get(url);
  }

  printLabels(
    machineId: number,
    poId: number,
    po: string,
    sach: string,
    quantity: number
  ) {
    return this.http.post(
      environment.baseUrl +
        '/v1/operations_module/label/po_print/' +
        machineId +
        '/' +
        poId,
      {
        PO: po,
        SachId: sach,
        quantity: quantity,
      }
    );
  }
}
