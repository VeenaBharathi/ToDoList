import { Component, ElementRef, ViewChild } from '@angular/core';

import { ServerService } from 'src/app/server.service';

@Component({
	selector:'app-server',
	templateUrl: './server.component.html'
})
export class ServerComponent {
	todoListStatus = "List is empty!";
	list=[];

constructor(private serverService: ServerService) {}


@ViewChild('todo') todo:ElementRef ; 
	onAddingTodo() {
		let currentEle = this.todo.nativeElement;
		let valList = [];

		if(currentEle.value != ' ') {
			  this.todoListStatus = ""
		      console.log( currentEle.value );
		      this.list.push((<HTMLInputElement>currentEle).value);
		      currentEle.value = '';
		}
		else {
				 this.todoListStatus = "Add a valid value";
		}

       
		this.serverService.storeTodos(this.list)
			.subscribe(
					(response) => console.log(response),
					(error) => console.log(error)
			);

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
       //  this.serverService.deleteTodos(val)
		//	.subscribe(
		//		(response) => {
		//			console.log(response);
		//		},
		//			(error) => console.log(error)
		//	);	
	}


	onEdit(event: Event) {
		console.log((<HTMLInputElement>event.target.parentNode.firstChild).click);
	}

	onGet() {
		this.serverService.getTodos()
			.subscribe(
				(response) => {
				if(response!= null)
					this.list = response;
					else
					this.todoListStatus = "No existing Todos. Add new values";
				},
					(error) => console.log(error)
			);	
	}
}