function getDefaultSave(){
	var game = { // game object to store all save-pertinent info
	        num: new Decimal(1), // number that we are increasing
	        mult: 1.5, // number that it multiplies by on click
        	countdown: 0, // counter for the button cooldown
		buttonClicks: 0,
		secondsPlayed:0,
		timeInMicroPrestige:0,
		timeInMilliPrestige:0,
		numUpgradeCost:new Decimal(1000),
		numUpgradeBoost:1,
		clickPoints:{
			clickPoints: 0,
			maxClickPoints:3,
			clickPointsPerSec:1,
			maxCPCost:new Decimal(1000),
			secCPCost:new Decimal(1e10),
			CPPerUpgrade: 1,
			CPPerSecUpgrade: 1,
		},
        	microPrestige:{
                        essence: new Decimal(0),
                        times:0,
                        essenceMult:1,
			totalEssence: new Decimal(0),
		},
		milliPrestige:{
			essence: 0,
			times:0,
			totalEssence: 0
		},
        	notation: 0,// standard notation - clearly the best notation!
		version : 0.2,
		numeralsBroken:false,
		Aupgs:{
			possible:["A1","A2","A3","A4","A5","A6","A7",'A8','A9'],
			cost:[       1,   1,   2,   5,  10, 14,  18,  50,  100],
			repeatable:{
				amount:0,
				cost:25,
				costMult:1.5
			},
			upgrades:[]//the var for storing the stuff
		},
		Bupgs:{
			possible:['B1','B2','B3','B4','B5','B6','B7','B8','B9','B10','B11'],
			cost:[     160,350, 720,1500,2500, 4000,18000,1e5,2.4e5, 8e5,2.5e6],
			upgrades:[]
		},
		Cupgs:{
			possible:['C1','C2','C3','C4','C5','C6'],
			cost:[      1,   5,  20,  80,  256, 640],
			upgrades:[]
		}
		
        }
        return game
}


var game = getDefaultSave()
let updateIntervalId = 0

function updateBaseClick(){
        game.mult = 1.5
        if (game.Aupgs.upgrades.includes("A1")) game.mult = 1.8667
        if (game.Aupgs.upgrades.includes("A4")) game.mult = 2.5
	if(game.Bupgs.upgrades.includes('B1')) game.mult = 3
	if(game.Bupgs.upgrades.includes('B5')) game.mult = 4
}

