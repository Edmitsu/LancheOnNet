<template>
  <section id="carrinho" class="carrinho">
      <div id="carrinho-nav">
        <div class="nav-items">
          <h3>Carrinho</h3>
          <button>Voltar Ao Cardapio</button>
        </div>
      </div>    
      <div class="carrinho-container">
          <div class="carrinho-grid">
              <ul>
                  <li v-for="item in carrinho" :key="item.id">
                      <img class="" :src="getFullImageUrl(item.imagem)" alt="">
                      <h3>{{ item.nome }}</h3>
                      <p>R$ {{  item.preco }}</p>
                      <p class="button-grid"><button id="menos">-</button> 1 <button id="mais">+</button></p>  
                  </li>             
              </ul>
          </div>
        </div>
        <div id="pagamento">
          <button>pagar pedido</button>
          <button>pagar no caixa</button>
          <select name="consumo" id="consumo">
            <option value="1">No Local</option>
            <option value="2">Pra Viagem</option>
          </select>
          <p>Total: R$ {{ precoTotal }}</p>
        </div>       
  </section>
</template>

<script>
import axios from "axios";

export default {
data() {
  return {
    carrinho: [],
    precoTotal: ''
  };
},
mounted() {
  // Realize a requisição para obter os dados de hamburguers
  axios.get("http://localhost:3000/carrinho")
    .then((response) => {
      this.carrinho = response.data.carrinhoItens;
      this.precoTotal = response.data.precoTotal;
      console.log(this.precoTotal)
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

#carrinho-nav{
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
.nav-items{
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  color: var(--main-white);
}
.nav-items button{
  height: 4.5rem;
  padding: 1rem;
}

.carrinho-container{
  height: 100%;
  margin-top: calc(var(--carrinho-nav-height) * 2);
  margin-bottom: calc(var(--carrinho-nav-height) * 3);
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
   overflow-y: scroll;
 }

 .carrinho-grid li{
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
 }

 .button-grid{
  display: flex;
  justify-content: space-between;
  align-items: center;
 }

 #menos, #mais {
  border-radius: 100%;
  padding: 1rem;
  border-style: none;
  width: 4rem;
  height: 4rem;
  font-weight: bolder;
  cursor: pointer;
 }

 #pagamento{
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
 #pagamento button{
  height: 4.5rem;
 }
 #pagamento select{
  text-align: center;
 }

 #pagamento p{
  padding: 2rem;
  background-color: var(--main-white);
  text-align: center;
 }

 @media (max-width: 28.75em) {
  .carrinho {
    display: flex;
    justify-content: center;
    position: fixed;
    bottom: 0;
    left: 0;
    height: 100px;
    width: 100%;
    box-shadow: 2px 0 5px rgba(0, 0, 0, 0.4);
    z-index: 1;
 }
 }
</style>
