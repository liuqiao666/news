const Koa = require('koa');
const serve = require('koa-static');
const router = require('koa-router')();
const indexRoute = require('./server/router.js');

const app = new Koa();
app.use(router.routes());
app.use(serve(__dirname+ "/views/public",{ extensions: ['html', 'js', 'css']}));

indexRoute(app, router);

app.use(ctx => {
  ctx.render('/views/public/index.html');
});

app.use(router.routes()).use(router.allowedMethods());

// 在端口3000监听:
app.listen(3000);
console.log('app started at port 3000...');
