export interface HotPressModel {}

export interface reason {
  id: number;
  master_process_id: number;
  reason_text: string;
}

export interface grill {
  id: number;
  grill_name: string;
}

export interface grill_name {
  grill_name: string;
}

export interface tray {
  Trey_Location: string;
  Sample_size: number;
  Sample_1: number;
  Sample_2: number;
  is_sample_1_ok: boolean | null;
  is_sample_1_not_ok: boolean | null;
  is_sample_2_ok: boolean | null;
  is_sample_2_not_ok: boolean | null;
}

export interface allowedBin {
  id: number;
  name: string;
}

export interface poData {
  PO_id: number;
  Sach_id: number;
  Ls_id: number;
  PO: string;
  Sach: string;
}
