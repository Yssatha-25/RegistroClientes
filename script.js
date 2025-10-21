let pacientes = JSON.parse(localStorage.getItem("pacientes")) || []

const divPacientesCadastrados = document.getElementById("PacientesCadastrados")
const divCadastroPacientes = document.getElementById("SecaoCadastroPacientes")
const divInformacoesHistAtend = document.getElementById("SecaoInformacoesHistAtend")
const divHistoricoAtend = document.getElementById("HistoricoAtendimentos")
const divRegistroAtend = document.getElementById("SecaoRegistroAtendimentos")

let posicaoPacienteAtual = null
let posicaoAtendimentoAtual = null

let editando = false

function AbrirSecaoCadastro() {
    divCadastroPacientes.classList.remove("hidden")
    divPacientesCadastrados.classList.add("hidden")
}
function FecharSecaoCadastro() {
    nomePaciente.value = ""
    cpfPaciente.value = ""
    dataNascPaciente.value = ""
    telefonePaciente.value = ""
    profissaoPaciente.value = ""
    bairroPaciente.value = ""

    editando = false

    divCadastroPacientes.classList.add("hidden")
    divPacientesCadastrados.classList.remove("hidden")
}
function AbrirHistoricoAtend(i) {
    posicaoPacienteAtual = i

    divHistoricoAtend.classList.remove("hidden")
    divPacientesCadastrados.classList.add("hidden")

    AtualizarTabelaHistAtend()
}
function FecharHistoricoAtend() {
    divHistoricoAtend.classList.add("hidden")
    divPacientesCadastrados.classList.remove("hidden")
}
function AbrirSecaoRegistroAtend() {
    divHistoricoAtend.classList.add("hidden")
    divRegistroAtend.classList.remove("hidden")
}
function FecharSecaoRegistroAtend() {
    dataAtend.value = ""
    horarioAtend.value = ""
    servicoAtend.value = ""
    valorAtend.value = ""
    formaPagamentoAtend.value = ""

    divHistoricoAtend.classList.remove("hidden")
    divRegistroAtend.classList.add("hidden")
}

const nomePaciente = document.getElementById("nomePacienteInput")
const cpfPaciente = document.getElementById("cpfPacienteInput")
const dataNascPaciente = document.getElementById("dataNascPacienteInput")
const telefonePaciente = document.getElementById("telefonePacienteInput")
const profissaoPaciente = document.getElementById("profissaoPacienteInput")
const bairroPaciente = document.getElementById("bairroPacienteInput")

const TabelaPacientesCadastrados = document.getElementById("TabelaPacientesCadastrados")
const TabelaPacientesCadastradosInteira = document.getElementById("TabelaPacientesCadastradosInteira")

function CadastrarPaciente() {
    let paciente = {
        nome: nomePaciente.value.trim(),
        cpf: cpfPaciente.value.replace(/\D/g, '').trim(),
        data_nascimento: dataNascPaciente.value.trim(),
        telefone: telefonePaciente.value.replace(/\D/g, '').trim(),
        profissao: profissaoPaciente.value.trim(),
        bairro: bairroPaciente.value.trim(),
        historico_atendimentos: []
    }

    if (editando) {
        paciente.historico_atendimentos = pacientes[posicaoPacienteAtual].historico_atendimentos
        pacientes[posicaoPacienteAtual] = paciente
        editando = false
    }
    else {
        pacientes.push(paciente)
    }

    localStorage.setItem("pacientes", JSON.stringify(pacientes))

    FecharSecaoCadastro()
    AtualizarTabela()
}

window.onload = function () {
    AtualizarTabela()
}

function AtualizarTabela() {
    TabelaPacientesCadastrados.innerHTML = ""

    for (let i = 0; i < pacientes.length; i++) {
        const linha = document.createElement("tr")
        linha.innerHTML = `
                        <th>${pacientes[i].nome.trim()}</th>
                        <th>${pacientes[i].cpf.trim()}</th>
                        <th>${pacientes[i].data_nascimento.trim()}</th>
                        <th>${pacientes[i].telefone.trim()}</th>
                        <th>${pacientes[i].profissao.trim()}</th>
                        <th>${pacientes[i].bairro.trim()}</th>
                        <th><button onclick="ExcluirPaciente(${i})">Exluir</button></th>
                        <th><button onclick="EditarPaciente(${i})">Editar</button></th>
                        <th><button onclick="AbrirHistoricoAtend(${i})">Histórico de atendimentos</button></th>
                    `
        TabelaPacientesCadastrados.appendChild(linha)
    }
}

function ExcluirPaciente(i) {
    const confirmar = confirm("Deseja mesmo excluir esse paciente?")

    if (confirmar) {
        pacientes.splice(i, 1) // remove do array
        localStorage.setItem("pacientes", JSON.stringify(pacientes)) // remove do localstorage

        AtualizarTabela()
    }
}

