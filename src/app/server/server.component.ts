import * as firebase from 'firebase';
import { Component, ElementRef, ViewChild } from '@angular/core';

import { ServerService } from 'src/app/server.service';
import { AuthService } from 'src/app/auth/auth.service'

@Component({
	selector:'app-server',
	templateUrl: './server.component.html'
})

export class ServerComponent {

	todoListStatus = "Click Save to save todos to db";
	list=[];
	flag="";

	constructor(private serverService: ServerService, 
			private authService: AuthService) {}


	ngOnInit() {
		this.list = this.serverService.getList() || [];
	}


@ViewChild('todo') todo:ElementRef ; 
	onAddingTodo() {
		let currentEle = this.todo.nativeElement;
		let valList = [];

		if(currentEle.value != ' ') {
			  this.todoListStatus = "";
		      if(this.flag=="") {
		      	this.list.push((<HTMLInputElement>currentEle).value);
		      }
		      
		      else
		      	{
		      		let oldVal = this.flag;
		      		this.list.splice(this.list.indexOf(oldVal),1,currentEle.value);
		      		this.flag="";
		      	}
		      currentEle.value = '';
		}
		else {
				 this.todoListStatus = "Add a valid value";
		}
	}

	onKeyPress(event: KeyboardEvent){

	   let key = (event.keyCode);
	   if(key == 13) {
	   			this.onAddingTodo();
	   }

	   if(key == 32) {
	   			return
	   }   
	}


	onDelete(event: Event){
         
         let val =(<HTMLInputElement>event.target).parentNode.parentNode.textContent;
         let node = document.getElementsByClassName("list-group-item");
         (<HTMLInputElement>event.target).parentNode.parentNode.parentNode
         		.removeChild(node[this.list.indexOf(val)]);
         this.list.splice(this.list.indexOf(val),1);
	}


	onEdit(event: Event) {
		let currentEle = this.todo.nativeElement;
		currentEle.value = (<HTMLInputElement>event.target).parentNode.firstChild.textContent;
		this.flag = currentEle.value ;
	}

	onGet() {
		this.serverService.getTodos()
			.then( (response: any) => {
				if(response!= null)
					this.list = response;
					else
					this.todoListStatus = "No existing Todos. Add new values";
				},
					(error) => alert(error)
			);	
	}

	onSave() {
			this.serverService.storeTodos(this.list);
			this.todoListStatus = "Data saved";
	}
	

	onLogout() {
			this.authService.logout();
	}
}