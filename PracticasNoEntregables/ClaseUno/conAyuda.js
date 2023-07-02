class Contador  {  
    constructor(responsableContador) {
        this.responsableContador = responsableContador;
        this.cuentaIndividual = 0;
        Contador.contadorGlobal;
    }

    static contadorGlobal = 0;

    getResponsable () {
        return this.responsableContador;
    }
    contar () {
        this.cuentaIndividual ++;
        Contador.contadorGlobal ++;
    }
    getCuentaIndividual () {
        return this.cuentaIndividual;
    }
    static getCuentaGlobal () {
        return Contador.contadorGlobal;
    }
}

const contador1 = new Contador ('Juan');
contador1.contar();
contador1.contar();
contador1.contar();
console.log(contador1.getResponsable());
console.log(contador1.getCuentaIndividual());
console.log(Contador.getCuentaGlobal());

const contador2 = new Contador ('Pedro');
contador2.contar();  
console.log(contador2.getResponsable());
console.log(contador2.getCuentaIndividual());
console.log(Contador.getCuentaGlobal());