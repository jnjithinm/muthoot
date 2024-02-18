import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';
import {
  View,
  PanResponder,
  GestureResponderEvent,
  LayoutChangeEvent,
} from 'react-native';
import styles from './styles';

interface SliderProps {
  minValue: number;
  maxValue: number;
  defaultValue: number;
  step: number;
  onChange: Dispatch<SetStateAction<string>>;
  filledColor?: string;
  remainingColor?: string;
  Value: string | undefined;
  disabled?: boolean;
}

const Slider = ({
  minValue = 0,
  maxValue = 100,
  defaultValue = 50,
  step = 1,
  onChange,
  filledColor = '#E6E6E6',
  remainingColor = '#0E64D1',
  Value,
  disabled = false,
}: SliderProps) => {
  const [thumbPosition, setThumbPosition] = useState(0);
  const [sliderWidth, setSliderWidth] = useState(0);

  useEffect(() => {
    const newValue = Number(Value);
    const thumbWidth = 24;
    const thumbOffset = thumbWidth / 2;
    const newPosition =
      ((newValue - minValue) / (maxValue - minValue)) * sliderWidth -
      thumbOffset;
    setThumbPosition(
      Math.min(sliderWidth - thumbWidth, Math.max(0, newPosition)),
    );
  }, [Value]);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderGrant: () => {},
    onPanResponderMove: (evt: GestureResponderEvent, gestureState) => {
      const thumbWidth = 30;
      const newPosition = Math.max(
        0,
        Math.min(gestureState.moveX - thumbWidth / 2, sliderWidth - thumbWidth),
      );
      const newValue =
        (maxValue - minValue) * (newPosition / (sliderWidth - thumbWidth)) +
        minValue;
      const roundedValue = Math.round(newValue / step) * step;
      if (!disabled) {
        setThumbPosition(newPosition);
        onChange?.(roundedValue.toString());
      }
    },
    onPanResponderRelease: () => {},
  });

  const handleLayout = (event: LayoutChangeEvent) => {
    setSliderWidth(event.nativeEvent.layout.width);
    setThumbPosition(
      ((defaultValue - minValue) / (maxValue - minValue)) *
        event.nativeEvent.layout.width,
    );
  };

  const filledWidth = (thumbPosition / sliderWidth) * 100;

  return (
    <View style={styles.sliderContainer} onLayout={handleLayout}>
      <View
        style={[
          styles.sliderTrack,
          {width: `${filledWidth + 5}%`, backgroundColor: remainingColor},
        ]}
      />
      <View
        style={[
          styles.sliderTrackFilled,
          {width: `${100 - filledWidth - 5}%`, backgroundColor: filledColor},
        ]}
      />

      <View
        style={[styles.sliderThumb, {left: thumbPosition}]}
        {...panResponder.panHandlers}>
        <View style={styles.sliderThumbInnerCircle}></View>
      </View>

      {/* <Text style={styles.sliderValue}>{value.toFixed(0)}</Text> */}
    </View>
  );
};

export default Slider;
