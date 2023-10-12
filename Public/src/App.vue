<script setup>
import Bebidas from './components/Bebidas.vue';
import Burgers from './components/Burgers.vue'
import Porcoes from './components/Porcoes.vue';
import Nav from './components/Nav.vue'
</script>

<template>
    <Nav />
    <section class="content">
      <Burgers />
      <Bebidas />
      <Porcoes />
    </section>
</template>

<style>
  body {
    width: 100%;
    height: 100vh;
    background-color: var(--main-white);
    /* background-image: linear-gradient(62deg, #3a3d40 0%, #181719 100%); */
  }
  .content{
    margin-left: 100px;
  }

  @media (max-width: 28.75em) {
    .content{
      margin-left: 0;
    }
  }
</style>
