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
	this.list = this.serverService.getList();
  }


@ViewChild('todo') todo:ElementRef ; 
	onAddingTodo() {
		let currentEle = this.todo.nativeElement;
		let valList = [];

		if(currentEle.value != ' ') {
			  this.todoListStatus = ""
		      console.log( currentEle.value );
		      if(this.flag=="") {
		      	console.log("flag1 - " + this.flag);
		      	this.list.push((<HTMLInputElement>currentEle).value);
		      }
		      
		      else
		      	{
		      		console.log("flag2 - " + this.flag);
		      		let oldVal = this.flag;
		      		console.log("**" + currentEle.value);
		      		this.list.splice(this.list.indexOf(oldVal),1,currentEle.value);
		      		this.flag="";
		      	}
		      currentEle.value = '';
		}
		else {
				 this.todoListStatus = "Add a valid value";
		}

	}

	onKeyPress(event: Event){

	   let key = (event.keyCode);
	   if(key == '13') {
	   			this.onAddingTodo();
	   }

	   if(key == '32') {
	   			return
	   }
	   
	}


	onDelete(event: Event){
         
         let val = event.target.parentNode.parentNode.textContent;
         event.target.parentNode.parentNode.remove();
         this.list.splice(this.list.indexOf(val),1);
         console.log(this.list);
	}


	onEdit(event: Event) {
		//console.log((<HTMLInputElement>event.target.parentNode.firstChild).click());
		let currentEle = this.todo.nativeElement;
		currentEle.value = (<HTMLInputElement>event.target.parentNode.firstChild).textContent;
		this.flag = currentEle.value ;
		console.log("---" + this.flag )

	}

	onGet() {
		this.serverService.getTodos()
			.then( (response: object) => {
				console.log("&&" + response)
				if(response!= null)
					this.list = response;
					else
					this.todoListStatus = "No existing Todos. Add new values";
				},
					(error) => console.log(error)
			);	
	}

	onSave() {
			this.serverService.storeTodos(this.list);
	}
	



	onLogout() {

	this.authService.logout();
	}

}