import { useState, useEffect } from "react"
import { getData } from "../utils/storage"
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts"
import ModalNovoLancamento from "./ModalNovoLancamento"


export default function Dashboard({ mes }) {
  const [open, setOpen] = useState(false)
  const [dados, setDados] = useState([])

  useEffect(() => {
    const lancamentos = getData("lancamentos") || []
    const filtrados = lancamentos.filter(d => d.mes === mes)
    setDados(filtrados)
  }, [mes, open])

  const receita = dados
    .filter(d => d.categoria === "receita")
    .reduce((a, b) => a + Number(b.valor), 0)

  const fixo = dados
    .filter(d => d.categoria === "fixo")
    .reduce((a, b) => a + Number(b.valor), 0)

  const variavel = dados
    .filter(d => d.categoria === "variavel")
    .reduce((a, b) => a + Number(b.valor), 0)

  const cartao = dados
    .filter(d => d.categoria === "cartao")
    .reduce((a, b) => a + Number(b.valor), 0)

  const totalDespesas = fixo + variavel + cartao
  const saldo = receita - totalDespesas

  const meses = [
    "Janeiro","Fevereiro","Março","Abril","Maio","Junho",
    "Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"
  ]
    const data = [
    { name: "Receita", value: receita },
    { name: "Fixo", value: fixo },
    { name: "Variável", value: variavel },
    { name: "Cartão", value: cartao }
  ]


  return (
    <>
      <div className="card">
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <h2>Resumo de {meses[mes - 1]}</h2>
          <button className="fab" onClick={() => setOpen(true)}>+</button>
        </div>

        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={data} dataKey="value" outerRadius={100} label>
              <Cell fill="#22c55e" />  {/* Receita - Verde */}
              <Cell fill="#ef4444" />  {/* Fixo - Vermelho */}
              <Cell fill="#facc15" />  {/* Variável - Amarelo */}
              <Cell fill="#f97316" />  {/* Cartão - Laranja */}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>

        <div className="legenda-grafico">
  <div className="item receita">
    <span className="bolinha verde" />
    <p>Receita: R$ {receita.toFixed(2)}</p>
  </div>

  <div className="item fixo">
    <span className="bolinha vermelho" />
    <p>Custo Fixo: R$ {fixo.toFixed(2)}</p>
  </div>

  <div className="item variavel">
    <span className="bolinha amarelo" />
    <p>Custo Variável: R$ {variavel.toFixed(2)}</p>
  </div>

  <div className="item cartao">
    <span className="bolinha laranja" />
    <p>Cartões: R$ {cartao.toFixed(2)}</p>
  </div>

  <h3 className={`saldo ${saldo >= 0 ? "positivo" : "negativo"}`}>
    Saldo: R$ {saldo.toFixed(2)}
  </h3>
  </div>


      </div>

      {open && (
        <ModalNovoLancamento
          mes={mes}
          onClose={() => setOpen(false)}
          onSave={() => setOpen(false)}
        />
      )}
    </>
  )
}
