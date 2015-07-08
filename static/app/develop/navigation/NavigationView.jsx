// Input (JSX):
define(['react', 'Auth', 'Registration', 'AppActions'], function (React, Auth, Registration, AppActions) {

    var Navigation = React.createClass({
        displayName: 'Navigation',
        logoutUserButtonClick: function () {
            AppActions.logout();
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
                                    <li><a href="" data-toggle="modal" data-target="#registration-dialog">Зарегистрироваться</a></li>
                                    <li>
                                        <a id="login_button" className="" href="" data-toggle="modal" data-target="#login-dialog">Войти</a>
                                    </li>
                                    <li><Auth/></li>
                                    <li><Registration/></li>
                                </ul>
                            </div>
                        </div>
    				</nav>
                )
            }
        }
    });

    return Navigation;
});
