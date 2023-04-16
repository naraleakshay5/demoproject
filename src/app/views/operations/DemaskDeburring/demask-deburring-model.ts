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
