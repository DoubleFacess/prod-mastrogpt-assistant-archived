
var myApp = (function () {

    var Namespace = function () {}
    var Module = function () {}

    Namespace.prototype.createModule  = function () {
        var m = new Module;
        if(arguments.length > 0)
            m.extend.apply(m, Array.prototype.slice.apply(arguments));
			//dump.next('debug: creating module');
        return m;
    }

    Module.prototype.extend = function (fn) {
        var argArray,
            results,
            resultKey,
            namespace = this;
        argArray = Array.prototype.slice.apply(arguments).slice(1);
        this._private = this._private || {};
        results = fn.apply(this._private, argArray);
        for(resultKey in results) {
            if(results.hasOwnProperty(resultKey)) {
                namespace[resultKey] = results[resultKey];
            }
        }
        return this;
	}
    var myApp = new Module();
    myApp.namespace = function (ns) {
		//dump.next('debug: creating namespace');
        return ns ? ns : new Namespace();
    }
    myApp.createModule = Namespace.prototype.createModule;    
	return myApp;
}())

//dump.next('debug: creating namespaces');
//var userObj = myApp.namespace(userObj)
var main = myApp.namespace(main)
var dom = myApp.namespace(dom)
//var listeners = myApp.namespace(listeners)



