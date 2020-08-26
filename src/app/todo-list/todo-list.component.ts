import { Component, OnInit } from '@angular/core';
import { TodoService } from 'src/app/service/todo.service';
import { ToDo } from '../model/to-do';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { TodoEditComponent } from '../todo-edit/todo-edit.component';
import { AuthService } from '../service/auth.service';
import { User } from "src/app/model/user";
@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  isPopupOpened: boolean;
  todoID: any = 0;
  todos: ToDo[];
  todoSize = 0;
  user: User;

  constructor(private todoService: TodoService, 
              private router: Router, 
              private authService: AuthService,
              private dialog?: MatDialog,
              ) { }

  ngOnInit(): void {
    this.getData();
  }

  config = {
    itemsPerPage: 9,
    currentPage: 1,
    totalItems: 0
  };


  pageChanged(event) {
    this.config.currentPage = event;
  }

  fetchToDoList() {

    this.todoService.getAll(this.user.id)
      .subscribe((data) => {
        this.todos = data;
        this.config.totalItems = this.todos.length;
      }, (error) => {
        console.log(error);
      });
  }

  getData(): boolean {
    this.todoService.getCurrentUser()
    .subscribe( (data) => {
      this.user = data;
      console.log(this.user);
      this.fetchToDoList();
      return true;
    }, 
    (error) => {
      console.log(error);
      return false;
    })

    return false;
  }

  addToDo() {

    if(!this.authService.isLoggedIn()) { this.authService.resetToken(); return; };

    this.isPopupOpened = true;
    const dialogRef = this.dialog.open(TodoEditComponent, {});

    dialogRef.afterClosed().subscribe(result => {
      this.isPopupOpened = false;
      this.getData();
    });
  }

  editToDo(todoID) {

    if(!this.authService.isLoggedIn()) { this.authService.resetToken(); return;};

    this.isPopupOpened = true;
    console.log("EDIT BT", todoID);
    const dialogRef = this.dialog.open(TodoEditComponent,
      { data: todoID });

    dialogRef.afterClosed().subscribe(result => {
      this.isPopupOpened = false;
      this.getData();
    });
  }

  deleteToDo(todoID: number) {
    if(!this.authService.isLoggedIn()) { this.authService.resetToken(); return;};

    this.todoService.delete(todoID)
      .subscribe((data) => {
        console.log(data);
        this.getData();
        this.todoID =  0;
      }, (error) => {
        console.log(error);
      });
  }

  display(id) {
    console.log("row clicked", id);
    this.todoID = id;
  }

}
