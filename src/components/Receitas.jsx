import { useState, useEffect } from "react"
import { getData, saveData } from "../utils/storage"
import ModalReceita from "./ModalReceita"

export default function Receitas({ mes }) {
  const [open, setOpen] = useState(false)
  const [editar, setEditar] = useState(null)
  const [receitas, setReceitas] = useState([])



  useEffect(() => {
    atualizarLista()
  }, [mes])

  function atualizarLista() {
    const lancamentos = getData("lancamentos") || []
    const filtrados = lancamentos.filter(
      l => l.mes === mes && l.categoria === "receita"
    )
    setReceitas(filtrados)
  }

  function excluir(id) {
    const lancamentos = getData("lancamentos") || []
    const atualizado = lancamentos.filter(l => l.id !== id)
    saveData("lancamentos", atualizado)
    atualizarLista()
  }

  const total = receitas.reduce((a, b) => a + b.valor, 0)

  return (
    <>
      <div className="card">
        <h2>Receitas</h2>

        {receitas.map(r => (
          <div
            key={r.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 8
            }}
          >
            <div>
              <strong>{r.descricao}</strong><br />
              <small>R$ {r.valor}</small>
            </div>

            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={() => setEditar(r)}>✏️</button>
              <button onClick={() => excluir(r.id)}>🗑️</button>
            </div>
          </div>
        ))}

        <h3 style={{ marginTop: 20 }}>Total Receitas: R$ {total}</h3>
      </div>

      <button className="fab" onClick={() => setOpen(true)}>+</button>

      {(open || editar) && (
        <ModalReceita
          mes={mes}
          receita={editar}
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
