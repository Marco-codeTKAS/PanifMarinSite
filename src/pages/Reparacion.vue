<template>
  <q-page class="row justify-center items-start q-px-lg">
    <div class="row col-12 col-md-10 col-lg-8">
      <div class="row col-12 justify-end">
        <q-btn dense icon="person_add" color="primary" align="right" @click="OpenModalReparacion"
          class="q-my-sm q-mx-lg q-px-sm"></q-btn>
      </div>
      <div class="row col-12 q-mt-md">
        <q-table :columns="columns" :rows="listaReparaciones" no-data-label="I didn't find anything for you"
          title="Reparaciones" class="col-12">
  
        </q-table>
      </div>
    </div>


    <q-dialog v-model="modalReparacion">
      <q-card class="q-mt-md col-12" style="width: 1000px; max-width: 80vw;" bordered>
        <!-- Header -->
        <div class="row col-12 justify-between items-center" style="background-color: #1976d221;">
          <h6 class="q-mt-none q-py-md q-px-md q-mb-sm">{{ 'Registra una reparación' }}</h6>
          <h6 class="text-caption q-mt-none q-py-md q-px-md q-mb-sm">{{ reparacion.fecha }}</h6>
        </div>
        <q-form class="q-mt-md q-px-md " @submit.prevent="GuardarReparacion">
          <section class="row col-12 justify-around">
            <q-select v-model="reparacion.camioneta" :options="listaCamionetas" behavior="menu"
              :option-label="camioneta => (camioneta === null ? 'Sin valor' : `${camioneta.marca}-${camioneta.modelo} | ${camioneta.placas}`)"
              la class="col-md-4 col-12" autofocus outlined dense label="Camionetas"
              hint="Selecciona o registra una nueva camioneta">
              <template v-slot:prepend>
                <q-icon name="local_shipping" />
              </template>
            </q-select>
            <q-input v-model="reparacion.nombreResponsable" class="col-md-5 col-12" autofocus outlined dense
              label="Nombre del responsable" hint="registra el nombre de quien te entrega la camioneta" hide>
              <template v-slot:prepend>
                <q-icon name="person" />
              </template>
            </q-input>
            <q-input v-model="reparacion.numeroTelefono" maxlength="10" class="col-md col-12" autofocus outlined dense
              label="Numero de teléfono" hint="registra el numero de contacto">
              <template v-slot:prepend>
                <q-icon name="phone" />
              </template>
            </q-input>
          </section>
          <q-separator class="q-mt-md" />
          <!-- -----------------------------------Agregando los detalles -->
          <section class="row col-12 q-pt-md" style="row-gap: 8px;">
            <h6 class="q-my-sm col-12">Registro de detalles</h6>
            <div class="row col-12" v-for="(detalle, index) in detalleReparacion" :key="index">
              <q-input class="col-md-3 col-12" v-model="detalle.tituloCorto" autofocus outlined dense
                label="Titulo Corto" hint="ingresa un texto para identificar de que trata">
                <template v-slot:prepend>
                  <q-icon name="title" />
                </template>
              </q-input>
              <q-input class="col-md-3 col-12" v-model.number="detalle.costoDetalle" autofocus outlined dense
                label="Coste" hint="ingresa un texto para identificar de que trata">
                <template v-slot:prepend>
                  <q-icon name="paid" />
                </template>
              </q-input>
              <q-input class="col-md col-12" v-model="detalle.descripcion" autofocus outlined dense label="descripción"
                hint="ingresa un texto para identificar de que trata">
                <template v-slot:prepend>
                  <q-icon name="edit_note" />
                </template>
              </q-input>
            </div>
            <div class="row q-mt-sm">
              <q-btn icon="add" dense color="secondary" @click.stop="AddDetalle" class="q-mb-md"></q-btn>
            </div>
          </section>
          <section class="row justify-end q-pb-md">
            <q-btn label="Guardar" color="primary" type="submit"></q-btn>
          </section>
        </q-form>
      </q-card>
    </q-dialog>
  </q-page>
</template>
<script>
export default {
  name: 'ReparacionCamionetas',
  data () {
    return {
      reparacion: {},
      detalleReparacion: [],
      modalReparacion: false,
      listaCamionetas: [],
      listaReparaciones: [],
      columns: [
        {
          name: 'camioneta',
          align: 'left',
          label: 'CAMIONETA',
          field: row => `${row?.camioneta?.marca} - ${row?.camioneta?.modelo} - ${row?.camioneta?.placas}`,
          sortable: true
        },
        {
          name: 'fechaReparacion',
          required: true,
          label: 'Fecha de Reparacion',
          field: row => new Date(row.fechaReparacion).toLocaleDateString('es-mx', { dateStyle: 'medium' }),
          align: 'center',
          sortable: true
        },
        {
          name: 'nombreResponsable',
          required: true,
          label: 'nombre Responsable',
          field: 'nombreResponsable',
          align: 'left',
          sortable: true
        },
        {
          name: 'numeroTelefono',
          align: 'center',
          label: 'Numero de Telefono',
          field: 'numeroTelefono'
        },
        { name: 'actions', align: 'center', label: '', field: '' }
      ]

    }
  },
  created () {
    this.GetReparaciones()
    const hoy = new Date()
    const options = {
      weekday: 'short',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }
    this.GetListaCamionetas()
    this.reparacion.fecha = hoy.toLocaleDateString('es-mx', options)
  },
  methods: {
    GetReparaciones () {
      this.$axios.get('Reparaciones').then(res => {
        this.listaReparaciones = res.data
      }).catch(error => {
        console.log(error)
      })
    },
    AddDetalle () {
      this.detalleReparacion.push({
        tituloCorto: '',
        costoDetalle: 0,
        descripcion: ''
      })
    },
    GuardarReparacion () {
      const vm = this
      const json = {
        idReparacion: 0,
        camioneta: vm.reparacion?.camioneta,
        nombreResponsable: vm.reparacion.nombreResponsable,
        numeroTelefono: vm.reparacion.numeroTelefono,
        detReparaciones: vm.detalleReparacion
      }
      this.$axios.post('Reparaciones', json).then(res => {
        this.GetReparaciones()
        this.reparacion = {}
        this.detalleReparacion = []
        this.modalReparacion = false
      }).catch(error => {
        console.log(error)
      })
    },
    OpenModalReparacion () {
      this.modalReparacion = true
      this.detalleReparacion = []
      this.detalleReparacion.push({
        tituloCorto: '',
        descripcion: '',
        costoDetalle: 0
      })
    },
    GetListaCamionetas () {
      const vm = this
      this.loadingtable = true
      this.$axios
        .get('Camionetas')
        .then((res) => {
          this.listaCamionetas = res.data
          if (this.$route.params.idCamioneta !== undefined) {
            this.reparacion.camioneta = vm.listaCamionetas.find(el => el.idCamioneta === Number(this.$route.params.idCamioneta))
            console.log(vm.listaCamionetas)
          }
          this.loadingtable = false
        })
        .finally(() => {
          this.loadingtable = false
        })
    }
  }

}
</script>
