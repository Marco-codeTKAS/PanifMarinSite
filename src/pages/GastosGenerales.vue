<template>
  <q-page class="row justify-center q-pa-md">
    <q-card class="row col-12 col-md-10 col-lg-8 q-pa-md " style="height: fit-content;">
      <header>
        <h6 class="text-primary q-my-sm"> Gastos Generales </h6>
        <p class="q-mt-none">En esta pantalla puedes agregar gastos generales que son independientes de los gastos de
          las rutas</p>
      </header>
      <q-form @submit="HandleSendFormulario" class="row row-gap col-12 column-gap items-center">
        <q-input label="Concepto"  v-model="Gasto.concepto" class="col-12 col-md-2 " filled></q-input>
        <q-input label="Monto" class="col-12 col-md-2" v-model="Gasto.monto" filled></q-input>
        <q-input label="Descripción" class="col-12 col-md" autogrow v-model="Gasto.descripcion" filled></q-input>
        <q-btn class="col-12 col-md-1" color="primary" type="submit" label="Guardar"></q-btn>
      </q-form>
      <div class="row col-12 q-mt-lg">
        <q-table grid :title="`GASTOS EN LA SEMANA ${currency(totalGastado)}`" title-class="text-subtitle1 text-secondary" hide-bottom class="col-12"
          :rows="listaGastos" :columns="columns">
          <!-- <template v-slot:body-cell-monto="props">
            <q-td :props="props">
              {{ currency(props.row.monto) }}
              tessdasd
            </q-td>
          </template> -->
          <template v-slot:item="props">
            <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4">
              <q-card flat bordered>
                <q-card-section class="text-center">
                  <span class="absolute-top-right text-caption text-grey-8" style="top: 8px; right: 16px;">{{
                   new Date(props.row.fechaRegistro).toLocaleDateString()  }}</span>
                  <strong class="full-width">{{ props.row.concepto }}</strong>
                  <p class="q-mb-sm text-caption text-grey-7 "> {{ props.row.usuario.nombre }}</p>
                  <p class="q-ma-none text-caption text-justify"> {{ props.row.descripcion }}</p>
                </q-card-section>
                <q-separator />
                <q-card-section class="flex flex-center text-secondary text-bold" style="font-size: 1.5em;">
                  <div>{{ currency(props.row.monto) }} </div>
                </q-card-section>
              </q-card>
            </div>
          </template>
        </q-table>
      </div>

    </q-card>
  </q-page>
</template>
<script>
import { date } from 'quasar';
import { formatCurrency } from 'src/Utils/commons';
import { useService } from 'src/Utils/Servicio';
const GASTO_SERVICE = useService('Gasto')
export default {
  data() {
    return {
      listaGastos: [
        {
          idGasto: 0,
          concepto: 'Prestamo adrian',
          monto: 150,
          descripcion: 'Prestamo para adrian por peticion y aprobado por mi tia',
          fechaRegistro: '2024/30/11',
          usuario: {
            idUsuario: 1,
            nombre: "Marco Antonio Renteria",
            usuario: "marcoantonioconalep@gmail.com",
            contraseña:
              "4e0f4122e443c63170161e9af34e88536c0605c63168b5b08ae4f2a399a10cf6",
            rol: 1,
            estatus: 1,
          },
        },
        {
          idGasto: 0,
          concepto: 'Prestamo adrian',
          monto: 150,
          descripcion: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Possimus cumque repudiandae necessitatibus doloribus odit qui facilis, earum placeat veritatis laudantium facere, quo ipsam? Quisquam exercitationem suscipit debitis et quis? Rem?',
          fechaRegistro: '2024/30/11',
          usuario: {
            idUsuario: 1,
            nombre: "Marco Antonio Renteria",
            usuario: "marcoantonioconalep@gmail.com",
            contraseña:
              "4e0f4122e443c63170161e9af34e88536c0605c63168b5b08ae4f2a399a10cf6",
            rol: 1,
            estatus: 1,
          },
        },
        {
          idGasto: 0,
          concepto: 'Prestamo adrian',
          monto: 150,
          descripcion: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Possimus cumque repudiandae necessitatibus doloribus odit qui facilis, earum placea?',
          fechaRegistro: '2024/30/11',
          usuario: {
            idUsuario: 1,
            nombre: "Marco Antonio Renteria",
            usuario: "marcoantonioconalep@gmail.com",
            contraseña:
              "4e0f4122e443c63170161e9af34e88536c0605c63168b5b08ae4f2a399a10cf6",
            rol: 1,
            estatus: 1,
          },
        },
        {
          idGasto: 0,
          concepto: 'Prestamo adrian',
          monto: 150,
          descripcion: 'Prestamo para adrian por peticion y aprobado por mi tia',
          fechaRegistro: '2024/30/11',
          usuario: {
            idUsuario: 1,
            nombre: "Marco Antonio Renteria",
            usuario: "marcoantonioconalep@gmail.com",
            contraseña:
              "4e0f4122e443c63170161e9af34e88536c0605c63168b5b08ae4f2a399a10cf6",
            rol: 1,
            estatus: 1,
          },
        },
        {
          idGasto: 0,
          concepto: 'Prestamo adrian',
          monto: 150,
          descripcion: 'Prestamo para adrian por peticion y aprobado por mi tia',
          fechaRegistro: '2024/30/11',
          usuario: {
            idUsuario: 1,
            nombre: "Marco Antonio Renteria",
            usuario: "marcoantonioconalep@gmail.com",
            contraseña:
              "4e0f4122e443c63170161e9af34e88536c0605c63168b5b08ae4f2a399a10cf6",
            rol: 1,
            estatus: 1,
          },
        }
      ],
      Gasto: {
        idGasto: 0,
        concepto: '',
        monto: 0,
        descripcion: '',
        fechaRegistro: new Date(),
      },
      columns: [
        { name: 'concepto', align: 'center', label: 'CONCEPTO', field: 'concepto', sortable: true },
        { name: 'fechaRegistro', align: 'FECHA', label: 'fechaRegistro', field: 'fechaRegistro', sortable: true },
        { name: 'monto', align: 'center', label: 'MONTO', field: 'monto', sortable: true },
        { name: 'usuario', align: 'center', label: 'USUARIO', field: row => row.usuario.nombre, sortable: true },
        { name: 'descripcion', align: 'justify', label: 'DESC', field: 'descripcion', sortable: true }
      ],
      currency: formatCurrency,
      filtro: { from: '' },
    }
  },
  computed:{  
    totalGastado(){
     return  this.listaGastos.map(el =>el.monto).reduce((acum,act) => acum+act,0)
    }
  },
  created() {
    const hoy = Date.now
    this.filtro.from = hoy
    this.GetGastoSemanal()
  },
  methods: {
    GetGastoSemanal() {
      GASTO_SERVICE.Post({
        obj: this.filtro,
        Resolve: res => {
          this.listaGastos = res.data
        },
        hideMessage: true,
      })
    },
    HandleSendFormulario(){
      GASTO_SERVICE.Post({
        action:'/GuardaGasto',
        obj:this.Gasto,
        Resolve: res => {
          this.GetGastoSemanal()
        }
      })
    }

  }
}
</script>