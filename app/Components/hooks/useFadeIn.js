// app/hooks/useFadeIn.js
import { useSharedValue, useAnimatedStyle, withTiming, Easing } from 'react-native-reanimated';
import { useEffect } from 'react';

export function useFadeIn(duration = 500) {
    const opacity = useSharedValue(0);

    useEffect(() => {
        opacity.value = withTiming(1, {
            duration,
            easing: Easing.out(Easing.quad),
        });
    }, [opacity, duration]);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            opacity: opacity.value,
        };
    });

    return animatedStyle;
}
