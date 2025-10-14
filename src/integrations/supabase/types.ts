export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      bookmark_analysis: {
        Row: {
          analysis_type: string
          bookmark_id: string | null
          confidence_score: number | null
          created_at: string | null
          id: string
          provider: string | null
          result: Json
        }
        Insert: {
          analysis_type: string
          bookmark_id?: string | null
          confidence_score?: number | null
          created_at?: string | null
          id?: string
          provider?: string | null
          result: Json
        }
        Update: {
          analysis_type?: string
          bookmark_id?: string | null
          confidence_score?: number | null
          created_at?: string | null
          id?: string
          provider?: string | null
          result?: Json
        }
        Relationships: [
          {
            foreignKeyName: "bookmark_analysis_bookmark_id_fkey"
            columns: ["bookmark_id"]
            isOneToOne: false
            referencedRelation: "bookmark_insights"
            referencedColumns: ["bookmark_id"]
          },
          {
            foreignKeyName: "bookmark_analysis_bookmark_id_fkey"
            columns: ["bookmark_id"]
            isOneToOne: false
            referencedRelation: "bookmarks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookmark_analysis_bookmark_id_fkey"
            columns: ["bookmark_id"]
            isOneToOne: false
            referencedRelation: "mobile_bookmarks"
            referencedColumns: ["id"]
          },
        ]
      }
      bookmarks: {
        Row: {
          author_avatar: string | null
          author_handle: string | null
          author_name: string | null
          author_verified: boolean | null
          collection_id: string | null
          content_type: string | null
          created_at: string | null
          description: string | null
          energy_level: number | null
          favicon_url: string | null
          focus_score: number | null
          has_thread: boolean | null
          id: string
          image_url: string | null
          images: string[] | null
          is_archived: boolean | null
          is_favorite: boolean | null
          is_private: boolean | null
          likes_count: number | null
          mood: string | null
          personal_metadata: Json | null
          platform_id: string | null
          priority: string | null
          read_status: string | null
          reading_time_minutes: number | null
          source_platform: string | null
          tags: string[] | null
          thread_count: number | null
          title: string
          updated_at: string | null
          url: string | null
          user_id: string
        }
        Insert: {
          author_avatar?: string | null
          author_handle?: string | null
          author_name?: string | null
          author_verified?: boolean | null
          collection_id?: string | null
          content_type?: string | null
          created_at?: string | null
          description?: string | null
          energy_level?: number | null
          favicon_url?: string | null
          focus_score?: number | null
          has_thread?: boolean | null
          id?: string
          image_url?: string | null
          images?: string[] | null
          is_archived?: boolean | null
          is_favorite?: boolean | null
          is_private?: boolean | null
          likes_count?: number | null
          mood?: string | null
          personal_metadata?: Json | null
          platform_id?: string | null
          priority?: string | null
          read_status?: string | null
          reading_time_minutes?: number | null
          source_platform?: string | null
          tags?: string[] | null
          thread_count?: number | null
          title: string
          updated_at?: string | null
          url?: string | null
          user_id: string
        }
        Update: {
          author_avatar?: string | null
          author_handle?: string | null
          author_name?: string | null
          author_verified?: boolean | null
          collection_id?: string | null
          content_type?: string | null
          created_at?: string | null
          description?: string | null
          energy_level?: number | null
          favicon_url?: string | null
          focus_score?: number | null
          has_thread?: boolean | null
          id?: string
          image_url?: string | null
          images?: string[] | null
          is_archived?: boolean | null
          is_favorite?: boolean | null
          is_private?: boolean | null
          likes_count?: number | null
          mood?: string | null
          personal_metadata?: Json | null
          platform_id?: string | null
          priority?: string | null
          read_status?: string | null
          reading_time_minutes?: number | null
          source_platform?: string | null
          tags?: string[] | null
          thread_count?: number | null
          title?: string
          updated_at?: string | null
          url?: string | null
          user_id?: string
        }
        Relationships: []
      }
      collections: {
        Row: {
          color: string | null
          created_at: string | null
          description: string | null
          icon: string | null
          id: string
          is_public: boolean | null
          name: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          color?: string | null
          created_at?: string | null
          description?: string | null
          icon?: string | null
          id?: string
          is_public?: boolean | null
          name: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          color?: string | null
          created_at?: string | null
          description?: string | null
          icon?: string | null
          id?: string
          is_public?: boolean | null
          name?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      content_relationships: {
        Row: {
          created_at: string | null
          id: string
          notes: string | null
          relationship_type: string
          source_id: string | null
          strength: number | null
          target_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          notes?: string | null
          relationship_type: string
          source_id?: string | null
          strength?: number | null
          target_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          notes?: string | null
          relationship_type?: string
          source_id?: string | null
          strength?: number | null
          target_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "content_relationships_source_id_fkey"
            columns: ["source_id"]
            isOneToOne: false
            referencedRelation: "bookmark_insights"
            referencedColumns: ["bookmark_id"]
          },
          {
            foreignKeyName: "content_relationships_source_id_fkey"
            columns: ["source_id"]
            isOneToOne: false
            referencedRelation: "bookmarks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "content_relationships_source_id_fkey"
            columns: ["source_id"]
            isOneToOne: false
            referencedRelation: "mobile_bookmarks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "content_relationships_target_id_fkey"
            columns: ["target_id"]
            isOneToOne: false
            referencedRelation: "bookmark_insights"
            referencedColumns: ["bookmark_id"]
          },
          {
            foreignKeyName: "content_relationships_target_id_fkey"
            columns: ["target_id"]
            isOneToOne: false
            referencedRelation: "bookmarks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "content_relationships_target_id_fkey"
            columns: ["target_id"]
            isOneToOne: false
            referencedRelation: "mobile_bookmarks"
            referencedColumns: ["id"]
          },
        ]
      }
      daily_activities: {
        Row: {
          activity_date: string | null
          bookmarks_added: number | null
          created_at: string | null
          energy_level: number | null
          focus_score: number | null
          id: string
          mood: string | null
          notes: string | null
          reading_time_minutes: number | null
          user_id: string
        }
        Insert: {
          activity_date?: string | null
          bookmarks_added?: number | null
          created_at?: string | null
          energy_level?: number | null
          focus_score?: number | null
          id?: string
          mood?: string | null
          notes?: string | null
          reading_time_minutes?: number | null
          user_id: string
        }
        Update: {
          activity_date?: string | null
          bookmarks_added?: number | null
          created_at?: string | null
          energy_level?: number | null
          focus_score?: number | null
          id?: string
          mood?: string | null
          notes?: string | null
          reading_time_minutes?: number | null
          user_id?: string
        }
        Relationships: []
      }
      learning_path_items: {
        Row: {
          completed_at: string | null
          content_id: string | null
          created_at: string | null
          description: string | null
          estimated_duration_minutes: number | null
          id: string
          is_completed: boolean | null
          item_type: string
          learning_path_id: string | null
          order_index: number
          title: string
        }
        Insert: {
          completed_at?: string | null
          content_id?: string | null
          created_at?: string | null
          description?: string | null
          estimated_duration_minutes?: number | null
          id?: string
          is_completed?: boolean | null
          item_type: string
          learning_path_id?: string | null
          order_index: number
          title: string
        }
        Update: {
          completed_at?: string | null
          content_id?: string | null
          created_at?: string | null
          description?: string | null
          estimated_duration_minutes?: number | null
          id?: string
          is_completed?: boolean | null
          item_type?: string
          learning_path_id?: string | null
          order_index?: number
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "learning_path_items_content_id_fkey"
            columns: ["content_id"]
            isOneToOne: false
            referencedRelation: "bookmark_insights"
            referencedColumns: ["bookmark_id"]
          },
          {
            foreignKeyName: "learning_path_items_content_id_fkey"
            columns: ["content_id"]
            isOneToOne: false
            referencedRelation: "bookmarks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "learning_path_items_content_id_fkey"
            columns: ["content_id"]
            isOneToOne: false
            referencedRelation: "mobile_bookmarks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "learning_path_items_learning_path_id_fkey"
            columns: ["learning_path_id"]
            isOneToOne: false
            referencedRelation: "learning_paths"
            referencedColumns: ["id"]
          },
        ]
      }
      learning_paths: {
        Row: {
          created_at: string | null
          description: string | null
          difficulty: string | null
          estimated_duration_hours: number | null
          id: string
          is_active: boolean | null
          outcomes: string[] | null
          prerequisites: string[] | null
          progress_percentage: number | null
          title: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          difficulty?: string | null
          estimated_duration_hours?: number | null
          id?: string
          is_active?: boolean | null
          outcomes?: string[] | null
          prerequisites?: string[] | null
          progress_percentage?: number | null
          title: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          difficulty?: string | null
          estimated_duration_hours?: number | null
          id?: string
          is_active?: boolean | null
          outcomes?: string[] | null
          prerequisites?: string[] | null
          progress_percentage?: number | null
          title?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      learning_streaks: {
        Row: {
          created_at: string | null
          current_streak: number | null
          id: string
          last_activity_date: string | null
          longest_streak: number | null
          streak_type: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          current_streak?: number | null
          id?: string
          last_activity_date?: string | null
          longest_streak?: number | null
          streak_type?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          current_streak?: number | null
          id?: string
          last_activity_date?: string | null
          longest_streak?: number | null
          streak_type?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      smart_actionables: {
        Row: {
          action_type: string
          completed_at: string | null
          created_at: string | null
          description: string | null
          id: string
          is_completed: boolean | null
          priority: number | null
          reasoning: string | null
          suggested_content_ids: string[] | null
          title: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          action_type: string
          completed_at?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          is_completed?: boolean | null
          priority?: number | null
          reasoning?: string | null
          suggested_content_ids?: string[] | null
          title: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          action_type?: string
          completed_at?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          is_completed?: boolean | null
          priority?: number | null
          reasoning?: string | null
          suggested_content_ids?: string[] | null
          title?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string | null
          full_name: string | null
          id: string
          preferences: Json | null
          updated_at: string | null
          user_id: string
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          full_name?: string | null
          id?: string
          preferences?: Json | null
          updated_at?: string | null
          user_id: string
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          full_name?: string | null
          id?: string
          preferences?: Json | null
          updated_at?: string | null
          user_id?: string
          username?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      bookmark_insights: {
        Row: {
          ai_insights: Json | null
          bookmark_id: string | null
          content_type: string | null
          focus_score: number | null
          mood: string | null
          priority: string | null
          title: string | null
        }
        Insert: {
          ai_insights?: never
          bookmark_id?: string | null
          content_type?: string | null
          focus_score?: number | null
          mood?: string | null
          priority?: string | null
          title?: string | null
        }
        Update: {
          ai_insights?: never
          bookmark_id?: string | null
          content_type?: string | null
          focus_score?: number | null
          mood?: string | null
          priority?: string | null
          title?: string | null
        }
        Relationships: []
      }
      mobile_bookmarks: {
        Row: {
          collection_id: string | null
          content_type: string | null
          created_at: string | null
          description: string | null
          energy_level: number | null
          favicon_url: string | null
          focus_score: number | null
          id: string | null
          image_url: string | null
          is_archived: boolean | null
          is_favorite: boolean | null
          mood: string | null
          personal_metadata: Json | null
          platform_id: string | null
          priority: string | null
          read_status: string | null
          reading_time_minutes: number | null
          source_platform: string | null
          tags: string[] | null
          title: string | null
          updated_at: string | null
          url: string | null
          user_id: string | null
        }
        Insert: {
          collection_id?: string | null
          content_type?: string | null
          created_at?: string | null
          description?: string | null
          energy_level?: number | null
          favicon_url?: string | null
          focus_score?: number | null
          id?: string | null
          image_url?: string | null
          is_archived?: boolean | null
          is_favorite?: boolean | null
          mood?: string | null
          personal_metadata?: Json | null
          platform_id?: string | null
          priority?: string | null
          read_status?: string | null
          reading_time_minutes?: number | null
          source_platform?: string | null
          tags?: string[] | null
          title?: string | null
          updated_at?: string | null
          url?: string | null
          user_id?: string | null
        }
        Update: {
          collection_id?: string | null
          content_type?: string | null
          created_at?: string | null
          description?: string | null
          energy_level?: number | null
          favicon_url?: string | null
          focus_score?: number | null
          id?: string | null
          image_url?: string | null
          is_archived?: boolean | null
          is_favorite?: boolean | null
          mood?: string | null
          personal_metadata?: Json | null
          platform_id?: string | null
          priority?: string | null
          read_status?: string | null
          reading_time_minutes?: number | null
          source_platform?: string | null
          tags?: string[] | null
          title?: string | null
          updated_at?: string | null
          url?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      extract_domain_from_url: {
        Args: { url_input: string }
        Returns: string
      }
      format_time_ago: {
        Args: { timestamp_input: string }
        Returns: string
      }
      generate_smart_actionables: {
        Args: { user_uuid: string }
        Returns: undefined
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      track_daily_activity: {
        Args: { user_uuid: string }
        Returns: undefined
      }
      update_learning_streak: {
        Args: { user_uuid: string }
        Returns: undefined
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "moderator", "user"],
    },
  },
} as const
