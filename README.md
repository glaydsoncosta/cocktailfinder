This repo was created in order to accomplish the Foxbox React Native Developer position code challenge.

# Project Goal
Create a simple React Native mobile application to consume an API (provided in the code challenge documentation). Application main screen must to provide an incremental cocktail search, as the user types the name of the cocktail, the application queries the API and show the result in a beautiful list with the cocktail name and photo.

# Used libs
* **React Navigation / Gesture Handler / React-Native Reanimated** to screen navigation.
* **axios** to API data fetching.
* **redux / redux-thunk** to state management sync/async.

# How to run
* Application was created with plain react native boilerplate code using React Native CLI (no third party visual comps were used).
* After clone the repository, just run "npm install".
* Maybe you'll need to make manual linking (since we are using React Native 0.59.9). So you just need to run:
  1. "react-native link react-native-gesture-handler".
  2. "react-native link react-native-reanimated".
* After this steps, you're prepared to run on both platforms. Just type "react-native run-ios" or "reac-native run-android".

# Additional Info (Dealing with big amount of data)
* When dealing with big amounts of data when fetching data (in this case, cocktail list), maybe we can create some kind of caching in the app, or using some optimized virtual list (rather than pure FlatList). But I'm an advocate that this should be a backend responsability. Maybe the backend could provide some kind of pagination logic, so when the app reaches the end of the current cocktail list we could fetch rest of items, going forward or back in the data pages.
* Application was tested in both platforms, iPhone XS in XCode and in a real Android 7.1 device.
* Application is ready to deal with network problems encountered when running RN applications in Android 9.0+ versions.

# Prints
* iOS
![iphone_screens](https://user-images.githubusercontent.com/5383758/63721331-6842d180-c827-11e9-9013-cddf26ab66bd.png)

* Android
![android_screens](https://user-images.githubusercontent.com/5383758/63721375-814b8280-c827-11e9-8508-09a362a69034.png)

