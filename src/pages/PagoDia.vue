<template>
  <q-page
    class="row q-pa-md items-start justify-center row-gap"
    style="min-height: fit-content"
  >
    <div class="row row-gap col-12 col-md-10 col-lg-8">
      <header class="row col-12" style="height: fit-content">
        <div class="row col-12 column-gap justify-around">
          <q-select
            :options="rutaStore.listaRutas"
            filled
            v-model="ruta"
            dense
            behavior="menu"
            class="col"
            @update:model-value="HandleRutaSelected"
            label="Selecciona Ruta"
            option-label="nombreRuta"
          ></q-select>
          <!-- <q-input
            filled
            v-model="filtro.from"
            mask="date"
            hide-bottom-space
            dense
            disable
            class="col"
            :rules="['date']"
          >
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy
                  cover
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-date v-model="fecha.from">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input> -->
        </div>
      </header>
      <div class="col-12" v-show="ruta !== null">
        <q-card class="row col-12 q-pt-md q-px-md">
          <p class="text-subtitle1 col-6">
            Total de Comisión :
            <span class="q-px-sm">{{ currency(comision) }} </span>
          </p>
          <p class="col-6 text-subtitle1">
            Venta Total Semanal
            <span class="q-px-sm">{{ currency(total) }} </span>
          </p>
        </q-card>
        <p class="text-subtitle2 text-primary q-pt-md col-12">
          Detalle semanal de la ruta
        </p>

        <q-card
          class="row col-12 q-px-md q-pt-md q-pb-sm q-mb-sm"
          v-for="(dia, index) in dataRes"
          :key="index"
        >
          <div class="row col-12 items-center">
            <div class="col-6">
              <p class="q-ma-none q-pb-sm text-subtitle2">
                {{ dia.salida.FechaFormat }}
              </p>
              <div class="row col-12">
                <span class="q-pr-md"
                  >Salio a las: {{ dia.salida.horaLlegada }}
                </span>
                <span>Llego a las: {{ dia.recepcion.horaLlegada }}</span>
              </div>
            </div>
            <div class="col-3">
              <p class="row q-ma-none">
                Venta<span class="text-subtitle2 col-12">{{
                  currency(dia.totalVenta)
                }}</span>
              </p>
            </div>
            <div class="col-3">
              <p class="row q-ma-none">
                Comisión
                <span class="text-subtitle2 col-12">{{
                  currency(dia.comision)
                }}</span>
              </p>
            </div>
          </div>
          <div class="row col-12 text-accent q-mt-sm">
            <q-btn
              flat
              color="secondary"
              label="Detalles"
              size="0.95em"
              dense
              @click="handleShowDetalle(dia)"
            ></q-btn>
          </div>
        </q-card>

        <div class="row col-12 justify-end q-mt-sm">
          <q-btn label="Registrar Pago" color="primary"></q-btn>
        </div>
      </div>

      <div class="row col-12 text-center justify-center" v-show="ruta === null">
        <h6 class="text-center">Selecciona una ruta para continuar</h6>
        <div class="row col-12 justify-center">
          <q-img
            src="~assets/LogoColima.png" alt="" style="width:400px;" />          
        </div>
      </div>

      <q-dialog v-model:model-value="showDetalleDia">
        <q-card style="max-width: 80vw; width: 600px">
          <q-card-section class="q-pb-sm">
            <h6 class="q-ma-none">{{ diaSelected.salida.FechaFormat }}</h6>
          </q-card-section>
          <q-card-section>
            <header class="row col-12 q-mb-xs">
              <row class="col-5 text-subtitle2 text-secondary">Tipo Pan</row>
              <row class="col-3 text-center text-subtitle2 text-secondary"
                >Carga dia</row
              >
              <row class="col-2 text-center text-subtitle2 text-secondary"
                >Merma</row
              >
              <row class="col-2 text-center text-subtitle2 text-secondary"
                >Bueno</row
              >
            </header>
            <div
              :class="[index % 2 === 0 ? 'bg-grey-2' : '', 'row col-12']"
              v-for="(pan, index) in diaSelected.listadoPanesDiario"
              :key="pan.idPan"
            >
              <div class="row col-5 q-pa-sm text-bold">{{ pan.nombre }}</div>
              <div class="row col-3 q-pa-sm justify-center">
                {{ pan.cargaDia }}
              </div>
              <div class="row col-2 q-pa-sm justify-center">
                {{ pan.merma }}
              </div>
              <div class="row col-2 q-pa-sm justify-center">
                {{ pan.pzBuenas }}
              </div>
            </div>
          </q-card-section>
        </q-card>
      </q-dialog>
    </div>
  </q-page>
</template>
<script>
import { date } from "quasar";
import { useRutasStore } from "src/stores/example-store";
import { formatCurrency } from "src/Utils/commons";
import { useService } from "src/Utils/Servicio";

