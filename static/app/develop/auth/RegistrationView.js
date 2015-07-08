define(['react', 'AppActions', 'bootstrap'], function(React, AppActions){


    var Registration = React.createClass({displayName: "Registration",
        pushFormRegisration: function (e) {
            e.preventDefault();
            AppActions.registration({
                email: this.refs.email_ref.getDOMNode().value,
                username: this.refs.username_ref.getDOMNode().value,
                first_name: this.refs.first_name_ref.getDOMNode().value,
                last_name: this.refs.last_name_ref.getDOMNode().value,
                tagline: this.refs.tagline_ref.getDOMNode().value,
                password: this.refs.pass_ref.getDOMNode().value,
                confirm_password: this.refs.confirm_password_ref.getDOMNode().value
            });
        },
        render: function () {
           return (
               React.createElement("div", {id: "registration-dialog", className: "modal fade", tabIndex: "-1"}, 
                 React.createElement("div", {className: "modal-dialog"}, 
                   React.createElement("div", {className: "modal-content"}, 
                     React.createElement("div", {className: "modal-header"}, 
                       React.createElement("button", {type: "button", className: "close", "data-dismiss": "modal", "aria-hidden": "true"}, "×"), 
                       React.createElement("h4", {className: "modal-title"}, "Авторизация")
                     ), 
                     React.createElement("div", {className: "modal-body"}, 
                       React.createElement("input", {ref: "email_ref", id: "input_content", type: "email", className: "form-control", placeholder: "Введите email"}), 
                       React.createElement("input", {ref: "username_ref", id: "input_content", type: "username", className: "form-control", placeholder: "Введите имя пользователя"}), 
                       React.createElement("input", {ref: "first_name_ref", id: "input_content", type: "text", className: "form-control", placeholder: "Ваше реальное Имя"}), 
                       React.createElement("input", {ref: "last_name_ref", id: "input_content", type: "text", className: "form-control", placeholder: "Ваша реальная Фамилия"}), 
                       React.createElement("input", {ref: "tagline_ref", id: "input_content", type: "text", className: "form-control", placeholder: "Ваш статус(не обязательно)"}), 
                       React.createElement("input", {ref: "pass_ref", id: "input_content", type: "password", className: "form-control", placeholder: "введите пароль"}), 
                       React.createElement("input", {ref: "confirm_password_ref", id: "input_content", type: "password", className: "form-control", placeholder: "повторите пароль"})
                 ), 
                     React.createElement("div", {className: "modal-footer"}, 
                       React.createElement("button", {className: "btn btn-primary", "data-dismiss": "modal"}, "Закрыть"), 
                       React.createElement("button", {className: "btn btn-primary", onClick: this.pushFormRegisration, "data-dismiss": "modal"}, "Зарегистрироваться")
                     )
                   )
                 )
               )
           )
        }
    });
    return Registration;
});