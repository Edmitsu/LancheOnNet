<template>
  <div class="main__banner">
    <div class="main-container">
      
      <h1>Gerenciar Pedidos</h1>
      <Dashboard :combos="combos" />
    </div>
  </div>

  
</template>

<script>
import Dashboard from '../components/Dashboard';
import axios from 'axios';

export default {
  name: 'Pedidos',
  components: {
    Dashboard,
  },
  data() {
    return {
      combos: [],
      porcaos:[]
    };
  },
  mounted() {
    this.fetchCombos();
    this.fetchPorcaos();
  },
  methods: {
    fetchCombos() {
      axios.get('http://localhost:3000/combos/')
        .then(response => {
          this.combos = response.data;
        })
        .catch(error => {
          console.log(error); 
        });
    },
    fetchPorcaos() {
      axios.get('http://localhost:3000/porcao/')
        .then(response => {
          this.porcaos = response.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>
.main__banner {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-image: url('../../public/img/burger.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  min-height: 100vh;
}

.main-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ffc765;
  padding: 25px;
  margin: 0 auto;
  border-radius: 10px;
  font-weight: 600;
  box-shadow: #502314 6px 6px 5px;
}

h1 {
  padding: 12px;
  background-color: rgba(80, 35, 20, 0.8);
  border-radius: 10px;
  color: white;
  width: fit-content;
}

@media only screen and (max-width: 600px) {
  .main-container {
    background-color: transparent;
  }
}
</style>
