<template>
  <q-layout view="lHh Lpr lFf " >
    <q-header  reveal elevated class="bg-blue-grey-1"  >             
        <q-toolbar inset>
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
              elevated content-class="bg-primary" :width="200"
            >
              <q-scroll-area class="fit q-pt-md">
                
                <div >
                  <q-item dense clickable to="Listado">
                    <q-item-section>
                      <q-item-label class="text-h6 q-py-md"> <q-icon name="format_list_bulleted"/> Listado de SIM</q-item-label>
                    </q-item-section>
                  </q-item>
                </div>
                <div >
                  <q-item dense clickable to="Perfil">
                    <q-item-section>
                      <q-item-label class="text-h6 q-py-md q-gutter-xs"> <q-icon name="assignment_ind " class="" /> <span>Perfil</span> </q-item-label>
                    </q-item-section>
                  </q-item>
                </div>
              </q-scroll-area>
            </q-drawer>

          <q-img
          class="q-mr-xl"
          src="~assets/img1.svg"
          style="width:90px;"
          
        />
        
          <q-btn-toggle
              v-model="btnToggle"
              flat    
              stretch                        
              class="text-dark q-mx-sm"
              toggle-color="primary"
              v-if="$q.screen.gt.xs"
              :options="[
                {label: 'Home', value: 'Home', icon:'home', to:'/'},
                {label: 'Two', value: 'dos'},
                {label: 'Three', value: 'three'}
              ]"
            />
           <q-toolbar-title></q-toolbar-title>
             <q-btn flat dense no-wrap stretch to="/Login" label="Iniciar Sesion" color="dark" size="sm" title="Inicia Sesion"/> 
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
      btnToggle:'Home'
      
    }
  },
  methods: {
    Navegacion(){
      window.push=''+this.btnToggle
      this.btnToggle
    }
  },
}
</script>
<style >
  
</style>