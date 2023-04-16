export interface TemperingModel {}

export interface poData {
  po_id: number;
  sach_id: number;
  ls_id: number;
  po: string;
  sach: string;
}

export interface reason {
  id: number;
  master_process_id: number;
  reason_text: string;
}

export interface loadrecipe {
  id: number;
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

export interface trolley {
  id: number;
  name: string;
  scanned_id: string;
  is_scan: boolean;
  trolley_id: number;
}
