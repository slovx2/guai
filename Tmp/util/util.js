/**
 * Created with JetBrains WebStorm.
 * User: Simon
 * Date: 13-11-20
 * Time: 上午11:12
 * To change this template use File | Settings | File Templates.
 */

exports.size = function(object) {
    if (typeof object != 'object') {
        return 0;
    }
    var size = 0;
    for (var i in object) {
        size++;
    }
    return size;
}
