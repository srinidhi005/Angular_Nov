 
		function allowAlphaNumeric(e) {
			          var code = ('charCode' in e) ? e.charCode : e.keyCode;
			            if ( !(code > 47 && code < 58) && // numeric (0-9)
					                                    !(code > 64 && code < 91) && // upper alpha (A-Z)
					                                        !(code > 96 && code < 123)) { // lower alpha (a-z)
					                            e.preventDefault();
					       }
		}


 var validationFlag = false;


function importupload(ev){
	
        $("#cover-spin").show();
	$("#startImportBtn").prop("disabled",true);
        ev.preventDefault();
        var file = document.getElementById('inputfilenow').files[0];
        var company = document.getElementById('company').value;
        var period = document.getElementById('period').value;
        var statementtype = document.getElementById('statementtype').value;
        var industry = document.getElementById('industry').value;
        var data = new FormData();
        data.append("file", file);
        data.append("company",company);//company);
              data.append("period",period);//period);
        data.append("statementtype",statementtype);
        data.append("industry",industry);
	 
	if (document.getElementById("inputfilenow").files[0]== undefined)
	{
		validationFlag=true;
	}
	if (document.getElementById("company").value==""||validateCompanyName(company))
	{
		validationFlag=true;
	}
        if(document.getElementById("period").value=="")
	{
		validationFlag=true;
	}
	if(document.getElementById("statementtype").value=="")
	{
		validationFlag=true;
	}
	if(document.getElementById("industry").value=="")
	{
		validationFlag=true;
	}
	if(validationFlag)
	{
	alert("All fields are mandatory");
		$("#startImportBtn").prop("disabled",false);
$('#cover-spin').hide();
		return;
		}
	
		
	$.ajax({
          type: 'POST',
          enctype: 'multipart/form-data',
          processData: false,
          contentType: false,
          //data: JSON.stringify(data),
              //contentType: 'multipart/form-data',
                      url: '/upload',
           data:data,

                      success: function(data) {
			      $(".myAlert-top").show();
			      $("#myModal").modal("hide");
			      $("#cover-spin").hide();
			      $("#startImportBtn").prop("disabled",false);
        },
            error: function(data){
		    $("#cover-spin").hide();
              alert("Error while uploading");
		    $("#startImportBtn").prop("disabled",false);
        },
                  });


          return false;

}

		
      		function validateCompanyName(){
		 $('#cover-spin').show();
			$("#startImportBtn").prop("disabled",true);
                let companyname=document.getElementById("company").value;
		let input = {
				"async": true,
				"crossDomain": true,
				"url": "http://34.67.197.111:8000/companies",
				"method": "GET",			
			"headers": {
							"authorization": "Basic cm1pX3VzZXI6cm1pMzIxIUAj",
							"content-type": "application/json",
							"cache-control": "no-cache",
							"postman-token": "648dcbfa-30ef-3359-f29a-31b2038f29ac"
						},
				"processData": false,
		}
			$.ajax(input).done(function (response){
			$("#startImportBtn").prop("disabled",false);
				var companiesArray=((JSON.parse(response)).companies);
				var flag = false;
				for(var i=0;i<companiesArray.length;i++){
			if(companiesArray[i].toUpperCase()==companyname.toUpperCase())
					{
					flag = true;
				break;
					}
				}
			$("#cover-spin").hide();
			if ( flag )
				{
				validationFlag=true;
				alert("Name already exists, Please enter a unique name");
				
				return false;
			
			}
				else
				{
				validationFlag=false;
				}

			
		});
	
		}

