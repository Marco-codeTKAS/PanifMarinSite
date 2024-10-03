<template>
  <q-page
    class="row q-pa-md items-start justify-center row-gap"
    style="min-height: fit-content;"
  >
    <div class="row row-gap col-12 col-md-10 col-lg-8"  >
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
          <q-input
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
          </q-input>
        </div>
      </header>
      <q-card class="row col-12 height-fit" style="height: auto" v-show="showData">
        <q-card-section class="col-12">
          <div class="row col-12">
            <h5 class="col-6"> Hora de Salida Ruta: {{ dataRes.salida.fechaRegistro }}</h5>
            <h5 class="col-6"> Hora de llegada Ruta: {{ dataRes.recepcion.fechaRegistro }}</h5> 
          </div>
          <div class="row col-12 justify-around">
            <p class="text-subtitle1 col-12 col-md-6"> Total Venta = <span class="text-bold">{{ currency (total) }}</span></p>
            <p class="text-subtitle1 col-12 col-md-6">Comision = <span class="text-bold">{{ currency (comision) }}</span></p>
          </div>
          
        </q-card-section>
        <q-card-section class="row col-12 justify-end">
          <q-btn label="Guardar" color="primary"></q-btn>
        </q-card-section>
      </q-card>
      
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
      dataRes: {
        salida: {
          idSalida: 7,
          idRuta: 0,
          fechaRegistro: "2024-10-02T00:00:00",
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
          totalSalida: 10990,
          estatus: 0,
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
          idSalida: 0,
          idRuta: 0,
          fechaRegistro: "2024-10-02T00:00:00",
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
        registroPanes: [
          {
            enExistencia: 0,
            cargaDia: 103,
            merma: 10,
            pzBuenas: 5,
            idSalidaRel: 0,
            idPan: 1,
            nombre: "Pan Dulce",
            idTipo: 0,
            precio: 9,
          },
          {
            enExistencia: 0,
            cargaDia: 53,
            merma: 3,
            pzBuenas: 5,
            idSalidaRel: 0,
            idPan: 2,
            nombre: "Chino",
            idTipo: 0,
            precio: 11,
          },
          {
            enExistencia: 0,
            cargaDia: 10,
            merma: 0,
            pzBuenas: 0,
            idSalidaRel: 0,
            idPan: 3,
            nombre: "Avena",
            idTipo: 0,
            precio: 12,
          },
          {
            enExistencia: 0,
            cargaDia: 0,
            merma: 0,
            pzBuenas: 0,
            idSalidaRel: 0,
            idPan: 4,
            nombre: "Avena",
            idTipo: 0,
            precio: 12,
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
            precio: 13,
          },
          {
            enExistencia: 0,
            cargaDia: 20,
            merma: 0,
            pzBuenas: 0,
            idSalidaRel: 0,
            idPan: 6,
            nombre: "Panini",
            idTipo: 0,
            precio: 13,
          },
          {
            enExistencia: 0,
            cargaDia: 10,
            merma: 0,
            pzBuenas: 0,
            idSalidaRel: 0,
            idPan: 7,
            nombre: "Orejita",
            idTipo: 0,
            precio: 40,
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
            precio: 9,
          },
          {
            enExistencia: 0,
            cargaDia: 200,
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
            cargaDia: 100,
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
            cargaDia: 10,
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
            cargaDia: 10,
            merma: 0,
            pzBuenas: 0,
            idSalidaRel: 0,
            idPan: 20,
            nombre: "R5 Grande",
            idTipo: 0,
            precio: 290,
          },
        ],
      },
      currency:formatCurrency,
      showData:false,
      total:0,
      porcentaje:0,
      ruta: null,
      rutaStore: useRutasStore(),
    };
  },
  computed :{
    comision(){
      const res = 
      this.total >= 10800 ? this.total * 0.1 : this.total < 8999 ? this.total * 0.08 : this.total*0.09 
      return res
    }
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
          
          res.data.recepcion.fechaRegistro = date.formatDate(
            res.data.recepcion.fechaRegistro,
            "HH:mm"
          );
          res.data.salida.fechaRegistro = date.formatDate(
            res.data.salida.fechaRegistro,
            "HH:mm"
          );
          this.dataRes = res.data;
          this.dataRes.registroPanes = this.dataRes.registroPanes.map((obj) => {
            const resultado =
            (obj.cargaDia - obj.merma - obj.pzBuenas) * obj.precio;
            return {
              ...obj, // Mantener las propiedades originales si es necesario
              resultado, // Añadir la propiedad 'resultado'
            };
          });
          this.total = this.dataRes.registroPanes.map(el => el.resultado).reduce((acum,act)=> acum + act)
          this.showData = true
          this.porcentaje = this.total >= 10800 ?  0.1 : this.total < 8999 ? 0.08 : 0.09 
        },
        hideMessage: true,
      });
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
