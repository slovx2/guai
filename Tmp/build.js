/**
 * Created with JetBrains WebStorm.
 * User: Simon
 * Date: 14-1-6
 * Time: 下午3:35
 * To change this template use File | Settings | File Templates.
 */

var exec = require('child_process').exec,
    child;
var fs = require('fs');
function updateLib(path) {
    var libstr = 'android.library.reference';
    var temp = fs.readFileSync(path, {encoding: 'UTF-8', flag: 'r' });
    var lines = temp.split("\n");
    for (var i in lines) {
        var line = lines[i];
        if (line.indexOf(libstr) != -1) {
            line = line.trim().substr(line.indexOf('=') + 1, line.length - 1);
            exe('svn update ' + line, '更新成功: ' + line, '更新失败');
            updateLib(line + '/project.properties')
        }
    }
}

function exe(cmd, succ, e) {
    child = exec(cmd, {maxBuffer: 1024 * 1024},
        function (error, stdout, stderr) {
            if (error != null) {
                console.error('exec error: ' + error);
                throw(e);
            } else {
                console.log(succ);
            }
        });
}

console.log('开始更新项目及依赖库...');
updateLib('project.properties');
console.log('开始打包...');
exe('call ant', '打包成功！', '打包失败！');