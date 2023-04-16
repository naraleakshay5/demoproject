import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HotPressService {
  trays = [
    {
      Trey_Location: 'Top tray',
      Sample_size: 2,
      Sample_ok: 0,
      Sample_not_ok: 0,
    },
    {
      Trey_Location: 'Bottom tray',
      Sample_size: 2,
      Sample_ok: 0,
      Sample_not_ok: 0,
    },
  ];

  machineInterlocks = {
    // BATCH_START_CHECKS_COMPLETED:
    //   '.process_monitoring.OTP_PROC_INTL_Intial_Batch_Start_checks_completed',
    BATCH_PRODUCTION_START_ON_MACHINE:
      '.process_monitoring.OTP_PROC_INTL_Batch_Production_Start_on_Machine',
    PROC_INTL_STOP_MACHINE: '.process_monitoring.OTP_PROC_INTL_Stop_Machine',
    PROC_INTL_BATCH_COMPLETED:
      '.process_monitoring.OTP_PROC_INTL_Batch_Completed',
  };
  constructor(private http: HttpClient) {}

  getScrapReasons(processId: number) {
    return this.http.get(
      environment.baseUrl + '/v1/windingfunctional/scraplist/' + processId
    );
  }

  getAllGrills() {
    return this.http.get(
      environment.baseUrl + '/v1/operations_module/hp_grill/get_all'
    );
  }

  getSuggestedGrill(sachId: number) {
    return this.http.get(
      environment.baseUrl +
        '/v1/operations_module/hp_grill/get_suggested/' +
        sachId
    );
  }

  postGrill(reqBody: any) {
    return this.http.post(
      environment.baseUrl + '/v1/operations_module/hp_grill/log_grill_usage/',
      reqBody
    );
  }

  postQualityCheck(sachId: number, data: any) {
    return this.http.post(
      environment.baseUrl + '/v1/hotpress/qualitycheck/' + sachId,
      data
    );
  }

  getAllowedBins() {
    return this.http.get(environment.baseUrl + '/v1/hotpress/getallowedbins');
  }

  postScannedBin(params: any, data: any) {
    return this.http.post(
      environment.baseUrl +
        '/v1/hotpress/insertbin/' +
        params.machineId +
        '&' +
        params.poId,
      data
    );
  }

  getScannedBins(poId: number) {
    return this.http.get(environment.baseUrl + '/v1/hotpress/scanbins/' + poId);
  }

  postScrap(params: any, data: any) {
    return this.http.post(
      environment.baseUrl +
        '/v1/hotpress/bookscrap/' +
        params.machineId +
        '&' +
        params.poId,
      { scrap: data }
    );
  }
}
