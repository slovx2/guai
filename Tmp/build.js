/**
 * Created with JetBrains WebStorm.
 * User: Simon
 * Date: 14-1-6
 * Time: 下午3:35
 * To change this template use File | Settings | File Templates.
 */
const APK_NAME_RAW = "Vipshop-mini-release.apk";
const APK_NAME_PREFIX = "Vipshop_mini";
var spawn = require('child_process').spawn;
var fs = require('fs');
var revision;

function afterSvnInfo(code) {
    if (code == 0) {
        var version = '?';
        var data = fs.readFileSync('AndroidManifest.xml') + "";
        var re = /android:versionName/;
        var lines = data.split('\n');
        for (var i in lines) {
            if (re.test(lines[i])) {
                re = /"([0-9]|[a-z]|[A-Z]|\.)*"/;
                var atts = re.exec(lines[i]);
                version = atts[0].substring(1, atts[0].length - 1);
                break;
            }
        }
        var newName = APK_NAME_PREFIX + "_" + version + "_svn_" + revision + ".apk";
        fs.rename('bin/' + APK_NAME_RAW, 'bin/' + newName, function (err) {
            if (err) throw err;
            console.log('重命名完成');
        });
    }
}

function afterPackage(code) {
    if (code == 0) {
        console.log('打包成功，开始获取svn号');
        var p_svnInfo = spawn('cmd.exe', ['/c', 'svn', 'info']);
        p_svnInfo.stdout.on('data', function (data) {
            var info = data + "";
            var lines = info.split('\n');
            var re = /[0-9]+/;
            var atts = re.exec(lines[5]);
            revision = atts[0];
            console.log('版本号为：' + revision);
        });
        p_svnInfo.on('close', afterSvnInfo);

        p_svnInfo.stderr.on('data', function (data) {
            console.error(data + "");
        });
    } else {
        console.log('打包出错');
    }
}

function afterUpdate(code) {
    if (code == 0) {
        console.log('开始打包...');
        var p_package = spawn('cmd.exe', ['/c', 'ant']);
        p_package.stdout.on('data', function (data) {
            console.log(data + "");
        });
        p_package.stderr.on('data', function (data) {
            console.error(data + "");
        });
        p_package.on('close', afterPackage);
    }
}

console.log('svn更新……');
var p_package = spawn('cmd.exe', ['/c', 'svn', 'update']);
p_package.stdout.on('data', function (data) {
    console.log(data + "");
});
p_package.stderr.on('data', function (data) {
    console.error(data + "");
});
p_package.on('close', afterUpdate);