function microPrestige() {
	showElement("microEssenceInfo");
	showElement("microPrestigeTab");
	showElement("increaseNumber");
	hideElement("microPrestigeElement");
	hideElement('microReset')
	game = {
                num:game.Bupgs.upgrades.includes('B2')? new Decimal(1e10):new Decimal(1),
		numUpgradeCost:new Decimal(1000),
		buttonClicks: game.buttonClicks,
		secondsPlayed:game.secondsPlayed,
		timeInMicroPrestige:0,
		timeInMilliPrestige:game.timeInMilliPrestige,
		numUpgradeBoost:1,
		numeralsBroken:game.numeralsBroken,
                mult: 1.5,
                countdown: 0,
		clickPoints:{
			clickPoints: 0,
			maxClickPoints: game.Aupgs.upgrades.includes('A3')? 6:3,
			clickPointsPerSec: game.Aupgs.upgrades.includes('A5')? 3:1,
			maxCPCost:new Decimal(1000),
			secCPCost:new Decimal(1e10),
			CPPerUpgrade: game.Aupgs.upgrades.includes('A3')? 2:1,
			CPPerSecUpgrade: game.Bupgs.upgrades.includes('B9')? 1.5:1
		},
		
                microPrestige:{
                        essence: game.numeralsBroken? game.microPrestige.essence.add(getMicroEssenceAmt(game.num)):game.microPrestige.essence.add(Math.round(Math.pow(1.1,game.Aupgs.repeatable.amount))),
                        times: game.microPrestige.times+1,
                        essenceMult: game.microPrestige.essenceMult,
			totalEssence:game.numeralsBroken? game.microPrestige.totalEssence.add(getMicroEssenceAmt(game.num)):game.microPrestige.totalEssence.add(Math.round(Math.pow(1.1,game.Aupgs.repeatable.amount)),)
                },
		milliPrestige: game.milliPrestige,
                notation: game.notation,
                version:game.version,
                Aupgs: game.Aupgs,
		Bupgs:game.Bupgs,
		Cupgs:game.Cupgs
        }
	if(game.microPrestige.times >= 100) {
		showElement('breakNumeralsTab')
	}
	game.clickPoints.clickPointsPerSec *= game.clickPoints.CPPerSecUpgrade
        updateBaseClick()
	update('maxCP',format(game.clickPoints.maxClickPoints))
	update('cpPerSec',format(game.clickPoints.clickPointsPerSec))
}
function milliPrestige() {
	showElement("milliEssenceInfo");
	showElement("milliPrestigeTab");
	showElement("increaseNumber");
	hideElement("microPrestigeElement");
	hideElement('microReset')
	hideElement('breakNumeralsTab')
	var adding = getMilliEssenceAmt(game.microPrestige.essence)
	game = {
                num:1,
		numUpgradeCost:new Decimal(1000),
		buttonClicks: game.buttonClicks,
		secondsPlayed:game.secondsPlayed,
		timeInMicroPrestige:0,
		timeInMilliPrestige:0,
		numUpgradeBoost:1,
		numeralsBroken:false,
                mult: 1.5,
                countdown: 0,
		clickPoints:{
			clickPoints: 0,
			maxClickPoints: game.Aupgs.upgrades.includes('A3')? 6:3,
			clickPointsPerSec: game.Aupgs.upgrades.includes('A5')? 3:1,
			maxCPCost:new Decimal(1000),
			secCPCost:new Decimal(1e10),
			CPPerUpgrade: game.Aupgs.upgrades.includes('A3')? 2:1,
			CPPerSecUpgrade: game.Bupgs.upgrades.includes('B9')? 1.5:1
		},
		
               	microPrestige:{
                        essence: new Decimal(0),
                        times:0,
                        essenceMult:1,
			totalEssence: new Decimal(0),
		},
		milliPrestige:{
			essence: game.milliPrestige.essence + adding,
			times:game.milliPrestige.times + 1,
			totalEssence: game.milliPrestige.totalEssence + adding
		},
                notation: game.notation,
                version:game.version,
                Aupgs:{
			possible:["A1","A2","A3","A4","A5","A6","A7",'A8','A9'],
			cost:[       1,   1,   2,   5,  10, 14,  18,  50,  100],
			repeatable:{
				amount:0,
				cost:25,
				costMult:1.5
			},
			upgrades:[]//the var for storing the stuff
		},
		Bupgs:{
			possible:['B1','B2','B3','B4','B5','B6','B7','B8','B9','B10','B11'],
			cost:[     160,350, 720,1500,2500, 4000,18000,1e5,2.4e5, 8e5,2.5e6],
			upgrades:[]
		},
		Cupgs:game.Cupgs
        }
	game.clickPoints.clickPointsPerSec *= game.clickPoints.CPPerSecUpgrade
        updateBaseClick()
	update('maxCP',format(game.clickPoints.maxClickPoints))
	update('cpPerSec',format(game.clickPoints.clickPointsPerSec))
}
function updateClass(what,whatClass) {
	var element = document.getElementById(what)
	element.className = ''
	element.classList.add("button");
	element.classList.add(whatClass)
}
function updateButtons() {
	updateClass('increaseNumberBtn',game.clickPoints.clickPoints>=getStepCost()?'buyable':'unbuyable')
	// Gonna make these DRYer when i want to
	if(game.num.gte(game.numUpgradeCost)) {
		updateClass('Num1','buyable')
	}
	else{
		updateClass('Num1','unbuyable')
	}
	if(game.num.gte(game.clickPoints.maxCPCost)) {
		updateClass('CP1','buyable')
	}
	else{
		updateClass('CP1','unbuyable')
	}
	if(game.num.gte(game.clickPoints.secCPCost)) {
		updateClass('CP2','buyable')
	}
	else{
		updateClass('CP2','unbuyable')
	}
	for(i=0;i<game.Aupgs.possible.length;i++) {
		if(game.microPrestige.essence.gte(game.Aupgs.cost[i]) && !(game.Aupgs.upgrades.includes('A'+String(i+1)))) {
			updateClass('A'+String(i+1),'buyable')
		}
		else if(game.microPrestige.essence.lt(game.Aupgs.cost[i]) && !(game.Aupgs.upgrades.includes('A'+String(i+1)))) {
			updateClass('A'+String(i+1),'unbuyable')
		}
	}
	if(game.microPrestige.essence >= game.Aupgs.repeatable.cost) {
		updateClass('AR','buyable')
	}
	else {
		updateClass('AR','unbuyable')
	}
	for(i=0;i<game.Bupgs.possible.length;i++) {
		if(game.microPrestige.essence.gte(game.Bupgs.cost[i]) && !(game.Bupgs.upgrades.includes('B'+String(i+1)))) {
			updateClass('B'+String(i+1),'buyable')
		}
		else if(game.microPrestige.essence.lt(game.Bupgs.cost[i]) && !(game.Bupgs.upgrades.includes('B'+String(i+1)))) {
			updateClass('B'+String(i+1),'unbuyable')
		}
	}
	for(i=0;i<game.Cupgs.possible.length;i++) {
		if(game.milliPrestige.essence >= (game.Cupgs.cost[i]) && !(game.Cupgs.upgrades.includes('C'+String(i+1)))) {
			updateClass('C'+String(i+1),'buyable')
		}
		else if(game.milliPrestige.essence<(game.Cupgs.cost[i]) && !(game.Cupgs.upgrades.includes('C'+String(i+1)))) {
			updateClass('C'+String(i+1),'unbuyable')
		}
	}
}
function getTriangularNumber(num) {
	//(n^2-n)/2
	num *= 2
	//n^2-n-num = 0
	//n = (1+sqrt(1+4num))/2
	return (1+Math.sqrt(1 + 4*num))/2
}
function getPercentageGrowthFactor(){
        var mult = 1
	if (game.num.gt(1e5)) mult = 1 + 0.0025*Math.max(0,Math.floor(game.num.log(10))-5) // the alway additive mult
        if (game.Aupgs.upgrades.includes("A2") && !(game.Bupgs.upgrades.includes('B3'))) mult *= 1+ 0.012*getTriangularNumber(Math.max(game.num.log(10),0))
	if(game.Bupgs.upgrades.includes('B3')) mult *= 1 + 0.015 * getTriangularNumber(Math.max(game.num.log(10),0))
	return mult
}

