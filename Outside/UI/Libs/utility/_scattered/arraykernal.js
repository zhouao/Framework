/* File Created: 一月 13, 2012 */
Array.prototype.contains = function (elem) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == elem) {
            return true;
        }
    }
    return false;
} 
 
Array.prototype.indexOf = function(Object){  
    for(var i = 0;i<this.length;i++){  
		if(this[i] == Object){  
			return i;  
        }  
    }  
    return -1;  
}  