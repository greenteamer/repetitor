// Input (JSX):
define(['react', 'Auth'], function (React, Auth) {

    var Navigation = React.createClass({
        displayName: 'Navigation',
        render: function () {
            if (this.props.user) {
                return (
                    React.createElement("nav", {id: "top-menu", className: "navbar navbar-default", role: "navigation"}, 
    				  	React.createElement("div", {className: "container-fluid"}, 
    					   	React.createElement("div", {className: "navbar-header"}, 
    					      	React.createElement("button", {type: "button", className: "navbar-toggle collapsed", "data-toggle": "collapse", "data-target": "#not-google-plus-nav"}, 
    						        React.createElement("span", {className: "sr-only"}, "Toggle Navigation"), 
    						        React.createElement("span", {className: "icon-bar"}), 
    						        React.createElement("span", {className: "icon-bar"}), 
    						        React.createElement("span", {className: "icon-bar"})
    					      	), 
    					      	React.createElement("a", {className: "navbar-brand", href: "/"}, "Репетитор")
    					    ), 

    					    React.createElement("div", {className: "collapse navbar-collapse", id: "not-google-plus-nav"}, 
    					      	React.createElement("ul", {className: "nav navbar-nav pull-right"}, 
    					          	React.createElement("li", null, React.createElement("a", {href: "/+current_user"}, this.props.user.username)), 
    					          	React.createElement("li", null, React.createElement("a", {href: "/+current_user/settings"}, "Настройки")), 
    					          	React.createElement("li", null, React.createElement(Auth, null))
    					      	)
    					    )
    			 		)
    				)
                )
            } else {
                return (
                    React.createElement("nav", {id: "top-menu", className: "navbar navbar-default", role: "navigation"}, 
                        React.createElement("div", {className: "container-fluid"}, 
                            React.createElement("div", {className: "navbar-header"}, 
                                React.createElement("button", {type: "button", className: "navbar-toggle collapsed", "data-toggle": "collapse", "data-target": "#not-google-plus-nav"}, 
                                    React.createElement("span", {className: "sr-only"}, "Toggle Navigation"), 
                                    React.createElement("span", {className: "icon-bar"}), 
                                    React.createElement("span", {className: "icon-bar"}), 
                                    React.createElement("span", {className: "icon-bar"})
                                ), 
                                React.createElement("a", {className: "navbar-brand", href: "/"}, "Репетитор"), 
                                React.createElement(Auth, null)

                            ), 

                            React.createElement("div", {className: "collapse navbar-collapse", id: "not-google-plus-nav"}, 
                                React.createElement("ul", {className: "nav navbar-nav pull-right"}, 
                                    React.createElement("li", null, React.createElement("a", {href: "/+current_user"}, "не юзер")), 
                                    React.createElement("li", null, React.createElement("a", {href: "/+current_user/settings"}, "Настройки")), 
                                    React.createElement("li", null, React.createElement("a", {href: "javascript:void(0)", id: "logout_btn"}, "Выйти"))
                                )
                            )
                        )
    				)
                )
            }
        }
    });

    return Navigation;
});
