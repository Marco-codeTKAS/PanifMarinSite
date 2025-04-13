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
        <q-markup-table dense  class="col-12 col-12">
            <q-tr >
              <q-td class="text-left text-caption q-pa-none">Total Venta</q-td>           
              <q-th class="text-right  q-pa-none">{{ currency(TotalVenta) }}</q-th>   
            </q-tr>
            <q-tr >
              <q-td class="text-left text-caption q-pa-none">Total Entregado</q-td>           
              <q-th class="text-right  q-pa-none">{{ currency(TotalEntregado) }}</q-th>   
            </q-tr>
            <q-tr>
              <q-td class="text-left text-caption q-pa-none">Total Pendiente</q-td>           
              <q-th class="text-right text-amber-9 q-pa-none">{{ currency(TotalPendiente) }}</q-th> 
            </q-tr>
            <q-tr>
              <q-td class="text-left text-caption q-pa-none">Total Gastos</q-td>           
              <q-th class="text-right text-negative q-pa-none">{{ currency(TotalAbonado) }}</q-th>
            </q-tr>

            <q-tr>
              <q-td class="text-left text-caption q-pa-none">Total Abonado</q-td>           
              <q-th class="text-right text-negative q-pa-none">{{ currency(TotalAbonado) }}</q-th>
            </q-tr>
            <q-tr>
              <q-td class="text-left text-caption q-pa-none">Total Comision</q-td>           
              <q-th class="text-right text-positive q-pa-none">{{ currency( comision  ) }}</q-th>
            </q-tr>

          </q-markup-table>
        <div class="row col-12 justify-between items-center q-mt-sm">
          <p class="text-caption text-primary q-pt-md col-6">
            Detalle semanal de la ruta
          </p>
          <q-btn
            :label="[hasPago ? 'Pago Registrado' : 'Registrar Pago']"
            size="sm"
            :color="[hasPago ? 'positive' : 'primary']"
            :disable="hasPago"

            @click="openAddPago"
          ></q-btn>
        </div>

        <div class="row col-12 column-gap">
          <q-card
            class="row q-px-md col-12 col-md-3 q-pt-md q-pb-sm q-mb-sm"
            v-for="(dia, index) in dataRes.listadoEntregas"
            :key="index"
          >
            <div class="row col-12 items-center">
              <header class="row items-center col-12">
                <div class="row justify-around items-center col-12">
                  <p
                    class="col-12 q-ma-none q-pb-sm text-subtitle1 text-bold text-primary"
                  >
                    {{ dia.salida.FechaFormat }}
                  </p>
                  <p
                    class="col-12 q-ma-none q-pa-none text-left text-caption text-grey-8"
                    style="font-size: 11px;"
                  >
                    {{ dia.salida.horaLlegada }}
                    -
                    {{ dia.recepcion.horaLlegada }}
                  </p>
                </div>
              </header>
              <div class="col-12 justify-between section">
                <!-- Información básica -->
                <div class="divider"></div>

                <!-- Personas involucradas -->
                <div class="row col-12">
                  <div class="col-6">
                    <h3>Enviado por</h3>
                    <p style="font-size: 0.9em !important">
                      {{ dia.salida.usuario.nombre }}
                    </p>
                  </div>
                  <div class="col-6">
                    <h3>Recibido por</h3>
                    <p style="font-size: 0.9em !important">
                      {{ dia.recepcion.usuario.nombre }}
                    </p>
                  </div>
                </div>

                <div class="divider"></div>

                <!-- Dinero relacionado -->
                <div class="section">
                  <h3>Se llevo</h3>
                  <p class="text-positive">
                    {{ currency(dia.salida.totalSalida) }}
                  </p>
                </div>
                <div class="row col-12 section">
                  <div class="col-6">
                    <h3>Total Entregado</h3>
                    <p class="text-secondary">
                      {{ currency(dia.desgloceGasto.monto) }}
                    </p>
                  </div>
                  <div class="col-6">
                    <h3>Total Devuelto</h3>
                    <p class="text-negative">
                      {{ currency(dia.recepcion.totalDevuelto) }}
                    </p>
                  </div>
                </div>
                <div class="row col-12">
                  <div class="col-6">
                    <h3>Comisión</h3>
                    <p>{{ currency(dia.comision) }}</p>
                  </div>
                  <div class="col">
                    <h3>Abonado</h3>
                    <p class="text-negative">
                      {{ currency(dia.desgloceGasto.abono) }}
                    </p>
                  </div>
                </div>

                <div class="divider"></div>

                <!-- Comisión y Gastos -->
                <!-- <div class="section">
                  <h3>Diferencia</h3>
                  <p>{{ currency(dia.desgloce.diferencia ?? 0)}}</p>
                </div> -->
                <div class="row col-12">
                  <div class="col">
                    <h3>Faltante</h3>
                    <p class="text-negative">
                      {{ currency(dia.desgloceGasto?.faltante) }}
                    </p>
                  </div>
                  <div class="col">
                    <h3>Gastos</h3>
                    <p class="text-negative">
                      {{ currency(dia.desgloceGasto.gasto) }}
                    </p>
                  </div>
                </div>

                <div class="divider"></div>
                <div class="row col-12">
                  <div class="col">
                    <h3>Oxxo</h3>
                    <p class="text-secondary">
                      {{ currency(dia.recepcion.totalOxxo) }}
                    </p>
                  </div>
                  <div class="col">
                    <h3>Kiosko</h3>
                    <p class="text-secondary">
                      {{ currency(dia.recepcion.totalKiosko) }}
                    </p>
                  </div>
                </div>
                <div class="divider"></div>

                <!-- Pie de página -->
                <div class="footer">Reporte del dia</div>
              </div>
            </div>
            <footer class="row col-12 justify-center text-accent q-mt-sm">
              <div>
                <q-btn
                  flat
                  color="primary"
                  label="Detalles"
                  size="0.95em"
                  dense
                  @click="handleShowDetalle(dia)"
                ></q-btn>
              </div>
            </footer>
          </q-card>

        </div>
      </div>

      <div class="row col-12 text-center justify-center" v-show="ruta === null">
        <h6 class="text-center">Selecciona una ruta para continuar</h6>
        <div class="row col-12 justify-center">
          <q-img src="~assets/LogoColima.png" alt="" style="width: 400px" />
        </div>
      </div>

      <q-dialog v-model="showAddPago" persistent>
        <q-card>
          <q-card-section>
            <div class="text-h6">Registrar Pago</div>
            <div class="">
              Por favor, ingrese los detalles del pago a continuación.
            </div>
          </q-card-section>
          <q-card-section>
            <q-form @submit.prevent="submitPago" class="column row-gap">
              <q-input
                filled
                dense
                v-model="pago.monto"
                label="Monto"
                :rules="[val => val.length > 0 || 'El Campo es requerido',
                  val => val <= (comision + TotalPendiente) || 'El monto no puede ser mayor a la comision',
                  val => val >= comision || 'el monto no puede ser menor a la comision',
                ]
                "
                type="number"
                required
              ></q-input>
              <q-input
                filled
                dense
                v-model="pago.fechaRegistro"
                disable
                label="Fecha"
                required
              ></q-input>
              <q-input
                filled
                dense
                v-model="pago.descripcion"
                label="Descripción"
                type="text"
                :rules="val => val.length > 0 || 'El Campo es requerido'"
                required
              ></q-input>
              <q-card-actions align="right">
                <q-btn
                  flat
                  label="Cancelar"
                  @click="showAddPago = false"
                ></q-btn>
                <q-btn type="submit" color="primary" label="Registrar"></q-btn>
              </q-card-actions>
            </q-form>
          </q-card-section>
        </q-card>
      </q-dialog>

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
      pago: {
      idPago:0,
        monto: 0,
        idRuta: 0,
        idUsuario: 0,
        saldoRestante: 0,
        fechaRegistro: date.formatDate(new Date(), "YYYY-MM-DD"),
        descripcion: "",
      },
      dataRes: {
        listadoEntregas:[{
          salida: {
            idSalida: 5016,
            idRuta: 0,
            fechaRegistro: "2025-04-08T19:27:06.387",
            idUsuario: 0,
            usuario: {
              idUsuario: 1,
              nombre: "Marco Antonio Renteria",
              usuario: "",
              contraseña: "",
              rol: 1,
              estatus: 1,
              opcionCambioPass: 0,
            },
            totalSalida: 16204,
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
            FechaFormat: "Martes 08-Abril 2025",
            horaLlegada: "07:27 pm",
          },
          recepcion: {
            idSalida: 0,
            idRecepcion: 5025,
            idRuta: 0,
            fechaRegistro: "2025-04-08T20:04:58.757",
            idUsuario: 0,
            usuario: {
              idUsuario: 1,
              nombre: "Marco Antonio Renteria",
              usuario: "",
              contraseña: "",
              rol: 1,
              estatus: 1,
              opcionCambioPass: 0,
            },
            totalSalida: 15460,
            totalRecepcion: 0,
            totalOxxo: 186,
            totalDevuelto: 0,
            totalKiosko: 186,
            estatus: 3,
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
            FechaFormat: " YMartes 08-Abril25Y",
            horaLlegada: "08:04 pm",
          },
          listadoPanesDiario: [
            {
              charolas: 0,
              enExistencia: 0,
              cargaDia: 422,
              merma: 10,
              oxxo: 0,
              kiosko: 0,
              pzBuenas: 10,
              idSalidaRel: 0,
              idRecepcionRel: 0,
              idPan: 1,
              nombre: "Pan Dulce",
              idTipo: 0,
              precio: 10,
              estatus: 0,
              cantEmpaque: 0,
            },
            {
              charolas: 0,
              enExistencia: 0,
              cargaDia: 264,
              merma: 5,
              oxxo: 0,
              kiosko: 0,
              pzBuenas: 5,
              idSalidaRel: 0,
              idRecepcionRel: 0,
              idPan: 2,
              nombre: "Chino",
              idTipo: 0,
              precio: 12,
              estatus: 0,
              cantEmpaque: 0,
            },
            {
              charolas: 0,
              enExistencia: 0,
              cargaDia: 274,
              merma: 2,
              oxxo: 0,
              kiosko: 0,
              pzBuenas: 2,
              idSalidaRel: 0,
              idRecepcionRel: 0,
              idPan: 3,
              nombre: "C.Avena",
              idTipo: 0,
              precio: 13,
              estatus: 0,
              cantEmpaque: 0,
            },
            {
              charolas: 0,
              enExistencia: 0,
              cargaDia: 178,
              merma: 0,
              oxxo: 0,
              kiosko: 0,
              pzBuenas: 0,
              idSalidaRel: 0,
              idRecepcionRel: 0,
              idPan: 4,
              nombre: "Paq.Avena",
              idTipo: 0,
              precio: 13,
              estatus: 0,
              cantEmpaque: 0,
            },
            {
              charolas: 0,
              enExistencia: 0,
              cargaDia: 210,
              merma: 0,
              oxxo: 0,
              kiosko: 0,
              pzBuenas: 0,
              idSalidaRel: 0,
              idRecepcionRel: 0,
              idPan: 5,
              nombre: "Sorbete",
              idTipo: 0,
              precio: 14,
              estatus: 0,
              cantEmpaque: 0,
            },
            {
              charolas: 0,
              enExistencia: 0,
              cargaDia: 0,
              merma: 0,
              oxxo: 0,
              kiosko: 0,
              pzBuenas: 0,
              idSalidaRel: 0,
              idRecepcionRel: 0,
              idPan: 6,
              nombre: "Panini",
              idTipo: 0,
              precio: 14,
              estatus: 0,
              cantEmpaque: 0,
            },
            {
              charolas: 0,
              enExistencia: 0,
              cargaDia: 0,
              merma: 0,
              oxxo: 0,
              kiosko: 0,
              pzBuenas: 0,
              idSalidaRel: 0,
              idRecepcionRel: 0,
              idPan: 7,
              nombre: "Orejita",
              idTipo: 0,
              precio: 50,
              estatus: 0,
              cantEmpaque: 0,
            },
            {
              charolas: 0,
              enExistencia: 0,
              cargaDia: 0,
              merma: 0,
              oxxo: 0,
              kiosko: 0,
              pzBuenas: 0,
              idSalidaRel: 0,
              idRecepcionRel: 0,
              idPan: 8,
              nombre: "Sema",
              idTipo: 0,
              precio: 10,
              estatus: 0,
              cantEmpaque: 0,
            },
            {
              charolas: 0,
              enExistencia: 0,
              cargaDia: 0,
              merma: 0,
              oxxo: 0,
              kiosko: 0,
              pzBuenas: 0,
              idSalidaRel: 0,
              idRecepcionRel: 0,
              idPan: 17,
              nombre: "Bolillo",
              idTipo: 0,
              precio: 13,
              estatus: 0,
              cantEmpaque: 0,
            },
            {
              charolas: 0,
              enExistencia: 0,
              cargaDia: 0,
              merma: 0,
              oxxo: 0,
              kiosko: 0,
              pzBuenas: 0,
              idSalidaRel: 0,
              idRecepcionRel: 0,
              idPan: 18,
              nombre: "Telera",
              idTipo: 0,
              precio: 13,
              estatus: 0,
              cantEmpaque: 0,
            },
            {
              charolas: 0,
              enExistencia: 0,
              cargaDia: 0,
              merma: 0,
              oxxo: 0,
              kiosko: 0,
              pzBuenas: 0,
              idSalidaRel: 0,
              idRecepcionRel: 0,
              idPan: 19,
              nombre: "R5 Chica",
              idTipo: 0,
              precio: 190,
              estatus: 0,
              cantEmpaque: 0,
            },
            {
              charolas: 0,
              enExistencia: 0,
              cargaDia: 0,
              merma: 0,
              oxxo: 0,
              kiosko: 0,
              pzBuenas: 0,
              idSalidaRel: 0,
              idRecepcionRel: 0,
              idPan: 20,
              nombre: "R5 Grande",
              idTipo: 0,
              precio: 290,
              estatus: 0,
              cantEmpaque: 0,
            },
          ],
          desgloceGasto: {
            idDesgloce: 4020,
            monto: 15000,
            faltante: 200,
            gasto: 160,
            abono: 100,
            desgloce: null,
            fecha: "2025-03-26T17:49:16.18",
            idUsuario: 1,
            idRecepcion: 5025,
            comision: 0,
            estatus: 1,
            devPanMalo: 0,
          },
          comision: 1546,
          totalVenta: 15460,
        }],
        pagos:[
          {
            idPago: 0,
            monto: 0,
            idRuta: 0,
            idUsuario: 0,
            saldoRestante: 0,
            fechaRegistro: date.formatDate(new Date(), "YYYY-MM-DD"),
            descripcion: "",
          },
        ],
      },
      showAddPago: false,
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
        desgloceGasto: {
          idDesgloce: 4020,
          monto: 15000,
          faltante: 200,
          gasto: 160,
          abono: 100,
          desgloce: null,
          fecha: "2025-03-26T17:49:16.18",
          idUsuario: 1,
          idRecepcion: 5025,
          comision: 0,
          estatus: 1,
          devPanMalo: 0,
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
      const totalComision = this.dataRes.listadoEntregas.map(el => el.comision).reduce((acum, act) => acum + act, 0);
      const result = totalComision - this.TotalPendiente;
      return parseFloat(result.toFixed(2)); // Redondear a dos decimales
    },
    TotalVenta() {
      const totalVenta = this.dataRes.listadoEntregas.map(el => el.recepcion.totalSalida).reduce((acum, act) => acum + act, 0);
      return totalVenta ;
    },
    TotalEntregado() {
      return this.dataRes.listadoEntregas.map(el => el.desgloceGasto.monto).reduce((acum, act) => acum + act, 0);
    },
    TotalPendiente() {
      const totalFaltante = this.dataRes.listadoEntregas.map(el => el.desgloceGasto.faltante).reduce((acum, act) => acum + act, 0);
      return totalFaltante ;
    },
    TotalGastos() {
      const totalGastoRuta = this.dataRes.listadoEntregas.map(el => el.desgloceGasto.gasto).reduce((acum, act) => acum + act, 0);
      return  totalGastoRuta;
    },
    TotalAbonado(){
      return this.dataRes.listadoEntregas.map(el => el.desgloceGasto.abono).reduce((acum, act) => acum + act, 0);
    },
    TotalPerdida() {
      return this.dataRes.listadoEntregas.map(el => el.recepcion.totalDevuelto).reduce((acum, act) => acum + act, 0);
    },
    hasPago() {
      const totalPagado = this.dataRes.pagos.map(el => el.monto).reduce((acum, act) => acum + act, 0);
      console.log(totalPagado,this.comision);
      
      return totalPagado >= this.comision;
    },
  },
  created() {
    const hoy = new Date();

    this.filtro.from = date.formatDate(hoy, "YYYY-MM-DD");
    this.filtro.to = date.formatDate(hoy, "YYYY-MM-DD");
  },
  methods: {
    HandleRutaSelected() {
      this.filtro.valor = this.ruta.idRuta;
      comisionesService.Post({
        obj: this.filtro,
        Resolve: (res) => {
          this.total = res.data.data.listadoEntregas
            .map((el) => el.totalVenta)
            .reduce((acum, act) => acum + act);
          console.log(res.data.data);
          this.dataRes.pagos = res.data.data.pago
          this.dataRes.listadoEntregas = res.data.data.listadoEntregas.map((el) => {
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
          this.dataRes = {
            listadoEntregas: [],
            pagos: [],
          };
          this.ruta = null;
        },
        hideMessage: true,
      });
    },
    openAddPago() {
      this.showAddPago = true;
      this.pago.monto = this.comision;
      this.pago.descripcion = "";
      this.pago.fechaRegistro = date.formatDate(new Date(), "YYYY-MM-DD");
    },
    submitPago() {
      console.log(this.pago);
      this.pago.idRuta = this.ruta.idRuta;
      this.pago.idUsuario = this.s
      comisionesService.Post({
        obj: this.pago,
        action: "/AddPagoToRuta",
        Resolve: (res) => {
          this.showAddPago = false;
          this.HandleRutaSelected();
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

h3 {
  margin: 0;
  font-size: 0.9em;
  line-height: 1em;
  color: #555;
}

.section p {
  margin: 0;
  font-size: 1.1em;
  font-weight: bold;
  color: #333;
}

.divider {
  border-top: 1px solid #1d1b1b;
  margin: 10px 0;
}

.card-header {
  font-size: 1.5em;
  font-weight: bold;
  margin-bottom: 10px;
  color: #1976d2;
  /* Azul Material Design */
  text-align: center;
}

.highlight {
  color: #d32f2f;
  /* Rojo Material Design */
  font-weight: bold;
}

.footer {
  text-align: center;
  font-size: 0.9em;
  color: #777;
}
</style>
