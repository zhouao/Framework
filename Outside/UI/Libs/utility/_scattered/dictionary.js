/* 
 * File Created: 一月 10, 2012 
 * Author: YDG
 * Description: NO Modifying
 */

(function () {
    //static private member 
    //var _h = {};
    //var _l = 0;

    //static private method
    //if hash contain key, return true 
    //else return false
    //var _contain = function (key) {
    //    return _h.hasOwnProperty(key);
    //}

    //constructor
    Hash = function () {
        this._h = {};
        this._l = 0;
        this._contain = function (key) {
            return this._h.hasOwnProperty(key);
        }
    };

    //public method on prototype
    Hash.prototype = {
        //hash is or no contain key
        contain: function (key) {
            return this._contain(key);
        },
        // add an pair of key and value
        // if hash has contain key, then update value
        add: function (key, obj) {
            var flag = this._contain(key);
            this._h[key] = obj;
            if (!flag)
                this._l++;
        },
        //remove an pair of key and value
        remove: function (key) {
            if (this._contain(key)) {
                delete this._h[key];
                this._l--;
            }
        },
        //clear all pairs
        clear: function(){
            for (var currentkey in this._h) {
                delete this._h[currentkey];
            }
        },
        //retrieve value of key from hash
        get: function (key) {
            return this._h[key];
        },
        // return hash contain amount of key&value'pair
        length: function () {
            return this._l;
        },
        //return keys array of the hash 2012-05-10 YDG
        getKeys: function () {
            var keys = [];
            for (var currentkey in this._h) {
                keys.push(currentkey);
            }
            return keys;
        },
        //return values array of the hash 2012-05-10 YDG
        getValues: function () {
            var values = [];
            for (var currentkey in this._h) {
                values.push(this._h[currentkey]);
            }
            return values;
        },
        //return complex hash result 2012-05-10 YDG
        toString: function () {
            var hashItemOutterSeperator = ";";
            var hashItemInnerSeperator = ":";
            var arrHashItem = [];
            for (var currentkey in this._h) {
                arrHashItem.push(currentkey.toString() + hashItemInnerSeperator + this._h[currentkey].toString());
            }
            return arrHashItem.join(hashItemOutterSeperator);
        }
    };
})();
