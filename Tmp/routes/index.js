
/*
 * GET home page.
 */

var Skill = require('../model/Skill');
var Equip = require('../model/Equip');
exports.index = function(req, res){
//    for (var i in Skill.skills) {
//        var skill = Skill.skills[i];
//        console.log(typeof skill);
//    }
    res.render('page', { skills: Skill.positives, columnNumber : 4});
};