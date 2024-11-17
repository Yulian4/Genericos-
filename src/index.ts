class Cita {
    constructor(
        public paciente: string,
        public doctor: string,
        public fecha: string,
        public hora: string,
        public motivo: string
    ) {}

    toString(): string {
        return `Cita con ${this.doctor} para ${this.paciente} el ${this.fecha} a las ${this.hora} por ${this.motivo}`;
    }
}

class AdministradorCitas<T extends Cita> {
    private items: T[] = [];

    agregar(item: T): void {
        this.items.push(item);
    }

    eliminar(item: T): void {
        const index = this.items.indexOf(item);
        if (index > -1) {
            this.items.splice(index, 1);
        }
    }

    actualizar(item: T, nuevosDatos: Partial<T>): void {
        const index = this.items.indexOf(item);
        if (index > -1) {
            this.items[index] = { ...this.items[index], ...nuevosDatos };
        }
    }

    buscar(condicion: (item: T) => boolean): T[] {
        return this.items.filter(condicion);
    }

    listar(): T[] {
        return this.items;
    }
}

const gestorCitas = new AdministradorCitas<Cita>();
gestorCitas.agregar(new Cita("Juan Pérez", "Dra. Martínez", "2024-11-20", "10:00", "Consulta general"));
gestorCitas.agregar(new Cita("María López", "Dr. Gómez", "2024-11-20", "11:00", "Revisión dental"));
gestorCitas.agregar(new Cita("Carlos Ruiz", "Dra. Martínez", "2024-11-21", "09:30", "Chequeo de rutina"));

function citasHoy(): Cita[] {
    const hoy = new Date().toISOString().split('T')[0];
    return gestorCitas.buscar(cita => cita.fecha === hoy);
}

function citasFecha(fecha: string): Cita[] {
    return gestorCitas.buscar(cita => cita.fecha === fecha);
}

function citasPorPaciente(paciente: string): Cita[] {
    return gestorCitas.buscar(cita => cita.paciente === paciente);
}

function citasFuturas(): Cita[] {
    const hoy = new Date().toISOString().split('T')[0];
    return gestorCitas.buscar(cita => cita.fecha > hoy);
}

const nuevaCita = new Cita("Laura García", "Dr. Gómez", "2024-11-21", "14:00", "Consulta de seguimiento");
gestorCitas.agregar(nuevaCita);

const citaAEliminar = gestorCitas.listar()[1];
gestorCitas.eliminar(citaAEliminar);

const citaAActualizar = gestorCitas.listar()[0];
gestorCitas.actualizar(citaAActualizar, { motivo: "cita del año" });

console.log("Citas con Dr. Martínez:");
gestorCitas.buscar(cita => cita.doctor === "Dr. Martínez").forEach(cita => console.log(cita.toString()));

console.log("\nCitas de hoy:");
citasHoy().forEach(cita => console.log(cita.toString()));

console.log("\nCitas para el 2024-11-21:");
citasFecha("2024-11-21").forEach(cita => console.log(cita.toString()));

console.log("\nCitas de Laura García:");
citasPorPaciente("Laura García").forEach(cita => console.log(cita.toString()));

console.log("\nCitas futuras:");
citasFuturas().forEach(cita => console.log(cita.toString()));
