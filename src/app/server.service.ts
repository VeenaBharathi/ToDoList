import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AuthService } from './auth/auth.service'
@Injectable()
export class ServerService {
	//helps to get access to inbuilt http service methods
	constructor(private http: HttpClient,
				authService: AuthService
	)	{} 

	storeTodos(todo: any[]) {
	const token = this.authService.getToken();
		return this.http.put('https://todo-app-7de80.firebaseio.com/data.json?auth=' + token, todo)
	}

	getTodos() {
	const token = this.authService.getToken()
	return this.http.get('https://todo-app-7de80.firebaseio.com/data.json?auth=' + token);
	}

//	deleteTodos(todo: string) {
//		return this.http.delete('https://todo-app-7de80.firebaseio.com/data.json', todo);
//	}
}