<template>
  <div id="app">

    <nav>
      <div class="nav-wrapper blue darken-1">
        <a href="#" class="brand-logo center">Investimento - Front</a>
      </div>
    </nav>

    <div class="container">
      
      <form @submit.prevent="salvar">

          <div class="input-field col s12">
            <select name="text" v-model="investimento.tipo">
              <option value="" disabled selected>Escolha o tipo de renda</option>
              <option v-for="tipo in tipos" :key="tipo">{{tipo}}</option>
          

            </select>
            <label>Tipo</label>
          </div>
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
      
      <table>
        <thead>

          <tr>
            <th>TOTAL RENDA FIXA</th>
            <th>TOTAL RENDA VARIÁVEL</th>
            <th>% RENDA FIXA</th>
            <th>% RENDA VARIÁVEL</th>
          </tr>
        </thead>
        <p>
        <tbody>
            <tr>
              <td>R$ {{totalFixa}}</td>
              <td>R$ {{totalVariavel}}</td>
              <td>{{percentualRF}}%</td>
              <td>{{percentualRV}}%</td>
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
      investimentos: [],
      totalVariavel: 0,
      totalFixa: 0 
    }
  },

  mounted(){
    this.listar()
  },

  methods:{
    listar(){
      Investimento.listar().then(resposta => {
      this.investimentos = resposta.data
      this.totalFixa = 0
      this.totalVariavel = 0
      // Itera por cada investimento retornado pela API, olhando pro tipo,
      // e caso seja fixa ou variavel, soma o valor ao seu respectivo contador
      this.investimentos.forEach((investimento) => {
        if (investimento['tipo'] == 'Renda Variavel' || investimento['tipo'] == 'Renda Variável') {
         this.totalVariavel += investimento['valor']
        } else {
          this.totalFixa += investimento['valor']
        }
      })
      this.total = this.totalFixa + this.totalVariavel
      this.percentualRF = Math.round((this.totalFixa/this.total)*100)
      this.percentualRV = Math.round((this.totalVariavel/this.total)*100)
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
