/**
 * Created with JetBrains WebStorm.
 * User: Simon
 * Date: 13-11-18
 * Time: 下午5:03
 * To change this template use File | Settings | File Templates.
 */

var Defense = {
    createObject : function(base, final, f, w, e, i, d) {
        var object = {
            add : function(other) {

            }
        };
        object.base = base;
        object.final = final;
        object.f = f;
        object.w = w;
        object.e = e;
        object.i = i;
        object.d = d;
        return object;
    }
}

module.exports = Defense;
