let data = require('../model/content');
let fs = require('fs');
module.exports.getLists = (cate, page) => {
    let det = {};
    switch(cate) {
        case 'news':
            det = data.getNewsList('', page);
            break;
        case 'activity':
            det = data.getActivityList('', page);
            break;
        case 'tech':
            det = data.getTechList('', page);
            break;
        case 'story':
            det = data.getStoryList('', page);
            break;
        default:
            det = {content: 'err'};
    }
    return det;
};
module.exports.getContent = (cate, id) => {
    let det = '';
    switch(cate) {
        case 'news':
            det = data.getNewsList(id);
            break;
        case 'activity':
            det = data.getActivityList(id);
            break;
        case 'tech':
            det = data.getTechList(id);
            break;
        case 'story':
            det = data.getStoryList(id);
            break;
        default:
            det = {content: 'err'};
    }
    return det;
};
module.exports.getIdx = () => {
    let navd = JSON.parse(fs.readFileSync('server/data/navs.json'));
    let footerd = JSON.parse(fs.readFileSync('server/data/footer.json'));
    return {nav: navd, footer: footerd};
};