function getCurrentClickAmt(){
        var base = game.mult
        if (game.Aupgs.upgrades.includes("A8") && game.num.lt(1e33)) base *= 5
        base *= getPercentageGrowthFactor()
        if (game.Aupgs.upgrades.includes("A7")) base *= 1+Math.log10(game.microPrestige.times)/10
	base *= game.numUpgradeBoost
	if(game.Aupgs.upgrades.includes('A6')) base *= 1 + game.microPrestige.essence.pow(0.3)
	if(game.Aupgs.upgrades.includes('A9')) base *= 1 + Math.log10(game.clickPoints.clickPoints+1)/10
	if(game.Bupgs.upgrades.includes('B4')) base *= 1 + game.microPrestige.essence.add(1).log(10)/300
	if(game.Bupgs.upgrades.includes('B8')) base *= 1 + Math.log10(game.buttonClicks + 1)/310
        return base
}

function getStepCost() {
	return game.Bupgs.upgrades.includes('B5')?2:3
}

function step() { // clicks button
	let cost = getStepCost()
	if(game.clickPoints.clickPoints >= cost) {
	   	game.num = game.num.mul(getCurrentClickAmt()); // updates number
		update("numDisplay",formatDecimal(game.num)); // update number on the page
		game.clickPoints.clickPoints -= cost
		update("clickPoints",game.clickPoints.clickPoints); 
		if(game.Bupgs.upgrades.includes('B7')) {
			game.microPrestige.essence = game.microPrestige.essence.add(1)
			game.microPrestige.totalEssence = game.microPrestige.totalEssence.add(1)
		}
		game.buttonClicks ++
	}
}
function numUpgrade() {
	if(game.num.gte(game.numUpgradeCost)) {
		game.num = game.num.div(game.numUpgradeCost)
		game.numUpgradeCost = game.numUpgradeCost.mul(1000)
		game.numUpgradeBoost += 0.0025
		update('numCost',formatDecimal(game.numUpgradeCost))
	}
}
//CP Upgrades
function maxCPUpgrade() {
	if (game.num.gte(game.clickPoints.maxCPCost)) {
		game.num = game.num.div(game.clickPoints.maxCPCost)
		game.clickPoints.maxClickPoints += game.clickPoints.CPPerUpgrade
		game.clickPoints.maxCPCost = game.clickPoints.maxCPCost.mul(1000)
		update('maxCP',format(game.clickPoints.maxClickPoints))
		update('maxCPCost',formatDecimal(game.clickPoints.maxCPCost))
	}
}
function CPSecUpgrade() {
	if(game.num.gte(game.clickPoints.secCPCost)) {
		game.num = game.num.div(game.clickPoints.secCPCost)
		game.clickPoints.clickPointsPerSec += game.clickPoints.CPPerSecUpgrade
		game.clickPoints.secCPCost = game.clickPoints.secCPCost.mul(1e10)
		update('cpPerSec',format(game.clickPoints.clickPointsPerSec))
		update('secCPCost',formatDecimal(game.clickPoints.secCPCost))
	}
}
// A section

