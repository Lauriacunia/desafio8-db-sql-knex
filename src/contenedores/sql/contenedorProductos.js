import ContenedorBase from "./contenedorBase.js";

class ContenedorProductos extends ContenedorBase {
  constructor() {
   
    /** 🗨 Ésta clase hereda de ContenedorBase por lo que puede acceder
     * a todos sus métodos y propiedades.
     */
    super( "productos" );
  }
 
}

export default ContenedorProductos;
