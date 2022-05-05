<template>
    <q-page>
        <div class=" row justify-end">
        <q-btn dense  icon="person_add"  color="primary" align="right" @click="Registro=>{this.modalregistro = true}" class="q-my-sm q-mx-lg q-px-sm"></q-btn>
      </div>

         <q-table bordered
          title="RUTAS"
          :data="dataRutas"
          :columns="columns"
          dense
          class="q-mx-md "
          row-key="indice"
          :loading="loadingtable"
        >
        <template v-slot:body-cell-Eliminar="props">
                <q-td :props="props" >
                  <q-btn icon="clear" flat size="sm" dense  color="negative" @click="Eliminar(props.row.idUsuario)"  > </q-btn>
                </q-td>

              </template>

              <template v-slot:body-cell-Editar="props">
                <q-td :props="props">
                  <q-btn icon="edit" flat size="sm" dense color="indigo"  @click="Seleccion(props.row.idUsuario)" > </q-btn>
                </q-td>

              </template>

        </q-table>

      <q-dialog v-model="modalregistro">
            <q-card>
                <q-card-section> <p class="text-h4">Registro de Rutas </p></q-card-section>
                <q-card-section class="row q-px-xl q-gutter-md">
                        <q-input class="fit" v-model="Panaderia" autofocus outlined dense label="Panaderia" hint="Selecciona la panaderia a donde pertenece">
                  <template v-slot:prepend>
                    <q-icon name="store" />
                  </template>
                </q-input>
                <q-input class="fit" v-model="ultimaParada"  outlined dense label="Ultima parada" hint="Ingresa la ultima ciudad que visita">
                  <template v-slot:prepend>
                    <q-icon name="place" />
                  </template>
                </q-input>
                <q-input class="fit" v-model="tiempoRecorrido"  outlined dense label="tiempoRecorrido" hint="tiempo que se tarda en recorrer la ruta en horas">
                  <template v-slot:prepend>
                    <q-icon name="timer" />
                  </template>
                </q-input>
                <q-input v-model="kmRecorridos"  outlined dense label="kilometros recorridos" hint="Ingresa los kilometros que se recorre en esa ruta">
                  <template v-slot:prepend>
                    <q-icon name="directions_car_filled" />
                  </template>
                </q-input>

                </q-card-section>
                <q-card-section class="row justify-end">
                    <q-btn label="Cerrar"  flat color="negative" v-close-popup></q-btn>
                    <q-btn color="primary" class="q-mx-md" @click="GuardarRuta" label="Guardar"></q-btn>
                </q-card-section>
            </q-card>
      </q-dialog>
    </q-page>
</template>

<script>
export default {
  name: 'Camionetas',
  data () {
    return {
      modalregistro: false,
      Panaderia: '',
      ultimaParada: '',
      tiempoRecorrido: '',
      kmRecorridos: '',
      dataRutas: [],
      loadingtable: false,

      columns: [
        { name: 'Panaderia', align: 'left', label: 'Panaderia', field: 'idPanaderia', sortable: true },
        { name: 'UltimaParada', required: true, label: 'Ultima Parada', field: 'ultimaParada', align: 'left', sortable: true },
        { name: 'TiempoRecorrido', align: 'center', label: 'Tiempo Recorrido', field: 'tiempoRecorridoenHoras', sortable: true },
        { name: 'KilometrosRecorridos', align: 'center', label: 'Kilometros Recorridos', field: 'kmRecorridos' },
        { name: 'Editar', align: 'center', label: '', field: '' },
        { name: 'Eliminar', align: 'center', label: '', field: '' }
      ]
    }
  },
  created () {
    this.ObtenerRutas()
  },
  methods: {
    GuardarRuta () {
      this.$axios.post('Rutas', {
        idPanaderia: this.Panaderia,
        ultimaParada: this.ultimaParada,
        tiempoRecorridoenHoras: this.tiempoRecorrido,
        kmRecorridos: this.kmRecorridos

      }).then(res => {
        if (res.data) {
          this.$Notify(

          )
          this.modalregistro = false
          this.ObtenerRutas()
        }
      })
    },
    ObtenerRutas () {
      this.$axios.get('/Rutas').then(res => {
        this.dataRutas = res.data
      })
    },
    Eliminar (id) {

    },
    Seleccion (id) {

    }
  }
}
</script>
