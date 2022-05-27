<template>
    <q-page>
        <q-card class="row q-my-none">
          <q-card-section>
              <h4 class="text-h6 q-mx-md q-my-xs" style="text-align:center;">{{this.dataRepartidor}}</h4>
          </q-card-section>
          <q-card-section class="row full-width q-py-none items-baseline justify-around"  >
              <h4 class="text-subtitle1 q-mt-sm q-mb-none" style="text-align:center;">Realiza tu pedido</h4>
          </q-card-section>
          <q-card-section class="row justify-around q-pt-none q-pb-md" >
            <div class="row justify-around q-mt-sm" v-for="(campo,index) in this.Campos" :key="campo">
              <div class="row q-mx-sm"  style="max-width:100%;">
                <q-input
                v-model="modelInputCampo[index]"
                :label="campo"
                type="number"
                standout="bg-primary text-white"
                dense
                ref="campo"
                :rules="[
                valor => !!valor || 'Ingrese el email', ]"

                >

                </q-input>
                </div>
            </div>
          </q-card-section>
          <q-card-section class="row full-width justify-end" >
            <q-btn label="Guardar" @click="HacerPedido" color="primary"></q-btn>
          </q-card-section>
        </q-card>
    </q-page>
</template>

<script>
export default {
  data () {
    return {
      Campos: ['Chinos', 'Bolillo6', 'Bolillo3', 'Telera4', 'TrancaG', 'ConchaG', 'PiconG', 'BolilloG', 'Avena', 'AvenaG', 'AvenaCH'],
      modelInputCampo: [],
      dataRepartidor: null
    }
  },
  created () {
    console.log(this.dataRepartidores)
    this.DatosRepartidor()
  },
  methods: {
    HacerPedido () {
      const vm = this
      let contCampos = 0
      for (let index = 0; index < this.$refs.campo.length; index++) {
        console.log(vm.$refs.campo[index].validate())
        if (this.$refs.campo[index].hasError) {
          this.formHasError = true
          this.$q.notify({
            message: 'debes llenar los campos para continuar',
            color: 'negative'
          })
          break
        } else {
          contCampos++
          console.log('Realiza lo que sea')
        }
      }

      if (contCampos === this.$refs.campo.length) {
        const FinalResult = {}
        this.Campos.forEach((e, index) => {
          // const JSONobject = { [e]: vm.modelInputCampo[index] }
          FinalResult[e] = vm.modelInputCampo[index]

          return FinalResult
        })

        this.$axios.post('Repartidores/RealizaPedido', FinalResult).then(res => {
          console.log(res.data)
        })
      }
    },
    DatosRepartidor () {
      this.$axios.get('Repartidores/DatosRepartidor').then(res => {
        this.dataRepartidor = res.data
      })
    }
  }
}
</script>
