import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Injectable} from "@angular/core";
import {Cv} from "../model/cv";
import {Observable} from "rxjs";
import {CvService} from "../services/cv.service";

@Injectable({
  providedIn: 'root',
})
export class CvListResolver implements Resolve<Cv[]> {
  constructor(private cvService: CvService) {
  }
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Cv[]>{
    return this.cvService.getCvs();
  }
}
