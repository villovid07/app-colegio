import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

/**
 * Servicio que permite lanzar las consultas relacionadas con el profesor
 */
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

    /**
     * metodo que permite dar los profesores registrados en el sistema
     * @returns 
     */
    darProfesores(): Observable<any> {
        let ruta = [this.ApiUrl, 'profesor'].join('/');
        return this.http.get(ruta);
    }

}