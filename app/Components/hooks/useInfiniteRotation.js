
import { useSharedValue, useAnimatedStyle, withRepeat, withTiming, Easing } from 'react-native-reanimated';
import { useEffect } from 'react';

export function useInfiniteRotation(duration = 2000) {
    const rotation = useSharedValue(0);
    useEffect(() => {
        rotation.value = withRepeat(
            withTiming(360, {
                duration,
                easing: Easing.linear,
            }),
            -1,
            false
        );
    }, [rotation, duration]);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ rotate: `${rotation.value}deg` }]
        };
    });

    return animatedStyle;
}
