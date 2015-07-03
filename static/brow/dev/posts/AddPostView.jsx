var React = require('react');
var FlatButton = require('material-ui').FlatButton;
var Dialog = require('material-ui').Dialog;
var TextField = require('material-ui').TextField;
var ThemeManager = require('material-ui/lib/styles/theme-manager')();
var Colors = require('material-ui/lib/styles/colors');
var injectTapEventPlugin = require("react-tap-event-plugin");

var Modal = React.createClass({
    getInitialState: function () {
        return {
            modal: false  
        };
    },
    childContextTypes: {
        muiTheme: React.PropTypes.object
    },
    getChildContext: function() {        
        return {
            muiTheme: ThemeManager.getCurrentTheme()
        };
    },
    _showDialog: function () {
        this.refs.postDialog_ref.show();
    },
    _handlePostDialogSubmit: function (e) {
        e.preventDefault();
        this.props.addPost(this.refs.input_ref.getValue());
        this.refs.postDialog_ref.dismiss();
    },
    _handlePostDialogCancel: function  () {
        this.refs.postDialog_ref.dismiss();
    },
    render: function () {
        var postActions = [
          <FlatButton
            label="Закрыть"
            secondary={true}
            onClick={this._handlePostDialogCancel} />,
          <FlatButton
            label="Сохранить"
            primary={true}
            onClick={this._handlePostDialogSubmit} />
        ];
        var modalForm = [                   
          <TextField
            ref="input_ref"
            hintText="Текст поста"
            style={{width: '600px', margin: '0 auto'}}
            floatingLabelText="Введите текст Вашего поста"/>
        ];
        var modalPost = [
        <Dialog
          ref="postDialog_ref"
          title="Добавить новый пост"
          actions={postActions}
          modal={this.state.modal}>
          {modalForm}
        </Dialog>
        ]; 
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

                <button id="test_btn" className="btn btn-primary btn-fab btn-raised mdi-content-add btn-add-new-post" href="" onClick={this._showDialog}></button>
                {modalPost}
       		</div>
        )
    }
});

module.exports = Modal;
