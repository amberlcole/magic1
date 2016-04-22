var cbit = 0;
var parkArray = [];
var typeArray = [];

$(document).ready(function (){
/************Page 1 Javascript************/	
	
	//Custom button actions	
	$("#cbutton").on("tap", function(){
		cbit = 1;
		navigation( page1,page2 );
	});
	
    //Random button actions
	$("#rbutton").on("tap", function(){
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
	$("#p2r").on("tap", function(e){
		cbit = 0;
		navigation(page2,page1);
		$("input:checkbox[class=park]").attr("checked", false);	
		e.preventDefault();
	});
	
	$("#q1").on("tap", function(e){
		
		$("input:checkbox[class=park]:checked").each(function(){
			parkArray.push($(this).val());
		});
		
		console.log(parkArray);
        
        //Checks which boxes are checked and calls the correct function query
		if ((document.getElementById('dland').checked) && (document.getElementById('advent').checked)) {
		    randomItinerary1();
			typeSelect();
		}
		else if (document.getElementById('dland').checked) {
		    randomItinerary2();
			typeSelect();
		}
		else if (document.getElementById('advent').checked) {
		    randomItinerary3();
			typeSelect();
		}
		else {
		    alert("You didn't select any parks");
		}
		e.preventDefault();
	});
	
/************Page 3 Javascript************/			
	$("#p3r").on("tap", function(e){
		navigation(page3,page2);
		e.preventDefault();
	});
	
	$("#q2").on("tap", function(e){
		
        //type id = t,m,d,w,dr,i
		$("input:checkbox[class=type]:checked").each(function(){
			typeArray.push($(this).val());
		});
		
		console.log(typeArray);
		
		if( typeArray.length == 0 ){
			alert("You didn't select any type");
		}else{
			navigation(page3,page31);
		}
		e.preventDefault();
	});
	
/************Page 3.1 Javascript************/			
	$("#p31r").on("tap", function(e){
		navigation(page31,page3);
		e.preventDefault();
	});
	
	$("#q3").on("tap", function(e){
		var heightReq = $('input[name="height"]:checked').val();
		console.log(heightReq);
		
		if(heightReq!=null){
			customItinerary(parkArray,typeArray,heightReq);
			navigation(page31,page4);
		}else{
			alert("Please select a height");
		}
		e.preventDefault();
	});

/************Page 4 Javascript************/	
	$("#p4r").on("tap", function(e){
		if( cbit != 1 ){
			navigation(page4, page31);
		}else{
			navigation(page4,page3);
		};
		e.preventDefault();
	});
		
	$(document).on("tap", "td", function(e){
		var selected = $(this).text();
		
		if(selected.search("'")!= -1){
			selected = selected.replace("'","''");
		}
		
		var stringToSend = "SELECT * FROM events WHERE Name='" + selected + "'";
		activityDisplay(stringToSend, function (placeHolder) { } );
		navigation(page4,page5);
		e.preventDefault();
	});
	
/************Page 5 Javascript************/			
	$("#p5r").on("tap", function(e){
		navigation(page5,page4);
		e.preventDefault();
	});

});

function navigation(c,n){
	$( c ).hide();
	$( n ).show();
};

function typeSelect(){
	if( cbit != 1 ){
		navigation(page2, page4);
	}else{
		navigation(page2,page3);
	};
};

function customItinerary(park, type, height){
	if( park.length > 1 ){
		parkS = "'" + park[0] + "'" + " OR Park='" + park[1] + "'";
	}else{
		parkS ="'" + park[0] + "'";
	};
	
	if( type.length == 1 ){
		typeS = "'%" + type[0] + "%' ";
	}else{
		typeS = "'%" + type[0] + "%' OR Type LIKE";
		
		for(var i=1; i<(type.length - 1); i++){
			temp = " '%" + type[i] + "%' OR Type LIKE";
			typeS = typeS.concat(temp);
		}
		last = " '%" + type[(type.length - 1)] + "%'";
		typeS = typeS.concat(last);
		
	};
	
	console.log(typeS);
	var queryToSend = "SELECT * FROM events WHERE Park=" + parkS + " AND Type LIKE " + typeS + " AND Height <='" + height + "'";
	console.log(queryToSend);
	selectRow(queryToSend, function (placeHolder) { });
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
	console.log(query);
	var db = window.sqlitePlugin.openDatabase({name: 'events.db', 
											  createFromLocation: 1, 
											  iosDatabaseLocation: 'default'});
	var result = [];
	db.transaction(function (tx) {
		tx.executeSql(query, [], function(tx, rs){
			for(var i=0; i<10/*rs.rows.length*/; i++){
				var row = rs.rows.item(i);
				result[i] = row['Name'].toString();
			}
		console.log(result);
		sendToGui(result);
		callBack(result); 
		}, errorCB);
   });
};

function activityDisplay(query, callBack){
	console.log(query);
	var db = window.sqlitePlugin.openDatabase({name: 'events.db', 
											  createFromLocation: 1, 
											  iosDatabaseLocation: 'default'});
	var result = [];
	db.transaction(function (tx) {
		tx.executeSql(query, [], function(tx, rs){
			for(var i=0; i<rs.rows.length; i++){
				var row = rs.rows.item(i);
				result[0] = row['Name'].toString();
				result[1] = row['Park'].toString();
				result[2] = row['Type'].toString();
				result[3] = row['Height'].toString();
				result[4] = row['FastPass'].toString();
				result[5] = row['Rank'].toString();
			}
		console.log(result);
		pageFive(result);
		callBack(result); 
		}, errorCB);
   });
};

function sendToGui(array){
	for(var i=0; i<array.length; i++){
		var table = document.getElementById ("iresults");
        var row = table.insertRow (1);
		row.className = "sResult";
        var cell = row.insertCell (0);
        cell.innerHTML = array[i];
	}
};

function pageFive(array){
	$("#nm").html(array[0]);
	$("#loc").html(array[1]);
	$("#des").html(array[2]);
	if(array[4] == "true"){
		$("#fp").html("Fastpass Available");
	}else{
		$("#fp").html("Fastpass Not Available");
	}
	$("#hr").html(array[3]);
	$("#rank").html(array[5]);
	
}

function errorCB(){
	console.log("Query not successful");
};