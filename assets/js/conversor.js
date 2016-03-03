(function(exports) {
  "use strict";

  function Medida(valor,tipo)
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

  function Temperatura(valor,tipo)
  {
    Medida.call(this, valor, tipo);
  }

  function Celsius(valor)
  {
    Temperatura.call(this, valor, "c");
		this.toFarenheit = function () {
				                  return (this.getValor() * 9/5 + 32);
			                 };

		this.toKelvin = function () {
				              return (parseInt(this.getValor()) + 273.15);
			              };
  }

  function Farenheit(valor)
  {
    Temperatura.call(this, valor, "f");
		this.toCelsius = function () {
				              return ((this.getValor() - 32) * 5/9);
			               };

     this.toKelvin = function () {
 				              return ((this.getValor() - 32) * 5/9 + 273.15);
 			              };
  }

  function Kelvin(valor)
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

  exports.convertir = function() {
    var valor     = document.getElementById('convert').value;
    var elemento  = document.getElementById('converted');
    
    /* Con la siguiente XRegExp se puede especificar o no un 'to' */
    var regexp    = /^\s*([-+]?\d+(?:\.\d+)?(?:e[+-]?\d+)?)\s*([fkc])\s*(?:to)?\s*([fkc])$/i;
    //regexp = /^\s*([-+]?\d+(?:\.\d+)?(?:e[+-]?\d+)?)\s*([a-zA-Z]+ (?:(to)*) ([a-zA-Z]+))\s*$/i;
    valor     = valor.match(regexp);

    //elemento.innerHTML = valor;
    if (valor) {
      var numero = valor[1],
          tipoFrom = valor[2].toLowerCase(),
          tipoTo   = valor[3].toLowerCase();

      numero = parseFloat(numero);
      /*  elemento.innerHTML = numero;
        elemento.innerHTML = tipoFrom;
        elemento.innerHTML = tipoTo;    */
     
     console.log(numero + tipoFrom + "to" + tipoTo);

     /* switch (tipo) {
        case 'c':
          var celsius = new Celsius(numero);
          elemento.innerHTML = celsius.toFarenheit().toFixed(2) + " Farenheit";
          break;
        case 'f':
          var farenheit = new Farenheit(numero);
          elemento.innerHTML = farenheit.toCelsius().toFixed(2) + " Celsius";
          break;
        case 'k':
          var kelvin = new Kelvin(valor);
          elemento.innerHTML = kelvin.toCelsius().toFixed(2) + " Kelvin";
          break;
        default:
          elemento.innerHTML = numero;*/
    
    }
    
    /*else
     // elemento.innerHTML = "Conversión fallida. Intente algo como '32F to C'";
     //elemento.innerHTML = "Conversión fallida. Intente algo como '32F to C'";*/
     
  }

})(this);