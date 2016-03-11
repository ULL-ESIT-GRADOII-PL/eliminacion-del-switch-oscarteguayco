(function(exports) {
    "use strict";

    // TEMPERATURA
    function Temperatura(valor,tipo)
    {
      Medida.call(this, valor, tipo);
    }
    
    // TEMPERATURA HEREDA DE MEDIDA
    Temperatura.prototype = new Medida();
    Temperatura.prototype.constructor = Temperatura;
    
    
    // FAHRENHEIT
    function Fahrenheit(valor)
    {
      Temperatura.call(this, valor);
    }
    
    Fahrenheit.prototype = new Temperatura();
    Fahrenheit.prototype.constructor = Fahrenheit;
    
    Fahrenheit.prototype.toCelsius = function () {
      var converted = (this.valor - 32) * 5/9;
      //var cel = new Celsius(converted);
      return converted;
    }
    
    Fahrenheit.prototype.toKelvin = function () {
      var converted = ((this.valor - 32) / (9/5)) + 273.15;
      var kel = new Kelvin(converted);
      return kel;
    }
    
    
    // CELSIUS
    function Celsius(valor)
    {
      Temperatura.call(this, valor);
    }
    
    Celsius.prototype = new Temperatura();
    Celsius.prototype.constructor = Celsius;
    
    Celsius.prototype.toFahrenheit = function () {
      var result = (this.valor * 9/5)+32;
      var cel = new Celsius(result);
      return cel;
    }
    
    Celsius.prototype.toKelvin = function () {
      var result = parseFloat(this.valor) + 273.15;
      return result;
    }
    
    
    // KELVIN 
    function Kelvin(valor)
    {
      Temperatura.call(this, valor);
    }
    
    Kelvin.prototype = new Temperatura();
    Kelvin.prototype.constructor = Kelvin;
    
    Kelvin.prototype.toCelsius = function () {
      var converted = this.valor - 273.15;
      return converted;
    }
    
    Kelvin.prototype.toFahrenheit = function () {
      var result = ((this.valor - 273.15) * 9/5) + 32;
      return result;
    }

    exports.Temperatura = Temperatura;
    exports.Celsius = Celsius;
    exports.Fahrenheit = Fahrenheit;
    exports.Kelvin = Kelvin;

})(this);