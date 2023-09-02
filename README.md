# Umbrabo app

## **Libraries**

- React Native
- Typescript
- GraphQL
- React Native Tab View
- React native vector icons
- React Native Async Storage

## Common package errors

Thankfully none yet

## Develop

### Develop on iOS

Setup react native environment: https://reactnative.dev/docs/environment-setup
Ruby version for project listed in .ruby-version

- `npm install`
- `cd ios/`
- `pod install`
- `cd ..`
- `npm run ios`
- Run flipper

Ready to develop!

### Develop on IOS for Android

Install android studio and all the required tools, https://reactnative.dev/docs/environment-setup?platform=android
Make sure to use the correct java version

- `npm install`
- `npx react-native run-android`

## Build APK

`npx react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res`

Release requires approval from google play store, therefor create debug apk for now
`cd android && ./gradlew assembleDebug`

## Backend

### https://choresbackend.herokuapp.com/
