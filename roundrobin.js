var proceso = /** @class */ (function () {
    function proceso(name, rafaga, priori) {
        this.nombre = name;
        this.rafaga = rafaga;
        this.prioridad = priori;
    }
    return proceso;
}());
function WaitingTime(n, rafaga, espera, respuesta, quantum) {
    var rajagaTemp = [];
    var timeP = 0;
    for (var x in rafaga) {
        rajagaTemp.push(rafaga[x]);
    }
    while (true) {
        var exit = true;
        for (var i = 0; i < n; i++) {
            if (rajagaTemp[i] > 0) {
                exit = false;
                if (rajagaTemp[i] > quantum) {
                    timeP += quantum;
                    rajagaTemp[i] -= quantum;
                }
                else {
                    timeP = timeP + rajagaTemp[i];
                    respuesta[i] = timeP;
                    espera[i] = timeP - rafaga[i];
                    rajagaTemp[i] = 0;
                }
            }
        }
        if (exit) {
            break;
        }
    }
}
function roundrobin(procesos, n, rafaga, quantum) {
    var espera = [];
    var respuesta = [];
    var esperaT = 0;
    var respuestaT = 0;
    WaitingTime(n, rafaga, espera, respuesta, quantum);
    esperaT = espera.reduce(function (a, b) { return a + b; }, 0);
    respuestaT = respuesta.reduce(function (a, b) { return a + b; }, 0);
    console.log("pr | rc | wt | at");
    for (var i = 0; i < n; i++) {
        console.log(procesos[i] + " " + rafaga[i] + " " + espera[i] + " " + respuesta[i]);
    }
    console.log("espera promedio " + esperaT / n);
    console.log("respuesta promedio " + respuestaT / n);
}
function start() {
    var proces = [];
    var app = [];
    var rafaga = [];
    proces.push(new proceso("p1", 3, 1));
    proces.push(new proceso("p2", 4, 2));
    proces.push(new proceso("p3", 3, 3));
    proces.sort(function (a, b) { return a.prioridad - b.prioridad; });
    proces.forEach(function (a) { return app.push(a.nombre); });
    proces.forEach(function (a) { return rafaga.push(a.rafaga); });
    var n = app.length;
    var quantum = 1;
    roundrobin(app, n, rafaga, quantum);
}
console.time("time RR");
start();
console.timeEnd("time RR");
