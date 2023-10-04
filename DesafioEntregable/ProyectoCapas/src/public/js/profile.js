const logout = document.getElementById('logout');
const accessAdmin = document.getElementById('accessAdmin');


logout.addEventListener('click', e => {
    e.preventDefault();
    fetch('/api/users/logout', {
        method: 'GET',
    }).then(result => {
        if (result.status === 200) {
            alert('Sesion cerrada');
            window.location.replace('/users/login');
        }
    })
})


accessAdmin.value === "admin" ? "" : accessAdmin.style.display = "none";
accessAdmin.addEventListener('click', e => {
    e.preventDefault();
    console.log(accessAdmin.value);
    window.location.replace(`/api/users/private/${accessAdmin.value}`);
});

