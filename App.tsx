import { StatusBar } from "expo-status-bar";
import { useCallback } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import {
  GestureHandlerRootView,
  PinchGestureHandler,
  PinchGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { ColorPicker } from "./components/ColorPicker";

const COLORS = [
  "red",
  "purple",
  "blue",
  "cyan",
  "green",
  "yellow",
  "orange",
  "black",
  "white",
];

const BACKGROUND_COLOR = "rgba(0,0,0,0.9)";

const { width } = Dimensions.get("window");

const CIRCLE_SIZE = width * 0.8;
const PICKER_WIDTH = width * 0.9;

const AnimatedCircle = Animated.createAnimatedComponent(View);

export default function App() {
  const pickerColor = useSharedValue<string | number>(COLORS[0]);

  const scale = useSharedValue(1)

  const onColorChanged = useCallback((color: string | number) => {
    "worklet";
    pickerColor.value = color;
  }, []);

  const rStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: pickerColor.value,
      transform: [{scale: scale.value}]
    };
  });

  const pinchHandlerEvent =
    useAnimatedGestureHandler<PinchGestureHandlerGestureEvent>({
      onActive: (event) => {
        scale.value = event.scale
      },
      onEnd: () => {
        scale.value = withSpring(1)
      }
    });

  return (
    <>
      <View style={styles.topContainer}>
        <GestureHandlerRootView>
          <PinchGestureHandler onGestureEvent={pinchHandlerEvent}>
            <AnimatedCircle style={[styles.circle, rStyle]} />
          </PinchGestureHandler>
        </GestureHandlerRootView>
      </View>
      <View style={styles.bottomContainer}>
        <ColorPicker
          colors={COLORS}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.gradient}
          maxWidth={PICKER_WIDTH}
          onColorChanged={onColorChanged}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  topContainer: {
    flex: 3,
    backgroundColor: BACKGROUND_COLOR,
    alignItems: "center",
    justifyContent: "center",
  },
  bottomContainer: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
    alignItems: "center",
    justifyContent: "center",
  },
  circle: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
  },
  gradient: { height: 40, width: PICKER_WIDTH, borderRadius: 20 },
});
