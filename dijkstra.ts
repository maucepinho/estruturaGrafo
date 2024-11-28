class Dijkstra {
  private adjList: Map<string, Map<string, number>>;

  constructor() {
    this.adjList = new Map();
  }

  addVertice(v: string): void {
    this.adjList.set(v, new Map());
  }

  addAresta(v1: string, v2: string, peso: number): void {
    if (!this.adjList.has(v1)) {
      this.addVertice(v1);
    }
    if (!this.adjList.has(v2)) {
      this.addVertice(v2);
    }
    this.adjList.get(v1)?.set(v2, peso);
    this.adjList.get(v2)?.set(v1, peso);
  }

  dijkstra(
    inicio: string,
    destino: string
  ): { caminho: string[]; distancia: number } {
    let dist: Map<string, number> = new Map();
    let prev: Map<string, string | null> = new Map();
    let pq: { vertice: string; distancia: number }[] = [];

    this.adjList.forEach((_, v) => {
      dist.set(v, Infinity);
      prev.set(v, null);
    });
    dist.set(inicio, 0);
    pq.push({ vertice: inicio, distancia: 0 });

    while (pq.length > 0) {
      pq.sort((a, b) => a.distancia - b.distancia);
      let { vertice } = pq.shift()!;

      if (vertice === destino) break;

      for (let [vizinho, peso] of this.adjList.get(vertice)!) {
        let alt = dist.get(vertice)! + peso;
        if (alt < dist.get(vizinho)!) {
          dist.set(vizinho, alt);
          prev.set(vizinho, vertice);
          pq.push({ vertice: vizinho, distancia: alt });
        }
      }
    }

    let caminho: string[] = [];
    let atual: string | null = destino;
    let distanciaTotal = 0;

    while (atual) {
      caminho.unshift(atual);
      if (prev.get(atual)) {
        let prevVertice = prev.get(atual);
        if (prevVertice) {
          let peso = this.adjList.get(prevVertice)?.get(atual) || 0;
          distanciaTotal += peso;
        }
      }
      atual = prev.get(atual)!;
    }

    return { caminho, distancia: distanciaTotal };
  }
}

let grafodijk = new Dijkstra();

grafodijk.addAresta("Yukon", "Northwest Territories", 1108);
grafodijk.addAresta("Northwest Territories", "Nunavut", 2271);
grafodijk.addAresta("British Columbia", "Alberta", 689);
grafodijk.addAresta("British Columbia", "Yukon", 1486);
grafodijk.addAresta("British Columbia", "Northwest Territories", 1572);
grafodijk.addAresta("Alberta", "Northwest Territories", 1263);
grafodijk.addAresta("Alberta", "Saskatchewan", 603);
grafodijk.addAresta("Saskatchewan", "Northwest Territories", 1455);
grafodijk.addAresta("Saskatchewan", "Manitoba", 596);
grafodijk.addAresta("Manitoba", "Nunavut", 2298);
grafodijk.addAresta("Manitoba", "Ontario", 1507);
grafodijk.addAresta("Ontario", "Quebec", 508);
grafodijk.addAresta("Quebec", "New Brunswick", 708);
grafodijk.addAresta("Quebec", "Newfoundland and Labrador", 1299);
grafodijk.addAresta("New Brunswick", "Prince Edward Island", 122);
grafodijk.addAresta("New Brunswick", "Nova Scotia", 165);
grafodijk.addAresta("Prince Edward Island", "Nova Scotia", 160);

// Siglas de aeroporto de cada cidade definidos pela IATA (Associação Internacional de Transportes Aéreos)
// http://www.gcmap.com

// Yukon = YXY
// Northwest Territories = YZFa
// Nunavut = YFB
// British Columbia = YVR
// Alberta = YYC
// Saskatchewan = YMJ
// Manitoba = YWG
// Ontario = YYZ
// Quebec = YUL
// New Brunswick = YQM
// Newfoundland and Labrador = YYR
// Prince Edward Island = YYG
// Nova Scotia = YHZ

let resultado = grafodijk.dijkstra("Newfoundland and Labrador", "Yukon");
console.log("Caminho:", resultado.caminho);
console.log("Distância Total:", resultado.distancia, "km");
