import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";


@Injectable({
    providedIn: 'root'
})
export class AsignaturaService {
    ApiUrl: string;

    constructor(
        protected http: HttpClient
    ) {
        this.ApiUrl = environment.ApiUrl;
    }

    darAsignaturas( id_profesor: number): Observable<any> {
        let ruta = [this.ApiUrl, 'asignatura-profesor', id_profesor].join('/');
        return this.http.get(ruta);
    }

}