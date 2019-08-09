import React, { Component } from "react";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoaded: false,
      quotes: [],
      quoteText: "",
      quoteAuthor: "",
      mainColor: "",
      counter: 0
    };

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    fetch(
      "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json"
    )
      .then(res => res.json())
      .then(
        res => {
          this.setState({
            isLoaded: true,
            quotes: res.quotes,
            quoteText: res.quotes[0].quote,
            quoteAuthor: res.quotes[0].author,
            counter: this.state.counter + 1
          });
        },
        error => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  }

  handleChange() {
    this.randomQuote();
    // this.randomColor();
  }

  randomQuote = () => {
    let quoteArr = this.state.quotes;
    let randomeNum = Math.floor(Math.random() * quoteArr.length + 1);
    let newQuote = quoteArr[randomeNum];

    this.setState({
      quoteText: newQuote.quote,
      quoteAuthor: newQuote.author
    });
  };

  randomColor = () => {
    let colors = [
      "#af0000",
      "#af005f",
      "#af0087",
      "#af00af",
      "#af00d7",
      "#af00ff",
      "#d75f00",
      "#d75f5f",
      "#d75f87",
      "#d75faf",
      "#d75fd7",
      "#878700",
      "#875fd7",
      "#875faf",
      "#00d7af",
      "#00afaf",
      "#00af87",
      "#00af5f",
      "#008787"
    ];
  };

  render() {
    return (
      <div className="App">
        <div id="quote-box">
          <p id="text">{this.state.quoteText}</p>
          <p id="author"> - {this.state.quoteAuthor}</p>
          <div>
            <button id="new-quote" onClick={this.handleChange}>
              New Qoute
            </button>
            <button id="tweet-quote">Tweet</button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
