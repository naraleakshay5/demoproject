import { Injectable } from '@angular/core';
import {
  delay,
  Observable,
  of,
  retryWhen,
  Subject,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { environment } from '../environments/environment';
import { AppStorage } from './storage.service';
export const WS_ENDPOINT = environment.wsEndpoint;

export interface Node {
  nodeId?: string;
  name?: string;
  value?: string | number | boolean;
  datatype?: string;
}

export interface Message {
  op: string;
  nodes?: Node[];
  machine?: string;
}
export interface machineData {
  id: number;
  name: string;
  node_prefix: string;
  slug: string;
}

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  status: Subject<String> = new Subject<String>();
  private connection$!: WebSocketSubject<any> | null;
  RETRY_SECONDS = 1000;

  destroyed$ = new Subject();
  machineRunningStatus: Subject<String> = new Subject<String>();
  machinePartBatchCount: Subject<number> = new Subject<number>();
  hvRejectionPartsCount: Subject<number> = new Subject<number>();
  irRejectionPartsCount: Subject<number> = new Subject<number>();
  tanD1KRejectionPartsCount: Subject<number> = new Subject<number>();
  tanD10K100KRejectionPartsCount: Subject<number> = new Subject<number>();
  capRejectionPartsCount: Subject<number> = new Subject<number>();
  singleLeadRejectionPartsCount: Subject<number> = new Subject<number>();
  other1RejectionPartsCount: Subject<number> = new Subject<number>();
  other2RejectionPartsCount: Subject<number> = new Subject<number>();
  doubleRejectionPartsCount: Subject<number> = new Subject<number>();
  machinePartsBatchCount: Subject<number> = new Subject<number>();
  machineBadPartsBatchCount: Subject<number> = new Subject<number>();
  machineCycleTime: Subject<number> = new Subject<number>();
  machinePartsRejectBatchCount: Subject<number> = new Subject<number>();
  machinePartsGoodBatchCount: Subject<number> = new Subject<number>();
  boxComplete: Subject<number> = new Subject<number>();
  machinePartsBoxCount: Subject<number> = new Subject<number>();
  machineCuringPartBatchCount: Subject<number> = new Subject<number>();
  wheelCount: Subject<number> = new Subject<number>();
  intervalMachineStatus: any = {};
  intervalMachineAlarms: any = {};

  machineData: machineData[] = [];

  wsStatuses: any = {
    '0': 'Not Connected',
    '1': 'Connected',
    '2': 'Disconnected',
    '3': 'Reconnecting',
  };
  machineHotPressExpectedTime: Subject<number> = new Subject<number>();
  machineRunningTimeInHrs: Subject<number> = new Subject<number>();
  machineRunningTimeInMin: Subject<number> = new Subject<number>();
  machineHotPressCurrentTime: Subject<number> = new Subject<number>();
  machineSummary: Subject<any> = new Subject<any>();
  machineDataPrimary: machineData[];
  alarmCode12: Subject<boolean> = new Subject<boolean>();
  indexingRunning: Subject<boolean> = new Subject<boolean>();
  recipeLoaded: Subject<object> = new Subject<object>();
  tagsWritten: Subject<object> = new Subject<object>();
  feedFinishMode: Subject<boolean> = new Subject<boolean>();
  alarms: Subject<object> = new Subject<object>();
  alarmsCuring: Subject<object> = new Subject<object>();

  constructor(private appStorage: AppStorage) {
    this.machineData = this.appStorage.get('MACHINE')!;
    this.machineDataPrimary = this.machineData?.filter(
      (ele: any) => ele.is_primary === true
    );

    this.machineRunningStatus.next('Loading..');
    this.status.next('Loading..');

    this.connect()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((response) => {
        if (response.op === 'GET_MACHINE_RUNNING_STATUS') {
          const status =
            response.data === true || response.data === 'true'
              ? 'Running'
              : 'Stop';
          this.machineRunningStatus.next(status);
        } else if (response.op === 'WRITE_TAGS') {
          this.tagsWritten.next(response);
        } else if (response.op === 'GET_MACHINE_SUMMARY') {
          // Todo: Remove this.
          this.machineSummary.next(response.data);

          response.data.forEach((node: any) => {
            switch (node.name) {
              case 'machine_running_status':
                const status =
                  node.value === true || node.value === 'true'
                    ? 'Running'
                    : 'Stop';
                this.machineRunningStatus.next(status);
                break;
              case 'sum_parts_batch':
                this.machinePartsBatchCount.next(node.value);
                break;
              case 'sum_bad_parts_batch':
                this.machineBadPartsBatchCount.next(node.value);
                break;
              case 'cycle_time':
                this.machineCycleTime.next(node.value);
                break;
              case 'sum_rej_parts_batch':
                this.machinePartsRejectBatchCount.next(node.value);
                break;
              case 'sum_good_parts_batch':
                this.machinePartsGoodBatchCount.next(node.value);
                break;
              case 'sum_parts_box':
                this.machinePartsBoxCount.next(node.value);
                break;
              case 'box_complete':
                this.boxComplete.next(node.value);
                break;
              case 'current_time':
                this.machineHotPressCurrentTime.next(node.value);
                break;
              case 'expected_time':
                this.machineHotPressExpectedTime.next(node.value);
                break;
              case 'machine_running_time_hr':
                this.machineRunningTimeInHrs.next(node.value);
                break;
              case 'machine_running_time_min':
                this.machineRunningTimeInMin.next(node.value);
                break;
              case 'wheel_count':
                this.wheelCount.next(node.value);
                break;
              case 'hv_parts_count':
                this.hvRejectionPartsCount.next(node.value);
                break;
              case 'ir_parts_count':
                this.irRejectionPartsCount.next(node.value);
                break;
              case 'tanD_1K_parts_count':
                this.tanD1KRejectionPartsCount.next(node.value);
                break;
              case 'tanD_10K_100K_parts_count':
                this.tanD10K100KRejectionPartsCount.next(node.value);
                break;
              case 'cap_parts_count':
                this.capRejectionPartsCount.next(node.value);
                break;
              case 'singleLeadRejectionPartsCount':
                this.capRejectionPartsCount.next(node.value);
                break;
              case 'other1RejectionPartsCount':
                this.capRejectionPartsCount.next(node.value);
                break;
              case 'other2RejectionPartsCount':
                this.capRejectionPartsCount.next(node.value);
                break;
              case 'doubleRejectionPartsCount':
                this.capRejectionPartsCount.next(node.value);
                break;
              case 'alarm_code_12':
                this.alarmCode12.next(node.value);
                break;
              case 'indexing_running':
                this.indexingRunning.next(node.value);
                break;
              default:
                break;
            }
          });
        } else if (response.op === 'GET_MACHINE_SUMMARY_CURING') {
          response.data.forEach((node: any) => {
            switch (node.name) {
              case 'sum_parts_batch':
                this.machineCuringPartBatchCount.next(node.value);
                break;
              case 'feed_finish_mode':
                this.feedFinishMode.next(node.value);
                break;
              default:
                break;
            }
          });
        } else if (response.op === 'GET_MACHINE_ALARMS') {
          this.alarms.next(response.data);
        } else if (response.op === 'GET_MACHINE_ALARMS_CURING') {
          this.alarmsCuring.next(response.data);
        } else if (response.op === 'CONNECTED') {
        } else if (response.op === 'LOAD_PRODUCT_RECIPE') {
          this.recipeLoaded.next(response);
          this.send({
            op: 'REGISTER',
            name: this.machineDataPrimary[0]?.node_prefix,
          });
          if (this.machineDataPrimary[0].node_prefix == 'OMRON_PLC.25-WIC') {
            this.send({
              op: 'REGISTER',
              name: 'OMRON_PLC.25-OVEN',
            });
          }
        }
      });

    this.intervalMachineStatus = setInterval(() => {
      this.send({
        op: 'GET_MACHINE_SUMMARY',
        prefix: this.machineDataPrimary[0]?.node_prefix,
      });
    }, 1000);

    // this.intervalMachineAlarms = setInterval(() => {
    //   this.send({
    //     op: 'GET_MACHINE_ALARMS',
    //     prefix: this.machineDataPrimary[0]?.node_prefix,
    //   });
    // }, 1000);

    if (
      !!this.machineDataPrimary &&
      this.machineDataPrimary[0].node_prefix == 'OMRON_PLC.25-WIC'
    ) {
      this.intervalMachineStatus = setInterval(() => {
        this.send({
          op: 'GET_MACHINE_SUMMARY_CURING',
          prefix: 'OMRON_PLC.25-OVEN',
        });
      }, 3000);

      this.intervalMachineAlarms = setInterval(() => {
        this.send({
          op: 'GET_MACHINE_ALARMS_CURING',
          prefix: 'OMRON_PLC.25-OVEN',
        });
      }, 1000);
    }
    // this.intervalMachineStatus = setInterval(() => {
    //   this.send({
    //     op: 'GET_MACHINE_RUNNING_STATUS',
    //     prefix: this.machineData.node_prefix,
    //   });
    // }, 1000);
  }

  getMachineRunningStatus(): Observable<String> {
    return this.machineRunningStatus.asObservable();
  }

  getMachineConnectionStatus(): Observable<String> {
    return this.status.asObservable();
  }

  sendNode(node: string, value: boolean) {
    this.send({
      op: 'WRITE_TAGS',
      nodes: [
        {
          nodeId: this.machineDataPrimary[0]?.node_prefix + node,
          value: value,
          datatype: 'boolean',
        },
      ],
    });
  }

  sendNodes(nodesWithValue: { nodeId: string; value: boolean }[]) {
    this.send({
      op: 'WRITE_TAGS',
      nodes: nodesWithValue.map((t: any) => ({
        nodeId: this.machineDataPrimary[0]?.node_prefix + t.nodeId,
        value: t.value,
        datatype: 'boolean',
      })),
    });
  }

  sendNodeForAssembly(node: string, value: boolean) {
    const nodes = this.machineData.map((ele: any) => {
      return {
        nodeId: ele.node_prefix + node,
        value: value,
        datatype: 'boolean',
      };
    });
  }

  sendNodeForCuring(node: string, value: boolean) {
    this.send({
      op: 'WRITE_TAGS',
      nodes: [
        {
          nodeId: 'OMRON_PLC.25-OVEN' + node,
          value: value,
          datatype: 'boolean',
        },
      ],
    });
  }

  connect(): Observable<any> {
    return (
      of(WS_ENDPOINT)
        // .pipe(select(getApiUrl))
        .pipe(
          // filter((apiUrl) => !!apiUrl),
          // https becomes wws, http becomes ws
          // map((apiUrl: any) => apiUrl.replace(/^http/, 'ws') + '/stream'),
          tap((d) => {
            this.status.next(this.wsStatuses[3]);
          }),
          switchMap((wsUrl) => {
            if (this.connection$) {
              return this.connection$;
            } else {
              this.connection$ = webSocket(wsUrl);
              return this.connection$;
            }
          }),
          tap(() => {
            this.status.next(this.wsStatuses[1]);
          }),
          retryWhen((errors) => {
            this.status.next(this.wsStatuses[3]);
            return errors.pipe(delay(this.RETRY_SECONDS));
          })
        )
    );
  }

  send(data: any) {
    if (this.connection$) {
      const payload = {
        token: 'alskdniaubscuiabcae',
        ...data,
      };

      this.connection$.next(payload);
    } else {
      console.error('Did not send data, open a connection first');
    }
  }

  closeConnection() {
    if (this.connection$) {
      this.connection$.complete();
      this.connection$ = null;
    }

    this.status.next(this.wsStatuses[2]);
  }

  ngOnDestroy() {
    this.closeConnection();
    clearInterval(this.intervalMachineStatus);
  }

  getStatus() {
    this.status.asObservable();
  }
}
