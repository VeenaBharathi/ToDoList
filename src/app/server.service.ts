import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AuthService } from './auth/auth.service';

@Injectable()
export class ServerService {

todos : any;
	//helps to get access to inbuilt http service methods
	
	constructor(private http: HttpClient,
				private authService: AuthService
	)	{} 



	storeTodos(todo: any) {
		this.authService.getToken()
		.then(
			(token: any) => {
				this.http.put('https://todo-app-7de80.firebaseio.com/data.json?auth=' + token, todo).subscribe()
				}
		)
		
	}



getTodos() {

	return this.authService.getToken()
		.then(
			(token: any) => {
				this.http.get('https://todo-app-7de80.firebaseio.com/data.json?auth=' + token)
				.subscribe (
				 (data: any) => {
                        this.todos = data
                    //    console.log ( 'Data response: ', this.todos );
						return this.todos;
						//this.getList();
                    }
					
					)
					
				}
		)

	}

	getList() {
	//console.log("----" + this.todos);
		return this.todos;
	}
}