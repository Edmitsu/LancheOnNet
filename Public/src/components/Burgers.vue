<template>
  <section id="burgers">
    <div class="hamburgers-grid">
      <div class="hamburger-item" v-for="combo in combos" :key="combo._id">
        <img :src="getFullImageUrl(combo.img)" :alt="combo.name" class="hamburger-image" loading="lazy" draggable="false" />
        <h3 class="hamburger-name">{{ combo.name }}</h3>
        <p class="hamburger-description">{{ combo.description }}</p>
        <p>R$ {{ combo.price }}</p>
        <button @click="adicionarAoCarrinho(combo)">Adicionar ao Carrinho</button>
      </div>
    </div>
  </section>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      combos: [],
    };
  },
  mounted() {
    this.fetchCombos();
  },
  methods: {
    fetchCombos() {
      axios
        .get('http://localhost:3000/combos/')
        .then(response => {
          this.combos = response.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    getFullImageUrl(src) {
      return `http://localhost:3000/${src}`;
    },
    async adicionarAoCarrinho(combo) {
      if (!combo) {
        return;
      }

      try {
        const response = await axios.post('http://localhost:3000/carrinho/', {
          tipo: 'combo',
          id: combo._id,
          quantidade: 1,
          preco: combo.price,
          nome: combo.name,
          imagem: this.getFullImageUrl(combo.img),
          descricao: combo.description,
        });

        if (response.status === 200) {
          console.log("Hamburguer Adicionado Com Sucesso Meu Padrinho", response )
        } else {
          console.error('Erro ao adicionar ao carrinho.');
        }
      } catch (error) {
        console.error('Erro ao adicionar ao carrinho:', error);
      }
    }
  }
};
</script>

<style>
#burgers {
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
.hamburger-item > p {
  font-size: 2rem;
}

.hamburger-item > p:last-child {
  font-size: 3rem;
  font-weight: 600;
}

.hamburger-item:hover {
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
  transition: 0.5s ease-in-out;
}

.hamburger-name {
  font-size: 3rem;
  padding: 2rem 0.5rem;
}
@media (max-width: 28.75em) {
  #burgers {
    padding: 5rem 0;
  }
}
</style>
