import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types';

type Collection = Database['public']['Tables']['collections']['Row'];
type CollectionInsert = Database['public']['Tables']['collections']['Insert'];
type CollectionUpdate = Database['public']['Tables']['collections']['Update'];

export function useCollections(userId?: string) {
  const queryClient = useQueryClient();

  // Fetch all collections for a user with bookmark count
  const { data: collections, isLoading, error } = useQuery({
    queryKey: ['collections', userId],
    queryFn: async () => {
      if (!userId) return [];
      
      const { data, error } = await supabase
        .from('collections')
        .select(`
          *,
          bookmarks:bookmarks(count)
        `)
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    },
    enabled: !!userId,
  });

  // Create collection mutation
  const createCollection = useMutation({
    mutationFn: async (collection: CollectionInsert) => {
      const { data, error } = await supabase
        .from('collections')
        .insert(collection)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['collections', userId] });
    },
  });

  // Update collection mutation
  const updateCollection = useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: CollectionUpdate }) => {
      const { data, error } = await supabase
        .from('collections')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['collections', userId] });
    },
  });

  // Delete collection mutation
  const deleteCollection = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('collections')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['collections', userId] });
      queryClient.invalidateQueries({ queryKey: ['bookmarks', userId] });
    },
  });

  return {
    collections,
    isLoading,
    error,
    createCollection,
    updateCollection,
    deleteCollection,
  };
}
