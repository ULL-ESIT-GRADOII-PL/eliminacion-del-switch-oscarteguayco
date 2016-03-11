(function(exports) {
    "use strict";
    var XRegExp = require('xregexp');
    
    function Medida(valor, tipo) {
        var xregexp = XRegExp('(?<numero> [0-9]{2} ) # valor \n' + 
                             '(?<temp>  [a-zA-Z]+ ) # tipo    ');
            
        // TO-DO: arreglar XRegExp    
        var regexp = /([0-9]{2})([a-zA-Z]+)/;    
            
        // Si no hay tipo, puede estar en 'valor'                   
        if (!tipo) {  
            var match = regexp.exec(valor);
            console.log(match);
            this.valor = match[1];
            this.tipo = match[2];
            
        } else {
            this.valor = valor;
            this.tipo = tipo;
        }
    };
    
    Medida.match = function(valor) {
      var expresion = XRegExp('(?<num>   [-+]?[^\\.][0-9]+([\\.][0-9]+)?\\s*(?:e[+-]?[ ]*[0-9]+)?)\\s*   # numero       \n' +
                               '(?<temp1>    [fkcFKC])\\s*                                       # temperatura1 \n' +
                               '(?<to>       (?:to)?)\\s*                                        # to           \n' +
                               '(?<temp2>    [fkcFKC])\\s*                                       # temperatura2','x');
    
      valor = XRegExp.exec(valor, expresion);
      return valor;
    }
    
    Medida.medidas = {};
    
    Medida.convertir = function(valor) {
      var measures = Medida.measures;
    
      //measures.f = Fahrenheit;
      //measures.c = Celsius;
    
      return "hola";
    
      var match = Medida.match(valor);
      if (match) {
        var numero = match.numero,
            tipo   = match.tipo,
            destino = match.destino;
    
        try {
          var source = new measures[tipo](numero);              // new Fahrenheit(32)
          var target = "to " + measures[destino].name;          // "toCelsius"
          return source[target]().toFixed(2) + " " + target;    // "0 Celsius"
        }
        catch(err) {
          return 'Desconozco como convertir desde "' + tipo + '" hasta "' + destino + '"';
        }
      }
      else
        return "Introduzca una temperatura valida: 330e-1 F to C";
    };
    
    exports.Medida = Medida;
})(this);