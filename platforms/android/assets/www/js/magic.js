$(document).ready(function (){

/************Page 1 Javascript************/		
	//Custom button actions	
	$("#cbutton").on("tap", function(){
		var cbit = 1;
		navigation( page1,page2 );
	});
	
    //Random button actions
	$("#rbutton").on("tap", function(){
	    //randomItinerary();
	    navigation(page1, page2);
	});
	
	//Description button action
	$("#ibutton").on("click",function(){
		$("#idescription").fadeIn("fast");
		$("#c2").fadeIn("fast");
	}); 
	
	$("#idescription").on("tap", function(){
		$("#idescription").fadeOut("slow");
		$("#c2").fadeOut("slow");
	});

/************Page 2 Javascript************/	
	$("#q1").on("tap", function(){

		navigation(page2, page4);
        
        //Checks which boxes are checked and calls the correct function query
		if ((document.getElementById('dland').checked) && (document.getElementById('advent').checked)) {
		    randomItinerary1();
		}
		else if (document.getElementById('dland').checked) {
		    randomItinerary2();
		}
		else if (document.getElementById('advent').checked) {
		    randomItinerary3();
		}
		else {
		    alert("You didn't select and parks");
		}
	});
});

function navigation(c,n){
	$( c ).hide();
	$( n ).show();
};

function randomItinerary1(){
    var db = window.sqlitePlugin.openDatabase({ name: 'events.db', createFromLocation: 1, iosDatabaseLocation: 'default' });
    selectRow("SELECT * FROM events WHERE ((Rank < 7  AND Rank > 0) AND Park='Disneyland') OR ((Rank < 15 AND Rank > 0) AND Park='California Adventure') ORDER BY RANDOM()",
        function (placeHolder) { });
};

function randomItinerary2(){
    selectRow("SELECT * FROM events WHERE ((Rank < 17 AND Rank > 0) AND Park='Disneyland') ORDER BY RANDOM()",
         function (placeHolder) { });
};

function randomItinerary3(){
    selectRow("SELECT * FROM events WHERE ((Rank < 33 AND Rank > 0) AND Park='California Adventure') ORDER BY RANDOM()",
         function (placeHolder) { });
};

/** Select Rows from Table **/ 
function selectRow(query, callBack){
	var db = window.sqlitePlugin.openDatabase({name: 'events.db', 
											  createFromLocation: 1, 
											  iosDatabaseLocation: 'default'});
	var result = [];
	db.transaction(function (tx) {
		tx.executeSql(query, [], function(tx, rs){
			for(var i=0; i<rs.rows.length; i++){
				var row = rs.rows.item(i);
				result[i] = row['Name'].toString();
			}
		console.log(result);
		sendToGui(result);
		callBack(result); 
		}, errorCB);
   });
};

function sendToGui(array){
	for(var i=0; i<array.length; i++){
		var table = document.getElementById ("iresults");
        var row = table.insertRow (1);
        var cell = row.insertCell (0);
        cell.innerHTML = array[i];
	}
};

function errorCB(){
	console.log("Query not successful");
};