<template>
  <q-page class="q-px-md">
    <div class="row justify-end">
      <q-btn
        dense
        icon="person_add"
        color="primary"
        align="right"
        @click="
          (Registro) => {
            this.modalregistro = true;
          }
        "
        class="q-my-sm q-mx-lg q-px-sm"
      ></q-btn>
    </div>
    <q-card class="">
      <q-table
        title="Camionetas"
        bordered
        @row-click="Seleccion"
        :columns="columns"
        :data="dataCamionetas"
      >
      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <div class="row align-center">
            <q-btn icon="construction" flat color="secondary" round to="/Repartidores"></q-btn>
            <q-btn icon="edit" color="primary" flat round @click.stop="Seleccion('',props.row)"></q-btn>
            <q-btn icon="delete" color="negative" flat round @click.stop="Eliminar"></q-btn>
          </div>
        </q-td>
      </template>
      </q-table>
    </q-card>

    <q-dialog v-model="modalregistro">
      <q-card class="q-px-md q-pb-md" style="width: 800px; max-width: 80vw">
        <header>
          <h6 class="q-my-md">Registra los datos de una camioneta</h6>
        </header>
        <q-separator color="grey-7" class="q-my-md"></q-separator>
        <q-form class="row col-12 row-gap" @submit.prevent="GuardarCamioneta">
          <section class="row col-12 column-gap">
            <q-input
              v-model.trim="marca"
              class="col-md col-12"
              autofocus
              outlined
              fill-mask
              hide-bottom-space
              :rules="[val => !!val || 'El campo es requerido']"
              dense
              label="Marca *"
            >
              <template v-slot:prepend>
                <q-icon name="fact_check" />
              </template>
            </q-input>
            <q-input
              v-model="modelo"
              class="col-md col-12"
              autofocus
              outlined
              hide-bottom-space
              :rules="[val => !!val || 'El campo es requerido']"
              dense
              label="Modelo *"
            >
              <template v-slot:prepend>
                <q-icon name="directions_car" />
              </template>
            </q-input>
          </section>
          <section class="row col-12 column-gap col">
            <q-input
              v-model="VIN"
              class="col-md-5 col-12"
              autofocus
              outlined
              dense
              hide-bottom-space
              :rules="[val => !!val || 'El campo es requerido']"
              label="VIN *"
            >
              <template v-slot:prepend>
                <q-icon name="badge" />
              </template>
            </q-input>
            <q-input
              v-model="placas"
              class="col-md-4 col-12"
              autofocus
              outlined
              dense
              hide-bottom-space
              :rules="[val => !!val || 'El campo es requerido']"
              label="Placas *"
            >
              <template v-slot:prepend>
                <q-icon name="local_police" />
              </template>
            </q-input>
            <q-input
              v-model="lanzamiento"
              class="col-md col-12"
              autofocus
              hide-bottom-space
              :rules="[val => !!val || 'El campo es requerido']"
              outlined
              dense
              label="Año de lanzamiento *"
            >
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy
                    cover
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date v-model="lanzamiento" default-view="Years" mask="YYYY" years-in-month-view emit-immediately minimal>
                      <div class="row items-center justify-end">
                        <q-btn
                          v-close-popup
                          label="Close"
                          color="primary"
                          flat
                        />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </section>
          <section class="row col-12 column-gap">
            <q-input
              v-model="KmPorLitro"
              class="col-md-3 col-12"
              autofocus
              outlined
              dense
              label="Km/Lt"
            >
              <template v-slot:prepend>
                <q-icon name="ev_station" />
              </template>
            </q-input>
            <q-select
              v-model="tipoCamioneta"
              class="col-md-3 col-12"
              :options="[
                {label:'Panadera', id:1},
                {label:'Particular', id:2}
              ]"
              autofocus
              outlined
              dense
              label="Tipo"
            >
              <template v-slot:prepend>
                <q-icon name="view_in_ar" />
              </template>
            </q-select>
            <q-input
              v-model="capacidadCarga"
              class="col-md col-12"
              autofocus
              outlined
              dense
              label="Capacidad de carga"
            >
              <template v-slot:prepend>
                <q-icon name="local_shipping" />
              </template>
            </q-input>
          </section>
          <section class="row justify-end col-12 col-gap q-pt-md">
            <q-btn label="Guardar" type="submit" color="secondary"></q-btn>
          </section>
        </q-form>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
export default {
  name: 'Camionetas',
  data () {
    return {
      dataCamionetas: [],
      modalregistro: false,
      modelo: '',
      marca: '',
      KmPorLitro: '',
      capacidadCarga: '',
      tipoCamioneta: '',
      lanzamiento: '',
      VIN: '',
      placas: '',
      loadingtable: false,
      columns: [
        {
          name: 'marca',
          align: 'left',
          label: 'Marca',
          field: 'marca',
          sortable: true
        },
        {
          name: 'modelo',
          required: true,
          label: 'Modelo',
          field: 'modelo',
          align: 'left',
          sortable: true
        },
        {
          name: 'VIN',
          required: true,
          label: 'VIN',
          field: 'vin',
          align: 'left',
          sortable: true
        },
        {
          name: 'placas',
          required: true,
          label: 'Placas',
          field: 'placas',
          align: 'left',
          sortable: true
        },
        {
          name: 'kmporlitro',
          align: 'center',
          label: 'Kilometros por litro',
          field: 'kmPorLitro'
        },
        {
          name: 'capacidadCarga',
          align: 'center',
          label: 'Capacidad de carga',
          field: 'capacidadCarga'
        },
        { name: 'actions', align: 'center', label: '', field: '' }
      ]
    }
  },
  created () {
    this.ObtenerCamioneta()
  },
  methods: {
    GuardarCamioneta (evt) {
      const json = this.CrearObjToSend()
      this.$axios
        .post('Camionetas', json)
        .then((res) => {
          if (res.data) {
            this.ObtenerCamioneta()
            this.modalregistro = false
          }
        }).finally(() => {

        })
    },
    ObtenerCamioneta () {
      this.loadingtable = true
      this.$axios
        .get('Camionetas')
        .then((res) => {
          this.dataCamionetas = res.data
          this.loadingtable = false
        })
        .finally(() => {
          this.loadingtable = false
        })
    },
    Eliminar (idCamioneta) {},
    CrearObjToSend () {
      const vm = this
      const obj = {
        marca: vm.marca,
        modelo: vm.modelo,
        VIN: vm.VIN,
        placas: vm.placas,
        lanzamiento: vm.lanzamiento,
        kmPorLitro: vm.kmPorLitro,
        tipoCamioneta: vm.tipoCamioneta.id,
        capacidadCarga: vm.capacidadCarga
      }
      return obj
    },
    LimpiarData () {
      this.marca = ''
      this.modelo = ''
      this.VIN = ''
      this.placas = ''
      this.lanzamiento = ''
      this.KmPorLitro = ''
      this.tipoCamioneta = ''
      this.capacidadCarga = ''
    },
    Seleccion (evt, row) {
      console.log(row)
    }
  }
}
</script>
