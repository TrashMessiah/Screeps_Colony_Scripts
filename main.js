const roleHarvester = require('role.harvester');
const roleUpgrader = require('role.upgrader');
const roleBuilder = require('role.builder');

module.exports.loop = function () {
    
    const harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    const builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    const upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    console.log('Harvesters: ' + harvesters.length);

    if(harvesters.length < 2) {
        console.log('spawning harvester');
        spawnMissingCreep('Harvester', 'harvester', [WORK,CARRY,MOVE]);   
    }

    if(upgraders.length < 2) {
        console.log('spawning upgrader');
        spawnMissingCreep('Upgrader', 'upgrader', [WORK, CARRY, MOVE]);
    }

    if(builders.length < 2) {
        console.log('spawning builder');
        spawnMissingCreep('Builder', 'builder', [WORK, CARRY, MOVE]);
    }


    
    const tower = Game.getObjectById('35a2826e458cfbd225909967');
    if(tower) {
        const closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => structure.hits < structure.hitsMax
        });
        if(closestDamagedStructure) {
            tower.repair(closestDamagedStructure);
        }

        const closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile) {
            tower.attack(closestHostile);
        }
    }

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

    function spawnMissingCreep(creepName, creepRole, creepLimbs) {
        const newName = `${creepName}` + Game.time;
        console.log(`Spawning new ${creepRole} ${newName}`);
        Game.spawns['TrashColony'].spawnCreep(creepLimbs, newName, 
            {memory: {role: `${creepRole}`}});   
    }
};