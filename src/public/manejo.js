const getButton = document.querySelector("#get");
const postButton = document.querySelector("#post");
var datos = document.getElementById("holanda");
var datos2 = document.getElementById("contenido");
const url = "http://localhost:3000/users";
const urlp = "http://localhost:3000/pusers";


var input = document.getElementById('archivo');
var reader = new FileReader;

input.addEventListener('change', onChange);
function onChange(event) {
  var file = event.target.files[0];
  reader.readAsText(file);
  reader.onload = onLoad;
}
var array = [];
//Arreglo para guardar los tokens
function onLoad() {
  var tmpo = [];
  //Arreglo temporal para manipular los tokens y separarlos
  var result = reader.result;
  var lineas = result.split('\n');
  for (var linea of lineas) {
    if (linea != '') {
      tmpo.push(linea);
      datos2.innerHTML = datos2.innerHTML + linea + "<br>"
    }
  }

  for (let index = 0; index < tmpo.length; index++) {
    var temporal = tmpo[index].split(' ');
    for (let i = 0; i < temporal.length; i++) {
      try {
        var numero = temporal[i].length;
        if (numero == 0) {
        } else {
          array.push(temporal[i]);
        }
      } catch (error) {
      }
    }
  }
}
var count = 0;
var tmp;

const sendData = () => {
  if (count < array.length) {
    tmp = array[count];
  }
  else {
    tmp = 'fin';
  }
  axios.post('http://localhost:3000/postusers',
    {
      firstName: 'Willians',
      lastName: 'Lopez',
      text: tmp,
      linea: count
    },
    {
      'Content-Type': 'application/json'
    })
    .then(response => {

    })
    .catch(error => {
      console.log(error);
    });
  count++;
};


const getData = () => {
  axios.get(url).then(response => {
    if (tmp != 'fin') {
      var htmlTexto = "<tr><td>" + response.data.clasificado + "</td><td>" + count + "</td><td>" + tmp + "</td></tr>";
      datos.innerHTML = datos.innerHTML + htmlTexto;
    } else {
      var htmlTexto = "<tr><td>Analizados</td><td>Errores</td><td>Operacion</td><td>Agrupacion</td><td>Simbolo</td><td>Numero</td><td>Flotante</td><td>Identificador</td></tr><tr><td>" + response.data.total + "</td><td>" + response.data.errores1 + "</td><td>" + response.data.ope + "</td><td>" + response.data.ag + "</td><td>" + response.data.sim + "</td><td>" + response.data.num + "</td><td>" + response.data.fl + "</td><td>" + response.data.ide + "</td>";
      datos.innerHTML = htmlTexto;
    }
  })
    .catch(error => {
      console.log(error);
    });
};

postButton.addEventListener('click', sendData);
getButton.addEventListener('click', getData);