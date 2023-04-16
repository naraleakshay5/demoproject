export interface PoData {
  po_id: number;
  sach_id: string;
  ls_id: string;
  po: string;
  sach: string;
}

export interface PoStages {
  id: number;
  machine_id: number;
  po_id: number;
  tool_check: boolean | null;
  material_check: boolean | null;
  machine_recipe_setup: boolean | null;
  op_carrier_scan: boolean | null;
  winding: boolean | null;
  process_quality_check: boolean | null;
  label_printing: boolean | null;
  checkout: boolean | null;
}

export interface Material {
  id: number;
  item: string;
  item_id: string;
  tape_color: string;
  isTouched: boolean | null;
}

export interface TapeColor {
  tape_color: string;
}

export interface ScrapReason {
  id: number;
  master_process_id: number;
  reason_text: string;
}

export interface OpCarrierBins {
  name: string | null;
  id: number;
  is_checked_masking: boolean | null;
  is_checked_winding: boolean | null;
  po_id: number;
  scanned_bin?: string;
}
