# Our Democracy API

Una API para solicitar tweets y analizarlos vía MonkeyLearn.

## Deploy

- instalar docker
- para instalar imagen: sh build
- para ver imagenes: docker images
- para crear contenedor: sh run
- npm install
- gulp serve (development mode)
- npm start (production mode)

### Antes de ejecutar cualquier endpoint se debe solicitar un token

    GET : /api/auth/token

### Para hacer una búsqueda de un `keyword` en Twitter

    GET : /api/search/something

  queryParams opcionales:

    type    : recent (default: popular)
    count   : 100 (default: 15)
    analize : true (default: false)
