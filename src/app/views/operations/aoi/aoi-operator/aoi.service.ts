import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AoiService {
  isLoadedOnce: number = 0;

  constructor(private http: HttpClient) {}

  machineInterlocks = {
    BATCH_PRODUCTION_START_ON_MACHINE:
      '.process_monitoring.OTP_PROC_INTL_Batch_Production_Start_on_Machine',
    PROC_INTL_STOP_MACHINE: '.process_monitoring.OTP_PROC_INTL_Stop_Machine',
    PROC_INTL_BATCH_COMPLETED:
      '.process_monitoring.OTP_PROC_INTL_Batch_Completed',
  };

  getRecipeData(sachId: number) {
    return this.http.get(
      environment.baseUrl +
        '/v1/operations_module/aoi/get_aoi_testing_parameter/' +
        sachId
    );
  }

  getTools(processId: number, sachId: number) {
    return this.http.get(
      environment.baseUrl +
        '/v1/operations_module/tool/aoi_required_tools/' +
        processId +
        '/' +
        sachId
    );
  }

  getLeadSpace() {
    return this.http.get(
      environment.baseUrl + '/v1/operations_module/common/get_lead_space/'
    );
  }

  postCounts(data: any) {
    return this.http.post(
      environment.baseUrl +
        '/v1/operations_module/aoi_supervisor/log_rejected_bin_count_pre_test/',
      data
    );
  }
}
