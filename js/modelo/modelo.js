/*
 * Modelo
 */
var Modelo = function() {

  this.preguntas = localStorage.getItem("preguntas");
  if(!this.preguntas)
    this.preguntas = [];
  else
    this.preguntas = JSON.parse(this.preguntas);
  this.ultimoId = 0; //TODO: revisar para que sirve esta variable

  //inicializacion de eventos
  this.preguntaAgregada = new Evento(this);
  this.respuestaAgregada = new Evento(this);
  this.preguntaEliminada = new Evento(this);
  this.preguntasEliminadas = new Evento(this);
  this.preguntaActualizada = new Evento(this);
  this.votosRespuestas = new Evento(this);
};

Modelo.prototype = {
  //se obtiene el id más grande asignado a una pregunta
  obtenerUltimoId: function() {
    var mayor = 0;
    for (i = 0; i < this.preguntas.length; i ++){
      if(mayor < this.preguntas[i].id) {
        mayor = this.preguntas[i].id;
      }
    }
    return mayor;
  },

  //se agrega una pregunta dado un nombre y sus respuestas
  agregarPregunta: function(nombre, respuestas) {
    var id = this.obtenerUltimoId();
    id++;
    var nuevaPregunta = {'textoPregunta': nombre, 'id': id, 'cantidadPorRespuesta': respuestas};
    this.preguntas.push(nuevaPregunta);
    this.guardar();
    this.preguntaAgregada.notificar();
  },

  agregarRespuesta: function (idPregunta, respuesta){
    const pregunta = this.preguntas.find(element => element.id === idPregunta);
    if(pregunta){
      pregunta.cantidadPorRespuesta.push(respuesta);
      this.guardar();
      this.respuestaAgregada.notificar();
    }
  },

  eliminarPregunta: function (idPregunta) {
    this.preguntas = this.preguntas.filter(pregunta => pregunta.id != idPregunta);
    this.guardar();
    this.preguntaEliminada.notificar();
  },

  eliminarTodo: function(){
   this.preguntas = [];
   this.guardar();
   this.preguntasEliminadas.notificar();
  },

  getPregunta: function(idPregunta) {
    let result = this.preguntas.find(pregunta => pregunta.id == idPregunta);
    return result;
  },

  actualizarPregunta: function(inputPregunta) {
    var indice = this.preguntas.findIndex(pregunta => pregunta.id === inputPregunta.id);
    this.preguntas[indice].textoPregunta = inputPregunta.textoPregunta;
    this.guardar();
    this.preguntaActualizada.notificar();
  },

  agregarVoto: function(idPregunta, idRespuesta){
    var pregunta = this.getPregunta(idPregunta);
    var respuesta = pregunta.cantidadPorRespuesta.find(rta => rta.textoRespuesta === idRespuesta);
    respuesta.votos++;
    this.votosRespuestas.notificar();
  },

   //se guardan las preguntas
  guardar: function() {
    localStorage.setItem("preguntas", JSON.stringify(this.preguntas) );
  },
};
