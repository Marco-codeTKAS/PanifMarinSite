<template>
    <q-page class="flex justify-center">
      <div class="row q-pa-md fit">
        <q-table
          color="primary"
          title="DETALLE DE SALIDAS"
          :data="dataPrueba"
          :columns="columns"

          separator="cell"

        >
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="nombre" :props="props">{{ props.row.nombre }}</q-td>
            <q-td key="Charolas" :props="props">
              {{ props.row.Charolas }}
              <q-popup-edit v-model="props.row.Charolas" square v-slot="scope">
                <q-input v-model="scope.value" :hint="''+ props.row.nombre"  style="max-width:60px;" dense autofocus  />
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
        </q-table>

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
      columns: [
        { name: 'nombre', align: 'left', label: 'nombre', field: 'nombre', sortable: true },
        { name: 'Charolas', required: true, label: 'CHA', field: '', align: 'left', sortable: true },
        { name: 'Chinos', align: 'center', label: 'Chinos', field: '', sortable: true },
        { name: 'Bolillo6', align: 'center', label: 'BOL.6', field: '' },
        { name: 'Bolillo3', align: 'center', label: 'BOL.3', field: '' },
        { name: 'Telera4', align: 'center', label: 'TEL.4', field: '' },
        { name: 'TrancaG', align: 'center', label: 'TrancaG', field: '' },
        { name: 'ConchaG', align: 'center', label: 'ConchaG', field: '' },
        { name: 'PiconG', align: 'center', label: 'PiconG', field: '' },
        { name: 'BolilloG', align: 'center', label: 'BolilloG', field: '' },
        { name: 'Avena', align: 'center', label: 'Avena', field: '' },
        { name: 'AvenaG', align: 'center', label: 'AvenaG', field: '' },
        { name: 'AvenaCH', align: 'center', label: 'AvenaCh', field: '' }
      ]
    }
  },
  created () {
    console.log(this.dataRepartidores)
  },
  methods: {

  }
}
</script>
