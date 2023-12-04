<template>
  <section id="porcoes">
    <div class="hamburgers-grid">
      <div class="hamburger-item" v-for="porcao in porcaos" :key="porcao._id">
        <img :src="getFullImageUrl(porcao.img)" :alt="porcao.name" class="hamburger-image" loading="lazy" draggable="false" />
        <h3 class="hamburger-name">{{ porcao.name }}</h3>
        <p class="hamburger-description">{{ porcao.description }}</p>
        <p>R$ {{ porcao.price }}</p>
        <button @click="adicionarAoCarrinho(porcao)">Adicionar ao Carrinho</button>
      </div>
    </div>
  </section>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      porcaos: [],
    };
  },
  mounted() {
    this.fetchPorcaos();
  },
  methods: {
    fetchPorcaos() {
      axios
        .get('http://localhost:4000/porcao')
        .then((response) => {
          this.porcaos = response.data;
        })
        .catch((error) => {
          console.error('Erro ao buscar os dados de porções:', error);
        });
    },
    getFullImageUrl(src) {
      return `http://localhost:4000/${src}`;
    },
    async adicionarAoCarrinho(porcao) {
      if (!porcao) {
        return;
      }

      try {
        const response = await axios.post('http://localhost:4000/carrinho/', {
          tipo: 'porcao',
          id: porcao._id,
          quantidade: 1,
          preco: porcao.price / 100,
          nome: porcao.name,
          imagem: this.getFullImageUrl(porcao.img),
          descricao: porcao.description,
        });

        if (response.status === 200) {
          console.log(response);
          // Após adicionar com sucesso, recarregue a página
          window.location.reload();
        } else {
          console.error('Erro ao adicionar ao carrinho.');
        }
      } catch (error) {
        console.error('Erro ao adicionar ao carrinho:', error);
      }
    },
  },
};
</script>

<style>
#porcoes {
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
.hamburger-item button{
  padding: 1rem;
  font-size: 1.6rem;
  font-weight: bold;
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
