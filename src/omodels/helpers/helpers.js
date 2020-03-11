"use strict";
const helpers = (function () {

const LeftSubstr = function (comptenumber, number) {
    if (number <= 0)
        return "";
    else if (number > String(comptenumber).length)
        return String(comptenumber);
    else
        return String(comptenumber).substring(0, number);
};

const replaceString = function (comptenumber) {
    let arr = [];
    for (let i = 2; i <= 4; i++) {
        arr.push(LeftSubstr(comptenumber, i));
    }
    return arr;
};

function toinit() {
    return {
        replaceString: replaceString
    };
}

return {
    toinit: toinit
};

})();
module.exports = {
toinit: helpers.toinit
};
