import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFunctions, getFunctions } from '@angular/fire/functions';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { ContactComponent } from './components/contact/contact.component';
import { NavbarComponent } from './components/navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    ProjectsComponent,
    ContactComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule, // ✅ for ngModel in your contact form
    AppRoutingModule,

    // ✅ Firebase initialization
    provideFirebaseApp(() => initializeApp({
  apiKey: "AIzaSyDjeh9mvU98sqXqbMwyas4hhyL4Lbdq1Bs",
  authDomain: "risingsondevportfolio.firebaseapp.com",
  databaseURL: "https://risingsondevportfolio-default-rtdb.firebaseio.com",
  projectId: "risingsondevportfolio",
  storageBucket: "risingsondevportfolio.firebasestorage.app",
  messagingSenderId: "696830543225",
  appId: "1:696830543225:web:d4a8c03f3de6b8768a9ba8",
  measurementId: "G-P2XSJLVWRF"
})),

    // ✅ Cloud Functions
    provideFunctions(() => getFunctions(undefined, 'us-central1'))

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
