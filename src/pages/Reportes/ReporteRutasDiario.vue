<template>
  <q-page
    class="row q-pa-md items-start justify-center row-gap"
    style="min-height: fit-content"
  >
    <div class="row row-gap col-12 col-md-10 col-lg-8">
      <header class="row col-12" style="height: fit-content">
        <q-card class="row col-12 q-pt-md q-px-md q-py-md">
          <div class="row items-center col-12 col-md-8">
            <p class="text-subtitle1 q-ma-none">{{ fechaConsulta }}</p>
            <q-btn icon="event" flat dense round color="primary">
              <q-popup-proxy
                cover
                transition-show="scale"
                transition-hide="scale"
              >
                <q-date v-model="proxyDate">
                  <div class="row items-center justify-end q-gutter-sm">
                    <q-btn label="Cancel" color="primary" flat v-close-popup />
                    <q-btn
                      label="OK"
                      color="primary"
                      flat
                      @click="save"
                      v-close-popup
                    />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-btn>
          </div>
          <q-markup-table dense class="col-12 col-12">
            <q-tr>
              <q-td class="text-left text-caption q-pa-none">Total Venta</q-td>
              <q-th class="text-right q-pa-none">{{
                currency(TotalVenta)
              }}</q-th>
            </q-tr>
            <q-tr>
              <q-td class="text-left text-caption q-pa-none"
                >Total Pendiente</q-td
              >
              <q-th class="text-right text-amber-9 q-pa-none">{{
                currency(TotalPendiente)
              }}</q-th>
            </q-tr>
            <q-tr>
              <q-td class="text-left text-caption q-pa-none">Total Gastos</q-td>
              <q-th class="text-right text-negative q-pa-none">{{
                currency(TotalGastos)
              }}</q-th>
            </q-tr>
            <q-tr>
              <q-td class="text-left text-caption q-pa-none"
                >Total Gastos Empresa</q-td
              >
              <q-th class="text-right text-negative q-pa-none">{{
                currency(TotalGastosEmpresa)
              }}</q-th>
            </q-tr>
            <q-tr>
              <q-td class="text-left text-caption q-pa-none"
                >Total Perdida</q-td
              >
              <q-th class="text-right text-negative q-pa-none">{{
                currency(TotalPerdida)
              }}</q-th>
            </q-tr>
            <q-tr>
              <q-td class="text-left text-caption q-pa-none"
                >Total En Caja</q-td
              >
              <q-th class="text-right text-positive q-pa-none">{{
                currency(TotalEntregado - TotalGastosEmpresa)
              }}</q-th>
            </q-tr>
          </q-markup-table>
        </q-card>
      </header>
      <div class="row col-12">
        <q-expansion-item
          switch-toggle-side
          expand-separator
          class="text-primary col-12"
          header-class="text-primary"
          label="Detalle de las rutas"
        >
          <div class="row col-12">
            <div
              class="row col-12 col-md-3 q-pa-sm"
              v-for="(dia, index) in dataReporte.reportes"
              :key="index"
            >
              <q-card class="row q-px-md q-pt-md q-pb-sm q-mb-sm">
                <div class="row col-12 items-center">
                  <header class="row items-center col-12">
                    <div class="row justify-around items-center col-12">
                      <p
                        class="col-6 q-ma-none q-pb-sm text-subtitle1 text-bold text-primary"
                      >
                        {{ dia.ruta?.nombreRuta }}
                      </p>
                      <p
                        class="col q-ma-none q-pb-sm text-right text-caption text-grey-8"
                      >
                        {{ dia.salida.fechaRegistro }}
                        -
                        {{ dia.recepcion.fechaRegistro }}
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
                          {{ currency(dia.desgloce.monto) }}
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
                        <p>{{ currency(dia.desgloce.comision) }}</p>
                      </div>
                      <div class="col">
                        <h3>Abonado</h3>
                        <p class="text-negative">
                          {{ currency(dia.desgloce.abono) }}
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
                          {{ currency(dia.desgloce?.faltante) }}
                        </p>
                      </div>
                      <div class="col">
                        <h3>Gastos</h3>
                        <p class="text-negative">
                          {{ currency(dia.desgloce.gasto) }}
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
        </q-expansion-item>
        <q-expansion-item
          switch-toggle-side
          expand-separator
          class="text-primary col-12"
          header-class="text-primary"
          label="Detalle de los Gastos"
        >
          <div class="row col-12 col-md-3 q-pa-sm column-gap">
            <q-card
              class="row col-12 col-md-2 q-px-md q-pt-md q-pb-sm q-mb-sm"
              v-for="(gasto, index) in dataReporte.gastos"
              :key="index"
            >
              <div class="row col-12 items-center">
                <header class="row items-center col-12">
                  <div class="row justify-around items-center col-12">
                    <p
                      class="col-6 q-ma-none text-subtitle1 text-bold text-primary"
                    >
                      {{ gasto.concepto }}
                    </p>
                    <p
                      class="col q-ma-none q-pb-sm text-right text-caption text-grey-8"
                    >
                      {{ gasto.fecha }}
                    </p>
                  </div>
                </header>
                <div class="col-12 justify-between section">
                  <div class="divider"></div>
                  <div class="section">
                    <h3>Descripción</h3>
                    <p>{{ gasto.descripcion }}</p>
                  </div>
                  <div class="divider"></div>
                  <div class="section">
                    <h3>Monto</h3>
                    <p class="text-negative">{{ currency(gasto.monto) }}</p>
                  </div>
                  <div class="divider"></div>
                  <div class="footer">Gasto registrado</div>
                </div>
              </div>
            </q-card>
          </div>
        </q-expansion-item>
      </div>

      <q-dialog v-model:model-value="showDetalleDia">
        <q-card style="max-width: 80vw; width: 600px">
          <q-card-section class="row q-pb-sm">
            <h6 class="q-ma-none col-8">{{ fechaConsulta }}</h6>
            <h6 class="q-ma-none col-4 text-right text-primary">
              {{ diaSelected.ruta.nombreRuta }}
            </h6>
          </q-card-section>
          <q-card-section>
            <q-table
              :rows="diaSelected.salida.listaPresentacionPanes"
              table-header-class="text-secondary"
              :pagination="{ rowsPerPage: 0 }"
              dense
              :columns="columnsDetalle"
            >
            </q-table>
            <!-- <header class="row col-12 q-mb-xs">
              <row class="col-4 text-subtitle2 text-secondary">Tipo Pan</row>
              <row class="col-2 text-center text-subtitle2 text-secondary">Carga dia</row>
              <row class="col-1 text-center text-subtitle2 text-secondary">Merma</row>
              <row class="col-1 text-center text-subtitle2 text-secondary">Bueno</row>
              <row class="col-1 text-center text-subtitle2 text-secondary">Oxxo</row>
              <row class="col-1 text-center text-subtitle2 text-secondary">Kiosko</row>
            </header>
            <div :class="[index % 2 === 0 ? 'bg-grey-2' : '', 'row col-12']"
              v-for="(pan, index) in diaSelected.salida.listaPresentacionPanes" :key="pan.idPan">
              <div class="row col-4 q-pa-sm text-bold">{{ pan.nombre }}</div>
              <div class="row col-2 q-pa-sm justify-center">
                {{ pan.cargaDia }}
              </div>
              <div class="row col-1 q-pa-sm justify-center">
                {{ pan.merma }}
              </div>
              <div class="row col-1 q-pa-sm justify-center">
                {{ pan.pzBuenas }}
              </div>
              <div class="row col-1 q-pa-sm justify-center">
                {{ pan.oxxo }}
              </div>
              <div class="row col-1 q-pa-sm justify-center">
                {{ pan.kiosko }}
              </div>
            </div> -->
          </q-card-section>
        </q-card>
      </q-dialog>
    </div>
  </q-page>
