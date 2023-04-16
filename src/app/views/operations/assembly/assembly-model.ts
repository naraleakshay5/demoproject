export interface AssemblyModel {}

export interface reason {
  id: number;
  master_process_id: number;
  reason_text: string;
}

export interface poData {
  PO_id: number;
  Sach_id: number;
  Ls_id: number;
  PO: string;
  Sach: string;
  PO_Quantity: number;
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

export interface tray {
  id: number;
  name: string;
  scanned_id: string;
  isScan?: boolean;
  isUsed?: boolean;
}

export interface AssemblyBox {
  material_id: number;
  material_code: string;
  scanned_id: string;
  is_scan?: boolean;
}
