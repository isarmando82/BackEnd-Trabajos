const form = document.getElementById('formLogin');
form.addEventListener('submit', e => {
    e.preventDefault();
    const data = new FormData(form);
    const obj = {};
    data.forEach((value, key) => obj[key] = value);
    fetch('/api/sessions/login', {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: new Headers({
            "Content-Type": "application/json"
        })
    }).then(result => {
        if (result.status === 200) {
            window.location.replace('/products');
        } else {
            alert('Error al iniciar sesión');
        }
    });
});