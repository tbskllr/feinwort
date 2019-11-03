// no need to import React - next.js takes care of it
// next/link transforms links to html5 pushstate:
// -> route from one page to another without refresh

import Link from "next/link";
import styled from "styled-components";
import LoginStyles from "../components/styles/LoginStyles";
import Items from "../components/Items";

const StyledIndex = styled.div`
  img {
    width: 25%;
    height: auto;
    position: relative;
    float: bottom;
  }
  @media (max-width: 400px) {
    img {
      width: 60%;
      height: auto;
    }
  }
  p {
    display: flex;
    width: 100%;
  }
  div {
    width: 100%;
  }
`;

const Home = props => (
  <StyledIndex>
    <div>
      <img src="/static/Susanne_Keller.jpeg" />
      <h3>Übersetzungen </h3>
      <p>
        Seit meinem Diplom in Angewandter Sprachwissenschaft an der
        Johannes-Gutenberg Universität Mainz für die Sprachen Spanisch und
        Englisch im Jahr 1986 übersetze ich Sachbücher, Belletristik,
        juristische und andere Fachtexte. Als öffentlich bestellte und beeidigte
        Übersetzerin beglaubige ich Übersetzungen ins Spanische und aus dem
        Spanischen.
      </p>
      <h3>Translation/Proofreading </h3>
      <p>
        I received my diploma as a law translator from Johannes Gutenberg
        University of Mainz in 1986 and since then have been working with all
        different kinds of texts: legal and scientific, fictional and
        non-fictional. Benefit from quality resulting from many years of wide
        experience. Please contact me for translations, editing and proofreading
        in German, English or Spanish.
      </p>
      <h3>Traducciones certificadas </h3>
      <p>
        Traductora jurada desde 1986 (con diploma de traductora para español e
        inglés de la Universidad Johannes Gutenberg de Maguncia), me dedico a la
        traducción de textos jurídicos, científicos, técnicos y literarios.
        Certifico traducciones de sus documentos.
      </p>
    </div>

    <LoginStyles>
      <Link href="/signin">
        <a>🔑</a>
      </Link>
    </LoginStyles>
  </StyledIndex>
);

export default Home;
