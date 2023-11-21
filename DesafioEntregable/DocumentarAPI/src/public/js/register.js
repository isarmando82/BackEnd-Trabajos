const form = document.getElementById('formRegistro');
form.addEventListener('submit', e => {
    e.preventDefault();
    const data = new FormData(form);
    const obj = {};
    data.forEach((value, key) => obj[key] = value);
    fetch('/api/sessions/register', {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: new Headers({
            "Content-Type": "application/json"
        })
    }).then(result => {
        if (result.status === 200) {
            window.location.replace('/users/login');
        } else {
            alert('Error al registrarse');
        }
    });
});