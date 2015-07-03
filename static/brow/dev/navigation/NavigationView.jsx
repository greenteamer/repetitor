var React = require('react');

var FlatButton = require('material-ui').FlatButton;
var Dialog = require('material-ui').Dialog;
var TextField = require('material-ui').TextField;
var ThemeManager = require('material-ui/lib/styles/theme-manager')();
var Colors = require('material-ui/lib/styles/colors');
var injectTapEventPlugin = require("react-tap-event-plugin");

var Auth = require('../auth/AuthView.jsx');
// var Registration = require('../auth/RegistrationView.jsx');
var AppActions = require('../auth/AppActions.js');


var Navigation = React.createClass({
	getInitialState: function () {
	    return {
	        modal: true  
	    };
	},
    displayName: 'Navigation',
    logoutUserButtonClick: function () {
        AppActions.logout();
    },
    childContextTypes: {
        muiTheme: React.PropTypes.object
    },
    getChildContext: function() {        
        return {
            muiTheme: ThemeManager.getCurrentTheme()
        };
    },

    _showLoginModal: function () {
    	this.refs.loginDialog.show();
    },    
    _handleLoginDialogCancel: function () {
    	this.refs.loginDialog.dismiss();
    },
    _handleLoginDialogSubmit: function (e) {
    	e.preventDefault();
        AppActions.login({
            email: this.refs.email_ref.getValue(),
            pass: this.refs.pass_ref.getValue()
        });
        this.refs.loginDialog.dismiss();
    },

    _showRegisterModal: function () {
    	this.refs.registerDialog.show();	
    },
    _handleRegisterDialogCancel: function () {
    	this.refs.registerDialog.dismiss();
    },
    _handleRegisterDialogSubmit: function (e) {
    	e.preventDefault();
        AppActions.registration({
            email: this.refs.reg_email_ref.getValue(),
            username: this.refs.reg_username_ref.getValue(),
            first_name: this.refs.reg_first_name_ref.getValue(),
            last_name: this.refs.reg_last_name_ref.getValue(),
            tagline: this.refs.reg_tagline_ref.getValue(),
            password: this.refs.reg_pass_ref.getValue(),
            confirm_password: this.refs.reg_confirm_pass_ref.getValue()
        });
        this.refs.registerDialog.dismiss();
    },

    render: function () {
        if (this.props.user.username !== 'Незарегистрированный') {
            return (
                <nav id="top-menu" className="navbar navbar-default" role="navigation">
				  	<div className="container-fluid">
					   	<div className="navbar-header">
					      	<button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#not-google-plus-nav">
						        <span className="sr-only">Toggle Navigation</span>
						        <span className="icon-bar"></span>
						        <span className="icon-bar"></span>
						        <span className="icon-bar"></span>
					      	</button>
					      	<a className="navbar-brand" href="/">Репетитор</a>
					    </div>

					    <div className="collapse navbar-collapse" id="not-google-plus-nav">
					      	<ul className="nav navbar-nav pull-right">
					          	<li><a href="/+current_user">{this.props.user.username}</a></li>
					          	<li><a href="/+current_user/settings">Настройки</a></li>
                                <li><a href='javascript:void(0)' onClick={this.logoutUserButtonClick}>Выйти</a></li>
					      	</ul>
					    </div>
			 		</div>
				</nav>
            )
        } else {
        	var loginActions = [
				  <FlatButton
				    label="Закрыть"				    
				    secondary={true}
				    onClick={this._handleLoginDialogCancel} />,
				  <FlatButton
				    label="Войти"
				    primary={true}
				    onClick={this._handleLoginDialogSubmit} />
				];
			var registerActions = [
				  <FlatButton
				    label="Закрыть"
				    secondary={true}
				    onClick={this._handleRegisterDialogCancel} />,
				  <FlatButton
				    label="Войти"
				    primary={true}
				    onClick={this._handleRegisterDialogSubmit} />
				];
			var modalForm = [										
					<TextField
					  ref="email_ref"
					  hintText="Ваш логин"
					  style={{width: '600px', margin: '0 auto'}}
					  floatingLabelText="Ваш логин - это Ваша почта"/>,
					<TextField
					  ref="pass_ref"
					  hintText="Ваш пароль"
					  style={{width: '600px', margin: '0 auto'}}
					  floatingLabelText="Введите Ваш пароль"/>
				];			
			var registerForm = [
					<TextField
					  ref="reg_email_ref"
					  hintText="Почта"
					  style={{width: '600px', margin: '0 auto'}}
					  floatingLabelText="Ваш логин - это Ваша почта"/>,
				  	<TextField
					  ref="reg_username_ref"
					  hintText="Имя в системе"
					  style={{width: '600px', margin: '0 auto'}}
					  floatingLabelText="Это имя будут видеть другие пользователи"/>,
					<TextField
					  ref="reg_first_name_ref"
					  hintText="Ваше имя"
					  style={{width: '600px', margin: '0 auto'}}
					  floatingLabelText="Введите Ваше Имя"/>,
					<TextField
					  ref="reg_last_name_ref"
					  hintText="Ваша фамилия"
					  style={{width: '600px', margin: '0 auto'}}
					  floatingLabelText="Введите Вашу фамилию"/>,
					<TextField
					  ref="reg_tagline_ref"
					  hintText="Ваш статус"
					  style={{width: '600px', margin: '0 auto'}}
					  floatingLabelText="Статус вводить не обязательно"/>,		
					<TextField
					  ref="reg_pass_ref"
					  hintText="Ваш пароль"
					  type="password"
					  style={{width: '600px', margin: '0 auto'}}
					  floatingLabelText="Введите Ваш пароль"/>,
					<TextField
					  ref="reg_confirm_pass_ref"
					  hintText="Повторите пароль"
					  type="password"
					  style={{width: '600px', margin: '0 auto'}}
					  floatingLabelText="Введите пароль еще раз"/>
				];
			var modalLogin = [
				<Dialog
                  ref="loginDialog"
				  title="Авторизация"
				  actions={loginActions}
				  modal={this.state.modal}>
				  {modalForm}
				</Dialog>	
				];
			var modalRegister = [
				<Dialog
					ref="registerDialog"
					title="Регистрация"
					actions={registerActions}
					modal={this.state.modal}>
					{registerForm}
				</Dialog>
				];	
            return (				
                <nav id="top-menu" className="navbar navbar-default" role="navigation">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#not-google-plus-nav">
                                <span className="sr-only">Toggle Navigation</span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </button>
                            <a className="navbar-brand" href="/">Репетитор</a>
                        </div>

                        <div className="collapse navbar-collapse" id="not-google-plus-nav">
                            <ul className="nav navbar-nav pull-right">
                                <li><a href="#">{this.props.user.username}</a></li>
                                <li><a id="register_button" href="javascript:void(0)" onClick={this._showRegisterModal}>Зарегистрироваться</a></li>
                                <li>
                                    <a id="login_button" className="" href="javascript:void(0)" onClick={this._showLoginModal}>Войти</a>
                                </li>                                
                                <li><Auth/></li>                                
                                {modalLogin}
                                {modalRegister}
                            </ul>
                        </div>
                    </div>
				</nav>
            )
        }
    }
});


module.exports = Navigation;