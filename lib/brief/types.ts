export interface FileMeta {
  name: string;
  size: number;
  type: string;
  url: string;
}

export interface QuoteBriefRow {
  id: string;
  quote_slug: string;
  client_name: string | null;
  status: "draft" | "submitted";
  answers: Record<string, unknown>;
  files: Record<string, FileMeta[]>;
  created_at: string;
  updated_at: string;
}
