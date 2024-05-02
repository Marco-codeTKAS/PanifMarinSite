<template>
  <q-layout view="lhh LpR lff">
    <q-header reveal elevated class="bg-blue-grey-1">
      <q-toolbar inset>
        <!-- Esto se muestra solo en movil -->
        <MenuMobil></MenuMobil>
        <q-img class="q-mr-xl" src="~assets/img1.svg" style="width: 90px" />
        <!-- Esto se muestra en escritorio -->

        <q-list dense padding class="q-py-md q-gutter-x-sm rounded-borders desktop-only row" v-if="$q.screen.gt.sm">
          <q-item v-for="(item,index) in listFormularios" :key="index" clickable v-ripple @click="linkActivo = item.linkActivo" :active="linkActivo === item.linkActivo"
            active-class="text-white bg-primary" class="text-dark" style="border: 1px rgb(109, 105, 105)"
            :ref="item.ref">
            <q-item-section avatar class="q-py-xs q-px-none">
              <q-icon :name="item.icon" />
            </q-item-section>
            <q-item-section>{{item.name}}</q-item-section>

            <q-menu fit content-class="" v-if="item.children.length > 0">
              <q-list dense bordered padding style="min-width: 140px" class="q-pa-none rounded-borders" v-for="(children,index2) in item.children" :key="index2">
                <q-item clickable v-ripple @click="linkSubMenu = children.linkSubMenu"
                  :active="linkSubMenu === children.linkSubMenu" exact-active-class="my-menu-link" active-class="my-menu-link"
                  :to="children.to">
                  <q-item-section avatar class="q-py-sm q-px-none">
                    <q-icon :name="children.icon" size="xs" />
                  </q-item-section>
                  <q-item-section>{{children.name}}</q-item-section>
                </q-item>

              </q-list>
            </q-menu>
          </q-item>

          <!-- <q-item clickable v-ripple @click="linkActivo = 'pan'" :active="linkActivo === 'pan'"
            active-class="text-white bg-primary" class="text-dark">
            <q-item-section avatar class="q-py-xs q-px-none">
              <q-icon name="pin_drop" />
            </q-item-section>
            <q-item-section>Pan</q-item-section>
          </q-item> -->
        </q-list>

        <q-toolbar-title></q-toolbar-title>
        <q-btn flat dense no-wrap stretch to="/" label="Cerrar Sesion" color="secondary" text-color="dark" size="md"
          title="Inicia Sesion" />
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
import { paths } from '../Utils/Paths'
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
      usuario: {},
      mobilActivo: 'home',
      listFormularios: []
    }
  },
  created () {
    this.$axios.defaults.headers.common.Token =
      this.$q.localStorage.getItem('Token')

    const tokeninicio = this.$q.localStorage.getItem('Token')

    if (tokeninicio && tokeninicio !== '') {
      this.$axios.defaults.headers.common.Token = tokeninicio

      this.SelectRouteFromUrl()
      this.MostrarToken()
      this.tiempo = setInterval(() => {
        this.MostrarToken()
      }, 180000)
    } else {
      // window.location.href = '/Login'
      // clearInterval(this.tiempo)
      // this.tiempo = false
    }
  },
  methods: {
    MostrarToken () {
      const vm = this
      this.$axios
        .get('Usuarios/ConsultaToken')
        .then((res) => {
          console.log(res)
          if (res.data.idacceso > 0) {
            vm.$store.commit('user/updateLogueado', res.data)
            vm.usuario = res.data
            this.listFormularios = paths// .filter(el => el.rolsWithPermision.includes(this.usuario.usuario.rol))

            this.RedirectFromUserPermision()
          } else {
            vm.$store.commit('user/updateLogueado', null)
            // window.location.href = '/Login'
          }
        })
        .catch((e) => {
          // window.location.href = '/Login'
          console.log('mensaje de error' + e.response.message)
          if (e.message === 'Network Error') {
            console.log('No hay wifi')
          }
        })
    },
    SelectRouteFromUrl () {
      const path = this.$route.fullPath.toLowerCase()
      let hijo = ''
      const parent = paths.find(objeto => {
        // Buscamos el valor dentro del arreglo hijo de cada objeto
        hijo = objeto.children.find(item => item.to.toLowerCase() === path)
        return objeto.children.some(item => item.to.toLowerCase() === path)
      })
      this.linkActivo = parent.linkActivo
      this.linkSubMenu = hijo.linkSubMenu
    },
    RedirectFromUserPermision () {
      const ruta = this.$route.fullPath
      const ExisteRuta = this.listFormularios.find(el => el.children.some(rt => rt.to.toLowerCase() === ruta.toLowerCase()))
      console.log(this.listFormularios)
      if (ExisteRuta === undefined && this.listFormularios.length > 0) {
        this.$router.push({ path: this.listFormularios[0].children[0].to })
      }
    },
    Navegacion () {
      window.push = '' + this.btnToggle
    }
  }
}
</script>
<style scoped>
.my-menu-link {
  background-color: #1976d2;
  color: white;
  border: 1px solid rgb(109, 105, 105);
}
</style>
