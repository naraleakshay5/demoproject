import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AoiSupervisorService {
  constructor(private http: HttpClient) {}

  getProduction(processId: any) {
    return this.http.get(
      environment.baseUrl +
        '/v1/operations_module/common/get_production_order_for_aoi_sorting/' +
        processId
    );
  }

  getProcessType() {
    return this.http.get(
      environment.baseUrl +
        '/v1/operations_module/aoi_supervisor/get_aoi_process_type/'
    );
  }

  getProcessors() {
    return this.http.get(
      environment.baseUrl +
        '/v1/operations_module/aoi_supervisor/get_aoi_processors/'
    );
  }

  postSorting(body: any) {
    return this.http.post(
      environment.baseUrl +
        '/v1/operations_module/aoi_supervisor/log_aoi_po_type',
      body
    );
  }

  postProcessor(body: any) {
    return this.http.post(
      environment.baseUrl +
        '/v1/operations_module/aoi_supervisor/log_aoi_processor',
      body
    );
  }

  logStage(body: any) {
    return this.http.post(
      environment.baseUrl +
        '/v1/operations_module/aoi_supervisor/log_aoi_process_stage',
      body
    );
  }

  printData(data: any) {
    return this.http.post(
      environment.baseUrl +
        '/v1/operations_module/aoi_supervisor/log_rejected_bin_count_pre_test',
      data
    );
  }

  getGoodBins(po_id: number) {
    return this.http.get(
      environment.baseUrl +
        '/v1/operations_module/aoi_supervisor/get_good_bin_count/' +
        po_id
    );
  }

  postCheckout(processId: number, machineId: number, poId: number) {
    return this.http.post(
      environment.baseUrl +
        '/v1/operations_module/aoi_supervisor/log_rejected_bin_count_pre_test/' +
        processId +
        '/' +
        machineId +
        '/' +
        poId,
      {}
    );
  }
}
