import { Component, signal, WritableSignal } from '@angular/core';
import { EmbaucheService } from '../services/embauche.service';
import { Cv } from '../model/cv';

import { ItemComponent } from '../item/item.component';

@Component({
  selector: 'app-embauche',
  templateUrl: './embauche.component.html',
  styleUrls: ['./embauche.component.css'],
  standalone: true,
  imports: [ItemComponent],
})
export class EmbaucheComponent {
  embauchees: WritableSignal<Cv[]> = signal<Cv[]>([]);
  constructor(private embaucheService: EmbaucheService) {
    this.embauchees.set(this.embaucheService.getEmbauchees());
  }
}
