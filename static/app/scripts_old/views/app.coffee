define ['react', 'Navigation', 'AddPost', 'jquery', 'cookie', 'bootstrap', ], (React, Navigation, AddPost) ->
	collection = []
	current_user = {}
	console.log('start App')


	Post = React.createClass

		actionChangeContent: (e)->
			e.preventDefault()
			get_current_text = React.findDOMNode(@refs.content).innerHTML
			console.log(@props.model.author.username)

		render: ->
			if @props.popover == "hide"
				<div className="col-xs-12 col-sm-6 col-md-4 col-lg-3">
	                <div className="well" onClick={@actionChangeContent}>
	                    <h3>{@props.model.author.username}</h3>
	                    <p ref="content">{@props.children}</p>
	                </div>
	                <div className={@props.popover + " popover fade left in"}>
					<div className="arrow"></div>
					<h3 className="popover-title">A Title</h3>
					<div className="popover-content">And here's some amazing content. It's very engaging. right?</div>
					</div>
	            </div>
			else
				<div className="col-xs-12 col-sm-6 col-md-4 col-lg-3">
	                <div className="well" onClick={@actionChangeContent}>
	                    <h3>{@props.model.author.username}</h3>
	                    <p ref="content">{@props.children}</p>
	                </div>
	            </div>



	PostList = React.createClass
		render: ->

			items = @props.collection.map (model, index) ->
				<Post model={model} popover={"hide"}>
		   			{model.content}
			   	</Post>
			<div className="row">
            	{items}
			</div>



	App = React.createClass

		getInitialState: ->
			# задаем начальное состояние для коллекции и
			# пользователя
			collection: [], user: {}, selectedIndex: 0

		componentDidMount: ->
			$.ajax
				url: 'api/v1/auth/current-user/'
				cache: false
				success: ( (data) ->
					@setState user: data
					current_user = @state.user
					return).bind(@)

				error: ((xhr, status, err) ->
					console.log('error fetching current user')
					return).bind(@)
			$.ajax
				url: '/api/v1/posts/'
				dataType: 'json'
				cache: false
				success: ( (data) ->
					@setState collection: data
					return).bind(@)

				error: ( (xhr, status, err) ->
					console.log('error fetchin collection')
					return).bind(@)
			return

		pushData: (data) ->
			@state.collection.push
				content: data.content
				author:
					username: @state.user.username
			@setState collection: @state.collection
			return

		addPost: (content) ->
			csrftoken = $.cookie('csrftoken')
			new_text = content
			#new_text = "new text new text2"
			$.ajax
				url: '/api/v1/posts/'
				method: 'POST'
				headers:
					"X-CSRFToken": csrftoken

				csrfmiddlewaretoken: csrftoken
				data:
					content : new_text

				success: ((data)->
					@pushData(data)
					return).bind(@)

				error: (->
					console.log('error by adding post')
					return).bind(@)
			return

		render: ->
			<div className="app_container">
				<Navigation user={@state.user}/>
			<div className="container-fluid test-class">
				<div className="row">
					<div className="col-xs-12 col-md-3">
					</div>
					<div className="col-xs-12 col-md-9" >
						<PostList collection={@state.collection}/>
					</div>
				</div>
			</div>
                <AddPost addPost={@addPost}/>
            </div>




	React.render <App/>, document.getElementById('app')

	return App
