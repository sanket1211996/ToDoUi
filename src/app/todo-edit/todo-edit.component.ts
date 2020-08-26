import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { ToDo } from '../model/to-do';
import { TodoService } from '../service/todo.service';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from '../model/user';


@Component({
  selector: 'app-todo-edit',
  templateUrl: './todo-edit.component.html',
  styleUrls: ['./todo-edit.component.css']
})
export class TodoEditComponent implements OnInit {

  constructor(private todoService: TodoService,
              public dialogRef: MatDialogRef<TodoEditComponent>,
              @Inject(MAT_DIALOG_DATA) public todoID) { }

  todo = new ToDo(0,0,"","");
  user: User;
  @Output() newToDoEmit =  new EventEmitter();

  ngOnInit(): void {
    
    console.log("TODOID", this.todoID);
    if(this.todoID != null) {
      this.getToDo();
    } 
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  getToDo() {
    this.todoService.get( this.todoID)
      .subscribe((data) => {
       this.todo = data;
      }, (error) => {
        console.log(error);
        this.reset();
      });
  }



  saveToDo() {  
    this.todoService.getCurrentUser()
    .subscribe( (data) => {
      this.user = data;
      console.log(this.user);
      this.writeData();
      return true;
    }, 
    (error) => {
      console.log(error);
      return false;
    })
  }

  writeData() {
    this.todo.userID = this.user.id;    
    this.todoService.create(this.todo)
    .subscribe((data) => {
      this.newToDoEmit.emit();
      this.onNoClick();
    }, (error) => {
      console.log(error);
      this.reset();
    });
  }

  reset() {
    this.todo = new ToDo(0,0,"","");
  }

}
