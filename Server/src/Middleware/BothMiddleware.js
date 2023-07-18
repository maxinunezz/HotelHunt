const BothAccess = async (req, res, next) => {
    console.log(userData);

    try {
        const { admin } = userData;
        if (admin === "normal" || admin === "admin" ) {
            next();
        }
        else {
            res.status(401).send('Access denied');
        }

    } catch (error) {
        res.status(401).json(error.message);
    }
};

module.exports = {
    BothAccess,
}