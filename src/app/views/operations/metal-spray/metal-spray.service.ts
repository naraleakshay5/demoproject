import { WebsocketService } from 'src/app/websocket.service';
import { HelperService } from 'src/app/helpers/helper.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Recipe } from './metal-spray-model';
import { PoData } from '../Shared/shared-model';

@Injectable({
  providedIn: 'root',
})
export class MetalSprayService {
  gun2Recipe!: Recipe[];
  gun1Recipe!: Recipe[];
  gun1Switch!: Recipe[];
  gun2Switch!: Recipe[];
  doubleRender: number = 0;
  constructor(
    private http: HttpClient,
    private helperService: HelperService,
    private wsService: WebsocketService
  ) {}

  machineInterlocks = {
    BATCH_PRODUCTION_START_ON_MACHINE:
      '.process_monitoring.OTP_PROC_INTL_Batch_Production_Start_on_Machine',
    PROC_INTL_STOP_MACHINE: '.process_monitoring.OTP_PROC_INTL_Stop_Machine',
    PROC_INTL_BATCH_COMPLETED:
      '.process_monitoring.OTP_PROC_INTL_Batch_Completed',
  };

  doIndexing(machineId: number) {
    return this.http.post(
      environment.baseUrl + '/v1/operations_module/wheel/index/' + machineId,
      {}
    );
  }

  insertMaterialDrums(reqArraay: {
    production_order_id: number;
    process_id: number;
    machine_id: number;
    spray_gun: any[];
  }) {
    return this.http.post(
      environment.baseUrl +
        '/v1/operations_module/wheel/wheel_on_loading_area/',
      { wheelId: reqArraay }
    );
  }

  getWheelDetailsCount(machineId: number, input: any) {
    return this.http.get(
      environment.baseUrl +
        '/v1/operations_module/wheel/face_count/' +
        machineId +
        '/' +
        input
    );
  }

  showWheelDetails(wheelId: number) {
    return this.http.get(
      environment.baseUrl +
        '/v1/operations_module/wheel/wheel_detail/' +
        wheelId
    );
  }

  mountWheel(machineId: number, sachId: string, poId: number, input: number) {
    return this.http.post(
      environment.baseUrl +
        '/v1/operations_module/wheel/wheel_on_loading_area/' +
        machineId +
        '/' +
        sachId +
        '/' +
        poId,
      { wheelId: input }
    );
  }

  getWheelDetails(input: any) {
    return this.http.get(
      environment.baseUrl + '/v1/operations_module/wheel/wheel_detail/' + input
    );
  }

  getGunWheels(machineId: number) {
    return this.http.get(
      environment.baseUrl +
        '/v1/operations_module/wheel/wheel_status/' +
        machineId
    );
  }

