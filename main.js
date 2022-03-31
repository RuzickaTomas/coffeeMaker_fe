//beverage object
var beverage = {"infusion":{"type": "", "amount": 0 }, "watter": {"amount": 0 }, "milk": {"amount": 0}};

let pointer = "";
let cup = document.getElementById("cup");

let chck = true;
let numInput = document.getElementById('numInput');
let add = document.getElementsByClassName('add')[0];
let addForm = document.getElementById('customCoffeeForm');
let checkInput = document.getElementById('customCoffee');
const defaultValue = 100;
const defaultInfusion = 5;
//set events for buttons with ingredients
document.getElementsByClassName("watter")[0].onclick = addWatter;
document.getElementsByClassName("coffee")[0].onclick = addCoffee;
document.getElementsByClassName("chocolate")[0].onclick = addChocolate;
document.getElementsByClassName("blkTea")[0].onclick = addBlkTea;
document.getElementsByClassName("grnTea")[0].onclick = addGrnTea;
document.getElementsByClassName("milk")[0].onclick = addMilk;
let result = document.getElementById("result");

//display form if checkbox is crossed
checkInput.onchange = function () {
if (checkInput.value === "true") {
	numInput.style.display = 'block';
	add.style.display = 'flex';
	const attr = numInput.getAttribute('placeholder');
	numInput.setAttribute('placeholder', 'amount of ' + pointer);
} else {
	numInput.style.display = 'none';
	add.style.display = 'none';
	const attr = numInput.getAttribute('placeholder');
	numInput.setAttribute('placeholder', 'amount');
}
chck = !chck;
checkInput.value = chck;
}

add.onclick = function () {
	let val = numInput.value;
	switch (pointer) {
		case "coffee": 
		case "chocolate": 
		case "black tea": 
		case "green tea": 
		beverage.infusion.type = pointer;
		beverage.infusion.amount = val;
		console.log("set infusion amount " + JSON.stringify(beverage));
		break;
		case "milk":
		beverage.milk.amount = val;
		console.log("set milk amount " + JSON.stringify(beverage));	
		break;
		case "watter": 
		beverage.watter.amount = val;
		console.log("set watter amount " + JSON.stringify(beverage));
		break;
		default : console.log("nothting"); 
	}
	numInput.value = "";
	numInput.style.display = 'none';
	add.style.display = 'none';
}

//action buttons
//reset all ingredients in a cup
document.getElementById("reset").onclick = function () {
	beverage.infusion.type = "";
	beverage.infusion.amount = 0;
	beverage.watter.amount = 0;
	beverage.milk.amount = 0;
	//while cup contains anything
	while (cup.hasChildNodes()) {
		//remove first child from cup
  		cup.removeChild(cup.firstChild);
	}
	resetResult();
};

//confirm action
document.getElementById("confirm").onclick = function () {
	//display result div
	result.style.display = "flex";
	//check if beverage contains infusion
 	if (beverage.infusion.amount > 0) {
 		result.innerText += beverage.infusion.type + ": " + beverage.infusion.amount  + " gr,";
 	 }
 	 //check if beverage contains watter
 	 if (beverage.watter.amount > 0) {
 	  	result.innerText += "watter: " +  beverage.watter.amount + " ml,";
 	 }
 	 //check if beverage contains milk
 	 if (beverage.milk.amount > 0) {
 		result.innerText += "milk: " + beverage.milk.amount + " ml";
 	 }
}

//reset result div
function resetResult() {
	result.innerText = "";
	result.style.display = "none";
}

//function to simplify object logging 
function logIt(msg){
	console.log(JSON.stringify(msg));
} 

//check if element with id not exists
function elementWithIdNotExists(id) {
	return document.getElementById(id) === null;
}

