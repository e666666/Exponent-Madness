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
	let prefixes2H = [
	['', 'Me', 'Du', 'Tr', 'Tt', 'Pt', 'Hx', 'Hp', 'Ot', 'En'],
	['', 'Vc', 'Ic', 'Trt', 'Ttt', 'Pt', 'Xt', 'Ht', 'Oct', 'Et'],
	['', 'Hct', 'Dhc', 'Thc', 'Trh', 'Phc', 'Hxh', 'Hph', 'Ohc', 'Ehc']]
	let prefixes3 = ["", "Kl", "Mg", "Gg", "Tr", "Pt"]
	var result = ''
			if (typeof(e)=="number") {
				var id = Math.floor(e/3-1)
				var log = Math.floor(Math.log10(id))
				var step = Math.max(Math.floor(log/3-3),0)
				id = Math.round(id/Math.pow(10,Math.max(log-9,0)))*Math.pow(10,Math.max(log-9,0)%3)
			} else {
				var id = e.div(3)
				var log = Math.floor(id.log10())
				var step = Math.max(Math.floor(log/3-3),0)
				id = Math.round(id.div(Decimal_BI.pow(10,Math.max(log-9,0))).toNumber())*Math.pow(10,Math.max(log-9,0)%3)
			}
			while (id > 0) {		
				var partE = id % 1000
				if (partE > 0) {
					if (partE == 1 && step > 0) var prefix = ""
					else var prefix = prefixes[0][partE % 10] + prefixes[1][Math.floor(partE/10) % 10] + prefixes[2][Math.floor(partE/100)]
					var result2 = ""
					if (step > 102) {
						var s2 = step
						var stepT3 = 0
						while (s2 > 0) {
							partS = s2 % 1000
							if (partS > 0) {
								if (partS > 1 || stepT3 < 1) {
									prefix2 = prefixes2H[1][Math.floor(partS/10)%10]
									if (partS%100==10) prefix2 = "VE"
									if (partS%100==20) prefix2 = "IS"
									prefix2 = prefixes2H[0][partS%10] + prefix2 + prefixes2H[2][Math.floor(partS/100)]
								} else prefix2 = ""
								if (result2 == "") result2 = prefix2 + prefixes3[stepT3]
								else result2 = prefix2 + prefixes3[stepT3] + "a-" + result2
							}
							s2 = Math.floor(s2/1000)
							stepT3++
						}
						
					} else result2 = prefixes2[step]
					if (result == "") result = prefix + result2
					else result = prefix + result2 + '-' + result
				}
				id = Math.floor(id/1000)
				step++
			}
			document.getElementById('result').textContent = "Standard: "+result+"s"
		}
