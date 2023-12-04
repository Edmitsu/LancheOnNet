<template>
  <div>
    <section id="carrinho" class="carrinho" v-if="openCarrinho">
      <div id="carrinho-nav">
        <div class="nav-items">
          <h3>Carrinho</h3>
          <button @click="abrirCarrinho">Voltar Ao Cardápio</button>
          <button @click="limparCarrinho">Limpar Carrinho</button>
        </div>
      </div>
      <div class="carrinho-container">
        <div class="carrinho-grid">
          <ul>
            <li v-for="item in carrinho" :key="item._id">
              <img :src="getFullImageUrl(item.imagem)" alt="" />
              <h3>{{ item.nome }}</h3>
              <p>R$ {{ formatarPreco(item.preco) }}</p>
              <p class="button-grid">
                <button @click="decrementarQuantidade(item)" id="menos">-</button>
                {{ item.quantity }}
                <button @click="incrementarQuantidade(item)" id="mais">+</button>
              </p>
            </li>
          </ul>
        </div>
      </div>
      <div id="pagamento">
        <button @click="iniciarPagamento">Pagar com cartão</button>
        <button @click="abrirModal">Pagar com Pix</button>
        <select v-model="opcaoEntrega" name="consumo" id="consumo" @change="atualizarOpcaoEntrega">
          <option value="COMER_NO_LOCAL">No Local</option>
          <option value="LEVAR_PARA_CASA">Para Viagem</option>
        </select>
        <p>Total: R$ {{ formatarPreco(precoTotal) }}</p>
      </div>
    </section>
    <section id="openCarrinho" v-else>
      <div class="abrirCarrinho">
        <h3>Carrinho:</h3>
        <ul>
          <li v-for="item in carrinho" :key="item._id">
            <p>{{ item.nome }}</p>
          </li>
        </ul>
        <button @click="abrirCarrinho">Abrir Carrinho</button>
      </div>
    </section>

    <!-- Modal para Pagamento com Pix -->
    <div v-if="mostrarModal" class="modal">
      <div class="modal-content">
        <qrcode-vue :value="qrcode" size="200"></qrcode-vue>
        <span class="pedidoTotal">Total do Pedido</span>
        <p class="totalPreco">R$ {{ formatarPreco(precoTotal) }}</p>
        <hr size="2" width="100%" color="black" />
        <li class="qtd_name" v-for="item in carrinho" :key="item._id">
          {{ item.nome }} - {{ item.quantity }}x
        </li>
        <button @click="fecharModal">Fechar</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import VueQrcode from "vue-qrcode";

