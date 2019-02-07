import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core'

@Injectable()
export class AuthService {

token: string;

constructor(private router: Router) {}

signupUser (email: string, password: string) {
	firebase.auth().createUserWithEmailAndPassword(email, password)
		.then(
			response => this.router.navigate(['/signin'])
		)
		.catch(
			error => console.log(error)
		)
}


signinUser (email: string, password: string) {
	firebase.auth().signInWithEmailAndPassword(email, password)
		.then (
			response => {
			    this.router.navigate(['/create']);
				firebase.auth().currentUser.getIdToken()
					.then(
							(token: string) => {
							this.token = token;
							console.log(this.token);
							
							}
						)
			}
		)
		.catch(
			error => console.log(error)
		)
}


getToken() {
	
	return firebase.auth().currentUser.getIdToken()
	.then(
		(token: string) => this.token = token
	);
	return this.token;
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