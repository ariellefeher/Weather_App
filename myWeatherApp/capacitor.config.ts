import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'ionic.io.starter',
  appName: 'myWeatherApp',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
