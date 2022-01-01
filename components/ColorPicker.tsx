import { LinearGradient, LinearGradientProps } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  GestureHandlerRootView,
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
} from "react-native-reanimated";

interface ColorPickerProps extends LinearGradientProps {
  maxWidth: number
}

const ColorPicker: React.FC<ColorPickerProps> = ({
  colors,
  start,
  end,
  style,
  maxWidth
}) => {
  const translateX = useSharedValue(0);

  const adjustedTraslateX = useDerivedValue(() => {
    return Math.min(Math.max(translateX.value, 0), maxWidth - CIRCLE_PICKER_SIZE)
  })

  const panGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    { x: number }
  >({
    onStart: (_, context) => {
      context.x = adjustedTraslateX.value;
    },
    onActive: (event, context) => {
      translateX.value = event.translationX + context.x;
    },
    onEnd: () => {},
  });

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: adjustedTraslateX.value }],
    };
  });

  return (
    <GestureHandlerRootView>
      <PanGestureHandler onGestureEvent={panGestureEvent}>
        <Animated.View style={{ justifyContent: "center" }}>
          <LinearGradient
            colors={colors}
            start={start}
            end={end}
            style={style}
          />
          <Animated.View style={[styles.picker, rStyle]} />
        </Animated.View>
      </PanGestureHandler>
    </GestureHandlerRootView>
  );
};

const CIRCLE_PICKER_SIZE = 45;

const styles = StyleSheet.create({
  picker: {
    position: "absolute",
    backgroundColor: "#fff",
    width: CIRCLE_PICKER_SIZE,
    height: CIRCLE_PICKER_SIZE,
    borderRadius: CIRCLE_PICKER_SIZE / 2,
  },
});

export { ColorPicker };
