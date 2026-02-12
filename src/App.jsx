import { useState } from "react"
import Dashboard from "./components/Dashboard"
import Lancamentos from "./components/Lancamentos"
import Bancos from "./components/Bancos"
import Receitas from "./components/Receitas"
import SeletorMes from "./components/SeletorMes"
import { gerarPdfRelatorio } from "./utils/gerarPdf"
import { getData } from "./utils/storage"




export default function App(){
  const [pagina,setPagina]=useState("dashboard")
  const [mes, setMes] = useState(new Date().getMonth() + 1)
  const [ano, setAno] = useState(new Date().getFullYear())


  return(
    <div className="container">
      <h1>Controle Financeiro</h1>

      <div>
        <SeletorMes
          mes={mes}
          ano={ano}
          onChange={(novoMes, novoAno) => {
            setMes(novoMes)
            setAno(novoAno)
          }}
        />

      </div>

      {pagina==="dashboard" && <Dashboard mes={mes}/>}
      {pagina==="lancamentos" && <Lancamentos mes={mes}/>}
      {pagina === "bancos" && <Bancos mes={mes} />}
      {pagina === "receitas" && <Receitas mes={mes} />}
      

      <div className="bottom-nav">
          <button 
            className={pagina==="dashboard" ? "active" : ""}
            onClick={()=>setPagina("dashboard")}
          >
            📊 <span>RESUMO</span>
          </button>

          <button 
            className={pagina==="lancamentos" ? "active" : ""}
            onClick={()=>setPagina("lancamentos")}
          >
            📉 <span>LANÇAMENTOS</span>
          </button>

          <button
            className={pagina === "receitas" ? "active" : ""}
            onClick={() => setPagina("receitas")}
          >
            💲 <span>RECEITAS</span>
          </button>

          <button
          className={pagina === "bancos" ? "active" : ""}
          onClick={() => setPagina("bancos")}
        >
          💳 <span>CARTÕES</span>
        </button>
        <button onClick={() => gerarPdfRelatorio(getData("lancamentos"))}>
          📄 <span>PDF</span>
        </button>
        <button
          onClick={() => {
            const ok = window.confirm("⚠️ Tem certeza que deseja apagar TODOS os dados?")
            if (ok) {
              localStorage.removeItem("lancamentos")
              window.location.reload()
            }
          }}
          style={{ background: "#dc2626" }}
        >
          🗑️ LIMPAR
        </button>


      </div>
    </div>
  )
}