function buyAupg(number){
	var cost = game.Aupgs.cost[number-1]
	if (game.microPrestige.essence.gte(cost) && !(game.Aupgs.upgrades.includes(game.Aupgs.possible[number-1]))){
		game.microPrestige.essence = game.microPrestige.essence.sub(cost)
		game.Aupgs.upgrades.push(game.Aupgs.possible[number-1])
		if(number === 3) {
			game.clickPoints.maxClickPoints = 6
			game.clickPoints.CPPerUpgrade = 2
			update('maxCP',format(game.clickPoints.maxClickPoints))
		}
		updateClass('A' + String(number),'bought')
	}
}

function buyRepeatA(){
	var cost = game.Aupgs.repeatable.cost
	if  (game.microPrestige.essence.gte(cost)){
		game.microPrestige.essence = game.microPrestige.essence.sub(cost)
		game.microPrestige.essenceMult *= 1.1
		game.Aupgs.repeatable.amount += 1
		game.Aupgs.repeatable.cost *= game.Aupgs.repeatable.costMult
		game.Aupgs.repeatable.cost = Math.floor(game.Aupgs.repeatable.cost)
		update('RepeatACost',format(game.Aupgs.repeatable.cost))
		update('microEssenceMult',format(Math.floor(game.microPrestige.essenceMult)))
	}
}
function buyMaxRepeatA(){
	while (game.microPrestige.essence.gte(game.Aupgs.repeatable.cost)){
		buyRepeatA()
	}
}

