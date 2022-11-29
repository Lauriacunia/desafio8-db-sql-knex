import { options } from './configDB.js';
import knex from 'knex';

const productos = [
    {
        "nombre": "Remera",
        "descripcion": "Talle 2",
        "codigo": 24567,
        "foto": "htttt/jkljkhj",
        "precio": 4500,
        "stock": 23
    },
    {
        "nombre": "Pantalón",
        "descripcion": "Talle 3",
        "codigo": 24987,
        "foto": "htttt/jkljkhj",
        "precio": 3500,
        "stock": 45
    },
    {
        "nombre": "Vestido ",
        "descripcion": "Talle 4",
        "codigo": 36987,
        "foto": "htttt/jkljkhj",
        "precio": 7500,
        "stock": 6
    },
];

(async () => {
    const db = knex(options.mysql);
    try {
        /**create table */
        await db.schema.createTableIfNotExists('productos', (table) => {
            table.increments('id').primary();
            table.string('nombre');
            table.string('descripcion');
            table.integer('precio');
            table.integer('stock');
            table.string('foto');
            table.string('codigo');
            table.dateTime('timestamp').defaultTo(db.fn.now());
        });
        /** 🦸‍♀️ CREATE - Insert raw (insertar uno o mas  registro(s))*/
        await db('productos').insert(productos);
        console.log("✅ Datos insertados con éxito 🎉");
       
    } catch (err) {
        console.log(err);
    }
})();