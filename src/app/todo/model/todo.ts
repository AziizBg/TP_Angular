import { CONSTANTES } from "src/config/const.config";

export type TodoStatus = 'waiting' | 'in progress' | 'done';

export class Todo {
  constructor(
    public name = '',
    public content = '',
    // new
    public status: TodoStatus = CONSTANTES.waiting
  ) {}
}
