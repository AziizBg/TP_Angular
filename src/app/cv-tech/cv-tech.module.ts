import { NgModule } from '@angular/core';
import { AddCvComponent } from '../cv/add-cv/add-cv.component';
import { AutocompleteComponent } from '../cv/autocomplete/autocomplete.component';
import { CvComponent } from '../cv/cv/cv.component';
import { CvCardComponent } from '../cv/cv-card/cv-card.component';
import { DetailsCvComponent } from '../cv/details-cv/details-cv.component';
import { EmbaucheComponent } from '../cv/embauche/embauche.component';
import { ItemComponent } from '../cv/item/item.component';
import { ListComponent } from '../cv/list/list.component';
import { DefaultImagePipe } from '../cv/pipes/default-image.pipe';
import { CvService } from '../cv/services/cv.service';
import { EmbaucheService } from '../cv/services/embauche.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/guards/auth.guard';

@NgModule({
  declarations: [
    AddCvComponent,
    AutocompleteComponent,
    CvComponent,
    CvCardComponent,
    DetailsCvComponent,
    EmbaucheComponent,
    ItemComponent,
    ListComponent,
    DefaultImagePipe,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule.forChild([
      { path: '', component: CvComponent },
      { path: 'add', component: AddCvComponent, canActivate: [AuthGuard] },
      { path: ':id', component: DetailsCvComponent },
    ]),
  ],
  providers: [CvService, EmbaucheService],
  exports: [
    AddCvComponent,
    AutocompleteComponent,
    CvComponent,
    CvCardComponent,
    DetailsCvComponent,
    EmbaucheComponent,
    ItemComponent,
    ListComponent,
    DefaultImagePipe,
  ],
})
export class CvTechModule {}
