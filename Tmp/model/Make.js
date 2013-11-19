/**
 * Created with JetBrains WebStorm.
 * User: Simon
 * Date: 13-11-18
 * Time: 下午2:33
 * To change this template use File | Settings | File Templates.
 */
var Make = {
    createObject : function() {
        var object = {
            content : [],
            add : function(name, count) {
                if (name && count) this.content.push({name : name, count: count});
            },
            get : function(i) {
                return this.content[i];
            },
            getCount : function() {
                return this.content.length;
            }
        };
        return object;
    }
}
module.exports = Make;