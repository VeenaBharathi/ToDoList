import * as firebase from 'firebase';
import { Router } from '@angular/router';

export class  AuthService {

token: string;

signupUser (email: string, password: string) {
	firebase.auth().createUserWithEmailAndPassword(email, password)
		.catch(
			error => console.log(error)
		)
}


signinUser (email: string, password: string) {
	firebase.auth().signInWithEmailAndPassword(email, password)
		.then (
			response => {
				firebase.auth().currentUser.getIdToken()
					.then(
							(token: string) => {
							this.token = token;
							console.log(this.token);
							Router.navigate(['/create']);
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
}

}