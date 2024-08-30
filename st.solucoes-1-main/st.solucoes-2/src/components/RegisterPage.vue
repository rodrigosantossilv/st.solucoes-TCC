<template>
  <div class="register-container">
    <div class="left-side">
      <img src="/images/ST.png" alt="Logotipo"/>
      <img src="/images/circulos.png" alt="Circles" class="corner-img"/>
    </div>

    <div class="right-side">
      <div class="register-box">
        <h2>Cadastrar</h2>

        <form @submit.prevent="handleSubmit">
          <input type="text" v-model="nome" placeholder="Nome completo" required />
          <input type="text" v-model="instituicao" placeholder="Instituição de ensino" required />
          <input type="text" v-model="cep" placeholder="CEP" @blur="fetchCep" required />
          <input type="email" v-model="email" placeholder="Email" required />
          <input type="email" v-model="confirmEmail" placeholder="Confirmar email" required />
          <input type="password" v-model="senha" placeholder="Senha" required />
          <input type="password" v-model="confirmSenha" placeholder="Confirmar senha" required />

          <button type="submit">Cadastrar</button>

          <div v-if="feedback" :class="{'text-success': isSuccess, 'text-danger': !isSuccess}" class="mt-2">
            {{ feedback }}
          </div>
        </form>

        <div class="text-center mt-3">
          <p class="mb-0">
            Já tem uma conta? 
            <router-link to="/" class="btn btn-link">Login</router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nome: '',
      instituicao: '',
      cep: '',
      email: '',
      confirmEmail: '',
      senha: '',
      confirmSenha: '',
      feedback: '',
      isSuccess: false
    };
  },
  methods: {
    handleSubmit() {
      this.feedback = '';
      this.isSuccess = false;

      if (!this.email.includes('@')) {
        this.feedback = 'Email inválido';
        this.isSuccess = false;
        return;
      }

      if (this.senha.length < 8) {
        this.feedback = 'A senha deve ter pelo menos 8 caracteres';
        this.isSuccess = false;
        return;
      }

      if (this.senha !== this.confirmSenha) {
        this.feedback = 'As senhas não coincidem';
        this.isSuccess = false;
        return;
      }

      if (this.email !== this.confirmEmail) {
        this.feedback = 'Os emails não coincidem';
        this.isSuccess = false;
        return;
      }

      this.feedback = 'Cadastro realizado com sucesso!';
      this.isSuccess = true;
    },

    fetchCep() {
      const cep = this.cep.replace(/\D/g, '');
      if (cep.length === 8) {
        fetch(`https://viacep.com.br/ws/${cep}/json/`)
          .then(response => response.json())
          .then(data => {
            if (data.erro) {
              this.feedback = 'CEP não encontrado';
              this.isSuccess = false;
            } else {
              // Preencher os campos adicionais se necessário
              console.log(`${data.logradouro}, ${data.bairro}, ${data.localidade} - ${data.uf}`);
            }
          })
          .catch(() => {
            this.feedback = 'Erro ao buscar CEP';
            this.isSuccess = false;
          });
      }
    }
  }
};
</script>

<style scoped>
/* Estilos para a página de cadastro */
.register-container {
  display: flex;
  height: 100vh;
}

.left-side {
  flex: 1;
  background: #1075e7;
  position: relative;
}

.left-side img {
  width: 100%;
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

.register-box {
  width: 100%;
  max-width: 400px;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.register-box h2 {
  margin-bottom: 1rem;
}

.register-box input {
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.register-box button {
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
</style>
