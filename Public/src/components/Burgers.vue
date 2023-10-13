<template>
  <section id="burgers">
    <div class="hamburgers-grid">
      <div class="hamburger-item" v-for="hamburger in hamburgers" :key="hamburger.id">
        <img :src="getFullImageUrl(hamburger.src)" :alt="hamburger.name" class="hamburger-image" loading="lazy" draggable="false" />
        <h3 class="hamburger-name">{{ hamburger.name }}</h3>
        <p>{{ hamburger.description }}</p>
        <p>R$ {{ hamburger.price }}</p>
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
  .hamburger-item > p{
    font-size: 2rem;
  }

  .hamburger-item > p:last-child{
    font-size: 3rem;
    font-weight: 600;
  }

  .hamburger-item:hover{
    transform: scale(1.05);
    cursor: pointer;
  }
  
  .hamburger-image {
    height: 300px;
    width: 100%;
    object-fit: cover;
    max-height: 450px;
  }
  .hamburger-image:hover {
    height: 100%;
    transition: .5s ease-in-out;
  }
  
  .hamburger-name {
    font-size: 3rem;
    padding: 2rem 0.5rem;
  }
  @media (max-width: 28.75em) {
    #burgers{
      padding: 5rem 0;
    }
  }
  </style>
  