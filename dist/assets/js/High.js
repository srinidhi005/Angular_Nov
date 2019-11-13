

// var yearsArray = [];
// var inputArray= [];
// try {
// 	var queryString = window.location.href.split("?")[1];
// 	var companyName = (queryString.split("&")[0]).split("=")[1];
// 	var scenarioNumber = (queryString.split("&")[1]).split("=")[1];
// } catch (error) {
// 	console.log(error);
// }

// var scenarioCount = 0;

// $("#excelId").attr("href","/pdf?companyName="+companyName);
// $("#actualsId").attr("href","/actual?CompanyName="+companyName);
// $("#financialId").attr("href","/FinancialModel?CompanyName="+companyName);
// var assumptionArray = [];
// let actualsInput = {
// 	"async": true,
// 	"crossDomain": true,
// 	"url": "http://34.67.197.111:8000/actuals?company="+companyName,
// 	"method": "GET",
// 	"headers": {
// 		"authorization": "Basic cm1pX3VzZXI6cm1pMzIxIUAj",
// 		"content-type": "application/json",
// 		"cache-control": "no-cache",
// 		"postman-token": "648dcbfa-30ef-3359-f29a-31b2038f29ac"
// 	},
// 	"processData": false,
// }
// 	var actualObj = new Map();
// 	var rojectionObj = new Map();
// 	var actualXAxis = [];
// 	var previousAmount = 0;
// 	$('#cover-spin').show();
// 	$.ajax(actualsInput).done(function (response){
// 	$('#cover-spin').hide();
// 			let resObject = JSON.parse(response);
// 			for (let j=0; j<resObject.length; j++) {
// 				if( resObject[j].latest === 0){
// 					previousAmount = resObject[j].totalrevenue;
// 				}
// 				actualObj.set(resObject[j].asof,{
// 					"totalRevenue":resObject[j].totalrevenue,
// 					"p_GrossProfit" : resObject[j].grossprofit, 
// 					"p_EBIT" : resObject[j].ebit, 
// 					"p_EBITDA" : resObject[j].ebitda, 
// 					"p_EBT" : resObject[j].ebt,
// 					"p_NetInCome" : resObject[j].netincome,
// 					"latest" : resObject[j].latest
// 					}
// 				);
// 			yearsArray.push(resObject[j].asof);
// 			}
// 		updateProjection(actualObj);			 
// 	});

