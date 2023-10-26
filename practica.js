
// variables ------->

const dato = document.getElementById(`tomaDeDatos`);
const metro = document.getElementById(`tomaDeMetros`)
const boton = document.getElementById(`boton`);
const color =  document.getElementById(`tomaDeColor`);
const telas = [`flow`,`niza`,`sann`,`venecia`,`talampaya`,`angus`,`zoom`,`gales`,`fidel`];
let busquedaTela = telas.includes(dato.value)
let error = false
let mostrarDato = "";
let preciofinal = 0;
let valor = 0;
let carritoGeneral = [];
let tarjeta1 = document.getElementById("tarjetaDatosPrincipal")
let tarjeta2 = document.getElementById("price-table-container")
let mostrarFacturaFinal = document.getElementById("contenedor-pedidos")
let facturatotal = [];
let mostrafacturafinal2 = 0;
let mostrarfactura = document.getElementById("total-para-mostrar")
let botoncancelar = document.getElementById("boton-cancelar")
let botonParaFinalizarPedido = document.getElementById("boton-factura")




// funcion para hacer desparacer las tarjetas

const aparecertarjetas = () =>{
  tarjeta1 = tarjeta1.style.display = "grid";
  tarjeta2 = tarjeta2.style.display = "flex";
 }
const desaparecerTarjetas = () =>{
 tarjeta1 = tarjeta1.style.display = "none";
 tarjeta2 = tarjeta2.style.display = "none";
}
// funcion para mostrar los errores

const errores = (msjerroneo) =>{
  msjerroneo = [
     msjerroneo.style.background = "red",
     msjerroneo.style.display = "block",
     msjerroneo.style.margin = "3px 0px 0px 0px"]
}

// funcion para esconder los errores en caso de que lo que el usuario puso este bien

const esconderErrores = () => {
  document.getElementById("m1").style.display = "none";
  document.getElementById("m2").style.display = "none";
  document.getElementById("m3").style.display = "none";
  
}

// funcion para borrar los datos puestos por el usuario en caso de que tome el pedido

const borrarTodo = () =>{
      document.getElementById(`tomaDeDatos`).value=""
      document.getElementById(`tomaDeMetros`).value=""
      document.getElementById(`tomaDeColor`).value=""
      pedido = ""
}

// funcion para tomar calcular el precio del corte

const calcularcorte = (metro,corte) =>{
  corte = corte
  switch (corte) {
    case `flow`: 
    valor = (metro * 1000) 
    break;
    case `niza`: 
    valor = (metro * 2000)  
    break;
    case `sann`: 
    valor = (metro * 3000)  
    break;
    case `venecia`: 
    valor = (metro * 4000)  
    break;
    case `talampaya`: 
    valor = (metro * 5000)  
    break;
    case `angus`:  
    valor = (metro * 6000) 
    break;
    case `zoom`:  
    valor = (metro * 7000) 
    break;
    case `gales`:  
    valor = (metro * 8000) 
    break;
    case `fidel`:  
    valor = (metro * 9000) 
    break
    default:
        break;
}  
}
class carrito{
  constructor(tela,metros,color,precio){
    this.tela = tela
    this.metros = metros
    this.color = color
    this.precio = precio
  }
}

const mostrarlorecuperado = () =>{
  for (const producto of carritoGeneral) {
    console.log(producto.tela,producto.metros,producto.color,producto.precio)
  }
}
const vibracionDeError = () =>{
  tarjeta1.style.animation = "vibrate 1.5s linear both"
}
// add event listener para el boton "enviar corte"


esconderErrores()
  
  boton.addEventListener(`click`, (e) =>{ 
    e = ((boton.style.animationName = "scale-up-bottom") + (boton.style.animationDuration = "0.4s"))
    
    

    let busquedaTela = telas.includes(dato.value)
    error = false
    mostrarDato = (`tela : ${dato.value}  metros : ${metro.value} color : ${color.value}`)

      if((dato.value == "") || (busquedaTela == false) ){
      errores(document.getElementById("m1"))
      
      error = true
      document.getElementById(`tomaDeDatos`).value=""
      
      }
      if((metro.value == "") || (metro.value <= 0)){
        errores(document.getElementById("m2"))
        error = true
        document.getElementById(`tomaDeMetros`).value=""
        
        
      }
      if(color.value == ""){ 
        errores(document.getElementById("m3")) 
        error = true
        document.getElementById(`tomaDeColor`).value=""
     
      }
      

      if (error == false){
        calcularcorte(metro.value,dato.value)
        pedido = new carrito (dato.value,metro.value,color.value,valor)
        carritoGeneral.push(pedido)
        mostrafacturafinal2 += valor
        const mandarallocal = JSON.stringify(carritoGeneral)
        localStorage.setItem ("productos",(mandarallocal))
        localStorage.setItem("preciofinal",mostrafacturafinal2)
        facturatotal.push(valor)
        mostrarDato = (`tela: ${dato.value},metros: ${metro.value},color: ${color.value},precio: ${valor}`)
        const recuperarlocal = JSON.parse(localStorage.getItem("productos"))
        let mostrarPedidoaPedido = document.createElement('p');
        mostrarPedidoaPedido.innerText = (mostrarDato)
        mostrarPedidoaPedido.className ="pedidoapedido"
        mostrarFacturaFinal.append(mostrarPedidoaPedido)
        mostrarfactura.innerText = (`total: ${mostrafacturafinal2}`)
        console.log(carritoGeneral.length);
        console.log(mostrarDato);
        console.log(...facturatotal);
        console.log(mostrafacturafinal2);
        console.log(recuperarlocal)
        borrarTodo()
        esconderErrores()
        if(carritoGeneral.length == 1){
          botonParaFinalizarPedido.style.display = "block" 
        }
        
      }
  } )


  botonParaFinalizarPedido.addEventListener("click", (e) => {
  desaparecerTarjetas()
  botonParaFinalizarPedido.innerText = ("confirmar pedido")
  
 })
 




