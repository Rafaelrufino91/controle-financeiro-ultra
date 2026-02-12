import { useState, useEffect } from "react"
import { getData, saveData } from "../utils/storage"
import ModalFaturaCartao from "./ModalFaturaCartao"

export default function Bancos({ mes }) {
  const [open, setOpen] = useState(false)
  const [editar, setEditar] = useState(null)
  const [faturas, setFaturas] = useState([])

  useEffect(() => {
    atualizarLista()
  }, [mes])

  function atualizarLista() {
    const lancamentos = getData("lancamentos") || []
    const filtrados = lancamentos.filter(
      l => l.mes === mes && l.categoria === "cartao"
    )
    setFaturas(filtrados)
  }

  function excluirFatura(id) {
    const lancamentos = getData("lancamentos") || []
    const atualizado = lancamentos.filter(l => l.id !== id)
    saveData("lancamentos", atualizado)
    atualizarLista()
  }

  return (
    <>
      <div className="card">
        <h2>Faturas de Cartão</h2>

        {faturas.map(f => (
          <div
            key={f.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 8
            }}
          >
            <div>
              <strong>{f.descricao}</strong><br />
              <small>R$ {f.valor}</small>
            </div>

            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={() => setEditar(f)}>✏️</button>
              <button onClick={() => excluirFatura(f.id)}>🗑️</button>
            </div>
          </div>
        ))}
      </div>

      <button className="fab" onClick={() => setOpen(true)}>+</button>

      {(open || editar) && (
        <ModalFaturaCartao
          mes={mes}
          fatura={editar}
          onClose={() => {
            setOpen(false)
            setEditar(null)
          }}
          onSave={() => {
            setOpen(false)
            setEditar(null)
            atualizarLista()
          }}
        />
      )}
    </>
  )
}
