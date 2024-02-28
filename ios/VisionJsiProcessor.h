#ifdef __cplusplus
#import "react-native-vision-jsi-processor.h"
#endif

#ifdef RCT_NEW_ARCH_ENABLED
#import "RNVisionJsiProcessorSpec.h"

@interface VisionJsiProcessor : NSObject <NativeVisionJsiProcessorSpec>
#else
#import <React/RCTBridgeModule.h>

@interface VisionJsiProcessor : NSObject <RCTBridgeModule>
#endif

@end
