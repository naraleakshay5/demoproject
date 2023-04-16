import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TemperingService {
  private ispoStage = new Subject<any>();

  constructor(private http: HttpClient) {}

  machineInterlocks = {
    BATCH_PRODUCTION_START_ON_MACHINE:
      '.process_monitoring.OTP_PROC_INTL_Batch_Production_Start_on_Machine',
    PROC_INTL_STOP_MACHINE: '.process_monitoring.OTP_PROC_INTL_Stop_Machine',
    PROC_INTL_BATCH_COMPLETED:
      '.process_monitoring.OTP_PROC_INTL_Batch_Completed',
  };

  sentClickEventpoStageCompleted(stage_url: string, po_id: number) {
    const po_stage = {
      stage_url: stage_url,
      po_id: po_id,
    };
    this.ispoStage.next(po_stage);
  }

  getClickEventpoStageCompleted(): Observable<any> {
    return this.ispoStage.asObservable();
  }

  setMultiplePoInProces(record: any) {
    return this.http.post(
      environment.baseUrl +
        '/v1/operations_module/common/start_all_production_order/',
      record
    );
  }

  getAllPoIds(poId: number) {
    return this.http.get(
      environment.baseUrl +
        '/v1/operations_module/tempering_tray/get_poids/' +
        poId
    );
  }

  // kept to reuse
  // getAllScannedPoIds(poId: number) {
  //   return this.http.get(
  //     environment.baseUrl +
  //       '/v1/operations_module/tempering_tray/get_poids/' +
  //       poId
  //   );
  // }

  getAllowedTrolleys(processId: number) {
    return this.http.get(
      environment.baseUrl +
        '/v1/operations_module/common/allowed_material_carrier/' +
        processId
    );
  }

  createJob(trolley_id: any) {
    return this.http.post(
      environment.baseUrl + '/v1/operations_module/tempering_tray/create_job/',
      {
        trolleyId: trolley_id,
      }
    );
  }

  // kept to reuse
  // getAllTrolleyDetails(record: any) {
  //   return this.http.post(
  //     environment.baseUrl +
  //       '/v1/operations_module/tempering_tray/get_scanned_tray_details/',
  //     {
  //       record: record,
  //     }
  //   );
  // }

  getAllTrolleyDetails(porocessId: number, trolleyId: number) {
    return this.http.get(
      environment.baseUrl +
        '/v1/operations_module/tempering_tray/get_scanned_tray_details/' +
        porocessId +
        '/' +
        trolleyId
    );
  }

  addTrolleyInsideOven(trolleyId: any) {
    return this.http.post(
      environment.baseUrl + '/v1/operations_module/tempering_tray/create_job/',
      {
        trolley_id: trolleyId,
      }
    );
  }
}
