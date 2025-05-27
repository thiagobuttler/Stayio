let btn = document.querySelector('#verSenha') // Seleciona o botão de visualizar senha
let btnConfirm = document.querySelector('#verConfirmSenha') // Seleciona o botão de visualizar confirmação de senha

let nome = document.querySelector('#nome') // Seleciona o input do nome
let labelNome = document.querySelector('#labelNome') // Seleciona o label do nome
let validNome = false // Variável para validar o nome

let cpf = document.querySelector('#cpf') // Seleciona o input do CPF
let labelCpf = document.querySelector('#labelCpf') // Seleciona o label do CPF
let validCpf = false // Variável para validar o CPF

let email = document.querySelector('#email') // Seleciona o input do email
let labelemail = document.querySelector('#labelemail') // Seleciona o label do email
let validemail = false // Variável para validar o email

let senha = document.querySelector('#senha') // Seleciona o input da senha
let labelSenha = document.querySelector('#labelSenha') // Seleciona o label da senha
let validSenha = false // Variável para validar a senha

let confirmSenha = document.querySelector('#confirmSenha') // Seleciona o input de confirmação de senha
let labelConfirmSenha = document.querySelector('#labelConfirmSenha') // Seleciona o label de confirmação de senha
let validConfirmSenha = false // Variável para validar a confirmação de senha

let msgError = document.querySelector('#msgError') // Seleciona a div de mensagem de erro
let msgSuccess = document.querySelector('#msgSuccess') // Seleciona a div de mensagem de sucesso

// Validação do nome ao digitar
nome.addEventListener('keyup', () => {
  if(nome.value.length <= 2){ // Se o nome tiver 2 ou menos caracteres
    labelNome.setAttribute('style', 'color: red') // Muda a cor do label para vermelho
    labelNome.innerHTML = 'Nome *Insira no minimo 3 caracteres' // Mostra mensagem de erro
    nome.setAttribute('style', 'border-color: red') // Muda a borda do input para vermelho
    validNome = false // Marca como inválido
  } else {
    labelNome.setAttribute('style', 'color: green') // Muda a cor do label para verde
    labelNome.innerHTML = 'Nome' // Restaura o texto do label
    nome.setAttribute('style', 'border-color: green') // Muda a borda do input para verde
    validNome = true // Marca como válido
  }
})

// Validação do CPF ao digitar
cpf.addEventListener('keyup', () => {
  if(cpf.value.length < 11){ // Se o CPF tiver menos de 11 dígitos
    labelCpf.setAttribute('style', 'color: red')
    labelCpf.innerHTML = 'cpf *Insira todos os digitos do seu CPF'
    cpf.setAttribute('style', 'border-color: red')
    validCpf = false
  } else if(cpf.value.length > 11){ // Se o CPF tiver mais de 11 dígitos
    labelCpf.setAttribute('style', 'color: red')
    labelCpf.innerHTML = 'cpf *Insira apenas os números do seu CPF'
    cpf.setAttribute('style', 'border-color: red')
    validCpf = false
  } else{
    labelCpf.setAttribute('style', 'color: green')
    labelCpf.innerHTML = 'CPF'
    cpf.setAttribute('style','border-color: green')
    validCpf = true
  }
})

// Validação do email ao digitar
email.addEventListener('keyup', () => {
  if(email.value.length <= 4){ // Se o email tiver 4 ou menos caracteres
    labelemail.setAttribute('style', 'color: red')
    labelemail.innerHTML = 'E-mail inválido'
    email.setAttribute('style', 'border-color: red')
    validemail = false
  } else {
    labelemail.setAttribute('style', 'color: green')
    labelemail.innerHTML = 'E-mail'
    email.setAttribute('style', 'border-color: green')
    validemail = true
  }
})

