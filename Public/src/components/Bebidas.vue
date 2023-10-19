<template>
  <section id="bebidas">
    <div class="bebidas-grid">
      <div class="bebida-item" v-for="bebida in bebidas" :key="bebida._id">
        <img :src="getFullImageUrl(bebida.img)" :alt="bebida.name" class="bebida-image" loading="lazy" draggable="false" />
        <h3 class="bebida-name">{{ bebida.name }}</h3>
        <p>{{ bebida.description }}</p>
        <p>R$ {{ bebida.price }}</p>
        <button @click="adicionarAoCarrinho(bebida)">Adicionar ao Carrinho</button>
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
      carrinho: [],
    };
  },
  mounted() {
    this.fetchBebidas();
  },
  methods: {
    fetchBebidas() {
      axios.get("http://localhost:3000/bebidas")
        .then((response) => {
          this.bebidas = response.data;
        })
        .catch((error) => {
          console.error("Erro ao buscar os dados de bebidas:", error);
        });
    },
    getFullImageUrl(src) {
      return `http://localhost:3000/${src}`;
    },
    async adicionarAoCarrinho(bebida) {
  if (!bebida) {
    return;
  }

  try {
    const response = await axios.post('http://localhost:3000/carrinho/', {
      tipo: 'bebida',
      id: bebida._id, 
      quantidade: 1,
      preco: bebida.price, 
      nome: bebida.name, 
      imagem: this.getFullImageUrl(bebida.img), 
      descricao: bebida.tamanho, 
    });

    if (response.status === 200) {
      console.log('Bebida  Adicionado Com Sucesso Meu Padrinho', response);
    } else {
      console.error('Erro ao adicionar ao carrinho.');
    }
  } catch (error) {
    console.error('Erro ao adicionar ao carrinho:', error);
  }
}
  }
}
</script>

<style>

#bebidas {
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

.bebida-item > p {
  font-size: 2rem;
}

.bebida-item > p:last-child {
  font-size: 3rem;
  font-weight: 600;
}

.bebida-item:hover {
  transform: scale(1.05);
  cursor: pointer;
}

.bebida-image {
  height: 300px;
  width: 100%;
  object-fit: cover;
  max-height: 450px;
}

.bebida-image:hover {
  height: 100%;
  transition: 0.5s ease-in-out;
}

.bebida-name {
  font-size: 3rem;
  padding: 2rem 0.5rem;
}

@media (max-width: 28.75em) {
  #bebidas {
    padding: 4rem 0;
  }
}
</style>


<style>
/* Estilos de bebidas */
#bebidas {
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

.bebida-item > p {
  font-size: 2rem;
}

.bebida-item > p:last-child {
  font-size: 3rem;
  font-weight: 600;
}

.bebida-item:hover {
  transform: scale(1.05);
  cursor: pointer;
}

.bebida-image {
  height: 300px;
  width: 100%;
  object-fit: cover;
  max-height: 450px;
}

.bebida-image:hover {
  height: 100%;
  transition: 0.5s ease-in-out;
}

.bebida-name {
  font-size: 3rem;
  padding: 2rem 0.5rem;
}

@media (max-width: 28.75em) {
  #bebidas {
    padding: 4rem 0;
  }
}
</style>
