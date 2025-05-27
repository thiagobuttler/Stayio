let btn = document.querySelector('.fa-eye'); // Seleciona o botão de mostrar senha

btn.addEventListener('click', ()=> { // Adiciona evento de clique no botão de mostrar senha
    let inputSenha = document.querySelector('#senha'); // Seleciona o input da senha

    if(inputSenha.getAttribute('type') == 'password') { // Se o tipo do input for password
        inputSenha.setAttribute('type', 'text'); // Mostra a senha
    } else {
        inputSenha.setAttribute('type', 'password') // Esconde a senha
    }
})

function entrar() { // Função chamada ao tentar fazer login
    let email = document.querySelector('#email'); // Seleciona o input do email
    let emailLabel = document.querySelector('#emailLabel'); // Seleciona o label do email

    let senha = document.querySelector('#senha'); // Seleciona o input da senha
    let senhaLabel = document.querySelector('#senhaLabel'); // Seleciona o label da senha

    let msgError = document.querySelector('#msgError'); // Seleciona a div de erro

    // Busca os usuários cadastrados no backend
    fetch('http://localhost:3000/usuarios')
    .then(response => response.json()) // Converte a resposta para JSON
    .then(listaUser => { // Recebe a lista de usuários
        let userValid = null; // Variável para armazenar o usuário válido

        // Procura se existe usuário com email e senha iguais aos digitados
        listaUser.forEach((item) => {
            if(email.value == item.email && senha.value == item.senha) { // Se encontrar usuário com email e senha iguais
                userValid = {
                    nome: item.nome,
                    email: item.email,
                    senha: item.senha
                }
            }
        })

        if(userValid) { // Se encontrou usuário válido
            window.location.href = '../../../index.html' // Redireciona para a página principal

            let mathRandom = Math.random().toString(16).substr(2); // Gera parte do token aleatório
            let token = mathRandom + mathRandom; // Cria o token

            localStorage.setItem('token', token) // Salva o token no localStorage
            localStorage.setItem('userLogado', JSON.stringify(userValid)) // Salva o usuário logado no localStorage
        } else { // Se não encontrou usuário válido
            emailLabel.setAttribute('style', 'color: red') // Destaca o label do email em vermelho
            email.setAttribute('style', 'border-color: red') // Destaca o input do email em vermelho
            senhaLabel.setAttribute('style', 'color: red') // Destaca o label da senha em vermelho
            senha.setAttribute('style', 'border-color: red') // Destaca o input da senha em vermelho
            msgError.setAttribute('style', 'display: block') // Mostra a mensagem de erro
            msgError.innerHTML = 'Usuário ou senha incorretos' // Mensagem de erro
            email.focus() // Coloca o foco no campo de email
        }
    })
    .catch(error => { // Se ocorrer erro na requisição
        msgError.setAttribute('style', 'display: block') // Mostra a mensagem de erro
        msgError.innerHTML = 'Erro ao conectar com o servidor' // Mensagem de erro de conexão
    });
}

