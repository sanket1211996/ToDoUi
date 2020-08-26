import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { TodoService } from '../service/todo.service';
import { ToDo } from '../model/to-do';

@Component({
  selector: 'app-todo-view',
  templateUrl: './todo-view.component.html',
  styleUrls: ['./todo-view.component.css']
})
export class TodoViewComponent implements OnChanges {

  constructor(private todoService: TodoService) { }

  todo = new ToDo(0,0,"","");

  @Input() todoID: Number;
  
  ngOnChanges(): void {
    console.log(this.todoID);
    this.reset();
    this.getToDo();
  }
  
  reset() {
    this.todo = new ToDo(0,0,"","");
  }

  getToDo() {
    console.log("get todo");
    this.todoService.get(this.todoID)
      .subscribe((data) => {
        if(data != null)
          this.todo = data;
      }, (error) => {
        console.log(error);
        this.reset();
      });
  }

}
