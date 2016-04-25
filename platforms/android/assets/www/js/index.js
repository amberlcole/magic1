var app = {

    //Application Constructor
    initialize: function() {
		this.bindEvents();
    },
	
    // Bind Event Listeners
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
	
    // deviceready Event Handler
    onDeviceReady: function() {
		$("#page1").show();
		window.cbit = 0;
		window.sbit = 0;
		window.parkArray = [];
		window.typeArray = [];
		window.notTypeArray = [];
		window.itineraryArray = [];
		window.heightReq = "";
		window.lastQuery = "";
		window.replace = "--Swipe Again--";
		window.db = window.sqlitePlugin.openDatabase({name: 'events.db', 
												   createFromLocation: 1, 
												   iosDatabaseLocation: 'default'});
	}
	
};

app.initialize();
