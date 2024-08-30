<template>
  <div id="app">
    <div class="login-container">
      <div class="left-side">
        <img src="/images/ST.png" alt="Logotipo"/>
        <img src="/images/circulos.png" alt="Circles" class="corner-img"/>
      </div>

      <div class="right-side">
        <div class="login-box">
          <h2>Bem-vindo!</h2>
          <input type="text" placeholder="Usuário" v-model="usuario"/>
          <input type="password" placeholder="Senha" v-model="password"/>
          <button @click="login">Login</button>
          <div class="text-center mt-3">
            <p class="mb-0">
              Não tem uma conta? 
              <router-link to="/kanbanboard" class="btn btn-link">Crie uma</router-link>
            </p>
          </div>
        </div>

        <div class="bubbles">
          <div class="bubble"></div>
          <div class="bubble"></div>
          <div class="bubble"></div>
          <div class="bubble"></div>
          <div class="bubble"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      usuario: '',
      password: ''
    };
  },
  methods: {
    login() {
      // Implementar lógica de login aqui
      console.log('Usuário:', this.usuario);
      console.log('Senha:', this.password);
    }
  }
};
</script>

<style scoped>
/* Estilos para a tela de login */
.login-container {
  display: flex;
  height: 100vh;
}

.left-side {
  flex: 1;
  background: #1075e7;
  position: relative;
}

.left-side img {
  width: 97%;
  height: auto;
}

.corner-img {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 50%;
}

.right-side {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
}

.login-box {
  width: 100%;
  max-width: 400px;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.login-box h2 {
  margin-bottom: 1rem;
}

.login-box input {
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.login-box button {
  width: 100%;
  padding: 0.75rem;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: white;
  font-size: 1rem;
  cursor: pointer;
}

.text-center {
  margin-top: 1rem;
}

.bubbles {
  position: absolute;
  bottom: 0;
  right: 0;
  pointer-events: none;
}

.bubble {
  width: 50px;
  height: 50px;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  position: absolute;
  bottom: 0;
  right: 0;
  animation: bubble 10s infinite;
}

@keyframes bubble {
  0% {
    transform: translateY(0);
    opacity: 1;
  }
  100% {
    transform: translateY(-100vh);
    opacity: 0;
  }
}
</style>
