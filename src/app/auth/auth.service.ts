import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core'

@Injectable()
export class AuthService {

	token: any;

	constructor(private router: Router) {}

	onNgInit() {
	}

	signupUser (email: string, password: string) {
		firebase.auth().createUserWithEmailAndPassword(email, password)
			.then(
				response => this.router.navigate(['/signin'])
			)
			.catch(
				error => alert(error)
			)
	}

	signinUser (email: string, password: string) {
		firebase.auth().signInWithEmailAndPassword(email, password)
			.then (
				response => {
				    this.router.navigate(['/create']);
					firebase.auth().currentUser.getIdToken()
						.then(
								(token: any) => {
								this.token = token;
								}
							)
				}
			)
			.catch(
				error => alert(error)
			)
	}

	getToken() {
		
		 return firebase.auth().currentUser.getIdToken()
		.then(
			(token) => {
				this.token = token;
				return this.token;
				}
		);
	}


	isAuthenticated() {
		return this.token != null;
	}


	logout() {
		firebase.auth().signOut();
		this.token = null;
		this.router.navigate(['/']);
	}

}