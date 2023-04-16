import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AssemblyService {
  private ispoStage = new Subject<any>();

  constructor(private http: HttpClient) {}

  machineInterlocks = {
    BATCH_START_CHECKS_COMPLETED:
      '.process_monitoring.OTP_PROC_INTL_Intial_Batch_Start_checks_completed',
    BATCH_PRODUCTION_START_ON_MACHINE:
      '.process_monitoring.OTP_PROC_INTL_Batch_Production_Start_on_Machine',
    PROC_INTL_STOP_MACHINE: '.process_monitoring.OTP_PROC_INTL_Stop_Machine',
    PROC_INTL_BATCH_COMPLETED:
      '.process_monitoring.OTP_PROC_INTL_Batch_Completed',
    IMPLUSE_TEST_SAMPLE:
      '.process_monitoring.OTP_PROC_INTL_IMPULSE_TEST_SAMPLE',
    ALLOW_EMPTY_BAR: '.process_monitoring.OTP_PROC_INTL_Allow_Empty_Bar',
  };

  sentClickEventpoStageCompleted(stageUrl: string, poId: number) {
    const po_stage = {
      stage_url: stageUrl,
      po_id: poId,
    };
    this.ispoStage.next(po_stage);
  }

  getClickEventpoStageCompleted(): Observable<any> {
    return this.ispoStage.asObservable();
  }

  tools(sachId: number) {
    return this.http.get(
      environment.baseUrl +
        '/v1/operations_module/tool/assembly_required/' +
        sachId
    );
  }

  getTools(sachId: number) {
    return this.http.get(
      environment.baseUrl +
        '/v1/operations_module/tool/assembly_required_tools/' +
        sachId
    );
  }

  material(sachId: number, type: string) {
    return this.http.get(
      environment.baseUrl +
        '/v1/operations_module/material/assembly_box/' +
        sachId +
        '/' +
        type
    );
  }

  postBins(body: any) {
    return this.http.post(
      environment.baseUrl + '/v1/operations_module/common/material_carrier_log',
      body
    );
  }

  getSPCResults(
    sachId: number,
    processId: number,
    poId: number,
    testType: number
  ) {
    return this.http.get(
      environment.baseUrl +
        '/v1/operations_module/spc/get_spc_results/' +
        sachId +
        '/' +
        processId +
        '/' +
        poId +
        '/' +
        testType
    );
  }

  createJob(reqBody: any) {
    return this.http.post(
      environment.baseUrl + '/v1/operations_module/job/',
      reqBody
    );
  }

  job(reqBody: any) {
    return this.http.post(
      environment.baseUrl + '/v1/operations_module/job',
      reqBody
    );
  }

  completeJob(jobId: any) {
    return this.http.get(
      environment.baseUrl + '/v1/operations_module/job/' + jobId
    );
  }

  scannedJob(jobId: any) {
    return this.http.get(
      environment.baseUrl + '/v1/operations_module/job/' + jobId
    );
  }
}
