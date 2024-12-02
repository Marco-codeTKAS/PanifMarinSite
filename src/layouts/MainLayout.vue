<template>
  <q-layout view="lhh LpR lff">
    <q-header reveal elevated class="bg-blue-grey-1">
      <q-toolbar inset>
        <!-- Esto se muestra solo en movil -->
        <div class="row col justify-around">
          <q-img
            class="q-px-sm"
            src="~assets/LogoColima.png"
            fit="contain"
            style="width: 130px"
          />
          <div class="row" v-show="$q.screen.lt.md">
            <q-btn
              v-if="$q.screen.lt.sm"
              flat
              dense
              round
              color="dark"
              icon="menu"
              aria-label="Menu"
              @click="leftDrawerOpen = !leftDrawerOpen"
            />
          </div>
          <!-- Esto se muestra en escritorio -->
          <q-list
            dense
            padding
            class="q-py-md q-gutter-x-sm rounded-borders row"
            v-show="$q.screen.gt.sm"
          >
            <q-item
              v-for="(item, index) in listFormularios"
              :key="index"
              clickable
              v-ripple
              @click="linkActivo = item.linkActivo"
              :active="linkActivo === item.linkActivo"
              active-class="text-white bg-primary"
              class="text-dark"
              style="border: 1px rgb(109, 105, 105)"
              :ref="item.ref"
            >
              <q-item-section avatar class="q-py-xs q-px-none">
                <q-icon :name="item.icon" />
              </q-item-section>
              <q-item-section>{{ item.name }}</q-item-section>

              <q-menu fit content-class="" v-if="item.children.length > 0">
                <q-list
                  dense
                  bordered
                  padding
                  style="min-width: 140px"
                  class="q-pa-none rounded-borders"
                  v-for="(children, index2) in item.children"
                  :key="index2"
                >
                  <q-item
                    clickable
                    v-ripple
                    @click="linkSubMenu = children.linkSubMenu"
                    :active="linkSubMenu === children.linkSubMenu"
                    exact-active-class="my-menu-link"
                    active-class="my-menu-link"
                    :to="children.to"
                  >
                    <q-item-section avatar class="q-py-sm q-px-none">
                      <q-icon :name="children.icon" size="xs" />
                    </q-item-section>
                    <q-item-section>{{ children.name }}</q-item-section>
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
        </div>

        <q-toolbar-title></q-toolbar-title>
        <q-btn
          flat
          dense
          no-wrap
          stretch
          @click="CerrarSesion"
          label="Cerrar Sesion"
          color="secondary"
          text-color="dark"
          size="md"
          title="Inicia Sesion"
        />
        <!-- <q-btn flat round dense icon="logout" color="dark" @click="CerrarSesion" title="cerrar Sesion"/> -->
      </q-toolbar>
      <q-drawer v-model="leftDrawerOpen" bordered content-class="bg-grey-1">
        <q-list>
          <q-item-label header class="text-grey-8">
            <q-item
              v-for="(item, index) in listFormularios"
              :key="index"
              clickable
              v-ripple
              @click="linkActivo = item.linkActivo"
              :active="linkActivo === item.linkActivo"
              active-class="text-white bg-primary"
              class="text-dark"
              style="border: 1px rgb(109, 105, 105)"
              :ref="item.ref"
            >
              <q-item-section avatar class="q-py-xs q-px-none">
                <q-icon :name="item.icon" />
              </q-item-section>
              <q-item-section>{{ item.name }}</q-item-section>

              <q-menu fit content-class="" v-if="item.children.length > 0">
                <q-list
                  dense
                  bordered
                  padding
                  style="min-width: 140px"
                  class="q-pa-none rounded-borders"
                  v-for="(children, index2) in item.children"
                  :key="index2"
                >
                  <q-item
                    clickable
                    v-ripple
                    @click="linkSubMenu = children.linkSubMenu"
                    :active="linkSubMenu === children.linkSubMenu"
                    exact-active-class="my-menu-link"
                    active-class="my-menu-link"
                    :to="children.to"
                  >
                    <q-item-section avatar class="q-py-sm q-px-none">
                      <q-icon :name="children.icon" size="xs" />
                    </q-item-section>
                    <q-item-section>{{ children.name }}</q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </q-item>
          </q-item-label>
        </q-list>
      </q-drawer>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-dialog v-model="showModalCambioPass">
      <q-card style="max-width: 80vw; width: 600px">
        <q-card-section>
          <h6 class="q-ma-none text primary">
            Cambio de contraseña
          </h6>
          <p>por seguridad debes agregar una nueva contraseña a tu usuario por favor ingresa y confirma tu nueva contraseña</p>
          <q-separator/>
          <div class="row col-12 items-center q-pt-sm column-gap">
            <q-input filled label="Contraseña Nueva" v-model="cambioPass.newPass" dense stack-label ></q-input>
            <q-input filled label="Confirma tu Contraseña" v-model="cambioPass.confirmaPass" dense stack-label ></q-input>
            <q-btn label="Guardar" color="primary" @click="ChangePass" size=""></q-btn>
          </div>
        </q-card-section>

      </q-card>
    </q-dialog>
  </q-layout>
