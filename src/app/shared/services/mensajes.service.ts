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

    /**
     * obtiene los tipos de mensaje 
     * @param pTipo - tipo de mensaje
     * @returns 
     */
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

    /**
     * mensaje de confirmacion de sweet alert
     * @param pTitulo - titulo del mensaje
     * @param pText - texto del mensaje
     * @param pTipo - tipo de mensaje
     * @param allowOutsideClick - permitir click por fuera
     * @param time - tiempo de delay 
     * @returns 
     */
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

    /**
     * mensaje de informacion 
     * @param pTitulo - titulo del mensaje
     * @param pText - texto del mensaje
     * @param pTipo - tipo de mensaje
     * @param allowOutsideClick - permite click por fuera
     * @param time - delay 
     */
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

    /**
     * mensaje de informacion con una funcion adiconal al darle click al aceptar 
     * @param pTitulo - titulo del mensaje
     * @param pText - texto del mensaje
     * @param pTipo - tipo de mensaje
     * @param funcionEvento - funcion al darle click a aceptar
     * @param allowOutsideClick - permitir click por fuera
     * @param time - delay
     */
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


    /**
     * mensaje de espera (spinner)
     * @param title -titulo del mensaje si se quiere parametrizar
     * @param allowOutsideClick - permite click por fuera
     */
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

    /**
     * metodo que permite cerrar un mensaje en cualquier momento
     */
    cerrarMensaje() {
        swal.close();
    }

}