  getActualWheelCount(processId: number, poId: number, type?: any) {
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

  getMaterial(sachID: string, processId: number, poId: number) {
    return this.http.get(
      environment.baseUrl +
        '/v1/operations_module/material/metal_spray_materials/' +
        sachID +
        '/' +
        processId +
        '/' +
        poId
    );
  }

  addRequiredMaterial(data: any) {
    const url =
      environment.baseUrl + '/v1/operations_module/material/spray_materials';
    return this.http.post(url, data);
  }

  getProcessQualityCheck(
    sachId: string,
    processId: number,
    poId: number,
    machineId: number
  ) {
    return this.http.get(
      environment.baseUrl +
        '/v1/operations_module/wheel/get_checkout_status/' +
        sachId +
        '/' +
        processId +
        '/' +
        poId +
        '/' +
        machineId
    );
  }

  getPoIdByEpc(processId: number, uniqueEpc: any) {
    return this.http.post(
      environment.baseUrl +
        '/v1/operations_module/wheel/get_poid_by_epcid/' +
        processId,
      {
        epcId: uniqueEpc,
      }
    );
  }

  backToPoList(po_id: number, processId: number, machineId: number) {
    return this.http.get(
      environment.baseUrl +
        '/v1/operations_module/wheel/get_checkout_status/' +
        po_id +
        '/' +
        processId +
        '/' +
        machineId
    );
  }

  setGun2Recipe(recipeParameters: Recipe[], poData: PoData) {
    localStorage.removeItem('GUN2_RECIPE');
    const gun2Recipe: Recipe[] = [];

    const time = this.helperService.getTimeString();
    const isFirstWheelOfPO = localStorage.getItem('INDEXING_LEFT');

    let scannedWheel = localStorage.getItem('SCANNED_WHEEL_DETAILS')!;
    if (JSON.parse(scannedWheel)) {
      scannedWheel = JSON.parse(scannedWheel);
    }
    let totalWheelJson = localStorage.getItem('TOTAL_WHEEL_DETAILS');
    let totalWheels = 0;

    if (totalWheelJson && JSON.parse(totalWheelJson)) {
      totalWheels = JSON.parse(totalWheelJson)?.length;
    }

    let indexingLeftJson = localStorage.getItem('INDEXING_LEFT');
    let indexingLeft = null;

    if (indexingLeftJson && JSON.parse(indexingLeftJson)) {
      indexingLeft = JSON.parse(indexingLeftJson);
    }

    recipeParameters.forEach((ele: any) => {
      if (ele.lower_name === 'otp_prod_rcp_gun2_id' && ele.gun === 'g2') {
        const version: Recipe = {
          nodeId: ele.node_id,
          datatype: ele.datatype,
          value: ele.value.concat(time),
        };
        gun2Recipe.push(version);
      }

      if (
        ele.lower_name === 'otp_prod_rcp_gun2_spray_cycle' &&
        ele.gun === 'g2'
      ) {
        const gun2SprayCycle: Recipe = {
          nodeId: ele.node_id,
          datatype: ele.datatype,
          value: ele.value,
        };
        gun2Recipe.push(gun2SprayCycle);
      }

      if (ele.lower_name.includes('wire_speed') && ele.gun === 'g2') {
        const gun2SprayCycle: Recipe = {
          nodeId: ele.node_id,
          datatype: ele.datatype,
          value: ele.value,
        };
        gun2Recipe.push(gun2SprayCycle);
      }

      if (ele.lower_name === 'otp_prod_rcp_gun2_switch' && ele.gun === 'g2') {
        let gun1Details = localStorage.getItem('GUN_1_DETAILS')!;
        if (JSON.parse(gun1Details)) {
          gun1Details = JSON.parse(gun1Details);
        }
        let gun2Switch = null;

        if (gun1Details == null) {
          gun2Switch = {
            nodeId: ele.node_id,
            datatype: ele.datatype,
            value: false,
          };
        } else {
          gun2Switch = {
            nodeId: ele.node_id,
            datatype: ele.datatype,
            value: true,
          };
        }

        localStorage.setItem('GUN2_SWITCH', JSON.stringify([gun2Switch]));
        gun2Recipe.push(gun2Switch);
      }

      if (
        ele.lower_name !== 'otp_prod_rcp_gun2_id' &&
        ele.lower_name !== 'otp_prod_rcp_gun2_po_no' &&
        ele.lower_name !== 'otp_prod_rcp_gun2_sach_no' &&
        ele.lower_name !== 'otp_prod_rcp_gun2_switch' &&
        ele.lower_name !== 'otp_prod_rcp_gun2_spray_cycle' &&
        !ele.lower_name.includes('wire_speed') &&
        ele.gun === 'g2'
      ) {
        const tagData: Recipe = {
          nodeId: ele.node_id,
          datatype: ele.datatype,
          value: ele.value,
        };
        gun2Recipe.push(tagData);
      }

      if (ele.lower_name === 'otp_prod_rcp_gun2_po_no' && ele.gun === 'g2') {
        const poNumber: Recipe = {
          nodeId: ele.node_id,
          datatype: ele.datatype,
          value: poData?.po,
        };
        gun2Recipe.push(poNumber);
      }

      if (ele.lower_name === 'otp_prod_rcp_gun2_sach_no' && ele.gun === 'g2') {
        const sach: Recipe = {
          nodeId: ele.node_id,
          datatype: ele.datatype,
          value: poData?.sach,
        };
        gun2Recipe.push(sach);
      }
    });

    return gun2Recipe;
  }

  setGun1Recipe(recipeParameters: Recipe[], poData: PoData) {
    localStorage.removeItem('GUN1_RECIPE');
    const gun1Recipe: Recipe[] = [];

    const time = this.helperService.getTimeString();
    let scannedWheel = localStorage.getItem('SCANNED_WHEEL_DETAILS')!;
    if (JSON.parse(scannedWheel)) {
      scannedWheel = JSON.parse(scannedWheel);
    }

    let totalWheelDetails = localStorage.getItem('TOTAL_WHEEL_DETAILS')!;
    if (JSON.parse(totalWheelDetails)) {
      totalWheelDetails = JSON.parse(totalWheelDetails);
    }

    recipeParameters.forEach((ele: any) => {
      if (ele.lower_name === 'otp_prod_rcp_gun1_id' && ele.gun === 'g1') {
        const version: Recipe = {
          nodeId: ele.node_id,
          datatype: ele.datatype,
          value: ele.value.concat(time),
        };
        gun1Recipe.push(version);
      }

      if (ele.lower_name === 'otp_prod_rcp_gun1_po_no' && ele.gun === 'g1') {
        const poNumber: Recipe = {
          nodeId: ele.node_id,
          datatype: ele.datatype,
          value: poData?.po,
        };
        gun1Recipe.push(poNumber);
      }

      if (ele.lower_name === 'otp_prod_rcp_gun1_sach_no' && ele.gun === 'g1') {
        const sachNumber: Recipe = {
          nodeId: ele.node_id,
          datatype: ele.datatype,
          value: poData?.sach,
        };
        gun1Recipe.push(sachNumber);
      }

      if (
        ele.lower_name === 'otp_prod_rcp_gun1_spray_cycle' &&
        ele.gun === 'g1'
      ) {
        const gun1SprayCycle: Recipe = {
          nodeId: ele.node_id,
          datatype: ele.datatype,
          value: ele.value,
        };
        gun1Recipe.push(gun1SprayCycle);
      }

      if (ele.lower_name.includes('wire_speed') && ele.gun === 'g1') {
        const gun1SprayCycle: Recipe = {
          nodeId: ele.node_id,
          datatype: ele.datatype,
          value: ele.value,
        };
        gun1Recipe.push(gun1SprayCycle);
      }

      if (ele.lower_name === 'otp_prod_rcp_gun1_switch' && ele.gun === 'g1') {
        let loadwheelDetails = localStorage.getItem('LOAD_WHEEL_DETAILS')!;
        if (JSON.parse(loadwheelDetails)) {
          loadwheelDetails = JSON.parse(loadwheelDetails);
        }

        let gun1Switch = {
          nodeId: ele.node_id,
          datatype: ele.datatype,
          value: loadwheelDetails == null ? false : true,
        };
        localStorage.setItem('GUN1_SWITCH', JSON.stringify([gun1Switch]));
        gun1Recipe.push(gun1Switch);
      }
    });
    return gun1Recipe;
  }

  prepareValue(value: any, datatype: string) {
    let val = null;

    switch (datatype.toLowerCase()) {
      case 'boolean':
        if (typeof value === 'string') {
          val = value.toLowerCase() === '1' || value.toLowerCase() === 'true';
        } else if (typeof value === 'number') {
          val = value === 1;
        } else {
          val = value;
        }
        break;

      case 'byte':
      case 'short':
      case 'word':
      case 'dword':
        if (typeof value === 'string') {
          val = parseInt(value);
        } else {
          val = value;
        }
        break;

      case 'long':
      case 'float':
      case 'double':
        if (typeof value === 'string') {
          val = parseFloat(value);
        } else {
          val = value;
        }
        break;

      default:
        val = value;
        break;
    }

    return val;
  }

  prepareAndLoadRecipe() {
    let indexingLeftJson = localStorage.getItem('INDEXING_LEFT');
    let indexingLeft = null;

    if (indexingLeftJson && JSON.parse(indexingLeftJson)) {
      indexingLeft = JSON.parse(indexingLeftJson);
    }

    let machine = localStorage.getItem('MACHINE')!;
    machine = JSON.parse(machine);
    let machineId = 0;

    const machineData = JSON.parse(localStorage.getItem('MACHINE') || '{}');
    if (machineData?.id) {
      machineId = machineData?.id;
    } else {
      const machId = localStorage.getItem('MACHINE_ID')!;
      machineId = JSON.parse(machId);
    }

    const gun1Recipe = localStorage.getItem('GUN1_RECIPE')!;
    if (JSON.parse(gun1Recipe)) {
      this.gun1Recipe = JSON.parse(gun1Recipe);
    }
    const gun2Recipe = localStorage.getItem('GUN2_RECIPE')!;
    if (JSON.parse(gun2Recipe)) {
      this.gun2Recipe = JSON.parse(gun2Recipe);
    }

    const gun1Switch = localStorage.getItem('GUN1_SWITCH')!;
    if (JSON.parse(gun1Switch)) {
      this.gun1Switch = JSON.parse(gun1Switch);
    } else {
      const recipe = localStorage.getItem('RECIPE')!;
      if (JSON.parse(recipe)) {
        const rcp = JSON.parse(recipe);
        let gun1SwitchObject = rcp.find(
          (ele: any) => ele.lower_name == 'otp_prod_rcp_gun1_switch'
        );

        const gun1Switch: Recipe = {
          nodeId: gun1SwitchObject.node_id,
          datatype: gun1SwitchObject.datatype,
          value: false,
        };

        this.gun1Switch = [gun1Switch];
        localStorage.setItem('GUN1_SWITCH', JSON.stringify([gun1Switch]));
      }
    }

    const gun2Switch = localStorage.getItem('GUN2_SWITCH')!;
    if (JSON.parse(gun2Switch)) {
      this.gun2Switch = JSON.parse(gun2Switch);
    } else {
      const recipe = localStorage.getItem('RECIPE')!;
      if (JSON.parse(recipe)) {
        const rcp = JSON.parse(recipe);
        let gun2SwitchObject = rcp.find(
          (ele: any) => ele.lower_name == 'otp_prod_rcp_gun2_switch'
        );

        const gun2Switch: Recipe = {
          nodeId: gun2SwitchObject.node_id,
          datatype: gun2SwitchObject.datatype,
          value: false,
        };

        this.gun2Switch = [gun2Switch];
        localStorage.setItem('GUN2_SWITCH', JSON.stringify([gun2Switch]));
      }
    }

    let loadwheelDetails = localStorage.getItem('LOAD_WHEEL_DETAILS')!;
    if (JSON.parse(loadwheelDetails)) {
      loadwheelDetails = JSON.parse(loadwheelDetails);
    }

    let gun1Details = localStorage.getItem('GUN_1_DETAILS')!;
    if (JSON.parse(gun1Details)) {
      gun1Details = JSON.parse(gun1Details);
    }

    const both = [
      ...this.gun1Recipe.map((tag: any) => {
        let value = tag.value;

        if (
          tag.nodeId &&
          tag.nodeId
            .toLowerCase()
            .includes('product_recipe_set_parameters.otp_prod_rcp_gun1_switch')
        ) {
          value =
            loadwheelDetails == null || loadwheelDetails == 'null'
              ? false
              : true;
        }

        return {
          ...tag,
          value,
        };
      }),

      ...this.gun2Recipe.map((tag: any) => {
        let value = tag.value;

        if (
          tag.nodeId &&
          tag.nodeId
            .toLowerCase()
            .includes('product_recipe_set_parameters.otp_prod_rcp_gun2_switch')
        ) {
          value = gun1Details == null || gun1Details == 'null' ? false : true;
        }

        return {
          ...tag,
          value,
        };
      }),
    ];

    const gun1AndGun2Recipe = both.map((t) => ({
      nodeId: t.nodeId,
      value: this.prepareValue(t.value, t.datatype),
      datatype: t.datatype,
    }));

    this.wsService.send({
      op: 'LOAD_PRODUCT_RECIPE',
      nodes: gun1AndGun2Recipe,
      prefix: machineData[0].node_prefix,
    });
  }
}
