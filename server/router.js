module.exports = (app, router)=>{
	let content = require('./controller/content');
	router
	.get('/list/:cate/:page', async(ctx, next) => {
		ctx.body = await content.getLists(ctx.params.cate, ctx.params.page);
	})
	.get('/detail/:cate/:id', async(ctx, next) => {
		ctx.body = await content.getContent(ctx.params.cate, ctx.params.id);
	})
	.get('/idxdata', (ctx, next) => {
		ctx.body = content.getIdx();
	});
}