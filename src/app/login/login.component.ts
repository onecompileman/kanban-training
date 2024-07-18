import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider } from '@angular/fire/auth';

@Component({
  selector: 'kt-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  constructor(public auth: AngularFireAuth) {}
  async signInWithGoogle() {
    await this.auth.signInWithPopup(new GoogleAuthProvider());
  }

  ngOnInit(): void {
    this.auth.authState.subscribe((user) => console.log(user))
  }
}
