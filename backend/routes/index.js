const express = require("express");
const router = express.Router();
const apiRouter = require("./api");
// setting a cookie on the response with the name XSRF-Token to the
// value of req.csrfToken

// Add a XSRF-TOKEN cookie
router.get("/api/csrf/restore", (req, res) => {
	const csrfToken = req.csrfToken();
	res.cookie("XSRF-TOKEN", csrfToken);
	res.status(200).json({
		"XSRF-Token": csrfToken,
	});
});

router.use("/api", apiRouter);

module.exports = router;
