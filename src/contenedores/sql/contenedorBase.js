import knex from "knex";
import { options } from "../../config/configDB.js";
const db = knex(options.mysql);
const table = "products";

/**🗨 Éstas líneas realizan un CRUD para cualquier entidad */
class ContenedorBase {
  constructor() {}
  async getAll() {
    try {
      const products = await db(table).select("*");
      res.status(200).json({ products: products });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  async getOne(id) {
    try {
      const product = await db(table).select("*").where("id", id);
      !product.length
        ? res.status(404).json({ message: "Product not found" })
        : res.status(200).json({ product: product });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  async create(body) {
    try {
      const product = await db(table).insert(body);
      const new_product = await db(table).select("*").where("id", product);
      res.status(201).json({
        message: "Product created",
        new_product: new_product,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  async update(id, body) {
    try {
      const { name, description, price, thumbnail, code, stock } = req.body;
      await db(table).where("id", id).update(body);
      const product_updated = await knex(options.mysql)("products")
        .select("*")
        .where("id", id);
      res.status(200).json({
        message: "Product updated",
        product: product_updated,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  async deleteById(id) {
    try {
      const { id } = req.params;
      const product = await db(table).where("id", id).del();
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
