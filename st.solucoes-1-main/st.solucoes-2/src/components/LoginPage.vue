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
          <p v-if="usuarioInvalido" class="error-text">Usuário inválido!</p>
          <div class="password-container">
            <input :type="passwordFieldType" placeholder="Senha" v-model="password"/>
            <i @click="togglePasswordVisibility" class="password-icon">
              <span v-if="passwordFieldType === 'password'">👁️</span>
              <span v-else>👁️‍🗨️</span>
            </i>
          </div>
          <p v-if="senhaInvalida" class="error-text">Senha inválida!</p>
          <button @click="login">Login</button>
          <div class="text-center mt-3">
            <p class="mb-0">
              Não tem uma conta? 
              <router-link to="/register" class="btn btn-link">Crie uma</router-link>
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
import Swal from 'sweetalert2';

export default {
  data() {
    return {
      usuario: '',
      password: '',
      usuarioInvalido: false,
      senhaInvalida: false,
      passwordFieldType: 'password',
    };
  },
  methods: {
    login() {
      // Resetar erros
      this.usuarioInvalido = false;
      this.senhaInvalida = false;

      // Simulação de verificação de usuário e senha
      if (this.usuario === '') {
        Swal.fire({
          icon: 'error',
          title: 'Erro!',
          text: 'Usuário não encontrado! Se não tem uma conta, crie uma.',
        });
      } else if (this.usuario === 'admin' && this.password === '123456') {
        Swal.fire({
          icon: 'success',
          title: 'Login realizado!',
          text: 'Bem-vindo ao sistema!',
        }).then(() => {
          // Redirecionar para o dashboard
          this.$router.push('/dashboard');
        });
      } else if (this.usuario !== 'admin') {
        this.usuarioInvalido = true;
      } else {
        this.senhaInvalida = true;
      }
    },
    togglePasswordVisibility() {
      this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
    },
  },
};
</script>


<style scoped>
/* Reset básico */
body, html {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    font-family: Arial, sans-serif;
}
/* Adicionar estilos para o ícone de visibilidade da senha */
.password-container {
  position: relative;
}

.password-container input {
  padding-right: 40px; /* Ajuste para o espaço do ícone */
}

.password-icon {
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  cursor: pointer;
  font-size: 1.2em;
  color: #666;
  user-select: none; /* Impede a seleção do texto do ícone */
}
/* Container de login */
.login-container {
    display: flex;
    height: 100vh;
}

/* Lado esquerdo - Imagem com gradiente */
.left-side {
    flex: 1;
    background: linear-gradient(to bottom, #0575E6, #02298A, #021B79);
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
}

/* Lado direito - Formulário de login */
.right-side {
    flex: 2;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
}

/* Caixa de login */
.login-box {
    width: 85%;
    max-width: 400px;
    padding: 40px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    background-color: #fff;
}

/* Estilo do título */
.login-box h2 {
    margin-bottom: 20px;
    text-align: center;
    color: blue;
}

/* Estilo dos inputs */
.login-box input {
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 15px;
    box-sizing: border-box;
}

/* Botão de login */
.login-box button {
    width: 100%;
    padding: 11px;
    background-color: rgb(8, 91, 143);
    color: white;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

/* Efeito de hover no botão */
.login-box button:hover {
    background-color: rgb(11, 55, 135);
}

/* Estilo do link "Crie uma" */
.login-box .btn-link {
    color: rgb(8, 91, 143);
    text-decoration: none;
}

.login-box .btn-link:hover {
    text-decoration: underline;
}

/* Imagem no canto */
.corner-img {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 750px;
    height: auto;
}

/* Responsividade adicional */
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

/* Bolhas de animação */
.bubbles {
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    overflow: hidden;
}

.bubble {
    position: absolute;
    width: 50px;
    height: 50px;
    background-color: rgba(0, 123, 255, 0.153);
    border-radius: 50%;
    animation: float 10s infinite;
    opacity: 0;
}

@keyframes float {
    0% {
        transform: translateY(100vh) scale(0);
        opacity: 0;
    }
    50% {
        transform: translateY(-50vh) scale(1);
        opacity: 1;
    }
    100% {
        transform: translateY(-100vh) scale(0);
        opacity: 0;
    }
}

.bubbles .bubble:nth-child(1) {
    right: 5%;
    animation-duration: 8s;
    animation-delay: 0s;
}
.bubbles .bubble:nth-child(2) {
    right: 10%;
    animation-duration: 10s;
    animation-delay: 2s;
}
.bubbles .bubble:nth-child(3) {
    right: 15%;
    animation-duration: 12s;
    animation-delay: 4s;
}
.bubbles .bubble:nth-child(4) {
    right: 20%;
    animation-duration: 15s;
    animation-delay: 6s;
}
.bubbles .bubble:nth-child(5) {
    right: 25%;
    animation-duration: 20s;
    animation-delay: 9s;
}
/* Adicionando apenas estilo para mensagens de erro */
.error-text {
  color: red;
  font-size: 0.9em;
  margin: 5px 0 10px 0;
}
</style>
