(function(exports) {
    "use strict";

    function Medida(valor, tipo) {
        var regexp = XRegExp('^(?<numero> [+-]?\\d+(\\.\\d+)?([e][+-]?\\d+)?\\s*) # 	valor \n' +
													 '(?<tipo> [a-zA-Z])                                     # tipo','x');
            
        console.log(valor); 
        if (!tipo) {  
            var match = XRegExp.exec(valor, regexp);  
            console.log(match);
            this.valor = match.numero;
            this.tipo = match.tipo;
            
        } else {
            this.valor = valor;
            this.tipo = tipo;
        }
    };
    
    Medida.measures = {
      "f": "Fahrenheit",
      "c": "Celsius",
      "k": "Kelvin"
    }
    
    Medida.match = function(valor) {
      var regexp = XRegExp('^(?<numero> [+-]?\\d+(\\.\\d+)?([e][+-]?\\d+)?[ ]*) # valor \n' + 
											'(?<tipo> [cfk])       # tipo de entrada   \n' + 
											'(?<to> \\s*(?:to)?\\s*)       # to opcional \n' +
											'(?<destino> [cfk])    # tipo destino', 'x');
	    var match = XRegExp.exec(valor, regexp);
      return match;
    };
    
    Medida.medidas = {};
    
    Medida.convertir = function(valor) {
      var measures = Medida.measures;
    
      console.log("valor: " + valor);
      var match = Medida.match(valor);
      console.log("match: " + match);
      if (match) {
        var numero = match.numero,
            tipo   = match.tipo,
            destino = match.destino;
            console.log(numero);
            console.log(tipo);
            console.log(destino);
    
        try {
          console.log("en try");
          console.log(measures[tipo]);
          var source = new measures[tipo](numero);              // new Fahrenheit(32)
          console.log("En try 2");
          console.log("source" + source);
          var target = "to " + measures[destino].name;          // "toCelsius"
          console.log("target" + target);
          return source[target]().toFixed(2) + " " + target;    // "0 Celsius"
        }
        catch(err) {
          console.log(err);
          return 'Desconozco como convertir desde "' + tipo + '" hasta "' + destino + '"';
        }
      }
      else
        return "Introduzca una temperatura valida: 330e-1 F to C"; 
    };
    
    exports.Medida = Medida;
})(this);