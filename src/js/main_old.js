import React from "react";
import ReactDOM from "react-dom";
import { OpenAll, SaveAll } from "./components/Buttons";

class App extends React.Component {
  handleClick() {
    const radioButtons = document.querySelectorAll('input[value="passed"]');
    for (let i = 0; i < radioButtons.length; i++) {
      radioButtons[i].click();
    }
    console.log(radioButtons);
  }
  render() {
    return (
      <div>
        <OpenAll onClick={() => this.handleClick()} />
      </div>
    );
  }
}

// Message Listener function
chrome.runtime.onMessage.addListener((request, sender, response) => {
  // If message is injectApp
  if (request.injectApp) {
    // Inject our app to DOM and send response
    injectApp();
    response({
      startedExtension: true
    });
  }
});

function injectApp() {
  const newDiv = document.createElement("div");
  newDiv.setAttribute("id", "udex");
  document.body.prepend(newDiv);
  ReactDOM.render(<App />, newDiv);
}