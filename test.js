function getShortAbbreviation(e) {
    if(i==0) return "K"; // thousand
		if(i==1) return "M"; // million
		if(i==2) return "B"; // billion
		if(i==8) return "Oc";
		if(i==9) return "No";
	const prefixes = [
	['', 'U', 'D', 'T', 'Qa', 'Qi', 'Sx', 'Sp', 'O', 'N'],
	['', 'Dc', 'Vg', 'Tg', 'Qag', 'Qig', 'Sxg', 'Spg', 'Og', 'Ng'],
	['', 'Cn', 'Dcn', 'Tcn', 'Qac', 'Qic', 'Sxc', 'Spc', 'Ocn', 'Nc']]
	const prefixes2 = ['', 'Mi', 'Mc', 'Nn', 'Pc', 'Fm', 'At', 'Zp', 'Yc', 'Xn', 
	'Vc', 'Mc', 'Duc', 'Trc', 'Ttc', 'Ptc', 'Hxc', 'Hpc', 'Otc', 'Enc', 
	'Ic', 'MeIc', 'DuIc', 'TrIc', 'TtIc', 'PtIc, 'HxIc', 'HpIc', 'OtIc', 'EnIc', 
	'Trt', 'MeTrt', 'DuTrt', 'TrTrt', 'TtTrt', 'PtTrt', 'HxTrt', 'HpTrt', 'OtTrt', 'EnTrt', 
	'Ttt', 'MeTtt', 'DuTtt', 'TrTtt', 'TtTtt', 'PtTtt', 'HxTtt', 'HpTtt', 'OtTtt', 'EnTtt', 
	'Ptt', 'MePtt', 'DuPtt', 'TrPtt', 'TtPtt', 'PtPtt', 'HxPtt', 'HpPtt', 'OtPtt', 'EnPtt', 
	'Hxt', 'MeHxt', 'DuHxt', 'TrHxt', 'TtHxt', 'PtHxt', 'HxHxt', 'HpHxt', 'OtHxt', 'EnHxt', 
	'Hpt', 'MeHpt', 'DuHpt', 'TrHpt', 'TtHpt', 'PtHpt', 'HxHpt', 'HpHpt', 'OtHpt', 'EnHpt', 
	'Ott', 'MeOtt', 'DuOtt', 'TrOtt', 'TtOtt', 'PtOtt', 'HxOtt', 'HpOtt', 'OtOtt', 'EnOtt', 
	'Ent', 'MeEnt', 'DuEnt', 'TrEnt, 'TtEnt', 'PtEnt', 'HxEnt', 'HpEnt', 'OtEnt', 'EnEnt', 
	'Hct', 'MeHct', 'DuHct']
	var result = ''
	var id = Math.floor(e/3-1)
	var log = Math.floor(Math.log10(id))
	var step = Math.max(Math.floor(log/3-3),0)
	id = Math.round(id/Math.pow(10,Math.max(log-9,0)))*Math.pow(10,Math.max(log-9,0)%3)
    while (id > 0) {		
		var partE = id % 1000
		if (partE > 0) {
			if (partE == 1 && step > 0) var prefix = ""
			else var prefix = prefixes[0][partE % 10] + prefixes[1][Math.floor(partE/10) % 10] + prefixes[2][Math.floor(partE/100)]
			if (result == "") result = prefix + prefixes2[step]
			else result = prefix + prefixes2[step] + '-' + result
		}
		id = Math.floor(id/1000)
		step++
	}
	return result
}
