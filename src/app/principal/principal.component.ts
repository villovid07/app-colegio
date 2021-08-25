import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IAsignatura } from '../shared/interfaces/IAsignatura';
import { IProfesor } from '../shared/interfaces/IProfesor';
import { IEstudiante } from '../shared/interfaces/IEstudiante';
import { MensajeService } from '../shared/services/mensajes.service';
import { ProfesorService } from '../shared/services/profesor.service';
import { AsignaturaService } from '../shared/services/asignatura.service';
import { EstudianteService } from '../shared/services/estudiante.service';

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

  async ngOnInit(){
    try {
      this._mensajesService.procesando();
      this.lstProfesores = await this._profesorService.darProfesores().toPromise();  
      this._mensajesService.cerrarMensaje();
    } catch (error) {
      this._mensajesService.enviarMensaje("Error", "No se puede cargar la lista de profesores", "e");  
    }
  }

  async buscar(){
    if(this.formProfesor.valid){
      try {
        this._mensajesService.procesando();
        let idProfesor = this.formProfesor.value.profesor;
        this.lstAsignatura = await this._asignaturaService.darAsignaturas(idProfesor).toPromise();    
        this._mensajesService.cerrarMensaje();
      } catch (error) {
        this._mensajesService.enviarMensaje("Error", "No se puede realizar la consulta de las asignaturas", "e"); 
      }
      
    } else  {
      this._mensajesService.enviarMensaje("Advertencia", "El docente es obligatorio", "w");  
    }
  }

  async reiniciar(){

    this.formProfesor.reset({
      "profesor":""
    });
    this.lstAsignatura= new Array();
    this.lstEstudiante= new Array();

  }

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
