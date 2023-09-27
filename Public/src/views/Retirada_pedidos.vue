<template>
  <div class="main__banner">
    <div class="main-container">
      <h1>Retire seu Pedido</h1>

    <div class="burger-table-columns">
        
            <h1>Finalizado</h1>
            <div v-if='this.pedido.status = "Finalizado"'>
                <div v-for="pedido in pedidos" :key="pedido.id">
                   <li>
                    {{pedido.id}} {{pedido.nome}} 
                   </li>
                </div>    
            </div>                                           
        
            <h1>Em Produção</h1>
            <div v-for="pedido in pedidos" :key="pedido.id">
                <li>
                    {{pedido.id}} {{pedido.nome}} 
                </li>
            </div>           
      
    </div>
  </div>
</div>
</template>

<script>

export default {
    methods: {
    async getPedidos() {
        const req = await fetch('http://localhost:3000/pedidos')

        const data = await req.json()

        this.pedidos = data

        // Resgata os status de pedidos
        this.getStatus()

      },
      async getStatus() {

        const req = await fetch('http://localhost:3000/status')

        const data = await req.json()

        this.status = data

      },
    },
    mounted () {
    this.getPedidos()
    }
}   

</script>

<style scoped>
.main__banner {
  display: flex;
  flex-direction: column;
  align-items: flex-start;      
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  min-height: 800px;
  min-width: 1000px;
}

.main-container{
  background-color: #ffc765;
  padding: 12px;
  margin: 0 auto;
  border-radius: 10px;
  font-weight: 600;
  box-shadow: #502314  6px 6px 5px;
  min-height: 500px;
}

.burger-table {
    max-width: 1200px;
    margin: 0 auto;
  }

  .order-number{
    padding: 12px;
    height: 150px;
    align-items: center;
    font-weight: 900;
    font-size: 20px;
  }

  .burger-table-columns{
    display: flex;
    flex-direction: column;
  }
  .status{
    padding: 12px;
    background-color: #502314;
    border-radius: 10px;
    color: white;
    width: fit-content;
    opacity: 0.6;
  }

h1{
  padding: 12px;
  background-color: #502314;
  border-radius: 10px;
  color: white;
  width: fit-content;
  opacity: 0.8;
}

</style>