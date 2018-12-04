
// Caso o botão pesquisar seja clicado
document.querySelector('#btn-buscar').addEventListener('click', function (event) {
    // Previne que o formulário seja submetido
    event.preventDefault();
    // Montar o formulário
    montarPainel();
});

// Definindo uma tarefa global para auxiliar na alteração de uma tarefa
let tarefa = {};


// Função para montar os cartões
function montarPainel() {

    // Mapeando o painel de tarefas do DOM
    let painelTarefas = document.querySelector('#painelTarefas');
    painelTarefas.innerHTML = '';

    // Capturando o texto da busca
    let filtro = document.querySelector('#texto-busca').value;

    // Espera o resultado da função listarTarefas()
    let promise = listarTarefas(filtro);
    promise
        // Caso o resultado seja processado
        .then(function (response) {

            // Caso não sejam encontradas tarefas via API
            if (response == null) {
                mostrarMensagem('Nenhuma tarefa encontrada para esta busca!', 'd');
            } else {

                // Caso sejam encontradas tarefas via API

                response.forEach(function (item) {
                    // Criando o cartão
                    let cartao = document.createElement('div');
                    cartao.className = 'card';
                    cartao.innerHTML = `
                                <div class="card-body">
                                <div>
                                    <span class="card-subtitle mb-2 text-muted">${dataToString(item.data)}</span>
                                </div>
                                <p class="card-text">${item.descricao}</p>
                                </div>
                            `;
                    // Adicionando o cartão no painel de tarefas
                    painelTarefas.appendChild(cartao);

                    let partesData = dataToString(item.data).split("/");
                    let data = new Date(partesData[2], partesData[1] - 1, partesData[0]);
                    if(item.realizado == 1){
                        cartao.classList.add('td-lt');
                    }
                    if(data < new Date() && item.realizado == 0){
                        cartao.classList.add('card-expirado');
                    }

                

                    cartao.addEventListener('click', function(event){
                        montarFormularioAlterar(item.id);
                        tarefa.id = item.id;
                    });
                });
            }

        })
        // Caso o resultado não seja processado
        .catch(function (error) {
            console.log(error);
        });
}

// Quando o botão adicionar uma nova tarefa for clicado
document.querySelector('#btn-adicionar').addEventListener('click', function (event) {

    event.preventDefault();

    // Mostra o modal
    $('#modal').modal('show');

    // Muda o layout do modal
    document.querySelector('#btn-inserir').classList.remove('nao-mostrar');
    document.querySelector('#btn-alterar').classList.add('nao-mostrar');
    document.querySelector('#btn-deletar').classList.add('nao-mostrar');
    document.querySelector('.modal-title').innerHTML = 'Inserir nova tarefa';

    // Setando o focus no campo descricao-tarefa
    document.querySelector('#descricao-tarefa').focus();

    // Limpando os campos do formulário
    document.querySelector('#descricao-tarefa').value = '';
    document.querySelector('#data-tarefa').value = '';
});

// Quando o botão inserir for clicado
document.querySelector('#btn-inserir').addEventListener('click', function (event) {

    event.preventDefault();
    inserir();
});

// Função para inserir dados via API
function inserir() {

    // Capturar os dados do formulário
    let descricao = document.querySelector('#descricao-tarefa').value;
    let data = document.querySelector('#data-tarefa').value;

    // Criar um objeto tarefa
    let tarefa = {};
    tarefa.descricao = descricao;
    tarefa.data = data;
    tarefa.realizado = false;

    // Inserir uma nova tarefa
    let promise = inserirTarefa(tarefa);
    promise
        .then(function (response) {
            mostrarMensagem('Tarefa inserida com sucesso', 's');
            montarPainel();
        })
        .catch(function (erro) {
            mostrarMensagem(erro, 'd');
        });

    // Mostra o modal
    $('#modal').modal('toggle');
}

// Função que monta o formulário para alterar
function montarFormularioAlterar(id) {

    let promise = listarTarefaPorId(id);
    promise
        .then(function (tarefa) {

            // Campos do formulário
            document.querySelector('#idTarefa').value = tarefa.id;
            document.querySelector('#descricao-tarefa').value = tarefa.descricao;
            document.querySelector('#data-tarefa').value = dataToInput(tarefa.data);

            // Mostra o modal
            $('#modal').modal('show');

            // Muda o layout do modal
            document.querySelector('#btn-inserir').classList.add('nao-mostrar');
            document.querySelector('#btn-alterar').classList.remove('nao-mostrar');
            document.querySelector('#btn-deletar').classList.remove('nao-mostrar');
            document.querySelector('.modal-title').innerHTML = 'Alterar tarefa';

            // Setando o focus no campo descricao-tarefa
            document.querySelector('#descricao-tarefa').focus();

        })
        .catch(function (erro) {
            mostrarMensagem(erro, 'd');
        });
}


// Quando o botão alterar for clicado
document.querySelector('#btn-alterar').addEventListener('click', function(event){
    
    event.preventDefault();

    // Dados do formulário
    tarefa.descricao = document.querySelector('#descricao-tarefa').value;
    tarefa.data = document.querySelector('#data-tarefa').value;

    let promisse = alterarTarefa(tarefa);
    promisse
        .then(function(resolve){

            montarPainel();
            mostrarMensagem('Tarefa alterada com sucesso!', 's');
        })
        .catch(function(erro){
            mostrarMensagem(erro, 'd');
        });

        // Fechar o formulário
        $('#modal').modal('toggle');

});

// Quando clicar no btn-deletar...
document.querySelector('#btn-deletar').addEventListener('click', function(event){

    event.preventDefault();

    let promise = deletarTarefa(tarefa.id);
    promise
        .then(function(resolve){
            mostrarMensagem('Tarefa deletada com sucesso!', 's');
            montarPainel();
        })
        .catch(function(erro){
            mostrarMensagem(erro, 'd');
        });

    // Fechar o formulário
    $('#modal').modal('toggle');
});





function getData(){
    let mData = new Date();
    console.log(mData.getDay());
    console.log(mData.getFullYear());
}

function compararData(dataAnterior){
    let partesData = dataAnterior.split("/");
    let data = new Date(partesData[2], partesData[1] - 1, partesData[0]);
    if(data > new Date()){
        alert('maior');
    }else{
        alert('menor');
    }
}






