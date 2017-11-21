import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'app';

  ngOnInit(): void {
    
    var config = {
      apiKey: "AIzaSyDz6sH72OHIHsOUUFXR_y-CJoQFBPp5T50",
      authDomain: "jta-instagram-clone-625ed.firebaseapp.com",
      databaseURL: "https://jta-instagram-clone-625ed.firebaseio.com",
      projectId: "jta-instagram-clone-625ed",
      storageBucket: "jta-instagram-clone-625ed.appspot.com",
      messagingSenderId: "162575118164"
    };
    firebase.initializeApp(config);

  }
  
}
