import { useSharedValue, useAnimatedStyle, withRepeat, withTiming, Easing } from 'react-native-reanimated';
import { useEffect } from 'react';

export function usePulseAnimation(minScale = 1, maxScale = 1.2, duration = 1000) {
    const scale = useSharedValue(minScale);

    useEffect(() => {
        scale.value = withRepeat(
            withTiming(maxScale, {
                duration,
                easing: Easing.inOut(Easing.ease),
            }),
            -1,
            true
        );
    }, [minScale, maxScale, duration, scale]);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: scale.value }]
        };
    });

    return animatedStyle;
}
