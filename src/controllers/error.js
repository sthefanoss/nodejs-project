module.exports.get404Page = (request, response, next) => {
    response.status(404).render('error/404', { pageTitle: 'Page not Found' });
};
