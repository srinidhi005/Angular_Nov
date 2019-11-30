import { Component, OnInit } from '@angular/core';
import "../../../assets/js/pdf.js";

import html2canvas from 'html2canvas';
import pdfMake from 'pdfmake';

@Component({
  selector: 'app-pdf',
  templateUrl: './pdf.component.html',
  styleUrls: ['./pdf.component.scss']
})
export class PdfComponent implements OnInit {

  constructor() { }
  ngOnInit() {
  
  	var companyName = decodeURI(window.location.href).split("=")[1];
	let scenarioInput = {
	"async": true,
	"crossDomain": true,
	"url": "http://34.67.197.111:8000/scenarios?company="+companyName,
	"method": "GET",
	"headers": {
	"authorization": "Basic cm1pX3VzZXI6cm1pMzIxIUAj",
	"content-type": "application/json",
	"cache-control": "no-cache",
	"postman-token": "648dcbfa-30ef-3359-f29a-31b2038f29ac"
	},
	"processData": false,
	}


	$.ajax(scenarioInput).done(function (response){
	  let str="<option _ngcontent-sut-c5='' value='' ng-reflect-value=''> Scenarios </option>";
	  let presentScenarios = [];
	  presentScenarios = (JSON.parse(response)).scenarios;
	  console.log(presentScenarios);
	  for(var i=1;i<presentScenarios.length;i++){
		  str=str+"<option _ngcontent-sut-c5='' value='"+presentScenarios[i]+"' ng-reflect-value='"+presentScenarios[i]+"'> Scenario "+presentScenarios[i]+" </option>";
		  }
		  $("#sel2").html(str);
		  });

  
  
  
		  }
  
  
  
  
  //   tableToExcel = (function() {
//     var companyName = decodeURI(window.location.href).split("=")[1];
// 	  var uri = 'data:application/vnd.ms-excel;base64,'
// 		      , template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--><meta http-equiv="content-type" content="text/plain; charset=UTF-8"/></head><body><table>{table}</table></body></html>'
// 		          , base64 = function(s) { return window.btoa(unescape(encodeURIComponent(s))) }
// 	      , format = function(s, c) { return s.replace(/{(\w+)}/g, function(m, p) { return c[p]; }) }
// 	        return function(table, name) {
// 			    if (!table.nodeType) table = document.getElementById(table)
// 				var row = table.insertRow(-1);
// 						row.style.height = '70px';
					
// 			      var cell1 = row.insertCell(0);
			  
// 			      var row1 = table.insertRow(0);
// 			       var cell2 = row1.insertCell(0);
			       
// 			       cell1.innerHTML = '<img src="http://34.67.197.111/assets/img/RMI.jpg">';
// 		     cell2.innerHTML = "<b>" + 'Company Name: '+" "+companyName+"</b>";

// 				        var ctx = {worksheet: name || companyName, table: table.innerHTML}
// 			        var blob = new Blob([format(template, ctx)]);
// 				  var blobURL = window.URL.createObjectURL(blob)
// 				 table.deleteRow(-1);
				 
//           table.deleteRow(0);
          
// 				      return blobURL;
// 				        }
// })()

 tableToExcel = (function() {
  var companyName = decodeURI(window.location.href).split("=")[1];

	var dt = new Date();
       	var day = dt.getDate();
		  var month = dt.getMonth()+1 ;
		  var year = dt.getFullYear();	
		  			    				  
	     var postfix = month + "." + day + "." + year ;
	     var uri = 'data:application/vnd.ms-excel;base64,'
		      ,  template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--><meta http-equiv="content-type" content="text/plain; charset=UTF-8"/></head><body><table><h4>{heading}</h4>{table}</table><img src="{imgsrc1}" style="float:left;clear:none;margin-right:50px " height=50 width=100/></body></html>'
		          , base64 = function(s) { return window.btoa(unescape(encodeURIComponent(s))) }
        , format = function(s, c) { return s.replace(/{(\w+)}/g, function(m, p) { return c[p]; }) }
     
	        return function(table, name) {
				var heading=companyName;
				var  imgsrc1='http://34.67.197.111/assets/img/RMI.jpg';
		 
			    if (!table.nodeType) table = document.getElementById(table)
                // var ctx = {worksheet: name || 'RMI_Insights_Export'+postfix,imgsrc1: imgsrc1,  heading: heading , table: table.innerHTML}
                 var ctx = {worksheet: name+postfix,imgsrc1: imgsrc1,  heading: heading , table: table.innerHTML}
                
			        window.location.href = uri + base64(format(template, ctx))
					  }
})()






		download() {
				
		var companyName = decodeURI(window.location.href).split("=")[1];
		$('#myTable').prepend('<tr />').children('tr:first').append('<td colspan="8" ><b>'+"  "+' '+companyName+'</b></td>')
			$('#myTable').append("<tr><td colspan='8' style='text-align:left' height='40'><img src='http://34.67.197.111/assets/img/RMI.jpg'></td></tr>");

		html2canvas(document.getElementById('myTable')).then(function (canvas) {
		
		  var data = canvas.toDataURL();
											    					
		var dt = new Date();
	 	 var day = dt.getDate();
		 var month = dt.getMonth()+1 ;
		 var year = dt.getFullYear();
		 var postfix = month + "." + day + "." + year ;
		 	var docDefinition = {
			content: [{
			 
				image: data,
				width: 500,
				 }]
				 };
			
																																																	pdfMake.createPdf(docDefinition).download('RMI_Insights_Export_'+companyName+'_'+ postfix+ '.pdf');
																																																	$("table[id='myTable'] tr:last-child").remove();
																																																	$("table[id='myTable'] tr:first-child").remove();
																																																	 });
																						
																																																	 }
																																																	 }																							 
			
