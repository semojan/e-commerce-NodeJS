function getSessionData (req){
    const sessionData = req.session.inputData;

    req.session.inputData = null;

    return sessionData;
}

function flashDataToSession (req, data, action) {
    req.session.inputData = data;
    req.session.save(action);
}

module.exports = {
    getSessionData: getSessionData,
    flashDataToSession: flashDataToSession
};