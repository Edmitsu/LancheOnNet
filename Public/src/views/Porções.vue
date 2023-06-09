<template>
  <div class="backgroundPrincipal">
    <div class="container">
      <div v-for="porcao in porcoes" :key="porcao._id" class="coluna-50">
        <div class="backgroundCatalogoParaImagem" @click="openPopup(porcao)">
          <img :src="getFullImageUrl(porcao.src)" :alt="porcao.name" class="imgCatalogo">
          <h3>{{ porcao.name }}</h3>
          <p>{{ porcao.descricao }}</p>
        </div>
      </div>
    </div>

    <div v-if="showPopup" class="popup" @click.self="closePopup">
      <div class="popup-content">
        <button class="close-button" @click="closePopup">X</button>
        <div class="content">
          <img :src="getFullImageUrl(selectedPorcao.src)" :alt="selectedPorcao.name" width="200">
          <div class="xml">
            <h2>{{ selectedPorcao.name }}</h2>
            <p>{{ selectedPorcao.description }}</p>
            <!-- <input type="number" v-model="quantidade" min="1" placeholder="Quantidade" class="quantidade-input"> -->
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
          <p>{{ numeroPedido }}</p>
          <!-- <p>Quantidade: {{ quantidade }}</p> -->
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
      porcoes: [],
      showPopup: false,
      selectedPorcao: null,
      showPedidoPopup: false,
      numeroPedido: null,
    };
  },
  mounted() {
    this.fetchPorcoes();
  },
  methods: {
    fetchPorcoes()  {
      axios
        .get('http://localhost:3000/porcao/')
        .then(response => {
          this.porcoes = response.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    getFullImageUrl(src) {
      return `http://localhost:3000/${src}`;
    },
    openPopup(porcao) {
      this.selectedPorcao = {
        ...porcao,
        descricao: porcao.description
      };
      this.showPopup = true;
    },
    closePopup() {
      this.showPopup = false;
      this.selectedPorcao = null;
    },
    adicionarPedido() {
      if (!this.selectedPorcao) {
        return;
      }

      const { name, descricao } = this.selectedPorcao;

      const pedido = {
        nome: name,
        descricaoPorcao: descricao,
      };

      axios
        .post('http://localhost:3000/pedidos/', pedido)
        .then(response => {
          console.log('Pedido adicionado:', response.data);
          this.selectedPorcao = null;
          this.showPopup = false;
          this.numeroPedido = response.data.pedido.numeroPedido;

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
.pedido-popup {
  text-align: center;
  margin-top: 10px;
}

.pedido-popup {
  text-align: center;
  margin-top: 10px
}
body{
 margin: 0;
 padding: 0;
 box-sizing:border-box;
}
.backgroundPrincipal {
  margin: 0 auto;
  width: 100vw;
  padding: 20px; 
  background-color: #fcbf4c;
}


.container {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  grid-gap: 20px;
  margin: auto;
  width: 985px;
}

.coluna-50_esquerda {
  width: 100%;
  height: 8%;
  max-width: 100%;
  display: block;
  border-radius: 14px;
}

.imgCatalogo {
    width: 100%;
    height: 290px;
    border-radius: 10px;
    max-width: 100%;
}

.backgroundCatalogoParaImagem {
  background-color: #964b00;
  margin: 2%;
  padding: 5%;
  border-radius: 7px;
  cursor: pointer;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 13px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.backgroundCatalogoParaImagem h3 {
  margin-top: 10px;
  font-size: 17px;
  color: #fff;
}
.popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
}

.popup-content h2 {
  margin-top: 0;
}

.popup-content img {
  width: 50%;
  height: 290px;
  border-radius: 10px;
  max-width: 100%;
}

.popup-content button {
  margin: 10px;
  padding: 5px 10px;
  background-color: #fcbf4c;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}


.xml h2{
  margin-bottom:  25px;
  text-align: center;
  font-size: 30px;
}

.xml p{
  padding-top: 20px;
    max-width: 500px;
    margin-left: 40px;
    font-size: 20px;
    font-weight: 545;
    text-align: center;
}


  .cta {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }
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
  
  .popup-content {
    position: relative;
    background-color: #fff;
    padding: 20px;
    border-radius: 10px;
  }
  
  .popup-content .content {
    text-align: center;
    display: flex;
    
    align-items: center;
  }
   
  .pedido-popup {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 300px;
    padding: 20px;
    background-color: #fff;
    border-radius: 10px;
    text-align: center;
  }
  
  .pedido-popup .close-button {
    position: absolute;
    top: 10px;
    right: 10px;
    padding: 5px 10px;
    background-color: #ff5c5c;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .pedido-content {
    margin-top: 20px;
  }
  
  .pedido-content h2 {
    margin-top: 0;
  }
  
  .pedido-content p {
    margin-bottom: 0;
    font-size: 24px;
    font-weight: bold;
  }
</style>




