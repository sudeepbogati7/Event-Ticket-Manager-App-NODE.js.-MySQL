const isOrganizer = (req, res, next) => {
    if(!req.user || !req.user.isOrganizer){
        return res.status(403).json({sucess : false, error : "Unauthorized . User is not an organizer"});
    }
    next();
}

module.exports = isOrganizer;