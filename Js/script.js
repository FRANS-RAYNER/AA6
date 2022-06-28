
let semana = [`lunes, martes, miercoles, jueves, viernes, sabado, domingo`];
let meses = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];

setInterval(function(){
  const date = new Date()
  hora.innerHTML = `${date.getHours()} : ${date.getMinutes()} : ${date.getSeconds()}`
  fecha.innerHTML = `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`
},1000);
let x = 0;
function muestraMeses(){
  x++;
  if(x>=meses.length){
    x = 0;
  }
  document.getElementById("fecha").innerHTML=meses[x];
}

/*function muestraHora(){ 
  let hora;
  hora=new Date();
  let cadena= hora.getHours()+":"+hora.getMinutes()+":"+hora.getSeconds();
  return cadena;
  }
  document.getElementById("hora").innerHTML= muestraHora(); */
//================================================================

function cargarEjemplo(){
  document.getElementById('numerosEjem').value='6,99,56,15,68';
}
function reiniciar(){
  location.reload();
}
function calcular(){
  let valores_array=document.getElementById('numerosEjem').value.split(/,/);
  let mayor= -Infinity;
  let menor= +Infinity;
  let suma=0;
  let promediar=0;
//Sumar
  for(let i=0;i<valores_array.length;i++){
    suma=parseInt(valores_array[i])+suma;
  }
//Obtener el mayor
  for(let i=0;i<valores_array.length;i++){
    if(parseInt(valores_array[i])>mayor) mayor=valores_array[i];
  }
//Obtener el menor    
  for(let i=0;i<valores_array.length;i++){
    if(parseInt(valores_array[i])<menor) menor=valores_array[i];
}
    document.getElementById("Resultado").innerHTML="La suma es : "+ suma+"<br>"+
                                                  "El mayor numero  es : "+ mayor+"<br>"+
                                                   "El menor numero es :  "+ menor;

}
//===============================================================
setInterval(muestraFrase,2000);

let frases = ['Solo sé que nada sé','El que la persigue la consigue','Dime con quien andas y te dire quien eres','El que estudia triunfa'];

let indice = 0;
function muestraFrase(){
  indice++;
  if(indice>=frases.length){
    indice = 0;
  }
  document.getElementById('frases').innerHTML=frases[indice];
}
//=============================================================

let colores = [];
function agregaColor(evt){
  evt.preventDefault();   //Pausa la actualizacion de la pagina
  let nom=document.getElementById('colores').value;

  if(nom==''){
    alert('El campo no puede estar vacio');
  }else if(!existeNombre(nom)){
    let opcion = '<li>'+nom+'</li>';
    let lista=document.getElementById('listaC');

    lista.innerHTML+=opcion;
    colores.push(nom);
  }else{
    alert('El color existe');
  }

  //document.getElementById('listaC').innerHTML='<li>'+nom+'</li>';
}
function existeNombre(nombre){
  //Busca un nombre dentro del Array
  for(let i=0;i<colores.length;i++){
    const elemento=colores[i];
    if(elemento.trim().toLowerCase()===nombre.trim().toLowerCase()){
      return true;
    }
  }
  return false;
}
//========================================================
//Cronometro
document.addEventListener("DOMContentLoaded", () => {
	const $tiempoTranscurrido = document.querySelector("#tiempoTranscurrido"),
		$raynerIniciar = document.querySelector("#Iniciar"),
		$raynerPausar = document.querySelector("#Pausar"),
		$raynerMarca = document.querySelector("#Marca"),
		$raynerDetener = document.querySelector("#Detener"),
		$numerosMarcas = document.querySelector("#numerosMarcas");
	let marcas = [],
		idInterval,
		tiempoInicio = null;
	let diferenciaTemporal = 0;

	const ocultarElemento = elemento => {
		elemento.style.display = "none";
	}

	const mostrarElemento = elemento => {
		elemento.style.display = "";
	}

	const agregarCero = valor => {
		if (valor < 10){
			return "0" + valor;
		} else{
			return "" + valor;
		}
	}

	const milisegundosAMinutosYSegundos = (milisegundos) => {
		const minutos = parseInt(milisegundos / 1000 / 60);
		milisegundos -= minutos * 60 * 1000;
		segundos = (milisegundos / 1000);
		return `${agregarCero(minutos)}:${agregarCero(segundos.toFixed(1))}`;
	};


	const iniciarCron = () => {
		const ahora = new Date();
		tiempoInicio = new Date(ahora.getTime() - diferenciaTemporal);
		clearInterval(idInterval);
		idInterval = setInterval(refrescarTiempo, 100);
		ocultarElemento($raynerIniciar);
		ocultarElemento($raynerDetener);
		mostrarElemento($raynerMarca);
		mostrarElemento($raynerPausar);
	};
	const pausarCron = () => {
		diferenciaTemporal = new Date() - tiempoInicio.getTime();
		clearInterval(idInterval);
		mostrarElemento($raynerIniciar);
		ocultarElemento($raynerMarca);
		ocultarElemento($raynerPausar);
		mostrarElemento($raynerDetener);
	};
	const refrescarTiempo = () => {
		const ahora = new Date();
		const diferencia = ahora.getTime() - tiempoInicio.getTime();
		$tiempoTranscurrido.textContent = milisegundosAMinutosYSegundos(diferencia);
	};
	const dejarMarca = () => {
		marcas.unshift(new Date() - tiempoInicio.getTime());
		trazarMarcas();
	};
	const trazarMarcas = () => {
		$numerosMarcas.innerHTML = "";
		for (const [indice, marca] of marcas.entries()){
			const $li = document.createElement("p");
			$li.innerHTML = `<strong class="is-size-4">${marcas.length - indice}.</strong> ${milisegundosAMinutosYSegundos(marca)}`;
			$li.classList.add("is-size-3");
			$numerosMarcas.append($li);
		}
	};

	const detenerCron = () => {
		if (!confirm("¿Está seguro(a) que quiere reiniciar?")){
			return;
		}
		clearInterval(idInterval);
		init();
		marcas = [];
		trazarMarcas();
		diferenciaTemporal = 0;
	}

	const init = () => {
		$tiempoTranscurrido.textContent = "00:00.0";
		ocultarElemento($raynerPausar);
		ocultarElemento($raynerMarca);
		ocultarElemento($raynerDetener);
	};
	init();

	$raynerIniciar.onclick = iniciarCron;
	$raynerMarca.onclick = dejarMarca;
	$raynerPausar.onclick = pausarCron;
	$raynerDetener.onclick = detenerCron;
});
