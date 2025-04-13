<template>
  <q-page class="row justify-center">
    <div class="row q-px-sm q-pt-sm col-lg-8 col-md-10 col-12 justify-center">
      <header class="col-12">
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

      </header>

      <div class="row col-12 column-gap" v-show="registroDiario.ruta !== null">
        <!-- Tabla de panes -->
        <q-card
          class="my-card row col-md-6 col-12 items-end q-my-md q-px-md q-pt-xs"
        >
          <!-- Listado panes -->

          <q-table
            :columns="columns"
            :rows="listaPresentacionPanes"
            title="Registro Diario de pan"
            table-header-class="bg-secondary  text-white "
            hide-bottom
            title-class="text-h6"
            :pagination="{ rowsPerPage: 0 }"
            class="q-pb-md my-sticky-header-table col-12"
            square
            v-show="registroDiario.ruta !== null"
          >
            <template v-slot:top>
              <div class="row col-12 items-center">
                <div class="col q-table__title">Registro Diario de pan</div>
                <div :class="['col-2  q-table__title', $q.screen.lt.md ? 'text-subtitle2' : 'q-table__title' ]">{{ currency(total) }}</div>
              </div>
            </template>
            <template v-slot:body-cell="props">
              <q-td :props="props" :style="[this.$q.screen.lt.md ? 'padding: 0 6px' : '']">
                <p class="q-ma-none" v-if="props.col.name === 'nombre'">
                  {{ props.row.nombre.length > 6 && this.$q.screen.lt.md
                    ? props.row.nombre.substring(0, 5) + "..."
                    : props.row.nombre }}
                </p>
                <q-input
                  v-else
                  v-model.number="props.row[props.col.name]"
                  input-class="text-right"
                  type="number"
                  class="q-py-xs"
                  :label="props.col.label"
                  filled
                  dense
                />
              </q-td>
            </template>
          </q-table>

          <div class="row col-12 q-pb-md justify-end">

            <q-btn
              label="Continuar al pago"
              flat
              class="q-mt-xs q-mr-sm"
              color="primary"
              v-if="registroDiario.ruta !== null && rutaStore.diaSemana === 6"
              :to="`/PagoComision/${registroDiario?.ruta?.idRuta}`"
            ></q-btn>
            <q-btn
              label="Guardar"
              class="q-mt-xs"
              color="primary"
              @click="GuardarRegistro"
            ></q-btn>
          </div>
        </q-card>
        <!-- Card de Dinero y desgloce -->
        <q-card class="row col-12 col-md q-my-md q-px-md q-pt-xs items-start" style="height: fit-content;">
          <div :class="['row col-12',$q.screen.lt.md ? 'order-last q-pb-md': 'order-first']">
            <header class="row col-12" style="height: fit-content">
              <h6 class="col-12 text-h6 q-my-sm">Entrega de dinero</h6>
            </header>
            <div
              class="row col-12 q-mt-md"
              v-show="registroDiario.ruta !== null"
            >
              <div class="row col-12">
                <p class="text-secondary text-bold q-mb-xs col-12">
                  REGISTRO DE DINERO
                </p>
                <P
                  class="text-caption q-px-xs"
                  style="font-size: smaller; line-height: 1.1"
                  >ingresa la cantidad de billetes especifica entregada por el
                  encargado de la ruta.
                </P>
              </div>
              <div
                class="row col-6 col-md-4"
                v-for="(valor, index) in listadoBilletes"
                :key="index"
              >
                <q-input
                  v-model.number="valor.cantidad"
                  type="number"
                  class="q-pa-xs"
                  hide-bottom-space
                  autofocus
                  filled
                  dense
                  :label="currency(valor.value)"
                >
                </q-input>
              </div>
              <!-- Faltantes y gastos -->
              <div class="row col-12 column-gap q-mb-md">
                  <q-input class="col-4 q-pa-xs" v-model.number="faltante" type="number" filled dense label="faltante"></q-input>
                  <q-input class="col-4 q-pa-xs" filled v-model.number="gasto" type="number" dense label="Gasto"></q-input>
                  <q-input class="col q-pa-xs" filled v-model.number="abono" type="number" dense label="Abono"></q-input>
              </div>  
              <div class="row col-12 justify-between items-center q-px-xs">
                <div class="row column-gap items-center" style="position: relative;">
                  <p class="text-h5 text-bold q-pa-sm  bg-grey-2">{{ currency(TotalIngresado) }} </p>
                  <p class="row text-subtitle1 items-start  q-pa-sm text-grey-7"><span>{{currency(DiferenciaTotales)}}</span></p>
                </div>
                
                <q-btn
                  color="primary"
                  label="Guardar"
                  @click="SaveDinero"
                ></q-btn>
              </div>
            </div>
          </div>
          <div class="row col-12 q-py-md">
            <p class="q-ma-none text-subtitle1 text-secondary text-bold q-py-sm">Desglose Comisiones</p>
            <div class="row col-12">
              <div class="col-4">Comision</div>
              <div class="col-4">Devolución Total</div>
              <div class="col-4">Diferencia</div>
            </div>
            <div class="row col-12">
              <div class="col-4 text-subtitle2 "> 
                {{ currency(Comision) }} 
              </div>
              <div class="col-4 text-subtitle2 ">{{ currency(devolucionMerma) }}</div>
              <div :class="[' text-subtitle2 ', Diferencia < 0 ? 'text-red-5': 'text-green-5' ]" >{{ currency(Diferencia) }}</div>
            </div>
          </div>
        </q-card>
      </div>

      <div
        class="row col-12 text-center justify-center items-start"
        style="margin-bottom: 40vh"
        v-show="registroDiario.ruta === null"
      >
        <h6 class="text-center t">Selecciona una ruta para continuar</h6>
        <div class="row col-12 justify-center">
          <q-img src="~assets/LogoColima.png" alt="" style="width: 400px" />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import RepartidoresMixinVue from "src/mixins/RepartidoresMixin.vue";
