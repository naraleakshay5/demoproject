export interface PoData {
  po_id: number;
  sach_id: string;
  lead_space: number;
  ls_id: string;
  po: string;
  sach: string;
  quantity: number;
  number_of_element_per_wheel: number;
  ls: number;
  box: number;
}

export interface loadrecipe {
  id: number;
  datatype: any;
  max_value: number;
  min_value: number;
  value: number;
  set_recipe: number;
  loaded_value: number;
  category: string;
  display_name: string;
  name: string;
  nodeid: string;
  isPlus: boolean | null;
  isMinus: boolean | null;
}

export interface poDetails {
  boxSize: string;
  inProcess: boolean | null;
  leadSpace: number;
  lsId: number;
  pmtDelay: number;
  poNumber: number;
  poType: string;
  productionOrder_Id: number;
  remarks: null;
  sachId: number;
  sachNumber: string;
  targetQuantity: number;
}

export interface PO_DATA {
  box_size?: string;
  element_per_wheel?: number;
  in_process?: boolean;
  init_setup_done?: boolean;
  lead_space: number;
  ls_id: number;
  pmt_delay?: number;
  po_number: string;
  po_type?: string;
  process_id: string;
  po_id: number;
  remarks?: null;
  sach_id: number;
  sach_number: string;
  target_quantity: string;
  trolley_id: number;
}

export interface scrap_reason {
  id: number;
  master_process_id: number;
  reason_text: string;
}

export interface reason {
  id: number;
  reason: string;
}
