import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WindingService {
  machId = 7;
  private ispoStage = new Subject<any>();

  constructor(private http: HttpClient) {}

  machineInterlocks = {
    DPS_BYPASS: '.recipe_handshake_signals.OTP_DPS_BYPASS',
    RECIPE_REMOTE: '.recipe_handshake_signals.OTP_RECIPE_REMOTE',
    BATCH_START_CHECKS_COMPLETED:
      '.process_monitoring.OTP_PROC_INTL_Intial_Batch_Start_checks_completed',
    BATCH_PRODUCTION_START_ON_MACHINE:
      '.process_monitoring.OTP_PROC_INTL_Batch_Production_Start_on_Machine',
    DPS_DRY_RUN_MODE: '.recipe_handshake_signals.OTP_DPS_Dry_Run_Mode',
    PROC_INTL_STOP_MACHINE: '.process_monitoring.OTP_PROC_INTL_Stop_Machine',
    PROC_INTL_BATCH_COMPLETED:
      '.process_monitoring.OTP_PROC_INTL_Batch_Completed',
    MACHINE_STOPPED_DUE_TO_SCHEDULED_BREAKDOWN:
      '.machine_monitoring.OTP_MC_STATE_MON_Machine_Stopped_due_to_scheduled_Breakdown',
    SPC_Check_successfully_Completed:
      'OTP_PROC_INTL_SetUp_SPC_Check_successfully_Completed',
  };

  sentClickEventpoStageCompleted(url_slug: string) {
    this.ispoStage.next(url_slug);
  }

  getClickEventpoStageCompleted(): Observable<any> {
    return this.ispoStage.asObservable();
  }

  getMaterialCheckPo(processId: number, sachId: number) {
    return this.http.get(
      environment.baseUrl +
        '/v1/operations_module/material/film_bag/' +
        processId +
        '/' +
        sachId
    );
  }

  insertFilmBag(data: any) {
    const url =
      environment.baseUrl + '/v1/operations_module/material/film_bag/';
    return this.http.post(url, data);
  }

  insertFilmReel(data: any) {
    const url =
      environment.baseUrl + '/v1/operations_module/material/film_reel';
    return this.http.post(url, data);
  }

  getToolCheckPo(sachId: any) {
    return this.http.get(
      environment.baseUrl +
        '/v1/operations_module/tool/winding_required/' +
        sachId
    );
  }

  // getSpcMeasurement(poId: number) {
  //   return this.http.get(
  //     environment.baseUrl + '/v1/windingfunctional/getspc/' + poId
  //   );
  // }

  // VisualInspection(body: any, poId: number) {
  //   return this.http.post(
  //     environment.baseUrl + '/v1/windingfunctional/getspcvisual/' + poId,
  //     body
  //   );
  // }

  materialCarrierBinded(processId: number, poId: number) {
    return this.http.get(
      environment.baseUrl +
        '/v1/operations_module/common/material_carrier_binded/' +
        processId +
        '/' +
        poId
    );
  }

  addOutputCarrier(body: any) {
    const url =
      environment.baseUrl + '/v1/operations_module/common/material_carrier_log';
    return this.http.post(url, body);
  }

  poCheckOut(poId: number, machienId: number) {
    return this.http.get(
      environment.baseUrl +
        '/v1/operations_module/common/production_order/init_setup_complete/' +
        poId +
        '/' +
        machienId
    );
  }

  postPrePressMode(reqBody: any) {
    return this.http.post(
      environment.baseUrl + '/v1/operations_module/common/pre_press_mode_log',
      reqBody
    );
  }
}