import { useRutasStore } from "src/stores/example-store";
import { formatCurrency } from "src/Utils/commons";
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
        idSalidaRel: 0,
        totalOxxo:0,
        totalKiosko:0,
        totalDevuelto:0,
        idRecepcionRel: 0,
      },
      listadoBilletes: [
        { value: 1000, cantidad: null },
        { value: 500, cantidad: null },
        { value: 200, cantidad: null },
        { value: 100, cantidad: null },
        { value: 50, cantidad: null },
        { value: 20, cantidad: null },
        { value: 10, cantidad: null },
        { value: 5, cantidad: null },
        { value: 2, cantidad: null },
        { value: 1, cantidad: null },
        { value: 0.5, cantidad: null },
      ],
      faltante:0,
      gasto:0,
      abono:0,
      currency: formatCurrency,
      rutaStore: useRutasStore(),
      columns: [
        { name: "nombre", 
        label: this.$q.screen.lt.md ? "NOM" : "NOMBRE", 
        field: "nombre" 
      },
        // { name: "cargaDia", label: "CARGA DIA", field: "cargaDia",align:'center' },
        { name: "merma", 
        label: this.$q.screen.lt.md ? "MRMA" : "MERMA", 
        field: "merma", align: "center" },
        {
          name: "pzBuenas",
          label: this.$q.screen.lt.md ? "BNO" : "PZ BUENAS",
          field: "pzBuenas",
          align: "center",
        },
        {
          name: "oxxo",
          label: "OXXO ",
          field: "oxxo",
          align: "center",
        },
        {
          name: "kiosko",
          label: this.$q.screen.lt.md ? "KSKO" :"KIOSKO",
          field: "kiosko",
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
      RecepcionService: useService("Recepcion"),
    };
  },
  created() {},
  computed: {
    total() {
      let total = 0;
      this.listaPresentacionPanes.forEach((element) => {
        const cant = element.cargaDia - element.merma - Number(element.pzBuenas??0) - Number(element.oxxo ?? 0) - Number(element.kiosko ?? 0);
        total = total + cant * element.precio;
      });
      return total;
    },
    TotalIngresado() {
      const total = this.listadoBilletes.reduce((acumulador, billete) => {
        return acumulador + billete.value * billete.cantidad;
      }, 0);
      return total + Number(this.faltante) + Number(this.gasto) + Number(this.abono)
    },
    Diferencia(){
      const res = (this.total * 0.05) - this.devolucionMerma 
      console.log(this.total,(this.total * 0.05),this.devolucionMerma);
      
      return res
    },
    DiferenciaTotales(){
      return this.total - this.TotalIngresado
    },
    devolucionMerma(){
      let devTotal = 0;
      this.listaPresentacionPanes.forEach((element) => {
        const cant = element.merma;
        devTotal = devTotal + (cant * element.precio);
      });
      return devTotal;
    },
    devolucionBuenas(){
      let devTotal = 0;
      this.listaPresentacionPanes.forEach((element) => {
        const cant = element.pzBuenas;
        devTotal = devTotal + (cant * element.precio);
      });
      return devTotal;
    },
    Comision(){
      const res =
        this.total >= 10800
          ? this.total * 0.1
          : this.total < 8999
          ? this.total * 0.08
          : this.total * 0.09;
      return res;
    }
  },
  methods: {
    HandleRutaSelected() {
      this.RecepcionService.GetById({
        id: this.registroDiario.ruta.idRuta,
        Resolve: (res) => {
          this.listaPresentacionPanes = res.data.map((el) => ({
            ...el,
            merma: el.merma === 0 ? null : el.merma,
            pzBuenas: el.pzBuenas === 0 ? null : el.pzBuenas,
            oxxo: el.oxxo === 0 ? null : el.oxxo,
            kiosko: el.kiosko === 0 ? null : el.kiosko
          }));

          this.registroDiario.idRecepcionRel = res.data[0].idRecepcionRel;
          this.registroDiario.idSalidaRel = res.data[0]?.idSalidaRel;
        },
        Reject: () => {
          this.registroDiario.ruta = null;
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

      this.registroDiario.listaPresentacionPanes =
        this.listaPresentacionPanes.map((el) => ({
          ...el,
          merma: el.merma === null ? 0 : el.merma === "" ? 0 : el.merma,
          pzBuenas:
            el.pzBuenas === null ? 0 : el.pzBuenas === "" ? 0 : el.pzBuenas,
          oxxo: Number(el.oxxo ?? 0),
          kiosko:Number(el.kiosko ?? 0)
        }));

        this.registroDiario.totalOxxo = this.GetTotalByProp(this.registroDiario.listaPresentacionPanes,'oxxo')
        this.registroDiario.totalKiosko = this.GetTotalByProp(this.registroDiario.listaPresentacionPanes,'kiosko')
        this.registroDiario.totalDevuelto = this.devolucionMerma + this.devolucionBuenas

      this.RecepcionService.Post({
        obj: this.registroDiario,
        Resolve: (res) => {
          // this.registroDiario.ruta = null;
          this.HandleRutaSelected();
        },
      });
    },
    GetTotalByProp(lista,propName){
      return lista.map(el => el[propName] * el.precio).reduce((act,acum) => acum + act)
    },
    ValidaCantidades() {

      for (const pan of this.listaPresentacionPanes) {
        if (pan.merma < 0 || pan.pzBuenas < 0) {
          this.$q.notify({
            message: `No puedes ingresarle números negativos a ${pan.nombre} intenta de nuevo`,
            type: "negative",
          });
          return false;
        }
      }

      
      return true;
    },
    SaveDinero() {
      if (this.registroDiario.idRecepcionRel === 0) {
        this.$q.notify({
          message: "Se debe ingresar primero los panes entregados",
          type: "negative",
        });
        return
      }
      if (this.TotalIngresado < this.total) {
        this.$q.notify({message:'El monto ingresado es menor a lo que debe entregar la ruta ', type:'negative'        })
        return
      }
      
      if(this.DiferenciaTotales < 0 && this.faltante > 0 ){
        this.$q.notify({message:'estas ingresando mucho faltante el monto supera a lo que la ruta debe entregar', type:'negative'        })
        return
      }

      this.RecepcionService.Post({
        action: "/RegistroDesgloce",
        obj: {
          idRecepcion: this.registroDiario.idRecepcionRel,
          monto: this.TotalIngresado,
          faltante: Number(this.faltante) ?? 0,
          gasto:Number(this.gasto) ?? 0,
          abono:Number(this.abono) ?? 0,
          desgloce: this.listadoBilletes.map(el => ({...el, cantidad: Number(el.cantidad ?? 0) })),
        },
        Resolve: (res) => {
          console.log(res.data.data);
        },
      });
    },
  },
};
</script>
<style scoped></style>
