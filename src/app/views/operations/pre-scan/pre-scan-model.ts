export interface PreScanModel {}
export interface bin {
  name: string;
  id: number;
  is_checked_hotpress: boolean | null;
  is_checked_winding: boolean | null;
  po_id: number;
  scanned_bin?: string;
}

export interface MaskingBin {
  name: string | null;
  id: number;
  is_checked_masking: boolean | null;
  is_checked_winding: boolean | null;
  po_id: number;
  scanned_bin?: string;
}
