const whiteList = ["127.0.0.1:6000"]

const corsOptions = (req, callback) => {
    let corsOptions;

    if (whiteList.indexOf(req.header("Origin")) !== -1) {
        console.log(" if de");
        corsOptions = { origin: true }
    } else {
        corsOptions = { origin: false }
        console.log("lese if de");
    }
}

module.exports = corsOptions