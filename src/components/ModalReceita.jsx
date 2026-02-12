import { useState, useEffect } from "react"
import { getData, saveData } from "../utils/storage"

export default function ModalReceita({ mes, receita, onClose, onSave }) {
  const [descricao, setDescricao] = useState("")
  const [valor, setValor] = useState("")

  useEffect(() => {
    if (receita) {
      setDescricao(receita.descricao)
      setValor(receita.valor)
    }
  }, [receita])

  function salvar() {
    if (!descricao || !valor) return alert("Preencha todos os campos")

    const lancamentos = getData("lancamentos") || []

    let atualizado

    if (receita) {
      atualizado = lancamentos.map(l =>
        l.id === receita.id
          ? { ...l, descricao, valor: Number(valor) }
          : l
      )
    } else {
      const novo = {
        id: Date.now(),
        descricao,
        valor: Number(valor),
        categoria: "receita",
        mes
      }

      atualizado = [...lancamentos, novo]
    }

    saveData("lancamentos", atualizado)
    onSave()
  }

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <h2>{receita ? "Editar Receita" : "Nova Receita"}</h2>

        <input
          placeholder="Descrição"
          value={descricao}
          onChange={e => setDescricao(e.target.value)}
        />

        <input
          type="number"
          placeholder="Valor"
          value={valor}
          onChange={e => setValor(e.target.value)}
        />

        <div className="modal-actions">
          <button onClick={onClose}>Cancelar</button>
          <button onClick={salvar}>Salvar</button>
        </div>
      </div>
    </div>
  )
}
