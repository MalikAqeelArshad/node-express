const getRoutes = (app, req, res, next) => {
  const routes = []
  app._router.stack.map((r) => {
    if (r.name === 'router') {
      const prefix = r.regexp.toString().replace(/\/\^|\/\?|\/\$/g, '').replace('(?=\\/|$)', '').replace(/\\(.)/g, '$1').replace(/\/i\n/g, '').replace(/\/i$/, '');
      const url = req.protocol + '://' + req.get('host') + req.originalUrl + prefix.replace(/^\/|\/$/g, '');
      r.handle.stack?.map((r) => {
        const path = r.route?.path;
        r.route?.stack?.map((r) => {
          routes.push({
            method: r.method,
            path: path,
            prefix: prefix,
            url: (url + path).replace(/^\/|\/$/g, '')
          })
        })
      })
    }
  })

  return routes;
}
export default getRoutes;