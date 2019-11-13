 
    function upload(ev){ 
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
                          console.log('success');
                          console.log(JSON.stringify(data));
            alert("File Uploded Successfully");
        },
            error: function(data){
              alert("Failed Some Field are Missing");
        },
                  });
    
          return false;
      }