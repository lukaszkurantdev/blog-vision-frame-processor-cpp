#include <jni.h>
#include "react-native-vision-jsi-processor.h"

extern "C"
JNIEXPORT jdouble JNICALL
Java_com_visionjsiprocessor_VisionJsiProcessorModule_nativeMultiply(JNIEnv *env, jclass type, jdouble a, jdouble b) {
    return visionjsiprocessor::multiply(a, b);
}
