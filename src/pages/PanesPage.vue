<template>
  <q-page class="row items-start justify-center">
    <div class="col-12 row-gap col-md-10 col-lg-8">
      <div class="row q-py-sm col-12 justify-end">
        <!-- <q-btn
          dense
          icon="add"
          color="primary"
          align="right"
          class="q-my-sm q-mx-lg q-px-sm"
        >
        </q-btn> -->
      </div>
      <div class="row row-gap col-12 justify-end">
        <q-table
          title="Panes"
          table-header-class="bg-secondary  text-white "
          hide-bottom
          title-class="text-h6"
          :pagination="{ rowsPerPage: 0 }"
          class="q-pb-md my-sticky-header-table col-12"
          square
          :rows="listaPanes"
          :columns="columns"
        >
          <!-- <template v-slot:body-cell-actions="props">
            <td :props="props">
              <q-btn flat dense color="negative" icon="close" size="sm" />
            </td>
          </template> -->
          <template v-slot:body-cell-precio="props">
            <q-td :props="props">
                <q-input
                  v-model.number="props.row.precio"
                  input-class="text-right"
                  type="number"
                  class="q-py-none"
                  :label="props.col.label"
                  filled
                  dense
                />
              </q-td>

          </template>
          <template v-slot:body-cell-cantEmpaque="props">
            <q-td :props="props">
                <q-input
                  v-model.number="props.row.cantEmpaque"
                  input-class="text-right"
                  type="number"
                  class="q-py-none"
                  :label="props.col.label"
                  filled
                  dense
                />
              </q-td>

          </template>

        </q-table>
        <q-btn label="Actualiza precios" @click="() => {
          dialogconfirmar = !dialogconfirmar
          methodToContinue = ActualizaPrecios
        }" color="primary"></q-btn>
      </div>
    </div>

    <q-dialog v-model="dialogconfirmar">
      <q-card style="max-width: 80vw; width: 600px">
        <q-card-section>
          <h6 class="text-primary q-ma-none">ACTUALIZACIÓN DE DATOS DELICADOS</h6>
          <q-separator />
          <p class="q-ma-none q-pb-md text-caption">Para actualizar estos datos se necesita una confirmación. ingresa la palabra <span class="text-bold text-primary"> autorizado</span>  en la caja de texto para continuar</p>
          <q-input v-model="banner" filled label="Mensaje de validación"></q-input>
        </q-card-section>
        <q-card-section class="row justify-end col-12">
          <q-btn label="Continuar" @click="methodToContinue()" color="primary"></q-btn>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>
<script>
import { useService } from 'src/Utils/Servicio';

export default {
  data() {
    return {
      listaPanes: [
        {
          nombre: "PanDulce",
          precio: 10.05,
        },
      ],
      dialogconfirmar:false,
      banner:'',
      methodToContinue:()=>{},
      PanesService:useService('Panes'),
      columns: [
        {
          name: "nombre",
          align: "left",
          label: "NOMBRE",
          field: "nombre",
          style: 'width: 40%',
          sortable: true,
        },
        {
          name: "precio",
          align: "left",
          label: "PRECIO",
          field: "precio",
          sortable: true,
        },
        {
          name: "cantEmpaque",
          align: "left",
          label: "CANT EMPAQUE",
          field: "cantEmpaque",
          sortable: true,
        },
        { name: "actions", align: "center", label: "", field: "" },
      ],
    };
  },
  created(){
    this.GetPanes()
  },  
  methods :{
    GetPanes (){
      this.PanesService.Get({
        Resolve:res => {
          this.listaPanes = res.data
        },
      })
    },
    AddPan(){
      this.PanesService.Post({
        Resolve: res => {
          console.log(res.data);
          this.GetPanes()
        }
      })
    },
    DeletePan(idPan){
      this.PanesService.DeleteById({
        id:idPan,
        Resolve:res => {
          console.log(res.data);
          this.GetPanes()          
        }
      })
    },
    ActualizaPrecios(){
      if (this.banner.trim() === 'autorizado') {
        this.PanesService.Post({
          action:'/ActualizaPrecios',
          obj:this.listaPanes,
          Resolve:res => {
            console.log(res.data);
            this.dialogconfirmar = false
            this.banner = ''
            this.methodToContinue = ()=>{}
            this.GetPanes()
          }
        })

      } 
      else{
        this.$q.notify({message:'mensaje de autorización erróneo intenta de nuevo', type:'warning'})
      }
    }
  }
};
</script>
