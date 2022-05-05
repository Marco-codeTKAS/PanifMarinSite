<template>
    <main>

        <section>
            <div class="row justify-end">
                <q-btn dense  icon="person_add"  color="secondary" align="right" @click="Registro=>{this.modalregistro = true}" class="q-my-sm q-mx-lg q-px-sm"></q-btn>
            </div>
            <q-table
            title="USUARIOS"
            :data="dataTable"
            :columns="columns"
            dense
            class="q-mx-md "
            row-key="indice"
            :pagination.sync="paginationedit"
            :loading="loadingtable"
            >
              <template v-slot:body-cell-rol="props">
                <q-td :props="props">
                  <div class="row" v-if="props.row.rol===1">
                    Usuario
                  </div>
                  <div class="row" v-if="props.row.rol===2">
                    Admin
                  </div>
                </q-td>
              </template>
              <template v-slot:body-cell-Eliminar="props">
                <q-td :props="props">
                  <q-btn icon="clear" flat size="xs"  color="negative" @click="Eliminar(props.row.idUsuario)" dense > </q-btn>
                </q-td>

              </template>

              <template v-slot:body-cell-Editar="props">
                <q-td :props="props">
                  <q-btn icon="edit" flat size="xs" color="indigo" dense @click="Seleccion(props.row.idUsuario)" > </q-btn>
                </q-td>

              </template>
            </q-table>
            <q-dialog v-model="modalregistro" persistent>
                <Registro  />
            </q-dialog>
        </section>

        <q-dialog v-model="mensaje" persistent transition-show="scale" transition-hide="scale">
          <q-card>
            <q-card-section>
              <Registro labelbtn="Editar" disableEmail tituloComponent="Editar Usuario" hiddencontrasena="hidden" MethodName="Editar" :Datausuario="this.dataUsuario" />
            </q-card-section>
          </q-card>

        </q-dialog>

    </main>
</template>

<script>
import Registro from 'components/Registro.vue'
export default {

  components: {
    Registro
  },
  data () {
    return {
      modalregistro: false,
      dataTable: [],
      dataUsuario: [],
      columns: [
        { name: 'Nombre', align: 'left', label: 'Nombre', field: 'nombre', sortable: true },
        // { name: 'calories', align: 'center', label: '', field: '', sortable: true },
        { name: 'email', required: true, label: 'E-Mail', field: 'usuario', align: 'left', sortable: true },
        { name: 'rol', align: 'center', label: 'Perfil', field: 'rol', sortable: true },

        { name: 'Editar', align: 'center', label: '', field: '' },
        { name: 'Eliminar', align: 'center', label: '', field: '' }
      ],
      nombre: '',
      email: '',
      contrasena: '',
      perfil: '',
      paginationedit: { rowsPerPage: 25 },
      mensaje: false,
      loadingtable: true

    }
  },
  created () {
    this.ObtenerUsuarios()
    this.$root.$on('obtener', this.ObtenerUsuarios)
  },
  methods: {
    ObtenerUsuarios () {
      this.$axios.get('Usuarios').then(res => {
        this.dataTable = res.data
        this.loadingtable = false
      }).catch(e => {
        if (e.response.status === 401) {
          this.$q.dialog({
            title: 'Sin Autorizacion',
            message: 'Usted no esta autorizado por favor comuniquese con soporte',
            persistent: true
          }).onOk(() => {
            this.$root.$emit('Cerrar')
          })
        }
      })
    },

    Seleccion (id) {
      const vm = this
      this.$axios.get('Usuarios?idSelected=' + id).then(res => {
        vm.dataUsuario = res.data
        this.nombre = this.dataUsuario
        this.mensaje = true
      })
    },
    Eliminar (id) {
      const vm = this
      this.$q.dialog({
        title: 'Eliminar',
        message: '¿Desea eliminar al usuario?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        vm.$axios.delete('Usuarios?id=' + id).then(res => {
          if (res.data) {
            vm.$q.notify({
              type: 'negative',
              message: 'Usuario Eliminado',
              timeout: 1600
            })
            this.ObtenerUsuarios()
          }
        })
      }).onCancel(() => {
        console.log('>>>> Cancel')
      })
    }
  }

}
</script>
