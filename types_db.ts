export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      lesson: {
        Row: {
          created_at: string
          description: string | null
          id: number
          text: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: never
          text?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: never
          text?: string | null
        }
      }
      premium_content: {
        Row: {
          created_at: string
          id: number
          video_url: string | null
        }
        Insert: {
          created_at?: string
          id?: never
          video_url?: string | null
        }
        Update: {
          created_at?: string
          id?: never
          video_url?: string | null
        }
      }
      profile: {
        Row: {
          created_at: string
          email: string | null
          id: string
          interval: string | null
          is_subscribed: boolean
          stripe_customer: string | null
        }
        Insert: {
          created_at?: string
          email?: string | null
          id: string
          interval?: string | null
          is_subscribed?: boolean
          stripe_customer?: string | null
        }
        Update: {
          created_at?: string
          email?: string | null
          id?: string
          interval?: string | null
          is_subscribed?: boolean
          stripe_customer?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      pricing_plan_interval: "day" | "week" | "month" | "year"
      pricing_type: "one_time" | "recurring"
      subscription_status:
        | "trialing"
        | "active"
        | "canceled"
        | "incomplete"
        | "incomplete_expired"
        | "past_due"
        | "unpaid"
        | "paused"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
