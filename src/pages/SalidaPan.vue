<template>
  <q-page class="flex justify-center">
    <div class="row q-pa-sm justify-center fit">
      <q-card class="my-card row col-lg-6 col-md-8 col-12  items-end q-my-md q-px-md q-pt-xs" >
        <!-- Listado panes -->
        <h6 class="q-my-sm">Carga diaria de pan</h6>
        <q-select
          :options="rutaStore.listaRutas"
          filled
          v-model="registroDiario.ruta"
          dense
          behavior="menu"
          class="col-12"
          @update:model-value="HandleRutaSelected"
          label="Selecciona Ruta"
          option-label="nombreRuta"
        ></q-select>
        <q-table
          :columns="columns"
          :rows="listaPresentacionPanes"
          table-header-class="bg-secondary text-white"
          hide-bottom
          :pagination="{ rowsPerPage: 0 }"
          class="q-py-sm my-sticky-header-table col-12"
          square
          v-show="registroDiario.ruta !== null"
        >
          <template v-slot:body-cell="props">
            <q-td :props="props">
              <h6
                class="text-subtitle2 q-ma-none"
                v-if="props.col.name === 'nombre'"
              >
                {{ props.row.nombre }}
              </h6>
              <p
                class="q-ma-none"
                v-else-if="props.col.name === 'enExistencia'"
              >
                {{ props.row.enExistencia }}
              </p>
              <q-input
                v-else
                v-model.number="props.row[props.col.name]"
                input-class="text-right"
                type="number"
                :label="props.col.label"
                filled
                dense
                borderless
              />
            </q-td>
          </template>
        </q-table>
        <div
          class="row col-12 text-center justify-center items-start" style="margin-bottom: 40vh;"          
          v-show="registroDiario.ruta === null" 
        >
          <h6 class="text-center">Selecciona una ruta para continuar</h6>
          <div class="row col-12 justify-center ">
            <q-img src="~assets/LogoColima.png" alt="" style="width: 400px;" />
          </div>
        </div>
        <div class="row col-12 q-pb-md justify-end">
          <div class="row col q-px-md">
            <span class="text-subtitle2"> Total {{ total }} </span>
          </div>
          <q-btn
            label="Guardar"
            color="primary"
            @click="GuardarRegistro"
          ></q-btn>
        </div>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import RepartidoresMixinVue from "src/mixins/RepartidoresMixin.vue";
import { useRutasStore } from "src/stores/example-store";
import { useService } from "src/Utils/Servicio";

export default {
  name: "SalidasdePan",
  mixins: [RepartidoresMixinVue],
  data() {
    return {
      registroDiario: {
        totalSalida: 0,
        ruta: null,
        listaPresentacionPanes: [],
      },
      rutaStore: useRutasStore(),
      columns: [
        { name: "nombre", label: "NOMBRE", field: "nombre" },
        {
          name: "cargaDia",
          label: "CARGA DIA",
          field: "cargaDia",
          align: "center",
        },
        {
          name: "enExistencia",
          label: "EXISTENCIA",
          field: "enExistencia",
          align: "center",
        },
      ],
      listaPresentacionPanes: [

      ],
      listaConceptosEntrega: [
        { id: 0, label: "Nombre Pan" },
        { id: 1, label: "En Existencia" },
        { id: 2, label: "Carga del dia" },
        { id: 3, label: "Merma" },
        { id: 4, label: "PZ Buenas" },
      ],
      SalidaService: useService("Salidas"),
    };
  },
  created() {},
  methods: {
    GuardarRegistro() {
      this.registroDiario.totalSalida = this.total;
      if( this.rutaStore.diaSemana === 7){
        this.$q.notify({
          message: "Los domingos no hay Carga de pan",
          type: "negative",
        });
        return
      }
      if (this.registroDiario.ruta === null) {
        this.$q.notify({
          message: "Selecciona una ruta para Guardar",
          type: "negative",
        });
        return
      } 
      

      this.registroDiario.listaPresentacionPanes = this.listaPresentacionPanes.map(el => ({...el, cargaDia: el.cargaDia === null ? 0 : el.cargaDia === '' ? 0 : el.cargaDia}));
      this.SalidaService.Post({
        obj: this.registroDiario,
        Resolve: (res) => {
          this.registroDiario.ruta = null;
        },
      });
    },
    HandleRutaSelected() {
      if( this.rutaStore.diaSemana === 7){
        this.$q.notify({
          message: "Los domingos no hay Carga de pan",
          type: "negative",
        });
        this.registroDiario.ruta = null
        return
      }
      this.SalidaService.GetById({
        id: this.registroDiario.ruta.idRuta,
        Resolve: (res) => {
          this.listaPresentacionPanes = res.data.map(el => {
            el.cargaDia = el.cargaDia === 0 ? null : el.cargaDia
            return el
          }); 
        },
      });
    },
  },
  computed: {
    total() {
      let total = 0;
      this.listaPresentacionPanes.forEach((element) => {
        const cant = element.enExistencia + element.cargaDia;
        total = total + cant * element.precio;
      });
      return total;
    },
  },
};
</script>
<style scoped></style>
