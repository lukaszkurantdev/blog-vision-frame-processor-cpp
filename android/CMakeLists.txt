cmake_minimum_required(VERSION 3.4.1)
project(Ocv)

set (CMAKE_VERBOSE_MAKEFILE ON)
set (CMAKE_CXX_STANDARD 14)

find_package(ReactAndroid REQUIRED CONFIG)
find_package(fbjni REQUIRED CONFIG)
find_package(react-native-vision-camera REQUIRED CONFIG)

add_library(react-native-vision-jsi-processor            SHARED
            ../node_modules/react-native/ReactCommon/jsi/jsi/jsi.cpp
            ../cpp/react-native-vision-jsi-processor.cpp
            ../cpp/react-native-vision-jsi-processor.h
            cpp-adapter.cpp
)

# Specifies a path to native header files.
include_directories(
            ../cpp
            ../node_modules/react-native/React
            ../node_modules/react-native/React/Base
            ../node_modules/react-native/ReactCommon/jsi
            ../node_modules/react-native-vision-camera/android/src/main/cpp/frameprocessor
            ../node_modules/react-native-vision-camera/android/src/main/cpp/frameprocessor/java-bindings
)

target_link_libraries(
        react-native-vision-jsi-processor
        android  
        ReactAndroid::jsi
        fbjni::fbjni
        react-native-vision-camera::VisionCamera
)