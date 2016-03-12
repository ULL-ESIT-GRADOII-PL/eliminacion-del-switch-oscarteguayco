(function(exports) {
  "use strict";

  var Medida = function(valor,tipo)
  {
    // Atributos PRIVADOS
    var _valor = valor;
    var _tipo = tipo || "type not defined";

    // Métodos PÚBLICOS
    this.getValor = function() {
                        return _valor;
                      };

    this.getTipo = function() {
                        return _tipo;
                      };
  }

  var Temperatura = function(valor,tipo)
  {
    Medida.call(this, valor, tipo);
  }

  var Celsius = function(valor)
  {
    Temperatura.call(this, valor, "c");
		this.toFarenheit = function () {
				                  return (this.getValor() * 9/5 + 32);
			                 };

		this.toKelvin = function () {
				              return (parseInt(this.getValor()) + 273.15);
			              };
  }

  var Farenheit = function(valor)
  {
    Temperatura.call(this, valor, "f");
		this.toCelsius = function () {
				              return ((this.getValor() - 32) * 5/9);
			               };

     this.toKelvin = function () {
 				              return ((this.getValor() - 32) * 5/9 + 273.15);
 			              };
  }

  var Kelvin = function(valor)
  {
    Temperatura.call(this, valor, "k");
    this.toFarenheit = function () {
				                return ((this.getValor() - 273.15) * 9/5 + 32);
			                 };

    this.toCelsius = function () {
				              return (this.getValor() - 237.15);
			               };
  }

  // Temperatura hereda de Medida
  Temperatura.prototype = new Medida();
  Temperatura.prototype.constructor = Temperatura;

  // Celsius, Fahrenheit y Kelvin heredan de Temperatura
  Celsius.prototype = new Temperatura();
	Celsius.prototype.constructor = Celsius;
	Farenheit.prototype = new Temperatura();
	Farenheit.prototype.constructor = Farenheit;
	Kelvin.prototype = new Temperatura();
	Kelvin.prototype.constructor = Kelvin;

  exports.Temperatura = Temperatura;
  exports.Celsius = Celsius;
  exports.Farenheit = Farenheit;
  exports.Kelvin = Kelvin;

  exports.convertir = function() {
    var valor     = document.getElementById('convert').value;
    var elemento  = document.getElementById('converted');
    
    /* Con la siguiente XRegExp se puede especificar o no un 'to' */
    var regexp    = /^\s*([-+]?\d+(?:\.\d+)?(?:e[+-]?\d+)?)\s*([fkc])\s*(?:to)?\s*([fkc])$/i;
    //regexp = /^\s*([-+]?\d+(?:\.\d+)?(?:e[+-]?\d+)?)\s*([a-zA-Z]+ (?:(to)*) ([a-zA-Z]+))\s*$/i;
    valor     = valor.match(regexp);
    
    /* var regexp = XRegExp('(?<numero> [-+]?[0-9]+(\.[0-9]+)?(?:e[+-]?[0-9]+)?) # numero \n' +
               '(?<tipoFrom> [fckFCK]) # entrada \n' +
               '([ ]*) \n' +
               '(?<to> (to))? # to \n' +
               '([ ]*) \n' +
               '(?<tipoTo> [fckFCK]) # salida \n','x');

    valor = XRegExp.exec(valor, regexp);        */

    if (valor) {
      var numero   = valor[1],
          tipoFrom = valor[2].toLowerCase(),
          tipoTo   = valor[3].toLowerCase();

      numero = parseFloat(numero);
      console.log(numero + tipoFrom + "to" + tipoTo);

      switch (tipoFrom) {
        case 'c':
          var celsius = new Celsius(numero);
          if (tipoTo == 'f')
            elemento.innerHTML = celsius.toFarenheit().toFixed(2) + " Farenheit";
          else if (tipoTo == 'k')
            elemento.innerHTML = celsius.toKelvin().toFixed(2) + " Kelvin";
          break;
          
        case 'f':
          var farenheit = new Farenheit(numero);
          if (tipoTo == 'c')
            elemento.innerHTML = farenheit.toCelsius().toFixed(2) + " Celsius";
          else if (tipoTo == 'k')
            elemento.innerHTML = farenheit.toKelvin().toFixed(2) + " Kelvin";
          break;
          
        case 'k':
          var kelvin = new Kelvin(numero);
          if (tipoTo == 'c')
            elemento.innerHTML = kelvin.toCelsius().toFixed(2) + " Celsius";
          else if (tipoTo == 'f')
            elemento.innerHTML = kelvin.toFarenheit().toFixed(2) + " Farenheit";
          break;
          
        default:
          elemento.innerHTML = "Tipo no reconocido";
      }
    }
    
    else
      elemento.innerHTML = "Conversión fallida. Intente algo como '32F to C'";
  }
})(this);