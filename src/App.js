import React, { Component } from 'react';
import './App.css';
import DropDown from './DropDown';
import InputTextBox from './InputTextBox';
import SubmitButton from './SubmitButton';

class App extends Component {
  constructor(){
    super();
    this.state = {
      text: "",
      translatedText: ""
    }
  }

  handleInputChange = (e) => {
   this.setState({text: e.target.value});
}
  handleHighlight = (e) => {
    let highlightText = window.getSelection();
   this.setState({text: highlightText.toString()});
}

  handleSubmit = (e) => {
    // debugger;
    e.preventDefault();
    let translationType = e.target[0].value;
    let text = e.target[1].value;
    let url = `https://api.funtranslations.com/translate/${translationType}.json`

    console.log('hi', text, url)

    fetch(url)
      .then((response)=>{
        let data = response.json();
        return data;
      }).then((data)=>{
        console.log(data)
      })
  }

  render() {
    return (
      <div className="App">
        <header>
          <h1>Weird Translations</h1>
        </header>

        <div className="Tabs">
          <div className="Tab">
            <a className="active" href="#">Original text</a>
          </div>
          <div className="Tab">
            <a className="inactive"
              href="#">Translation</a>
          </div>
        </div>

        <form onSubmit={this.handleSubmit}>
          <DropDown />
          <div className="textarea">
          <textarea
            value={this.state.highlighted || this.state.text}
            onChange={this.handleInputChange}
            onFocus={this.handleHighlight}
            placeholder="Type or highlight text to translate.."
            type="text">
          </textarea>
        </div>
          <input type="submit" value="translate" />
        </form>

        <div className="footer">
          <a href="https://sol-jin.com">Contact me</a>
        </div>
      </div>
    );
  }
}

export default App;
