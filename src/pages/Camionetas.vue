<template>
    <q-page>
         <div class=" row justify-end">
            <q-btn dense  icon="person_add"  color="primary" align="right" @click="Registro=>{this.modalregistro = true}" class="q-my-sm q-mx-lg q-px-sm"></q-btn>
        </div>
         <q-table bordered
         grid
          title="CAMIONETAS"
          :data="dataCamionetas"
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
            <q-card-section> <p class="text-h4">Registro de Camionetas </p></q-card-section>
            <q-card-section class="row q-px-xl q-gutter-md">
                <q-input class="fit" v-model="modelo" autofocus outlined dense label="Modelo" hint="Ingresa el Modelo de la camioneta">
                  <template v-slot:prepend>
                    <q-icon name="badge" />
                  </template>
                </q-input>
                <q-input class="fit" v-model="marca"  outlined dense label="Marca" hint="Ingresa la marca">
                  <template v-slot:prepend>
                    <q-icon name="directions_car_filled" />
                  </template>
                </q-input>
                <q-input class="fit" v-model="KmPorLitro"  outlined dense label="km/Lts" hint="kilometros por litro de fabrica">
                  <template v-slot:prepend>
                    <q-icon name="local_gas_station" />
                  </template>
                </q-input>
                <q-input v-model="capacidadCarga"  outlined dense label="Capacidad de Carga" hint="Ingresa la capacidad de carga maxima">
                  <template v-slot:prepend>
                    <q-icon name="car_crash" />
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
      dataCamionetas: [],
      modalregistro: false,
      modelo: '',
      marca: '',
      KmPorLitro: '',
      capacidadCarga: '',
      loadingtable: false,

      columns: [
        { name: 'marca', align: 'left', label: 'Marca', field: 'marca', sortable: true },
        { name: 'modelo', required: true, label: 'Modelo', field: 'modelo', align: 'left', sortable: true },
        { name: 'kmporlitro', align: 'center', label: 'Kilometros por litro', field: 'kmPorLitro' },
        { name: 'capacidadCarga', align: 'center', label: 'Capacidad de carga', field: 'capacidadCarga' },
        { name: 'Editar', align: 'center', label: '', field: '' },
        { name: 'Eliminar', align: 'center', label: '', field: '' }
      ]
    }
  },
  created () {
    this.ObtenerCamioneta()
  },
  methods: {
    GuardarRuta () {
      this.$axios.post('Camionetas', {
        marca: this.marca,
        modelo: this.modelo,
        kmPorLitro: this.kmPorLitro,
        capacidadCarga: this.capacidadCarga
      }).then(res => {
        if (res.data) {
          this.ObtenerCamioneta()
          this.modalregistro = false
        }
      })
    },
    ObtenerCamioneta () {
      this.loadingtable = true
      this.$axios.get('Camionetas').then(res => {
        this.dataCamionetas = res.data
        this.loadingtable = false
      })
    },
    Eliminar (idCamioneta) {

    },
    Seleccion (idCamioneta) {

    }
  }
}
</script>
