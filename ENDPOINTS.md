
## 📦 Endpoints de Productos

### `POST /api/products`
Crear un nuevo producto
```json
{
  "title": "Producto ejemplo",
  "description": "Descripción del producto",
  "code": "PROD001",
  "price": 100,
  "status": true,
  "stock": 50,
  "category": "Electrónica",
  "thumbnails": ["url1", "url2"]
}
```

### `GET /api/products`
Obtener productos con filtros, paginación y ordenamiento

**Query Parameters:**
- `limit` (default: 10): Cantidad de productos por página
- `page` (default: 1): Número de página
- `sort`: Ordenamiento por precio (`asc` o `desc`)
- `category`: Filtrar por categoría
- `status`: Filtrar por estado (`true` o `false`)
- `minPrice`: Precio mínimo
- `maxPrice`: Precio máximo

**Ejemplos:**
- `GET /api/products?limit=5&page=1&sort=asc`
- `GET /api/products?category=Electrónica&status=true`
- `GET /api/products?minPrice=100&maxPrice=500&sort=desc`

**Respuesta:**
```json
{
  "status": "success",
  "payload": [...],
  "total": 100,
  "limit": 10,
  "page": 1,
  "totalPages": 10,
  "hasPrevPage": false,
  "hasNextPage": true,
  "prevPage": null,
  "nextPage": 2
}
```

### `GET /api/products/:pid`
Obtener producto por ID

### `PUT /api/products/:pid`
Actualizar producto

### `DELETE /api/products/:pid`
Eliminar producto

---

## 🛒 Endpoints de Carritos

### `POST /api/carts`
Crear un nuevo carrito vacío

**Respuesta:**
```json
{
  "status": "success",
  "payload": {
    "_id": "...",
    "products": [],
    "createdAt": "...",
    "updatedAt": "..."
  }
}
```

### `GET /api/carts`
Obtener todos los carritos (con productos poblados)

### `GET /api/carts/:cid`
Obtener carrito por ID (con productos poblados)

**Respuesta:**
```json
{
  "status": "success",
  "payload": {
    "_id": "...",
    "products": [
      {
        "product": {
          "_id": "...",
          "title": "Producto",
          "price": 100,
          ...
        },
        "quantity": 2
      }
    ]
  }
}
```

### `POST /api/carts/:cid/product/:pid`
Agregar producto al carrito (o incrementar cantidad si ya existe)

### `PUT /api/carts/:cid/product/:pid`
Actualizar cantidad de un producto en el carrito

**Body:**
```json
{
  "quantity": 5
}
```

### `DELETE /api/carts/:cid/product/:pid`
Eliminar un producto del carrito

### `DELETE /api/carts/:cid`
Vaciar carrito (eliminar todos los productos)

### `DELETE /api/carts/:cid/delete`
Eliminar carrito completamente

---

## 🧪 Ejemplos de Uso

### Crear un producto
```bash
curl -X POST http://localhost:8080/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Laptop",
    "description": "Laptop gaming",
    "code": "LAP001",
    "price": 1500,
    "stock": 10,
    "category": "Electrónica"
  }'
```

### Obtener productos con filtros
```bash
curl "http://localhost:8080/api/products?category=Electrónica&minPrice=1000&sort=asc&limit=5"
```

### Crear un carrito
```bash
curl -X POST http://localhost:8080/api/carts
```

### Agregar producto al carrito
```bash
curl -X POST http://localhost:8080/api/carts/{cartId}/product/{productId}
```

---

## 📝 Notas Importantes

1. **MongoDB debe estar corriendo** en `localhost:27017`
2. La base de datos se llama `BEI`
3. Los modelos están en `models/product.model.js` y `models/cart.model.js`
4. Los servicios están en `services/products.service.js` y `services/carts.service.js`
5. Todos los endpoints ahora usan MongoDB en lugar de archivos

