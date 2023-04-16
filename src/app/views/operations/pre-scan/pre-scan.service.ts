import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PreScanService {
  constructor(private http: HttpClient) {}

  postPreScan(poId: number) {
    return this.http.post(environment.baseUrl + '/v1/prescan/' + poId, {});
  }

  getPreScanBins(processId: number, poId: number) {
    return this.http.get(
      environment.baseUrl +
        '/v1/operations_module/common/material_carrier_binded/' +
        processId +
        '/' +
        poId
    );
  }

  postPreScanBins(poId: number) {
    return this.http.post(
      environment.baseUrl + '/v1/prescan/scanbin/' + poId,
      {}
    );
  }

  getPreScanMaskingBins(machineId: number, poId: number) {
    return this.http.get(
      environment.baseUrl + '/v1/prescanmasking/getbins/' + poId
    );
  }

  postPreScanMaskingBins(poId: number) {
    return this.http.post(
      environment.baseUrl + '/v1/prescanmasking/scanbin/' + poId,
      {}
    );
  }
}
