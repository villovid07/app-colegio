import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

/**
 * Servicio que permite realizar las consultas relacionadas a estudiantes
 */
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

    /**
     * metodo que permite obtener los estudiantes teniendo en cuenta una asignatura en particular
     * @param id_asignatura - identificador de la asignatura
     * @returns 
     */
    darEstudiantesAsignatura( id_asignatura : number): Observable<any> {
        let ruta = [this.ApiUrl, 'estudiantes-asignatura', id_asignatura].join('/');
        return this.http.get(ruta);
    }

}