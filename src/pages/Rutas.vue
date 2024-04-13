<template>
  <q-page>
    <div class="row justify-end">
      <q-btn
        dense
        icon="person_add"
        color="primary"
        align="right"
        @click="modalregistro = true"
        class="q-my-sm q-mx-lg q-px-sm"
      ></q-btn>
    </div>

    <q-table
      bordered
      title="RUTAS"
      :data="dataRutas"
      :columns="columns"
      dense
      class="q-mx-md"
      row-key="indice"
      :loading="loadingtable"
    >
      <template v-slot:body-cell-Eliminar="props">
        <q-td :props="props">
          <q-btn
            icon="clear"
            flat
            size="sm"
            dense
            color="negative"
            @click="Eliminar(props.row.idUsuario)"
          >
          </q-btn>
        </q-td>
      </template>

      <template v-slot:body-cell-Editar="props">
        <q-td :props="props">
          <q-btn
            icon="edit"
            flat
            size="sm"
            dense
            color="indigo"
            @click="Seleccion(props.row.idUsuario)"
          >
          </q-btn>
        </q-td>
      </template>
    </q-table>

    <q-dialog v-model="modalregistro">
      <q-card>
        <q-card-section>
          <p class="text-h4">Registro de Rutas</p>
        </q-card-section>
        <q-card-section>
          <q-form class="row">
            <section class="col-12">
              <q-input
                class="fit"
                v-model="Panaderia"
                disable
                autofocus
                outlined
                dense
                label="Panadería"
                hint="Selecciona la panadería a donde pertenece"
              >
                <template v-slot:prepend>
                  <q-icon name="store" />
                </template>
              </q-input>
            </section>
            <section class="row col-12">
              <q-input
                class="fit"
                v-model="nombreRuta"
                outlined
                dense
                label="Nombre de Ruta"
                hint="Ej: Jalisco 1"
              >
                <template v-slot:prepend>
                  <q-icon name="place" />
                </template>
              </q-input>
            </section>
            <section class="row col-12 column-gap">
              <q-input
                class="col-md col-12"
                v-model="tiempoRecorrido"
                outlined
                dense
                suffix="Hrs"
                label="tiempoRecorrido"
                hint="tiempo que se tarda en recorrer la ruta en horas"
              >
                <template v-slot:prepend>
                  <q-icon name="timer" />
                </template>
              </q-input>
              <q-input
                v-model="kmRecorridos"
                outlined
                dense
                class="col-md col-12"
                label="kilómetros recorridos"
                suffix="Km"
                hint="kilómetros aproximados en esa ruta"
              >
                <template v-slot:prepend>
                  <q-icon name="directions_car_filled" />
                </template>
              </q-input>
            </section>
            <!-- <q-input class="fit" v-model="ultimaParada" outlined dense label="Ultima parada"
              hint="Ingresa la ultima ciudad que visita">
              <template v-slot:prepend>
                <q-icon name="place" />
              </template>
            </q-input> -->
            <footer class="row col-12 q-mt-md justify-end column-gap">
              <q-btn label="Cerrar" flat color="negative" v-close-popup></q-btn>
              <q-btn
                color="primary"
                @click="GuardarRuta"
                label="Guardar"
              ></q-btn>
            </footer>
          </q-form>
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
      Panaderia: 'COLIMA',
      ultimaParada: '',
      tiempoRecorrido: '',
      kmRecorridos: '',
      dataRutas: [],
      loadingtable: false,
      nombreRuta: '',
      columns: [
        {
          name: 'Panaderia',
          align: 'left',
          label: 'Panaderia',
          field: 'idPanaderia',
          sortable: true
        },
        {
          name: 'nombreRuta',
          required: true,
          label: 'NOMBRE RUTA',
          field: 'nombreRuta',
          align: 'left',
          sortable: true
        },
        {
          name: 'UltimaParada',
          required: true,
          label: 'Ultima Parada',
          field: 'ultimaParada',
          align: 'left',
          sortable: true
        },
        {
          name: 'TiempoRecorrido',
          align: 'center',
          label: 'Tiempo Recorrido',
          field: 'tiempoRecorridoenHoras',
          sortable: true
        },
        {
          name: 'KilometrosRecorridos',
          align: 'center',
          label: 'Kilometros Recorridos',
          field: 'kmRecorridos'
        },
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
      this.loadingtable = true
      this.$axios
        .post('Rutas', {
          idPanaderia: 1,
          ultimaParada: this.ultimaParada,
          tiempoRecorridoenHoras: this.tiempoRecorrido,
          kmRecorridos: this.kmRecorridos,
          nombreRuta: this.nombreRuta
        })
        .then((res) => {
          this.loadingtable = false
          if (res.data) {
            this.$q.notify({ type: 'positive', message: 'Registro guardado correctamente' })
            this.modalregistro = false
            this.ObtenerRutas()
          }
        }).finally(() => {
          this.loadingtable = false
          this.modalregistro = false
        })
    },
    ObtenerRutas () {
      this.loadingtable = true
      this.$axios.get('/Rutas').then((res) => {
        this.dataRutas = res.data
      }).finally(() => {
        this.loadingtable = false
      })
    },
    Eliminar (id) {},
    Seleccion (id) {}
  }
}
</script>
