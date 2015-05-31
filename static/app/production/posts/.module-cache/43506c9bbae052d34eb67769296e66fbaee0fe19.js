// Input (JSX):
define(['react', 'jquery', 'bootstrap'], function (React) {

    var Modal = React.createClass({displayName: "Modal",
        pushContent: function (e) {
            e.preventDefault();
            console.log(this.refs.input_ref);
            // this.props.addPost(this.input.getDOMNode().value);
        },
        render: function () {
            return (
                React.createElement("div", {className: "my_modal"}, 
    				React.createElement("div", {id: "complete-dialog", className: "modal fade", tabIndex: "-1"}, 
                      React.createElement("div", {className: "modal-dialog"}, 
                        React.createElement("div", {className: "modal-content"}, 
                          React.createElement("div", {className: "modal-header"}, 
                            React.createElement("button", {type: "button", className: "close", "data-dismiss": "modal", "aria-hidden": "true"}, "×"), 
                            React.createElement("h4", {className: "modal-title"}, "Dialog")
                          ), 
                          React.createElement("div", {className: "modal-body"}, 
                            React.createElement("input", {ref: "input_ref", id: "input_content", type: "text", className: "form-control", placeholder: "label"})
                          ), 
                          React.createElement("div", {className: "modal-footer"}, 
                            React.createElement("button", {className: "btn btn-primary", "data-dismiss": "modal"}, "Dismiss"), 
                            React.createElement("button", {className: "btn btn-primary", onClick: this.pushContent, "data-dismiss": "modal"}, "Save")
                          )
                        )
                      )
                    ), 

                    React.createElement("button", {id: "test_btn", className: "btn btn-primary btn-fab btn-raised mdi-content-add btn-add-new-post", href: "", "data-toggle": "modal", "data-target": "#complete-dialog"})
           		)
            )
        }
    });

    return Modal;
});
