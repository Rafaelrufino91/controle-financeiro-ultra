import { useState,useEffect } from "react"
import { getData,saveData } from "../utils/storage"

export default function Lancamentos({mes}){

  const [descricao,setDescricao]=useState("")
  const [valor,setValor]=useState("")
  const [categoria,setCategoria]=useState("fixo")
  const [dados,setDados]=useState([])
  const meses = [
  "Janeiro","Fevereiro","Março","Abril","Maio","Junho",
  "Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"];


  useEffect(()=>{
    setDados(getData("lancamentos"))
  },[])

  const salvar=()=>{
    const novo={
      id:Date.now(),
      descricao,
      valor:Number(valor),
      categoria,
      mes
    }
    const atual=[...dados,novo]
    setDados(atual)
    saveData("lancamentos",atual)
    setDescricao("");setValor("")
  }

  const deletar=(id)=>{
    const atual=dados.filter(d=>d.id!==id)
    setDados(atual)
    saveData("lancamentos",atual)
  }

  const editar=(id)=>{
    const item=dados.find(d=>d.id===id)
    const novaDescricao=prompt("Nova descrição",item.descricao)
    const novoValor=prompt("Novo valor",item.valor)
    if(novaDescricao!==null && novoValor!==null){
      const atual=dados.map(d=>
        d.id===id ? {...d,descricao:novaDescricao,valor:Number(novoValor)} : d
      )
      setDados(atual)
      saveData("lancamentos",atual)
    }
  }

  const filtrados=dados.filter(d=>d.mes===mes)

  return(
    <div id="form-lancamento" className="card">
      <h2>Lançamentos - {meses[mes - 1]}</h2>

      <input placeholder="Descrição" value={descricao} onChange={e=>setDescricao(e.target.value)}/>
      <input type="number" placeholder="Valor" value={valor} onChange={e=>setValor(e.target.value)}/>

      <select onChange={e=>setCategoria(e.target.value)}>
        <option value="fixo">Fixo</option>
        <option value="variavel">Variável</option>
        <option value="cartao">Cartão</option>
        <option value="receita">Receita</option>
      </select>

      <button onClick={salvar}>Adicionar</button>

      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Valor</th>
            <th>Categoria</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {filtrados.map(d=>(
            <tr key={d.id}>
              <td>{d.descricao}</td>
              <td>R$ {d.valor}</td>
              <td>{d.categoria}</td>
              <td>
                <button onClick={()=>editar(d.id)}>Editar</button>
                <button onClick={()=>deletar(d.id)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
