//Here's where my code startsssssssssssssssssssssssssssssssssssss

		$('#show').live("tap", function(){
			alert('hi');
		});	
	
function showInfo(){
	document.getElementById("idescription").style.display = "inline-block";
}

public function navigate(current,next){
	document.getElementById(current).style.display = "none";
	document.getElementById(current).style.display = "inline-block";
}