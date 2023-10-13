<template>
  <section id="bebidas">
    <div class="bebidas-grid">
      <div class="bebida-item" v-for="bebida in bebidas" :key="bebida.id">
        <img :src="getFullImageUrl(bebida.img)" :alt="bebida.bebida" class="bebida-image" loading="lazy" draggable="false" />
        <h3 class="bebida-name">{{ bebida.bebida }}</h3>
        <p>{{ bebida.tamanho }}</p>
        <p>{{ bebida.price }}</p>
      </div>
    </div>
  </section>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    data() {
      return {
        bebidas: [],
      };
    },
    mounted() {
      axios.get("http://localhost:3000/bebidas")
        .then((response) => {
          this.bebidas = response.data;
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

  #bebidas{
    padding: 4rem 2rem;
  }
  .bebidas-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 4rem;
    width: 100%;
    margin: 0 auto;
  }
  
  .bebida-item {
    text-align: center;
    border: 1px solid #ddd;
    padding: 2rem;
    border-radius: 5px;
    background-color: #fff;
    background: var(--main-yellow);
    color: var(--main-white);
    box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
    border-radius: 2px;
    position: relative;
  }
  .bebida-item > p{
    font-size: 2rem;
  }

  .bebida-item:hover{
    transform: scale(1.05);
    cursor: pointer;
  }
  
  .bebida-image {
    height: 300px;
    width: 100%;
    object-fit: cover;
    max-height: 450px;
  }
  
  .bebida-name {
    font-size: 3rem;
    padding: 2rem 0.5rem;
  }
  @media (max-width: 28.75em) {
    #bebidas{
      padding: 4rem 0;
    }
  }
  </style>
  