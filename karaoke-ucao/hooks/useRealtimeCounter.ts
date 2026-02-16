import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export const useRealtimeCounter = () => {
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchCount = async () => {
    const { count: initialCount, error } = await supabase
      .from('participants')
      .select('*', { count: 'exact', head: true });

    if (!error) {
      setCount(initialCount ?? 0);
    }
    setLoading(false);
  };

  useEffect(() => {
    void fetchCount();

    const channel = supabase
      .channel('participants_count')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'participants'
        },
        () => {
          void fetchCount();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return { count, loading };
};


