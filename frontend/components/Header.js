import Nav from "./Nav";
import Link from "next/link";
import styled, { createGlobalStyle } from "styled-components";
import Router from "next/router";
import NProgress from "nprogress";
import Search from "./Search";

Router.events.on("routeChangeStart", () => {
  NProgress.start();
});

Router.events.on("routeChangeComplete", () => {
  NProgress.done();
});

Router.events.on("routeChangeError", () => {
  NProgress.done();
});

const Typewriter = styled.h1`
  font-size: 6rem;
  font-weight: 100;
  display: inline-block;
  height: 50%;
  line-height: 50%;
  @media (max-width: 400px) {
    margin: 0;
    font-size: 2rem;
    text-align: center;
    padding: 2px;
  }
`;

const Logo = styled.h1`
  font-family: "My Underwood";
  font-size: 4rem;
  font-style: normal;
  margin-left: 2rem;
  z-index: 1;
  position: relative;
  /*transform: skew(-7deg);*/
  a {
    padding: 2rem 1rem;
    background: ${props => props.theme.white};
    text-decoration: none;
  }
  @media (max-width: 2000px) {
    margin: 0;
    font-size: 2rem;
    text-align: center;
  }
  @media (max-width: 400px) {
    margin: 20px;
    font-size: 1rem;
    text-align: center;
  }
`;

const StyledHeader = styled.header`
  .bar {
    margin: 0;
    overflow-x: hidden;
    overflow-y: hidden;
    width: 100%;
    border-bottom: 3px solid ${props => props.theme.black};
    display: grid;
    grid-template-columns: auto 1fr;
    justify-content: space-between;
    align-items: stretch;
    @media (max-width: 1300px) {
      grid-template-columns: 1fr;
      justify-content: center;
    }
  }
`;

const Header = () => (
  <StyledHeader>
    <div className="bar">
      <Logo>
        <Link href="/">
          <a>
            <Typewriter>|</Typewriter>feinwort.
          </a>
        </Link>
      </Logo>
      <Nav />
    </div>
    <div>
      <Search />
    </div>
  </StyledHeader>
);

export default Header;