//sets infusion to object and draws result
function addInfusion(what, color, amount) {
	//check if infusion already exists
	if (!elementWithIdNotExists('infusion')) {
		//find existing infusion object in DOM
		var infusionToRemove = document.getElementById('infusion');
		//then previous infusion will be removed
		infusionToRemove.remove();
	} 
	
	logIt('create ' + what);
	//create new infusion
	const infusion = document.createElement("div");
	infusion.setAttribute('id', 'infusion');
	infusion.innerText = what;
	infusion.style.backgroundColor = color;
	//add to the cup
	cup.appendChild(infusion);
	//set object fields type and amount
	beverage.infusion.type = what;
	beverage.infusion.amount = amount;
}

//check if checkbox was activated
function customBeverageConfirmed() {
	if (checkInput.value === "false") {
		numInput.style.display = 'block';
		add.style.display = 'flex';
		numInput.setAttribute('placeholder', 'amount of ' + pointer);
	}
}

//watter
function addWatter() {
	resetResult();
	const text = 'watter';
	pointer = text;
	console.log("input" + JSON.stringify(beverage));	
	var liquid = document.getElementById('liquid');
	//check if there is already liquid
	if (liquid === null) {
		//create watter
		const watter = document.createElement("div");			
		watter.setAttribute('id','liquid');
		watter.innerText = text;
		cup.appendChild(watter);
		watter.style.color = "#003399";
		beverage.watter.amount = defaultValue;
	} 
	//if there is a milk with amount greater than 0 
	if (beverage.milk.amount > 0 && elementWithIdNotExists('milkIngredient')) {
		liquid.innerText = text;
		liquid.style.backgroundColor = 'azure';
		beverage.watter.amount = beverage.milk.amount;
		beverage.milk.amount = 0;
	}	
	customBeverageConfirmed();
	liquid.style.color = "#003399";
}

//chocolate
function addChocolate() {
	beverage.watter.amount = 0;
	addInfusion('chocolate', '#552b00', defaultInfusion);
	addMilk();
	pointer = "chocolate";
	customBeverageConfirmed();
	resetResult();
}

//coffee
function addCoffee() {
	addInfusion("coffee", '#6f4e37', defaultInfusion);
	addWatter();
	pointer = "coffee";
	customBeverageConfirmed();
	resetResult();
}

//black tea
function addBlkTea() {
	addInfusion("black tea", '#6f3758', defaultInfusion);
	addWatter();
	pointer = "black tea";
	customBeverageConfirmed();
	resetResult();
}

//green tea
function addGrnTea() {
	addInfusion("green tea", '#586f37', defaultInfusion);
	addWatter();
	pointer = "green tea";
	customBeverageConfirmed();
	resetResult();
}

//milk
function addMilk() {
	resetResult();
	const text = 'milk';
		pointer = text;
		customBeverageConfirmed();
		var liquid = document.getElementById('liquid');
		//check if milk already was added
		if (!elementWithIdNotExists('milkIngredient')) {
		var existMilk = document.getElementById('milkIngredient');
			existMilk.remove();
		}
		//if there is no liquid
		if (liquid !== null) {
		//check if it is watter
		if (beverage.watter.amount > 0) {
			//create div milkIngredient
			var milk = document.createElement("div");
			var attr = milk.setAttribute("id", 'milkIngredient');
			milk.innerText = text;
			cup.appendChild(milk);
			milk.style.color = "#5a5a5a";
			beverage.milk.amount = 10;
			return 0;
		} 
		//it is milk with amount greater than 0
		if (beverage.milk.amount >= 0) {
			liquid.innerText = text;
			liquid.style.backgroundColor = 'white';
			beverage.milk.amount = defaultValue;
		}
		//if there is a liquid already present
		} else {
		//if all liquids have 0 values
		if ((beverage.watter.amount === 0 && beverage.milk.amount === 0)) {
			//create div liqiud - milk
			var milk = document.createElement("div");
			var attr = milk.setAttribute("id", 'liquid');
			milk.innerText = text;
			milk.style.backgroundColor = 'white';
			milk.style.color = "#5a5a5a";
			cup.appendChild(milk);
			beverage.milk.amount = defaultValue;
		}
		}
		liquid.style.color = "#5a5a5a";

}



