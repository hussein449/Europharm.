
export type Item = {
  id: string;
  code: string;
  name: string;
  alt_name?: string | null;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
};
