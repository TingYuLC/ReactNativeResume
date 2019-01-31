package com.reactnativeresume;

import android.app.Application;

import com.facebook.react.ReactApplication;
import ca.jaysoo.extradimensions.ExtraDimensionsPackage;
import com.brentvatne.react.ReactVideoPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.rnfs.RNFSPackage;
import com.horcrux.svg.SvgPackage;
import io.realm.react.RealmReactPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.umeng.commonsdk.UMConfigure;
import com.umeng.socialize.PlatformConfig;
import com.BV.LinearGradient.LinearGradientPackage;
import com.reactnativeresume.um.RNUMConfigure;
import com.reactnativeresume.um.DplusReactPackage;

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
        new ExtraDimensionsPackage(),
        new DplusReactPackage(),
        new ReactVideoPackage(),
        new VectorIconsPackage(),
        new RNFSPackage(),
        new SvgPackage(),
        new RealmReactPackage(),
        new LinearGradientPackage()
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
    RNUMConfigure.init(this, "5c078064b465f5bced00062e", "Umeng", UMConfigure.DEVICE_TYPE_PHONE, "");
  }

  {
    // PlatformConfig.setWeixin("yxc0614e80c9304c11b0391514d09f13bf", "616sfd16s1fsdsasfsfsfsdf");
    // PlatformConfig.setQQZone("516116511", "sgdsdgddsdgsdgsdgsdgdge6ca00e486ef59");
    // PlatformConfig.setDing("451d4s6fsdfsffsddfs");

    // 其它平台示例
    // PlatformConfig.setSinaWeibo("3921700954", "04b48b094faeb16683c32669824ebdad", "http://sns.whalecloud.com");
    // PlatformConfig.setYixin("yxc0614e80c9304c11b0391514d09f13bf");
    // PlatformConfig.setTwitter("3aIN7fuF685MuZ7jtXkQxalyi", "MK6FEYG63eWcpDFgRYw4w9puJhzDl0tyuqWjZ3M7XJuuG7mMbO");
    // PlatformConfig.setAlipay("2015111700822536");
    // PlatformConfig.setLaiwang("laiwangd497e70d4", "d497e70d4c3e4efeab1381476bac4c5e");
    // PlatformConfig.setPinterest("1439206");
    // PlatformConfig.setKakao("e4f60e065048eb031e235c806b31c70f");
    // PlatformConfig.setVKontakte("5764965", "5My6SNliAaLxEm3Lyd9J");
    // PlatformConfig.setDropbox("oz8v5apet3arcdy", "h7p2pjbzkkxt02a");
  }
}