//B Section
function getMicroEssenceAmt(num) {
	if(game.Bupgs.upgrades.includes('B11')) {
		return new Decimal(num.pow(1/(2*Math.pow(Math.max(num.log(10),0),0.5))).mul(Math.pow(1.1,game.Aupgs.repeatable.amount)))
	}
	return new Decimal(Math.floor(Math.pow(num.log(1.1),1/1.5) * (Math.pow(1.1,game.Aupgs.repeatable.amount))))
}
function buyBupg(number) {
	var cost = game.Bupgs.cost[number-1]
	if(number === 5 && !(game.Bupgs.upgrades.includes('B1'))) {
		return
	}
	if (game.microPrestige.essence.gte(cost) && !(game.Bupgs.upgrades.includes(game.Bupgs.possible[number-1]))){
		game.microPrestige.essence = game.microPrestige.essence.sub(cost)
		game.Bupgs.upgrades.push(game.Bupgs.possible[number-1])
		updateClass('B' + String(number),'bought')
	}
}
function updateCosts() {
	update('B5Cost',format(2500))
	update('B6Cost',format(4000))
	update('B7Cost',format(18000))
	update('B9Cost',format(2.4e5))
	update('B10Cost',format(8e5))
	update('B11Cost',format(2.5e6))
}
function breakNumerals() {
	game.numeralsBroken = true
	update('break','Fix Numerals')
	document.getElementById('break').onclick = fixNumerals
}
function fixNumerals() {
	game.numeralsBroken = false
	update('break','Break Numerals!')
	document.getElementById('break').onclick = breakNumerals
}
//C Section
function getMilliEssenceAmt(num) {
	return Math.round(Math.pow(Math.log(num/1.79e308)/Math.log(1.2), 0.5))
}

//below is all the display funcs
//otherwise know to pg as the dont touch funcs xD

var currentTab = "main";
	var notationArray = ['Standard',"Standard 2.0","Scientific","Engineering","Logarithm"];
