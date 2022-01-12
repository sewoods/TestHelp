var olympusgui;

// register listener to DOM load event
// this function will be always called when whole page content is loaded
window.addEventListener('load', function() {
	var socket = new WebSocket("ws://localhost:12345");
    socket.onclose = function() {
        console.error("web channel closed");
    };

    socket.onerror = function(error) {
        console.error("web channel error: " + error);
    };

    socket.onopen = function() {
        new QWebChannel(socket, function(channel) {
            olympusgui = channel.objects.olympusgui;
			
			// A property of the GUI visible to HTML
            var visibleProperty = olympusgui.someProperty;
			
			// Get all input buttons
            var buttons = document.getElementsByTagName("input");
            var totalButton = buttons.length;

     		for (var i = 0; i < totalButton; i++) {
                // register event listener to every input button's click event
		        buttons[i].addEventListener('click', function(event) {
                olympusgui.sendCommand(this.id); // when clicked button pass its id to UI
				});
			}						
			
			// Receive a message from the Gui. (Doesn't do anything right now)
            olympusgui.someSignal.connect(function(textFromGui) {});
			
			// Send message on load that connected
            olympusgui.sendCommand("Client connected, ready to receive messages!");
        });
    };					
})