const comisionesService = useService("Comisiones");
export default {
  data() {
    return {
      filtro: {
        from: "",
        to: "",
        valor: 0,
      },
      dataRes: [
        {
          salida: {
            idSalida: 9,
            idRuta: 0,
            fechaRegistro: "2024-10-07T19:49:58.627",
            FechaFormat: "Lunes 07-Octubre 2024",
            horaLlegada: "06:09 pm",
            idUsuario: 0,
            usuario: {
              idUsuario: 1,
              nombre: "Marco Antonio Renteria",
              usuario: "",
              contraseña: "",
              rol: 1,
              estatus: 1,
            },
            totalSalida: 3318,
            estatus: 0,
            idPanaderia: 0,
            listaPresentacionPanes: [],
            ruta: {
              idRuta: 0,
              idPanaderia: 0,
              ultimaParada: "",
              tiempoRecorridoenHoras: "",
              estatus: 0,
              kmRecorridos: 0,
              nombreRuta: "",
            },
          },
          recepcion: {
            idSalida: 0,
            idRuta: 0,
            fechaRegistro: "2024-10-07T19:52:20.357",
            FechaFormat: "",
            horaLlegada: "06:30 pm",
            idUsuario: 0,
            usuario: {
              idUsuario: 1,
              nombre: "Marco Antonio Renteria",
              usuario: "",
              contraseña: "",
              rol: 1,
              estatus: 1,
            },
            totalSalida: 1550,
            estatus: 0,
            idPanaderia: 0,
            listaPresentacionPanes: [],
            ruta: {
              idRuta: 0,
              idPanaderia: 0,
              ultimaParada: "",
              tiempoRecorridoenHoras: "",
              estatus: 0,
              kmRecorridos: 0,
              nombreRuta: "",
            },
            idSalidaRel: 0,
          },
          listadoPanesDiario: [
            {
              enExistencia: 0,
              cargaDia: 210,
              merma: 0,
              pzBuenas: 0,
              idSalidaRel: 0,
              idPan: 1,
              nombre: "Pan Dulce",
              idTipo: 0,
              precio: 10,
            },
            {
              enExistencia: 0,
              cargaDia: 56,
              merma: 0,
              pzBuenas: 0,
              idSalidaRel: 0,
              idPan: 2,
              nombre: "Chino",
              idTipo: 0,
              precio: 12,
            },
            {
              enExistencia: 0,
              cargaDia: 32,
              merma: 0,
              pzBuenas: 0,
              idSalidaRel: 0,
              idPan: 3,
              nombre: "Avena",
              idTipo: 0,
              precio: 13,
            },
            {
              enExistencia: 0,
              cargaDia: 0,
              merma: 0,
              pzBuenas: 0,
              idSalidaRel: 0,
              idPan: 5,
              nombre: "Sorbete",
              idTipo: 0,
              precio: 14,
            },
            {
              enExistencia: 0,
              cargaDia: 0,
              merma: 0,
              pzBuenas: 0,
              idSalidaRel: 0,
              idPan: 6,
              nombre: "Panini",
              idTipo: 0,
              precio: 14,
            },
            {
              enExistencia: 0,
              cargaDia: 0,
              merma: 0,
              pzBuenas: 0,
              idSalidaRel: 0,
              idPan: 7,
              nombre: "Orejita",
              idTipo: 0,
              precio: 50,
            },
            {
              enExistencia: 0,
              cargaDia: 0,
              merma: 0,
              pzBuenas: 0,
              idSalidaRel: 0,
              idPan: 8,
              nombre: "Sema",
              idTipo: 0,
              precio: 10,
            },
            {
              enExistencia: 0,
              cargaDia: 10,
              merma: 0,
              pzBuenas: 0,
              idSalidaRel: 0,
              idPan: 17,
              nombre: "Bolillo",
              idTipo: 0,
              precio: 13,
            },
            {
              enExistencia: 0,
              cargaDia: 0,
              merma: 0,
              pzBuenas: 0,
              idSalidaRel: 0,
              idPan: 18,
              nombre: "Telera",
              idTipo: 0,
              precio: 13,
            },
            {
              enExistencia: 0,
              cargaDia: 0,
              merma: 0,
              pzBuenas: 0,
              idSalidaRel: 0,
              idPan: 19,
              nombre: "R5 Chica",
              idTipo: 0,
              precio: 190,
            },
            {
              enExistencia: 0,
              cargaDia: 0,
              merma: 0,
              pzBuenas: 0,
              idSalidaRel: 0,
              idPan: 20,
              nombre: "R5 Grande",
              idTipo: 0,
              precio: 290,
            },
          ],
          comision: 0,
          totalVenta: 1550,
        },
        {
          salida: {
            idSalida: 9,
            idRuta: 0,
            fechaRegistro: "2024-10-07T19:49:58.627",
            FechaFormat: "Martes 08-Octubre 2024",
            horaLlegada: "06:09 pm",
            idUsuario: 0,
            usuario: {
              idUsuario: 1,
              nombre: "Marco Antonio Renteria",
              usuario: "",
              contraseña: "",
              rol: 1,
              estatus: 1,
            },
            totalSalida: 3318,
            estatus: 0,
            idPanaderia: 0,
            listaPresentacionPanes: [],
            ruta: {
              idRuta: 0,
              idPanaderia: 0,
              ultimaParada: "",
              tiempoRecorridoenHoras: "",
              estatus: 0,
              kmRecorridos: 0,
              nombreRuta: "",
            },
          },
          recepcion: {
            idSalida: 0,
            idRuta: 0,
            fechaRegistro: "2024-10-07T19:52:20.357",
            FechaFormat: "",
            horaLlegada: "06:30 pm",
            idUsuario: 0,
            usuario: {
              idUsuario: 1,
              nombre: "Marco Antonio Renteria",
              usuario: "",
              contraseña: "",
              rol: 1,
              estatus: 1,
            },
            totalSalida: 1550,
            estatus: 0,
            idPanaderia: 0,
            listaPresentacionPanes: [],
            ruta: {
              idRuta: 0,
              idPanaderia: 0,
              ultimaParada: "",
              tiempoRecorridoenHoras: "",
              estatus: 0,
              kmRecorridos: 0,
              nombreRuta: "",
            },
            idSalidaRel: 0,
          },
          listadoPanesDiario: [
            {
              enExistencia: 0,
              cargaDia: 210,
              merma: 0,
              pzBuenas: 0,
              idSalidaRel: 0,
              idPan: 1,
              nombre: "Pan Dulce",
              idTipo: 0,
              precio: 10,
            },
            {
              enExistencia: 0,
              cargaDia: 56,
              merma: 0,
              pzBuenas: 0,
              idSalidaRel: 0,
              idPan: 2,
              nombre: "Chino",
              idTipo: 0,
              precio: 12,
            },
            {
              enExistencia: 0,
              cargaDia: 32,
              merma: 0,
              pzBuenas: 0,
              idSalidaRel: 0,
              idPan: 3,
              nombre: "Avena",
              idTipo: 0,
              precio: 13,
            },
            {
              enExistencia: 0,
              cargaDia: 0,
              merma: 0,
              pzBuenas: 0,
              idSalidaRel: 0,
              idPan: 5,
              nombre: "Sorbete",
              idTipo: 0,
              precio: 14,
            },
            {
              enExistencia: 0,
              cargaDia: 0,
              merma: 0,
              pzBuenas: 0,
              idSalidaRel: 0,
              idPan: 6,
              nombre: "Panini",
              idTipo: 0,
              precio: 14,
            },
            {
              enExistencia: 0,
              cargaDia: 0,
              merma: 0,
              pzBuenas: 0,
              idSalidaRel: 0,
              idPan: 7,
              nombre: "Orejita",
              idTipo: 0,
              precio: 50,
            },
            {
              enExistencia: 0,
              cargaDia: 0,
              merma: 0,
              pzBuenas: 0,
              idSalidaRel: 0,
              idPan: 8,
              nombre: "Sema",
              idTipo: 0,
              precio: 10,
            },
            {
              enExistencia: 0,
              cargaDia: 10,
              merma: 0,
              pzBuenas: 0,
              idSalidaRel: 0,
              idPan: 17,
              nombre: "Bolillo",
              idTipo: 0,
              precio: 13,
            },
            {
              enExistencia: 0,
              cargaDia: 0,
              merma: 0,
              pzBuenas: 0,
              idSalidaRel: 0,
              idPan: 18,
              nombre: "Telera",
              idTipo: 0,
              precio: 13,
            },
            {
              enExistencia: 0,
              cargaDia: 0,
              merma: 0,
              pzBuenas: 0,
              idSalidaRel: 0,
              idPan: 19,
              nombre: "R5 Chica",
              idTipo: 0,
              precio: 190,
            },
            {
              enExistencia: 0,
              cargaDia: 0,
              merma: 0,
              pzBuenas: 0,
              idSalidaRel: 0,
              idPan: 20,
              nombre: "R5 Grande",
              idTipo: 0,
              precio: 290,
            },
          ],
          comision: 0,
          totalVenta: 1550,
        },
        {
          salida: {
            idSalida: 9,
            idRuta: 0,
            fechaRegistro: "2024-10-07T19:49:58.627",
            FechaFormat: "Miércoles 09-Octubre 2024",
            horaLlegada: "06:09 pm",
            idUsuario: 0,
            usuario: {
              idUsuario: 1,
              nombre: "Marco Antonio Renteria",
              usuario: "",
              contraseña: "",
              rol: 1,
              estatus: 1,
            },
            totalSalida: 3318,
            estatus: 0,
            idPanaderia: 0,
            listaPresentacionPanes: [],
            ruta: {
              idRuta: 0,
              idPanaderia: 0,
              ultimaParada: "",
              tiempoRecorridoenHoras: "",
              estatus: 0,
              kmRecorridos: 0,
              nombreRuta: "",
            },
          },
          recepcion: {
            idSalida: 0,
            idRuta: 0,
            fechaRegistro: "2024-10-07T19:52:20.357",
            FechaFormat: "",
            horaLlegada: "06:30 pm",
            idUsuario: 0,
            usuario: {
              idUsuario: 1,
              nombre: "Marco Antonio Renteria",
              usuario: "",
              contraseña: "",
              rol: 1,
              estatus: 1,
            },
            totalSalida: 1550,
            estatus: 0,
            idPanaderia: 0,
            listaPresentacionPanes: [],
            ruta: {
              idRuta: 0,
              idPanaderia: 0,
              ultimaParada: "",
              tiempoRecorridoenHoras: "",
              estatus: 0,
              kmRecorridos: 0,
              nombreRuta: "",
            },
            idSalidaRel: 0,
          },
          listadoPanesDiario: [
            {
              enExistencia: 0,
              cargaDia: 210,
              merma: 0,
              pzBuenas: 0,
              idSalidaRel: 0,
              idPan: 1,
              nombre: "Pan Dulce",
              idTipo: 0,
              precio: 10,
            },
            {
              enExistencia: 0,
              cargaDia: 56,
              merma: 0,
              pzBuenas: 0,
              idSalidaRel: 0,
              idPan: 2,
              nombre: "Chino",
              idTipo: 0,
              precio: 12,
            },
            {
              enExistencia: 0,
              cargaDia: 32,
              merma: 0,
              pzBuenas: 0,
              idSalidaRel: 0,
              idPan: 3,
              nombre: "Avena",
              idTipo: 0,
              precio: 13,
            },
            {
              enExistencia: 0,
              cargaDia: 0,
              merma: 0,
              pzBuenas: 0,
              idSalidaRel: 0,
              idPan: 5,
              nombre: "Sorbete",
              idTipo: 0,
              precio: 14,
            },
            {
              enExistencia: 0,
              cargaDia: 0,
              merma: 0,
              pzBuenas: 0,
              idSalidaRel: 0,
              idPan: 6,
              nombre: "Panini",
              idTipo: 0,
              precio: 14,
            },
            {
              enExistencia: 0,
              cargaDia: 0,
              merma: 0,
              pzBuenas: 0,
              idSalidaRel: 0,
              idPan: 7,
              nombre: "Orejita",
              idTipo: 0,
              precio: 50,
            },
            {
              enExistencia: 0,
              cargaDia: 0,
              merma: 0,
              pzBuenas: 0,
              idSalidaRel: 0,
              idPan: 8,
              nombre: "Sema",
              idTipo: 0,
              precio: 10,
            },
            {
              enExistencia: 0,
              cargaDia: 10,
              merma: 0,
              pzBuenas: 0,
              idSalidaRel: 0,
              idPan: 17,
              nombre: "Bolillo",
              idTipo: 0,
              precio: 13,
            },
            {
              enExistencia: 0,
              cargaDia: 0,
              merma: 0,
              pzBuenas: 0,
              idSalidaRel: 0,
              idPan: 18,
              nombre: "Telera",
              idTipo: 0,
              precio: 13,
            },
            {
              enExistencia: 0,
              cargaDia: 0,
              merma: 0,
              pzBuenas: 0,
              idSalidaRel: 0,
              idPan: 19,
              nombre: "R5 Chica",
              idTipo: 0,
              precio: 190,
            },
            {
              enExistencia: 0,
              cargaDia: 0,
              merma: 0,
              pzBuenas: 0,
              idSalidaRel: 0,
              idPan: 20,
              nombre: "R5 Grande",
              idTipo: 0,
              precio: 290,
            },
          ],
          comision: 0,
          totalVenta: 1550,
        },
        {
          salida: {
            idSalida: 1002,
            idRuta: 0,
            fechaRegistro: "2024-10-09T18:09:07.217",
            FechaFormat: "Jueves 10-Octubre 2024",
            horaLlegada: "06:09 pm",
            idUsuario: 0,
            usuario: {
              idUsuario: 1,
              nombre: "Marco Antonio Renteria",
              usuario: "",
              contraseña: "",
              rol: 1,
              estatus: 1,
            },
            totalSalida: 1050,
            estatus: 0,
            idPanaderia: 0,
            listaPresentacionPanes: [],
            ruta: {
              idRuta: 0,
              idPanaderia: 0,
              ultimaParada: "",
              tiempoRecorridoenHoras: "",
              estatus: 0,
              kmRecorridos: 0,
              nombreRuta: "",
            },
          },
          recepcion: {
            idSalida: 0,
            idRuta: 0,
            fechaRegistro: "2024-10-09T18:30:07.723",
            FechaFormat: "",
            horaLlegada: "06:30 pm",
            idUsuario: 0,
            usuario: {
              idUsuario: 1,
              nombre: "Marco Antonio Renteria",
              usuario: "",
              contraseña: "",
              rol: 1,
              estatus: 1,
            },
            totalSalida: 1600,
            estatus: 0,
            idPanaderia: 0,
            listaPresentacionPanes: [],
            ruta: {
              idRuta: 0,
              idPanaderia: 0,
              ultimaParada: "",
              tiempoRecorridoenHoras: "",
              estatus: 0,
              kmRecorridos: 0,
              nombreRuta: "",
            },
            idSalidaRel: 0,
          },
          listadoPanesDiario: [
            {
              enExistencia: 0,
              cargaDia: 105,
              merma: 0,
              pzBuenas: 0,
              idSalidaRel: 0,
              idPan: 1,
              nombre: "Pan Dulce",
              idTipo: 0,
              precio: 10,
            },
            {
              enExistencia: 0,
              cargaDia: 0,
              merma: 0,
              pzBuenas: 0,
              idSalidaRel: 0,
              idPan: 2,
              nombre: "Chino",
              idTipo: 0,
              precio: 12,
            },
            {
              enExistencia: 0,
              cargaDia: 0,
              merma: 0,
              pzBuenas: 0,
              idSalidaRel: 0,
              idPan: 3,
              nombre: "Avena",
              idTipo: 0,
              precio: 13,
            },
            {
              enExistencia: 0,
              cargaDia: 0,
              merma: 0,
              pzBuenas: 0,
              idSalidaRel: 0,
              idPan: 5,
              nombre: "Sorbete",
              idTipo: 0,
              precio: 14,
            },
            {
              enExistencia: 0,
              cargaDia: 0,
              merma: 0,
              pzBuenas: 0,
              idSalidaRel: 0,
              idPan: 6,
              nombre: "Panini",
              idTipo: 0,
              precio: 14,
            },
            {
              enExistencia: 0,
              cargaDia: 0,
              merma: 0,
              pzBuenas: 0,
              idSalidaRel: 0,
              idPan: 7,
              nombre: "Orejita",
              idTipo: 0,
              precio: 50,
            },
            {
              enExistencia: 0,
              cargaDia: 0,
              merma: 0,
              pzBuenas: 0,
              idSalidaRel: 0,
              idPan: 8,
              nombre: "Sema",
              idTipo: 0,
              precio: 10,
            },
            {
              enExistencia: 0,
              cargaDia: 0,
              merma: 0,
              pzBuenas: 0,
              idSalidaRel: 0,
              idPan: 17,
              nombre: "Bolillo",
              idTipo: 0,
              precio: 13,
            },
            {
              enExistencia: 0,
              cargaDia: 0,
              merma: 0,
              pzBuenas: 0,
              idSalidaRel: 0,
              idPan: 18,
              nombre: "Telera",
              idTipo: 0,
              precio: 13,
            },
            {
              enExistencia: 0,
              cargaDia: 0,
              merma: 0,
              pzBuenas: 0,
              idSalidaRel: 0,
              idPan: 19,
              nombre: "R5 Chica",
              idTipo: 0,
              precio: 190,
            },
            {
              enExistencia: 0,
              cargaDia: 0,
              merma: 0,
              pzBuenas: 0,
              idSalidaRel: 0,
              idPan: 20,
              nombre: "R5 Grande",
              idTipo: 0,
              precio: 290,
            },
          ],
          comision: 0,
          totalVenta: 1600,
        },
        {
          salida: {
            idSalida: 1002,
            idRuta: 0,
            fechaRegistro: "2024-10-09T18:09:07.217",
            FechaFormat: "Viernes 11-Octubre 2024",
            horaLlegada: "06:09 pm",
            idUsuario: 0,
            usuario: {
              idUsuario: 1,
              nombre: "Marco Antonio Renteria",
              usuario: "",
              contraseña: "",
              rol: 1,
              estatus: 1,
            },
            totalSalida: 1050,
            estatus: 0,
            idPanaderia: 0,
            listaPresentacionPanes: [],
            ruta: {
              idRuta: 0,
              idPanaderia: 0,
              ultimaParada: "",
              tiempoRecorridoenHoras: "",
              estatus: 0,
              kmRecorridos: 0,
              nombreRuta: "",
            },
          },
          recepcion: {
            idSalida: 0,
            idRuta: 0,
            fechaRegistro: "2024-10-09T18:30:07.723",
            FechaFormat: "",
            horaLlegada: "06:30 pm",
            idUsuario: 0,
            usuario: {
              idUsuario: 1,
              nombre: "Marco Antonio Renteria",
              usuario: "",
              contraseña: "",
              rol: 1,
              estatus: 1,
            },
            totalSalida: 1600,
            estatus: 0,
            idPanaderia: 0,
            listaPresentacionPanes: [],
            ruta: {
              idRuta: 0,
              idPanaderia: 0,
              ultimaParada: "",
              tiempoRecorridoenHoras: "",
              estatus: 0,
              kmRecorridos: 0,
              nombreRuta: "",
            },
            idSalidaRel: 0,
          },
          listadoPanesDiario: [
            {
              enExistencia: 0,
              cargaDia: 105,
              merma: 0,
              pzBuenas: 0,
              idSalidaRel: 0,
              idPan: 1,
              nombre: "Pan Dulce",
              idTipo: 0,
              precio: 10,
            },
            {
              enExistencia: 0,
              cargaDia: 0,
              merma: 0,
              pzBuenas: 0,
              idSalidaRel: 0,
              idPan: 2,
              nombre: "Chino",
              idTipo: 0,
              precio: 12,
            },
            {
              enExistencia: 0,
              cargaDia: 0,
              merma: 0,
              pzBuenas: 0,
              idSalidaRel: 0,
              idPan: 3,
              nombre: "Avena",
              idTipo: 0,
              precio: 13,
            },
            {
              enExistencia: 0,
              cargaDia: 0,
              merma: 0,
              pzBuenas: 0,
              idSalidaRel: 0,
              idPan: 5,
              nombre: "Sorbete",
              idTipo: 0,
              precio: 14,
            },
            {
              enExistencia: 0,
              cargaDia: 0,
              merma: 0,
              pzBuenas: 0,
              idSalidaRel: 0,
              idPan: 6,
              nombre: "Panini",
              idTipo: 0,
              precio: 14,
            },
            {
              enExistencia: 0,
              cargaDia: 0,
              merma: 0,
              pzBuenas: 0,
              idSalidaRel: 0,
              idPan: 7,
              nombre: "Orejita",
              idTipo: 0,
              precio: 50,
            },
            {
              enExistencia: 0,
              cargaDia: 0,
              merma: 0,
              pzBuenas: 0,
              idSalidaRel: 0,
              idPan: 8,
              nombre: "Sema",
              idTipo: 0,
              precio: 10,
            },
            {
              enExistencia: 0,
              cargaDia: 0,
              merma: 0,
              pzBuenas: 0,
              idSalidaRel: 0,
              idPan: 17,
              nombre: "Bolillo",
              idTipo: 0,
              precio: 13,
            },
            {
              enExistencia: 0,
              cargaDia: 0,
              merma: 0,
              pzBuenas: 0,
              idSalidaRel: 0,
              idPan: 18,
              nombre: "Telera",
              idTipo: 0,
              precio: 13,
            },
            {
              enExistencia: 0,
              cargaDia: 0,
              merma: 0,
              pzBuenas: 0,
              idSalidaRel: 0,
              idPan: 19,
              nombre: "R5 Chica",
              idTipo: 0,
              precio: 190,
            },
            {
              enExistencia: 0,
              cargaDia: 0,
              merma: 0,
              pzBuenas: 0,
              idSalidaRel: 0,
              idPan: 20,
              nombre: "R5 Grande",
              idTipo: 0,
              precio: 290,
            },
          ],
          comision: 0,
          totalVenta: 1600,
        },
        {
          salida: {
            idSalida: 1002,
            idRuta: 0,
            fechaRegistro: "2024-10-09T18:09:07.217",
            FechaFormat: "Sabado 12-Octubre 2024",
            horaLlegada: "06:09 pm",
            idUsuario: 0,
            usuario: {
              idUsuario: 1,
              nombre: "Marco Antonio Renteria",
              usuario: "",
              contraseña: "",
              rol: 1,
              estatus: 1,
            },
            totalSalida: 1050,
            estatus: 0,
            idPanaderia: 0,
            listaPresentacionPanes: [],
            ruta: {
              idRuta: 0,
              idPanaderia: 0,
              ultimaParada: "",
              tiempoRecorridoenHoras: "",
              estatus: 0,
              kmRecorridos: 0,
              nombreRuta: "",
            },
          },
          recepcion: {
            idSalida: 0,
            idRuta: 0,
            fechaRegistro: "2024-10-09T18:30:07.723",
            FechaFormat: "",
            horaLlegada: "06:30 pm",
            idUsuario: 0,
            usuario: {
              idUsuario: 1,
              nombre: "Marco Antonio Renteria",
              usuario: "",
              contraseña: "",
              rol: 1,
              estatus: 1,
            },
            totalSalida: 1600,
            estatus: 0,
            idPanaderia: 0,
            listaPresentacionPanes: [],
            ruta: {
              idRuta: 0,
              idPanaderia: 0,
              ultimaParada: "",
              tiempoRecorridoenHoras: "",
              estatus: 0,
              kmRecorridos: 0,
              nombreRuta: "",
            },
            idSalidaRel: 0,
          },
          listadoPanesDiario: [
            {
              enExistencia: 0,
              cargaDia: 105,
              merma: 0,
              pzBuenas: 0,
              idSalidaRel: 0,
              idPan: 1,
              nombre: "Pan Dulce",
              idTipo: 0,
              precio: 10,
            },
            {
              enExistencia: 0,
              cargaDia: 0,
              merma: 0,
              pzBuenas: 0,
              idSalidaRel: 0,
              idPan: 2,
              nombre: "Chino",
              idTipo: 0,
              precio: 12,
            },
            {
              enExistencia: 0,
              cargaDia: 0,
              merma: 0,
              pzBuenas: 0,
              idSalidaRel: 0,
              idPan: 3,
              nombre: "Avena",
              idTipo: 0,
              precio: 13,
            },
            {
              enExistencia: 0,
              cargaDia: 0,
              merma: 0,
              pzBuenas: 0,
              idSalidaRel: 0,
              idPan: 5,
              nombre: "Sorbete",
              idTipo: 0,
              precio: 14,
            },
            {
              enExistencia: 0,
              cargaDia: 0,
              merma: 0,
              pzBuenas: 0,
              idSalidaRel: 0,
              idPan: 6,
              nombre: "Panini",
              idTipo: 0,
              precio: 14,
            },
            {
              enExistencia: 0,
              cargaDia: 0,
              merma: 0,
              pzBuenas: 0,
              idSalidaRel: 0,
              idPan: 7,
              nombre: "Orejita",
              idTipo: 0,
              precio: 50,
            },
            {
              enExistencia: 0,
              cargaDia: 0,
              merma: 0,
              pzBuenas: 0,
              idSalidaRel: 0,
              idPan: 8,
              nombre: "Sema",
              idTipo: 0,
              precio: 10,
            },
            {
              enExistencia: 0,
              cargaDia: 0,
              merma: 0,
              pzBuenas: 0,
              idSalidaRel: 0,
              idPan: 17,
              nombre: "Bolillo",
              idTipo: 0,
              precio: 13,
            },
            {
              enExistencia: 0,
              cargaDia: 0,
              merma: 0,
              pzBuenas: 0,
              idSalidaRel: 0,
              idPan: 18,
              nombre: "Telera",
              idTipo: 0,
              precio: 13,
            },
            {
              enExistencia: 0,
              cargaDia: 0,
              merma: 0,
              pzBuenas: 0,
              idSalidaRel: 0,
              idPan: 19,
              nombre: "R5 Chica",
              idTipo: 0,
              precio: 190,
            },
            {
              enExistencia: 0,
              cargaDia: 0,
              merma: 0,
              pzBuenas: 0,
              idSalidaRel: 0,
              idPan: 20,
              nombre: "R5 Grande",
              idTipo: 0,
              precio: 290,
            },
          ],
          comision: 0,
          totalVenta: 1600,
        },
      ],
      diaSelected: {
        salida: {
          idSalida: 9,
          idRuta: 0,
          fechaRegistro: "2024-10-07T19:49:58.627",
          FechaFormat: "Miércoles 09-Octubre 2024",
          horaLlegada: "06:09 pm",
          idUsuario: 0,
          usuario: {
            idUsuario: 1,
            nombre: "Marco Antonio Renteria",
            usuario: "",
            contraseña: "",
            rol: 1,
            estatus: 1,
          },
          totalSalida: 3318,
          estatus: 0,
          idPanaderia: 0,
          listaPresentacionPanes: [],
          ruta: {
            idRuta: 0,
            idPanaderia: 0,
            ultimaParada: "",
            tiempoRecorridoenHoras: "",
            estatus: 0,
            kmRecorridos: 0,
            nombreRuta: "",
          },
        },
        recepcion: {
          idSalida: 0,
          idRuta: 0,
          fechaRegistro: "2024-10-07T19:52:20.357",
          FechaFormat: "",
          horaLlegada: "06:30 pm",
          idUsuario: 0,
          usuario: {
            idUsuario: 1,
            nombre: "Marco Antonio Renteria",
            usuario: "",
            contraseña: "",
            rol: 1,
            estatus: 1,
          },
          totalSalida: 1550,
          estatus: 0,
          idPanaderia: 0,
          listaPresentacionPanes: [],
          ruta: {
            idRuta: 0,
            idPanaderia: 0,
            ultimaParada: "",
            tiempoRecorridoenHoras: "",
            estatus: 0,
            kmRecorridos: 0,
            nombreRuta: "",
          },
          idSalidaRel: 0,
        },
        listadoPanesDiario: [
          {
            enExistencia: 0,
            cargaDia: 210,
            merma: 0,
            pzBuenas: 0,
            idSalidaRel: 0,
            idPan: 1,
            nombre: "Pan Dulce",
            idTipo: 0,
            precio: 10,
          },
          {
            enExistencia: 0,
            cargaDia: 56,
            merma: 0,
            pzBuenas: 0,
            idSalidaRel: 0,
            idPan: 2,
            nombre: "Chino",
            idTipo: 0,
            precio: 12,
          },
          {
            enExistencia: 0,
            cargaDia: 32,
            merma: 0,
            pzBuenas: 0,
            idSalidaRel: 0,
            idPan: 3,
            nombre: "Avena",
            idTipo: 0,
            precio: 13,
          },
          {
            enExistencia: 0,
            cargaDia: 0,
            merma: 0,
            pzBuenas: 0,
            idSalidaRel: 0,
            idPan: 5,
            nombre: "Sorbete",
            idTipo: 0,
            precio: 14,
          },
          {
            enExistencia: 0,
            cargaDia: 0,
            merma: 0,
            pzBuenas: 0,
            idSalidaRel: 0,
            idPan: 6,
            nombre: "Panini",
            idTipo: 0,
            precio: 14,
          },
          {
            enExistencia: 0,
            cargaDia: 0,
            merma: 0,
            pzBuenas: 0,
            idSalidaRel: 0,
            idPan: 7,
            nombre: "Orejita",
            idTipo: 0,
            precio: 50,
          },
          {
            enExistencia: 0,
            cargaDia: 0,
            merma: 0,
            pzBuenas: 0,
            idSalidaRel: 0,
            idPan: 8,
            nombre: "Sema",
            idTipo: 0,
            precio: 10,
          },
          {
            enExistencia: 0,
            cargaDia: 10,
            merma: 0,
            pzBuenas: 0,
            idSalidaRel: 0,
            idPan: 17,
            nombre: "Bolillo",
            idTipo: 0,
            precio: 13,
          },
          {
            enExistencia: 0,
            cargaDia: 0,
            merma: 0,
            pzBuenas: 0,
            idSalidaRel: 0,
            idPan: 18,
            nombre: "Telera",
            idTipo: 0,
            precio: 13,
          },
          {
            enExistencia: 0,
            cargaDia: 0,
            merma: 0,
            pzBuenas: 0,
            idSalidaRel: 0,
            idPan: 19,
            nombre: "R5 Chica",
            idTipo: 0,
            precio: 190,
          },
          {
            enExistencia: 0,
            cargaDia: 0,
            merma: 0,
            pzBuenas: 0,
            idSalidaRel: 0,
            idPan: 20,
            nombre: "R5 Grande",
            idTipo: 0,
            precio: 290,
          },
        ],
        comision: 0,
        totalVenta: 1550,
      },
      currency: formatCurrency,
      showDetalleDia: false,
      total: 3150,
      porcentaje: 0,
      ruta: null,
      rutaStore: useRutasStore(),
    };
  },
  computed: {
    comision() {
      const res =
        this.total >= 10800
          ? this.total * 0.1
          : this.total < 8999
          ? this.total * 0.08
          : this.total * 0.09;
      return res;
    },
  },
  created() {
    const hoy = new Date();
    console.log(date.getDayOfWeek(hoy));

    this.filtro.from = date.formatDate(hoy, "YYYY-MM-DD");
    this.filtro.to = date.formatDate(hoy, "YYYY-MM-DD");
  },
  methods: {
    HandleRutaSelected() {
      this.filtro.valor = this.ruta.idRuta;
      comisionesService.Post({
        obj: this.filtro,
        Resolve: (res) => {
          this.total = res.data.data
            .map((el) => el.totalVenta)
            .reduce((acum, act) => acum + act);

          this.dataRes = res.data.data.map((el) => {
            el.salida.FechaFormat = date.formatDate(
              el.salida.fechaRegistro,
              "dddd DD-MMMM YYYY"
            );
            el.salida.horaLlegada = date.formatDate(
              el.salida.fechaRegistro,
              "hh:mm a"
            );
            el.recepcion.FechaFormat = date.formatDate(
              el.recepcion.fechaRegistro,
              " Ydddd DD-MMMMYYY"
            );
            el.recepcion.horaLlegada = date.formatDate(
              el.recepcion.fechaRegistro,
              "hh:mm a"
            );
            return el;
          });
          
          
        },
        Reject: () => {
          this.dataRes = [];
          this.ruta = null
        },
        hideMessage: true,
      });
    },
    handleShowDetalle(dia) {
      (this.showDetalleDia = true), (this.diaSelected = dia);
    },
  },
};
</script>
<style scoped>
.headcard {
  background-color: white;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2), 0 2px 2px rgba(0, 0, 0, 0.14),
    0 3px 1px -2px rgba(0, 0, 0, 0.12);
}
</style>
