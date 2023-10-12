<template>
  <section id="burgers">
    <div class="hamburgers-grid">
      <div class="hamburger-item" v-for="hamburger in hamburgers" :key="hamburger.id">
        <img :src="getFullImageUrl(hamburger.src)" :alt="hamburger.name" class="hamburger-image" />
        <h3 class="hamburger-name">{{ hamburger.name }}</h3>
        <p>{{ hamburger.price }}</p>
        <p>{{ hamburger.description }}</p>
      </div>
    </div>
  </section>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    data() {
      return {
        hamburgers: [],
      };
    },
    mounted() {
      // Realize a requisição para obter os dados de hamburguers
      axios.get("http://localhost:3000/combos")
        .then((response) => {
          this.hamburgers = response.data;
          console.log(this.hamburgers[0].src)
        })
        .catch((error) => {
          console.error("Erro ao buscar os dados de hamburguers:", error);
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

  #burgers{
    padding: 2rem 2rem;
  }

  .hamburgers-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 4rem;
    width: 100%;
    margin: 0 auto;
  }
  
  .hamburger-item {
    text-align: center;
    border: 1px solid #ddd;
    padding: 2rem;
    border-radius: 5px;
    background-color: #fff;
    background: var(--main-blue);
    color: var(--main-white);
    box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
    border-radius: 2px;
    position: relative;
  }
  
  .hamburger-image {
    height: 400px;
    width: 100%;
    object-fit: cover;
    max-height: 450px;
  }
  
  .hamburger-name {
    font-size: 2rem;
    padding: 2rem 0.5rem;
  }
  @media (max-width: 28.75em) {
    #burgers{
      padding: 5rem 0;
    }
  }
  </style>
  