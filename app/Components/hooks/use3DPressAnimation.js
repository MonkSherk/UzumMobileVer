import { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';

export function use3DPressAnimation() {
    const rotateY = useSharedValue(0);

    const onPressIn = () => {
        rotateY.value = withSpring(15, { damping: 5, stiffness: 150 });
    };

    const onPressOut = () => {
        rotateY.value = withSpring(0, { damping: 5, stiffness: 150 });
    };

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { perspective: 600 },
                { rotateY: `${rotateY.value}deg` }
            ]
        };
    });

    return { animatedStyle, onPressIn, onPressOut };
}
