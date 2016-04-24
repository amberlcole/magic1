$(document).ready(function (){
/************Page 1 Javascript************/	
	//Custom button actions	
	$("#cbutton").on("tap", function(e){
		cbit = 1;
		navigation( page1,page2 );
		e.preventDefault();
	});
	
    //Random button actions
	$("#rbutton").on("tap", function(e){
	    navigation(page1, page2);
		e.preventDefault();
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
		parkArray = [];
		navigation(page2,page1);
		$("input:checkbox[class=park]").attr("checked", false);	
		e.preventDefault();
	});
	
	$("#q1").on("tap", function(e){
		$("input:checkbox[class=park]:checked").each(function(){
			parkArray.push($(this).val());
		});
		
        if( parkArray.length == 0 ){
			alert("Please select a park.");
		}else{
			typeSelect();
		}
		e.preventDefault();
	});
	
/************Page 3 Javascript************/			
	$("#p3r").on("tap", function(e){
		navigation(page3,page2);
		e.preventDefault();
	});
	
	$("#q2").on("tap", function(e){
		$("input:checkbox[class=type]:checked").each(function(){
			typeArray.push($(this).val());
		});
		
		$("input:checkbox[class=type]:not(:checked)").each(function(){
			notTypeArray.push($(this).val());
		});
		console.log(notTypeArray);
		if( typeArray.length == 0 ){
			alert("Please select at least one type.");
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
		
		if(heightReq!=null){
			customItinerary(parkArray,typeArray,notTypeArray,heightReq);
			navigation(page31,page4);
		}else{
			alert("Please select a height");
		}
		e.preventDefault();
	});

/************Page 4 Javascript************/		
	$(document).on("tap", "td", function(e){
		var selected = $(this).text();
		
		if(selected.search("'")!= -1){
			selected = selected.replace("'","''");
		}
		
		parkS = parkSelect(parkArray);
		var union= "";
		if( parkS.length > 1 ){
			union = " UNION SELECT * FROM " + parkS[1] + " WHERE Name='" + selected + "'";
		}
		
		var stringToSend = "SELECT * FROM " + parkS[0] + " WHERE Name='" + selected + "'" + union;
		activityDisplay(stringToSend, function (placeHolder) { } );
		navigation(page4,page5);
		//e.preventDefault();
	});
	
	$(document).on("swipe", "tr", function(e){
		var selected = $(this).text();
		
		if(selected.search("'")!= -1){
			selected = selected.replace("'","''");
		}
		
        $(this).hide();
	});
	
/************Page 5 Javascript************/			
	$("#p5r").on("tap", function(e){
		navigation(page5,page4);
		e.preventDefault();
	});

});