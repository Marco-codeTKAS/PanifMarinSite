<template>
    <q-page class="flex justify-center">
      <div class="row q-pa-md fit">

        <!-- <q-table
          color="primary"
          title="DETALLE DE SALIDAS"
          :data="dataPrueba"
          :columns="columns"
          separator="cell"

        >
       <template v-slot:header-cell="props">
        <q-th :props="props" >
          {{ props.col.label }}
        </q-th>
      </template>

        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="nombre" :props="props">{{ props.row.nombre }}</q-td>
            <q-td key="Charolas" :props="props"  >
              {{ props.row.Charolas }}
              <q-popup-edit v-model="props.row.Charolas" square v-slot="scope">
                <q-input type="number" v-model="scope.value" :hint="''+ props.row.nombre"  style="max-width:60px;" dense autofocus  />
              </q-popup-edit>
            </q-td>
            <q-td key="Chinos" :props="props">
              {{ props.row.Chinos }}
              <q-popup-edit v-model="props.row.Chinos" v-slot="scope">
                <q-input type="number" v-model="scope.value" :hint="''+ props.row.nombre"  style="max-width:60px;" dense autofocus />
              </q-popup-edit>
            </q-td>
            <q-td key="Bolillo6" :props="props">
              <div class="text-pre-wrap">{{ props.row.Bolillo6 }}</div>
              <q-popup-edit v-model="props.row.Bolillo6" v-slot="scope">
                <q-input type="number" v-model="scope.value" :hint="''+ props.row.nombre" style="max-width:60px;" dense autofocus />
              </q-popup-edit>
            </q-td>
            <q-td key="Bolillo3" :props="props">
              {{ props.row.Bolillo3 }}
              <q-popup-edit v-model="props.row.Bolillo3"  v-slot="scope">
                <q-input type="number" v-model="scope.value" :hint="''+ props.row.nombre"  style="max-width:60px;" dense autofocus  />
              </q-popup-edit>
            </q-td>
            <q-td key="Telera4" :props="props">
              {{ props.row.Telera4 }}
              <q-popup-edit v-model="props.row.Telera4"  v-slot="scope">
                <q-input type="number" v-model="scope.value" :hint="''+ props.row.nombre"  style="max-width:60px;" dense autofocus  />
              </q-popup-edit>
            </q-td>
            <q-td key="TrancaG" :props="props">
              {{ props.row.TrancaG }}
              <q-popup-edit v-model="props.row.TrancaG"  v-slot="scope">
                <q-input type="number" v-model="scope.value" :hint="''+ props.row.nombre" style="max-width:60px;" dense autofocus  />
              </q-popup-edit>
            </q-td>
            <q-td key="ConchaG" :props="props">
              {{ props.row.ConchaG }}
              <q-popup-edit v-model="props.row.ConchaG"  v-slot="scope">
                <q-input type="number" v-model="scope.value" :hint="''+ props.row.nombre" style="max-width:60px;" dense autofocus  />
              </q-popup-edit>
            </q-td>
            <q-td key="PiconG" :props="props">
              {{ props.row.PiconG }}
              <q-popup-edit v-model="props.row.PiconG"  v-slot="scope">
                <q-input type="number" v-model="scope.value" :hint="''+ props.row.nombre" style="max-width:60px;" dense autofocus  />
              </q-popup-edit>
            </q-td>
            <q-td key="BolilloG" :props="props">
              {{ props.row.BolilloG }}
              <q-popup-edit v-model="props.row.BolilloG"  v-slot="scope">
                <q-input type="number" v-model="scope.value" :hint="''+ props.row.nombre" style="max-width:60px;" dense autofocus  />
              </q-popup-edit>
            </q-td>
            <q-td key="Avena" :props="props">
              {{ props.row.Avena }}
              <q-popup-edit v-model="props.row.Avena"  v-slot="scope">
                <q-input type="number" v-model="scope.value" :hint="''+ props.row.nombre"  style="max-width:60px;" dense autofocus  />
              </q-popup-edit>
            </q-td>
            <q-td key="AvenaG" :props="props">
              {{ props.row.AvenaG }}
              <q-popup-edit v-model="props.row.AvenaG"  v-slot="scope">
                <q-input type="number" v-model="scope.value" :hint="''+ props.row.nombre" style="max-width:60px;" dense autofocus  />
              </q-popup-edit>
            </q-td>
            <q-td key="AvenaCH" :props="props">
              {{ props.row.AvenaCH }}
              <q-popup-edit v-model="props.row.AvenaCH"  v-slot="scope">
                <q-input type="number" v-model="scope.value" :hint="''+ props.row.nombre" style="max-width:60px;" dense autofocus  />
              </q-popup-edit>
            </q-td>
          </q-tr>
        </template>
        </q-table> -->
        <q-select
        v-model="selectRepartidor"
        filled
        use-input
        label="Repartidores"
        class="fit "
        input-debounce="0"
        :options="dataSelect"
        popup-content-class="bg-secondary text-white"
        option-value="nombre"
        option-label="nombre"
        @filter="filterFn"

        >
          <template v-slot:no-option>
            <q-item>
              <q-item-section class="text-grey">
                No results
              </q-item-section>
            </q-item>
          </template>

        </q-select>

        <q-card class="my-card row q-my-md">
          <q-card-section class="row full-width">
            <h2 class="text-h4 full-width q-ma-none" style="text-align:center;"> {{this.selectRepartidor.nombre}} </h2>
          </q-card-section>
          <q-card-section class="row full-width q-py-none items-baseline justify-around"  >
              <h4 class="text-h6 q-my-none" style="text-align:center;">Frio</h4>
              <h4 class="text-h6 q-my-none" style="text-align:center;">Bueno</h4>
          </q-card-section>
          <q-card-section class="row justify-around q-pt-none q-pb-md" v-if="this.selectRepartidor.nombre !=='Sin Seleccion'" >
            <div class="row justify-around q-mt-sm" v-for="(campo,index) in this.Campos" :key="campo">
              <div class="row q-mx-sm"  style="max-width:40%;"> <q-input v-model="modelInputFrio[index]" :label="campo" type="number"  standout="bg-primary text-white" dense> </q-input> </div>
              <div class="row q-mx-sm"  style="max-width:40%;"> <q-input v-model="modelInputBueno[index]" standout="bg-primary text-white" type="number" dense></q-input> </div>
            </div>
          </q-card-section>
          <q-card-section class="row full-width justify-end" v-if="this.selectRepartidor.nombre !=='Sin Seleccion'" >
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
      dataPrueba: [{ nombre: 'Jesus Ramirez' }, { nombre: 'Victor' }, { nombre: 'Felipe' }],
      dataSelect: [],
      selectRepartidor: { nombre: 'Sin Seleccion' },
      modelInputFrio: [],
      modelInputBueno: [],
      Campos: ['Chinos', 'Bolillo6', 'Bolillo3', 'Telera4', 'TrancaG', 'ConchaG', 'PiconG', 'BolilloG', 'Avena', 'AvenaG', 'AvenaCH']
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
