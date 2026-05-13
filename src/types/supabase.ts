export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export interface Database {
    public: {
        Tables: {
            profiles: {
                Row: {
                    id: string
                    updated_at: string | null
                    username: string | null
                    full_name: string | null
                    avatar_url: string | null
                    website: string | null
                }
                Insert: {
                    id: string
                    updated_at?: string | null
                    username?: string | null
                    full_name?: string | null
                    avatar_url?: string | null
                    website?: string | null
                }
                Update: {
                    id?: string
                    updated_at?: string | null
                    username?: string | null
                    full_name?: string | null
                    avatar_url?: string | null
                    website?: string | null
                }
                Relationships: [
                    {
                        foreignKeyName: "profiles_id_fkey"
                        columns: ["id"]
                        referencedRelation: "users"
                        referencedColumns: ["id"]
                    }
                ]
            }
            biolink_pages: {
                Row: {
                    id: string
                    user_id: string
                    slug: string
                    title: string | null
                    bio: string | null
                    theme: string
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id?: string
                    user_id: string
                    slug: string
                    title?: string | null
                    bio?: string | null
                    theme?: string
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    user_id?: string
                    slug?: string
                    title?: string | null
                    bio?: string | null
                    theme?: string
                    created_at?: string
                    updated_at?: string
                }
                Relationships: [
                    {
                        foreignKeyName: "biolink_pages_user_id_fkey"
                        columns: ["user_id"]
                        referencedRelation: "profiles"
                        referencedColumns: ["id"]
                    }
                ]
            }
            biolink_links: {
                Row: {
                    id: string
                    page_id: string
                    title: string
                    url: string
                    icon: string | null
                    order: number
                    is_active: boolean
                    created_at: string
                }
                Insert: {
                    id?: string
                    page_id: string
                    title: string
                    url: string
                    icon?: string | null
                    order?: number
                    is_active?: boolean
                    created_at?: string
                }
                Update: {
                    id?: string
                    page_id?: string
                    title?: string
                    url?: string
                    icon?: string | null
                    order?: number
                    is_active?: boolean
                    created_at?: string
                }
                Relationships: [
                    {
                        foreignKeyName: "biolink_links_page_id_fkey"
                        columns: ["page_id"]
                        referencedRelation: "biolink_pages"
                        referencedColumns: ["id"]
                    }
                ]
            }
        }
        Views: {
            [_ in never]: never
        }
        Functions: {
            [_ in never]: never
        }
        Enums: {
            [_ in never]: never
        }
        CompositeTypes: {
            [_ in never]: never
        }
    }
}
