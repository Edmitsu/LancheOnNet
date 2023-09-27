<template>
  <div>
    <div class="nav">
      <router-link class="logo__url" to="/">
        <img class="logo" :src="logo" :alt="alt"> 
        <h1 class="main__text">Lanche.on.Net</h1>
      </router-link> 
      <router-link class="nav_button" to="/">Fazer Pedido</router-link>
      <router-link class="nav_button" to="/pedidos">Pedidos</router-link>
      <router-link class="nav_button" to="/combos">Combos</router-link>
      <router-link class="nav_button" to="/porções">Porções</router-link>
      <router-link class="carrinho" to="/carrinho"><img src="../../public/img/carrinho-de-compras.png" alt="" style="width: 36px;"></router-link>
    </div>
  </div>
</template>

<script>

export default {
  name: "Navbar",
  props: ["logo", "alt"]
}
</script>

<style scoped>

  .nav {
    background-color: #f5ebdc;
    border-bottom: 1px solid #000;
    padding: 15px 50px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  .nav .logo__url {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: auto;
    margin-left: 0;
  }

  .logo {
    width: 40px;
    height: 40px;
  }

  .nav a {
    color: #502314 ;
    text-decoration: none;
    margin: 12px;
    transition: .5s;
    border-radius: 50px;
    color: #f5ebdc;    
    font-weight: bolder;
  }

  .nav a:hover {
    color: #f7a901;
    font-weight: bold;
  }

  .nav_button{
    background-color: #502314 ;
    padding: 10px;
    border-radius: 4%;
    border-color:  transparent ;
    flex-direction: row;
  }
  .main__text{
    display: flex;
    min-width: 30%;
    color: #f5ebdc;    
    background-color: rgba(150,38,38,0.75);
    border-radius: 5px;
    font-size: 20px;
    font-weight: 900;
    padding: 2px;
    margin: 2px;
  } 

  @media only screen and (max-width: 600px) {
    .nav{
      display: flex;
      justify-content: center;
      max-width: 100%;
    }
    .main__text{
      display: none;
    }
  }
</style>