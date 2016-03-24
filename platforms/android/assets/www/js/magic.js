//Here's where my code startsssssssssssssssssssssssssssssssssssss
	
function showInfo(){
	$("button").on("tap",function(){
		$(this).hide();
	}); 
	//document.getElementById("idescription").style.display = "inline-block";
};

function navigate(current,next){
	document.getElementById(current).style.display = "none";
	document.getElementById(current).style.display = "inline-block";
};