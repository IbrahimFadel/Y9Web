//alert(data[280].dims.COUNTRY);


div = document.getElementById("countriesContainer");

//console.log(data.dims)
//console.log(Object.keys(data.dims).length);

console.log(Object.keys(data).length);

for(let i = 0; i < data.length; i++) {
	console.log(data[i].dims.COUNTRY);
	
}