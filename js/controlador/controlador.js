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

  eliminarPregunta: function(pregunta){
    console.log("hola", pregunta);
    this.modelo.eliminarPregunta(pregunta);
  },
};
