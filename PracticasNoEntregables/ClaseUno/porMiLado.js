class Contador {
    static contadorGlobal = 0;
  
    constructor(nombre) {
      this.nombre = nombre;
      this.cuentaIndividual = 0;
    }
  
    getResponsable() {
      return this.nombre;
    }
  
    contar() {
      this.cuentaIndividual++;
      Contador.contadorGlobal++;
    }
  
    getCuentaIndividual() {
      return this.cuentaIndividual;
    }
  
    getCuentaGlobal() {
      return Contador.contadorGlobal;
    }
  }
  
  // Prueba de individualidad entre las instancias
  const contador1 = new Contador("Responsable 1");
  const contador2 = new Contador("Responsable 2");
  
  contador1.contar(); // Incrementa el contador individual y global en contador1
  contador1.contar(); // Incrementa el contador individual y global en contador1
  contador2.contar(); // Incrementa el contador individual y global en contador2
  
  console.log(contador1.getResponsable()); // "Responsable 1"
  console.log(contador1.getCuentaIndividual()); // 2
  console.log(contador1.getCuentaGlobal()); // 3
  
  console.log(contador2.getResponsable()); // "Responsable 2"
  console.log(contador2.getCuentaIndividual()); // 1
  console.log(contador2.getCuentaGlobal()); // 3