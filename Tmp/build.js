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
            console.log('Rename completed');
        });
    }
}

function afterPackage(code) {
    if (code == 0) {
        var buffer = "";
        console.log('Get revision.....');
        var p_svnInfo = spawn('cmd.exe', ['/c', 'svn', 'info']);
        p_svnInfo.stdout.on('data', function (data) {
            buffer += data;
            var info = data + "";
            var lines = info.split('\n');
            var re = /Last Changed Rev:/;

            for (var i in lines) {
                if (re.test(lines[i])) {
                    revision = lines[i].replace(re, '').trim();
                    break;
                }
            }
            console.log('At revision：' + revision);
        });
        p_svnInfo.on('close', afterSvnInfo);

        p_svnInfo.stderr.on('data', function (data) {
            console.error(data + "");
        });
    } else {
        console.log('Build error');
    }
}

function afterUpdate(code) {
    if (code == 0) {
        console.log('building......');
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

console.log('svn updating......');
var p_package = spawn('cmd.exe', ['/c', 'svn', 'update']);
p_package.stdout.on('data', function (data) {
    console.log(data + "");
});
p_package.stderr.on('data', function (data) {
    console.error(data + "");
});
p_package.on('close', afterUpdate);

