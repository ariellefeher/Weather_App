import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.weatherApp',
  appName: 'weatherApp',
  webDir: 'build',
  server: {
    androidScheme: 'https'
  }
};

export default config;
