const express = require('express');
const router = express.Router();
router.use(express.json());
const path = require('path');

let palabra;
var matriz = new Array(10);
let estado = 0;
let tipo = 100;
let nuevapa = false;
let posicion;
let tokens = 0;
let errores = 0;
let operaciones1 = 0;
let agrupas = 0;
let simbolo = 0;
let numero12 = 0;
let flota21 = 0;
let identif = 0;

matriz[0] = new Array(8);
matriz[1] = new Array(8);
matriz[2] = new Array(8);
matriz[3] = new Array(8);
matriz[4] = new Array(8);
matriz[5] = new Array(8);
matriz[6] = new Array(8);
matriz[7] = new Array(8);
matriz[8] = new Array(8);
matriz[9] = new Array(8);

for (var i = 0; i < 10; i++) {
    for (var u = 0; u < 8; u++) {
        matriz[i][u] = 0;
    }
}

matriz[0][0] = 1;
matriz[0][1] = 2;
matriz[0][2] = 3;
matriz[0][3] = 4;
matriz[0][4] = 5;
matriz[0][5] = 6;
matriz[0][7] = 9;

matriz[1][1] = 2;
matriz[6][5] = 6;
matriz[7][5] = 8;
matriz[8][5] = 8;
matriz[9][5] = 9;
matriz[6][6] = 7;
matriz[9][7] = 9;

//utilizaremos router para las rutas ya no app
router.get('/estudiantes', (req, res) => {
    res.render('index', { max: 15 });
});
router.get('/', (req, res) => {
    res.render('index', { max: 15 });
});
router.get('/manejo', (req, res) => {
    res.render('manejo', { max: 15 });
});
router.get('/diagrama', (req, res) => {
    res.render('diagrama', { max: 15 });
});
router.post('/analizar', (request, response) => {
    console.log(request.body.palabras.value);
    var texto = request.body.palabras.value;
    console.log(texto);
    response.status(200).send('correcto');
});
router.get('/postdata', (req, res) => {
    console.log("recibio");
    let data = req.query.format;
    console.log(data);
});

router.post('/postusers', (req, res) => {
    palabra = req.body.text;
    linea = req.body.linea;
    automatizar(0);
});
router.get('/users', (req, res) => {
    res.status(200).json({
        message: palabra,
        clasificado: tipo1,
        total: (errores+operaciones1+simbolo+identif+numero12+flota21+agrupas),
        errores1: errores,
        ide: identif,
        ope: operaciones1,
        sim: simbolo,
        num: numero12,
        fl: flota21,
        ag: agrupas
    });
});
module.exports = router;
// 0 = operaciones especiales
// 1 = segundo =
// 2 = operaciones

