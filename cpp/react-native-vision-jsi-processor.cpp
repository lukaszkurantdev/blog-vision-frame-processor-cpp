#include "react-native-vision-jsi-processor.h"
#include <jsi/jsi.h>
#ifdef ANDROID
#include "../../../node_modules/react-native-vision-camera/android/src/main/cpp/frameprocessor/FrameHostObject.h"

using namespace vision;
#else
#include "../../../node_modules/react-native-vision-camera/ios/Frame Processor/FrameHostObject.h"
#endif

namespace visionjsiprocessor {
	 using namespace facebook;



    void install(jsi::Runtime& runtime) {
        auto myPlugin = [=](jsi::Runtime& runtime,
                            const jsi::Value& thisArg,
                            const jsi::Value* args,
                            size_t count) -> jsi::Value {
            auto valueAsObject = args[0].getObject(runtime);
            auto frame = std::static_pointer_cast<FrameHostObject>(valueAsObject.getHostObject(runtime));

            int test;
#ifdef ANDROID
            test = frame->frame->getHeight();
#else
            test = frame->frame.height;
#endif
            return jsi::Value((int)test);
        };

        auto jsiFunc = jsi::Function::createFromHostFunction(runtime,
                                                             jsi::PropNameID::forUtf8(runtime,
                                                                                      "frameProcessor"),
                                                             1,
                                                             myPlugin);

        runtime.global().setProperty(runtime, "frameProcessor", jsiFunc);
    }
}
