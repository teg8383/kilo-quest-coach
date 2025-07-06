import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.bb9a8bb87fc145738e543ac0abb7a5ef',
  appName: 'FitJourney - Personal Fitness App',
  webDir: 'dist',
  server: {
    url: 'https://bb9a8bb8-7fc1-4573-8e54-3ac0abb7a5ef.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    LocalNotifications: {
      smallIcon: "ic_stat_icon_config_sample",
      iconColor: "#488AFF",
      sound: "beep.wav",
    },
  },
};

export default config;