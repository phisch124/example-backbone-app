/* implements a non-persistent store in memory */

module.exports = function(){
	
	var fields = new Array();
	
	this.get = function(field, id, callback){
		//Parsing arguments
		if(typeof(callback) == 'undefined'){ callback = function(){}; }
		
		if(typeof(id) == 'function'){
			id(fields[field]);  //id is the callback
		}
		if(typeof(id) == 'undefined'){
			callback(fields[field]);
		}
		
		if(hasField(field)){
			callback(fields[field][id]);
		} else {
			callback(null);
		}
	}
	
	this.put = function(field, value, callback){
		if(!hasField(field))
			fields[field] = new Array();
			
		fields[field].push(value);
		callback(fields[field].length - 1);
	}

	this.set = function(field, id, value, callback){
		if(!hasField(field))
			fields[field] = new Array();
		
		fields[field][id] = value;
		
		callback();
	}

	this.destroy = function(field, id, callback){
		if(hasField(field)){
			if(fields[field].length == 1 && id in fields[field]){
				delete fields[field];
			} else {
				fields[field].splice(id, 1);
			}
		}
		
		callback();
	}
	
	function hasField(field){
		return typeof(fields[field]) !== 'undefined';
	}
};