export default {
  data() {
    return {
      carrinho: [],
      precoTotal: 0,
      openCarrinho: false,
      stripe: null,
      qrcode: null,
      pixKey: "49415454865",
      mostrarModal: false,
      carrinhoId: null,
      opcaoEntrega: "COMER_NO_LOCAL", 
    };
  },
  created() {
    this.carregarCarrinho();
    this.gerarQRCode();
  },
  mounted() {
    this.loadStripe();
  },
  methods: {
    getFullImageUrl(src) {
      if (src.startsWith("http://") || src.startsWith("https://")) {
        return src;
      } else {
        const baseUrl = "http://localhost:4000";
        const imagePath = src.replace(/\\/g, "/");
        return `${baseUrl}/${imagePath}`;
      }
    },
   
    atualizarOpcaoEntrega() {
  if (!this.carrinhoId) {
    console.error("ID do carrinho não disponível.");
    return;
  }

  console.log('Opção de Entrega:', this.opcaoEntrega);

  axios.put(`http://localhost:4000/carrinho/${this.carrinhoId}/opcao-entrega`, {
    opcaoEntrega: this.opcaoEntrega,
  })
    .then(() => {
      console.log(`Opção de entrega alterada para: ${this.opcaoEntrega}`);
    })
    .catch((error) => {
      console.error('Erro ao atualizar a opção de entrega:', error);
    });
},
carregarCarrinho() {
  axios
    .get("http://localhost:4000/carrinho")
    .then((response) => {
      console.log("Response from server:", response.data);

      // Log the carrinhoId obtained from the server response
      console.log("carrinhoId from server:", response.data.carrinhoId);

      this.carrinho = response.data.carrinhoItens;
      this.precoTotal = response.data.precoTotal;
      
      // Adicione este console.log para verificar o valor de opcaoEntrega
      console.log("opcaoEntrega from server:", response.data.opcaoEntrega);

      // Defina explicitamente a opcaoEntrega para 'LEVAR_PARA_CASA'
      this.opcaoEntrega = response.data.opcaoEntrega || "LEVAR_PARA_CASA";
      
      this.carrinhoId = response.data.carrinhoId || null; // Update to use the correct property
      console.log("Carrinho carregado com sucesso:", this.carrinho);
    })
    .catch((error) => {
      console.error("Erro ao buscar os dados do carrinho:", error);
    });
},
      incrementarQuantidade(item) {
        item.quantity++;
        this.atualizarQuantidadeNoServidor(item);
      },
  
      decrementarQuantidade(item) {
        if (item.quantity > 1) {
          item.quantity--;
          this.atualizarQuantidadeNoServidor(item);
        } else {
          this.removerItemDoCarrinho(item);
        }
      },
  
      atualizarQuantidadeNoServidor(item) {
  axios
    .put(`http://localhost:4000/carrinho/${this.carrinhoId}/${item._id}`, {
      quantity: item.quantity,
    })
    .then((response) => {
      this.precoTotal = response.data.precoTotal;
      console.log("Quantidade atualizada no servidor:", item);
    })
    .catch((error) => {
      console.error("Erro ao atualizar a quantidade do item no carrinho:", error);
    });
},
  
      removerItemDoCarrinho(item) {
        axios
          .delete(`http://localhost:4000/carrinho/${item._id}`)
          .then(() => {
            this.carrinho = this.carrinho.filter((i) => i._id !== item._id);
            this.precoTotal -= item.preco * item.quantity;
            console.log("Item removido do carrinho:", item);
          })
          .catch((error) => {
            console.error("Erro ao remover o item do carrinho:", error);
          });
      },
  
      abrirCarrinho() {
        this.openCarrinho = !this.openCarrinho;
      },
  
      limparCarrinho() {
        axios
          .delete("http://localhost:4000/carrinho")
          .then(() => {
            this.carrinho = [];
            this.precoTotal = 0;
            console.log("Carrinho limpo com sucesso.");
          })
          .catch((error) => {
            console.error("Erro ao limpar o carrinho:", error);
          });
      },
  
          loadStripe() {
      this.stripe = loadStripe("pk_test_51NxEV7H38Iz5TPxORewDemXtarWyU70z5nPDJQXpQzGCfqfcV5wMiKPO67Gqct6lV5EeJqky2QYmLF6rjW4qdDkq00UzO9QZyf"); 
      this.stripe
        .then((stripe) => {
          this.stripe = stripe;
          console.log("Stripe carregado com sucesso:", stripe);
        })
        .catch((error) => {
          console.error("Erro ao carregar o Stripe:", error);
        });
    },
      
    iniciarPagamento() {
    if (this.stripe) {
        axios
            .post("http://localhost:5000/stripe-create-session", {
                items: this.carrinho,
                opcaoEntrega: this.opcaoEntrega,
            })
            .then((response) => {
                const sessionURL = response.data.session_url;
                console.log("URL da sessão obtido com sucesso:", sessionURL);
                window.location.href = sessionURL;

                // Limpar o carrinho após o pagamento
                this.limparCarrinho();
            })
            .catch((error) => {
                console.error("Erro ao iniciar o pagamento:", error);
            });
    } else {
        console.error("Stripe não foi carregado corretamente.");
    }
},

      formatarPreco(preco) {
        return (preco / 100).toFixed(2);
      },
  
      abrirModal() {
        this.mostrarModal = true;
      },
  
      fecharModal() {
        this.mostrarModal = false;
      },
  
      gerarQRCode() {
        const valorTotalEmCentavos = this.precoTotal * 100;
        this.qrcode = `pix://${this.pixKey}?txid=1&uniqueid=2&reusable=true&amount=${valorTotalEmCentavos.toFixed(2)}`;
      },
  
      // Método para recuperar dados do carrinho com base no session_id
      recuperarDadosDoCarrinho(session_id) {
        axios
          .get(`http://localhost:4000/carrinho/${session_id}`)
          .then((response) => {
            const carrinhoData = response.data.carrinhoData;
            this.enviarDadosDoCarrinhoParaPedido(carrinhoData);
          })
          .catch((error) => {
            console.error("Erro ao recuperar dados do carrinho:", error);
          });
      },
  
      // Método para enviar dados do carrinho para a rota de pedidos
      enviarDadosDoCarrinhoParaPedido(carrinhoData) {
  axios
    .post("http://localhost:5000/processar-pagamento-confirmado", {
      carrinhoItens: carrinhoData.items,
      precoTotal: carrinhoData.precoTotal,
    })
    .then((response) => {
      console.log("Resposta da rota de processamento de pagamento confirmado:", response.data);

      // Após o sucesso do pagamento, enviar dados para a rota /pedidos
      axios
        .post("http://localhost:4000/pedidos", {
          carrinhoItens: carrinhoData.items,
          precoTotal: carrinhoData.precoTotal,
        })
        .then((response) => {
          console.log("Resposta da rota /pedidos:", response.data);

          // Limpar carrinho no front-end após o sucesso do pagamento
          this.limparCarrinho();
        })
        .catch((error) => {
          console.error("Erro ao enviar dados para a rota /pedidos:", error.message);
        });
    })
    .catch((error) => {
      console.error("Erro ao enviar dados para a rota de processamento de pagamento confirmado:", error.message);
    });
    }
  },
    components: {
      "qrcode-vue": VueQrcode,
    },
  };
  </script>
  
