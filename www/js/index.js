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
		var db = window.sqlitePlugin.openDatabase({name: 'events.db', createFromLocation: 1, iosDatabaseLocation: 'default'});
		
		app.receivedEvent('deviceready');

	},
	
    // Update DOM on a Received Event
    receivedEvent: function(id) {
		console.log("here?");
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:none;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();
