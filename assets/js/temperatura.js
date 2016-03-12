(function(exports) {
    "use strict";

    // TEMPERATURA
    function Temperatura(valor,tipo) {
      Medida.call(this, valor, tipo);
    }
    
    // TEMPERATURA HEREDA DE MEDIDA
    Temperatura.prototype = Object.create(Medida.prototype);
    Temperatura.prototype.constructor = Temperatura;
  
  
    // FAHRENHEIT //////////////////////////////////////////////  
    Fahrenheit.prototype = Object.create(Temperatura.prototype);
    Fahrenheit.prototype.constructor = Fahrenheit;
  
    function Fahrenheit(valor) {
      Temperatura.call(this, valor, "f");
      this.name = "Fahrenheit";
    }
    
    Fahrenheit.prototype.toCelsius = function () {
      var converted = (this.getValor() - 32) * 5/9;
      return converted;
    }
    
    Fahrenheit.prototype.toKelvin = function () {
      var converted = ((this.getValor() - 32) / (9/5)) + 273.15;
      return converted;
    }
    ////////////////////////////////////////////////////////////
    
    
    // CELSIUS /////////////////////////////////////////////////
    Celsius.prototype = Object.create(Temperatura.prototype);
    Celsius.prototype.constructor = Celsius;
    
    function Celsius(valor) {
      Temperatura.call(this, valor, "c");
      this.name = "Celsius";
    }
  
    Celsius.prototype.toFahrenheit = function () {
      var converted = (this.getValor() * 9/5)+32;
      return converted;
    }
    
    Celsius.prototype.toKelvin = function () {
      var converted = parseFloat(this.getValor()) + 273.15;
      return converted;
    }
    
    
    // KELVIN /////////////////////////////////////////////////
    Kelvin.prototype = Object.create(Temperatura.prototype);
    Kelvin.prototype.constructor = Kelvin;
    
    function Kelvin(valor) {
      Temperatura.call(this, valor, "k");
      this.name = "Kelvin";
    }
    
    Kelvin.prototype.toCelsius = function () {
      var converted = this.getValor() - 273.15;
      return converted;
    }
    
    Kelvin.prototype.toFahrenheit = function () {
      var result = ((this.getValor() - 273.15) * 9/5) + 32;
      return result;
    }
    ///////////////////////////////////////////////////////////

    // Vale, ni idea de por qué poniendo esto aquí y no en Medida.js funciona XDDD
    Medida.measures = {
      "f": Fahrenheit,
      "c": Celsius,
      "k": Kelvin
    };

    exports.Temperatura = Temperatura;
    exports.Celsius = Celsius;
    exports.Fahrenheit = Fahrenheit;
    exports.Kelvin = Kelvin;

})(this);