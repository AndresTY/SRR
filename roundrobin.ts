class proceso{
	nombre:string;
	rafaga:number;
	prioridad:number;

	constructor(name:string, rafaga:number,priori:number){
		this.nombre=name;
		this.rafaga=rafaga;
		this.prioridad=priori;
	}
}

function WaitingTime(n:number, rafaga:Array<number>, espera:Array<number>,respuesta:Array<number>, quantum:number){
	var rajagaTemp:Array<number>= [];
	var timeP:number=0;
	for (var x in rafaga){
		rajagaTemp.push(rafaga[x]);
	}

	while(true){
		var exit:Boolean = true;
		for(var i=0;i<n;i++){
			if(rajagaTemp[i]>0){
				exit =false;

				if(rajagaTemp[i]>quantum){
					timeP+=quantum;
					rajagaTemp[i] -= quantum;
				}else{
					timeP = timeP + rajagaTemp[i];
					respuesta[i]=timeP;
					espera[i] = timeP - rafaga[i];
					rajagaTemp[i]=0;
				}
			}
		}
		if(exit){
			break;
		}
	}

}

function roundrobin(procesos:Array<string>, n:number, rafaga:Array<number>, quantum:number){
	var espera:Array<number>=[];
	var respuesta:Array<number>=[];
	var esperaT:number =0;
	var respuestaT:number=0;

	WaitingTime(n, rafaga, espera, respuesta,quantum);
	esperaT = espera.reduce((a,b)=>a+b,0);
	respuestaT = respuesta.reduce((a,b)=> a+b,0);

	console.log(`pr | rc | wt | at`);
	for( var i=0;i<n;i++){
		console.log(`${procesos[i]} ${rafaga[i]} ${espera[i]} ${respuesta[i]}`);
	}
	console.log(`espera promedio ${esperaT/n}`);
	console.log(`respuesta promedio ${respuestaT/n}`);
}

function start(){
	var proces: Array< proceso> = [];
	var app: Array< string> = [];
	var rafaga: Array< number> = [];
	proces.push( new proceso( "p1", 53, 1));
	proces.push( new proceso( "p2", 17, 2));
	proces.push( new proceso( "p3", 68, 3));
	proces.push( new proceso( "p4", 24, 4));
	
	proces.sort((a,b)=> a.prioridad - b.prioridad);
	proces.forEach((a)=> app.push( a.nombre));
	proces.forEach((a)=> rafaga.push( a.rafaga));

	var n:number = app.length;
	var quantum = 20;
	roundrobin( app, n, rafaga, quantum);
}
console.time("time RR");
start();
console.timeEnd("time RR");
