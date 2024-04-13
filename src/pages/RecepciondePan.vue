<template>
  <q-page class="flex justify-center">
    <div class="row q-pa-md fit">
      <q-select v-model="selectRepartidor" dense filled use-input label="Repartidores" class="fit" input-debounce="0"
        :options="dataSelect" popup-content-class="bg-secondary text-white" option-value="nombre" option-label="nombre"
        @filter="filterFn">
        <template v-slot:no-option>
          <q-item>
            <q-item-section class="text-grey"> No results </q-item-section>
          </q-item>
        </template>
      </q-select>

      <q-card class="my-card row q-my-md">
        <q-card-section class="row full-width">
          <h2 class="text-h4 full-width q-ma-none" style="text-align: center">
            {{ this.selectRepartidor.nombre }}
          </h2>
        </q-card-section>
        <q-card-section class="row full-width q-py-none items-baseline justify-around">
          <h4 class="text-h6 q-my-none" style="text-align: center">Frio</h4>
          <h4 class="text-h6 q-my-none" style="text-align: center">Bueno</h4>
        </q-card-section>
        <q-card-section class="row justify-around q-pt-none q-pb-md"
          v-if="this.selectRepartidor.nombre !== 'Sin Seleccion'">
          <div class="row justify-around q-mt-sm" v-for="(campo, index) in this.Campos" :key="campo">
            <div class="row q-mx-sm" style="max-width: 40%">
              <q-input v-model="modelInputFrio[index]" :label="campo" type="number" standout="bg-primary text-white"
                dense>
              </q-input>
            </div>
            <div class="row q-mx-sm" style="max-width: 40%">
              <q-input v-model="modelInputBueno[index]" standout="bg-primary text-white" type="number" dense></q-input>
            </div>
          </div>
        </q-card-section>
        <q-card-section class="row full-width justify-end" v-if="this.selectRepartidor.nombre !== 'Sin Seleccion'">
          <q-btn label="Guardar" @click="GuardarData" color="primary"></q-btn>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import RepartidoresMixinVue from 'src/mixins/RepartidoresMixin.vue'
export default {
  name: 'SalidasdePan',
  mixins: [RepartidoresMixinVue],
  data () {
    return {
      dataPrueba: [
        { nombre: 'Jesus Ramirez' },
        { nombre: 'Victor' },
        { nombre: 'Felipe' }
      ],
      dataSelect: [],
      selectRepartidor: { nombre: 'Sin Seleccion' },
      modelInputFrio: [],
      modelInputBueno: [],
      Campos: [
        'Chinos',
        'Bolillo6',
        'Bolillo3',
        'Telera4',
        'TrancaG',
        'ConchaG',
        'PiconG',
        'BolilloG',
        'Avena',
        'AvenaG',
        'AvenaCH'
      ]
    }
  },
  created () {
    console.log(this.dataRepartidores)
  },
  methods: {
    filterFn (val, update) {
      if (val === '') {
        update(() => {
          this.dataSelect = this.dataPrueba
          console.log(this.dataPrueba)
        })
        return
      }

      update(() => {
        const needle = val.toLowerCase()
        console.log(this.dataSelect)
        this.dataSelect = this.dataPrueba.filter((v) => {
          return v.nombre.toLowerCase().indexOf(needle) > -1
        })
      })
    },
    GuardarData () {
      console.log('pan frio', this.modelInputFrio)
      console.log('pan Bueno', this.modelInputBueno)
    }
  }
}
</script>
