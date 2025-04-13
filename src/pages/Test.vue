<template>
  <div class="row col-12 q-pa-md">
    <div class="row col-12 q-pa-md">
      <p>Hola Fátima, eres una persona increíble y te deseo un día maravilloso!</p>
      <router-link to="/">Ir al inicio</router-link>
    </div>
    <div class="heart"></div>
    <div>
      <p>Este sitio es un proyecto de PanifMarin, donde puedes encontrar los mejores productos de panadería y repostería. Explora nuestras secciones para conocer más sobre nosotros y nuestros productos.</p>
      <p>El sistema es un sistema de control interno de la panadería y no realiza ventas.</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TestComponent',
} 
</script>
<style>
body {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
    background-color: 
    rgb(255, 255, 255);
}

.heart {
    position: relative;
    width: 100px;
    height: 100px;
    background-color: red;
    transform: rotate(-45deg);
    animation: latido 1s infinite ease-in-out;
}

.heart::before,
.heart::after {
    content: "";
    position: absolute;
    width: 100px;
    height: 100px;
    background-color: red;
    border-radius: 50%;
}

.heart::before {
    top: -50px;
    left: 0;
}

.heart::after {
    left: 50px;
    top: 0;
}

@keyframes latido {
    0%, 100% {
        transform: scale(1) rotate(-45deg);
    }
    50% {
        transform: scale(1.2) rotate(-45deg);
    }
}
</style>