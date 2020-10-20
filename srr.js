/**
 *@version 0.2
 */
/**
 *CLASS
 * @class proceso
 * 	genera la estructura de un proceso
 *
 *VARIABLES
 *
 * @param name
 * 	nombre del proceso
 *
 * @param llegada
 * 	tiempo en el que el proceso entra
 *
 * @param servicio
 * 	tiempo que el proceso nesecita
 *
 * @param salida
 * 	tiempo en el que el proceso sale
 *
 * @param prioridad
 * 	tiempo de procesodar que usa
 *
 *FUNCTIONS
 * @method constructor
 * 	construye el proceso
 *
 * @method toString
 * 	forma de escritura de las propiedades del proceso
 */
var proceso = /** @class */ (function () {
    function proceso(_name, _llegada, __servicio, _salida) {
        this.name = _name;
        this.llegada = _llegada;
        this.servicio = __servicio;
        this.salida = _salida;
        this.prioridad = 0;
    }
    proceso.prototype.toString = function () {
        return this.name + " " + this.llegada + " " + this.servicio + " " + this.salida + " ";
    };
    return proceso;
}());
/**
 *CLASS
 * @class SRR
 * 	clase selfish round robin
 *
 *VARIABLES
 * @param a
 * 	tiempo de entrada de los nuevos procesos
 * @param b
 * 	tiempo de los procesos aceptados
 * @param ticks
 * 	tiempo en quantums en el procesador
 * @param quantum
 * 	tiempo del porcesador para los procesos
 * @param procesNuevos
 * 	array con los procesos nuevos
 * @param proces
 * 	array con los procesos aceptados
 * @param procesFinal
 * 	array con los procesos finalizados
 *
 *FUNCTIONS
 * @method constructor
 * 	crea la clase SRR
 * @method agregar
 * 	agrega los procesos en el array de nuevos
 * @method egoista
 * 	hace la funcion del SRR
 * @method listar
 * 	lista los procesos ya finalizados
 */
var SRR = /** @class */ (function () {
    function SRR(_a, _b, _quantum) {
        this.a = _a;
        this.b = _b;
        this.proces = [];
        this.ticks = 0;
        this.quantum = _quantum;
        this.procesNuevos = [];
        this.procesFinal = [];
    }
    SRR.prototype.agregar = function (_proces) {
        this.procesNuevos.push(_proces);
        this.procesNuevos.sort(function (a, b) { return a.llegada - b.llegada; });
    };
    SRR.prototype.egoista = function () {
        var temp = this.procesNuevos.length;
        var aux = this.ticks;
        while (true) {
            console.log("ticks: " + aux);
            for (var _i = 0, _c = this.procesNuevos; _i < _c.length; _i++) {
                var x = _c[_i];
                if (x.llegada == aux) {
                    console.log(x + " es Aceptado");
                    this.proces.push(x);
                    this.procesNuevos.splice(this.procesNuevos.indexOf(x), 1);
                }
            }
            for (var _d = 0, _e = this.proces; _d < _e.length; _d++) {
                var a = _e[_d];
                if (a.llegada == 0 && a.prioridad == 0) {
                    a.prioridad += aux;
                    a.servicio -= this.b;
                }
                else {
                    if (a.prioridad = 0) {
                        a.prioridad = aux;
                        a.servicio = this.a;
                    }
                    if (a.prioridad < a.salida) {
                        a.prioridad = aux;
                    }
                    if (a.servicio > 0) {
                        a.servicio -= this.b;
                    }
                }
            }
            for (var _f = 0, _g = this.proces; _f < _g.length; _f++) {
                var a = _g[_f];
                if (a.prioridad == a.salida && a.servicio == 0) {
                    console.log(a + " termina su proceso");
                    this.procesFinal.push(a);
                    this.proces.splice(this.proces.indexOf(a), 1);
                }
            }
            console.log("nuevos: " + this.procesNuevos.length + " procesos: " + this.proces.length + " finalisados " + this.procesFinal.length);
            console.log("-------------------------------------------------------");
            if (temp == this.procesFinal.length)
                break;
            aux += this.quantum;
        }
        this.lista();
    };
    SRR.prototype.lista = function () {
        this.procesFinal.forEach(function (a) { return console.log(a); });
    };
    return SRR;
}());
var temp = new SRR(2, 1, 1);
temp.agregar(new proceso("A", 0, 3, 4));
temp.agregar(new proceso("B", 1, 5, 10));
temp.agregar(new proceso("C", 3, 1, 9));
temp.agregar(new proceso("D", 9, 5, 15));
temp.agregar(new proceso("E", 12, 5, 20));
temp.egoista();
