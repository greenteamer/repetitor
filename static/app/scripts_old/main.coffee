require.config
	waitSeconds: 200
	paths:
		"jquery" : "vendor/jquery/dist/jquery",
		"cookie" : "vendor/jquery/dist/jquery.cookie",
		"react" : "vendor/react/react",
		"addons" : "vendor/react/react-with-addons",
		"bootstrap" : "vendor/bootstrap/dist/js/bootstrap",
		"material" :
			"material": "vendor/bootstrap-material-design/dist/js/material",
			"ripples": "vendor/bootstrap-material-design/dist/js/ripples",
		"AppView": "views/app"
		"Navigation": "views/navigation",
		"AddPost": "views/addPostView",
	shim :
    	"bootstrap": 
    		"deps": ['jquery']     
		
		

require ['AppView', 'Navigation', 'AddPost'],
	(AppView) ->
		appView = new AppView
		return

