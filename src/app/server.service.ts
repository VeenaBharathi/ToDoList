import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AuthService } from './auth/auth.service'
@Injectable()
export class ServerService {
	//helps to get access to inbuilt http service methods
	constructor(private http: HttpClient,
				private authService: AuthService
	)	{} 



	storeTodos(todo: any[]) {
		this.authService.getToken()
		.then(
			(token: string) => {
				console.log(token);
				this.http.put('https://todo-app-7de80.firebaseio.com/data.json?auth=' + token, todo).subscribe()
			}
		)
		
	}



	getTodos() {
	const token = this.authService.getToken()
		.then(
			response => {
					return this.http.get('https://todo-app-7de80.firebaseio.com/data.json?auth=' + token);
				}
		)

	}

//	deleteTodos(todo: string) {
//		return this.http.delete('https://todo-app-7de80.firebaseio.com/data.json', todo);
//	}
}