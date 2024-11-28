class Grafo {
  private adjList: Map<string, string[]>;

  constructor() {
      this.adjList = new Map();
  }

  addVertice(v: string): void {
      this.adjList.set(v, []);
  }

  addAresta(v1: string, v2: string): void {
      if (!this.adjList.has(v1)) {
          this.addVertice(v1);
      }
      if (!this.adjList.has(v2)) {
          this.addVertice(v2);
      }
      this.adjList.get(v1)?.push(v2);
      this.adjList.get(v2)?.push(v1);
  }

  bfs(inicio: string): string[] {
      let fila: string[] = [];
      let visitados: Set<string> = new Set();
      let resultado: string[] = [];

      fila.push(inicio);
      visitados.add(inicio);

      while (fila.length > 0) {
          let prov = fila.shift()!;
          resultado.push(prov);

          for (let vizinho of this.adjList.get(prov)!) {
              if (!visitados.has(vizinho)) {
                  visitados.add(vizinho);
                  fila.push(vizinho);
              }
          }
      }

      return resultado;
  }
}

let grafo = new Grafo();

grafo.addAresta('British Columbia', 'Yukon');
grafo.addAresta('British Columbia', 'Northwest Territories');
grafo.addAresta('British Columbia', 'Alberta');
grafo.addAresta('Alberta', 'British Columbia');
grafo.addAresta('Alberta', 'Northwest Territories');
grafo.addAresta('Alberta', 'Saskatchewan');
grafo.addAresta('Saskatchewan', 'Alberta');
grafo.addAresta('Saskatchewan', 'Northwest Territories');
grafo.addAresta('Saskatchewan', 'Manitoba');
grafo.addAresta('Manitoba', 'Saskatchewan');
grafo.addAresta('Manitoba', 'Nunavut');
grafo.addAresta('Manitoba', 'Ontario');
grafo.addAresta('Ontario', 'Manitoba');
grafo.addAresta('Ontario', 'Quebec');
grafo.addAresta('Quebec', 'Ontario');
grafo.addAresta('Quebec', 'New Brunswick');
grafo.addAresta('Quebec', 'Newfoundland and Labrador');
grafo.addAresta('New Brunswick', 'Quebec');
grafo.addAresta('New Brunswick', 'Prince Edward Island');
grafo.addAresta('New Brunswick', 'Nova Scotia');
grafo.addAresta('Prince Edward Island', 'New Brunswick');
grafo.addAresta('Nova Scotia', 'New Brunswick');
grafo.addAresta('Yukon', 'British Columbia');
grafo.addAresta('Yukon', 'Northwest Territories');
grafo.addAresta('Northwest Territories', 'Yukon');
grafo.addAresta('Northwest Territories', 'British Columbia');
grafo.addAresta('Northwest Territories', 'Alberta');
grafo.addAresta('Northwest Territories', 'Saskatchewan');
grafo.addAresta('Northwest Territories', 'Nunavut');
grafo.addAresta('Nunavut', 'Northwest Territories');
grafo.addAresta('Nunavut', 'Manitoba');

console.log(grafo.bfs('Prince Edward Island'));