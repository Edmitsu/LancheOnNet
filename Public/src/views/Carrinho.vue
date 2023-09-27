<template>
  <div class="carrinho">
    <h2>Seu Carrinho de Pedidos</h2>
    <div v-if="carrinhoItens.length === 0">Seu carrinho está vazio.</div>
    <div v-else>
      <div v-for="(item, index) in carrinhoItens" :key="index" class="carrinho-item">
        <p>Nome: {{ item.nome }}</p>
        <p>Número do Pedido: {{ item.numeroPedido }}</p>
        <p>Quantidade: {{ item.quantidade }}</p>
        <p>Preço: R$ {{ item.preco ? item.preco.toFixed(2) : 'N/A' }}</p>
        <p>Total: R$ {{ (item.quantidade * (item.preco || 0)).toFixed(2) }}</p>
        <div class="carrinho-item-buttons">
          <button @click="aumentarQuantidade(item)">+</button>
          <button @click="diminuirQuantidade(item)">-</button>
          <button @click="excluirPedido(item)">Excluir</button>
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
      carrinhoItens: []
    };
  },
  mounted() {
    this.fetchCarrinhoData();
  },
  methods: {
    async fetchCarrinhoData() {
      try {
        const response = await axios.get('http://localhost:3000/carrinho'); 
        this.carrinhoItens = response.data.carrinhoItens;
      } catch (error) {
        console.error('Erro ao buscar dados do carrinho:', error);
      }
    },

    aumentarQuantidade(item) {
      
      item.quantidade++;
      this.atualizarQuantidadeNoServidor(item);
    },

    diminuirQuantidade(item) {
 
      if (item.quantidade > 1) {
        item.quantidade--;
        this.atualizarQuantidadeNoServidor(item);
      }
    },

    atualizarQuantidadeNoServidor(item) {
      
      axios
        .put(`http://localhost:3000/carrinho/${item._id}`, { quantidade: item.quantidade })
        .then(response => {
          console.log('Quantidade atualizada com sucesso:', response.data);
        })
        .catch(error => {
          console.error('Erro ao atualizar quantidade:', error);
        });
    },

    excluirPedido(item) {
  
      axios
        .delete(`http://localhost:3000/carrinho/${item._id}`)
        .then(response => {
          console.log('Pedido excluído com sucesso:', response.data);

      
          const index = this.carrinhoItens.indexOf(item);
          if (index !== -1) {
            this.carrinhoItens.splice(index, 1);
          }
        })
        .catch(error => {
          console.error('Erro ao excluir pedido:', error);
        });
    }
  }
};
</script>

<style>
.carrinho h2 {
  font-size: 24px;
  margin-bottom: 10px;
}

.carrinho-item {
  border: 1px solid #ddd;
  background-color: #fff;
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.carrinho-item p {
  margin: 0;
}

.carrinho-item-buttons button {
  background-color: #ff6347;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
  margin-left: 5px;
}

.carrinho-item-buttons button:hover {
  background-color: #ff4500;
}
</style>
