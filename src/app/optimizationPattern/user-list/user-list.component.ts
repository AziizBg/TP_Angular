import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { User } from '../users.service';
import Memoize from 'memo-decorator';
import { FormsModule } from '@angular/forms';

export const fibonnaci = (n: number): number => {
  if (n == 1 || n == 0) {
    return 1;
  }
  return fibonnaci(n - 1) + fibonnaci(n - 2);
};

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush, // This component will only be updated when the input changes
  standalone: true,
  imports: [FormsModule],
})
export class UserListComponent {
  @Input() usersCluster: string = '';
  @Input() users: User[] = [];
  @Output() add = new EventEmitter<string>();
  userFullName: string = '';
  addUser() {
    this.add.emit(this.userFullName);
    this.userFullName = '';
  }
  @Memoize() // Memoize the result of the function to avoid recalculating the same value
  fibo(n: number): number {
    const fib = fibonnaci(n);
    console.log({ n, fib });

    return fib;
  }
}
