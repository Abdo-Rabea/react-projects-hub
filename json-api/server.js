const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("cities.json");
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);

// ⬇️ This line is the key: use Railway’s assigned port automatically
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`✅ JSON Server is running on port ${PORT}`);
});
