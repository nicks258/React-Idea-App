import React, { Component } from 'react';
import * as firebase from 'firebase';
import { createPortal } from "react-dom";

export class Notes extends Component {
  constructor (props) {
    super(props);
      this.state = {
          showDialog: false
      };
      this._onChange = this._onChange.bind(this);
      this._onSubmit = this._onSubmit.bind(this);
  }



    _onChange(e) {
        let input = e.target.value;

        this.setState({ input });
    }

    _onSubmit(e) {
        // e.preventDefault();
        // let showDialog = false;
        //
        // // Dont Mutate the State!!!
        // let list = this.state.list.slice();
        //
        // list.push(this.state.input);
        //
        // this.setState({ showDialog, list, input: "" });
    }


  removeNote (id) {
    firebase.database().ref('notes').child(id).remove();
  }
  handleUpdate = (id) => firebase.database().ref('notes').child(id).update({note: 'edited'});

  render() {
      let EditableH1 = contentEditable('h3');
      let EditableP = contentEditable('p');
      const { showDialog} = this.state;
    return (
      <section className="notes-wrapper">
        <h3>Notes</h3>
        <div className="notes">
          {this.props.notes.map(note => (
            <div className="note" key={note.id}>
              <div className="note-title">
                <EditableH1 value = {note.title} />

                {/*<div className="remove" onClick={() => this.handleUpdate(note.id)}>x</div>*/}
              </div>
              <div className="note-content">
                <EditableP value = {note.note}/>
              </div>
                {showDialog === true ? (
                    <DialogModal>
                        <div className="dialog-wrapper">
                            <h1>New List Item</h1>
                            <form onSubmit={this._onSubmit}>
                                <input type="text" onChange={this._onChange} />
                            </form>
                        </div>
                    </DialogModal>
                ) : null}
            </div>
          ))}

        </div>
      </section>
    )
  }
}
function contentEditable(WrappedComponent)
{

    return class extends React.Component {

        state = {
            editing: false
        }

        toggleEdit = (e) => {
            e.stopPropagation();
            if (this.state.editing) {
                this.cancel();
            } else {
                this.edit();
            }
        };

        edit = () => {
            this.setState({
                editing: true
            }, () => {
                this.domElm.focus();
            });
        };

        save = () => {
            this.setState({
                editing: false
            }, () => {
                if (this.props.onSave && this.isValueChanged()) {
                    console.log('Value is changed', this.domElm.textContent);
                }
            });
        };

        cancel = () => {
            this.setState({
                editing: false
            });
        };

        isValueChanged = () => {
            return this.props.value !== this.domElm.textContent
        };

        handleKeyDown = (e) => {
            const { key } = e;
            switch (key) {
                case 'Enter':
                case 'Escape':
                    this.save();
                    break;
            }
        };

        render() {
            let editOnClick = true;
            const {editing} = this.state;
            if (this.props.editOnClick !== undefined) {
                editOnClick = this.props.editOnClick;
            }
            return (
                <WrappedComponent
                    className={editing ? 'editing' : ''}
                    onClick={editOnClick ? this.toggleEdit : undefined}
                    contentEditable={editing}
                    ref={(domNode) => {
                        this.domElm = domNode;
                    }}
                    onBlur={this.save}
                    onKeyDown={this.handleKeyDown}
                    {...this.props}
                >
                    {this.props.value}
                </WrappedComponent>
            )
        }
    }
}

class DialogModal extends Component {
    constructor() {
        super();
        this.body = document.getElementsByTagName("body")[0];
        this.el = document.createElement("div");
        this.el.id = "dialog-root";
    }

    componentDidMount() {
        this.body.appendChild(this.el);
    }

    componentWillUnmount() {
        this.body.removeChild(this.el);
    }

    render() {
        return createPortal(this.props.children, this.el);
    }
}


export default Notes;
