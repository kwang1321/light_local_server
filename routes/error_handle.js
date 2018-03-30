// Since this is the last non-error-handling
// middleware use()d, we assume 404, as nothing else
// responded.
module.exports = app => {
  // $ curl http://localhost:5000/notfound
  // $ curl http://localhost:5000/notfound -H "Accept: application/json"
  // $ curl http://localhost:5000/notfound -H "Accept: text/plain"
  app.use(function(req, res, next) {
    res.status(404);
    res.send({ error: "404 Page Not found" });
  });

  app.use(function(req, res, next) {
    var l = process.once("unhandledRejection", function(reason, p) {
      console.log("Unhandled Rejection:", reason.stack);
      res.status(500).send("Unknown Error");
      //next(reason);
    });
    next();
    process.removeEventLister("unhandledRejection", l);
  });
  // error-handling middleware, take the same form
  // as regular middleware, however they require an
  // arity of 4, aka the signature (err, req, res, next).
  // when connect has an error, it will invoke ONLY error-handling
  // middleware.

  // If we were to next() here any remaining non-error-handling
  // middleware would then be executed, or if we next(err) to
  // continue passing the error, only error-handling middleware
  // would remain being executed, however here
  // we simply respond with an error page.

  // error handler
  app.use(function(err, req, res, next) {
    if (res.headersSent) {
      return next(err);
    }
    res.status(err.status || 500);
    res.send({ ServerError: err });
  });
};
