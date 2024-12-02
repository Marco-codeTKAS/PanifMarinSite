<template>
  <q-page class="row q-pa-md items-start justify-center row-gap" style="min-height: fit-content">
    <div class="row row-gap col-12 col-md-10 col-lg-8">
      <header class="row col-12" style="height: fit-content">
        <q-card class="row col-12 q-pt-md q-px-md">
          <div class="col-6">
            <p class="text-subtitle1">{{ fechaConsulta }}</p>
          </div>
          <p class="text-subtitle1 col-6">
            Total de Venta
            <span class="q-px-sm text-bold">{{ currency(TotalVenta) }} </span>
          </p>
        </q-card>
      </header>

      <div class="col-12">
        <p class="text-subtitle2 text-primary q-pt-md col-12">
          Detalle de las rutas
        </p>

        <q-card class="row col-12 q-px-md q-pt-md q-pb-sm q-mb-sm" v-for="(dia, index) in dataReporte" :key="index">
          <div class="row col-12 items-center">
            <header class="col-12">
              <p class="q-ma-none q-pb-sm text-subtitle1 text-bold text-primary">
                {{ dia.ruta?.nombreRuta }}
              </p>
            </header>
            <div class="row col-12 justify-between">
              <!--Muestra de horarios -->
              <div class="row col-2">
                <p class="row col-12 q-ma-none q-pb-sm">
                  Salio a las<span class="text-subtitle2 col-12">{{
                    dia.salida.fechaRegistro
                  }}</span>
                </p>
                <p class="row col-12 q-ma-none">
                  Llego a las
                  <span class="text-subtitle2 col-12" v-if="dia.recepcion.idRecepcion !== 0">{{
                    dia.recepcion.fechaRegistro }}</span>
                  <span class="text-subtitle2 col-12" v-else>Sin entrega</span>
                </p>
              </div>
              <!-- Detalle de usuarios -->
              <div class="col">
                <p class="row col-12 q-ma-none q-pb-sm">
                  Entrego<span class="text-subtitle2 col-12">{{
                    currency(dia.salida?.usuario.nombre)
                  }}</span>
                </p>
                <p class="row col-12 q-ma-none">
                  Recibió
                  <span class="text-subtitle2 col-12" v-if="dia.recepcion.idRecepcion !== 0">{{
                    dia.recepcion.usuario.nombre }}</span>
                  <span class="text-subtitle2 col-12" v-else>Sin entrega</span>
                </p>
              </div>
              <!-- Muestra de venta -->
              <div class="row col-5">
                <div class="col-2">
                  <p class="row col-12 q-ma-none q-pb-sm">
                    Se llevo<span class="text-subtitle2 col-12">{{
                      currency(dia.salida?.totalSalida)
                      }}</span>
                  </p>
                  <p class="row col-12 q-ma-none">
                    Entrego
                    <span class="text-subtitle2 col-12" v-if="dia.recepcion.idRecepcion !== 0">{{
                      currency(dia.desgloce?.monto - dia.desgloce?.faltante - dia.desgloce.gasto) }}</span>
                    <span class="text-subtitle2 col-12" v-else>Sin entrega</span>
                  </p>
                </div>
                <div class="row col relative">

                  <p class="row col-12 q-ma-none q-pb-sm">
                    Faltante<span class="text-subtitle2 col-12">{{
                      currency(dia.desgloce?.faltante)
                      }}</span>
                  </p>
                  <p class="row col-12 q-ma-none">
                    Gasto
                    <span class="text-subtitle2 col-12" v-if="dia.recepcion.idRecepcion !== 0">{{
                      currency(dia.desgloce.gasto) }}</span>
                    <span class="text-subtitle2 col-12" v-else>Sin entrega</span>
                  </p>
                </div>

              </div>
            </div>
          </div>
          <footer class="row col-12 text-accent q-mt-sm">
            <div>
              <q-btn flat color="secondary" label="Detalles" size="0.95em" dense
                @click="handleShowDetalle(dia)"></q-btn>
            </div>
          </footer>
        </q-card>
      </div>

      <q-dialog v-model:model-value="showDetalleDia">
        <q-card style="max-width: 80vw; width: 600px">
          <q-card-section class="row q-pb-sm">
            <h6 class="q-ma-none col-8">{{ fechaConsulta }}</h6>
            <h6 class="q-ma-none col-4 text-right text-primary">{{ diaSelected.ruta.nombreRuta }}</h6>
          </q-card-section>
          <q-card-section>
            <header class="row col-12 q-mb-xs">
              <row class="col-5 text-subtitle2 text-secondary">Tipo Pan</row>
              <row class="col-3 text-center text-subtitle2 text-secondary">Carga dia</row>
              <row class="col-2 text-center text-subtitle2 text-secondary">Merma</row>
              <row class="col-2 text-center text-subtitle2 text-secondary">Bueno</row>
            </header>
            <div :class="[index % 2 === 0 ? 'bg-grey-2' : '', 'row col-12']"
              v-for="(pan, index) in diaSelected.salida.listaPresentacionPanes" :key="pan.idPan">
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
      fechaConsulta: "",
      dataReporte: [
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
      ],
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
      const res = this.dataReporte.map(el => el.desgloce.monto).reduce((acum, act) => acum + act,0)
      return res;
    },
  },
  created() {
    const hoy = new Date();

    this.filtro.from = date.formatDate(hoy, "YYYY-MM-DD");
    this.filtro.to = date.formatDate(hoy, "YYYY-MM-DD");
    this.fechaConsulta = date.formatDate(hoy, "dddd DD MMMM YYYY");
    this.GetReporte();

  },
  methods: {
    GetReporte() {
      this.filtro.valor = 0;
      ReportesService.Post({
        obj: this.filtro,
        Resolve: (res) => {
          this.dataReporte = res.data.data.map((el) => {
            el.salida.fechaRegistro = date.formatDate(
              el.salida.fechaRegistro,
              "hh:MM a"
            );
            el.recepcion.fechaRegistro =
              el.recepcion.idRecepcion === 0
                ? "Sin Entrega"
                : date.formatDate(el.recepcion.fechaRegistro, "hh:MM a");
            return el;
          });
          console.log(res.data.data);
        },
        Reject: () => {
          this.dataReporte = [];
        },
        hideMessage: true,
      });
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
</style>
