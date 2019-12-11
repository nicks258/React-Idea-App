import React, { Component } from 'react';
import * as firebase from 'firebase';
import styled from 'styled-components';

const HoverText = styled.p`
	color: #000;
	:hover {
		color: #ed1212;
		cursor: pointer;
		
	}
	`;


export class Notes extends Component {
  constructor (props) {
    super(props);
      this.state = {
          hover: false
      }

  }
    toggleHover = () =>{
      console.log("Hello");
        this.setState({hover: !this.state.hover})
    };





  removeNote (id) {
    firebase.database().ref('notes').child(id).remove();
  }
  handleUpdate = (id) => firebase.database().ref('notes').child(id).update({note: 'edited'});
  handleHower = (id) => console.log("Hello Hower");

  render() {
      var linkStyle;
      const { hover } = this.state;
      if (this.state.hover) {
          linkStyle = {color: '#ed1212',cursor: 'pointer'}
      } else {
          linkStyle = {color: '#000'}
      }
      let EditableH1 = contentEditable('h3');
      let EditableP = contentEditable('p');
    return (

      <section className="notes-wrapper">
        <h3>Notes</h3>
        <div className="notes" >
          {this.props.notes.map(note => (
            <div className="note" key={note.id}>
              <div className="note-title" onMouseEnter={this.toggleHover} onMouseLeave={this.toggleHover}>
                <EditableH1 value = {note.title}  />
                  {hover === true ? (
                <div className="remove" onClick={() => this.removeNote(note.id)}>X</div>
                  ): null}
              </div>

              <div className="note-content">
                <EditableP value = {note.note}/>
              </div>
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



export default Notes;
