window.onload = function () {
    var localStorageKeyName = 'futbol';

    loadFromLocalStorage();

    document.querySelector("#btn-add").addEventListener('click', function () {
        var numequipo = document.getElementById("numequipo"),
        equipo = document.getElementById("equipo"),
        titulos = document.getElementById("titulos");
        year = document.getElementById("year");

        // Validate
        if (numequipo.value.length === 0 || equipo.value.length === 0 || !parseInt(titulos.value) || !parseInt(year.value)) return;

        var usuario = {
            numequipo: numequipo.value,
            equipo: equipo.value,
            titulos: titulos.value,
            year: year.value
        };

        // Clean data
        numequipo.value = '';
        equipo.value = '';
        titulos.value = '';
        year.value = '';

        // Append to my localStorage
        appendObjectToLocalStorage(usuario);
    })

    function appendObjectToLocalStorage(obj) {
        var usuarios = [],
            dataInLocalStorage = localStorage.getItem(localStorageKeyName);

        if (dataInLocalStorage !== null) {
            usuarios = JSON.parse(dataInLocalStorage);
        }

        usuarios.push(obj);

        localStorage.setItem(localStorageKeyName, JSON.stringify(usuarios));

        loadFromLocalStorage();
    }

    function loadFromLocalStorage() {
        var usuarios = [],
            dataInLocalStorage = localStorage.getItem(localStorageKeyName),
            gridBody = document.querySelector("#grid tbody");

        if (dataInLocalStorage !== null) {
            usuarios = JSON.parse(dataInLocalStorage);
        }

        // Draw TR from TBODY
        gridBody.innerHTML = '';

        usuarios.forEach(function (x, i) {
            var tr = document.createElement("tr"),
                tdnumequipo = document.createElement("td"),
                tdequipo = document.createElement("td"),
                tdtitulos = document.createElement("td"),
                tdyear = document.createElement("td"),
                tdEliminar = document.createElement("td"),
                btnEliminar = document.createElement("button");

            tdnumequipo.innerHTML = x.numequipo;
            tdequipo.innerHTML = x.equipo;
            tdtitulos.innerHTML = x.titulos;
            tdyear.innerHTML = x.year;

            btnEliminar.textContent = 'Eliminar';
            btnEliminar.className = 'btn btn-xs btn-danger';
            btnEliminar.addEventListener('click', function(){
                removeFromLocalStorage(i);
            });

            tdEliminar.appendChild(btnEliminar);

            tr.appendChild(tdnumequipo);
            tr.appendChild(tdequipo);
            tr.appendChild(tdtitulos);
            tr.appendChild(tdyear);
            tr.appendChild(tdEliminar);

            gridBody.appendChild(tr);
        });
    }

    function removeFromLocalStorage(index){
        var usuarios = [],
            dataInLocalStorage = localStorage.getItem(localStorageKeyName);

        usuarios = JSON.parse(dataInLocalStorage);

        usuarios.splice(index, 1);

        localStorage.setItem(localStorageKeyName, JSON.stringify(usuarios));

        loadFromLocalStorage();
    }
}