// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  baseUrl: 'http://192.168.176.170:2220',
  impulseBaseUrl: 'http://192.168.2.134:3001',
  // rfid: 'http://192.168.2.134:9999',
  rfidNew: 'ws://192.168.176.170:9991',
  videoJet: 'ws://192.168.176.134:2077',
  wsEndpoint: 'ws://192.168.176.170:2000',
  aoi: 'ws://192.168.176.170:2000',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
