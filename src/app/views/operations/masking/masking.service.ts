import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MaskingService {
  totalWheelsCount!: number;
  currentWheelCount: number = 1;
  wheelCompleted: boolean = false;

  constructor(private http: HttpClient) {}

  machineInterlocks = {
    BATCH_PRODUCTION_START_ON_MACHINE:
      '.process_monitoring.OTP_PROC_INTL_Batch_Production_Start_on_Machine',
    PROC_INTL_STOP_MACHINE: '.process_monitoring.OTP_PROC_INTL_Stop_Machine',
    PROC_INTL_BATCH_COMPLETED:
      '.process_monitoring.OTP_PROC_INTL_Batch_Completed',
  };

  getMaterialCheckPo(sachId: string) {
    return this.http.get(
      environment.baseUrl + '/v1/operations_module/material/materials/' + sachId
    );
  }

  getToolCheckPo(sachId: string) {
    return this.http.get(
      environment.baseUrl +
        '/v1/operations_module/tool/masking_required/' +
        sachId
    );
  }

  getWheelDetails(processId: number, poId: number) {
    return this.http.get(
      environment.baseUrl +
        '/v1/operations_module/common/material_carrier_binded/' +
        processId +
        '/' +
        poId
    );
  }

  getTotalWheelDetails(processId: number) {
    return this.http.get(
      environment.baseUrl +
        '/v1/operations_module/common/allowed_material_carrier/' +
        processId
    );
  }

  getWheelOperationType() {
    return this.http.get(
      environment.baseUrl + '/v1/operations_module/wheel/wheel_operations'
    );
  }

  wheelLogOperation(po_id: number, wheelId: any, wheel_operation_id: any) {
    return this.http.post(
      environment.baseUrl + '/v1/operations_module/wheel/wheel_operation_log',
      {
        production_order_id: po_id,
        wheel_carrier_id: wheelId,
        wheel_operation_id: wheel_operation_id,
      }
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

  getWheelCount(sachId: string, poId: number) {
    const url =
      environment.baseUrl +
      '/v1/operations_module/label/wheel_count/' +
      sachId +
      '/' +
      poId;
    return this.http.get(url);
  }

  getLabelDetails(sachId: string) {
    const url =
      environment.baseUrl +
      '/v1/operations_module/label/label_detail/' +
      sachId;
    return this.http.get(url);
  }

  printLabels(
    machineId: number,
    poId: number,
    totalWheelCount: number,
    po: string,
    sach: string,
    quantity: number,
    labelName: string
  ) {
    return this.http.post(
      environment.baseUrl +
        '/v1/operations_module/label/po_print/' +
        machineId +
        '/' +
        poId,
      {
        totalWheel: totalWheelCount,
        PO: po,
        SachId: sach,
        quantity: quantity,
        labelName: labelName,
      }
    );
  }

  postWheel(machineId: any, poId: any, processId: any, wheelId: number) {
    let option = {
      params: new HttpParams().set('type', 'wheel'),
    };

    return this.http.post(
      environment.baseUrl + '/v1/operations_module/common/material_carrier_log',
      {
        material_carrier_id: wheelId,
        production_order_id: poId,
        process_id: processId,
        machine_id: machineId,
      },
      option
    );
  }

  disassociateWheel(
    machineId: number,
    poId: number,
    processId: number,
    wheelId: any
  ) {
    return this.http.post(
      environment.baseUrl + '/v1/operations_module/common/disassociate_wheel',
      {
        material_carrier_id: wheelId,
        production_order_id: poId,
        process_id: processId,
        machine_id: machineId,
      }
    );
  }
}
