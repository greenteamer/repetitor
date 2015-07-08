define ['react', 'jquery', 'bootstrap'], (React) ->

	Modal = React.createClass
		pushContent: (e)->
			e.preventDefault()
			@props.addPost(@refs.input.getDOMNode().value)
		render: ->
			<div className="my_modal">	
				<div id="complete-dialog" className="modal fade" tabIndex="-1">
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="modal-header">
                        <button type="button" className="close" data-dismiss="modal" aria-hidden="true">×</button>
                        <h4 className="modal-title">Dialog</h4>
                      </div>
                      <div className="modal-body">
                        <input ref="input" id="input_content" type="text" className="form-control" placeholder="label" />
                      </div>
                      <div className="modal-footer">
                        <button className="btn btn-primary" data-dismiss="modal" >Dismiss</button>
                        <button className="btn btn-primary" onClick={@pushContent} data-dismiss="modal">Save</button>
                      </div>
                    </div>	
                  </div>
                </div>

                <button id="test_btn" className="btn btn-primary btn-fab btn-raised mdi-content-add btn-add-new-post" href="" data-toggle="modal" data-target="#complete-dialog"></button> 
       		</div>

	return Modal