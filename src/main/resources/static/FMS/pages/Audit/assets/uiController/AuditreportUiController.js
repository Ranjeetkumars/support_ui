
/*
 *@DESC : get_Audit_Details_Data_DOM
 *@AuthorName : Bharath
 *@DATE : 11-12-2019
 */


function get_Audit_Details_Data_DOM(strData) {
 
    $('#audittableId').empty();
    try {
        for (var i = 0; i < strData.length; i++) {
            //  console.log('JSON DATA ----> ' + JSON.stringify(strData));
            var index = i + 1;

            var tbleRow = document.createElement("tr");

            var tablcol1 = document.createElement("td");
            $(tablcol1).html(index);
            $(tbleRow).append(tablcol1);

            var tablcol2 = document.createElement("td");
            var module = strData[i].auditId;
            if (module === "NA") {
                $(tablcol2).html('Not Found');
            } else {
                $(tablcol2).html(module);
            }
            $(tbleRow).append(tablcol2);

            var tablcol3 = document.createElement("td");
            var agents = strData[i].baseLocName;
            if (agents === "NA") {
                $(tablcol3).html('Not Found');
            } else {
                $(tablcol3).html(agents);
            }
            $(tbleRow).append(tablcol3);



            var tablcol4 = document.createElement("td");
            var ctiagents = strData[i].permenantregno;
            if (ctiagents === "NA") {
                $(tablcol4).html('Not Found');
            } else {
                $(tablcol4).html(ctiagents);
            }
            $(tbleRow).append(tablcol4);
            
            
             var tablcol5 = document.createElement("td");
            var ctiagents = strData[i].userName;
            if (ctiagents === "NA") {
                $(tablcol5).html('Not Found');
            } else {
                $(tablcol5).html(ctiagents);
            }
            $(tbleRow).append(tablcol5);
            
            
              var tablcol6 = document.createElement("td");
            var ctiagents = strData[i].auditDate;
            if (ctiagents === "NA") {
                $(tablcol6).html('Not Found');
            } else {
                $(tablcol6).html(ctiagents);
            }
            $(tbleRow).append(tablcol6);
            
            
            
            
            
            
            
            

            var tablcol7 = document.createElement("td");
            $(tbleRow).append(tablcol7);

            var tabanchor = document.createElement("a");
            $(tabanchor).attr('href', 'report.html');
            tablcol7.appendChild(tabanchor);

//              $(tablcol5).append(tabanchor);

            var tabanchorbutton = document.createElement("button");
            $(tabanchorbutton).attr('type', 'button');
            $(tabanchorbutton).attr('class', 'btn btn-primary btn-sm');
            tabanchor.appendChild(tabanchorbutton);

            var tabanchorlink = document.createElement("i");
            $(tabanchorlink).attr('class', 'fa fa-eye');
            $(tabanchorlink).html('View');
            tabanchorbutton.appendChild(tabanchorlink);

            //Appending Body Here
            $("#audittableId").append(tbleRow);
        }

    } catch (err) {
        console.log("============get_CTIModulesMappwithUser_DOM===========" + err);
    }
}
