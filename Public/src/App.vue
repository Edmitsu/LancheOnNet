<template>
  <div>
    <Navbar :logo="logo_src" :alt="app_name" />
    <div>
      <router-view></router-view>
    </div>
    <Footer/>
  </div>
</template>
<script>
import Navbar from './components/Navbar'
import Footer from './components/Footer'




export default {
  data: function() {
    return {
      logo_src: "/img/logo.png",
      app_name: "Lanche.on.Net"
    }
  },
  components: {
    Navbar,
    Footer
  }
}
</script>

<style>
  /* Importe a fonte Montserrat do Google Fonts */
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700&display=swap');

  * {
    font-family: 'Montserrat', sans-serif;
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  .main-container {
    margin: 50px;
    min-height: 250px;
  }

  h1 {
    text-align: center;
    font-size: 42px;
    margin-bottom: 30px;
    color: #222;
  }
</style>
