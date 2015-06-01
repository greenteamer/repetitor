// Auth module
define(['react', 'AppActions', 'bootstrap'], function(React, AppActions){


    var Registration = React.createClass({
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
               <div id="registration-dialog" className="modal fade" tabIndex="-1">
                 <div className="modal-dialog">
                   <div className="modal-content">
                     <div className="modal-header">
                       <button type="button" className="close" data-dismiss="modal" aria-hidden="true">×</button>
                       <h4 className="modal-title">Авторизация</h4>
                     </div>
                     <div className="modal-body">
                       <input ref="email_ref" id="input_content" type="email" className="form-control" placeholder="Введите email" />
                       <input ref="username_ref" id="input_content" type="username" className="form-control" placeholder="Введите имя пользователя" />
                       <input ref="first_name_ref" id="input_content" type="text" className="form-control" placeholder="Ваше реальное Имя" />
                       <input ref="last_name_ref" id="input_content" type="text" className="form-control" placeholder="Ваша реальная Фамилия" />
                       <input ref="tagline_ref" id="input_content" type="text" className="form-control" placeholder="Ваш статус(не обязательно)" />
                       <input ref="pass_ref" id="input_content" type="password" className="form-control" placeholder="введите пароль" />
                       <input ref="confirm_password_ref" id="input_content" type="password" className="form-control" placeholder="повторите пароль" />
                 </div>
                     <div className="modal-footer">
                       <button className="btn btn-primary" data-dismiss="modal" >Закрыть</button>
                       <button className="btn btn-primary" onClick={this.pushFormRegisration} data-dismiss="modal">Зарегистрироваться</button>
                     </div>
                   </div>
                 </div>
               </div>
           )
        }
    });
    return Registration;
});
