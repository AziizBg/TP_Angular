import {Component, inject, OnInit} from "@angular/core";
import { FormBuilder, AbstractControl } from "@angular/forms";
import {catchError, debounceTime, distinctUntilChanged, filter, of, switchMap, tap} from "rxjs";
import { CvService } from "../services/cv.service";
import {Router} from "@angular/router";
import {Cv} from "../model/cv";
import {APP_ROUTES} from "../../../config/routes.config";

@Component({
  selector: "app-autocomplete",
  templateUrl: "./autocomplete.component.html",
  styleUrls: ["./autocomplete.component.css"],
})
export class AutocompleteComponent implements OnInit {
  formBuilder = inject(FormBuilder);
  cvService = inject(CvService);
  router = inject(Router);
  get search(): AbstractControl {
    return this.form.get("search")!;
  }
  form = this.formBuilder.group({ search: [""] });
  filteredCvs: Cv[] = [];

  ngOnInit() {
    this.search.valueChanges.pipe(
      debounceTime(400), // it s recommended from the documentation of Angular to wait before sending the request
      distinctUntilChanged(), // This is also recommended to avoid sending the same request multiple
                              // times for example if the user deletes and re enters the same value
      // tap((search) => {
      //   if (search!.length === 0) {
      //     this.filteredCvs = [];
      //   }
      // }),
      filter((search) => search!.length > 0),
      switchMap( (search) => this.cvService.selectByName(search!)),
      catchError(error => {
        console.error('Search error:', error);
        return of([]);
      })
    ).subscribe((cvs: Cv[]) => {
      this.filteredCvs = cvs;
    })

    // not fetching in the subscribe because this will cause that in every keystroke it will create a new
    // subscription, and all API calls will remain active until completion => overloading the server

    // switchMap transforms the value of the observable valueChanges into another observable (API call)
  }

  selectCv(id: number): void {
    this.router.navigate([APP_ROUTES.cv, id]);
  }
}
