var raw = data;
var div = document.getElementById("dataContainer");
var orderNormal = true; // false = backwards

for(let i = 0; i < raw.length; i++) {
	if(i % 132 == 0) {
		let newDiv = document.createElement("div");
		let h3 = document.createElement("h3");
		h3.innerHTML = raw[i].dims.COUNTRY;
		let h4 = document.createElement("h4");
		h4.innerHTML = raw[i].Value;
		newDiv.appendChild(h3);
		newDiv.appendChild(h4);
		newDiv.classList.add("data-container");
		div.appendChild(newDiv);
	}
}

function display() {
	document.getElementById("myDropdown").classList.toggle("show");
}

window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}

function reverseList() {
	// console.log(div.children[0]);
	for(let i = 0; i < div.children.length; i++){
		console.log(div.childNodes[i]);
		div.removeChild(div.childNodes[i]);
	}	

	if(orderNormal) {
		for(let i = raw.length; i >= 0; i--) {
			if(i % 132 == 0) {
				let newDiv = document.createElement("div");
				let h3 = document.createElement("h3");
				h3.innerHTML = raw[i].dims.COUNTRY;
				let h4 = document.createElement("h4");
				h4.innerHTML = raw[i].Value;
				newDiv.appendChild(h3);
				newDiv.appendChild(h4);
				newDiv.classList.add("data-container");
				div.appendChild(newDiv);
			}
		}
		orderNormal = false;
	} else {
		for(let i = 0; i < raw.length; i++) {
			if(i % 132 == 0) {
				let newDiv = document.createElement("div");
				let h3 = document.createElement("h3");
				h3.innerHTML = raw[i].dims.COUNTRY;
				let h4 = document.createElement("h4");
				h4.innerHTML = raw[i].Value;
				newDiv.appendChild(h3);
				newDiv.appendChild(h4);
				newDiv.classList.add("data-container");
				div.appendChild(newDiv);
			}
		}
	}
	
	//console.log(countries[1]);


	/*div.remove();

	
	let newDiv = document.createElement("div");
	document.append(newDiv);

	for(let i = raw.length; i >= 0; i--) {
		if(i % 132 == 0) {
			let newDivHa = document.createElement("div");
			let h3 = document.createElement("h3");
			h3.innerHTML = raw[i].dims.COUNTRY;
			let h4 = document.createElement("h4");
			h4.innerHTML = raw[i].Value;
			newDivHa.appendChild(h3);
			newDivHa.appendChild(h4);
			newDivHa.classList.add("data-container");
			newDiv.appendChild(newDivHa);
		}
	}*/

}