<style>
  #carrinho-nav {
      display: flex;
      justify-content: space-between;
      position: fixed;
      top: 0;
      left: 0;
      height: var(--carrinho-nav-height);
      width: 100%;
      box-shadow: 2px 0 5px rgba(0, 0, 0, 0.4);
      z-index: 1;
      margin-left: 100px;
      background-color: var(--main-brown);
  }
  .nav-items {
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      width: 100%;
      color: var(--main-white);
  }
  .nav-items button {
      height: 4.5rem;
      padding: 1rem;
  }

  .carrinho-container {
      height: 100%;
      margin-top: calc(var(--carrinho-nav-height) * 2);
      margin-bottom: calc(var(--carrinho-nav-height) * 2);
      overflow-y: scroll;
  }
  .carrinho {
      display: flex;
      justify-content: center;
      position: fixed;
      align-items: center;
      bottom: 0;
      right: 0;
      height: 100%;
      width: calc(100% - 100px);
      background: var(--sec-white);
      z-index: 1;
      padding: 4rem 2rem;
      flex-direction: column;
  }

  .carrinho-grid li {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      align-items: center;
      padding: 1rem 4rem;
      margin: 1rem 0;
      border-top: 2px solid var(--main-white);
      background-color: var(--sec-gray);
  }

  .carrinho-grid img {
      object-fit: contain;
      padding: 2rem;
      min-width: 15rem;
      max-width: 20rem;
  }

  .button-grid {
      display: flex;
      justify-content: space-between;
      align-items: center;
  }

  #menos,
  #mais {
      border-radius: 100%;
      padding: 1rem;
      border-style: none;
      width: 4rem;
      height: 4rem;
      font-weight: bolder;
      cursor: pointer;
  }

  #pagamento {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      width: calc(100% - 100px);
      justify-content: space-between;
      gap: 1rem;
      padding: 1rem 4rem;
      border-top: 2px solid var(--main-white);
      background-color: var(--main-brown);
      position: fixed;
      bottom: 0;
      left: 0;
      margin-left: 100px;
      height: calc(var(--carrinho-nav-height) * 1.5);
  }
  #pagamento button {
      height: 4.5rem;
      font-size: 2rem;
      font-weight: bold;
  }
  #pagamento select {
      text-align: center;
      font-size: 2rem;
      font-weight: bold;
  }

  #pagamento p {
      padding: 2rem;
      background-color: var(--main-white);
      text-align: center;
      font-weight: bolder;
  }

  .abrirCarrinho {
      display: flex;
      justify-content: center;
      position: fixed;
      align-items: center;
      bottom: 0;
      right: 0;
      height: calc(var(--carrinho-nav-height) * 2);
      width: calc(100% - 100px);
      background: var(--main-brown);
      color: var(--sec-white);
      z-index: 1;
      gap: 2rem;
  }

  .abrirCarrinho button {
      height: 4.5rem;
      font-size: 2rem;
      font-weight: bold;
      position: absolute;
      top: -2rem;
  }

  .abrirCarrinho ul {
      display: flex;
      overflow-x: hidden;
      gap: 1rem;
  }

  .openCarrinho-enter-active {
      animation: openCarrinho 1s;
  }
  .openCarrinho-leave-active {
      animation: openCarrinho 1s reverse;
  }
  .modal {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 2;
  }

  .modal-content {
      background: white;
      padding: 1rem;
      border-radius: 5px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
      text-align: center;
      width: 300px;
  }

  .modal-content button {
      margin-top: 1rem;
      padding: 0.5rem 1rem;
      font-size: 1.2rem;
      background-color: var(--main-brown); /* Defina a cor desejada */
      color: var(--sec-white); /* Defina a cor desejada */
      border: none;
      border-radius: 5px;
      cursor: pointer;
  }
  .qtd_name {
      list-style: none;
      font-size: 20px;
      font-weight: bold;
  }
  .totalPreco {
      font-weight: bold;
      padding: 3px;
  }
  .pedidoTotal {
      font-size: 20px;
      font-weight: 500;
  }
  @keyframes openCarrinho {
      0% {
          transform: translateY(100rem);
      }
      100% {
          transform: translateY(0);
      }
  }

  @media (max-width: 650px) {
      #carrinho-nav,
      #pagamento {
          margin-left: 0;
          margin-bottom: 0;
      }

      .abrirCarrinho {
          text-wrap: nowrap;
          padding: 1rem;
      }

      .carrinho,
      .abrirCarrinho {
          width: 100%;
      }

      .carrinho-container {
          width: 100%;
      }

      .carrinho-grid img {
          padding: 1rem;
          width: 350px;
          margin: 0 auto;
          aspect-ratio: 1/1;
          object-fit: cover;
      }

      .carrinho-grid li {
          grid-template-columns: 1fr;
          align-items: center;
      }
      .carrinho-grid p {
          text-align: center;
      }

      #pagamento {
          width: 100%;
          padding: 1rem;
      }

      #pagamento button {
          font-size: 1.4rem;
          padding: 0.5rem;
      }

      #pagamento select {
          font-size: 1.4rem;
      }

      #pagamento p {
          padding: 1rem;
          font-size: 1.4rem;
      }
  }
</style>
