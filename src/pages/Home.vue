<template>
  <div class="row">
    <q-dialog square backdrop-filter="blur(8px) saturate(200%)"
      content-style="background:linear-gradient(90deg, rgba(46,40,173,1) 0%, rgba(13,85,147,1) 46%, rgba(124,204,210,1) 100%);"
      full-screen position="right" persistent rounded v-model="Login">
      <div v-show="$q.screen.gt.sm" class="q-mr-xl q-py-sm q-px-lg no-shadow" style="margin-right:200px;"><q-img
          src="~assets/LogoColima.png" alt="" style="width:400px;  " /></div>
      <q-card class="column justify-around fit q-mx-md">
        <q-card-section class="row q-mx-md self-start">
          <q-img contain src="~/assets/ICONOColima.png" style="max-width:40px; max-height:40px;"></q-img>
          <p class="text-h4 q-ma-none">Inicio de Sesion </p>
          <p class="text-h6 q-ma-none">Bienvenido al Sistema de Panificadora Marin</p>
          <!-- <p class="text-subtitle">¿No estas registrado?
            <q-btn class="q-pa-none self-baseline" flat label="Registrate" size="md" dense color="primary" />
          </p> -->
        </q-card-section>
        <q-card-section class="column q-gutter-y-xs q-mx-md" style="top:-40px;">
          <q-form @submit.prevent="LoginVerify">
            <q-input v-model="Usuario" autofocus outlined dense label="Email" hint="Ingresa tu correo">
              <template v-slot:prepend>
                <q-icon name="person" />
              </template>
            </q-input>
            <q-input v-model="password" type="password" autofocus outlined dense label="Contraseña"
              hint="Ingresa tu contraseña">
              <template v-slot:prepend>
                <q-icon name="key" />
              </template>
            </q-input>
            <div class="row justify-end">
              <q-btn type="submit" label="Entrar" size="md" color="primary" />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
    <q-dialog v-model="modalexceso" persistent>
      <q-card class="my-card">
        <q-card-section>
          <q-img contain src="~/assets/Logo.png" style="max-width:40px; max-height:40px;"></q-img>
          <span class="text-h6 ">Demasiadas sesiones </span>
          <p class="q-mt-md">Para poder acceder debe cerrar las sesiones que esten abiertas</p>
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
import { useService } from 'src/Utils/Servicio';
const Usuarios_SERVICE = useService('Usuarios')

export default {
  name: 'LoginPage',
  data() {
    return {
      Login: true,
      Usuario: '',
      password: '',
      modalexceso: false
    }
  },
  methods: {
    LoginVerify() {
      const vm = this
      this.$q.loading.show({
        html: true,
        message: 'Iniciando sesión <span class="text-orange text-weight-bold">Espera...</span>',

      })
      Usuarios_SERVICE.Post({
        action: '/Login',
        obj: {
          email: this.Usuario,
          password: this.password
        },
        Resolve: res => {
          if (res.data) {
            vm.$q.localStorage.set('Token', res.data.token)
            vm.$q.localStorage.set('Rol', res.data.rol)
            //vm.$store.commit('user/updateLogueado', res.data)
            if (res.data.token !== null) {
              vm.$axios.defaults.headers.common.token = res.data.token
            }
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
              if (res.data.rol === 3) {
                this.$router.push('/Home')
              }
              this.$router.push('/Home')
            }
          }
        }
      })
    },
    CerrarSesionesActivas(token) {
      this.$axios.get('Usuarios/CerrarSesionesActivas').then(res => {
        if (res.data) {
          console.log(res.data)
          this.$router.push({ path: '/Home' })
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
#background {
  background-image: linear-gradient(fff, 0000);
}
</style>
