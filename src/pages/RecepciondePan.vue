<template>
  <q-page class="flex justify-center">
    <div class="row q-px-sm q-pt-sm justify-center fit">
      <q-card
        class="my-card row col-lg-6 col-md-8 col-12 items-end q-my-md q-px-md q-pt-xs"
      >
        <!-- Listado panes -->
        <h6 class="q-my-sm">Recepción de pan</h6>
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
          title="Registro Diario de pan"
          table-header-class="bg-secondary text-white"
          hide-bottom
          :pagination="{ rowsPerPage: 0 }"
          class="q-pb-md my-sticky-header-table col-12"
          square
          v-show="registroDiario.ruta !== null"
        >
          <template v-slot:body-cell="props">
            <q-td :props="props">
              <p class="q-ma-none" v-if="props.col.name === 'nombre'">
                {{ props.row.nombre }}
              </p>
              <q-input
                v-else
                v-model.number="props.row[props.col.name]"
                input-class="text-right"
                type="number"
                class="q-py-sm"
                :label="props.col.label"
                filled
                dense
              />
            </q-td>
          </template>
        </q-table>
        <div class="row col-12 q-pb-md justify-end">
          <div class="row col q-px-md">
            <span class="text-subtitle2">
              Total {{ registroDiario.total }}
            </span>
          </div>
          <q-btn
            label="Guardar"
            class="q-mt-xs"
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
  name: "RecepcionPan",
  mixins: [RepartidoresMixinVue],
  data() {
    return { 
      registroDiario: {
        totalSalida: 0,
        ruta: null,
        listaPresentacionPanes: [],
        idSalidaRel:0,
      },
      rutaStore: useRutasStore(),
      columns: [
        { name: "nombre", label: "NOMBRE", field: "nombre" },
        // { name: "cargaDia", label: "CARGA DIA", field: "cargaDia",align:'center' },
        { name: "merma", label: "MERMA", field: "merma", align: "center" },
        {
          name: "pzBuenas",
          label: "PZ BUENAS",
          field: "pzBuenas",
          align: "center",
        },
      ],
      listaPresentacionPanes: [
        {
          idPan: 1,
          nombre: "Pan Dulce",
          idTipo: 1,
          precio: 9,
          enExistencia: 0,
          cargaDia: 0,
          merma: 0,
          pzBuenas: 0,
        },
      ],
      listaConceptosEntrega: [
        { id: 0, label: "Nombre Pan" },
        { id: 1, label: "En Existencia" },
        { id: 2, label: "Carga del dia" },
        { id: 3, label: "Merma" },
        { id: 4, label: "PZ Buenas" },
      ],
      RecepcionService: useService("Recepcion"),
    };
  },
  created() {
    console.log(this.dataRepartidores);
  },
  methods: {
    HandleRutaSelected() {
      this.RecepcionService.GetById({
        id: this.registroDiario.ruta.idRuta,
        Resolve: (res) => {
          this.listaPresentacionPanes = res.data;
          this.registroDiario.idSalidaRel = res.data[0]?.idSalidaRel
        },
      });
    },
    GuardarRegistro() {
      this.registroDiario.totalSalida = this.total;
      if (this.registroDiario.ruta === null) {
        this.$q.notify({
          message: "Selecciona una ruta para Guardar",
          type: "negative",
        });
        return;
      }
      if (!this.ValidaCantidades()) {
        return;
      }

      this.registroDiario.listaPresentacionPanes = this.listaPresentacionPanes;
      this.RecepcionService.Post({
        obj: this.registroDiario,
        Resolve: (res) => {
          console.log(res.data);
        },
      });
    },
    ValidaCantidades() {
      for (const pan of this.listaPresentacionPanes) {
        if (pan.merma > pan.cargaDia || pan.pzBuenas > pan.cargaDia) {
          this.$q.notify({
            message: `Estas intentando devolver mas ${pan.nombre} del que se llevaron`,
            type: "negative",
          });
          return false;
        }
        if (pan.merma < 0 || pan.pzBuenas <0)  {
          this.$q.notify({
            message: `No puedes ingresarle números negativos a ${pan.nombre} intenta de nuevo`,
            type: "negative",
          });
        }
      }
      return true;
    },
  },
};
</script>
<style scoped></style>
