import {Component, OnInit} from "@angular/core";
import { Cv } from "../model/cv";
import { LoggerService } from "../../services/logger.service";
import { ToastrService } from "ngx-toastr";
import { CvService } from "../services/cv.service";
import {ActivatedRoute} from "@angular/router";
@Component({
  selector: "app-cv",
  templateUrl: "./cv.component.html",
  styleUrls: ["./cv.component.css"],
})
export class CvComponent implements OnInit {
  cvs: Cv[] = [];
  selectedCv: Cv | null = null;
  /*   selectedCv: Cv | null = null; */
  date = new Date();

  constructor(
    private logger: LoggerService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private cvService: CvService
  ) {
    this.cvService.selectCv$.subscribe((cv) => (this.selectedCv = cv));
  }

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.cvs = data['cvs'];
    });
    }
}
