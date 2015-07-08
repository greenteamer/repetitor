define(['react', 'AppActions', 'bootstrap'], function(React, AppActions){


    var Auth = React.createClass({displayName: "Auth",
        pushFormUser: function (e) {
            e.preventDefault();
            AppActions.login({
                email: this.refs.email_ref.getDOMNode().value,
                pass: this.refs.pass_ref.getDOMNode().value
            });
        },
        render: function () {
           return (
               React.createElement("div", {id: "login-dialog", className: "modal fade", tabIndex: "-1"}, 
                 React.createElement("div", {className: "modal-dialog"}, 
                   React.createElement("div", {className: "modal-content"}, 
                     React.createElement("div", {className: "modal-header"}, 
                       React.createElement("button", {type: "button", className: "close", "data-dismiss": "modal", "aria-hidden": "true"}, "×"), 
                       React.createElement("h4", {className: "modal-title"}, "Авторизация")
                     ), 
                     React.createElement("div", {className: "modal-body"}, 
                       React.createElement("input", {ref: "email_ref", id: "input_content", type: "email", className: "form-control", placeholder: "Введите email"}), 
                       React.createElement("input", {ref: "pass_ref", id: "input_content", type: "password", className: "form-control", placeholder: "введите пароль"})
                     ), 
                     React.createElement("div", {className: "modal-footer"}, 
                       React.createElement("button", {className: "btn btn-primary", "data-dismiss": "modal"}, "Закрыть"), 
                       React.createElement("button", {className: "btn btn-primary", onClick: this.pushFormUser, "data-dismiss": "modal"}, "Войти")
                     )
                   )
                 )
               )
           )
        }
    });
    return Auth;
});