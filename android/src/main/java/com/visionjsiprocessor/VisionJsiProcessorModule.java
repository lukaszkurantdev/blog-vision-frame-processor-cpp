package com.visionjsiprocessor;

import android.util.Log;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.JavaScriptContextHolder;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class VisionJsiProcessorModule extends ReactContextBaseJavaModule {
  public static final String NAME = "VisionJsiProcessor";

  VisionJsiProcessorModule(ReactApplicationContext context) {
    super(context);
  }

  @Override
  @NonNull
  public String getName() {
    return NAME;
  }

  static {
    System.loadLibrary("react-native-vision-jsi-processor");
  }

  public static native void nativeInstall(long jsi);

  @ReactMethod(isBlockingSynchronousMethod = true)
  public void install() {
    JavaScriptContextHolder jsContext = getReactApplicationContext().getJavaScriptContextHolder();

    if(jsContext.get() != 0) {
      nativeInstall(jsContext.get());
    } else {
      Log.e("SimpleJsiModule", "JSI Runtime is not available in debug mode");
    }
  }
}