// function loadData(){
// let scenarioInput = {
// 	"async": true,
// 	"crossDomain": true,
// 	"url": "http://34.67.197.111:8000/scenarios?company="+companyName,
// 	"method": "GET",
// 	"headers": {
// 		"authorization": "Basic cm1pX3VzZXI6cm1pMzIxIUAj",
// 		"content-type": "application/json",
// 		"cache-control": "no-cache",
// 		"postman-token": "648dcbfa-30ef-3359-f29a-31b2038f29ac"
// 	},
// 	"processData": false,
// }
// let assumptionInput = {
// 	"async": true,
// 	"crossDomain": true,
// 	"url": "http://34.67.197.111:8000/projections?company="+companyName+"&scenario=0",
// 	"method": "GET",
// 	"headers": {
// 		"authorization": "Basic cm1pX3VzZXI6cm1pMzIxIUAj",
// 		"content-type": "application/json",
// 		"cache-control": "no-cache",
// 		"postman-token": "648dcbfa-30ef-3359-f29a-31b2038f29ac"
// 	},
// 	"processData": false,
// }
// $('#cover-spin').show();
// $.ajax(scenarioInput).done(function (response){
// $('#cover-spin').hide();
// 	let presentScenarios = [];
// 	presentScenarios = (JSON.parse(response)).scenarios;
// 	//presentScenarios = [0];
// 	if(presentScenarios.includes(parseInt(scenarioNumber))){
// 		assumptionInput.url = "http://34.67.197.111:8000/projections?company="+companyName+"&scenario="+scenarioNumber;
// 	}
// 	for(let index = 1;index <= presentScenarios.length ; index++){
// 		if(typeof presentScenarios[index] != 'undefined'){
// 			scenarioCount = index + 1;
// 			$("#scenario"+presentScenarios[index]).show();
// 			$("#scenario"+presentScenarios[index]).attr("href","/FinancialModel?companyName="+companyName+"&senario="+presentScenarios[index]);
// 		}
// 	}
// 	if(scenarioCount <= 4 && scenarioCount >= 0){
// 		$("#addNewScenario").show();
// 		$("#addNewScenario").attr("href","/FinancialModel?companyName="+companyName+"&senario="+(scenarioCount));
// 	}
// 	if(scenarioNumber <= 4 && scenarioNumber >= 0){
// 		$("#saveScenario").show();
// 	}
// 	$('#cover-spin').show();
// 	$.ajax(assumptionInput).done(function (response){
// 	$('#cover-spin').hide();
// 		let resObject = JSON.parse(response);
// 		if(Array.isArray(resObject)){
// 			resObject = JSON.parse(response);
// 			let totalRevenue = 0;
// 			let revenueGrowthArray = [];
// 			let COGSArray = [];
// 			let SGAndAArray = [];
// 			let DAndAArray = [];
// 			let otherIncomeOrExpenseArray = [];
// 			let netinterestdollarsArray = [];
// 			for (let j=0; j<resObject.length; j++) {
// 				if(j == 0){
// 					totalRevenue = Math.round(previousAmount + (previousAmount * (resObject[j].revenuepercent/100)));
// 				}else{
// 					totalRevenue = Math.round(resObject[j-1].totalRevenue + (resObject[j-1].totalRevenue * (resObject[j].revenuepercent/100)));
// 				}
// 				actualObj.set(resObject[j].asof,{
// 						"totalRevenue": totalRevenue,
// 						"revenueGrowth" : resObject[j].revenuepercent, 
// 						"COGS" : resObject[j].cogspercent, 
// 						"SGAndA" : resObject[j].sgapercent, 
// 						"DAndA" : resObject[j].dapercent,
// 						"netIterestExpense" : resObject[j].netinterestdollars,
// 						"otherIncomeOrExpense" :resObject[j].otherincomepercent,
// 						"netinterest" : resObject[j].netinterest,
// 						"latest" : resObject[j].latest,
// 						"taxes" :resObject[j].taxespercent,
// 						"latest" : resObject[j].latest
// 				});
// 				yearsArray.push(resObject[j].asof);
// 				assumptionArray.push(resObject[j].asof)
// 				revenueGrowthArray.push(resObject[j].revenuepercent);
// 				COGSArray.push(resObject[j].cogspercent);
// 				SGAndAArray.push(resObject[j].sgapercent);
// 				DAndAArray.push(resObject[j].dapercent);
// 				otherIncomeOrExpenseArray.push(resObject[j].otherincomepercent);
// 				netinterestdollarsArray.push(resObject[j].netinterestdollars);
// 			}
// 			// revenueGrowthChart.series[0].update({data:revenueGrowthArray});
// 			// COGSChart.series[0].update({data:COGSArray});
// 			// SGAndAChart.series[0].update({data:SGAndAArray});
// 			// DAndAChart.series[0].update({data:DAndAArray});
// 			// otherIncomeOrExpenseChart.series[0].update({data:otherIncomeOrExpenseArray});
// 			// netIterestExpenseChart.series[0].update({data:netinterestdollarsArray});
// 			// updateProjection(actualObj);
// 		}			 
// 	});
// });
// }

// loadData();


       
// var revenueGrowthChart= new Highcharts.Chart('revenuegrowth', {
// 	// Created pie chart using Highchart
// 	chart: {
// 	  type: 'column',
// 	  renderTo: 'revenuegrowth'
// 	},
// 	title: {
// 		text: 'Revenue Growth'
// 	},

// 	xAxis: {
// 		 categories: [1,2,3]
// 	},
// 		yAxis: {
// 			min : -50,
// 			max : 50,
// 			title : {
// 				text:'In Percentage %'
// 			}
// 		},
// 	plotOptions: {
// 		series: {
// 			point: {
// 				// events: {

