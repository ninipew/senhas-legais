// Seleciona o elemento que mostra o número de caracteres da senha
const numeroSenha = document.querySelector('.parametro-senha__texto');

// Define o tamanho inicial da senha como 12
let tamanhoSenha = 12;

// Atualiza o texto exibido com o tamanho inicial da senha
numeroSenha.textContent = tamanhoSenha;

// Conjuntos de caracteres que podem ser usados na senha
const letrasMaiusculas = 'ABCDEFGHIJKLMNOPQRSTUVXYWZ';
const letrasMinusculas = 'abcdefghijklmnopqrstuvxywz';
const numeros = '0123456789';
const simbolos = '!@%*?';

// Seleciona os botões "+" e "-" de ajuste do tamanho da senha
const botoes = document.querySelectorAll('.parametro-senha__botao');

// Seleciona o campo de texto onde a senha gerada será exibida
const campoSenha = document.querySelector('#campo-senha');

// Seleciona todas as checkboxes que definem os tipos de caracteres da senha
const checkbox = document.querySelectorAll('.checkbox');

// Seleciona o elemento que mostra a força da senha visualmente
const forcaSenha = document.querySelector('.forca');

// Define o que acontece quando o botão "-" é clicado
botoes[0].onclick = diminuiTamanho;

// Define o que acontece quando o botão "+" é clicado
botoes[1].onclick = aumentaTamanho;

// Função que diminui o tamanho da senha, respeitando o limite mínimo de 1
function diminuiTamanho() {
    if (tamanhoSenha > 1) {
        tamanhoSenha--; // Decrementa o tamanho
    }
    numeroSenha.textContent = tamanhoSenha; // Atualiza a exibição
    geraSenha(); // Gera nova senha com o novo tamanho
}

// Função que aumenta o tamanho da senha, respeitando o limite máximo de 20
function aumentaTamanho() {
    if (tamanhoSenha < 20) {
        tamanhoSenha++; // Incrementa o tamanho
    }
    numeroSenha.textContent = tamanhoSenha; // Atualiza a exibição
    geraSenha(); // Gera nova senha com o novo tamanho
}

// Associa a função geraSenha a cada clique em uma das checkboxes
for (i = 0; i < checkbox.length; i++) {
    checkbox[i].onclick = geraSenha;
}

// Gera a primeira senha assim que a página carrega
geraSenha();

// Função principal que gera a senha
function geraSenha() {
    let alfabeto = ''; // Inicializa o conjunto de caracteres permitidos

    // Adiciona letras maiúsculas, se marcado
    if (checkbox[0].checked) {
        alfabeto = alfabeto + letrasMaiusculas;
    }
    // Adiciona letras minúsculas, se marcado
    if (checkbox[1].checked) {
        alfabeto = alfabeto + letrasMinusculas;
    }
    // Adiciona números, se marcado
    if (checkbox[2].checked) {
        alfabeto = alfabeto + numeros;
    }
    // Adiciona símbolos, se marcado
    if (checkbox[3].checked) {
        alfabeto = alfabeto + simbolos;
    }

    let senha = ''; // Inicializa a senha

    // Gera a senha caractere por caractere
    for (let i = 0; i < tamanhoSenha; i++) {
        let numeroAleatorio = Math.random() * alfabeto.length; // Número aleatório
        numeroAleatorio = Math.floor(numeroAleatorio); // Arredonda para baixo
        senha = senha + alfabeto[numeroAleatorio]; // Adiciona o caractere correspondente
    }

    campoSenha.value = senha; // Mostra a senha no campo de texto
    classificaSenha(alfabeto.length); // Avalia a força da senha
}

// Função que calcula a entropia e classifica a força da senha
function classificaSenha(tamanhoAlfabeto) {
    // Cálculo da entropia da senha: tamanho da senha * log2 do número de caracteres possíveis
    let entropia = tamanhoSenha * Math.log2(tamanhoAlfabeto);
    console.log(entropia); // Exibe a entropia no console (opcional para debug)

    // Remove qualquer classe de força anterior
    forcaSenha.classList.remove('fraca','media','forte');

    // Classifica a força com base na entropia
    if (entropia > 57) {
        forcaSenha.classList.add('forte');
    } else if (entropia > 35 && entropia < 57) {
        forcaSenha.classList.add('media');
    } else if (entropia <= 35) {
        forcaSenha.classList.add('fraca');
    }

    // Exibe o tempo estimado que um computador levaria para quebrar a senha
    const valorEntropia = document.querySelector('.entropia');
    valorEntropia.textContent = "Um computador pode levar até " + Math.floor(2 ** entropia / (100e6 * 60 * 60 * 24)) + " dias para descobrir essa senha.";
}

