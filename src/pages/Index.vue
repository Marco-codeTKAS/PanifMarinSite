<template>
  <div class="row" >
      <q-dialog square  content-style="background:linear-gradient(90deg, rgba(46,40,173,1) 0%, rgba(13,85,147,1) 46%, rgba(124,204,210,1) 100%);" full-screen position="right" persistent rounded v-model="Login" >
          <div v-if="$q.screen.gt.sm" class="q-mr-xl q-py-sm q-px-lg no-shadow"  style="margin-right:200px;"><q-img src="~assets/LogoFull.png" alt="" style="width:400px;  "/></div>
          <q-card class="column justify-around fit q-mx-md">
              <q-card-section class="row q-mx-md self-start">
                    <q-img src="~/assets/Logo.png" style="max-width:36px; max-height:36px;"></q-img>
                    <p class="text-h4 q-ma-none" >Inicio de Sesion </p>
                    <p class="text-h6 q-ma-none">Bienvenido al Sistema de Panificadora Marin</p>
                    <p class="text-subtitle">¿No estas registrado?
                      <q-btn  class="q-pa-none self-baseline" flat label="Registrate" size="md" dense color="primary"/>
                    </p>
              </q-card-section>
              <q-card-section class="column q-gutter-y-xs q-mx-md" style="top:-40px;">
                  <q-input v-model="Usuario" autofocus outlined dense label="Email" hint="Ingresa tu correo" >
                      <template v-slot:prepend>
                          <q-icon name="person"/>
                      </template>
                  </q-input>
                  <q-input v-model="password" autofocus outlined dense label="Contraseña" hint="Ingresa tu contraseña">
                      <template v-slot:prepend>
                          <q-icon name="key"/>
                      </template>
                  </q-input>
              </q-card-section>
              <q-card-section class="row justify-end q-mx-md">
                  <div class="row">
                      <q-btn to="/Recepcion" flat label="Continuar"  size="md" color="primary"/>
                      <q-btn @click="LoginVerify" label="Continuar"  size="md" color="primary"/>
                  </div>
              </q-card-section>
          </q-card>
      </q-dialog>
      <q-dialog v-model="modalexceso" persistent>
      <q-card class="my-card">
        <q-card-section >
          <span class="text-h6">Demasiadas sesiones </span>
          <p>Para poder acceder debe cerrar las sesiones que esten abiertas</p>
        </q-card-section>
        <q-card-section class="row q-gutter-x-md justify-end">
          <q-btn label="Cerrar" color="primary" flat v-close-popup></q-btn>
          <q-btn label="Cerrar Sesiones" color="secondary" @click="CerrarSesionesActivas()" v-close-popup></q-btn>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      Login: true,
      Usuario: '',
      password: '',
      modalexceso: false
    }
  },
  methods: {
    LoginVerify () {
      const vm = this
      console.log('validando')
      this.$axios.post('Usuarios/Login', {
        email: this.Usuario,
        password: this.password
      }).then(res => {
        console.log(res.data)
        if (res.data) {
          vm.$q.localStorage.set('Token', res.data.token)
          vm.$q.localStorage.set('Rol', res.data.rol)
          vm.$axios.defaults.headers.common.token = res.data.token
          if (res.data.total > 0) {
            this.modalexceso = true
          } else {
            if (vm.recordar === 1) {
              vm.$q.localStorage.set('email', vm.mail)
              vm.$q.localStorage.set('password', vm.contrasena)
            } else {
              vm.$q.localStorage.remove('email')
              vm.$q.localStorage.remove('password')
            }
            this.$router.push('/Repartidores')
          }
        }
      }).catch(e => {
        console.log(e.message)
      })
    },
    CerrarSesionesActivas (token) {
      this.$axios.get('Usuarios/CerrarSesionesActivas').then(res => {
        if (res.data) {
          console.log(res.data)
          this.$router.push({ path: '/Repartidores' })
        } else {
          this.$q.notify({
            type: 'negative',
            message: 'Ocurrio un error',
            timeout: 1800
          })
        }
      })
    }
  }
}
</script>
<style scoped>
    #background{
        background-image:linear-gradient(fff, 0000);
    }
</style>
