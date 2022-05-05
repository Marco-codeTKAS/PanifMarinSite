<script>
export default {
  name: 'consultas',
  data () {
    return {
      dataRepartidores: []
    }
  },
  created () {
    this.ConsultaRepartidores()
    console.log(this.dataRepartidores)
  },
  methods: {
    ConsultaRepartidores () {
      this.loadingtable = true
      this.$axios.get('Repartidores').then(res => {
        this.dataRepartidores = res.data
        this.loadingtable = false
        console.log(this.dataRepartidores)
      })
    }
  }

}
</script>
