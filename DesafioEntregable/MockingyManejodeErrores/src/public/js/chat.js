const socket = io();
const btnEnviarMensaje = document.getElementById('btnEnviarMensaje');

btnEnviarMensaje.addEventListener('click', async () => {
    const userName = document.getElementById('userName').value;
    const message = document.getElementById('message').value;

    const headers = new Headers({
       "Content-Type": "application/x-www-form-urlencoded"
    });

    const data = new URLSearchParams({
        "userName" : userName,
        "message" : message
    });
    try {
        const rta = await fetch('/messages/newChat/', {
            method: 'POST',
            headers: headers,
            body: data
        });
        const resultado = await rta.json();
        if (resultado.status !== 'failed') {
            socket.emit('new-message');
            document.getElementById('message').value = '';
            document.getElementById('message').focus();
            document.getElementById('msjEstado').innerHTML = 'Tu mensaje se ha creado exitosamente!';
        } else {
            document.getElementById('msjEstado').innerHTML = 'ERROR: Verifica los campos y vuelve a intentar.<br>Respuesta: ' + resultado.message ;
        }
    } catch (error) {
        console.log('Error: ' + error);
    }
});

socket.on('messages', messages => {
    let tablaSalida = `
    <table class="table table-bordered table-striped w-75 m-auto">
        <thead>
            <tr>
                <th>Usuario</th>
                <th>Mensaje</th>
            </tr>
        </thead>
        <tbody>`
    if (messages.length === 0) {
        tablaSalida += "<tr><td colspan='2'><i>(No hay mensajes)</i></td></tr>";
    } else {
        messages.forEach(message => {
            tablaSalida += `<tr>
                                <td>${message.user}</td>
                                <td>${message.message}</td>
                            </tr>`;
        })
    }
    tablaSalida += `</tbody></table>`;
    document.getElementById('tablaMensajes').innerHTML = tablaSalida;
});
