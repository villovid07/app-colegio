import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

/**
 * Servicio que permite realizar las consultas relacionadas a asignaturas
 */
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

    /**
     * Metodo que permite obtener las asignaturas dado el identificador de un profesor
     * @param id_profesor - identificador del profesor
     * @returns 
     */
    darAsignaturas( id_profesor: number): Observable<any> {
        let ruta = [this.ApiUrl, 'asignatura-profesor', id_profesor].join('/');
        return this.http.get(ruta);
    }

}