function EditarPaciente(i) {
    AbrirSecaoCadastro()

    nomePaciente.value = pacientes[i].nome
    cpfPaciente.value = pacientes[i].cpf
    dataNascPaciente.value = pacientes[i].data_nascimento
    telefonePaciente.value = pacientes[i].telefone
    profissaoPaciente.value = pacientes[i].profissao
    bairroPaciente.value = pacientes[i].bairro

    editando = true
    posicaoPacienteAtual = i
}

const dataAtend = document.getElementById("dataAtendInput")
const horarioAtend = document.getElementById("horarioAtendInput")
const servicoAtend = document.getElementById("servicoAtendInput")
const valorAtend = document.getElementById("valorAtendInput")
const formaPagamentoAtend = document.getElementById("formaPagamentoAtendInput")

const TabelaHistoricoAtendimentos = document.getElementById("TabelaHistoricoAtendimentos")
const TabelaHistoricoAtendimentosInteira = document.getElementById("TabelaHistoricoAtendimentosInteira")

function RegistrarAtendimento() {
    let atendimento = {
        data: dataAtend.value.trim(),
        horario: horarioAtend.value.trim(),
        servico: servicoAtend.value.trim(),
        valor: valorAtend.value,
        forma_pagamento: formaPagamentoAtend.value.trim()
    }

    if (editando) {
        pacientes[posicaoPacienteAtual].historico_atendimentos[posicaoAtendimentoAtual] = atendimento
        editando = false
    }
    else {
        pacientes[posicaoPacienteAtual].historico_atendimentos.push(atendimento)
    }

    localStorage.setItem("pacientes", JSON.stringify(pacientes))

    alert("Atendimento registrado com sucesso!")
    AtualizarTabelaHistAtend()
    FecharSecaoRegistroAtend()
}

function AtualizarTabelaHistAtend() {
    if (posicaoPacienteAtual == null)
        return

    if (!pacientes[posicaoPacienteAtual] || !pacientes[posicaoPacienteAtual].historico_atendimentos)
        return

    TabelaHistoricoAtendimentos.innerHTML = ""

    for (let i = 0; i < pacientes[posicaoPacienteAtual].historico_atendimentos.length; i++) {
        const atendimento = pacientes[posicaoPacienteAtual].historico_atendimentos[i]

        const linha = document.createElement("tr")
        linha.innerHTML = `
                        <th>${atendimento.data.trim()}</th>
                        <th>${atendimento.horario.trim()}</th>
                        <th>${atendimento.servico.trim()}</th>
                        <th>${atendimento.valor}</th>
                        <th>${atendimento.forma_pagamento.trim()}</th> 
                        <th><button onclick="EditarAtendimento(${i})">Editar</button></th>
                        <th><button onclick="ExcluirAtendimento(${i})">Excluir</button></th>
                        `

        TabelaHistoricoAtendimentos.appendChild(linha)
    }
}

function ExcluirAtendimento(i) {
    const confirmar = confirm("Deseja mesmo excluir esse atendimento?")

    if (confirmar) {
        pacientes[posicaoPacienteAtual].historico_atendimentos.splice(i, 1)
        localStorage.setItem("pacientes", JSON.stringify(pacientes))

        AtualizarTabelaHistAtend()
    }
}

function EditarAtendimento(i) {
    AbrirSecaoRegistroAtend()

    dataAtend.value = pacientes[posicaoPacienteAtual].historico_atendimentos[i].data
    horarioAtend.value = pacientes[posicaoPacienteAtual].historico_atendimentos[i].horario
    servicoAtend.value = pacientes[posicaoPacienteAtual].historico_atendimentos[i].servico
    valorAtend.value = pacientes[posicaoPacienteAtual].historico_atendimentos[i].valor
    formaPagamentoAtend.value = pacientes[posicaoPacienteAtual].historico_atendimentos[i].forma_pagamento

    editando = true

    posicaoAtendimentoAtual = i
}

const barraPesquisaPacientes = document.getElementById("barraPesquisaPacientes")
const botaoLimparPesquisa = document.getElementById("botaoLimparPesquisa")

const avisoPacienteNaoEncontrado = document.getElementById("avisoPacienteNaoEncontrado")

barraPesquisaPacientes.addEventListener("input", () => {
    if (barraPesquisaPacientes.value.trim() != "") {
        botaoLimparPesquisa.classList.remove("hidden")
    }
    else {
        LimparPesquisaPacientes()
    }
})

