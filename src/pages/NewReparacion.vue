<template>
  <q-page class=" row justify-center q-mx-md">
    <q-card class="q-mt-md col-12" style="max-width: 1200px; height: fit-content;" bordered>
      <!-- Header -->
      <div class="row col-12 justify-between items-center" style="background-color: #1976d221;">
        <h6 class="q-mt-none q-py-md q-px-md q-mb-sm" >{{ tituloPage }}</h6>
        <h6 class="text-caption q-mt-none q-py-md q-px-md q-mb-sm">{{ reparacion.fecha }}</h6>
      </div>
      <q-form class="q-mt-md q-px-md ">
        <section class="row col-12 justify-around">
          <q-select v-model="reparacion.camioneta" :options="listaCamionetas" :option-label="camioneta => (camioneta === null ? 'Sin valor' : `${camioneta.marca}-${camioneta.modelo} | ${camioneta.placas}`)" la class="col-md-4 col-12" autofocus outlined dense label="Camionetas" hint="Selecciona o registra una nueva camioneta">
            <template v-slot:prepend>
              <q-icon name="local_shipping" />
            </template>
          </q-select>
          <q-input v-model="reparacion.nombreResponsable" class="col-md-5 col-12" autofocus outlined dense label="Nombre del responsable" hint="registra el nombre de quien te entrega la camioneta" hide>
            <template v-slot:prepend>
              <q-icon name="person" />
            </template>
          </q-input>
          <q-input v-model="reparacion.numeroTelefono" class="col-md col-12" autofocus outlined dense label="Numero de teléfono" hint="registra el numero de contacto">
            <template v-slot:prepend>
              <q-icon name="phone" />
            </template>
          </q-input>
        </section>
        <q-separator class="q-my-md"/>
        <!-- -----------------------------------Agregando los detalles -->
        <section class="row q-py-md" style="row-gap: 8px;">
          <h6 class="q-my-sm">Registro de detalles</h6>
          <div class="row col-12" v-for="(detalle, index) in detalleReparacion" :key="index">
            <q-input class="col-md-3 col-12" v-model="detalle.tituloCorto" autofocus outlined dense label="Titulo Corto" hint="ingresa un texto para identificar de que trata">
              <template v-slot:prepend>
                <q-icon name="title" />
              </template>
            </q-input>
            <q-input class="col-md-3 col-12" v-model.number="detalle.costoDetalle" autofocus outlined dense label="Coste" hint="ingresa un texto para identificar de que trata">
              <template v-slot:prepend>
                <q-icon name="paid" />
              </template>
            </q-input>
            <q-input class="col-md col-12" v-model="detalle.descripcion" autofocus outlined dense label="descripción" hint="ingresa un texto para identificar de que trata">
              <template v-slot:prepend>
                <q-icon name="edit_note" />
              </template>
            </q-input>
          </div>
          <div class="row q-mt-sm">
            <q-btn icon="add" dense color="primary" @click.stop="AddDetalle" class="q-mb-md"></q-btn>
          </div>
        </section>
      </q-form>
    </q-card>
  </q-page>
</template>
<script>
export default {
  name: 'NewReparacion',
  data () {
    return {
      reparacion: {},
      tituloPage: 'Registra una reparacion',
      detalleReparacion: [],
      listaCamionetas: [],
      loadingtable: false
    }
  },
  created () {
    this.GetListaCamionetas()
    const hoy = new Date()
    const options = {
      weekday: 'short',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }
    console.log(hoy.toLocaleDateString('es-mx', options))
    this.reparacion.fecha = hoy.toLocaleDateString('es-mx', options)
    this.detalleReparacion.push({
      tituloCorto: 'Test 1',
      descripcion: 'descripcion',
      costoDetalle: 100
    })
  },
  methods: {
    GetReparacionById (id) {
      this.$axios.get(`/${id}`).then(res => {
        console.log(res)
      }).catch(error => {
        console.log(error

        )
      })
    }

  }

}
</script>
