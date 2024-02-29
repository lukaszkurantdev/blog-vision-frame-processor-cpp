import * as React from 'react';

import { StyleSheet, View, Text } from 'react-native';
import { install } from 'react-native-vision-jsi-processor';
import {
  Camera,
  useCameraPermission,
  useCameraDevice,
  useFrameProcessor,
} from 'react-native-vision-camera';

install();

export default function App() {
  const { hasPermission, requestPermission } = useCameraPermission();
  const device = useCameraDevice('back');

  React.useEffect(() => {
    if (!hasPermission) {
      requestPermission();
    }
  }, [hasPermission, requestPermission]);

  //@ts-ignore
  const frameProc = global.frameProcessor;

  const frameProcessor = useFrameProcessor(
    (frame) => {
      'worklet';
      console.log(frameProc(frame));
    },
    [frameProc]
  );

  if (device == null)
    return (
      <View style={styles.container}>
        <Text>No device</Text>
      </View>
    );
  return (
    <Camera
      style={StyleSheet.absoluteFill}
      device={device}
      isActive={true}
      frameProcessor={frameProcessor}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
