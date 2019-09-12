
import { http } from './config'


export default{

    listar:() => {
        return http.get('invests');
    },

    salvar:(investimento) => {
        return http.post('invest', investimento);
    },

    atualizar:(investimento) => {
        return http.put('invest', investimento);
    },

    deletar:(investimento) => {
        return http.delete('invest', {data: investimento})
    }
}