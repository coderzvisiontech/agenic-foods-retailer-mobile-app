package com.getfresh

import android.content.Context
import com.facebook.flipper.android.AndroidFlipperClient
import com.facebook.flipper.android.utils.FlipperUtils
import com.facebook.flipper.plugins.inspector.DescriptorMapping
import com.facebook.flipper.plugins.inspector.InspectorFlipperPlugin
import com.facebook.flipper.plugins.network.FlipperOkhttpInterceptor
import com.facebook.flipper.plugins.network.NetworkFlipperPlugin
import com.facebook.flipper.plugins.react.ReactFlipperPlugin
import com.facebook.react.ReactInstanceManager
import com.facebook.react.modules.network.NetworkingModule
import okhttp3.OkHttpClient

object ReactNativeFlipper {
    @JvmStatic
    fun initializeFlipper(context: Context, reactInstanceManager: ReactInstanceManager) {
        if (FlipperUtils.shouldEnableFlipper(context)) {
            val client = AndroidFlipperClient.getInstance(context)
            val networkFlipperPlugin = NetworkFlipperPlugin()

            client.addPlugin(InspectorFlipperPlugin(context, DescriptorMapping.withDefaults()))
            client.addPlugin(ReactFlipperPlugin())
            client.addPlugin(networkFlipperPlugin)
            client.start()

            NetworkingModule.setCustomClientBuilder { builder: OkHttpClient.Builder ->
                builder.addNetworkInterceptor(FlipperOkhttpInterceptor(networkFlipperPlugin))
            }
        }
    }
}
