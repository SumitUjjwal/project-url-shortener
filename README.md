# cruel-team-7846-
# LILLYPUT
LILLYPUT is an URL shortener with Analysis
Deployed link: [LillyPut](https://lillyput.vercel.app/)

## directory structure :
```
.
├── back-end
│   └── config
│       └── db.js
│   └── middlewares
│       └── authenticate.middleware.js
│       └── validator.middleware.js
│   └── models
│       └── order.model.js
│       └── product.model.js
│       └── user.model.js
│   └── routes
│       └── order.route.js
│       └── product.route.js
│       └── user.route.js
│   └── index.js
│   └── package-lock.json
│   └── package.json
├── front-end
│   └── admin-panel
│   └── html
│   └── resources
│   └── script
│   └── style
│   └── index.html
└── README.md
```

# API Endpoints
## baseUrl :
```
       https://vast-rose-jellyfish-wrap.cyclic.app
```

## user :
```
       login -> POST `${baseUrl}/user/login`
       register -> POST `${baseUrl}/user/register`
```

## Shorten :
```
       create -> POST `${baseUrl}/product/create`
       read -> GET `${baseUrl}/product/`
       read(query) -> POST `${baseUrl}/product?q='query'`
       read(sort=asc) -> POST `${baseUrl}/product?sort=asc`
       read(sort=desc) -> POST `${baseUrl}/product?sort=desc`
       update -> PATCH `${baseUrl}/product/update/:id`
       delete -> DELETE `${baseUrl}/product/delete/:id`
```
