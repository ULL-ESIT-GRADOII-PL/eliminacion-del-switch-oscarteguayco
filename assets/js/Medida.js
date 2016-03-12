(function(exports) {
    "use strict";

    function Medida(valor, tipo) {
        var regexp = XRegExp('(?<number> [+-]?\\d+(\\.\\d+)?([e][+-]?\\d+)?\\s*) # valor \n' +
													   '(?<tipo> \w)                                       # tipo', 'x');
   
        if (!tipo) {  
            var match = XRegExp.exec(valor, regexp);  
            console.log(match);
            var _valor = match.numero;
            var _tipo = match.tipo;
            
        } else {
            var _valor = valor;
            var _tipo = tipo;
        }
        
        this.getValor = function() { return _valor; };
        this.getTipo = function() { return _tipo; };
    };
    
    Medida.match = function(valor) {
      var regexp = XRegExp('(?<numero> [+-]?\\d+(\\.\\d+)?([e][+-]?\\d+)?[ ]*) # valor \n' + 
											'(?<tipo> [fck])          # tipo de entrada   \n' + 
											'(?<to> \\s*(?:to)?\\s*)  # to opcional \n' +
											'(?<destino> [fck])       # tipo destino', 'x');
											
	    var match = XRegExp.exec(valor, regexp);
      return match;
    };
    
    Medida.convertir = function(valor) {
      var measures = Medida.measures;
    
      var match = Medida.match(valor);
      if (match) {
        var numero = match.numero,
            tipo   = match.tipo,
            destino = match.destino;
            console.log("numero: " + numero);
            console.log("tipo: " + tipo);
            console.log("destino: " + destino);
        
        try {
          console.log("en try");
          var source = new measures[tipo](numero);              // new Fahrenheit(32)
          console.log(source);
          var target = "to" + measures[destino].name;           // "toCelsius"
          return source[target]().toFixed(2) + " " + target;    // "0 Celsius"
        }
        catch(err) {
          console.log(err);
          return 'Desconozco como convertir desde "' + tipo + '" hasta "' + destino + '"';
        }
      }
      else
        return "Introduzca una temperatura válida: 330e-1 F to C"; 
    };
    
    exports.Medida = Medida;
})(this);