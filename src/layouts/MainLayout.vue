<template>
  <q-layout view="lhh LpR lff" >
    <q-header  reveal elevated class="bg-blue-grey-1"  >
        <q-toolbar inset>
          <!-- Esto se muestra solo en movil -->
          <q-btn
          v-if="$q.screen.lt.sm"
          flat
          dense
          round
          color="dark"
          class="q-mr-xl"
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
          />
          <q-drawer
              v-model="leftDrawerOpen"
              :breakpoint="700"
              elevated content-class="bg-primary" :width="260"
            >
              <q-scroll-area class="fit q-pt-md">
                <div>
                    <q-item-section>
                      <q-expansion-item
                        icon="pin_drop"
                        label="Entregas"
                        class="text-h6 q-py-md"
                      >
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
                  @click="linkSubMenu = 'recepcion'"
                  :active="linkSubMenu === 'recepcion'"
                  exact-active-class="my-menu-link"
                  active-class="my-menu-link"
                  to="/Recepcion"
                >
                  <q-item-section avatar class="q-py-sm q-px-none">
                    <q-icon name="assignment" size="xs"/>
                  </q-item-section>
                  <q-item-section>Recepcion</q-item-section>
                </q-item>
              </q-list>
                      </q-expansion-item>
                    </q-item-section>
                </div>
                <div>
                    <q-item-section>
                      <q-expansion-item
                        icon="person"
                        label="Usuarios"
                        class="text-h6 q-py-md"
                      >
                      <div class="q-pt-xs">
                            <q-item dense @click="mobilActivo = 'Usuario'" v-ripple :active="mobilActivo === 'Usuario'" active-class="my-menu-link" clickable to="Camionetas">
                              <q-item-section>
                                <q-item-label class="text-h6 q-py-md q-gutter-xs"> <q-icon name="person" class="" /> <span>Usuario </span> </q-item-label>
                              </q-item-section>
                            </q-item>
                          </div>
                          <div class="q-pt-xs">
                            <q-item dense @click="mobilActivo = 'Camionetas'" v-ripple :active="mobilActivo === 'Camionetas'"  clickable  active-class="my-menu-link" to="Camionetas">
                              <q-item-section>
                                <q-item-label class="text-h6 q-py-md q-gutter-xs"> <q-icon name="local_shipping" class="" /> <span>Camionetas</span> </q-item-label>
                              </q-item-section>
                            </q-item>
                          </div>
                      </q-expansion-item>
                    </q-item-section>
                </div>

              </q-scroll-area>
          </q-drawer>

          <!-- <q-img
          class="q-mr-xl"
          src="~assets/img1.svg"
          style="width:90px;"

        /> -->
          <!-- Esto se muestra en escritorio -->

          <q-list dense bordered padding  class="q-py-none rounded-borders desktop-only row"   v-if="$q.screen.gt.sm">
            <q-item
              clickable
              v-ripple
              @click="linkActivo = 'home'"
              :active="linkActivo === 'home'"
              active-class="my-menu-link"
            >
              <q-item-section avatar class="q-py-xs q-px-none">
                <q-icon name="pin_drop" />
              </q-item-section>
              <q-item-section>Entregas</q-item-section>
            </q-item>

            <q-menu fit content-class="" >
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
              </q-list>
            </q-menu>

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
export default {
  name: 'MainLayout',
  components: {

  },
  data () {
    return {
      leftDrawerOpen: false,
      btnToggle: 'Home',
      linkActivo: 'home',
      linkSubMenu: '',
      mobilActivo: 'home'

    }
  },
  created () {
    this.$axios.defaults.headers.common.Token = this.$q.localStorage.getItem('Token')
  },
  methods: {
    Navegacion () {
      window.push = '' + this.btnToggle
    }
  }
}
</script>
<style scoped>
  .my-menu-link{
    background-color: #ffffff;
    color:#1976D2;
  }
</style>
