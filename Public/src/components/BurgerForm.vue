<template>
  <Message :msg="msg" v-show="msg"/>
  <div class="form__background">
    <form class="burger-form" method="POST" @submit.prevent="createBurger">
      <div class="input-container">
        <label for="nome">Nome do Cliente:</label>
        <input type="text" id="nome" name="nome" v-model="nome" placeholder="Digite o seu nome">
      </div>
      <div class="input-container">
        <label for="carne">Escolha a carne do seu Burger:</label>
        <select class="burger__select" name="carne" id="carne" v-model="carne">
          <option value="">Selecione o tipo de carne</option>
          <option v-for="carne in carnes" :key="carne.id" :value="carne.tipo">{{ carne.tipo }}</option>
        </select>
      </div>
      <div class="input-container">
        <label for="pao">Escolha o Pão:</label>
        <select class="burger__select" name="pao" id="pao" v-model="pao">
          <option value="">Selecione o seu pão</option>
          <option v-for="pao in paes" :key="pao.id" :value="pao.tipo">{{ pao.tipo }}</option>
        </select>
      </div>
      <div class="input-container">
        <label for="bebida">Escolha a sua Bebida:</label>
        <select class="burger__select" name="bebida" id="bebida" v-model="bebida">
          <option value="">Selecione a Bebida</option>
          <option v-for="bebida in bebidas" :key="bebida.id" :value="bebida.tipo">{{ bebida.tipo }}</option>
        </select>
      </div>
      <div class="input-container">
        <label for="porcao">Escolha o Acompanhamento:</label>
        <select class="burger__select" name="porcao" id="porcao" v-model="porcao">
          <option value="">Selecione o acompanhamento</option>
          <option v-for="porcao in porcoes" :key="porcao.id" :value="porcao.tipo">{{ porcao.tipo }}</option>
        </select>
      </div>
      <div id="opcionais-container" class="input-container">
        <label id="opcionais-title" for="opcionais">Selecione os Opcionais:</label>
        <div class="checkbox-container" v-for="opcional in opcionaisdata" :key="opcional.id">
          <input class="checkbox-item" type="checkbox" name="opcionais" v-model="opcionais" :value="opcional.tipo">
          <span>{{ opcional.tipo }}</span>
        </div>
      </div>
      <div class="input-container">
        <input class="submit-btn" type="submit" value="Monte o seu Burger!">
      </div>
    </form>
  </div>
</template>

<script>
import Message from './Message'
import Banner from './Banner.vue'
import axios from 'axios';

export default {
  name: "BurgerForm",
  data() {
    return {
      paes: [],
      carnes: [],
      opcionaisdata: [],
      bebidas: [],
      porcoes: [],
      nome: "",
      carne: "",
      pao: "",
      opcionais: [],
      bebida: "",
      porcao: "",
      status: "Solicitado",
      msg: null
    };
  },
  methods: {
    async getIngredientes() {
      try {
        const response = await axios.get('http://localhost:3000/ingredientes');
        const ingredientes = response.data.ingredientes;

        this.paes = ingredientes.find(ingrediente => ingrediente._id === '641e080ba652afd8f482e389').paes;
        this.carnes = ingredientes.find(ingrediente => ingrediente._id === '641e080ba652afd8f482e389').carnes;
        this.opcionaisdata = ingredientes.find(ingrediente => ingrediente._id === '641e080ba652afd8f482e389').opcionais;
      } catch (error) {
        console.error('Erro ao buscar ingredientes:', error);
      }
    },
    async getAcompanhamentos() {
      try {
        const response = await axios.get('http://localhost:3000/acompanhamentos');
        const acompanhamentos = response.data.acompanhamentos;

        this.bebidas = acompanhamentos[0].bebidas;
        this.porcoes = acompanhamentos[0].porcoes;
      } catch (error) {
        console.error('Erro ao buscar acompanhamentos:', error);
      }
    },
    async createBurger() {
      const data = {
        nome: this.nome,
        carne: this.carne,
        pao: this.pao,
        opcionais: this.opcionais,
        bebida: this.bebida,
        porcao: this.porcao,
        status: this.status
      };
      
      try {
        const response = await axios.post('http://localhost:3000/pedidos', data);
        
        if (response.status === 200) {
          this.msg = "Pedido realizado com sucesso!";
          const pedidoData = response.data; // Use a resposta para salvar no carrinho
          this.saveToCarrinho(pedidoData);

          // Limpar campos
          this.nome = "";
          this.carne = "";
          this.pao = "";
          this.opcionais = [];
          this.bebida = "";
          this.porcao = "";
        } else {
          this.msg = "Ocorreu um erro ao fazer o pedido. Por favor, tente novamente.";
        }
      } catch (error) {
        console.error('Erro ao criar pedido:', error);
        this.msg = "Ocorreu um erro ao fazer o pedido. Por favor, tente novamente.";
      }
    },
    async saveToCarrinho(data) {
      try {
        const response = await axios.post('http://localhost:3000/carrinho', {
          pedidoId: data._id
        });

        if (response.status === 200) {
          console.log('Pedido salvo no carrinho:', response.data);
        } else {
          console.error('Erro ao salvar pedido no carrinho.');
        }
      } catch (error) {
        console.error('Erro ao salvar pedido no carrinho:', error);
      }
    }
  },
  
  mounted() {
    this.getIngredientes();
    this.getAcompanhamentos();
  },
  components: {
    Message,
    Banner,
  },
};
</script>








<style scoped>

  .form__background{
    display: flex;
    background-color: #ffc765;       
    border-radius: 5px;
    margin: 15px; 
    padding: 15px;
  }
  .burger-form {
    display: flex;
    flex-direction: column;
    max-width: 400px;
    margin: 10px;
    padding: 5px;
    min-width: 30%;
  }
  .input-container {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
  }
  label {
    font-weight: bold;
    margin-bottom: 15px;
    color: #502314;
    padding: 5px 10px;
    border-left: 4px solid rgba(150,38,38,0.75);
  }
  input, select {
    padding: 5px 10px;
    width: 380px;
    border-radius: 25px;
  }
  #opcionais-container {
    flex-direction: row;
    flex-wrap: wrap;
  }
  #opcionais-title {
    width: 100%;
  }
  .checkbox-container {
    display: flex;
    align-items: flex-start;
    width: 50%;
    margin-bottom: 20px;
    color: #502314;
  }
  .checkbox-container span,
  .checkbox-container input {
    width: auto;
  }
  .checkbox-container span {
    margin-left: 6px;
    font-weight: bold;
  }
  .submit-btn {
    background-color: #502314 ;
    color:#fcba03;
    font-weight: bold;
    border: 2px solid #222;
    padding: 10px;
    font-size: 16px;
    margin: 0 auto;
    cursor: pointer;
    transition: .5s;
    border-radius: 20px;
  }

  @media only screen and (max-width: 600px) {
    body{
      min-height: 100vh;     
      display:flex; 
      flex-direction:column;
    }
    .burger-form{
      display: flex;
      flex-direction: column;
      min-width: 30%;
      max-width: 80vw;
    }
    .input-container,
    .burger__select,
    input{
      min-width: 30%;
      max-width: 70vw;
    }
    .form__background{
      display: flex;
      max-width: 85vw;
    }
  }; 
</style>