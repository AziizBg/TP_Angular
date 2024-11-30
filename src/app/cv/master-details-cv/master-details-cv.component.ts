import {Component, OnDestroy, OnInit} from '@angular/core';
import {CvService} from "../services/cv.service";
import {Cv} from "../model/cv";
import {ToastrService} from "ngx-toastr";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {APP_ROUTES} from "../../../config/routes.config";

@Component({
  selector: 'app-master-details-cv',
  templateUrl: './master-details-cv.component.html',
  styleUrl: './master-details-cv.component.css'
})
export class MasterDetailsCvComponent implements OnInit, OnDestroy {
  protected cvs!: Cv[];
  clicksub : Subscription | undefined;
  constructor(private cvService:CvService,
              private toastr: ToastrService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.cvs = data['cvs'];
    });
    this.clicksub = this.cvService.selectCv$.subscribe(cv => {
      this.router.navigate([APP_ROUTES.cv,APP_ROUTES.list,cv.id])
    })
    }
  ngOnDestroy(): void {
    this.clicksub!.unsubscribe();
  }

}
