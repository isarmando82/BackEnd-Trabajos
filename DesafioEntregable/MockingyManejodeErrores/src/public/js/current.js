const deleteUser = async (id) => {
    if (confirm("¿Deseas eliminar este Usuario?\nEsta acción no puede revertirse")) {
        if (id) {
            const response = await fetch('/current/' + id + '/delete', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.status == 200) {
                location.reload();
            } else {
                alert("Error al eliminar el usuario");
            }
        }
    }
}

const updateUser = (id) => {
    location.href = '/current/' + id + '/update';
}
