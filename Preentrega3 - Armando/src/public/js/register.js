const form = document.getElementById('registerForm');


form.addEventListener('submit', e => {
    e.preventDefault();
    const data = new FormData(form);
    const obj = {};
    data.forEach((value, key) => obj[key] = value);
    console.log("Objeto formado:");
    console.log(obj);

    fetch('/api/users/register', {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
            'Content-Type': 'application/json'
        }

    }).then(result => {
        if (result.status === 200) {
            alert("Usuario creado con exito");
            window.location.replace('/users/login')
        }
    })
})