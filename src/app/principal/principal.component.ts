import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IAsignatura } from '../shared/interfaces/IAsignatura';
import { IProfesor } from '../shared/interfaces/IProfesor';
import { IEstudiante } from '../shared/interfaces/IEstudiante';
import { MensajeService } from '../shared/services/mensajes.service';
import { ProfesorService } from '../shared/services/profesor.service';
import { AsignaturaService } from '../shared/services/asignatura.service';
import { EstudianteService } from '../shared/services/estudiante.service';


/**
 * Componente que estbalece las funcionalidades de la pantalla principal
 */
@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {


  lstProfesores : IProfesor[];
  lstAsignatura: IAsignatura[];
  lstEstudiante: IEstudiante[];
  formProfesor: FormGroup;

  constructor(
    public _mensajesService: MensajeService,
    public _profesorService : ProfesorService,
    public _asignaturaService: AsignaturaService,
    public _estudianteService: EstudianteService,
    public fb : FormBuilder
  ) { 
    this.lstProfesores= new Array();
    this.formProfesor = fb.group({
      'profesor': ['', Validators.required]
    });

  }

  /**
   * metodo ngoninit del componente que permite inicializar el listado de profesores
   */
  async ngOnInit(){
    try {
      this._mensajesService.procesando();
      this.lstProfesores = await this._profesorService.darProfesores().toPromise();  
      this._mensajesService.cerrarMensaje();
    } catch (error) {
      this._mensajesService.enviarMensaje("Error", "No se puede cargar la lista de profesores", "e");  
    }
  }

  /**
   * metodo que permite realizar la busqueda de asignaturas teniendo en cuenta el docente seleccionado
   */
  async buscar(){
    if(this.formProfesor.valid){
      try {
        this._mensajesService.procesando();
        let idProfesor = this.formProfesor.value.profesor;
        this.lstAsignatura = await this._asignaturaService.darAsignaturas(idProfesor).toPromise();  
        this.lstEstudiante = new Array();  
        this._mensajesService.cerrarMensaje();
      } catch (error) {
        this._mensajesService.enviarMensaje("Error", "No se puede realizar la consulta de las asignaturas", "e"); 
      }
      
    } else  {
      this._mensajesService.enviarMensaje("Advertencia", "El docente es obligatorio", "w");  
    }
  }

  /**
   * metodo que permite reinicializar la app 
   */
  async reiniciar(){

    this.formProfesor.reset({
      "profesor":""
    });
    this.lstAsignatura= new Array();
    this.lstEstudiante= new Array();

  }

  /**
   * metodo que permite ver los estudiantes seleccionada una asignatura en particular
   * @param item - asignatura a buscar
   */
  async verEstudiantes( item : IAsignatura){

    try {
      this._mensajesService.procesando();
      this.lstEstudiante = await this._estudianteService.darEstudiantesAsignatura(item.idAsignatura).toPromise();
      this._mensajesService.cerrarMensaje();
      
    } catch (error) {
      this._mensajesService.enviarMensaje("Error", "No se puede realizar la consulta de los estudiantes", "e"); 
    }

  }

}
