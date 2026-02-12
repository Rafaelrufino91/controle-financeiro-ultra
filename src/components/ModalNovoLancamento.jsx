import { useState } from "react"
import { getData, saveData } from "../utils/storage"

export default function ModalNovoLancamento({ mes, onClose, onSave }) {
  const [descricao, setDescricao] = useState("")
  const [valor, setValor] = useState("")
  const [categoria, setCategoria] = useState("fixo")

  function handleSave() {
    const lancamentos = getData("lancamentos")

    const novo = {
      id: Date.now(),
      descricao,
      valor: Number(valor),
      categoria,
      mes
    }

    saveData("lancamentos", [...lancamentos, novo])
    onSave()
  }

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <h2>Novo Lançamento</h2>

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

        <select value={categoria} onChange={e => setCategoria(e.target.value)}>
          <option value="fixo">Fixo</option>
          <option value="variavel">Variável</option>
          <option value="cartao">Cartão</option>
        </select>

        <div className="modal-actions">
          <button onClick={onClose}>Cancelar</button>
          <button onClick={handleSave}>Salvar</button>
        </div>
      </div>
    </div>
  )
}
