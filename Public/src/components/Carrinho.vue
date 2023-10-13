<template>
    <section id="carrinho" class="carrinho">
        <div class="carrinho-grid">
            <div class="carrinho-item">
                <ul class="carrinho-list">
                    <li v-for="item in carrinho" :key="item.id">
                        {{ item.nome }} - {{ item.quantidade }} - {{ item.preco }}
                    </li>                    
                </ul>
            </div>
        </div>
        <div>
          
        </div>
    </section>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      carrinho: [],
    };
  },
  mounted() {
    // Realize a requisição para obter os dados de hamburguers
    axios.get("http://localhost:3000/carrinho")
      .then((response) => {
        this.carrinho = response.data.carrinhoItens;
        console.log(this.carrinho)
      })
      .catch((error) => {
        console.error("Erro ao buscar os dados do carrinho:", error);
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
   .carrinho {
     display: flex;
     justify-content: center;
     position: fixed;
     align-items: center;
     bottom: 0;
     right: 0;
     height: 150px;
     width: calc(100% - 100px);
     background: var(--main-yellow);
     box-shadow: 2px 0 5px rgba(0, 0, 0, 0.4);
     z-index: 1;
   }
  
   .carrinho-list {
     display: flex;
     padding: 2rem;
     height: 100%;
     justify-content: space-between;
   }
  
   @media (max-width: 28.75em) {
    .nav {
      display: flex;
      justify-content: center;
      position: fixed;
      top: 0;
      left: 0;
      height: 50px;
      width: 100%;
      box-shadow: 2px 0 5px rgba(0, 0, 0, 0.4);
      z-index: 1;
   }
  
   .nav-list {
     display: flex; 
     padding: 1rem;
     flex-direction: row;
     margin: 0 1rem;
     align-items: center;
   }
   .nav-list a {
     margin: 0 1rem;
     padding: 1.2rem;
   }
   }
  </style>
  