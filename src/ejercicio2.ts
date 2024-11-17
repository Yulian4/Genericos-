class Producto {
    constructor(
        public nombre: string,
        public precio: number
    ) {}

    toString(): string {
        return `${this.nombre} - $${this.precio.toFixed(2)}`;
    }
}
class CajaRegistradora {
    private productos: Producto[] = [];
    private total: number = 0;

    cobrar(producto: Producto): void {
        this.productos.push(producto);
        this.total += producto.precio;
    }

    imprimirTicket(): void {
        console.log("Ticket de Compra:");
        this.productos.forEach(producto => console.log(producto.toString()));
        console.log(`Total: $${this.total.toFixed(2)}`);
    }
}

const caja = new CajaRegistradora();

const manzana = new Producto("Manzana", 1.20);
const leche = new Producto("Leche", 2.50);
const pan = new Producto("Pan", 1.00);

caja.cobrar(manzana);
caja.cobrar(leche);
caja.cobrar(pan);

caja.imprimirTicket();
