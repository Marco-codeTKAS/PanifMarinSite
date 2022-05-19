<template>
    <q-page>
        <q-card class="row q-my-none">
          <q-card-section>
              <h4 class="text-h6 q-mx-md q-my-xs" style="text-align:center;">Nombre Repartidor</h4>
          </q-card-section>
          <q-card-section class="row full-width q-py-none items-baseline justify-around"  >
              <h4 class="text-subtitle1 q-mt-sm q-mb-none" style="text-align:center;">Realiza tu pedido</h4>
          </q-card-section>
          <q-card-section class="row justify-around q-pt-none q-pb-md" >
            <div class="row justify-around q-mt-sm" v-for="(campo,index) in this.Campos" :key="campo">
              <div class="row q-mx-sm"  style="max-width:100%;"> <q-input v-model="modelInputCampo[index]" :label="campo" type="number"  standout="bg-primary text-white" dense> </q-input> </div>
            </div>
          </q-card-section>
          <q-card-section class="row full-width justify-end" >
            <q-btn label="Guardar" @click="GuardarData" color="primary"></q-btn>
          </q-card-section>
        </q-card>
    </q-page>
</template>

<script>
export default {
  name: 'RepartidorOverview',
  data () {
    return {
      Campos: ['Chinos', 'Bolillo6', 'Bolillo3', 'Telera4', 'TrancaG', 'ConchaG', 'PiconG', 'BolilloG', 'Avena', 'AvenaG', 'AvenaCH'],
      modelInputCampo: []

    }
  },
  created () {

  },
  methods: {

  }
}
</script>
