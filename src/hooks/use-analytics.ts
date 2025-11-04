import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types';

type DailyActivity = Database['public']['Tables']['daily_activities']['Row'];
type LearningStreak = Database['public']['Tables']['learning_streaks']['Row'];

export function useAnalytics(userId?: string) {
  const queryClient = useQueryClient();

  // Fetch daily activities
  const { data: activities, isLoading: activitiesLoading } = useQuery({
    queryKey: ['daily-activities', userId],
    queryFn: async () => {
      if (!userId) return [];
      
      const { data, error } = await supabase
        .from('daily_activities')
        .select('*')
        .eq('user_id', userId)
        .order('activity_date', { ascending: false })
        .limit(30);

      if (error) throw error;
      return data as DailyActivity[];
    },
    enabled: !!userId,
  });

  // Fetch learning streak
  const { data: streak, isLoading: streakLoading } = useQuery({
    queryKey: ['learning-streak', userId],
    queryFn: async () => {
      if (!userId) return null;
      
      const { data, error } = await supabase
        .from('learning_streaks')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      return data as LearningStreak | null;
    },
    enabled: !!userId,
  });

  // Track daily activity
  const trackActivity = useMutation({
    mutationFn: async () => {
      if (!userId) throw new Error('User ID required');
      
      const { error } = await supabase.rpc('track_daily_activity', {
        user_uuid: userId,
      });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['daily-activities', userId] });
    },
  });

  // Update learning streak
  const updateStreak = useMutation({
    mutationFn: async () => {
      if (!userId) throw new Error('User ID required');
      
      const { error } = await supabase.rpc('update_learning_streak', {
        user_uuid: userId,
      });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['learning-streak', userId] });
    },
  });

  return {
    activities,
    streak,
    isLoading: activitiesLoading || streakLoading,
    trackActivity,
    updateStreak,
  };
}
