let btn = document.querySelector('.fa-eye');

btn.addEventListener('click', ()=> {
    let inputSenha = document.querySelector('#senha');

    if(inputSenha.getAttribute('type') == 'password') {
        inputSenha.setAttribute('type', 'text');
    } else {
        inputSenha.setAttribute('type', 'password')
    }
})

function entrar() {
    let email = document.querySelector('#email');
    let emailLabel = document.querySelector('#emailLabel');

    let senha = document.querySelector('#senha');
    let senhaLabel = document.querySelector('#senhaLabel');

    let msgError = document.querySelector('#msgError');
    let listaUser = []

    let userValid = {
        nome: null,
        email: null,
        senha: null
    }

    listaUser = JSON.parse(localStorage.getItem('listaUser'));

    listaUser?.forEach((item) => {
        if(email.value == item.emailCad && senha.value == item.senhaCad) {

            userValid = {
                nome: item.nomeCad,
                email: item.emailCad,
                senha: item.senhaCad
            }
        }
    })

    if(email.value == userValid.email && senha.value == userValid.senha) {
        window.location.href = '../../../index.html'

        let mathRandom = Math.random().toString(16).substr(2);
        let token = mathRandom + mathRandom;

        localStorage.setItem('token', token)
        localStorage.setItem('userLogado', JSON.stringify(userValid))
    } else {
        emailLabel.setAttribute('style', 'color: red')
        email.setAttribute('style', 'border-color: red')
        senhaLabel.setAttribute('style', 'color: red')
        senha.setAttribute('style', 'border-color: red')
        msgError.setAttribute('style', 'display: block')
        msgError.innerHTML = 'Usuário ou senha incorretos'
        email.focus()
    }
}
