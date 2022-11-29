import knex from "knex";
import { options } from "../../config/configDB.js";
const db = knex(options.mysql);
//const table = "productos";

/**🗨 Éstas líneas realizan un CRUD para cualquier entidad 
 *   reciben el nombre de la tabla a utilizar en su constructor.
*/
class ContenedorBase {
  constructor(table) {
    this.table = table;
  }
  async getAll() {
    try {
      const items = await db(this.table).select("*");
      return items;
    } catch (error) {
      return error.message;
    }
  }
  async getOne(id) {
    try {
      const item = await db(this.table).select("*").where("id", id);
      return item;
    } catch (error) {
      return error.message;
    }
  }
  async create(body) {
    try {
      const new_product_id = await db(this.table).insert(body);
      const new_product = await db(this.table).select("*").where("id", new_product_id);
      return new_product;
    } catch (error) {
      return error.message;
    }
  }
  async update(id, body) {
    try {
      const { nombre, descripcion, codigo, foto, precio, stock } = body;
      const timestamp = new Date();
      await db(this.table).where("id", id).update({
        nombre,
        descripcion,
        codigo,
        foto,
        precio,
        stock,
        timestamp,
        });
      const updated_product = this.getOne(id);
      return updated_product;

    } catch (error) {
      return error.message;
    }
  }
  async deleteById(id) {
    try {
      const { id } = req.params;
      const product = await db(this.table).where("id", id).del();
      res.status(200).json({
        message: "Product deleted",
        product_id: product,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

export default ContenedorBase;
