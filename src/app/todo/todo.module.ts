import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TodoComponent } from './todo/todo.component';
import { TodoService } from './service/todo.service';

@NgModule({
  declarations: [TodoComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: TodoComponent }]),
  ],
  providers: [TodoService],
})
export class TodoModule {}
