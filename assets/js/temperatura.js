var Temperatura = function(valor, tipo) {
    Medida.call(valor, tipo);
}

Temperatura.prototype = new Medida ();
Temperatura.prototype.constructor = Temperatura;