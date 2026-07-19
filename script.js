document.getElementById('menuToggle')?.addEventListener('click', function () {
    const nav = document.querySelector('.nav-links');
    nav.classList.toggle('show');
});

const modal = document.getElementById('loginModal');
const openBtn = document.getElementById('openLogin');
const closeBtn = document.getElementById('closeLogin');

if (openBtn && modal && closeBtn) {
    openBtn.onclick = function () {
        modal.style.display = 'flex';
        document.getElementById('loginError').style.display = 'none';
    };
    closeBtn.onclick = function () {
        modal.style.display = 'none';
    };
    window.onclick = function (e) {
        if (e.target === modal) modal.style.display = 'none';
    };
}

document.getElementById('loginForm')?.addEventListener('submit', function (e) {
    e.preventDefault();
    const usuario = document.getElementById('usuario').value.trim();
    const password = document.getElementById('password').value.trim();

    if (usuario === 'admin' && password === '12345') {
        document.querySelector('header').style.display = 'none';
        document.querySelectorAll('section').forEach(function (sec) {
            sec.style.display = 'none';
        });
        document.querySelector('footer').style.display = 'none';
        document.getElementById('panelAdmin').style.display = 'block';
        modal.style.display = 'none';
        cargarMiembros();
        alert('Bienvenido Administrador');
    } else {
        document.getElementById('loginError').style.display = 'block';
    }
});

document.getElementById('cerrarSesion')?.addEventListener('click', function () {
    document.getElementById('panelAdmin').style.display = 'none';
    document.querySelector('header').style.display = 'flex';
    document.querySelectorAll('section').forEach(function (sec) {
        sec.style.display = 'block';
    });
    document.querySelector('footer').style.display = 'block';
});

document.querySelectorAll('.tab-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
        document.querySelectorAll('.tab-btn').forEach(function (b) {
            b.classList.remove('active');
        });
        document.querySelectorAll('.tab-content').forEach(function (c) {
            c.style.display = 'none';
        });
        this.classList.add('active');
        var tabId = this.dataset.tab;
        document.getElementById(tabId).style.display = 'block';
    });
});

document.getElementById('formRegistro')?.addEventListener('submit', function (e) {
    e.preventDefault();

    var nombre = document.getElementById('nombre').value.trim();
    var dni = document.getElementById('dni').value.trim();
    var edad = document.getElementById('edad').value.trim();
    var telefono = document.getElementById('telefono').value.trim();
    var correo = document.getElementById('correo').value.trim();
    var membresia = document.getElementById('membresia').value;

    if (!nombre || !dni || !edad || !telefono || !correo || !membresia) {
        alert('Por favor, completa todos los campos.');
        return;
    }

    var nuevoMiembro = {
        nombre: nombre,
        dni: dni,
        edad: edad,
        telefono: telefono,
        correo: correo,
        membresia: membresia
    };

    var miembros = JSON.parse(localStorage.getItem('miembros')) || [];
    miembros.push(nuevoMiembro);
    localStorage.setItem('miembros', JSON.stringify(miembros));

    agregarFilaTabla(nuevoMiembro);

    document.getElementById('registroMensaje').innerHTML =
        '<span style="color: #2ecc71;">Miembro registrado exitosamente.</span>';
    this.reset();
});

function agregarFilaTabla(miembro) {
    var tbody = document.querySelector('#tablaMiembros tbody');
    var fila = document.createElement('tr');
    fila.innerHTML = `
        <td>${miembro.nombre}</td>
        <td>${miembro.dni}</td>
        <td>${miembro.edad}</td>
        <td>${miembro.telefono}</td>
        <td>${miembro.correo}</td>
        <td>${miembro.membresia}</td>
        <td>
            <button class="btn-edit" onclick="editarMiembro(this)" title="Editar"><i class="fas fa-edit"></i></button>
            <button class="btn-delete" onclick="eliminarMiembro(this, '${miembro.dni}')" title="Eliminar"><i class="fas fa-trash-alt"></i></button>
        </td>
    `;
    tbody.appendChild(fila);
}

function cargarMiembros() {
    var miembros = JSON.parse(localStorage.getItem('miembros')) || [];
    var tbody = document.querySelector('#tablaMiembros tbody');
    tbody.innerHTML = '';
    miembros.forEach(function (m) {
        agregarFilaTabla(m);
    });
}

function eliminarMiembro(boton, dni) {
    if (!confirm('Seguro que deseas eliminar este miembro?')) return;

    var miembros = JSON.parse(localStorage.getItem('miembros')) || [];
    miembros = miembros.filter(function (m) {
        return m.dni !== dni;
    });
    localStorage.setItem('miembros', JSON.stringify(miembros));

    var fila = boton.closest('tr');
    fila.remove();
    alert('Miembro eliminado.');
}

function editarMiembro(boton) {
    var fila = boton.closest('tr');
    var celdas = fila.querySelectorAll('td');
    var nombre = celdas[0].textContent;
    var dni = celdas[1].textContent;
    var edad = celdas[2].textContent;
    var telefono = celdas[3].textContent;
    var correo = celdas[4].textContent;
    var membresia = celdas[5].textContent;

    document.querySelector('[data-tab="registro-tab"]').click();
    document.getElementById('nombre').value = nombre;
    document.getElementById('dni').value = dni;
    document.getElementById('edad').value = edad;
    document.getElementById('telefono').value = telefono;
    document.getElementById('correo').value = correo;
    document.getElementById('membresia').value = membresia;

    if (confirm('Editaras este miembro. El registro actual se eliminara.')) {
        eliminarMiembro(boton, dni);
    }
}

function inscribirse(plan) {
    alert('Te has inscrito en el plan ' + plan + '. Pronto nos contactaremos contigo.');
}

document.getElementById('formularioContacto')?.addEventListener('submit', function (e) {
    e.preventDefault();
    document.getElementById('contactoMensaje').innerHTML =
        '<span style="color: #2ecc71;">Mensaje enviado. Te responderemos pronto.</span>';
    this.reset();
});