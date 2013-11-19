/**
 * Created with JetBrains WebStorm.
 * User: Simon
 * Date: 13-11-19
 * Time: 下午3:40
 * To change this template use File | Settings | File Templates.
 */


exports.search = function(req, res) {
    var skills = req.body.skills;
    for (var i in skills) {
        console.log(skills[i]);
    }
    res.send('---------------');
}