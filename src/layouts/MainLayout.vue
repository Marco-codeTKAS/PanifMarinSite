<template>
  <q-layout view="lhh LpR lff" >
    <q-header  reveal elevated class="bg-blue-grey-1"  >
        <q-toolbar inset>
          <!-- Esto se muestra solo en movil -->
          <MenuMobil></MenuMobil>
          <q-img
          class="q-mr-xl"
          src="~assets/img1.svg"
          style="width:90px;"

        />
          <!-- Esto se muestra en escritorio -->

          <q-list dense  padding class="q-py-none q-gutter-x-sm rounded-borders desktop-only row"   v-if="$q.screen.gt.sm">
            <q-item
              clickable
              v-ripple
              @click="linkActivo = 'home'"
              :active="linkActivo === 'home'"
              active-class="text-white bg-primary"
              class="text-dark"
              style="border: 1px rgb(109, 105, 105);"
              ref="itemEntregas"
            >
              <q-item-section avatar class="q-py-xs q-px-none">
                <q-icon name="pin_drop" />
              </q-item-section>
              <q-item-section>Entregas</q-item-section>
            </q-item>

            <q-menu fit :target="$refs.itemEntregas" content-class="" >
              <q-list dense bordered padding style="min-width:140px;" class="q-pa-none rounded-borders">
                <q-item
                  clickable
                  v-ripple
                  @click="linkSubMenu = 'Repartidores'"
                  :active="linkSubMenu === 'Repartidores'"
                  exact-active-class="my-menu-link"
                  active-class="my-menu-link"
                  to="/Repartidores"
                >
                  <q-item-section avatar class="q-py-sm q-px-none">
                    <q-icon name="local_shipping" size="xs" />
                  </q-item-section>
                  <q-item-section>Repartidores</q-item-section>
                </q-item>

                <q-item
                  clickable
                  v-ripple
                  @click="linkSubMenu = 'camionetas'"
                  :active="linkSubMenu === 'camionetas'"
                  exact-active-class="my-menu-link"
                  active-class="my-menu-link"
                  to="/Camionetas"
                >
                  <q-item-section avatar class="q-py-sm q-px-none">
                    <q-icon name="local_shipping" size="xs" />
                  </q-item-section>
                  <q-item-section>Camionetas</q-item-section>
                </q-item>

                <q-item
                  clickable
                  v-ripple
                  @click="linkSubMenu = 'rutas'"
                  :active="linkSubMenu === 'rutas'"
                  exact-active-class="my-menu-link"
                  active-class="my-menu-link"
                  to="/Rutas"
                >
                  <q-item-section avatar class="q-py-sm q-px-none">
                    <q-icon name="map" size="xs"/>
                  </q-item-section>
                  <q-item-section>Rutas</q-item-section>
                </q-item>
                <q-item
                  clickable
                  v-ripple
                  @click="linkSubMenu = 'rutas'"
                  :active="linkSubMenu === 'rutas'"
                  exact-active-class="my-menu-link"
                  active-class=""
                  to="/Recepcion"
                >
                  <q-item-section avatar class="q-py-sm q-px-none">
                    <q-icon name="assignment" size="xs"/>
                  </q-item-section>
                  <q-item-section>Recepcion</q-item-section>
                </q-item>
              </q-list>
            </q-menu>

            <q-item
              clickable
              v-ripple
              @click="linkActivo = 'usuarios'"
              :active="linkActivo === 'usuarios'"
              active-class="text-white bg-primary"
              class="text-dark "
            >
              <q-item-section avatar class="q-py-xs q-px-none">
                <q-icon name="pin_drop" />
              </q-item-section>
              <q-item-section>Usuario</q-item-section>
            </q-item>

             <q-item
              clickable
              v-ripple
              @click="linkActivo = 'pan'"
              :active="linkActivo === 'pan'"
              active-class="text-white bg-primary"
              class="text-dark "
            >
              <q-item-section avatar class="q-py-xs q-px-none">
                <q-icon name="pin_drop" />
              </q-item-section>
              <q-item-section>Pan</q-item-section>
            </q-item>
          </q-list>

           <q-toolbar-title></q-toolbar-title>
             <q-btn flat dense no-wrap stretch to="/" label="Cerrar Sesion" color="secondary" text-color="dark" size="md" title="Inicia Sesion"/>
             <!-- <q-btn flat round dense icon="logout" color="dark" @click="CerrarSesion" title="cerrar Sesion"/> -->
        </q-toolbar>

    </q-header>

    <q-page-container>

      <router-view />

    </q-page-container>
  </q-layout>
</template>

<script>
import MenuMobil from '../components/MenuMobil.vue'
export default {
  name: 'MainLayout',
  components: {
    MenuMobil
  },
  data () {
    return {

      btnToggle: 'Home',
      linkActivo: 'home',
      linkSubMenu: '',
      mobilActivo: 'home'

    }
  },
  created () {
    this.$axios.defaults.headers.common.Token = this.$q.localStorage.getItem('Token')

    const tokeninicio = this.$q.localStorage.getItem('Token')

    if (tokeninicio && tokeninicio !== '') {
      this.$axios.defaults.headers.common.Token = tokeninicio

      if (window.location.href === 'http://localhost:8080/') {
        window.location.href = '/Listado'
      }
      this.MostrarToken()
      this.tiempo = setInterval(() => {
        this.MostrarToken()
      }, 180000)
    } else {
      alert('Cerrando')
      // window.location.href = '/Login'
      // clearInterval(this.tiempo)
      // this.tiempo = false
    }
  },
  methods: {
    MostrarToken () {
      const vm = this
      this.$axios.get('https://localhost:44334/api/Usuarios/ConsultaToken').then(res => {
        if (res.data.idacceso > 0) {
          vm.$store.commit('user/updateLogueado', res.data)
        } else {
          vm.$store.commit('user/updateLogueado', null)
          // window.location.href = '/Login'
        }
      }).catch(e => {
        // window.location.href = '/Login'
        console.log('mensaje de error' + e.response.message)
        if (e.message === 'Network Error') {
          console.log('No hay wifi')
        }
      })
    },
    Navegacion () {
      window.push = '' + this.btnToggle
    }
  }
}
</script>
<style scoped>
  .my-menu-link{
    background-color: #1976D2;
    color:white;
    border: 1px solid rgb(109, 105, 105);

  }
</style>
