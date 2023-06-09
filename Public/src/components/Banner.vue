<template>
  <div class="main__banner">
  </div>
</template>

<script> 
import BurgerForm from './BurgerForm.vue';
  export default {
    name: "Banner",
    components: { BurgerForm }
}
</script>

<style scoped>
  .main__banner {
    background-image: url('../../public/img/burger.jpg');
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    display: flex;
    flex-direction: column;
    align-items: flex-start;  
    min-height: fit-content;    
  }
 
  

</style>