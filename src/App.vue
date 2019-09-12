<template>
  <div id="app">

    <nav>
      <div class="nav-wrapper blue darken-1">
        <a href="#" class="brand-logo center">Investimento - Front</a>
      </div>
    </nav>

    <div class="container">
      
      <form @submit.prevent="salvar">

          <label>Tipo</label>
          <input type="text" placeholder="Tipo" v-model="investimento.tipo">
          <label>Valor</label>
          <input type="number" placeholder="Valor" v-model="investimento.valor">
          <label>Data</label>
          <input id="date" type="date" placeholder="Data" v-model="investimento.data"> 

          <button class="waves-effect waves-light btn-small">Salvar<i class="material-icons left">save</i></button>

      </form>

      <table>

        <thead>

          <tr>
            <th>TIPO</th>
            <th>VALOR</th>
            <th>DATA</th>
            <th>OPÇÕES</th>
          </tr>

        </thead>

        <tbody>

          <tr v-for="investimento of investimentos" :key="investimento.id">

            <td>{{investimento.tipo}}</td>
            <td>{{investimento.valor}}</td>
            <td>{{investimento.data}}</td>
            <td>
              <button @click='editar(investimento)' class="waves-effect btn-small blue darken-1"><i class="material-icons">create</i></button>
              <button @click='apagar(investimento)' class="waves-effect btn-small red darken-1"><i class="material-icons">delete_sweep</i></button>
            </td>

          </tr>

        </tbody>
      
      </table>

    </div>

  </div>
</template>

<script>

import Investimento from './services/invests'
export default{

  data(){
    return{
      investimento: {
        id: '',
        tipo: '',
        valor: '',
        data: ''
      },
      investimentos: []
    }
  },

  mounted(){
    this.listar()
  },

  methods:{
    listar(){
      Investimento.listar().then(resposta => {
      this.investimentos = resposta.data
      })
    },
  
    salvar(){
      if(!this.investimento.id){
        Investimento.salvar(this.investimento).then(resposta => {
        this.investimento = {}
        alert('Salvo com sucesso!')
        this.listar()
      })
    }else{
      Investimento.atualizar(this.investimento).then(resposta => {
        this.investimento = {}
        alert('Atualizado com sucesso!')
        this.listar()
    })
    }
      
    },

    editar(investimento){
      this.investimento = investimento;
    },

    apagar(investimento){
      Investimento.deletar(investimento).then(resposta =>{
        this.listar();

      })
      
    }
  }
}
</script>

<style>
  
</style>
