import { Component, signal } from '@angular/core';
import { Todo, TodoStatus } from '../model/todo';
import { TodoService } from '../service/todo.service';
import { FormsModule } from '@angular/forms';
import { CONSTANTES } from 'src/config/const.config';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
  providers: [TodoService],
  standalone: true,
  imports: [FormsModule],
})
export class TodoComponent {
  todos: Todo[] = [];
  CONSTANTS = CONSTANTES;

  todos_s = signal<Todo[]>([]);

  todo = new Todo();
  constructor(private todoService: TodoService) {
    // this.todos = this.todoService.getTodos();
    this.todos_s.set(this.todoService.getTodos());
  }
  addTodo() {
    this.todoService.addTodo(this.todo);
    this.todo = new Todo();
  }

  deleteTodo(todo: Todo) {
    this.todoService.deleteTodo(todo);
  }

  updateStatus(i: number, status: TodoStatus) {
    const temp_todos = this.todos_s();
    temp_todos[i].status = status;
  }
}
