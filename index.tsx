import React from "react";
import { renderToString } from "react-dom/server";
import styled, { ServerStyleSheet } from "styled-components";

const Test = styled.div`
  display: flex;
`;

const Test2 = styled.div`
  display: block;
`;

const Button = styled.button`
  color: blue;

  > span {
    color: red;
  }
`;

const App1 = () => (
  <Test>
    <Button>buttonText</Button>
  </Test>
);
App1.displayName = "App1";

const App2 = () => (
  <Test2>
    <Button>buttonText</Button>
  </Test2>
);
App2.displayName = "App2";

const App3 = () => (
  <React.Fragment>
    <App1/>
    <App2/>
  </React.Fragment>
);
App2.displayName = "App3";

function run(App: React.FC) {
  const sheet = new ServerStyleSheet();
  try {
    const html = renderToString(sheet.collectStyles(<App />));
    const styleTags = sheet.getStyleTags();

    console.log(`${App.displayName} html ----------------------`);
    console.log(html);
    console.log(`${App.displayName} styleTags ----------------------`);
    console.log(styleTags);
    console.log(`${App.displayName} ----------------------`);
  } catch (error) {
    console.error(error);
  } finally {
    sheet.seal();
  }
}

run(App1);
run(App2);
run(App3);
