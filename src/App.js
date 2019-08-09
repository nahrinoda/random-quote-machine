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
      mainColor: "#d75faf",
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
            quoteAuthor: res.quotes[0].author
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
    this.randomColor();
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

    let chosenColor = colors[this.state.counter];

    this.setState({
      mainColor: chosenColor,
      counter: this.state.counter + 1
    });

    if (this.state.counter === colors.length) {
      this.setState({
        mainColor: this.state.mainColor,
        counter: 0
      });
    }

    if (this.state.counter > colors.length) {
      this.setState({
        mainColor: this.state.mainColor,
        counter: 0
      });
    }
  };

  render() {
    return (
      <div className="App" style={{ backgroundColor: this.state.mainColor }}>
        <div id="quote-box">
          <i id="text" style={{ color: this.state.mainColor }}>
            <i className="fas fa-quote-left" />
            {this.state.quoteText}
          </i>
          <p id="author" style={{ color: this.state.mainColor }}>
            {" "}
            - {this.state.quoteAuthor}
          </p>
          <div>
            <button
              id="new-quote"
              onClick={this.handleChange}
              style={{ backgroundColor: this.state.mainColor, color: "white" }}
            >
              New Qoute
            </button>
            <a
              href={`https://twitter.com/intent/tweet?text=" ${
                this.state.quoteText
              }" -- ${this.state.quoteAuthor}. `}
              target="_blank"
              title="Post this qoute on twitter!"
              rel="noopener noreferrer"
            >
              <button
                id="tweet-quote"
                style={{
                  backgroundColor: this.state.mainColor,
                  color: "white"
                }}
              >
                <i className="fab fa-twitter" />
              </button>
            </a>
          </div>
        </div>
        <i>
          <div id="my-name">Random Quote Machine by Nahrin Oda</div>
        </i>
      </div>
    );
  }
}

export default App;
