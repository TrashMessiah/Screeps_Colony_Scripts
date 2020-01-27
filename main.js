const colonyControler = require('ColonyControler');
const ColonyControler = new colonyControler.ColonyControler();

module.exports.loop = function () {
    ColonyControler.mantainBaseCreepCount();
    ColonyControler.runGameLoop();
};