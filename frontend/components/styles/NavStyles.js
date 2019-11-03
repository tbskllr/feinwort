import styled from "styled-components";

const NavStyles = styled.ul`
  margin: 0;
  padding: 0;
  display: flex;
  justify-self: space-between;
  font-size: 1.5rem;
  font-family: Arial, Helvetica, sans-serif;
  a,
  button {
    color: ${props => props.theme.black};
    padding: 1rem 1rem;
    display: flex;
    align-items: flex-end;
    position: relative;
    text-transform: lowercase;
    font-size: 1em;
    font-weight: 400;
    background: none;
    border: 0;
    transition: 1s;
    cursor: pointer;
    @media (max-width: 700px) {
      font-size: 1.5rem;
      padding: 0 10px;
    }
    @media (max-width: 400px) {
      font-size: 2rem;
      padding: 5px;
      &:hover {
      color: ${props => props.theme.lightGrey};
      font-size: 2rem;
    }
    }
    &:hover {
      color: ${props => props.theme.lightGrey};
      font-size: 1.7rem;
    }
    /*&::before {
      content: '';
      width: 100%;
      height: 100%;
      left: 0;
      position: absolute; 
      transform: skew(-20deg);
      top: 0;
      background: ${props => props.theme.lightGrey};
      transform: scale(0);
      transition: .5s;
      z-index: -1;
    }
    &:hover::before {
      transform: scale(1);
      opacity: 1;
    }*/
    
     
  }
  @media (max-width: 1300px) {
    border-top: 1px solid ${props => props.theme.lightGrey};
    width: 100%;
    x-overflow-x: hidden;
    justify-content: center;
    font-size: 1.5rem;
  }
`;

export default NavStyles;
