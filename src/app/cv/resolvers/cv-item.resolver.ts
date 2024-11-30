import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Cv} from "../model/cv";
import {Observable} from "rxjs";
import {CvService} from "../services/cv.service";

@Injectable({
  providedIn: 'root',
})
export class CvItemResolver implements Resolve<Cv> {
  constructor(private cvService: CvService) {
  }
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Cv> | Cv {
    const cvId = +route.paramMap.get('id')!;
    return this.cvService.getCvById(cvId);
  }
}