function automatizar(posicion) {

    var numero = palabra.length;
    for (var i = posicion; i < numero; i++) {
        if (esOpera(palabra.charAt(i))) {
            tipo = 2;
            if ((i + 1) == numero) {
                console.log("Tu token final es un operador " + palabra);
            } else {
                if ((i + 1) < palabra.length) {
                    if (palabra.charAt(i + 1) >= 0) {
                        nuevapa = true;
                        posicion = i + 1;
                        estado = matriz[estado][tipo];
                    } else {
                        estado = matriz[estado][tipo];
                        break;
                    }
                } else {
                    estado = matriz[estado][tipo];
                }
            }
            tipo = 100;
        } else if (palabra.charAt(i) == '"' || palabra.charAt(i) == ':' || palabra.charAt(i) == ';' || palabra.charAt(i) == '“') {
            tipo = 4;
            if ((i + 1) == numero) {
                console.log("Tu token final es un simbolo " + palabra);
            } else {
                if ((i + 1) < palabra.length) {
                    if (palabra.charAt(i + 1) >= 0 || esLetra(palabra.charAt(i + 1))) {
                        nuevapa = true;
                        posicion = i + 1;
                        estado = matriz[estado][tipo];
                    } else {
                        estado = matriz[estado][tipo];
                        break;
                    }
                } else {
                    estado = matriz[estado][tipo];
                }
            }
            tipo = 100;
        } else if (palabra.charAt(i) == '.') {
            tipo = 6;
            if ((i + 1) < palabra.length) {
                if (!palabra.charAt(i) >= 0) {
                    nuevapa = true;
                    posicion = i + 1;
                    estado = matriz[estado][tipo];
                } else {
                    console.log("error");
                    estado = matriz[estado][tipo];
                    break;
                }
            } else {
                estado = matriz[estado][tipo];
            }
            tipo = 100;
        } else if (palabra.charAt(i) == '{' || palabra.charAt(i) == '}' || palabra.charAt(i) == '(' || palabra.charAt(i) == ')') {
            tipo = 3;
            if ((i + 1) == numero) {
                console.log("Tu token es un signo de agrupacion " + palabra);
            } else {
                if ((i + 1) < palabra.numero) {
                    if (palabra.charAt(i + 1) >= 0 || esLetra(palabra.charAt(i + 1))) {
                        nuevapa = true;
                        posicion = i + 1;
                        estado = matriz[estado][tipo];
                    } else {
                        estado = matriz[estado][tipo];
                        break;
                    }
                } else {
                    estado = matriz[estado][tipo];
                }
            }
            tipo = 100;
        } else if (palabra.charAt(i) == '=' || palabra.charAt(i) == '<' || palabra.charAt(i) == '>') {
            if ((i + 1) == (palabra.length - 1)) {
                if (palabra.charAt(i + 1) == '=') {
                    tipo = 1;
                    console.log("Tu token son dos signos igual " + palabra);
                    if ((i + 2) < palabra.length) {
                        if (palabra.charAt(i + 2) >= 0 || esLetra(palabra.charAt(i + 2))) {
                            nuevapa = true;
                            posicion = i + 2;
                            estado = matriz[estado][tipo];
                        } else {
                            estado = matriz[estado][tipo];
                            break;
                        }
                    } else {
                        estado = matriz[estado][tipo];
                    }
                } else {
                    tipo = 0;
                    console.log("Tu token final es una operacion especial " + palabra)
                    if ((i + 1) < palabra.length) {
                        if (palabra.charAt(i + 1) >= 0 || esLetra(palabra.charAt(i + 1))) {
                            nuevapa = true;
                            posicion = i + 1;
                            estado = matriz[estado][tipo];
                        } else {
                            estado = matriz[estado][tipo];
                            break;
                        }
                    } else {
                        estado = matriz[estado][tipo];
                        break;
                    }
                }
            }
        } else if (palabra.charAt(i) >= 0) {
            tipo = 5;
            estado = matriz[estado][tipo];
            tipo = 100;
        } else if (esLetra(palabra.charAt(i))) {
            tipo = 7;
            estado = matriz[estado][tipo];
            tipo = 100;
        } else {
            tipo = 100;
            estado = 0;
        }
    }

    if (matriz[estado][tipo] == 0 || estado == 0) {
        console.log("error");
    } else {
        console.log("Tu token es " + estado + " y es " + palabra);
        switch (estado) {
            case 0:
                tipo1 = "error";
                errores++;
                break;
            case 1:
                tipo1 = "OPERADOR";
                operaciones1++;
                break;
            case 2:
                tipo1 = "OPERADOR";
                operaciones1++;
                break;
            case 3:
                tipo1 = "OPERADOR";
                operaciones1++;
                break;
            case 4:
                tipo1 = "AGRUPACION";
                agrupas++;
                break;
            case 5:
                tipo1 = "SIMBOLO";
                simbolo++;
                break;
            case 6:
                tipo1 = "ENTERO";
                numero12++;
                break;
            case 7:
                tipo1 = "ERROR"
                errores++;
                break;
            case 8:
                tipo1 = "FLOTANTE";
                flota21++;
                break;
            case 9:
                tipo1 = "IDENTIFICADOR"
                identif++;
                break;
        }
    }
    /*
        for (var i = posicion; i < numero; i++) {
            let lleva = 0;
            if (palabra.charAt(i) >= 0) {
                tipo = 5;
                if (estaBien) {
                    if ((i + 1) == numero) {
                        console.log("Tu token final es un numero " + palabra);
                    }
                }
                tipo = 100;
            } else if (esLetra(palabra.charAt(i))) {
                tipo = 7;
                if (estaBien) {
                    if ((i + 1) == numero) {
                        console.log("Tu token final es una palabra " + palabra);
                    }
                }
                tipo = 100;
            } else if (esOpera(palabra.charAt(i))) {
                tipo = 2;
                if (estaBien) {
                    if ((i + 1) == numero) {
                        console.log("Tu token final es un operador " + palabra);
                    }
                }
                tipo = 100;
            } else if (palabra.charAt(i) == '"' || palabra.charAt(i) == ':' || palabra.charAt(i) == ';') {
                tipo = 4;
                if (estaBien) {
                    if ((i + 1) == numero) {
                        console.log("Tu token final es un simbolo " + palabra);
                    }
                }
                tipo = 100;
            } else if (palabra.charAt(i) == '.') {
                tipo = 6;
                if (estaBien) {
                    if ((i + 1) == numero) {
                        console.log("Tu token final es un punto " + palabra);
                    }
                }
                tipo = 100;
            } else if (palabra.charAt(i) == '{' || palabra.charAt(i) == '}' || palabra.charAt(i) == '(' || palabra.charAt(i) == ')') {
                tipo = 3;
                if (estaBien) {
                    if ((i + 1) == numero) {
                        console.log("Tu token final es un signo de agrupacion " + palabra);
                    }
                }
                tipo = 100;
            } else if (palabra.charAt(i) == '=' || palabra.charAt(i) == '<' || palabra.charAt(i) == '>') {
                if ((i + 1) == (palabra.length - 1)) {
                    if (palabra.charAt(i + 1) == '=') {
                        tipo = 1;
                        console.log("Tu token son dos signos igual " + palabra);
                        break;
                    } else {
                        tipo = 0;
                        console.log("Tu token final es una operacion especial " + palabra)
                        break;
                    }
                }
            }
            if (nuevapa == false){
                if (tipo < 100 && matriz[estado][tipo] > 0) {
                    estado = matriz[estado][tipo];
                } else {
                    console.log("es un error");
                    break;
                }
            } else {
                if ((posicion+1)<palabra.length){
                    console.log(palabra+" -- "+tipo)
                    let nueva1;
                    for (var i = (posicion+1); i<palabra.length; i++){
                        nueva1 +=palabra.charAt(i); 
                    }
                    palabra = nueva1;
                    analizador(posicion+1);
                } 
            }*/

    if (nuevapa) {
        modificarPa();
    }
    estado = 0;
}
function modificarPa() {
    let tamano = posicion + 1;
    let palab = "";
    for (var u = tamano; u < palabra.length; u++) {
        palab += palabra.charAt(u);
    }
    palabra = palab;
    console.log(palab);
    estado = 0;
    nuevapa = false;
}

const esLetra = (caracter) => {

    let ascii = caracter.toUpperCase().charCodeAt(0);

    return ascii > 64 && ascii < 91;

};
const esOpera = (caracter) => {
    var array1 = ['/', '-', '+', '*', '%'];
    let paso = false;
    for (var i = 0; i < array1.length; i++) {
        if (caracter.charAt(0) == array1[i]) {
            paso = true;
            break;
        }
    }
    return paso;
};
