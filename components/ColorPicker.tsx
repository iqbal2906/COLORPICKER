import { LinearGradient, LinearGradientProps } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface ColorPickerProps extends LinearGradientProps {}

const ColorPicker: React.FC<ColorPickerProps> = ({
  colors,
  start,
  end,
  style,
}) => {
  return (
    <LinearGradient colors={colors} start={start} end={end} style={style} />
  );
};

const styles = StyleSheet.create({});

export { ColorPicker };
