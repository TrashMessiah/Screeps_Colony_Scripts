const roleHarvester = require('role.harvester');
const roleUpgrader = require('role.upgrader');
const roleBuilder = require('role.builder');

module.exports.loop = function () {
    
    const harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    const builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    const upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    console.log('Harvesters: ' + harvesters.length);

    if(harvesters.length < 2) {
        const newName = 'Harvester' + Game.time;
        console.log('Spawning new harvester: ' + newName);
        Game.spawns['TrashColony'].spawnCreep([WORK,CARRY,MOVE], newName, 
            {memory: {role: 'harvester'}});        
    }

    if(upgraders.length < 2) {
        spawnMissingCreep('Upgrader', 'upgrader', [WORK, CARRY, MOVE]);
    }

    if(builders.length < 2) {
        spawnMissingCreep('Builder', 'builder', [WORK, CARRY, MOVE]);
    }


    
    var tower = Game.getObjectById('35a2826e458cfbd225909967');
    if(tower) {
        var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => structure.hits < structure.hitsMax
        });
        if(closestDamagedStructure) {
            tower.repair(closestDamagedStructure);
        }

        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile) {
            tower.attack(closestHostile);
        }
    }

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
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
}