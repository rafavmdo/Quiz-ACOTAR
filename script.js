
const perguntas = [
    {
        pergunta: "Qual é o nome da protagonista de ACOTAR?",
        alternativas: ["Nesta", "Feyre", "Elain", "Mor"],
        correta: 1
    },
    {
        pergunta: "Qual é o nome do Grão-Senhor da Corte Noturna?",
        alternativas: ["Tamlin", "Lucien", "Rhysand", "Cassian"],
        correta: 2
    },
    {
        pergunta: "Qual é o nome da irmã mais velha de Feyre?",
        alternativas: ["Elain", "Mor", "Amren", "Nesta"],
        correta: 3
    },
    {
        pergunta: "Qual é o nome da Corte governada por Tamlin?",
        alternativas: [
            "Corte Noturna",
            "Corte Primaveril",
            "Corte Invernal",
            "Corte Diurna"
        ],
        correta: 1
    },
    {
        pergunta: "Qual é o nome do melhor amigo de Rhysand?",
        alternativas: ["Cassian", "Lucien", "Tamlin", "Eris"],
        correta: 0
    },
    {
        pergunta: "Qual é o nome da cidade onde Rhysand vive?",
        alternativas: [
            "Velaris",
            "Adarlan",
            "Terrasen",
            "Orynth"
        ],
        correta: 0
    },
    {
        pergunta: "Quem é a Grã-Sacerdotisa que treina Nesta?",
        alternativas: ["Mor", "Amren", "Gwyn", "Elain"],
        correta: 2
    },
    {
        pergunta: "Qual é o nome do primeiro livro da série?",
        alternativas: [
            "Corte de Névoa e Fúria",
            "Corte de Asas e Ruína",
            "Corte de Gelo e Estrelas",
            "Corte de Espinhos e Rosas"
        ],
        correta: 3
    }
];

let perguntaAtual = 0;
let pontuacao = 0;
let respondeu = false;

const pontosPorAcerto = 10;

const perguntaElemento = document.getElementById("pergunta");
const alternativasElemento = document.getElementById("alternativas");
const resultadoElemento = document.getElementById("resultado");

const botaoComecar = document.getElementById("comecar");
const botaoReiniciar = document.getElementById("reiniciar");

function iniciarQuiz() {
    perguntaAtual = 0;
    pontuacao = 0;

    botaoComecar.style.display = "none";
    botaoReiniciar.style.display = "none";

    mostrarPergunta();
}

function mostrarPergunta() {
    respondeu = false;

    resultadoElemento.textContent = "";

    const pergunta = perguntas[perguntaAtual];

    perguntaElemento.textContent =
        `Pergunta ${perguntaAtual + 1} de ${perguntas.length}: ${pergunta.pergunta}`;

    alternativasElemento.innerHTML = "";

    pergunta.alternativas.forEach((alternativa, index) => {
        const botao = document.createElement("button");

        botao.textContent = alternativa;

        botao.addEventListener("click", () => {
            verificarResposta(index);
        });

        alternativasElemento.appendChild(botao);
    });

    botaoComecar.textContent = "Próxima pergunta";
}

function verificarResposta(index) {
    if (respondeu) return;

    respondeu = true;

    const pergunta = perguntas[perguntaAtual];

    if (index === pergunta.correta) {
        pontuacao += pontosPorAcerto;
        resultadoElemento.textContent = "Resposta correta! +10 pontos 💜";
    } else {
        resultadoElemento.textContent = "Resposta incorreta!";
    }

    const botoes = alternativasElemento.querySelectorAll("button");

    botoes.forEach(botao => {
        botao.disabled = true;
    });

    botaoComecar.style.display = "inline-block";

    if (perguntaAtual === perguntas.length - 1) {
        botaoComecar.textContent = "Ver resultado";
    }
}

function proximaPergunta() {
    if (!respondeu) return;

    perguntaAtual++;

    if (perguntaAtual < perguntas.length) {
        mostrarPergunta();
    } else {
        mostrarResultado();
    }
}

function mostrarResultado() {
    perguntaElemento.textContent = "Fim do quiz! 💜";

    alternativasElemento.innerHTML = "";

    resultadoElemento.innerHTML = `
        <strong>Você fez ${pontuacao} pontos!</strong><br><br>
        Acertos: ${pontuacao / pontosPorAcerto} de ${perguntas.length}<br>
        Pontuação máxima: ${perguntas.length * pontosPorAcerto} pontos.
    `;

    botaoComecar.style.display = "none";
    botaoReiniciar.style.display = "inline-block";
}

function reiniciarQuiz() {
    iniciarQuiz();
}

botaoComecar.addEventListener("click", () => {
    if (perguntaAtual === 0 &&
        !respondeu &&
        alternativasElemento.children.length === 0) {
        iniciarQuiz();
    } else {
        proximaPergunta();
    }
});

botaoReiniciar.addEventListener("click", reiniciarQuiz);
