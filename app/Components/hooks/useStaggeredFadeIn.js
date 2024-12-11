
import { useSharedValue, useAnimatedStyle, withTiming, withDelay } from 'react-native-reanimated';
import { useEffect } from 'react';

export function useStaggeredFadeIn(index, delayPerItem = 100, baseDelay = 300) {
    const opacity = useSharedValue(0);
    useEffect(() => {
        const totalDelay = baseDelay + index * delayPerItem;
        opacity.value = withDelay(totalDelay, withTiming(1, { duration: 500 }));
    }, [index, delayPerItem, baseDelay, opacity]);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            opacity: opacity.value,
        };
    });

    return animatedStyle;
}