// Validação da senha ao digitar
senha.addEventListener('keyup', () => {
  if(senha.value.length <= 5){ // Se a senha tiver 5 ou menos caracteres
    labelSenha.setAttribute('style', 'color: red')
    labelSenha.innerHTML = 'Senha *Insira no minimo 6 caracteres'
    senha.setAttribute('style', 'border-color: red')
    validSenha = false
  } else {
    labelSenha.setAttribute('style', 'color: green')
    labelSenha.innerHTML = 'Senha'
    senha.setAttribute('style', 'border-color: green')
    validSenha = true
  }
})

// Validação da confirmação de senha ao digitar
confirmSenha.addEventListener('keyup', () => {
  if(senha.value != confirmSenha.value){ // Se as senhas não forem iguais
    labelConfirmSenha.setAttribute('style', 'color: red')
    labelConfirmSenha.innerHTML = 'Confirmar Senha *As senhas não conferem'
    confirmSenha.setAttribute('style', 'border-color: red')
    validConfirmSenha = false
  } else {
    labelConfirmSenha.setAttribute('style', 'color: green')
    labelConfirmSenha.innerHTML = 'Confirmar Senha'
    confirmSenha.setAttribute('style', 'border-color: green')
    validConfirmSenha = true
  }
})

// Função para cadastrar o usuário
function cadastrar(){
  if(validNome && validCpf && validemail && validSenha && validConfirmSenha){ // Se todos os campos forem válidos
    // Envia os dados para o backend usando fetch
    fetch('http://localhost:3000/usuarios', {
      method: 'POST', // Método POST
      headers: {
        'Content-Type': 'application/json' // Tipo de conteúdo JSON
      },
      body: JSON.stringify({ // Converte os dados para JSON
        nome: nome.value,
        cpf: cpf.value,
        email: email.value,
        senha: senha.value
      })
    })
    .then(response => response.json()) // Converte a resposta para JSON
    .then(data => {
      msgSuccess.setAttribute('style', 'display: block') // Mostra mensagem de sucesso
      msgSuccess.innerHTML = '<strong>Cadastrando usuário...</strong>' // Mensagem de sucesso
      msgError.setAttribute('style', 'display: none') // Esconde mensagem de erro
      msgError.innerHTML = ''
      setTimeout(()=>{
        window.location.href = '../html/signin.html' // Redireciona para a tela de login após 2 segundos
      }, 2000)
    })
    .catch(error => {
      msgError.setAttribute('style', 'display: block') // Mostra mensagem de erro
      msgError.innerHTML = '<strong>Erro ao cadastrar usuário</strong>' // Mensagem de erro
      msgSuccess.innerHTML = ''
      msgSuccess.setAttribute('style', 'display: none') // Esconde mensagem de sucesso
    });
  } else {
    msgError.setAttribute('style', 'display: block') // Mostra mensagem de erro
    msgError.innerHTML = '<strong>Preencha todos os campos corretamente antes de cadastrar</strong>' // Mensagem de erro
    msgSuccess.innerHTML = ''
    msgSuccess.setAttribute('style', 'display: none') // Esconde mensagem de sucesso
  }
}

// Função para voltar para a tela de login
function voltar() {
  window.location.href = '../html/signin.html' // Redireciona para a tela de login
}

// Evento para mostrar ou esconder a senha
btn.addEventListener('click', ()=>{
  let inputSenha = document.querySelector('#senha') // Seleciona o input da senha
  
  if(inputSenha.getAttribute('type') == 'password'){ // Se o tipo for password
    inputSenha.setAttribute('type', 'text') // Mostra a senha
  } else {
    inputSenha.setAttribute('type', 'password') // Esconde a senha
  }
})

// Evento para mostrar ou esconder a confirmação de senha
btnConfirm.addEventListener('click', ()=>{
  let inputConfirmSenha = document.querySelector('#confirmSenha') // Seleciona o input de confirmação de senha
  
  if(inputConfirmSenha.getAttribute('type') == 'password'){ // Se o tipo for password
    inputConfirmSenha.setAttribute('type', 'text') // Mostra a senha
  } else {
    inputConfirmSenha.setAttribute('type', 'password') // Esconde a senha
  }
})