function update(set,get){ // for updating display
	document.getElementById(set).innerHTML=get
}
function showElement(elementID) { // makes an element visible
	document.getElementById(elementID).style.display="inline-block";
}
function hideElement(elementID) { // makes an element invisible
	document.getElementById(elementID).style.display="none";
}
function abbreviate(i,short) {
	if(short) {
		if(i==0) return "K"; // thousand
		if(i==1) return "M"; // million
		if(i==2) return "B"; // billion
		if(i==8) return "Oc";
		if(i==9) return "No";
	}
	var returning = ''
	var units = ["","U","D","T","Qd","Qt","Sx","Sp","O","N"]; // prefixes for ones place
	var tens = ["","Dc","Vg","Tg","Qa","Qi","Se","St","Og","Nn"]; // prefixes for tens place
	var hundreds = ["","Ce","Dn","Tc","Qe","Qu","Sc","Si","Oe","Ne"]
	var thousands = ['','MI-','MC-','NA-']
	var i2=Math.floor(i/10);
	var i3=Math.floor(i2/10);
	var unit = units[i%10];
	var ten = tens[i2%10];
	var hundred = hundreds[i3%10];
	returning = unit+ten+hundred
	for(j=Math.floor(Math.log(i)/Math.log(1000));j>0;j--) {
		var k = Math.floor(i/Math.pow(1000,j)) % 1000
		if(k === 1) {
			returning = thousands[j] + returning
			continue
		}
		var blah = thousands[j]
		returning = abbreviate(k,false) + blah + returning
	}
	return returning;
}
function abbreviate2(i,short) {
	if(short) {
		if(i==0) return "K"; // thousand
		if(i==1) return "M"; // million
		if(i==2) return "B"; // billion
		if(i==8) return "Oc";
		if(i==9) return "No";
	}
	var returning = ''
	var units = ["","U","D","T","Qa","Qi","Sx","Sp","O","N"]; // prefixes for ones place
	var tens = ["","Dc","Vg","Tg","Qag","Qig","Sxg","Spg","Og","Ng"]; // prefixes for tens place
	var hundreds = ["","Cn","Dcn","Tcn","Qac","Qic","Sxc","Spc","Ocn","Nc"]
	var thousands = ['','Mi-','Mc-','Nn-']
	var i2=Math.floor(i/10);
	var i3=Math.floor(i2/10);
	var unit = units[i%10];
	var ten = tens[i2%10];
	var hundred = hundreds[i3%10];
	returning = unit+ten+hundred
	for(j=Math.floor(Math.log(i)/Math.log(1000));j>0;j--) {
		var k = Math.floor(i/Math.pow(1000,j)) % 1000
		if(k === 1) {
			returning = thousands[j] + returning
			continue
		}
		var blah = thousands[j]
		returning = abbreviate2(k,false) + blah + returning
	}
	return returning;
}
function format(a) { // formats numbers for display
	var e = Math.floor(Math.log10(a)); // exponent of number
	var m = Math.round(Math.pow(10,Math.log10(a)-e)*1000)/1000; // mantissa of number
	if (m>9.9995) { // would round up to 10; this avoids a problem
		m = 1;
		e++;
	}
	if(a<1000) return Math.round(a*1000)/1000; // show up to 3 places
	if (game.notation==2) return m+"e"+e; // scientific notation
	if (game.notation==4) return "e"+(Math.round(1000*Math.log10(a))/1000); // log notation
	var e2 = 3*Math.floor(e/3); // exponent for engineering notation
	var m2 = Math.round(1000*m*Math.pow(10,e-e2))/1000; // base in engineering and standard notations
	if(game.notation==0) return m2+abbreviate(e2/3-1,true)// standard notation
	if(game.notation==1) return m2+abbreviate2(e2/3-1,true); // standard 2.0 notation
	if(game.notation==3) return m2+"e"+e2; // engineering notation
}
function formatDecimal(a) {
	var e = a.exponent; // exponent of number
	var m = Math.round(a.mantissa*1000)/1000; // mantissa of number
	if (m>9.9995) { // would round up to 10; this avoids a problem
		m = 1;
		e++;
	}
	if(a.lt(1000)) return a.toFixed(2);
	if (game.notation==2) return m+"e"+e; // scientific notation
	if (game.notation==4) return "e"+(Math.round(a.log(10).mul(1000)).div(1000)); // log notation
	var e2 = 3*Math.floor(e/3); // exponent for engineering notation
	var m2 = Math.round(1000*m*Math.pow(10,e-e2))/1000; // base in engineering and standard notations
	if(game.notation==0) return m2+abbreviate(e2/3-1,true)// standard notation
	if(game.notation==1) return m2+abbreviate2(e2/3-1,true); // standard 2.0 notation
	if(game.notation==3) return m2+"e"+e2; // engineering notation
}
function formatTime(time) {
	if(time < 60) return String(time) + ' seconds'
	if(time < 3600) {
		var mins = Math.floor(time/60)
		var secs = time - 60 * mins
		return String(mins) + ' minutes, ' + String(secs) + ' seconds'
	}
	if(time < 3600 * 24) {
		var hours = Math.floor(time/3600)
		return String(hours) + ' hours, ' + formatTime(time-3600*hours)
	}
	if(time < 3600 * 24 * 365) {
		var days = Math.floor(time/(3600*24))
		return String(days) + ' days, ' + formatTime(time-3600*24*days)
	}
	else {
		var years = Math.floor(time/(3600*24*365))
		return String(years) + ' years, ' + formatTime(time-3600*24*365*years)
	}
}
function switchNotation() { // for switching between notations
	game.notation++;
	if(game.notation>notationArray.length-1) game.notation=0;
	update("notationDisplay",notationArray[game.notation]);
}
function switchTab(tabName) { // alternates between the various tabs
	hideElement(currentTab);
	showElement(tabName);
	currentTab=tabName;
}
function save() { //save game
	if (updateIntervalId != 0) localStorage.setItem('save',btoa(JSON.stringify(game)))
}
function load(save) {
	try {
		game=JSON.parse(atob(save))
	if(game.mult===undefined) game.mult = 1.5; // lines for making saves back-compatible
	if(game.microPrestige===undefined) game.microPrestige = {
		essence:new Decimal(0),
		times:0,
		essenceMult:1,
		totalEssence:new Decimal(0)};
	if(game.version===undefined) game.version = 0.2;
	if(game.Aupgs===undefined) game.Aupgs = {
		possible:["A1","A2","A3","A4","A5","A6","A7",'A8','A9'],
		cost:[       1,   1,   2,   5,  10, 18,  50],
		repeatable:{
			amount:0,
			cost:25,
			costMult:1.5
			},
		upgrades:[]//the var for storing the stuff
	}
	if(!(game.Aupgs.possible.includes('A9'))) {
		game.Aupgs.possible = ["A1","A2","A3","A4","A5","A6","A7",'A8','A9']
		game.Aupgs.cost = [       1,   1,   2,   5,  10, 14,  18,  50,  100]
	}
	if(game.Bupgs === undefined) {
		game.Bupgs = {
			possible:['B1','B2','B3','B4','B5','B6','B7','B8','B9','B10','B11'],
			cost:[     160,350, 720,1500,2500, 4000,18000,1e5,2.4e5, 8e5,2.5e6],
			upgrades:[]
		}
	}
	if(!(game.Bupgs.possible.includes('B11'))) {
		game.Bupgs.possible = ['B1','B2','B3','B4','B5','B6','B7','B8','B9','B10','B11']
		game.Bupgs.cost = [     160,350, 720,1500,2500, 4000,18000,1e5,2.4e5, 8e5,2.5e6]
	}
	if(game.clickPoints === undefined) {
		game.clickPoints = {
			clickPoints: 0,
			maxClickPoints:3,
			clickPointsPerSec:1,
			maxCPCost:new Decimal(1000),
			secCPCost:new Decimal(1e10),
			CPPerUpgrade: 1,
			CPPerSecUpgrade: 1,
		}
	}
	if(game.clickPoints.CPPerUpgrade === undefined) {
		game.clickPoints.CPPerUpgrade = 1
	}
	if(game.numUpgradeCost === undefined) {
		game.numUpgradeCost = 10
	}
	if(game.numUpgradeBoost === undefined) {
		game.numUpgradeBoost = 1
	}
	if(game.numeralsBroken === undefined) {
		game.numeralsBroken = false
	}
	if(game.buttonClicks === undefined) {
		game.buttonClicks = 0
	}
	if(game.clickPoints.CPPerSecUpgrade === undefined) {
		game.clickPoints.CPPerSecUpgrade = game.Bupgs.upgrades.includes('B9')? 1.5:1
	}
	if(game.secondsPlayed === undefined) {
		game.secondsPlayed = 0
	}
	if(game.timeInMicroPrestige === undefined) {
		game.timeInMicroPrestige = 0
	}
	if(game.microPrestige.totalEssence === undefined) {
		game.microPrestige.totalEssence = game.microPrestige.essence
	}
	if(game.milliPrestige === undefined) {
		game.milliPrestige = {
			essence: 0,
			times:0,
			totalEssence: 0
		}
		game.timeInMilliPrestige = 0
		game.Cupgs = {
			possible:['C1','C2','C3','C4','C5','C6'],
			cost:[      1,   5,  20,  80,  256, 640],
			upgrades:[]
		}
	}
	if(game.microPrestige.times > 0) {
		showElement("microEssenceInfo");
		showElement("microPrestigeTab");
	}
	if(game.microPrestige.times >= 100) {
		showElement('breakNumeralsTab')
	}
	game.num = new Decimal(game.num)
	game.numUpgradeCost = new Decimal(game.numUpgradeCost)
	game.clickPoints.maxCPCost = new Decimal(game.clickPoints.maxCPCost)
	game.clickPoints.secCPCost = new Decimal(game.clickPoints.secCPCost)
	game.microPrestige.essence = new Decimal(game.microPrestige.essence)
	game.microPrestige.totalEssence = new Decimal(game.microPrestige.totalEssence)
	update("numDisplay",formatDecimal(game.num));
	update("notationDisplay",notationArray[game.notation]);
	update("multDisplay",getCurrentClickAmt());
	update("microEssenceDisplay",formatDecimal(game.microPrestige.essence));
	update('milliEssenceDisplay',format(game.milliPrestige.essence))
	update('RepeatACost',format(game.Aupgs.repeatable.cost))
	update('microEssenceMult',format(Math.floor(game.microPrestige.essenceMult)))
	update('numCost',formatDecimal(game.numUpgradeCost))
	update('maxCPCost',formatDecimal(game.clickPoints.maxCPCost))
	update('secCPCost',formatDecimal(game.clickPoints.secCPCost))
	update('maxCP',format(game.clickPoints.maxClickPoints))
	update('cpPerSec',format(game.clickPoints.CPPerSec))
	for(i=0;i<game.Aupgs.upgrades.length;i++) {
		updateClass(game.Aupgs.upgrades[i],'bought')
	}
	for(i=0;i<game.Bupgs.upgrades.length;i++) {
		updateClass(game.Bupgs.upgrades[i],'bought')
	}
	for(i=0;i<game.Cupgs.upgrades.length;i++) {
		updateClass(game.Cupgs.upgrades[i],'bought')
	}
	} catch (e) {
		console.log('Your save failed to load: '+e)
	}
}
function exportGame() {
	var savefile=btoa(JSON.stringify(game))
	showElement("exportInfo")
	document.getElementById("exportSave").value=btoa(JSON.stringify(game))
}	
function importGame() {
	var input=prompt('Paste in your exported save and press enter.')
	load(input)
}
function hardReset() {
	if(confirm("Are you sure you want to hard reset? This will erase all your progress.")) {
		game = getDefaultSave();
	}
}

