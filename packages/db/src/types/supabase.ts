/**
 * Supabase generated types - run `pnpm db:generate` to regenerate
 */
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          phone: string;
          nin: string | null;
          full_name: string | null;
          email: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          phone: string;
          nin?: string | null;
          full_name?: string | null;
          email?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          phone?: string;
          nin?: string | null;
          full_name?: string | null;
          email?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
}
