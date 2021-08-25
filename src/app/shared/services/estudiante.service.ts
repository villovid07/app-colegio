import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";


@Injectable({
    providedIn: 'root'
})
export class EstudianteService {
    ApiUrl: string;

    constructor(
        protected http: HttpClient
    ) {
        this.ApiUrl = environment.ApiUrl;
    }

    darEstudiantesAsignatura( id_asignatura : number): Observable<any> {
        let ruta = [this.ApiUrl, 'estudiantes-asignatura', id_asignatura].join('/');
        return this.http.get(ruta);
    }

}