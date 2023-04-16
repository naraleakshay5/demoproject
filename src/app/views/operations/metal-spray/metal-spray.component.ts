import { WebsocketService } from './../../../websocket.service';
import { MetalSprayService } from './metal-spray.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../Shared/shared.service';
import { PoData } from '../Shared/shared-model';
import { Recipe } from './metal-spray-model';
import { Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-metal-spray',
  templateUrl: './metal-spray.component.html',
  styleUrls: ['./metal-spray.component.scss'],
})
export class MetalSprayComponent implements OnInit, OnDestroy {
  poStages: any;
  poData!: PoData;
  machineId!: number;
  processId!: number;
  inProcesspoStage: any;
  clickEventsubscription!: Subscription;
  machineSummarySub!: Subscription;
  indexingComplete: boolean = false;
  isCount: number = 0;
  nodes: any[] = [];
  machineData: any;
  indexingLeft!: number;
  gun1Recipe: Recipe[] = [];
  gun2Recipe: Recipe[] = [];
  loadRecipeSub!: Subscription;
  indexingLeftForNewPoJson: any;
  callOnInit: Subject<boolean> = new Subject<boolean>();

  constructor(
    private router: Router,
    private metalSprayServcie: MetalSprayService,
    private wsService: WebsocketService,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    const poData = localStorage.getItem('PO_DATA')!;
    if (JSON.parse(poData)) {
      this.poData = JSON.parse(poData);
    }
    const processId = localStorage.getItem('PROCESS_ID')!;
    if (JSON.parse(processId)) {
      this.processId = JSON.parse(processId);
    }

    const machine = localStorage.getItem('MACHINE')!;
    this.machineData = JSON.parse(machine);

    const machineData = JSON.parse(localStorage.getItem('MACHINE') || '{}');
    if (machineData?.id) {
      this.machineId = machineData?.id;
    } else {
      const machineId = localStorage.getItem('MACHINE_ID')!;
      this.machineId = JSON.parse(machineId);
    }

    const indexingLeft = localStorage.getItem('INDEXING_LEFT')!;
    if (JSON.parse(indexingLeft)) {
      this.indexingLeft = JSON.parse(indexingLeft);
    }

    const gun2Recipe = localStorage.getItem('GUN2_RECIPE')!;
    if (JSON.parse(gun2Recipe)) {
      this.gun2Recipe = JSON.parse(gun2Recipe);
    }

    this.poStage();

    this.clickEventsubscription = this.sharedService
      .getClickEventpoStageCompleted()
      .subscribe((currentStageSlug: any) => {
        const inProcesspoStage = this.poStages.some(
          (ele: any) =>
            ele.url_slug === currentStageSlug &&
            ele.stage_status === 'in_process'
        );
        if (inProcesspoStage) {
          this.postPostage();
        }
      });

    const interlocksBeforIndexing = [
      {
        nodeId:
          this.metalSprayServcie.machineInterlocks
            .BATCH_PRODUCTION_START_ON_MACHINE,
        value: true,
      },
      {
        nodeId:
          this.metalSprayServcie.machineInterlocks.PROC_INTL_BATCH_COMPLETED,
        value: false,
      },
    ];

    this.wsService.sendNodes(interlocksBeforIndexing);

    this.doIndexing();
  }

  doIndexing() {
    this.machineSummarySub = this.wsService.indexingRunning.subscribe(
      (value) => {
        console.info('Indexing', value);

        if (!value) {
          this.isCount = 0;
        }

        if (value && this.isCount === 0) {
          this.isCount = 1;

          this.metalSprayServcie
            .doIndexing(this.machineId)
            .subscribe((resp: any) => {
              let indexingLeftJson = localStorage.getItem('INDEXING_LEFT');

              if (indexingLeftJson) {
                this.indexingLeft = JSON.parse(indexingLeftJson);
              }
              this.indexingLeft -= 1;

              localStorage.setItem(
                'INDEXING_LEFT',
                JSON.stringify(this.indexingLeft)
              );

              let indexingLeftForNewPoJson = localStorage.getItem(
                'INDEXING_LEFT_FOR_NEW_PO'
              );
              if (indexingLeftForNewPoJson) {
                this.indexingLeftForNewPoJson = JSON.parse(
                  indexingLeftForNewPoJson
                );
              }
              this.indexingLeftForNewPoJson -= 1;

              localStorage.setItem(
                'INDEXING_LEFT_FOR_NEW_PO',
                JSON.stringify(this.indexingLeftForNewPoJson)
              );
              let gun2 = localStorage.getItem('GUN_2_DETAILS')!;
              const gun2Details = JSON.parse(gun2);

              if (
                (this.indexingLeft === 0 ||
                  this.indexingLeftForNewPoJson === 0) &&
                !gun2Details
              ) {
                this.callOnInit.next(true);
                setTimeout(() => {
                  this.callOnInit.next(false);
                }, 100);
              } else {
                this.router.navigate(['/op/ms/wheel-operation']);
              }
            });
        }
      }
    );
  }

  poStage() {
    //TODO complete postage like tempering
    let po = localStorage.getItem('PO_DATA')!;
    const poData = JSON.parse(po);
    this.sharedService
      .poStage(this.processId, poData?.po_id)
      .subscribe((res: any) => {
        this.poStages = res.data;
        this.inProcesspoStage = this.poStages.find(
          (ele: any) => ele.stage_status === 'in_process'
        );
        this.router.navigate([
          'op/ms/' +
            (this.inProcesspoStage?.url_slug
              ? this.inProcesspoStage?.url_slug
              : ''),
        ]);
      });
  }

  postPostage() {
    let po = localStorage.getItem('PO_DATA')!;
    const poData = JSON.parse(po);
    this.inProcesspoStage = this.poStages.filter(
      (ele: any) => ele.stage_status === 'in_process'
    );
    const stageId = this.inProcesspoStage[0]?.stage_id;
    this.sharedService.postPoStage(poData?.po_id, stageId).subscribe({
      next: (res: any) => {
        this.inProcessStage();
      },
      error: (error) => {
        console.info(error);
      },
    });
  }

  inProcessStage() {
    let index = -1;
    this.poStages = this.poStages?.map((ele: any, i: number) => {
      if (ele.stage_status === 'in_process') {
        ele.is_completed = true;
        ele.stage_status = 'completed';
        index = i;
      } else if (index !== -1 && i === index + 1) {
        ele.stage_status = 'in_process';
        ele.in_process = true;
        index = -1;
      }
      return ele;
    });
  }

  ngOnDestroy() {
    if (this.clickEventsubscription) {
      this.clickEventsubscription.unsubscribe();
    }
    if (this.machineSummarySub) {
      this.machineSummarySub.unsubscribe();
    }
  }
}
