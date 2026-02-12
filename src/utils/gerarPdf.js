import jsPDF from "jspdf"
import autoTable from "jspdf-autotable"

export function gerarPdfRelatorio(lancamentos) {
  const doc = new jsPDF()

  doc.setFontSize(16)
  doc.text("Relatório Financeiro - Consolidado", 14, 20)

  const meses = [
    "Janeiro","Fevereiro","Março","Abril","Maio","Junho",
    "Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"
  ]

  const dadosPorMes = {}

  lancamentos.forEach(l => {
    const chave = `${l.mes}-${l.ano}`
    if (!dadosPorMes[chave]) {
      dadosPorMes[chave] = { fixo: 0, variavel: 0, cartao: 0, receita: 0 }
    }
    dadosPorMes[chave][l.categoria] += l.valor
  })

  const rows = Object.entries(dadosPorMes).map(([chave, valores]) => {
    const [mes, ano] = chave.split("-")
    return [
      `${meses[mes - 1]} / ${ano}`,
      valores.fixo.toFixed(2),
      valores.variavel.toFixed(2),
      valores.cartao.toFixed(2),
      valores.receita.toFixed(2),
      (valores.receita - (valores.fixo + valores.variavel + valores.cartao)).toFixed(2)
    ]
  })

  autoTable(doc, {
    startY: 30,
    head: [["Mês/Ano", "Fixo", "Variável", "Cartão", "Receita", "Saldo"]],
    body: rows
  })

  doc.save("relatorio-financeiro.pdf")
}
