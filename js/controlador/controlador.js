/*
 * Controlador
 */
var Controlador = function(modelo) {
  this.modelo = modelo;
};

Controlador.prototype = {
  agregarPregunta: function(pregunta, respuestas) {
      this.modelo.agregarPregunta(pregunta, respuestas);
  },

  agregarRespuesta: function(pregunta,respuestas){
    this.modelo.agregarRespuesta(pregunta, respuestas)
  },

  eliminarPregunta: function(idPregunta){
    this.modelo.eliminarPregunta(idPregunta);
  },
  
  eliminarTodo: function(){
    this.modelo.eliminarTodo();
  },
  getPregunta: function (idPregunta) {
    return this.modelo.getPregunta(idPregunta);
  },

  actualizarPregunta: function(pregunta){
    this.modelo.actualizarPregunta(pregunta);
  },
  agregarVoto: function(idPregunta,idRespuesta){
    this.modelo.agregarVoto(idPregunta,idRespuesta);
  },

  dibujarGraficos:function(){
    this.modelo.dibujarGraficos();
  }
};
