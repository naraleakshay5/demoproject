import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TapingService {
  constructor() {}

  machineInterlocks = {
    // BATCH_START_CHECKS_COMPLETED:
    //   '.process_monitoring.OTP_PROC_INTL_Intial_Batch_Start_checks_completed',
    BATCH_PRODUCTION_START_ON_MACHINE:
      '.process_monitoring.OTP_PROC_INTL_Batch_Production_Start_on_Machine',
    PROC_INTL_STOP_MACHINE: '.process_monitoring.OTP_PROC_INTL_Stop_Machine',
    PROC_INTL_BATCH_COMPLETED:
      '.process_monitoring.OTP_PROC_INTL_Batch_Completed',
  };
}
