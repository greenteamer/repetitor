var React = require('react');

var App = require('./dev/posts/App.jsx');
var injectTapEventPlugin = require("react-tap-event-plugin");

injectTapEventPlugin();

React.render(	
	React.createElement(App, null),
	document.getElementById('app')
);