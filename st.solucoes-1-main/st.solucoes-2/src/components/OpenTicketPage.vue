<template>
    <div class="container">
      <h2>Informe seu problema</h2>
      <b-form @submit.prevent="reportProblem">
        <b-form-group label="Bloco da sala*">
          <b-form-input v-model="bloco" required></b-form-input>
        </b-form-group>
        <b-form-group label="Número da sala*">
          <b-form-input v-model="numeroSala" required></b-form-input>
        </b-form-group>
        <b-form-group label="Código da máquina*">
          <b-form-input v-model="codigoMaquina" required></b-form-input>
        </b-form-group>
        <b-form-group label="Relatar problema*">
          <b-form-textarea v-model="relatarProblema" rows="4" required></b-form-textarea>
        </b-form-group>
        <b-button type="submit" variant="primary">Relatar Problema</b-button>
      </b-form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        bloco: '',
        numeroSala: '',
        codigoMaquina: '',
        relatarProblema: ''
      };
    },
    methods: {
      async reportProblem() {
        if (this.bloco && this.numeroSala && this.codigoMaquina && this.relatarProblema) {
          try {
            const response = await fetch('http://localhost:3000/report-problem', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                bloco: this.bloco,
                numeroSala: this.numeroSala,
                codigoMaquina: this.codigoMaquina,
                relatarProblema: this.relatarProblema
              })
            });
  
            const data = await response.json();
  
            if (response.ok) {
              this.$swal.fire({
                icon: 'success',
                title: 'Problema relatado com sucesso',
                text: data.message
              });
              this.$router.push('/');
            } else {
              this.$swal.fire({
                title: 'Erro!',
                text: `Falha ao relatar o problema: ${data.error}`,
                icon: 'error'
              });
            }
          } catch (error) {
            this.$swal.fire({
              title: 'Erro!',
              text: `Erro ao conectar ao servidor: ${error.message}`,
              icon: 'error'
            });
          }
        } else {
          this.$swal.fire({
            title: 'Aviso!',
            text: 'Por favor, preencha todos os campos',
            icon: 'warning'
          });
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .container {
    max-width: 600px;
    margin: 0 auto;
    padding-top: 50px;
  }
  </style>
  