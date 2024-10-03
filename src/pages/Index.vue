<template>
  <div class="row col-12 full-height flex-center">
    <h3 class="text-center col-12"></h3>
    <q-img width="400px" fit="contain" height="150px" src="~assets/LogoFull.png"></q-img>
  </div>
</template>

<script>
export default {
  name: 'LoginPage',
  data () {
    return {
      Login: true,
      Usuario: '',
      Contraseña: ''
    }
  },
  methods: {

  }
}
</script>