// 				//     drag: function (e) {
// 				//     },
// 				//     drop: function (e) {  
// 				//         updateP_TotalRevenueChart(e.y,e.target.category,e.x);
// 				//     }
// 				// }
// 			},
// 			stickyTracking: false
// 		},
// 		column: {
// 			stacking: 'normal',
// 			color:'grey'
// 		},
// 		line: {
// 			cursor: 'ns-resize'
// 		}
// 	},
// 	colors: [	
// 		'grey',
// 			   'skyblue'
// 	 ],
// 	tooltip: {
// 	  //headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
// 	  //pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
	 
		
// 		 valueDecimals: 0,
// 		valueSuffix:"%"

// 	},
// 	series: [{
// 		name: '',
// 	   data : [1,2,3],
// 		 //data: [obj.get(yearsArray[0]).COGS,obj.get(yearsArray[1]).COGS,obj.get(yearsArray[2]).COGS,obj.get(yearsArray[3]).COGS],
// 		draggableX: true,
// 		draggableY: true,
// 		dragMinY: -50,
// 		dragMaxY: 50,
// 		type: "column",
// 		minPointLength: 2,
// 		showInLegend: false
// 	}
// 	],
   
//   });



// function updateP_TotalRevenueChart(x,y,index){
// 	actualObj.get(y).revenueGrowth = x;
// 	updateProjection(actualObj);
// }
// function updatedCOGSChart(x,y,index){
// 	actualObj.get(y).COGS = x;
// 	updateProjection(actualObj);
// }
// function updatedSGAndAChart(x,y,index){
// 	actualObj.get(y).SGAndA = x;
// 	updateProjection(actualObj);
// }
// function updatedDAndAChart(x,y,index){
// 	actualObj.get(y).DAndA = x;
// 	updateProjection(actualObj);
// }
// function updatedOtherIncomeChart(x,y,index){
// 	actualObj.get(y).otherIncomeOrExpense = x;
// 	updateProjection(actualObj);
// }

// function updateProjection(obj){
// 	let totalRevenueArray = [];
// 	let p_GrossProfitArray = [];
// 	let p_EBITArray = [];
// 	let p_EBITDAArray = [];
// 	let p_EBTArray = [];
// 	let p_NetInComeArray =[];
// 	//let revenueGrowthArray =[];
// 	let lastKey = 0;
// 	for (let [key, value] of obj) {
// 		if(typeof obj.get(key).COGS !== 'undefined'){
// 			obj.get(key).totalRevenue = Math.round(obj.get(lastKey).totalRevenue + (obj.get(lastKey).totalRevenue * (obj.get(key).revenueGrowth/100)));
// 			obj.get(key).p_COGS = Math.round(obj.get(key).totalRevenue * (obj.get(key).COGS/100));
// 			obj.get(key).p_GrossProfit = Math.round(obj.get(key).totalRevenue - obj.get(key).p_COGS);
// 			obj.get(key).p_SGAndA = Math.round(obj.get(key).totalRevenue * (obj.get(key).SGAndA/100));
// 			obj.get(key).p_EBIT = Math.round(obj.get(key).p_GrossProfit - obj.get(key).p_SGAndA);
// 			obj.get(key).p_DAndA = Math.round(obj.get(key).totalRevenue * (obj.get(key).DAndA/100));
// 			obj.get(key).p_EBITDA = Math.round(obj.get(key).p_EBIT + obj.get(key).p_DAndA);
// 			obj.get(key).p_NIE = obj.get(key).netIterestExpense;
// 			obj.get(key).p_OIOrE = Math.round(obj.get(key).totalRevenue * (obj.get(key).otherIncomeOrExpense/100));
// 			obj.get(key).p_EBT = Math.round(obj.get(key).p_EBIT - obj.get(key).p_NIE - obj.get(key).p_OIOrE);
// 			obj.get(key).p_taxes = Math.round(obj.get(key).p_EBT * (obj.get(key).taxes/100));
// 			obj.get(key).p_NetInCome = obj.get(key).p_EBT - obj.get(key).p_taxes;
// 			//revenueGrowthArray.push(obj.get(key).revenueGrowth);
// 			}
// 			totalRevenueArray.push(obj.get(key).totalRevenue);
// 			p_GrossProfitArray.push(obj.get(key).p_GrossProfit);
// 			p_EBITArray.push(obj.get(key).p_EBIT);
// 			p_EBITDAArray.push(obj.get(key).p_EBITDA);
// 			p_EBTArray.push(obj.get(key).p_EBT);
// 			p_NetInComeArray.push(obj.get(key).p_NetInCome);
// 			lastKey = key;
// 	}
	
