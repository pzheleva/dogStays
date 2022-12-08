# DogStays

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.1.3.
It was designed to run no Microsoft Edge browser because there were some limitations on my laptop for Google Chrome Browser.
DogStays is a platform where everyone can offer their properties for dogs or can choose between different properties and book a place for their dog.


# Design

The application has two parts:

**Public**
Users who are not logged in can access the following pages:

* Login
* Register
* About
* Search
* Home
* Properties



**Private**
Logged in users can access the following pages:

* Home
* Properties
* Details(Owners can edit and delete their publications/ users who are not owners of the property can giva e like and book a place for their dog by filling a form)
* List property
* Search
* Profile
* About


# Installation

The following packages were used for this project:

* Angular 14
* Firebase firestore database
* Angular Material UI Component Library

You should download:
* [NodeJS](https://nodejs.org/en/)
* [Angular CLI](https://angular.io/cli)
* [Angular Material UI Component Library](https://material.angular.io/guide/getting-started)

1. Clone this repository
2. Navigate to the "app" folder
3. Run "npm install"
4. Add environment.ts file to the "app" folder which should contain information about your firabase web configuration:

```
export const environment = {
    production: false,
    firebase: {
        apiKey: "data",
        authDomain: "data",
        databaseURL: "data",
        projectId: "data",
        storageBucket: "data",
        messagingSenderId: "data",
        appId: "data",
        measurementId: "data"
    }
  };
  ```
  You can check [here](https://firebase.google.com/docs/web/setup) for more information about the configuration.
  
  5. Then navigate to the app folder and type "ng serve"
  
  Now open Microsoft Edge browser and open http://localhost:4200/ and you should be ready.
  
