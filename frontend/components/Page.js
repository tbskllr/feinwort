import React, { Component } from "react";
import styled, { ThemeProvider, createGlobalStyle } from "styled-components";
import Header from "../components/Header";
import Meta from "../components/Meta";

const theme = {
  red: "#FF0000",
  black: "#393939",
  grey: "#3A3A3A",
  lightGrey: "#E1E1E1",
  offWhite: "#EDEDED",
  bs: "0 12px 24px 0 rgba(0, 0, 0, 0.09)"
};

const StyledPage = styled.div`
  /* @font-face {
    font-family: "My Underwood";
    src: url("/static/MyUnderwood.ttf") format("truetype");
  } */
  background-image: linear-gradient(white, whitesmoke);
  font-family: -apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;
  color: black;
  html {
    margin: 0;
    width: 100%;
    overflow-x: hidden;
    box-sizing: border-box;
    font-size: 5px;
  }
  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }
  body {
    width: 100%;
    overflow-x: hidden;
    font-family: "My Underwood";
    padding: 0;
    margin: 0;
    font-size: 0.5rem;
    line-height: 1;
  }
  button,
  a {
    text-decoration: none;
    color: ${theme.black};
  }
`;

const Inner = styled.div`
  @font-face {
    font-family: "My Underwood";
    src: url("/static/MyUnderwood.ttf") format("truetype");
  }
  overflow-x: hidden;
  padding: 2rem;
  background-image: linear-gradient(white, whitesmoke);
  min-height: 1000px;
  height: 100%;
  html {
    overflow-x: hidden;
    height: 100%;
    min-height: 100%;
    font-size: 5px;
  }
  body {
    overflow-x: hidden;
    font-family: "My Underwood";
    padding: 0;
    margin: 0;
    font-size: 1.5rem;
    line-height: 1;
  }
  a,
  button {
    text-decoration: none;
    color: ${theme.black};
  }
`;

const GlobalStyle = createGlobalStyle`
 @font-face {
    font-family: 'My Underwood';
    src: url('/static/MyUnderwood.ttf') format('truetype');
    }
 html{
   overflow-x: hidden;
   box-sizing: border-box;
   font-size: 5px;
 }
 *, *:before, *:after {
   box-sizing: inherit;
 }
 body {
   overflow-x: hidden;
   font-family: 'My Underwood';
   padding: 0;
   margin: 0;
   font-size: 1.5rem;
   line-height: 1;   
 }
 a, button {
   text-decoration: none;
   color: ${theme.black};
 }
`;

class Page extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <StyledPage>
          <Meta />
          <Header />
          <Inner>{this.props.children}</Inner>
        </StyledPage>
      </ThemeProvider>
    );
  }
}

export default Page;
