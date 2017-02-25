/* 
Performs a left outer join on two arrays of JSON objects. 
	lookupTable    is the 1 list of key values
	mainTable      is the many list of items
	lookupKey      is the key name in lookupTable
	mainKey
	select         is callback function defining the return array element
example:
		var result = join(brands, articles, "id", "brand_id", function(article, brand) {
		    return {
		        id: article.id,
		        name: article.name,
		        weight: article.weight,
		        price: article.price,
		        brand: (brand !== undefined) ? brand.name : null
		    };
		});
*/


function join(lookupTable, mainTable, lookupKey, mainKey, select) {
    var l = lookupTable.length,
        m = mainTable.length,
        lookupIndex = [],
        output = [];
    for (var i = 0; i < l; i++) { // loop through l items
        var row = lookupTable[i];
        lookupIndex[row[lookupKey]] = row; // create an index for lookup table
    }
    for (var j = 0; j < m; j++) { // loop through m items
        var y = mainTable[j];
        var x = lookupIndex[y[mainKey]]; // get corresponding row from lookupTable
        output.push(select(y, x)); // select only the columns you need
    }
    return output;
};
