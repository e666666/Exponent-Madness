function getDefaultSave(){
        return var game = { // game object to store all save-pertinent info
	        num: 1, // number that we are increasing
	        mult: 1.5, // number that it multiplies by on click
        	countdown: 0, // counter for the button cooldown
                normCountdown: 3000,
        	microPrestige:{
                        essence:0,
                        times:0,
                        essenceMult:1},
        	notation: 0,// standard notation - clearly the best notation!
                version : 0.2,
                Aupgs:{
                       possible:["A1","A2","A3","A4","A5","A6","A7"],
                       cost:[       1,   1,   2,   5,  10, 18,  50],
                       repeatable:{
                               amount:0,
                               cost:25,
                               costMult:1.5
                      },
                      upgrades:[]//the var for storing the stuff
             }
        }
}


var game = getDefaultSave()

function updateBaseClick(){
        game.mult = 1.5
        if (game.Aupgs.upgrades.includes("A1")) game.mult = 1.8667
        if (game.Aupgs.upgrades.includes("A4")) game.mult = 2.5
}

function microPrestige() {
	showElement("microEssenceInfo");
	showElement("increaseNumber");
	hideElement("microPrestigeElement");
	game = {
                num: game.Aupgs.upgrades.includes("A5")? 1000:1,
                mult: 1.5,
                countdown: 0,
                microPrestige:{
                        essence: game.microPrestige.essence+1,//for now
                        times: game.microPrestige.times+1,
                        essenceMult: game.microPrestige.essenceMult
                },
                notation: game.notation,
                version:game.version,
                Aupgs: game.Aupgs
                }
        updateBaseClick()
}

function getPrecentageGrowthFactor(){
        var mult = 1
        if (game.Aupgs.upgrades.includes("A2")) mult += 0.012*Math.floor(Math.log10(game.number))
        return mult
}

function getCurrentClickAmt(){
        var base = game.mult
        if (game.Aupgs.upgrades.includes("A7") && game.number < 1e33) base *= 5
        base *= getPrecentageGrowthFactor()
        if (game.Aupgs.upgrades.includes("A6")) base *= 1+Math.log10(game.microPrestige.times)/400
        return base
}

function step() { // clicks button
	if(game.countdown==0) {
		game.num = game.num*getCurrentClickAmt(); // updates number
		update("numDisplay",format(game.num)); // update number on the page
		game.countdown = game.normCountdown; // reset cooldown timer
		update("countdownDisplay",3); 
	}
	else return 0;
}




//below is all the display funcs
//otherwise know to pg as the dont touch funcs xD

var currentTab = "main";
	var notationArray = ["Standard","Scientific","Engineering","Logarithm"];
function update(set,get){ // for updating display
	document.getElementById(set).innerHTML=get
}
function showElement(elementID) { // makes an element visible
	document.getElementById(elementID).style.display="inline-block";
}
function hideElement(elementID) { // makes an element invisible
	document.getElementById(elementID).style.display="none";
}
function abbreviate(i) {
	if(i==0) return "K"; // thousand
	if(i==1) return "M"; // million
	if(i==2) return "B"; // billion
	var units = ["","U","D","T","Qa","Qt","Sx","Sp","O","N"]; // prefixes for ones place
	var tens = ["","Dc","Vg","Tg","Qd","Qi","Se","St","Og","Nn"]; // prefixes for tens place
	var hundreds = ["","Ce","Dn","Tc","Qe","Qu","Sc","Si","Oe","Ne"]
	var i2=Math.floor(i/10);
	var i3=Math.floor(i2/10);
	var unit = units[i%10];
	var ten = tens[i2%10];
	var hundred = hundreds[i3%10];
	return unit+ten+hundred;
}
function format(a) { // formats numbers for display
	var e = Math.floor(Math.log10(a)); // exponent of number
	var m = Math.round(Math.pow(10,Math.log10(a)-e)*1000)/1000; // mantissa of number
	if (m>9.9995) { // would round up to 10; this avoids a problem
		m = 1;
		e++;
	}
	if(a<1000) return Math.round(a*1000)/1000; // show up to 3 places
	if (game.notation==1) return m+"e"+e; // scientific notation
	if (game.notation==3) return "e"+(Math.round(1000*Math.log10(a))/1000); // log notation
	var e2 = 3*Math.floor(e/3); // exponent for engineering notation
	var m2 = Math.round(1000*m*Math.pow(10,e-e2))/1000; // base in engineering and standard notations
	if(game.notation==0) return m2+abbreviate(e2/3-1); // standard notation
	if(game.notation==2) return m2+"e"+e2; // engineering notation
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
	localStorage.setItem('save',btoa(JSON.stringify(game)))
}
function load(save) {
	try {
		game=JSON.parse(atob(save))
	if(game.mult===undefined) game.mult = 1.5; // lines for making saves back-compatible
	if(game.microEssence===undefined) game.microEssence = 0;
	update("numDisplay",game.num);
	update("countdownDisplay",game.countdown);
	update("notationDisplay",game.notation);
	update("multDisplay",game.mult);
	update("microEssenceDisplay",game.microEssence);
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
		game = {
			num: 1,
			mult: 1.5,
			countdown: 0,
			notation: 0
		}
	}
}

function updateThings() { // various updates on each tick
	var ooms = Math.floor(Math.log10(game.num));
	update("numDisplay",format(game.num));
	if(game.countdown>50) game.countdown = game.countdown-50;
	if(game.countdown<=50&&game.countdown>=0) game.countdown = 0;
	update("countdownDisplay",game.countdown/1000); // update the displayed time
	update("multDisplay",format(game.mult));
	if(game.num>=1e33) { // Number overflow?
		hideElement("increaseNumber");
		showElement("microPrestigeElement");
	}
	update("microEssenceDisplay",game.microEssence);
        updateBaseClick()
}

function init() { // initialize
	if(localStorage.getItem('save')!=null) load(localStorage.getItem('save'))
}
setInterval(updateThings,50);
setInterval(save,10000);





