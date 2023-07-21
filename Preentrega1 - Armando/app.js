import express from 'express';
import productRouter from './routes/productRouter.js';
import cartRouter from './routes/cartRouter.js';

const app = express();

// Middleware para el manejo del body en formato JSON
app.use(express.json());

// Rutas para productos
app.use('/api/products', productRouter);

// Rutas para carritos
app.use('/api/carts', cartRouter);

app.use('*', (req, res) => {
	const path = req.params;
	const method = req.method;
	res.send({
		error: -1,
		description: `ruta '${path[0]}' método '${method}' no establecido`
	});
});

// Iniciar el servidor en el puerto 8080
app.listen(8080, () => {
  console.log('Servidor iniciado en el puerto 8080');
});
