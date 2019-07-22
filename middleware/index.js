module.exports = {
    asyncErrorHandler: (fn) =>
        //callback anonymous function 
		(req, res, next) => {
			Promise.resolve(fn(req, res, next))
						 .catch(next);
		}
}