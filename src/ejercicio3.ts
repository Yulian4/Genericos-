// Definición de la clase Propietario
class Propietario {
    constructor(
        public nombre: string,
        public email: string
    ) {}
}

// Definición de la clase Apartamento
class Apartamento {
    constructor(
        public numero: number,
        public habitaciones: number,
        public metros: number,
        public propietarios: Propietario[] = []
    ) {}

    agregarPropietario(propietario: Propietario): void {
        this.propietarios.push(propietario);
    }
}

// Definición de la clase Edificio
class Edificio {
    private apartamentos: Apartamento[] = [];

    constructor(public direccion: string) {}

    agregarApartamento(apartamento: Apartamento): void {
        this.apartamentos.push(apartamento);
    }

    eliminarApartamento(numero: number): void {
        this.apartamentos = this.apartamentos.filter(apto => apto.numero !== numero);
    }

    buscarApartamento(numero: number): Apartamento | undefined {
        return this.apartamentos.find(apto => apto.numero === numero);
    }

    agregarPropietario(numero: number, propietario: Propietario): void {
        const apartamento = this.buscarApartamento(numero);
        if (apartamento) {
            apartamento.agregarPropietario(propietario);
        }
    }

    cobrarRenta(): void {
        console.log("Cobrando renta a todos los inquilinos...");
        this.apartamentos.forEach(apto => {
            apto.propietarios.forEach(propietario => {
                console.log(`Cobrando renta a ${propietario.nombre} (${propietario.email}) del apartamento ${apto.numero}`);
            });
        });
    }

    listarApartamentos(): void {
        console.log(`Apartamentos en ${this.direccion}:`);
        this.apartamentos.forEach(apto => {
            console.log(`Apartamento ${apto.numero} - ${apto.habitaciones} habitaciones, ${apto.metros} m²`);
            apto.propietarios.forEach(prop => {
                console.log(`   Propietario: ${prop.nombre} (${prop.email})`);
            });
        });
    }
}

// Ejemplos de uso
const edificio = new Edificio("123 Calle Principal");

const apto1 = new Apartamento(101, 3, 120);
const apto2 = new Apartamento(102, 2, 80);

const prop1 = new Propietario("Juan Perez", "juan.perez@example.com");
const prop2 = new Propietario("Ana Garcia", "ana.garcia@example.com");

edificio.agregarApartamento(apto1);
edificio.agregarApartamento(apto2);

edificio.agregarPropietario(101, prop1);
edificio.agregarPropietario(102, prop2);

edificio.listarApartamentos();
edificio.cobrarRenta();

edificio.eliminarApartamento(101);

edificio.listarApartamentos();