</template>
<script>
import { date } from "quasar";
import { formatCurrency } from "src/Utils/commons";
import { useService } from "src/Utils/Servicio";

const ReportesService = useService("Reportes");

export default {
  data() {
    return {
      filtro: {
        from: "",
        to: "",
        valor: 0,
      },
      columnsDetalle: [
        {
          label: "NOMBRE",
          field: "nombre",
          align: "left",
        },
        {
          label: "CARGA DIA",
          field: "cargaDia",
          align: "center",
        },
        {
          label: "MERMA",
          field: "merma",
          align: "center",
        },
        {
          label: "PAN BUENO",
          field: "pzBuenas",
          align: "center",
        },
        {
          label: "OXXO",
          field: "oxxo",
          align: "center",
        },
        {
          label: "KIOSKO",
          field: "kiosko",
          align: "center",
        },
      ],
      fechaConsulta: "",
      proxyDate:"",
      dataReporte: {
        reportes: [
          {
            ruta: {
              idRuta: 3,
              idPanaderia: 1,
              ultimaParada: "",
              tiempoRecorridoenHoras: "12",
              estatus: 1,
              kmRecorridos: 120,
              nombreRuta: "Colima 2",
            },
            salida: {
              idSalida: 1014,
              idRuta: 3,
              fechaRegistro: "2024-11-01T19:19:54.85",
              idUsuario: 1,
              usuario: {
                idUsuario: 1,
                nombre: "Marco Antonio Renteria",
                usuario: "marcoantonioconalep@gmail.com",
                contraseña:
                  "4e0f4122e443c63170161e9af34e88536c0605c63168b5b08ae4f2a399a10cf6",
                rol: 1,
                estatus: 1,
              },
              totalSalida: 11811,
              estatus: 1,
              idPanaderia: 1,
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
              idSalida: 1014,
              idRecepcion: 1017,
              idRuta: 3,
              fechaRegistro: "2024-11-01T19:20:16.19",
              idUsuario: 1,
              usuario: {
                idUsuario: 1,
                nombre: "Marco Antonio Renteria",
                usuario: "marcoantonioconalep@gmail.com",
                contraseña:
                  "4e0f4122e443c63170161e9af34e88536c0605c63168b5b08ae4f2a399a10cf6",
                rol: 1,
                estatus: 1,
              },
              totalSalida: 0,
              totalRecepcion: 10766,
              estatus: 3,
              oxxo: 0,
              kiosko: 0,
              idPanaderia: 1,
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
            desgloce: {
              idDesgloce: 1,
              monto: 10766,
              comision: 20,
              gasto: 0,
              faltante: 0,
              desgloce: null,
              devPanMalo: 0,
              fecha: "2024-11-01T21:58:26.31",
              idUsuario: 1,
              idRecepcion: 1017,
              abono: 0,
              estatus: 1,
            },
          },
        ],
        gastos: [
          {
            idGasto: 1,
            monto: 100,
            descripcion: "Gasto de gasolina",
            concepto: "Gasolina",
            fecha: "2024-11-01T21:58:26.31",
            idUsuario: 1,
            estatus: 1,
          },
        ],
      },
      diaSelected: {
        ruta: {
          idRuta: 3,
          idPanaderia: 1,
          ultimaParada: "",
          tiempoRecorridoenHoras: "12",
          estatus: 1,
          kmRecorridos: 120,
          nombreRuta: "Colima 2",
        },
        salida: {
          idSalida: 1014,
          idRuta: 3,
          fechaRegistro: "2024-11-01T19:19:54.85",
          idUsuario: 1,
          usuario: {
            idUsuario: 1,
            nombre: "Marco Antonio Renteria",
            usuario: "marcoantonioconalep@gmail.com",
            contraseña:
              "4e0f4122e443c63170161e9af34e88536c0605c63168b5b08ae4f2a399a10cf6",
            rol: 1,
            estatus: 1,
          },
          totalSalida: 11811,
          estatus: 1,
          idPanaderia: 1,
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
          idSalida: 1014,
          idRecepcion: 1017,
          idRuta: 3,
          fechaRegistro: "2024-11-01T19:20:16.19",
          idUsuario: 1,
          usuario: {
            idUsuario: 1,
            nombre: "Marco Antonio Renteria",
            usuario: "marcoantonioconalep@gmail.com",
            contraseña:
              "4e0f4122e443c63170161e9af34e88536c0605c63168b5b08ae4f2a399a10cf6",
            rol: 1,
            estatus: 1,
          },
          totalSalida: 0,
          totalRecepcion: 10766,
          estatus: 3,
          idPanaderia: 1,
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
        desgloce: {
          idDesgloce: 1,
          monto: 10766,
          desgloce: null,
          fecha: "2024-11-01T21:58:26.31",
          idUsuario: 1,
          idRecepcion: 1017,
          estatus: 1,
        },
      },
      currency: formatCurrency,
      showDetalleDia: false,
      total: 3150,
      porcentaje: 0,
    };
  },
  computed: {
    TotalVenta() {
      const totalVenta = this.dataReporte.reportes
        .map((el) => el.salida.totalSalida)
        .reduce((acum, act) => acum + act, 0);
      return totalVenta;
    },
    TotalEntregado() {
      return this.dataReporte.reportes
        .map((el) => el.desgloce.monto)
        .reduce((acum, act) => acum + act, 0);
    },
    TotalPendiente() {
      const totalOxxo = this.dataReporte.reportes
        .map((el) => el.recepcion.totalOxxo)
        .reduce((acum, act) => acum + act, 0);
      const totalKiosko = this.dataReporte.reportes
        .map((el) => el.recepcion.totalKiosko)
        .reduce((acum, act) => acum + act, 0);
      const totalFaltante = this.dataReporte.reportes
        .map((el) => el.desgloce.faltante)
        .reduce((acum, act) => acum + act, 0);
      const totalAbonado = this.dataReporte.reportes
        .map((el) => el.desgloce.abono)
        .reduce((acum, act) => acum + act, 0);
      return totalOxxo + totalKiosko + totalFaltante + totalAbonado;
    },
    TotalGastos() {
      const totalGastoRuta = this.dataReporte.reportes
        .map((el) => el.desgloce.gasto)
        .reduce((acum, act) => acum + act, 0);
      return totalGastoRuta;
    },
    TotalGastosEmpresa() {
      return this.dataReporte.gastos
        .map((el) => el.monto)
        .reduce((acum, act) => acum + act, 0);
    },
    TotalPerdida() {
      return this.dataReporte.reportes
        .map((el) => el.recepcion.totalDevuelto)
        .reduce((acum, act) => acum + act, 0);
    },
  },
  created() {
    const hoy = new Date();

    this.filtro.from = date.formatDate(hoy, "YYYY-MM-DD");
    this.filtro.to = date.formatDate(hoy, "YYYY-MM-DD");
    this.fechaConsulta = date.formatDate(hoy, "dddd DD MMMM YYYY");
    this.proxyDate = this.fechaConsulta
    this.GetReporte();
  },
  methods: {
    GetReporte() {
      this.filtro.valor = 0;
      ReportesService.Post({
        obj: this.filtro,
        Resolve: (res) => {
          this.dataReporte.reportes = res.data.data.reportes.map((el) => {
            el.salida.fechaRegistro = date.formatDate(
              el.salida.fechaRegistro,
              "hh:MM a"
            );
            el.recepcion.fechaRegistro =
              el.recepcion.idRecepcion === 0
                ? "Sin Entrega"
                : date.formatDate(el.recepcion.fechaRegistro, "hh:MM a");

            el.desgloce.comision =
              el.recepcion.totalRecepcion >= 10800
                ? el.recepcion.totalRecepcion * 0.1
                : el.recepcion.totalRecepcion < 8999
                ? el.recepcion.totalRecepcion * 0.08
                : el.recepcion.totalRecepcion * 0.09;

            return el;
          });
          this.dataReporte.gastos = res.data.data.gastos;
        },
        Reject: () => {
          this.dataReporte = [];
        },
        hideMessage: true,
      });
    },

    save() {
      this.filtro.from = date.formatDate(this.proxyDate, "YYYY-MM-DD")
      this.fechaConsulta = date.formatDate(this.proxyDate, "dddd DD MMMM YYYY");
      this.GetReporte()
    },

    handleShowDetalle(detRuta) {
      this.filtro.valor = detRuta.ruta.idRuta;
      ReportesService.Post({
        action: "/GetDetalleRutaByFiltro",
        Resolve: (res) => {
          console.log(res.data);
          detRuta.salida.listaPresentacionPanes = res.data;
          this.diaSelected = detRuta;
        },
        obj: this.filtro,
        hideMessage: true,
      })((this.showDetalleDia = true)),
        (this.diaSelected = dia);
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

.card {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  padding: 20px;
  margin: 10px;
}

.section {
  margin-bottom: 10px;
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
