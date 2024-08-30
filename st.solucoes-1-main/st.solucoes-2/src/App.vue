<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
};
</script>

<style>
/* Adicione seus estilos globais aqui */
.login-container {
    display: flex;
    height: 100vh;
  }
  
  .left-side {
    flex: 1;
    background: linear-gradient(to bottom, #0575e6, #02298a, #021b79);
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
  }
  
  .right-side {
    flex: 2;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .login-box {
    width: 85%;
    max-width: 400px;
    padding: 40px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    background-color: #fff;
  }
  
  .login-box h2 {
    margin-bottom: 20px;
    text-align: center;
    color: blue;
  }
  
  .login-box .form-control {
    margin-bottom: 10px;
    border-radius: 15px;
  }
  
  .login-box .btn {
    width: 100%;
    padding: 11px;
  }
  
  .invalid-feedback {
    display: block;
    color: red;
  }
  
  .corner-img {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 750px;
    height: auto;
  }
  
  @media (max-width: 768px) {
    .login-container {
      flex-direction: column;
    }
  
    .left-side {
      display: none;
    }
  
    .right-side {
      flex: 1;
    }
  
    .corner-img {
      display: none;
    }
  }
</style>
