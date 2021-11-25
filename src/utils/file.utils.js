
function isJsonValid(strToCheck) {
    try {
        const jsonObject = JSON.parse(strToCheck)
        return jsonObject && typeof jsonObject === "object";
    } catch (e) {
        return false;
    }
}

module.exports = {
    isJsonValid,
};
