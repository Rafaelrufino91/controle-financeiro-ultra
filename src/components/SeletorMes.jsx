export default function SeletorMes({ mes, ano, onChange }) {
  const meses = [
    "Janeiro","Fevereiro","Março","Abril","Maio","Junho",
    "Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"
  ]

  return (
    <div style={{ display: "flex", gap: "8px", marginBottom: "20px" }}>
      {meses.map((nome, index) => {
        const numeroMes = index + 1
        const ativo = numeroMes === mes

        return (
          <button
            key={numeroMes}
            onClick={() => onChange(numeroMes, ano)}
            style={{
              padding: "8px 14px",
              borderRadius: "999px",
              border: "none",
              background: ativo ? "#10b981" : "#1f2937",
              color: ativo ? "white" : "#9ca3af",
              cursor: "pointer",
              fontWeight: "600"
            }}
          >
            {nome} de {ano}
          </button>
        )
      })}
    </div>
  )
}
