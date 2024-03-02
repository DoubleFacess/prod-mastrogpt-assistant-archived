

window.dump = {
	i: 0,
	log: function(){
		console.log('0: app: debug start');
	},
	next: function(msg){
		dump.i++;
		console.log(dump.i  + ': ' + msg);
	},
	inspect: function(arg){
		var message = 'inspect: element is';
		if(typeof arg == "number") dump.next(message + ' number');
		else if (typeof arg == "string") dump.next(message + ' string');
		else if (typeof arg == "boolean") dump.next(message + ' boolean');
		else if (typeof arg == "object") {
			dump.next(message + ' array or object');
            var output = '';
			for (property in arg) {
				output += property + ': ' + arg[property]+';\n';
			}
			//alert(output);
			dump.next(output);
		}
		else if (typeof arg == null) dump.next(message + ' null');
		else if (typeof arg == "undefined") dump.next(message + ' undefined');		
	},
	/*inspect_dom: function(arg){
		var element = document.getElementById(arg);
		if(dump.inspect(arg) == null) dump.next('dom non rilevato');			 
	},*/
	reset: function(){
		dump.i = 0;
        console.log(dump.i  + ': ' + ' reset counter');
	}
}

function debugObject( obj ) {
    var output = '';
    for (property in obj) {
        output += property + ': ' + obj[property]+';\n';
    }
    alert(output);
}
function print_r(arr,level) {
	var dumped_text = "";
	if(!level) level = 0;
	//The padding given at the beginning of the line.
		var level_padding = "";
		for(var j=0;j<level+1;j++) level_padding += "    ";
		if(typeof(arr) == 'object') { //Array/Hashes/Objects 
		for(var item in arr) {
			var value = arr[item];
			if(typeof(value) == 'object') { //If it is an array,
				dumped_text += level_padding + "'" + item + "' ...\n";
				dumped_text += print_r(value,level+1);
			} else {
				dumped_text += level_padding + "'" + item + "' => \"" + value + "\"\n";
			}
		}
	
	} else { //Stings/Chars/Numbers etc.
		dumped_text = "===>"+arr+"<===("+typeof(arr)+")";
	}
	return dumped_text;
}



