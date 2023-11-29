const btnActualizarUsuario = document.getElementById('btnActualizarUsuario');

btnActualizarUsuario.addEventListener('click', async () => {
    const first_name = document.getElementById('first_name').value;
    const last_name = document.getElementById('last_name').value;
    const email = document.getElementById('email').value;
    const age = document.getElementById('age').value;
    const uid = document.getElementById('uid').value;
    const role = document.getElementById('rol').value;
    if (!first_name || !last_name || !email || !age || isNaN(age) || age < 0 || !uid) {
        return alert('Todos los campos son obligatorios');
    } else {
        const user = {
            first_name,
            last_name,
            email,
            age,
            role
        };
        const response = await fetch('/current/' + uid + '/update', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });
        if (response.status === 200) {
            location.href = '/current';
        } else {
            alert('Error al actualizar el usuario');
        }
    }
});