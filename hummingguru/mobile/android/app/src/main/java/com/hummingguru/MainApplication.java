package com.hummingguru;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.vydia.RNUploader.UploaderReactPackage;
import com.rnim.rn.audio.ReactNativeAudioPackage;
import com.rnfs.RNFSPackage;
import com.farmisen.react_native_file_uploader.RCTFileUploaderPackage;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
import com.futurice.rctaudiotoolkit.AudioPackage;
import com.vespakoen.waveform.WaveformPackage;
import com.otomogroove.OGReactNativeWaveform.OGWavePackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new UploaderReactPackage(),
            new ReactNativeAudioPackage(),
            new RNFSPackage(),
            new RCTFileUploaderPackage(),
            new FBSDKPackage(),
            new AudioPackage(),
            new WaveformPackage(),
            new OGWavePackage(),
            new VectorIconsPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
