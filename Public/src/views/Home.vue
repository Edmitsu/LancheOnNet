<template>
  <div class="main__banner">
    <BurgerForm class="form"/>    
  </div>
</template>

<script>
import Banner from '../components/Banner'
import BurgerForm from '../components/BurgerForm.vue'


export default {
  name: 'Home',
  components: {
    Banner,
    BurgerForm,
    
  }
}
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

    @media only screen and (max-width: 600px) {
      .main__banner{
        align-items: center;
      }
    }

</style>