// función autoinvocada
(function init() {
	console.log("Calculadora preparada...")

	document.getElementById("inCalculadora").addEventListener("click", pressButton)
	document.getElementById("buttonC").addEventListener("click", reset);
	document.getElementById("buttonIgual").addEventListener("click", igual);

} ());

//Variables Globales;
var resultado = 0;
var operacion = "";
var teclas = [];
var ultimaTecla = "";
var ultimaTeclaNumero = false;
var pantalla = document.getElementById("valoresScreen");// parrafo con los valores de pantalla

// Captura el evento  onclick sobre la calculadora
function pressButton(evt) {

	if (!evt)
		return;

	if (evt.target.tagName === "BUTTON") {
		escribeEnPantalla(evt.target) //Escribe en pantalla
		gestionTeclas(evt.target) // gestionaTeclas
	}

	if(teclas.length >= 3){
		calculaResultado();
		console.log("Resultado = " + resultado);
	}
	//this  es el elemento que ha lanzado el evento, en este caso inCalculadora-HTML 
}


function escribeEnPantalla(button) {
	var valor = button.innerHTML;

	// teclas especiales 

	//+-
	if (valor === "+/-") {
		if (teclas.length > 0) {
			let valoresPantalla = pantalla.innerHTML;
			if (valoresPantalla.startsWith("-")) {
				valoresPantalla = valoresPantalla.substring(1, valoresPantalla.length)
			} else {
				valoresPantalla = "-" + valoresPantalla;
			}
			pantalla.innerHTML = valoresPantalla;
		}
		return;
	}else if (valor === "C"){
		reset();
		return
	}

	if (ultimaTecla === "=") {
		if (button.hasAttribute("value")) {
			teclas[0] = resultado;
		} else {
			pantalla.innerHTML = "";
			teclas.length = 0;
		}
	}

	if (button.hasAttribute("value")) {
		if (ultimaTecla === valor) {
			return;
		} else {
			ultimaTecla = valor;
		}
	} else {
		utlimaTecla = valor;
	}

	var ignoraTeclas = ["C", "=", "Raiz", "Fraccion", "CE"];
	let ignora = false;
	for (let i = 0; i < ignoraTeclas.length; i++) {
		if (valor == ignoraTeclas[i])
			ignora = true;
	}
	if (!ignora)
		pantalla.innerHTML += valor;

}

function gestionTeclas(valor) {

	if (valor.hasAttribute("value")) {
		ultimaTeclaNumero == false;
		if(valor.value == "Igual"){
			igual();
			return;
		}
	}


	if (teclas.length == 0) {
		teclas.push(parseInt(valor.innerHTML));
	} else {
		if (isTeclaUnOperando(valor.innerHTML)) {
			if (teclas[teclas.length - 1] === valor.innerHTML) {
				return;
			}
			teclas.push(valor.innerHTML);
		} else {
			var ut = teclas[teclas.length - 1]
			if (isTeclaUnOperando(ut)) {
				teclas.push(valor.innerHTML);
			} else {
				teclas[teclas.length - 1] = ut + valor.innerHTML;
			}
		}

	}

	console.log(teclas);


}

function reset() {
	pantalla.innerHTML = "";
	resultado = 0;
	teclas.length = 0;
	ultimaTecla = "";
	
}

function undoUltimaCifra() {
	if (teclas.length > 0) {
		teclas.pop();
	}
}

function calculaResultado() {
	if (teclas.length === 2) {
		let value1 = parseInt(teclas[0]);
		switch (teclas[1]) {
			case "Raiz":
				resultado = Math.sqrt(value1)
			case "Fraccion":
				resultado = 1 / value1;
			case "default":
				resultado = value1;
		}
	}
	else if (teclas.length === 3) {
		let value1 = parseInt(teclas[0]);
		let value2 = parseInt(teclas[2]);
		switch (teclas[1]) {
			case "+":
				resultado = value1 + value2;
				break;

			case "*":
				resultado = value1 * value2;
				break;
			case "-":
				resultado = value1 - value2;
				break;
			case "/":
				resultado = value1 / value2;
				break;
			default:
				console.log("operacion no preparada");
		}
	}
	teclas.length = 0;
	teclas.push(resultado);
}

function igual() {
	calculaResultado();
	pantalla.innerHTML = resultado;
}


function isTeclaUnOperando(valor) {
	isOperando = false;
	var operandos = ["Raiz", "/", "*", "%", "-", "1/x", "+"];
	for (var i = 0; i < operandos.length; i++) {
		if (valor === operandos[i]) {
			isOperando = true;
			break;
		}
	}
	return isOperando;
}

