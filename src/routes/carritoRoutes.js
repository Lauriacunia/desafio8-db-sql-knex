import { Router } from "express";
const router = Router();
import ContenedorCarritos from "../contenedores/sql/contenedorCarritos.js";
const contenedor = new ContenedorCarritos();

router.get("/", async (req, res) => {
  try {
    const carritos = await contenedor.getAll();
    carritos
      ? res.status(200).json(carritos)
      : res.status(404).json({ message: "No hay carritos disponibles" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const carrito = await contenedor.getOne(req.params.id);
    carrito
      ? res.status(200).json(carrito)
      : res
          .status(404)
          .json({ message: "Carrito no encontrado. id: " + req.params.id });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const nuevoCarrito = await contenedor.create(req.body);
    res.status(201).json({
      message: "Carrito creado con éxito",
      carrito: nuevoCarrito,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// TODO: listas productos de un carrito
router.get("/:id/productos", async (req, res) => {
  try {
    const carrito = await contenedor.getOne(req.params.id);
    carrito
      ? res.status(200).json(carrito.productos)
      : res
          .status(404)
          .json({ message: "Carrito no encontrado. id: " + req.params.id });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//TODO: agregar productos a un carrito
router.post("/:id/productos", async (req, res) => {
  try {
    const carrito = await contenedor.getOne(req.params.id);
    const productos = req.body; // array de objetos
    if (carrito && productos) {
      const carritoUpdated = await contenedor.addProductos(carrito, productos);
      const newCarrito = await contenedor.getOne(carritoUpdated._id);
      res.status(201).json({
        message: "Productos agregados con éxito",
        carrito: newCarrito,
      });
    }
    if (!carrito) {
      res
        .status(404)
        .json({ message: "Carrito no encontrado. id: " + req.params.id });
    }
    if (!productos) {
      res.status(404).json({ message: "La lista de productos está vacía" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message, line: err.line });
  }
});

// borrar un producto de un carrito
router.delete("/:id/productos/:productoId", async (req, res) => {
  try {
    const carrito = await contenedor.getOne(req.params.id);
    const productoId = req.params.productoId;
    if (carrito && productoId) {
      const carritoUpdated = await contenedor.deleteProducto(
        carrito,
        productoId
      );
      const newCarrito = await contenedor.getOne(carritoUpdated._id);
      res.status(200).json({
        message: "Producto eliminado con éxito",
        carrito: newCarrito,
      });
    }
    if (!carrito) {
      res
        .status(404)
        .json({ message: "Carrito no encontrado. id: " + req.params.id });
    }
    if (!productoId) {
      res.status(404).json({ message: "El producto no existe" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// borrar un carrito por id
router.delete("/:id", async (req, res) => {
  try {
    const carrito = await contenedor.getOne(req.params.id);
    if (carrito) {
      const carritoDeleted = await contenedor.deleteById(req.params.id);
      res.status(200).json({
        message: "Carrito eliminado con éxito",
        carrito: carritoDeleted,
      });
    } else {
      res
        .status(404)
        .json({ message: "Carrito no encontrado. id: " + req.params.id });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
