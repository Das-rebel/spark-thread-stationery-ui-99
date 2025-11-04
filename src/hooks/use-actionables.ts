import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types';

type SmartActionable = Database['public']['Tables']['smart_actionables']['Row'];

export function useActionables(userId?: string) {
  const queryClient = useQueryClient();

  // Fetch active actionables
  const { data: actionables, isLoading, error } = useQuery({
    queryKey: ['actionables', userId],
    queryFn: async () => {
      if (!userId) return [];
      
      const { data, error } = await supabase
        .from('smart_actionables')
        .select('*')
        .eq('user_id', userId)
        .eq('is_completed', false)
        .order('priority', { ascending: false });

      if (error) throw error;
      return data as SmartActionable[];
    },
    enabled: !!userId,
  });

  // Generate actionables
  const generateActionables = useMutation({
    mutationFn: async () => {
      if (!userId) throw new Error('User ID required');
      
      const { error } = await supabase.rpc('generate_smart_actionables', {
        user_uuid: userId,
      });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['actionables', userId] });
    },
  });

  // Complete actionable
  const completeActionable = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('smart_actionables')
        .update({ 
          is_completed: true,
          completed_at: new Date().toISOString(),
        })
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['actionables', userId] });
    },
  });

  // Dismiss actionable
  const dismissActionable = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('smart_actionables')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['actionables', userId] });
    },
  });

  return {
    actionables,
    isLoading,
    error,
    generateActionables,
    completeActionable,
    dismissActionable,
  };
}
