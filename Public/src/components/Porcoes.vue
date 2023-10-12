<template>
  <section id="porcoes">
    <div class="porcoes-grid">
      <div class="porcao-item" v-for="porcao in porcoes" :key="porcao.id">
        <img :src="porcao.image" :alt="porcao.tipo" class="porcao-image" />
        <h3 class="porcao-name">{{ porcao.tipo }}</h3>
        <p>{{ porcao.price }}</p>
        <p>{{ porcao.description }}</p>
      </div>
    </div>
  </section>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    data() {
      return {
        porcoes: [],
      };
    },
    mounted() {
      axios.get("http://localhost:3000/acompanhamentos")
        .then((response) => {
          this.porcoes = response.data.acompanhamentos[0].porcoes;
        })
        .catch((error) => {
          console.error("Erro ao buscar os dados de bebidas:", error);
        });
    },
  };
  </script>
  
  <style>

  #porcoes{
    padding: 4rem 2rem;
  }
  .porcoes-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 4rem;
    width: 100%;
    margin: 0 auto;
  }
  
  .porcao-item {
    text-align: center;
    border: 1px solid #ddd;
    padding: 2rem;
    border-radius: 5px;
    background-color: #fff;
    background: var(--main-red);
    color: var(--main-white);
    box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
    border-radius: 2px;
    position: relative;
  }
  
  .porcao-image {
    height: 400px;
    width: 100%;
    object-fit: cover;
    max-height: 450px;
  }
  
  .porcao-name {
    font-size: 2rem;
    padding: 2rem 0.5rem;
  }
  @media (max-width: 28.75em) {
    #porcoes{
      padding: 4rem 0;
    }
  }
  </style>
  