$(document).ready(function (){

/************Page 1 Javascript************/		
	//Itinerary button actions	
	$("#cbutton").on("tap", function(){
		var cbit = 1;
		navigation( page1,page2 );
	});
	
	$("#rbutton").on("tap", function(){
		navigation( page1,page2 );
	});
	
	//Description button action
	$("#ibutton").on("tap",function(){
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


