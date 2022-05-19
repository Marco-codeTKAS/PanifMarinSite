<template>
    <q-page class="column justify-start">
      <div class=" row justify-end">
        <q-btn dense  icon="person_add"  color="primary" align="right" @click="Registro=>{this.modalregistro = true}" class="q-my-sm q-mx-lg q-px-sm"></q-btn>
      </div>
        <q-table bordered
          title="REPARTIDORES"
          :data="dataRepartidores"
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
          <q-card-section> <p class="text-h4">Registro de Repartidores </p></q-card-section>
          <q-card-section class="row q-px-xl q-gutter-md">
                <q-input class="fit" v-model="nombre" autofocus outlined dense label="Nombre" hint="Ingresa tu Nombre">
                  <template v-slot:prepend>
                    <q-icon name="person" />
                  </template>
                </q-input>
                <q-input class="fit" v-model="telefono"  outlined dense label="Numero Telefonico" hint="Ingresa eel telefono del repartidor">
                  <template v-slot:prepend>
                    <q-icon name="call" />
                  </template>
                </q-input>
                <q-input class="fit" v-model="direccion"  outlined dense label="direccion" hint="Ingresa la direccion del repartidor">
                  <template v-slot:prepend>
                    <q-icon name="room" />
                  </template>
                </q-input>
                <q-input v-model="idruta"  outlined dense label="Ruta" hint="Ingresa el numero de ruta que tomara">
                  <template v-slot:prepend>
                    <q-icon name="map" />
                  </template>
                </q-input>
                <q-input v-model="idcamioneta"  outlined dense label="Camioneta" hint="Ingresa el numero de camioneta asignada">
                  <template v-slot:prepend>
                    <q-icon name="local_shipping" />
                  </template>
                </q-input>
                <q-input v-model="usuario"  outlined dense label="Usuario" hint="Ingresa el email del repartidor">
                  <template v-slot:prepend>
                    <q-icon name="mail" />
                  </template>
                </q-input>
                <q-input v-model="password"  outlined dense label="Contraseña" hint="Ingresa la contraseña para el sistema">
                  <template v-slot:prepend>
                    <q-icon name="key" />
                  </template>
                </q-input>
          </q-card-section>
          <q-card-section class="row">
            <q-btn color="secondary" @click="GuardarRepartidor" label="Guardar"></q-btn>
            <q-btn label="Cerrar" v-close-popup></q-btn>
          </q-card-section>
        </q-card>
      </q-dialog>
    </q-page>
</template>

<script>
import RepartidoresMixin from 'src/mixins/RepartidoresMixin.vue'
export default {
  mixins: [RepartidoresMixin],
  data () {
    return {
      modalregistro: false,
      nombre: '',
      idruta: '',
      idcamioneta: '',
      direccion: '',
      telefono: '',
      usuario: '',
      password: '',
      // dataTable: [],
      loadingtable: false,
      columns: [
        { name: 'Nombre', align: 'left', label: 'Nombre', field: 'nombre', sortable: true },
        { name: 'Direccion', required: true, label: 'Direcicon', field: 'direccion', align: 'left', sortable: true },
        { name: 'Telefono', align: 'center', label: 'Telefono', field: 'telefono', sortable: true },
        { name: 'idCamioneta', align: 'center', label: 'Camioneta', field: 'idCamioneta' },
        { name: 'idRuta', align: 'center', label: 'Ruta', field: 'idRuta' },
        { name: 'Editar', align: 'center', label: '', field: '' },
        { name: 'Eliminar', align: 'center', label: '', field: '' }
      ]
    }
  },
  created () {
    this.ConsultaRepartidores()
  },
  methods: {
    GuardarRepartidor () {
      const vm = this
      this.$axios.post('Repartidores', {
        Nombre: this.nombre,
        idCamioneta: this.idcamioneta,
        idRuta: this.idruta,
        Direccion: this.direccion,
        Telefono: this.telefono
      }).then(res => {
        if (res.data) {
          vm.$axios.post('Usuarios', {
            nombre: vm.nombre,
            usuario: vm.usuario,
            password: vm.password,
            idRol: 3
          }).then(res => {
            if (res.data) {
              console.log(res.data)
              this.$q.notify({
                message: 'Repartidor registrado como usuario.',
                color: 'secondary'
              })
              vm.ConsultaRepartidores()
            }
          })
          console.log(res.data)
          vm.ConsultaRepartidores()
          this.$q.notify({
            message: 'Repartidor registrado.',
            color: 'secondary'
          })
        }
      })
    },
    // Agregar mixins para realizar las consultas y no repetir codigo
    // ConsultaRepartidores () {
    //   this.loadingtable = true
    //   this.$axios.get('Repartidores').then(res => {
    //     this.dataTable = res.data
    //     this.loadingtable = false
    //   })
    // },
    Eliminar (id) {

    },
    Seleccion (id) {

    }
  }
}
</script>
