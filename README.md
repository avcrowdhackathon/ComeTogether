# BackTogether - COVID-19 Passports

## Overview
Provides: RT-PCR and antibody test status. Built by ComeTogether on EOSIO.

## Prerequisites
* In order to run the app make sure you have react-native installed https://reactnative.dev/docs/getting-started
* Make sure you have node installed 

* Make sure you have an emulator (or your personal mobile phone with dev enabled) and Android Studio is installed (https://medium.com/swlh/react-native-and-android-studio-everything-you-need-to-get-started-in-linux-b47154e78f9e) 

* Clone the repository git@github.com:avcrowdhackathon/ComeTogether.git

* Create a firebase account and add google-services.jon to /android/app/location

### How to run in your personal mobile phone at LINUX: 

* This document will guide you through the necessary steps to run your React Native app on a device https://reactnative.dev/docs/running-on-device 

After run in your terminal the comments below:

1) npx react-native run-android -> build the project
2) npx react-native start

A app shortcut will be created in your mobile desktop and you can test the application.

## Disclaimers

* The server that is used is ComeTogether's server, but is in not used in this version as login uses temp data.

* The blockchain protocol that is used is EOSIO Jungle testnet https://jungletestnet.io/ and the smart contracts have been deployed and are functional in this version. 

## The App 

### Login page
![Image description](https://github.com/avcrowdhackathon/ComeTogether/blob/master/images/login_page_small.jpg)

## Issue Passport 
In this page a health worker , can issue a passport for a user tied to their ID card/passport/driving licence.

![Image description](https://github.com/ComeTogether/BackTogether/blob/master/images/issue_certificate_small_new.jpg)

## COVID-19 Status validation 
Here a validator can verify that the user has tested positive for antibodies or negative for COVID-19, through their ID card/passport/driving licence, either by scanning it or by typing the ID. 

![Image description](https://github.com/avcrowdhackathon/ComeTogether/blob/master/images/scan_document_small.jpg)

## Passport 
When the user has been tested positive for antibodies.

![Image description](https://github.com/ComeTogether/BackTogether/blob/master/images/immunity_small_new.jpg)

