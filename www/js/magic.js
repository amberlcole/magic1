function navigation(c,n){
	$( c ).fadeOut(300);
	setTimeout(function(){
		$( n ).fadeIn(300);
	}, 300);
};

String.prototype.replaceAll = function(search, replace){
    if (replace === undefined) {
        return this.toString();
    }

    return this.replace(new RegExp('[' + search + ']', 'g'), replace);
};

function shuffle(array) {
    var tmp, current, top = array.length;

    if(top) while(--top) {
    	current = Math.floor(Math.random() * (top + 1));
    	tmp = array[current];
    	array[current] = array[top];
    	array[top] = tmp;
    }

    return array;
};

function sortCustom(array){
	sbit = 1;
	array = shuffle(array);
	
	if(array.length > 10){
		array = array.slice(0, 10);
	}

	for(var i=0; i<array.length; i++){
		array[i] = array[i].replaceAll("'","''")
	}

	if( array.length == 1 ){
		nameS = "'" + array[0] + "'";
	}else{
		nameS = "'" + array[0] + "' OR Name=";
		console.log("here?")
		for(var i=1; i<(array.length - 1); i++){
			temp = "'" + array[i] + "' OR Name=";
			nameS = nameS.concat(temp);
		}
		last = "'" + array[(array.length - 1)] + "'";
		nameS = nameS.concat(last);
	}
	
	parkS = parkSelect(parkArray);
	union = "";
	if( parkArray.length > 1 ){
		union = " UNION SELECT * FROM " 
				+ parkS[1] + " WHERE Name=" + nameS;
	}
	var sortQuery = "SELECT * FROM " + parkS[0] + " WHERE Name=" 
					+ nameS + union + " ORDER BY Park, Land, Rank";
	
	console.log(sortQuery);
	
	selectRow(sortQuery, function (placeHolder) { });
};

function typeSelect(){
	if( cbit != 1 ){
		randomItinerary(parkArray);
		navigation(page2, page4);
	}else{
		navigation(page2,page3);
	};
};

function parkSelect(park){
	var parkS = [];
	
	if( park.length > 1 ){
	parkS = ["EventsDL", "EventsCA"];
	}else{
		if(park[0] == "Disneyland"){
			parkS = ["EventsDL"];
		}else{
			parkS = ["EventsCA"];
		}
	};
	return parkS;
};

function customItinerary(park,type,notType,height){
	if( type.length == 1 ){
		typeS = "'%" + type[0] + "%'";
	}else{
		typeS = "'%" + type[0] + "%' OR Type LIKE";
		
		for(var i=1; i<(type.length - 1); i++){
			temp = " '%" + type[i] + "%' OR Type LIKE";
			typeS = typeS.concat(temp);
		}
		last = " '%" + type[(type.length - 1)] + "%'";
		typeS = typeS.concat(last);
		
	}
	console.log(notType.length);
	if( notType.length == 0 ){
		nTypeS = "";
	}else if(notType.length == 1){
		nTypeS = " AND Type NOT LIKE '%" + notType[0] + "%'";
	}else{
		nTypeS = " AND Type NOT LIKE '%" + notType[0] + "%' AND Type NOT LIKE";
		
		for(var i=1; i<(notType.length - 1); i++){
			temp = " '%" + notType[i] + "%' AND Type NOT LIKE";
			nTypeS = nTypeS.concat(temp);
		}
		last = " '%" + notType[(notType.length - 1)] + "%'";
		nTypeS = nTypeS.concat(last);
		
	};
	
	console.log(nTypeS);
	parkS = parkSelect(park);
	union = "";
	
	if( park.length > 1 ){
		union = " UNION SELECT * FROM " 
				+ parkS[1] + " WHERE Type LIKE " 
				+ typeS + nTypeS + " AND Height <='" 
				+ height + "'";
	}

	console.log(typeS);
	var queryToSend = "SELECT * FROM " 
					+ parkS[0] + " WHERE Type LIKE " 
					+ typeS + nTypeS + " AND Height <='" 
					+ height + "'" + union;
	console.log(queryToSend);
	selectRow(queryToSend, function (placeHolder) { });
};

function randomItinerary(park){
	sbit = 1;
	parkS = parkSelect(park);
	union = "";
	if( park.length > 1 ){
		rankS = "Rank < 15 AND Rank > 0";
		union = " UNION SELECT * FROM " + parkS[1] + " WHERE " + rankS;
	}else if( park[0] == "Disneyland"){
		rankS = "Rank < 17 AND Rank > 0";
	}else{
		rankS = "Rank < 33 AND Rank > 0";
	};
	
	var queryToSend = "SELECT * FROM " + parkS[0] + " WHERE " + rankS + union + " ORDER BY Park";
	selectRow(queryToSend, function (placeHolder) { });	
};

/** Select Rows from Table **/ 
function selectRow(query, callBack){
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

function activityDisplay(query, callBack){
	console.log(query);
	var result = [];
	db.transaction(function (tx) {
		tx.executeSql(query, [], function(tx, rs){
			for(var i=0; i<rs.rows.length; i++){
				console.log(rs.rows.length);
				var row = rs.rows.item(i);
				result[0] = row['Name'].toString();
				result[1] = row['Park'].toString();
				result[2] = row['Description'].toString();
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

function sortReturn(array){
	itineraryArray = array;
	console.log(itineraryArray);
};

function sendToGui(array){	
	if(sbit != 1){
		if(cbit != 1){
			array = shuffle(array);
		}else{
			sortCustom(array);
		}
	}else{
	
		if( array.length > 10 ){
			for(var i=0; i<10; i++){
				var table = document.getElementById ("iresults");
				var row = table.insertRow (1);
				row.className = "sResult";
				var cell = row.insertCell (0);
				cell.innerHTML = array[i];
			}
		}else{
			for(var i=0; i<array.length; i++){
				var table = document.getElementById ("iresults");
				var row = table.insertRow (1);
				row.className = "sResult";
				var cell = row.insertCell (0);
				cell.innerHTML = array[i];
			}
			$("sItinerary").html("Your itinerary came out a bit short!<br> Here are some suggestions from us!")
		}
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
};

function clearGlobal(){
	cbit = 0;
	sbit = 0;
	parkArray = [];
	typeArray = [];
	notTypeArray = [];
	itineraryArray = [];
	$("#iresults").html('<tbody><tr class="hideme"></tr></tbody>')
};

function errorCB(){
	console.log("Query not successful");
};