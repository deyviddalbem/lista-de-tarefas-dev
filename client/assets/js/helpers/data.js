function dataToInput(data){

    return data.split('T')[0];
}

function dataToString(data){

    let novaData = data.split('T')[0].split('-');
    return novaData[2] + '/' + novaData[1] + '/' + novaData[0];
} 