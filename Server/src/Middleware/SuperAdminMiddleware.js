const SuperAdminCheck = async (req, res, next) => {

    try {
        const { admin } = userData;
        if (admin === "super") {
            next();
        }
        else {
            res.status(401).send('Acceso denegado');
        }

    } catch (error) {
        res.status(401).json(error.message);
    }
};

module.exports = {
    SuperAdminCheck,
}