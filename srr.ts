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
class proceso{
	name:string;
	llegada:number;
	servicio:number;
	salida:number;
	prioridad:number;

	constructor(_name:string, _llegada:number, __servicio:number, _salida:number){
		this.name=_name;
		this.llegada=_llegada;
		this.servicio=__servicio;
		this.salida=_salida;
		this.prioridad=0;
	}

	toString(){
		return `${this.name} ${this.llegada} ${this.servicio} ${this.salida} `;
	}
}
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
class SRR{
	public a:number;
	public b:number;
	public ticks:number;
	public quantum:number;
	public procesNuevos:Array<proceso>;
	public proces:Array<proceso>;
	public procesFinal:Array<proceso>;

	constructor(_a:number,_b:number,_quantum:number){
		this.a=_a;
		this.b=_b;
		this.proces=[];
		this.ticks=0;
		this.quantum=_quantum;
		this.procesNuevos=[];
		this.procesFinal=[];
	}

	agregar(_proces:proceso){
		this.procesNuevos.push(_proces);
		this.procesNuevos.sort((a,b)=> a.llegada - b.llegada);
	}

	egoista(){
		var temp:number = this.procesNuevos.length; 
		var aux:number = this.ticks;
		while(true){

			console.log(`ticks: ${aux}`);

			for(var x of this.procesNuevos){
				if(x.llegada == aux){
					console.log(`${x} es Aceptado`);
					this.proces.push(x);
					this.procesNuevos.splice(this.procesNuevos.indexOf(x),1);
				}
			}

			for( var a of this.proces){
				if(a.llegada==0 && a.prioridad==0){
					a.prioridad += aux;
					a.servicio -= this.b;
				}else{
					if(a.prioridad = 0){
						a.prioridad = aux;
						a.servicio = this.a;
					}
					if(a.prioridad<a.salida){
						a.prioridad = aux;
					}
					if(a.servicio>0){
						a.servicio -= this.b;
					}
					
				}
			}
			
			for( var a of this.proces){
				if(a.prioridad==a.salida && a.servicio == 0 ){
					console.log(`${a} termina su proceso`)
					this.procesFinal.push(a);
					this.proces.splice(this.proces.indexOf(a),1);
				}
			}

			console.log(`nuevos: ${this.procesNuevos.length} procesos: ${this.proces.length} finalisados ${this.procesFinal.length}`);
			console.log(`-------------------------------------------------------`)

			if(temp==this.procesFinal.length)
				break;
			
			aux += this.quantum;
		}
		this.lista();
	}

	lista(){
		this.procesFinal.forEach((a)=> console.log(a));
	}
}

var temp = new SRR(2,1,1);

temp.agregar(new proceso("A",0,3,4));
temp.agregar(new proceso("B",1,5,10));
temp.agregar(new proceso("C",3,1,9));
temp.agregar(new proceso("D",9,5,15));
temp.agregar(new proceso("E",12,5,20));

temp.egoista();
