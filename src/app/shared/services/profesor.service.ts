import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";


@Injectable({
    providedIn: 'root'
})
export class ProfesorService {
    ApiUrl: string;

    constructor(
        protected http: HttpClient
    ) {
        this.ApiUrl = environment.ApiUrl;
    }

    darProfesores(): Observable<any> {
        let ruta = [this.ApiUrl, 'profesor'].join('/');
        return this.http.get(ruta);
    }

}