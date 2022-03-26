const Koa = require('koa');
const KoaRouter = require('koa-router');
const path = require('path');
const render = require('koa-ejs');
const axios = require('axios');

const app = new Koa();
const router = new KoaRouter();

render(app, {
  root: path.join(__dirname, 'views'),
  layout: "index",
  viewExt: "html",
});

router.get("/", async (ctx) => {
  const result = await axios.get("https://randomuser.me/api?results=5");
  return ctx.render("index", {
    users: result.data.results,
  });
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(3000, () => {
  console.log("Server start 3000...");
});