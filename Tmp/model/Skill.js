/**
 * Created with JetBrains WebStorm.
 * User: Simon
 * Date: 13-11-18
 * Time: 下午12:14
 * To change this template use File | Settings | File Templates.
 */
var fs = require('fs');
var Deco = require('../model/Deco');
var Equip = require('../model/Equip');
var Skill = {
    createObject: function () {
        var object = {
            name: null,
            sys: null,
            value: null,
            type: 0,
            decos: {},
            arms : {},
            bodys : {},
            heads : {},
            legs : {},
            wsts : {},

            linkDeco: function () {
                var decos = Deco.decos;
                for (var i in decos) {
                    var deco = decos[i];
                    var skillSyss = deco.skillSyss;
                    if (skillSyss[0].name == this.sys) {
                        this.decos[deco.name] = deco;
                    }
                }
            },

            tempLinkEquip : function(equipType) {
                var equips = Equip[equipType];
                for (var i in equips) {
                    var arm = equips[i];
                    var skillSyss = arm.skillSyss;
                    for (var j in skillSyss) {
                        var skillSys = skillSyss[j];
                        if (skillSys.name == this.sys && skillSys.value > 0) {
                            this[equipType][arm.name] = arm;
                        }
                    }

                }
            },

            linkEquip: function () {
                this.tempLinkEquip('arms');
                this.tempLinkEquip('bodys');
                this.tempLinkEquip('heads');
                this.tempLinkEquip('legs');
                this.tempLinkEquip('wsts');
            }
        };


        return object;
    },
    skills: {},
    positives : {},
    nagetives : {},
    load: function () {
        var skillString = fs.readFileSync('./data/MH4SKILL_utf8.csv', {encoding: 'UTF-8', flag: 'r' });
        var lines = skillString.split("\n");

        for (var i = 0; i < lines.length; i++) {
            var line = lines[i];
            if (line.charAt(0) == "#" || line.length == 0) continue;
            var temp = line.split(',');
            var skill = Skill.createObject();
            skill.name = temp[0];
            skill.sys = temp[1];
            skill.value = parseInt(temp[2]);
            skill.type = temp[3];
            skill.linkDeco();
            skill.linkEquip();
            this.skills[skill.name] = skill;
            if (skill.value >= 0) {
                this.positives[skill.name] = skill;
            } else {
                this.nagetives[skill.name] = skill;
            }

        }
    }
}
Skill.load();
module.exports = Skill;
