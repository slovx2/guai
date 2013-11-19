/**
 * Created with JetBrains WebStorm.
 * User: Simon
 * Date: 13-11-18
 * Time: 下午12:14
 * To change this template use File | Settings | File Templates.
 */

var fs = require('fs');
var SkillSys = require('../model/SkillSys');
var Make = require('../model/Make');
var Defense = require('../model/Defense');

var Equip = {
    createObject : function() {
        var object = {
        };
        return object;
    },
    arms : {},
    bodys : {},
    heads : {},
    legs : {},
    wsts : {},

    load : function(fileName) {
        var array = {};
        var decoString = fs.readFileSync(fileName, {encoding: 'UTF-8', flag: 'r' });
        var lines = decoString.split("\n");

        for (var i = 0; i < lines.length; i++) {
            var line = lines[i];
            if (line.charAt(0) == "#" || line.length == 0) continue;
            var temp = line.split(',');
            var equip = Equip.createObject();
            equip.name = temp[0];
            equip.sex = parseInt(temp[1]);
            equip.type = parseInt(temp[2]);
            equip.rare = parseInt(temp[3]);
            equip.hole = parseInt(temp[4]);
            equip.gainJi = parseInt(temp[5]);
            equip.gainVillage = parseInt(temp[6]);
            equip.defense = Defense.createObject(
                parseInt(temp[7]),
                parseInt(temp[8]),
                parseInt(temp[9]),
                parseInt(temp[10]),
                parseInt(temp[11]),
                parseInt(temp[12]),
                parseInt(temp[13])
            );

            var makes = [];
            var skillSyss = [];

            if (temp[14] && temp[15]) {
                skillSyss.push(SkillSys.createObject(temp[14], temp[15]));
            }
            if (temp[16] && temp[17]) {
                skillSyss.push(SkillSys.createObject(temp[16], temp[17]));
            }
            if (temp[18] && temp[19]) {
                skillSyss.push(SkillSys.createObject(temp[18], temp[19]));
            }
            if (temp[20] && temp[21]) {
                skillSyss.push(SkillSys.createObject(temp[20], temp[21]));
            }
            if (temp[22] && temp[23]) {
                skillSyss.push(SkillSys.createObject(temp[22], temp[23]));
            }
            equip.skillSyss = skillSyss;

            var make = Make.createObject();
            make.add(temp[24], temp[25]);
            make.add(temp[26], temp[27]);
            make.add(temp[28], temp[29]);
            make.add(temp[30], temp[31]);
            make.add(temp[32], temp[33]);
            makes.push(make);
            equip.makes = makes;

            array[equip.name] = equip;
        }
        return array;
    }
}
Equip.arms = Equip.load('./data/MH4EQUIP_ARM_utf8.csv');
Equip.bodys = Equip.load('./data/MH4EQUIP_BODY_utf8.csv');
Equip.heads = Equip.load('./data/MH4EQUIP_HEAD_utf8.csv');
Equip.legs = Equip.load('./data/MH4EQUIP_LEG_utf8.csv');
Equip.wsts = Equip.load('./data/MH4EQUIP_WST_utf8.csv');
module.exports = Equip;
