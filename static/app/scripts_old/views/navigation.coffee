define ['react',], (React) ->

	Navigation = React.createClass
		displayName: 'Navigation'
		render: ->			
			if @props.user			
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
					          	<li><a href="/+current_user">{@props.user.username}</a></li>
					          	<li><a href="/+current_user/settings">Настройки</a></li>
					          	<li><a href="javascript:void(0)" id="logout_btn">Выйти</a></li>
					      	</ul>
					    </div>
			 		</div>
				</nav>
			else
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
					          	<li><a href="/+current_user">не юзер</a></li>
					          	<li><a href="/+current_user/settings">Настройки</a></li>
					          	<li><a href="javascript:void(0)" id="logout_btn">Выйти</a></li>
					      	</ul>
					    </div>
			 		</div>
				</nav>			
			

	#React.render <Navigation/>, document.getElementById('navigation')	
	#console.log('render Navigation')

	return Navigation
	#return console.log('return navigation')
