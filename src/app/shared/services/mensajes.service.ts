import { Injectable } from '@angular/core';

import swal from 'sweetalert2';

/**
 * Servicio que consolida todas las funciones de mensajes enviados al usuario haciendo uso
 * de sweetalert
 */
@Injectable({
    providedIn: "root"
})
export class MensajeService {

    darTiposMensaje(pTipo) {

        let titulo = 'Error';
        let tipo = 'error';

        if (pTipo != null && pTipo != '') {
            let miTipo = pTipo.toLowerCase();
            if (miTipo == 's' || miTipo == 'success') {
                titulo = 'Éxito';
                tipo = 'success';
            } else if (miTipo == 'w' || miTipo == 'warning') {
                titulo = 'Advertencia';
                tipo = 'warning';
            } else if (miTipo == 'e' || miTipo == 'error') {
                titulo = 'Error';
                tipo = 'error';
            } else if (miTipo == 'i' || miTipo == 'info') {
                titulo = 'Información';
                tipo = 'info';
            } else if (miTipo == 'q' || miTipo == 'question') {
                titulo = 'Pregunta';
                tipo = 'question';
            }
        }

        return {
            titulo: titulo,
            tipo: tipo
        }
    }

    mensajeConfimacion(pTitulo, pText, pTipo, allowOutsideClick = false, time = 250, ) {

        var self = this;

        return new Promise(function (resolve, reject) {
            let rTipoMensaje = <any>self.darTiposMensaje(pTipo);
            swal({
                title: pTitulo != null && pTitulo != '' ? pTitulo : rTipoMensaje.titulo,
                html: pText,
                type: rTipoMensaje.tipo,
                allowOutsideClick: allowOutsideClick,
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                cancelButtonText: 'Cancelar',
                confirmButtonText: 'Aceptar'
            }).then(result => {
                if (result.value) {
                    resolve({ "mensaje": "aceptar click" });
                }
                else {
                    reject({ "cancelado": "operacion cancelada" });
                }

            });

        });
    }

    enviarMensaje(pTitulo, pText, pTipo, allowOutsideClick = false, time = 250) {
        let rTipoMensaje = <any>this.darTiposMensaje(pTipo);
        setTimeout(() => {
            swal({
                title: pTitulo != null && pTitulo != '' ? pTitulo : rTipoMensaje.titulo,
                html: pText,
                type: rTipoMensaje.tipo,
                allowOutsideClick: allowOutsideClick,
                // animation: false,
                // customClass: 'animated rollIn'
            })
        }, time);
    }

    enviarMensajeFuncion(pTitulo, pText, pTipo, funcionEvento, allowOutsideClick = false, time = 250, ) {
        let rTipoMensaje = <any>this.darTiposMensaje(pTipo);
        setTimeout(() => {
            swal({
                title: pTitulo != null && pTitulo != '' ? pTitulo : rTipoMensaje.titulo,
                html: pText,
                type: rTipoMensaje.tipo,
                allowOutsideClick: allowOutsideClick,
                // animation: false,
                // customClass: 'animated rollIn'
            }).then(function () {
                funcionEvento();
            })
        }, time);
    }


    procesando(title = 'Procesando', allowOutsideClick = false) {
        swal({
            title: title,
            html: 'Por favor espere un momento mientras procesamos su solicitud.',
            //type: type,
            allowOutsideClick: allowOutsideClick,
            onOpen: () => {
                swal.showLoading()
            }
        })
    }

    cerrarMensaje() {
        swal.close();
    }

}