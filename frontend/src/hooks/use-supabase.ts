
import { useMemo } from 'react';

function useSupabase() {
    return useMemo(getSupabaseBrowserClient, []);
}

export default useSupabase;