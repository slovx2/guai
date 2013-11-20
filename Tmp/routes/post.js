/**
 * Created with JetBrains WebStorm.
 * User: Simon
 * Date: 13-11-19
    * Time: 下午3:40
* To change this template use File | Settings | File Templates.
    */
//var util = require('../util/util');
var Skill = require('../model/Skill');
exports.search = function(req, res) {
    var reqData = JSON.parse(req.body.skills);
    var reqSkills = {};
    for (var i in reqData) {
        reqSkills[i] = Skill.skills[i];
    }

    var fitBody = {};
    for (var i in reqSkills) {
        var skill = reqSkills[i];
        var linkBodys = skill.bodys;
        for (var j in linkBodys) {
            fitBody[j] = linkBodys[j];
        }
    }
    for (var i in fitBody) {
        console.log(i);
        console.log(fitBody[i].skillSyss);
    }
    res.send('----------');
}