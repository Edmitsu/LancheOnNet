<template>
  <div class="combo-container">
    <div v-for="combo in combos" :key="combo._id" class="combo-item">
      <div class="combo-card" @click="openPopup(combo)">
        <img :src="getFullImageUrl(combo.src)" :alt="combo.name" class="combo-image">
        <h3 class="combo-name">{{ combo.name }}</h3>
        <p class="combo-description">{{ combo.description }}</p>
      </div>
    </div>

    <div v-if="showPopup" class="popup" @click.self="closePopup">
      <div class="popup-content">
        <button class="close-button" @click="closePopup">X</button>
        <div class="content">
          <div class="image-container">
            <img :src="getFullImageUrl(selectedCombo.src)" :alt="selectedCombo.name" class="popup-image">
          </div>
          <div class="details-container">
            <h2>{{ selectedCombo.name }}</h2>
            <p>{{ selectedCombo.description }}</p>
          </div>
        </div>
        <div class="cta">
          <button @click="adicionarPedido">Adicionar Pedido</button>
        </div>
      </div>
    </div>

    <div v-if="showPedidoPopup" class="pedido-popup" @click.self="closePedidoPopup">
      <div class="pedido-popup-content">
        <button class="close-button" @click="closePedidoPopup">X</button>
        <div class="pedido-content">
          <h2>Número do Pedido</h2>
          <p v-if="numeroPedido">{{ numeroPedido }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      combos: [],
      showPopup: false,
      selectedCombo: null,
      showPedidoPopup: false,
      numeroPedido: null,
      quantidade: 1
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
    openPopup(combo) {
      this.selectedCombo = combo;
      this.showPopup = true;
    },
    closePopup() {
      this.showPopup = false;
      this.selectedCombo = null;
    },
    adicionarPedido() {
      if (!this.selectedCombo) {
        return;
      }

      const { name, descricao } = this.selectedCombo;

      const pedido = {
        nome: name,
        descricaoCombo: descricao,
        qtdCombo: this.quantidade
      };

      axios
        .post('http://localhost:3000/pedidos/', pedido)
        .then(response => {
          console.log('Pedido adicionado:', response.data);
          this.numeroPedido = response.data.pedido.numeroPedido;

          this.showPopup = false;
          this.showPedidoPopup = true;
          setTimeout(() => {
            this.closePedidoPopup();
          }, 8000);
        })
        .catch(error => {
          console.error('Erro ao adicionar pedido:', error);
        });
    },
    closePedidoPopup() {
      this.showPedidoPopup = false;
      this.numeroPedido = null;
    }
  }
};
</script>

<style>
/* Estilos para o container de combos */
.combo-container {
  margin: 0 auto;
  width: 100%;
  max-width: 1200px; /* Ajuste a largura máxima conforme necessário */
  padding: 20px; 
  background-color: #f1f1f1;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); /* Aumentar a largura mínima para 250px */
  grid-gap: 20px;
}

/* Estilos para cada item de combo */
.combo-item {
  width: 100%;
  display: block;
}

/* Estilos para o card de combo */
.combo-card {
  background-color: #e2e2e2;
  padding: 20px;
  border-radius: 7px;
  cursor: pointer;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 13px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

/* Estilos para a imagem do combo */
.combo-image {
  width: 350px;
  height: 350px;
  object-fit: cover;
  max-width: 100%;
  border-radius: 10px;
}

/* Estilos para o nome do combo */
.combo-name {
  margin-top: 10px;
  font-size: 17px;
  color: #333;
}

/* Estilos para a descrição do combo */
.combo-description {
  margin-bottom: 0;
  color: #666;
}

/* Estilos para o popup */
.popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center; /* Centraliza horizontalmente */
  align-items: center; /* Centraliza verticalmente */
  background-color: rgba(0, 0, 0, 0.5);
}

.popup-content {
  position: relative;
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  width: 80%; /* Ajuste a largura do pop-up conforme necessário */
  max-width: 400px; /* Defina um tamanho máximo */
}

/* Estilos para o botão de fechar */
.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 5px 10px;
  background-color: #ff5c5c;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

/* Estilos para a imagem do combo no popup */
.popup-image {
  width: 100%;
  height: auto;
  border-radius: 10px;
}

/* Estilos para o contêiner da imagem no popup */
.image-container {
  text-align: center; /* Centraliza a imagem horizontalmente */
}

/* Estilos para o contêiner dos detalhes no popup */
.details-container {
  margin-top: 10px;
}

/* Estilos para o título no popup */
.popup-content h2 {
  margin-top: 0;
  font-size: 24px;
  color: #333;
}

/* Estilos para a descrição no popup */
.popup-content p {
  margin-bottom: 0;
  font-size: 16px;
  color: #666;
}

/* Estilos para a seção CTA no popup */
.cta {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

/* Estilos para o popup de pedido */
.pedido-popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center; /* Centraliza horizontalmente */
  align-items: center; /* Centraliza verticalmente */
  background-color: rgba(0, 0, 0, 0.5);
}

.pedido-popup-content {
  position: relative;
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  width: 60%; /* Ajuste a largura do popup de pedido conforme necessário */
  max-width: 400px; /* Defina um tamanho máximo */
}

.pedido-content p{
  font-size: 25px;
  font-weight: 700;
  color: #ff5c5c;
}
</style>