function updateThings() { // various updates on each tick
	var ooms = Math.floor(Math.log10(game.num));
	update("numDisplay",formatDecimal(game.num));
	if(game.countdown>50) game.countdown = game.countdown-50;
	if(game.countdown<=50&&game.countdown>=0) game.countdown = 0;
	if(game.countdown === 0) {
		game.clickPoints.clickPoints += game.clickPoints.clickPointsPerSec
		game.countdown = 1000
		game.secondsPlayed ++
		game.timeInMicroPrestige ++
		game.timeInMilliPrestige ++
	}
	if(game.clickPoints.clickPoints > game.clickPoints.maxClickPoints) {
		game.clickPoints.clickPoints = game.clickPoints.maxClickPoints
	}
	if(game.Bupgs.upgrades.includes('B10') && game.clickPoints.clickPoints >= getStepCost()) {
		step()
	}
	update('clickPoints',format(game.clickPoints.clickPoints))
	update("multDisplay",format(getCurrentClickAmt()));
	if(game.num.gte(1e33)) { // Number overflow?
		if(!game.numeralsBroken) {
			hideElement("increaseNumber");
			showElement("microPrestigeElement");
		}
		else {
			update('ueOnReset',formatDecimal(getMicroEssenceAmt(game.num)))
			showElement("microReset");
		}
	}
	if(game.microPrestige.essence.gte(1.79e308)) {
		showElement('milliReset')
		update('meOnReset',format(getMilliEssenceAmt(game.num)))
	}
	update("microEssenceDisplay",formatDecimal(game.microPrestige.essence));
        updateBaseClick()
	updateCosts()
	update('A6power',format(1 + Math.pow(game.microPrestige.essence,0.3)))
	update("A7power",format(1+Math.log10(game.microPrestige.times)/10));
	update('A9power',format(1 + Math.log10(game.clickPoints.clickPoints)/10))
	update("microEssenceMult",format(Math.pow(1.1,game.Aupgs.repeatable.amount)));
	update('numCost',formatDecimal(game.numUpgradeCost))
	update('maxCPCost',formatDecimal(game.clickPoints.maxCPCost))
	update('secCPCost',formatDecimal(game.clickPoints.secCPCost))
	update('maxCP',format(game.clickPoints.maxClickPoints))
	update('cpPerSec',format(game.clickPoints.clickPointsPerSec))
	update('timePlayed',formatTime(game.secondsPlayed))
	update('buttonClicks',format(game.buttonClicks))
	update('microPrestiges',format(game.microPrestige.times))
	update('microTime',formatTime(game.timeInMicroPrestige))
	update('totalue',formatDecimal(game.microPrestige.totalEssence))
	updateButtons()
}

function stopInterval() {
	clearInterval(updateIntervalId)
	updateIntervalId = 0
}

function startInterval() {
	if (updateIntervalId != 0) stopInterval()
	updateIntervalId = setInterval(updateThings,50)
}

function init() { // initialize
	if(localStorage.getItem('save')!=null) load(localStorage.getItem('save'))
	startInterval()
	setInterval(save,10000)
}
