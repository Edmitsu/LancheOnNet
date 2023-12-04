<script setup>
import Bebidas from './components/Bebidas.vue';
import Burgers from './components/Burgers.vue'
import Porcoes from './components/Porcoes.vue';
import Nav from './components/Nav.vue'
import Carrinho from './components/Carrinho.vue';


const showCarrinho = false;
</script>

<template>
    <Nav></Nav>
    <section class="content">
      <Pedidos />
      <Burgers />
      <Bebidas />
      <Porcoes />
      <Carrinho />
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
    margin-bottom: 150px;
  }

  @media (max-width: 28.75em) {
    .content{
      margin-left: 0;
      margin-bottom: 100px;
    }
  }
</style>
