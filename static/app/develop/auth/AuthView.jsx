// Auth module
define(['react', 'AppActions', 'bootstrap'], function(React, AppActions){


    var Auth = React.createClass({
        pushFormUser: function (e) {
            e.preventDefault();
            AppActions.login({
                email: this.refs.email_ref.getDOMNode().value,
                pass: this.refs.pass_ref.getDOMNode().value
            });
        },
        render: function () {
           return (
               <div id="login-dialog" className="modal fade" tabIndex="-1">
                 <div className="modal-dialog">
                   <div className="modal-content">
                     <div className="modal-header">
                       <button type="button" className="close" data-dismiss="modal" aria-hidden="true">×</button>
                       <h4 className="modal-title">Авторизация</h4>
                     </div>
                     <div className="modal-body">
                       <input ref="email_ref" id="input_content" type="email" className="form-control" placeholder="Введите email" />
                       <input ref="pass_ref" id="input_content" type="password" className="form-control" placeholder="введите пароль" />
                     </div>
                     <div className="modal-footer">
                       <button className="btn btn-primary" data-dismiss="modal" >Закрыть</button>
                       <button className="btn btn-primary" onClick={this.pushFormUser} data-dismiss="modal">Войти</button>
                     </div>
                   </div>
                 </div>
               </div>
           )
        }
    });
    return Auth;
});
