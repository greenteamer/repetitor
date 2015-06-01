// Input (JSX):
define(['react', 'bootstrap'], function (React) {

    var Modal = React.createClass({
        pushContent: function (e) {
            e.preventDefault();
            // console.log(this.refs.input_ref);
            this.props.addPost(this.refs.input_ref.getDOMNode().value);
        },
        render: function () {
            return (
                <div className="my_modal">
    				<div id="complete-dialog" className="modal fade" tabIndex="-1">
                      <div className="modal-dialog">
                        <div className="modal-content">
                          <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-hidden="true">×</button>
                            <h4 className="modal-title">Dialog</h4>
                          </div>
                          <div className="modal-body">
                            <input ref="input_ref" id="input_content" type="text" className="form-control" placeholder="label" />
                          </div>
                          <div className="modal-footer">
                            <button className="btn btn-primary" data-dismiss="modal" >Dismiss</button>
                            <button className="btn btn-primary" onClick={this.pushContent} data-dismiss="modal">Save</button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <button id="test_btn" className="btn btn-primary btn-fab btn-raised mdi-content-add btn-add-new-post" href="" data-toggle="modal" data-target="#complete-dialog"></button>
           		</div>
            )
        }
    });

    return Modal;
});
