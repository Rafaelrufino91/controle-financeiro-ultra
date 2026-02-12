import { useState, useEffect } from "react"
import { getData, saveData } from "../utils/storage"

export default function ModalFaturaCartao({ mes, fatura, onClose, onSave }) {
  const [banco, setBanco] = useState("")
  const [valor, setValor] = useState("")

  useEffect(() => {
    if (fatura) {
      setBanco(fatura.descricao.replace("Fatura ", ""))
      setValor(fatura.valor)
    }
  }, [fatura])

  function salvar() {
    if (!banco || !valor) return alert("Preencha tudo")

    const lancamentos = getData("lancamentos") || []

    let atualizado

    if (fatura) {
      atualizado = lancamentos.map(l =>
        l.id === fatura.id
          ? { ...l, descricao: `Fatura ${banco}`, valor: Number(valor) }
          : l
      )
    } else {
      const novo = {
        id: Date.now(),
        descricao: `Fatura ${banco}`,
        valor: Number(valor),
        categoria: "cartao",
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
        <h2>{fatura ? "Editar Fatura" : "Nova Fatura"}</h2>

        <input
          placeholder="Nome do cartão"
          value={banco}
          onChange={e => setBanco(e.target.value)}
        />

        <input
          type="number"
          placeholder="Valor da fatura"
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
