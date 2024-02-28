import { NativeModules, Platform } from 'react-native';

const LINKING_ERROR =
  `The package 'react-native-vision-jsi-processor' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

// @ts-expect-error
const isTurboModuleEnabled = global.__turboModuleProxy != null;

const VisionJsiProcessorModule = isTurboModuleEnabled
  ? require('./NativeVisionJsiProcessor').default
  : NativeModules.VisionJsiProcessor;

const VisionJsiProcessor = VisionJsiProcessorModule
  ? VisionJsiProcessorModule
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

export function multiply(a: number, b: number): Promise<number> {
  return VisionJsiProcessor.multiply(a, b);
}