function PesquisarPaciente() {
    TabelaPacientesCadastradosInteira.classList.remove("hidden")
    avisoPacienteNaoEncontrado.classList.add("hidden")

    const termo = barraPesquisaPacientes.value.trim().toLowerCase()
    TabelaPacientesCadastrados.innerHTML = ""

    if (termo == "") {
        AtualizarTabela()
        return
    }

    let encontrou = false

    for (let i = 0; i < pacientes.length; i++) {
        const nome = pacientes[i].nome.toLowerCase()
        const telefone = pacientes[i].telefone.toLowerCase()

        if (nome.includes(termo) || telefone.includes(termo)) {
            const linha = document.createElement("tr")

            linha.innerHTML = `
                        <th>${pacientes[i].nome.trim()}</th>
                        <th>${pacientes[i].cpf.trim()}</th>
                        <th>${pacientes[i].data_nascimento.trim()}</th>
                        <th>${pacientes[i].telefone.trim()}</th>
                        <th>${pacientes[i].profissao.trim()}</th>
                        <th>${pacientes[i].bairro.trim()}</th>
                        <th><button onclick="ExcluirPaciente(${i})">Exluir</button></th>
                        <th><button onclick="EditarPaciente(${i})">Editar</button></th>
                        <th><button onclick="AbrirHistoricoAtend(${i})">Histórico de atendimentos</button></th>
                    `
            TabelaPacientesCadastrados.appendChild(linha)
            encontrou = true
        }
    }

    if (encontrou == false) {
        TabelaPacientesCadastradosInteira.classList.add("hidden")
        avisoPacienteNaoEncontrado.classList.remove("hidden")
    }
}

function LimparPesquisaPacientes() {
    barraPesquisaPacientes.value = ""
    TabelaPacientesCadastradosInteira.classList.remove("hidden")
    avisoPacienteNaoEncontrado.classList.add("hidden")
    botaoLimparPesquisa.classList.add("hidden")
    AtualizarTabela()
}

const barraPesquisaAtendimentos = document.getElementById("barraPesquisaAtendimentos")
const botaoLimparPesquisaAtend = document.getElementById("botaoLimparPesquisaAtend")

const avisoAtendimentoNaoEncontrado = document.getElementById("avisoAtendimentoNaoEncontrado")

barraPesquisaAtendimentos.addEventListener("input", () => {
    if (barraPesquisaAtendimentos.value.trim() != "") {
        botaoLimparPesquisaAtend.classList.remove("hidden")
    }
    else {
        LimparPesquisaAtendimentos()
    }
})

function PesquisarAtendimento() {
    TabelaHistoricoAtendimentosInteira.classList.remove("hidden")
    avisoAtendimentoNaoEncontrado.classList.add("hidden")

    const termo = barraPesquisaAtendimentos.value.trim().toLowerCase()
    TabelaHistoricoAtendimentos.innerHTML = ""

    if (termo == "") {
        AtualizarTabelaHistAtend()
        return
    }

    let encontrou = false

    const pacienteAtual = pacientes[posicaoPacienteAtual]
    if (!pacienteAtual || !pacienteAtual.historico_atendimentos) {
        avisoAtendimentoNaoEncontrado.classList.remove("hidden")
        return
    }

    for (let i = 0; i < pacientes[posicaoPacienteAtual].historico_atendimentos.length; i++) {
        const data = pacientes[posicaoPacienteAtual].historico_atendimentos[i].data.toLowerCase()
        const horario = pacientes[posicaoPacienteAtual].historico_atendimentos[i].horario.toLowerCase()
        const servico = pacientes[posicaoPacienteAtual].historico_atendimentos[i].servico.toLowerCase()

        const atendimento = pacientes[posicaoPacienteAtual].historico_atendimentos[i]

        if (data.includes(termo) || horario.includes(termo) || servico.includes(termo)) {
            const linha = document.createElement("tr")

            linha.innerHTML = `
                        <th>${atendimento.data.trim()}</th>
                        <th>${atendimento.horario.trim()}</th>
                        <th>${atendimento.servico.trim()}</th>
                        <th>${atendimento.valor}</th>
                        <th>${atendimento.forma_pagamento.trim()}</th> 
                        <th><button onclick="EditarAtendimento(${i})">Editar</button></th>
                        <th><button onclick="ExcluirAtendimento(${i})">Excluir</button></th>
                        `

            TabelaHistoricoAtendimentos.appendChild(linha)
            encontrou = true
        }
    }

    if (encontrou == false) {
        TabelaHistoricoAtendimentosInteira.classList.add("hidden")
        avisoAtendimentoNaoEncontrado.classList.remove("hidden")
    }
}

function LimparPesquisaAtendimentos() {
    barraPesquisaAtendimentos.value = ""
    TabelaHistoricoAtendimentosInteira.classList.remove("hidden")
    avisoAtendimentoNaoEncontrado.classList.add("hidden")
    botaoLimparPesquisaAtend.classList.add("hidden")
    AtualizarTabelaHistAtend()
}
