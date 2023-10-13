<template>
  <section id="porcoes">
    <div class="porcoes-grid">
      <div class="porcao-item" v-for="porcao in porcoes" :key="porcao.id">
        <img :src="getFullImageUrl(porcao.src)" :alt="porcao.tipo" class="porcao-image" loading="lazy" draggable="false" />
        <h3 class="porcao-name">{{ porcao.name }}</h3>
        <p>{{ porcao.description }}</p>
        <p>{{ porcao.price }}</p>
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
      axios.get("http://localhost:3000/porcao")
        .then((response) => {
          this.porcoes = response.data;
        })
        .catch((error) => {
          console.error("Erro ao buscar os dados de bebidas:", error);
        });
    },
    methods: {
      getFullImageUrl(src) {
      return `http://localhost:3000/${src}`;
      },
    }
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
  .porcao-item > p{
    font-size: 2rem;
  }

  .porcao-item:hover{
    transform: scale(1.05);
    cursor: pointer;
  }
  
  .porcao-image {
    height: 300px;
    width: 100%;
    object-fit: cover;
    max-height: 450px;
  }

  .porcao-image:hover {
    height: 100%;
    transition: .5s ease-in-out;
  }
  
  .porcao-name {
    font-size: 3rem;
    padding: 2rem 0.5rem;
  }
  @media (max-width: 28.75em) {
    #porcoes{
      padding: 4rem 0;
    }
  }
  </style>
  