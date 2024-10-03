<script>
export default {
  name: 'consultasMixin',
  data () {
    return {
      dataRepartidores: []
    }
  },
  created () {
    this.ConsultaRepartidores()
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
