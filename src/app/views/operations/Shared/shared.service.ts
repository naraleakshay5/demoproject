import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private ispoStage = new Subject<any>();
  currentWheel: any = null;

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
    Machine_Alarm_reset:
      '.machine_monitoring.OTP_MC_STATE_MON_Machine_Alarm_reset',
  };

  testParametersBySubType = {
    SPC: 'SPC',
    MEASUREMENT: 'MEASUREMENT',
    GAUGE: 'GAUGE',
    PRINTING: 'PRINTING',
    VISUAL: 'VISUAL',
    STAGGER: 'STAGGER',
    AFTER_IMPULSE: 'AFTER IMPULSE',
    BEFORE_IMPULSE: 'BEFORE IMPULSE',
    LEAD_LENGTH: 'LEAD LENGTH',
    PITCH: 'PITCH',
    GRILL: 'Grill',
  };

  operationalLOgsActions = {
    SCANNED_SUCCESS: 'scanned successfully.',
    SCANNED_FAIL: 'scanned fail.',
    SCANNED_ALREADY: 'scanned already.',
    CORRECT_GRILL: 'Correct grill selected.',
    WRONG_GRILL: 'Wrong grill selected.',
  };

  sentClickEventpoStageCompleted(stage_url: string) {
    this.ispoStage.next(stage_url);
  }

  getClickEventpoStageCompleted(): Observable<any> {
    return this.ispoStage.asObservable();
  }

  getPoList(machineId: number, processId: number) {
    return this.http.get(
      environment.baseUrl +
        '/v1/operations_module/common/production_order/' +
        processId +
        '/' +
        machineId
    );
  }

  getPoListPublic(machineId: number, processId: number) {
    return this.http.get(
      environment.baseUrl +
        '/public/production_order/' +
        processId +
        '/' +
        machineId
    );
  }

  getCompletedPoList(machineId: number) {
    return this.http.get(
      environment.baseUrl + '/public/production_order/complete_po/' + machineId
    );
  }

  setPoInProcess(id: any, machineId: number) {
    return this.http.get(
      environment.baseUrl +
        '/v1/operations_module/common/production_order/start/' +
        id +
        '/' +
        machineId
    );
  }

  setPosInProces(productionOrderIds: any, machineId: number) {
    const apiSetPosInProgress =
      '/v1/operations_module/common/production_order/start_multi';
    return this.http.post(environment.baseUrl + apiSetPosInProgress, {
      machine_id: machineId,
      production_order_ids: productionOrderIds,
    });
  }

  getSpcCallSchdule(processId: number) {
    return this.http.get(
      environment.baseUrl +
        '/v1/operations_module/spc/get_spc_schedule/' +
        processId
    );
  }

  getScrapReasons(processid: any) {
    return this.http.get(
      environment.baseUrl +
        '/v1/operations_module/common/scrap_reason/' +
        processid
    );
  }

  postScrapReasons(data: any) {
    return this.http.post(
      environment.baseUrl + '/v1/operations_module/common/scrap_reason/',
      data
    );
  }

  getPreScanPublicPoList() {
    return this.http.get(environment.baseUrl + '/public/prescan/');
  }

  getPreScanPoList() {
    return this.http.get(environment.baseUrl + '/v1/prescan');
  }

  getPreScanById(processId: number, poId: number) {
    return this.http.get(
      environment.baseUrl +
        '/v1/operations_module/common/material_carrier_binded/' +
        processId +
        '/' +
        poId
    );
  }

  getHotPressPublicPoList() {
    return this.http.get(environment.baseUrl + '/public/hotpress');
  }

  getHotPressPoList() {
    return this.http.get(environment.baseUrl + '/v1/hotpress');
  }

  getPoListPubliForPreScanMasking() {
    return this.http.get(environment.baseUrl + '/public/prescanmasking/');
  }

  getPreScanMaskingPoList() {
    return this.http.get(environment.baseUrl + '/v1/prescanmasking');
  }

  getPreScanMaskingById(poId: number) {
    return this.http.get(environment.baseUrl + '/v1/prescanmasking/' + poId);
  }

  poStage(processId: number, poId: number) {
    return this.http.get(
      environment.baseUrl +
        '/v1/operations_module/common/production_order_stage/' +
        processId +
        '/' +
        poId
    );
  }
  postPoStage(poId: number, stageId: number) {
    return this.http.post(
      environment.baseUrl +
        '/v1/operations_module/common/production_order_stage/complete/' +
        poId +
        '/' +
        stageId,
      {}
    );
  }

  getAllowdBins(processId: number) {
    return this.http.get(
      environment.baseUrl +
        '/v1/operations_module/common/allowed_material_carrier/' +
        processId
    );
  }

  getLoadRecipe(machine_id: number) {
    return this.http.get(
      environment.baseUrl +
        '/v1/operations_module/recipe/product_recipe/' +
        machine_id
    );
  }

  getSpcvisualInspect(processId: number, type: string) {
    return this.http.get(
      environment.baseUrl +
        '/v1/operations_module/common/spc_visual/' +
        processId +
        '/' +
        type
    );
  }

  postSpcVisualResults(poId: number, reqBody: any) {
    return this.http.post(
      environment.baseUrl + '/v1/operations_module/common/spc_visual/' + poId,
      reqBody
    );
  }

  materialCarrierBinded(processId: number, poId: number, type?: any) {
    let option = {
      params: {},
    };

    if (type) {
      option.params = new HttpParams().set('type', type);
    }

    return this.http.get(
      environment.baseUrl +
        '/v1/operations_module/common/material_carrier_binded/' +
        processId +
        '/' +
        poId,
      option
    );
  }

  postBins(body: any, type?: any) {
    let option = {
      params: {},
    };

    if (type) {
      option.params = new HttpParams().set('type', type);
    }
    return this.http.post(
      environment.baseUrl + '/v1/operations_module/common/material_carrier_log',
      body,
      option
    );
  }

  labelPrinting(machineId: number, poId: number, reqObj: any) {
    return this.http.post(
      environment.baseUrl +
        '/v1/operations_module/label/white_label/' +
        machineId +
        '/' +
        poId,
      reqObj
    );
  }

  getSpcSchedule(processId: number, poId: number) {
    return this.http.get(
      environment.baseUrl +
        '/v1/operations_module/spc/get_schedule/' +
        processId +
        '/' +
        poId
    );
  }

  getReasons(processId: number, type: string) {
    return this.http.get(
      environment.baseUrl +
        '/v1/operations_module/reasons/get/' +
        processId +
        '/' +
        type
    );
  }

  postReason(reqBody: any) {
    return this.http.post(
      environment.baseUrl + '/v1/operations_module/reasons/log/',
      reqBody
    );
  }

  getToolCheckPo(sachId: any) {
    return this.http.get(
      environment.baseUrl +
        '/v1/operations_module/tool/get_tools_by_sach_id/' +
        sachId
    );
  }

  postTool(reqBody: any) {
    return this.http.post(
      environment.baseUrl + '/v1/operations_module/tool/log_tool_usage/',
      reqBody
    );
  }

  getTestParameters(reqBody: any) {
    return this.http.post(
      environment.baseUrl +
        '/v1/operations_module/common/test/get_test_parameters',
      reqBody
    );
  }

  postTestResult(reqBody: any) {
    return this.http.post(
      environment.baseUrl + '/v1/operations_module/common/test/log_test_result',
      reqBody
    );
  }

  getTestResult(reqBody: any) {
    return this.http.post(
      environment.baseUrl + '/v1/operations_module/common/test/get_test_result',
      reqBody
    );
  }

  poCheckOut(processId: any, machineId: any, poId: any) {
    return this.http.post(
      environment.baseUrl +
        '/v1/operations_module/common/log_po_as_complete/' +
        processId +
        '/' +
        machineId +
        '/' +
        poId,
      {}
    );
  }

  releaseCarriers(reqBody: any) {
    return this.http.post(
      environment.baseUrl + '/v1/operations_module/common/release_carriers/',
      reqBody
    );
  }
}
