<template>
    <div class="row justify-center ">
        <div class="col-12">
          <q-card class="my-card ">
              <q-card-section>
                 <h5 class="q-ma-none"> {{tituloComponent}} </h5>
              </q-card-section>
              <q-separator inset/>
              <q-card-section class="q-gutter-y-xs">
                <div class="row flex-center q-gutter-y-xs">
                  <div class="column col-md-12 col-xs-12 q-px-md ">
                    <q-input v-model="nombreinput"  label="Nombre" hint="Ingrese su nombre" >
                      <template v-slot:prepend>
                            <q-icon name="person_outline" />
                      </template>
                    </q-input>
                  </div>
                  <div class="column col-md-6 col-xs-12 q-px-md">

                    <q-input :disable="disableEmail" ref="correo" @blur="QuitarValidacion()" :rules="[valor => valor.length <= 250 || 'Maximo 250 caracteres', valor => !!valor || 'Ingrese el email',
                        valor => /^[aA-zZ0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[aA-zZ0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[aA-zZ0-9](?:[aA-zZ0-9-]*[aA-zZ0-9])?\.)+[aA-zZ0-9](?:[aA-zZ0-9-]*[aA-zZ0-9])?$/.test(valor)
                        || 'Ingrese email valido' ]" color="accent" dense  v-model="emailinput" label="Correo Electronico">
                      <template v-slot:prepend>
                            <q-icon name="person" />
                      </template>
                    </q-input>
                  </div>
                  <div class="col-md-6 col-xs-12 q-px-md ">
                    <q-select class="full-width" v-model="perfilinput" :options="options" label="Perfiles" hint="Selecciona un perfil" >
                      <template v-slot:prepend>
                            <q-icon name="badge" />
                      </template>
                    </q-select>
                  </div>
                    <div class="col-md-6 col-xs-12 q-px-md">
                      <q-input :class="hiddencontrasena" class="q-pt-xs q-pb-lg" ref="input" v-model="contrasenainput" label="Contraseña:"   :type="isPwd ? 'password' : 'text'" hint="Ingrese su contraseña" >
                      <template v-slot:append>
                        <q-icon
                          :name="isPwd ? 'visibility_off' : 'visibility'"
                          class="cursor-pointer"
                          @click="isPwd = !isPwd"
                        />
                      </template>
                      <template v-slot:prepend>
                            <q-icon name="vpn_key" />
                      </template>
                    </q-input>
                    </div>

                  <div class="col-md-6 col-xs-12 q-px-md" >
                    <q-input :class="hiddencontrasena" v-model="confirma" :type="isPwd2 ? 'password' : 'text'" label="Confirma tu contraseña" :rules="[valor => contrasenainput == valor  || 'Contraseñas no coinciden', ]" hint="Confirma tu contraseña"  @blur="QuitarValidacion">
                      <template v-slot:append>
                        <q-icon
                          :name="isPwd2 ? 'visibility_off' : 'visibility'"
                          class="cursor-pointer"
                          @click="isPwd2 = !isPwd2"
                        />
                      </template>
                      <template v-slot:prepend>
                            <q-icon name="vpn_key" />
                      </template>
                    </q-input>
                  </div>
                </div>
                <div class="row q-mt-md justify-end q-px-md">
                  <q-btn class="q-mx-md"  color="secondary" @click="GuardaEdita" :label="labelbtn" v-close-popup/>
                  <q-btn class="q-mx-md" flat color="grey" label="Cerrar" v-close-popup/>
                </div>
              </q-card-section>
          </q-card>

        </div>
    </div>
</template>

<script>

export default {
  name: 'Registro',
  props: {
    labelbtn: {
      type: String,
      default: 'guardar'
    },
    tituloComponent: {
      type: String,
      default: 'Registro de Usuario'
    },
    hiddencontrasena: {
      type: String,
      default: ''
    },
    disableEmail: {
      type: Boolean,
      default: false
    },

    Datausuario: {}

  },
  data () {
    return {
      nombreinput: '',
      emailinput: '',
      contrasenainput: '',
      perfilinput: null,
      isPwd: true,
      isPwd2: true,
      confirma: '',
      options: ['usuario', 'admin']

    }
  },
  created () {
    if (this.labelbtn === 'Editar') {
      this.InformacionUsuario()
    }
  },
  updated () {

  },
  mounted () {

  },
  methods: {
    InformacionUsuario () {
      this.nombreinput = this.Datausuario[0].nombre
      this.emailinput = this.Datausuario[0].usuario
      if (this.Datausuario[0].rol === 1) {
        this.perfilinput = 'usuario'
      } else {
        this.perfilinput = 'admin'
      }
    },
    QuitarValidacion () {
      this.$refs.correo.resetValidation()
    },
    GuardaEdita () {
      const vm = this
      if (this.labelbtn === 'guardar') {
        this.$axios.post('Usuarios', {
          nombre: this.nombreinput,
          usuario: this.emailinput,
          contraseña: this.contrasenainput,
          rol: this.perfilinput === 'usuario' ? 1 : this.perfilinput === 'admin' ? 2 : 0,
          estatus: 1
        }).then(res => {
          console.log(res.data)
          if (res.data === -1) {
            console.log(res.data)
          }
          vm.dataTable = res.data
          vm.$q.notify({
            type: 'positive',
            message: 'Usuario' + vm.nombre + 'registrado',
            timeout: 1600
          })
          this.$root.$emit('obtener')
          this.usuarioinput = ''
          this.confirma = ''
        })
      } else {
        if (this.labelbtn === 'Editar') {
          this.$axios.put('Usuarios', {
            nombre: this.nombreinput,
            usuario: this.emailinput,
            idUsuario: this.Datausuario[0].idUsuario,
            rol: this.perfilinput === 'usuario' ? 1 : this.perfilinput === 'admin' ? 2 : 0
          }).then(res => {
            if (res.status === 401) {
              this.$q.dialog({
                title: 'Eliminar',
                message: '¿Desea eliminar al usuario?',
                persistent: true
              }).onOk(() => {
                this.$router.push({ path: '/Listado' })
              })
            }
            vm.dataTable = res.data
            vm.$q.notify({
              type: 'positive',
              message: 'Usuario' + vm.nombre + 'registrado',
              timeout: 1600
            })
            this.$root.$emit('obtener')
            this.emailiinput = ''
            this.confirma = ''
          })
        }
      }
    }

  }
}
</script>
