<template>
  <q-page class="flex justify-center">
    <div class="row q-pa-sm justify-center fit">
      <q-card
        class="my-card row col-lg-6 col-md-8 col-12 items-end q-my-md q-px-md q-pt-xs"
      >
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
          :table-header-style="[this.$q.screen.lt.md ? 'font-size:10px' : '']"
          style="width: 100% !important"
          hide-bottom
          :dense="this.$q.screen.lt.md"
          :pagination="{ rowsPerPage: 0 }"
          class="q-py-sm my-sticky-header-table col-12"
          square
          :style="[this.$q.screen.lt.md ? 'font-size:10px' : 'font-size:12px']"
          v-show="registroDiario.ruta !== null"
        >
          <template v-slot:body-cell="props">
            <q-td :props="props">
              <h6
                class="text-subtitle2 q-ma-none"
                :style="[this.$q.screen.lt.md ? 'font-size:11px' : '']"
                v-if="props.col.name === 'nombre'"
              >
                {{ props.row.nombre.length > 6 && this.$q.screen.lt.md
                  ? props.row.nombre.substring(0, 5) + "..."
                  : props.row.nombre }} 
              </h6>
              <p
                class="q-ma-none"
                :style="[this.$q.screen.lt.md ? 'font-size:11px' : '']"
                v-else-if="props.col.name === 'enExistencia'"
              >
                {{ props.row.enExistencia }}
              </p>
              <p
                class="q-ma-none"
                v-else-if="props.col.name === 'totalpz'"
                :style="[this.$q.screen.lt.md ? 'font-size:11px' : '']"
              >
                {{
                  Number(props.row.enExistencia ?? 0) +
                  Number(props.row.cantEmpaque ?? 0) *
                    Number(props.row.charolas ?? 0) +
                  Number(props.row.cargaDia ?? 0)
                }}
              </p>

              <q-input
                v-else
                v-model.number="props.row[props.col.name]"
                input-class="text-right"
                type="number"
                :style="[this.$q.screen.lt.md ? 'font-size:11px' : '']"
                :input-style="[this.$q.screen.lt.md ? 'font-size:11px' : '']"
                stack-label
                :label="props.col.label"
                filled
                dense
                borderless
              />
            </q-td>
          </template>
        </q-table>
        <div
          class="row col-12 text-center justify-center items-start"
          style="margin-bottom: 40vh"
          v-show="registroDiario.ruta === null"
        >
          <h6 class="text-center">Selecciona una ruta para continuar</h6>
          <div class="row col-12 justify-center">
            <q-img src="~assets/LogoColima.png" alt="" style="width: 400px" />
          </div>
        </div>
        <div class="row col-12 q-pb-md justify-end">
          <div class="row col q-px-md">
            <span class="text-subtitle1"> Total {{ currency(total) }} </span>
          </div>
          <q-btn
            label="Editar"
            color="primary"
            v-if="haveSalida"
            @click="EditRegistro"
          ></q-btn>
          <q-btn
            label="Guardar"
            v-else
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
import { formatCurrency } from "src/Utils/commons";
import { useService } from "src/Utils/Servicio";

export default {
  name: "SalidasdePan",
  mixins: [RepartidoresMixinVue],
  data() {
    return {
      currency: formatCurrency,
      registroDiario: {
        totalSalida: 0,
        ruta: null,
        listaPresentacionPanes: [],
      },
      rutaStore: useRutasStore(),
      columns: [
        { name: "nombre", 
        label:this.$q.screen.lt.md ? "NOM" : "NOMBRE", 
        field: "nombre" 
      },
        {
          name: "charolas",
          label: this.$q.screen.lt.md ? "CHAR" : "CHAROLAS",          
          field: "charolas",
          align: "center",
        },
        {
          name: "cargaDia",
          label: this.$q.screen.lt.md ? "UNID" : "UNIDADES",
          field: "cargaDia",
          align: "center",
        },
        {
          name: "enExistencia",
          label: this.$q.screen.lt.md ? "EXIS" : "EXISTENCIAS",
          field: "enExistencia",
          align: "center",
        },
        {
          name: "totalpz",
          label: this.$q.screen.lt.md ? "TOTAL" : "CANT TOTAL",
          field: "totalpz",
          align: "center",
        },
      ],
      listaPresentacionPanes: [],
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
      this.PrepareObj();
      this.SalidaService.Post({
        obj: this.registroDiario,
        Resolve: (res) => {
          this.registroDiario.ruta = null;
        },
      });
    },
    PrepareObj() {
      this.registroDiario.totalSalida = this.total;
      if (this.registroDiario.ruta === null) {
        this.$q.notify({
          message: "Selecciona una ruta para Guardar",
          type: "negative",
        });
        return;
      }

      this.registroDiario.listaPresentacionPanes =
        this.listaPresentacionPanes.map((el) => ({
          ...el,
          cargaDia:
            el.cargaDia === null
              ? 0
              : el.cargaDia === ""
              ? 0
              : el.cargaDia + Number(el.charolas ?? 0) * el.cantEmpaque,
          charolas: Number(el.charolas ?? 0),
        }));
    },
    EditRegistro() {
      this.PrepareObj();
      this.SalidaService.Put({
        obj: this.registroDiario,
        Resolve: (res) => {
          this.registroDiario.ruta = null;
        },
      });
    },
    HandleRutaSelected() {
      this.SalidaService.GetById({
        id: this.registroDiario.ruta.idRuta,
        Resolve: (res) => {
          this.listaPresentacionPanes = [];
          this.listaPresentacionPanes = res.data.map((el) => {
            el.cargaDia = el.cargaDia === 0 ? null : el.cargaDia;
            if (el.cargaDia > 0 ){
              el.charolas = el.cargaDia / el.cantEmpaque 
              el.cargaDia = null
            }
            el.charolas = el.charolas === 0 ? undefined : el.charolas;
            return el;
          });
        },
      });
    },
  },
  computed: {
    total() {
      let total = 0;
      this.listaPresentacionPanes.forEach((element) => {
        let cant =
          element.enExistencia +
          element.cargaDia +
          Number(element.charolas ?? 0) * (element.cantEmpaque ?? 0);
        total = total + cant * element.precio;
      });
      return total;
    },
    haveSalida() {
      return this.listaPresentacionPanes
        .map((el) => el.idSalidaRel)
        .some((el) => el > 0);
    },
  },
};
</script>
<style scoped></style>
