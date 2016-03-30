$(document).ready(function (){

/************Page 1 Javascript************/		
	//Custom button actions	
	$("#cbutton").on("tap", function(){
		var cbit = 1;
		navigation( page1,page2 );
	});
	
    //Random button actions
	$("#rbutton").on("tap", function(){
	    randomItinerary();
	   // testPrint(randomArray);
		
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

	
});

function descript(){
	
};

function navigation(c,n){
	$( c ).hide();
	$( n ).show();
};

function randomItinerary(){
    //Opens database file for query

	var db = window.sqlitePlugin.openDatabase({name: 'events.db', createFromLocation: 1, iosDatabaseLocation: 'default'});
	//var crs = db.executeSql('SELECT * FROM EVENTS', [], querySuccess, errorCB);
	exeSql();
	
	//console.log(crs);
	
  /*  String[] randomArray = new String[crs.getCount()];
    int i = 0;
            
    //Writes the top ten events into array
    while(crs.moveToNext()){
        if (i < 10){
            String rideName = crs.getString(crs.getColumnIndex("NAME"));
            array[i] = rideName;
            i++;
        }
        else {
            randomize(randomArray);
        }   
    }*/
};

/** Initialize Database  **/
function exeSql(){ 
   selectRow("SELECT * FROM events;", function(pleaseWork) {
     //console.log(pleaseWork);
     // any further processing here
   });
}; 

/** Select Row from Table **/ 
function selectRow(query, callBack){ // <-- extra param
   var db = window.sqlitePlugin.openDatabase({name: 'events.db', createFromLocation: 1, iosDatabaseLocation: 'default'});
   var result = [];
   db.transaction(function (tx) {
		tx.executeSql(query, [], function(tx, rs){
			for(var i=0; i<rs.rows.length; i++) {
				var row = rs.rows.item(i);
				result[i] = { id: row['Rank'],
                          name: row['Name']
						}
			}
		console.log(result);
		callBack(result); // <-- new bit here
		}, errorCB);
   });
};

function querySuccess(){
	console.log("Database query successful.");
};

function errorCB(){
	console.log("Query not successful");
};

//Fisher-Yates Shuffle
function randomize(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    //While there remain elements to shuffle...
    while (0 != currentIndex) {

        //Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        //And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
};

function testPrint(array){
    //TEST STATEMENT to print all array elements
    for (var i = 0; i < array.length; i++) {
        console.log("Index " + i + " has value of: " + array[i] + "<br />");
	}
};