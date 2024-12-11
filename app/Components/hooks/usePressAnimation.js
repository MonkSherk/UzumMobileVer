
import { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';

export function usePressAnimation() {
    const scale = useSharedValue(1);

    const onPressIn = () => {
        scale.value = withSpring(0.95, { damping: 10, stiffness: 200 });
    };

    const onPressOut = () => {
        scale.value = withSpring(1, { damping: 10, stiffness: 200 });
    };

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: scale.value }],
        };
    });

    return { animatedStyle, onPressIn, onPressOut };
}
