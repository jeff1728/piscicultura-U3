const express = require('express');
const { Pool } = require('pg');
const path = require('path');
const app = express();
const port = 3000;

// Configuración de la conexión a PostgreSQL
const pool = new Pool({
    user: 'postgres',
    password: 'contrasena',
    host: '192.168.2.134',
    port: 5432,
    database: 'pisciculturaU2',
});
// Configuración para servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Ruta para obtener datos de la base de datos
app.get('/api/data', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM comercializacion.cliente');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error en la consulta');
  }
});


// Ruta para actualizar datos en la base de datos
app.post('/api/update', express.json(), async (req, res) => {
    const { id_cliente, nuevo_nombre } = req.body;
    try {
      const result = await pool.query('UPDATE comercializacion.cliente SET nombre = $1 WHERE id_cliente = $2 RETURNING *', [nuevo_nombre, id_cliente]);
      if (result.rowCount > 0) {
        res.json(result.rows[0]);
      } else {
        res.status(404).send('Cliente no encontrado');
      }
    } catch (err) {
      console.error(err);
      res.status(500).send('Error en la actualización');
    }
  });
  

  // Ruta para obtener la lista de peces
app.get('/api/peces', async (req, res) => {
  try {
      const result = await pool.query('SELECT id_pez, nombre, informacion FROM Cosecha.Peces');
      res.json(result.rows);
  } catch (err) {
      console.error(err);
      res.status(500).send('Error en la consulta');
  }
});





// Ruta para obtener la lista de clientes
app.get('/api/clientes', async (req, res) => {
  try {
      const result = await pool.query('SELECT id_cliente, nombre, direccion, email, telefono FROM Comercializacion.Cliente');
      res.json(result.rows);
  } catch (err) {
      console.error(err);
      res.status(500).send('Error en la consulta de clientes');
  }
});


// Ruta para obtener el historial de pedidos de un cliente
app.get('/api/pedidos', async (req, res) => {
  try {
      const result = await pool.query('SELECT * FROM Comercializacion.Detalle_venta');
      res.json(result.rows);
  } catch (err) {
      console.error(err);
      res.status(500).send('Error al obtener los pedidos');
  }
});



// Ruta para agregar un nuevo pedido
app.post('/api/pedidos', express.json(), async (req, res) => {
  const { cliente_id, estanque_id, fecha_pedido, cantidad, precio } = req.body;
  try {
      const result = await pool.query(
          `INSERT INTO Comercializacion.Detalle_venta 
          (cliente_id, estanque_id, fecha_pedido, cantidad, precio) 
          VALUES ($1, $2, $3, $4, $5) RETURNING *`,
          [cliente_id, estanque_id, fecha_pedido, cantidad, precio]
      );
      res.json(result.rows[0]);
  } catch (err) {
      console.error(err);
      res.status(500).send('Error al agregar el pedido');
  }
});

// Endpoint para obtener los datos de una vista específica de PostgreSQL
app.get('/api/views', async (req, res) => {
    const viewType = req.query.type;  // Nombre de la vista que queremos consultar
    const schema = req.query.schema;  // Esquema al que pertenece la vista

    // Construimos la consulta para seleccionar todos los datos de la vista seleccionada
    const query = `
        SELECT * FROM ${schema}.${viewType}
    `;

    try {
        // Ejecutamos la consulta en la base de datos PostgreSQL
        const result = await pool.query(query);
        res.json(result.rows);  // Enviamos los datos obtenidos al cliente
    } catch (err) {
        console.error('Error ejecutando la consulta:', err);
        res.status(500).send('Error al obtener los datos de la vista.');
    }
}); 

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