</template>

<script>
import { useService } from "src/Utils/Servicio";
import { paths } from "../Utils/Paths";
import { useRutasStore } from "src/stores/example-store";
import { date } from "quasar";
export default {
  name: "MainLayout",

  data() {
    return {
      btnToggle: "Home",
      linkActivo: "home",
      linkSubMenu: "",
      cambioPass:{
        newPass:'',
        confirmaPass:''
      },
      showModalCambioPass:false,
      leftDrawerOpen: false,
      usuario: {},
      mobilActivo: "home",
      listFormularios: [],
    };
  },
  created() {
    this.$axios.defaults.headers.common.Token =
      this.$q.localStorage.getItem("Token");

    const tokeninicio = this.$q.localStorage.getItem("Token");

    if (tokeninicio && tokeninicio !== "") {
      this.$axios.defaults.headers.common.Token = tokeninicio;

      //this.SelectRouteFromUrl()
      this.MostrarToken();
      this.tiempo = setInterval(() => {
        this.MostrarToken();
      }, 180000);
    } else {
      this.$router.push({ path: "/Login" });
      clearInterval(this.tiempo);
      this.tiempo = false;
    }

    this.obtenerDataBase();
  },
  methods: {
    CerrarSesion() {
      const serv = useService("Usuarios");
      serv.Get({
        action: "/CerrarSesion",
        Resolve: (res) => {
          this.MostrarToken();
        },
      });
    },
    MostrarToken() {
      const vm = this;
      this.$axios
        .get("Usuarios/ConsultaToken")
        .then((res) => {
          if (res.data.idacceso > 0) {
            //vm.$store.commit('user/updateLogueado', res.data)

            this.showModalCambioPass = res.data.usuario.opcionCambioPass === 1
          
            vm.usuario = res.data;
            const padresFiltrados = paths
              .filter((el) =>
                el.rolsWithPermision.includes(vm.usuario.usuario.rol)
              )
              .map((item) => {
                // Filtrar hijos por el rol permitido
                let childrenFiltrados = item.children.filter((child) =>
                  child.rolsWithPermision.includes(vm.usuario.usuario.rol)
                );

                // Devolver solo los que tienen hijos permitidos
                return {
                  ...item, // Copiar propiedades del padre
                  children: childrenFiltrados, // Asignar hijos filtrados
                };
              })
              .filter((item) => item.children.length > 0);
            
            this.listFormularios = padresFiltrados; // .filter(el => el.rolsWithPermision.includes(this.usuario.usuario.rol))
            //this.RedirectFromUserPermision()
            const hijos = this.listFormularios.map((el) => el.children).flat();
            
            if (!hijos.map(el => el.to).includes(this.$route.fullPath)) {
              this.$router.push({ path: "/" });
            }
          } else {
            //vm.$store.commit('user/updateLogueado', null)
            this.$router.push({ path: "/Login" });
          }
        })
        .catch((e) => {
          this.$router.push({ path: "/Login" });
          console.log("mensaje de error" + e);
          if (e.message === "Network Error") {
            console.log("No hay wifi");
          }
        });
    },
    ChangePass(){
      if (this.cambioPass.newPass === this.cambioPass.confirmaPass) {
        this.$axios.post('Usuarios/CambiarPassword',this.cambioPass).then(res => {
          this.showModalCambioPass = false
          this.cambioPass.confirmaPass =''
          this.cambioPass.newPass = ''
        })
      }else{
        this.$q.notify({message:'Las contraseñas no coinciden',type:'warning'})
      }
    },
    SelectRouteFromUrl() {
      const path = this.$route.fullPath.toLowerCase();
      let hijo = "";
      const parent = paths.find((objeto) => {
        // Buscamos el valor dentro del arreglo hijo de cada objeto
        hijo = objeto.children.find((item) => item.to.toLowerCase() === path);
        return objeto.children.some((item) => item.to.toLowerCase() === path);
      });

      this.linkActivo = parent.linkActivo;
      this.linkSubMenu = hijo.linkSubMenu;
    },
    RedirectFromUserPermision() {
      const ruta = this.$route.fullPath;
      const ExisteRuta = this.listFormularios.find((el) =>
        el.children.some((rt) => rt.to.toLowerCase() === ruta.toLowerCase())
      );
      if (ExisteRuta === undefined && this.listFormularios.length > 0) {
        this.$router.push({ path: this.listFormularios[0].children[0].to });
      }
    },
    obtenerDataBase() {
      this.$q.loading.show();
      this.$axios
        .get("Rutas")
        .then((res) => {
          this.$q.loading.hide();
          var rutaStore = useRutasStore();
          rutaStore.listaRutas = res.data;
          const hoy = new Date();
          rutaStore.diaSemana = date.getDayOfWeek(hoy);
        })
        .catch((error) => {
          console.log(error);
          this.$q.loading.hide();
        });
    },
  },
};
</script>
<style scoped>
.my-menu-link {
  background-color: #1976d2;
  color: white;
  border: 1px solid rgb(109, 105, 105);
}
</style>
