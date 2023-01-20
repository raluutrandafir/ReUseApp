import { InteractionManager } from 'react-native';
import { useEffect } from 'react';

import { useUserStore } from './useUserStore';

export function useStoreReset() {
    const resetUserStore = useUserStore((state) => state.resetUserId);

    useEffect(() => {
        return () => {
            InteractionManager.runAfterInteractions(() => {
                resetUserStore();
            });
        };
    }, []);
}
