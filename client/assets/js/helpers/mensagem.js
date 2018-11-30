function mostrarMensagem(texto, tipo){

    let mensagem = document.querySelector('#mensagem');
    mensagem.innerHTML = texto;

    if (tipo == 's'){
        mensagem.className = 'alert alert-success mt-2';
    } else if (tipo == 'd'){
        mensagem.className = 'alert alert-danger mt-2';
    }

    setTimeout(function(){
        mensagem.className = 'nao-mostrar';
    }, 3000);
}