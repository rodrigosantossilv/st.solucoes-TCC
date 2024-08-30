<template>
  <div>
    <!-- Cabeçalho -->
    <header class="bg-primary text-white p-3">
      <div class="header-content">
        <img src="/images/ST.KABAN.png" class="imagem-ajustada" alt="Descrição da Imagem">
        <h1 class="text-center">Dashboard</h1>
      </div>
    </header>

    <!-- Estrutura principal com o Dashboard e Kanban -->
    <div class="d-flex">
      <!-- Sidebar (Dashboard) -->
      <div class="sidebar bg-secondary text-white p-3">
        <h2>Opções</h2>
        <ul class="nav flex-column">
          <li class="nav-item">
            <a class="nav-link text-white" @click="mostrarTodos" href="#">Todos</a>
          </li>
          <li class="nav-item">
            <a class="nav-link text-white" @click="mostrarCategoria('Pendente')" href="#">Pendentes</a>
          </li>
          <li class="nav-item">
            <a class="nav-link text-white" @click="mostrarCategoria('Andamento')" href="#">Andamentos</a>
          </li>
          <li class="nav-item">
            <a class="nav-link text-white" @click="mostrarCategoria('Concluído')" href="#">Concluídos</a>
          </li>
        </ul>
      </div>

      <!-- Kanban Board -->
      <div class="kanban-board d-flex justify-content-around flex-grow-1 p-3">
        <!-- Pendente Column -->
        <div
          v-show="mostrarTodosChamados || categoriaVisivel === 'Pendente'"
          id="pendente"
          class="kanban-column"
          @drop="drop($event, 'Pendente')"
          @dragover="allowDrop($event)"
        >
          <h3 class="kanban-header bg-danger text-white p-2 text-center">Pendente</h3>
          <div
            v-for="chamado in chamadosPendentes"
            :key="chamado.id"
            class="kanban-item bg-light p-3 my-2"
            draggable="true"
            @dragstart="drag($event, chamado)"
          >
            <p>{{ chamado.assunto }}</p>
          </div>
        </div>

        <!-- Andamento Column -->
        <div
          v-show="mostrarTodosChamados || categoriaVisivel === 'Andamento'"
          id="andamento"
          class="kanban-column"
          @drop="drop($event, 'Andamento')"
          @dragover="allowDrop($event)"
        >
          <h3 class="kanban-header bg-primary text-white p-2 text-center">Andamento</h3>
          <div
            v-for="chamado in chamadosAndamento"
            :key="chamado.id"
            class="kanban-item bg-light p-3 my-2"
            draggable="true"
            @dragstart="drag($event, chamado)"
          >
            <p>{{ chamado.assunto }}</p>
          </div>
        </div>

        <!-- Concluído Column -->
        <div
          v-show="mostrarTodosChamados || categoriaVisivel === 'Concluído'"
          id="concluido"
          class="kanban-column"
          @drop="drop($event, 'Concluído')"
          @dragover="allowDrop($event)"
        >
          <h3 class="kanban-header bg-success text-white p-2 text-center">Concluído</h3>
          <div
            v-for="chamado in chamadosConcluidos"
            :key="chamado.id"
            class="kanban-item bg-light p-3 my-2"
            draggable="true"
            @dragstart="drag($event, chamado)"
          >
            <p>{{ chamado.assunto }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      chamados: [
        { id: 1, assunto: "Resolver bug no sistema", status: "Pendente" },
        { id: 2, assunto: "Atualizar servidor", status: "Andamento" },
        { id: 3, assunto: "Backup de dados", status: "Concluído" },
      ],
      categoriaVisivel: null,
      mostrarTodosChamados: true,
    };
  },
  computed: {
    chamadosPendentes() {
      return this.chamados.filter(chamado => chamado.status === 'Pendente');
    },
    chamadosAndamento() {
      return this.chamados.filter(chamado => chamado.status === 'Andamento');
    },
    chamadosConcluidos() {
      return this.chamados.filter(chamado => chamado.status === 'Concluído');
    }
  },
  methods: {
    mostrarTodos() {
      this.categoriaVisivel = null;
      this.mostrarTodosChamados = true;
    },
    mostrarCategoria(categoria) {
      this.categoriaVisivel = categoria;
      this.mostrarTodosChamados = false;
    },
    allowDrop(event) {
      event.preventDefault();
    },
    drag(event, chamado) {
      event.dataTransfer.setData('chamado', JSON.stringify(chamado));
    },
    drop(event, novoStatus) {
      event.preventDefault();
      const chamado = JSON.parse(event.dataTransfer.getData('chamado'));
      
      // Atualizar o status do chamado
      this.chamados = this.chamados.map(c => 
        c.id === chamado.id ? { ...c, status: novoStatus } : c
      );
    }
  }
};
</script>

<style scoped>
/* Estilos */
body, html {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  font-family: Arial, sans-serif;
}

header {
  width: 100%;
  background: #0575E6;
  display: flex;
  align-items: center;
  padding: 10px;
  box-sizing: border-box;
}

.header-content {
  display: flex;
  align-items: center;
}

.imagem-ajustada {
  width: 90px;
  height: auto;
  margin-right: 10px;
}

header h1 {
  color: white;
  margin: 0;
  font-size: 1.5rem;
}

.sidebar {
  width: 250px;
  min-height: 100vh;
  background: linear-gradient(to bottom, #0575E6, #02298A, #021B79);
}

.kanban-board {
  display: flex;
  flex-grow: 1;
  gap: 20px;
}

.kanban-column {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.kanban-header {
  width: 100%;
  font-size: 1.5rem;
  text-align: center;
  border-radius: 8px;
}

.kanban-item {
  width: 100%;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
}
</style>
