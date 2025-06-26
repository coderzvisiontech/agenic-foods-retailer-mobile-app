package com.getfresh

import android.content.Intent
import android.os.Bundle
import android.os.Handler
import android.os.Looper
import android.widget.ImageView
import androidx.appcompat.app.AppCompatActivity
import com.bumptech.glide.Glide

class SplashActivity : AppCompatActivity() {

    private val splashDuration: Long = 3000

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_splash)

        val splashBg: ImageView = findViewById(R.id.splashBackground)
        val logo: ImageView = findViewById(R.id.logo)

        // Load background image
        Glide.with(this)
            .load(R.drawable.splash_bg)
            .into(splashBg)

        // Load center logo
        Glide.with(this)
            .load(R.drawable.logo)
            .into(logo)

        Handler(Looper.getMainLooper()).postDelayed({
            startActivity(Intent(this, MainActivity::class.java))
            finish()
        }, splashDuration)
    }
}