// 	// p_totalRevenueChart.series[0].update({data: totalRevenueArray});
// 	// p_grossProfitChart.series[0].update({data: p_GrossProfitArray});
// 	// p_EBITChart.series[0].update({data:p_EBITArray});
// 	// p_EBITDAChart.series[0].update({data:p_EBITDAArray});
// 	// p_EBTChart.series[0].update({data:p_EBTArray});
// 	// p_NetInComeArrayChart.series[0].update({data:p_NetInComeArray});
// 	//revenueGrowthChart.series[0].update({data:revenueGrowthArray});
// }

// function saveData(){
// 	for (let [key, value] of actualObj) {
// 	let inputObj = new Object();
// 		if(typeof actualObj.get(key).COGS !== 'undefined'){
// 			inputObj.asof = key.toString();
// 			inputObj.cogs = actualObj.get(key).p_COGS;
// 			inputObj.cogspercent = actualObj.get(key).COGS;
// 			inputObj.companyname = companyName;
// 			inputObj.da = actualObj.get(key).p_DAndA;
// 			inputObj.dapercent = actualObj.get(key).DAndA;
// 			inputObj.ebit = actualObj.get(key).p_EBIT;
// 			inputObj.ebitda = actualObj.get(key).p_EBITDA
// 			inputObj.ebitdamargin = Math.round((actualObj.get(key).p_EBITDA / actualObj.get(key).totalRevenue) * 100);
// 			inputObj.ebitmargin = Math.round((actualObj.get(key).p_EBIT / actualObj.get(key).totalRevenue) * 100);
// 			inputObj.ebt = actualObj.get(key).p_EBT;
// 			inputObj.ebtmargin = Math.round((actualObj.get(key).p_EBT / actualObj.get(key).totalRevenue) * 100);
// 			inputObj.grossprofit = actualObj.get(key).p_GrossProfit;
// 			inputObj.grossprofitmargin = Math.round((actualObj.get(key).p_GrossProfit / actualObj.get(key).totalRevenue) * 100);
// 			inputObj.latest = actualObj.get(key).latest; 
// 			inputObj.netincome = actualObj.get(key).p_NetInCome;
// 			inputObj.netincomemargin = Math.round((actualObj.get(key).p_NetInCome / actualObj.get(key).totalRevenue) * 100);
// 			inputObj.netinterest =  actualObj.get(key).netinterest;
// 			inputObj.netinterestdollars = actualObj.get(key).netIterestExpense; /****/
// 			inputObj.otherincome = actualObj.get(key).p_OIOrE;
// 			inputObj.otherincomepercent = actualObj.get(key).otherIncomeOrExpense;
// 			inputObj.revenuepercent = actualObj.get(key).revenueGrowth;
// 			inputObj.scenario = parseInt(scenarioNumber);
// 			inputObj.sga = actualObj.get(key).p_SGAndA;
// 			inputObj.sgapercent = actualObj.get(key).SGAndA;
// 			inputObj.taxes = actualObj.get(key).p_taxes;
// 			inputObj.taxespercent = actualObj.get(key).taxes;
// 			inputObj.totalrevenue = actualObj.get(key).totalRevenue;
// 			inputArray.push(inputObj);
// 		}

// 	}
	
	
// 	let saveDetails = {
// 		"async": true,
// 		"crossDomain": true,
// 		"url": "http://34.67.197.111:8000/projections?company="+"TESLA2",
// 		"method": "POST",
// 		"headers": {
// 			"authorization": "Basic cm1pX3VzZXI6cm1pMzIxIUAj",
// 			"content-type": "application/json",
// 			"cache-control": "no-cache",
// 			"postman-token": "648dcbfa-30ef-3359-f29a-31b2038f29ac"
// 		},
// 		"processData": false,
// 		"data" : JSON.stringify(inputArray)
// 	}
// 	$('#cover-spin').show();
// 	$.ajax(saveDetails).done(function (response){
// 		$('#cover-spin').hide();
// 		console.log(response)	
// 		loadData();
// 	});

// }
