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
		
		var cv1 = $('#dland:checked').val();
		var cv2 = $('#advent:checked').val();
		
		if(cv1 == undefined && cv2 == undefined){
			//show warning
			console.log("please select your parks");
		}else{
			if($('#dland:checked').val() == undefined){
				var cv1 = "none";
			}
		
			if($('#advent:checked').val() == undefined){
				var cv2 = "none";
			}
		}
		console.log(cv1);
		console.log(cv2);
		//var cv2 = $('#advent:checked').val();
	});
});

function navigation(c,n){
	$( c ).hide();
	$( n ).show();
};

function randomItinerary(){
	var db = window.sqlitePlugin.openDatabase({name: 'events.db', createFromLocation: 1, iosDatabaseLocation: 'default'});
	selectRow("SELECT * FROM events WHERE Rank <= 10 AND Rank > 0 ORDER BY RANDOM()", 
			 function(doTheThing) {});
	
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