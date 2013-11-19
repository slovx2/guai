/**
 * Created with JetBrains WebStorm.
 * User: Simon
 * Date: 13-11-18
 * Time: 下午12:14
 * To change this template use File | Settings | File Templates.
 */

var Deco = {
    createObject : function() {
        var object = {
        };
        return object;
    },

    decos: {},
    load : function() {
        this.decos = {};
        var fs = require('fs');
        var SkillSys = require('../model/SkillSys');
        var Make = require('../model/Make');
        var decoString = fs.readFileSync('./data/MH4DECO_utf8.csv', {encoding: 'UTF-8', flag: 'r' });
        var lines = decoString.split("\n");

        for (var i = 0; i < lines.length; i++) {
            var line = lines[i];
            if (line.charAt(0) == "#" || line.length == 0) continue;
            var temp = line.split(',');
            var deco = Deco.createObject();
            deco.name = temp[0];
            deco.rare = parseInt(temp[1]);
            deco.hole = parseInt(temp[2]);
            deco.gainHR = temp[3];
            deco.gainVillage = temp[4];

            var makes = [];
            var skillSyss = [];

            if (temp[5] && temp[6]) {
                skillSyss.push(SkillSys.createObject(temp[5], temp[6]));
            }
            if (temp[7] && temp[8]) {
                skillSyss.push(SkillSys.createObject(temp[7], temp[8]));
            }
            deco.skillSyss = skillSyss;

            if (temp[9] && temp[10]) {
                var make = Make.createObject();
                make.add(temp[9], temp[10]);
                make.add(temp[11], temp[12]);
                make.add(temp[13], temp[14]);
                make.add(temp[15], temp[16]);
                makes.push(make);
            }
            if (temp[17] && temp[18]) {
                var make = Make.createObject();
                make.add(temp[17], temp[18]);
                make.add(temp[19], temp[20]);
                make.add(temp[21], temp[22]);
                make.add(temp[23], temp[24]);
                makes.push(make);
            }
            deco.makes = makes;

            this.decos[deco.name] = deco;
        }
    }
}
Deco.load();
module.exports = Deco;
