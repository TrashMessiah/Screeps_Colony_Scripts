class ColonyControler {

    constructor() {
        this._harvesterCreeps = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
        this._builderCreeps = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
        this._upgraderCreeps = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
        // this._economicalLevel
        this._starterColonyLimbs = [WORK,CARRY,MOVE];
    }


    mantainBaseCreepCount() {
        if(this._harvesterCreeps < 2) {
            console.log('spawning harvester');
            spawnMissingCreep('Harvester', 'harvester', this._starterColonyLimbs);   
        }
    
        if(this._builderCreeps < 2) {
            console.log('spawning upgrader');
            spawnMissingCreep('Upgrader', 'upgrader', this._starterColonyLimbs);
        }
    
        if(this._upgraderCreeps < 2) {
            console.log('spawning builder');
            spawnMissingCreep('Builder', 'builder', this._starterColonyLimbs);
        }
    }

    runGameLoop() {
        for(let name in Game.creeps) {
            let creep = Game.creeps[name];
            if(creep.memory.role == 'harvester') {
                roleHarvester.run(creep);
            }
            if(creep.memory.role == 'upgrader') {
                roleUpgrader.run(creep);
            }
            if(creep.memory.role == 'builder') {
                roleBuilder.run(creep);
            }
        }
    }

    spawnMissingCreep(creepName, creepRole, creepLimbs) {
        const newName = `${creepName}` + Game.time;
        console.log(`Spawning new ${creepRole} ${newName}`);
        Game.spawns['TrashColony'].spawnCreep(creepLimbs, newName, 
            {memory: {role: `${creepRole}`}});   
    }
}



module.exports = ColonyControler;