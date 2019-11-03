import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";
import ItemImages from "./ItemImage";

const StyledCarousel = styled.div`
  .carousel {
    position: relative;
    width: 50vw;
    height: 33vw;
    overflow: hidden;
    box-shadow: -1px 2px 10px 2px rgba(0, 0, 0, 0.5);

    &_slide {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      text-align: center;
      z-index: 1;
      background-color: black;
      display: flex;
      align-items: center;

      img {
        max-width: 100%;
      }
    }

    &_history {
      position: absolute;
      z-index: 2;
      bottom: 10px;
      width: 50%;
      left: 50%;
      transform: translateX(-50%);

      ul {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        justify-content: center;
        height: 3px;

        li {
          width: 15%;
          box-sizing: border-box;
          height: inherit;
          position: relative;
          &:not(:last-of-type) {
            margin-right: 5%;
          }

          button {
            border: none;
            outline: none;
            position: absolute;
            top: 0;
            left: 0;
            background-color: rgba(255, 255, 255, 0.5);
            width: 100%;
            height: 100%;
            cursor: pointer;
            transition: background-color 300ms ease;
            &.active {
              background-color: rgba(255, 255, 255, 0.95);
            }
          }
        }
      }
    }

    &_control {
      position: absolute;
      z-index: 2;
      top: 0;
      height: 100%;
      display: block;
      background-color: rgba(0, 0, 0, 0.1);
      border: 0;
      padding: 0 5px;
      width: 10%;
      overflow: hidden;
      transition: background-color 300ms ease;
      cursor: pointer;

      span {
        display: inline-block;
        width: 2vw;
        height: 2vw;
        position: relative;
        box-sizing: border-box;
        opacity: 0.65;
        border-bottom: 3px solid white;
        border-left: 3px solid white;
        transition: opacity 300ms ease;
      }

      &:hover {
        background-color: rgba(0, 0, 0, 0.2);

        span {
          opacity: 0.95;
        }
      }

      &__prev {
        left: 0;
        padding-left: 12px;
        span {
          transform: rotate(45deg);
        }
      }

      &__next {
        right: 0;

        padding-right: 12px;
        span {
          transform: rotate(-135deg);
        }
      }
    }
  }

  // animation for slide
  .leave {
    transform: translateX(0);
  }

  .enter-active.enter-next,
  .enter-active.enter-prev {
    transform: translateX(0);
    transition: transform 500ms linear;
  }

  .enter-next {
    transform: translateX(100%);
  }

  .enter-prev {
    transform: translateX(-100%);
    transition: transform 500ms linear;
  }

  .leave-active-next {
    transform: translateX(-100%);
    transition: transform 500ms linear;
  }

  .leave.leave-active-prev {
    transform: translateX(100%);
    transition: transform 500ms linear;
  }

  // ----------------------------------
  body {
    padding: 0;
    margin: 0;
    position: relative;
    overflow-x: hidden;
    height: 100%;
    background-image: radial-gradient(
      ellipse farthest-side at 100% 100%,
      #b1b1b1 20%,
      #a79b9f 40%,
      #d78745 120%
    );
  }

  html,
  #root {
    height: 100%;
  }

  .app {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

class Carousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [
        "https://d2lm6fxwu08ot6.cloudfront.net/img-thumbs/960w/HA1RQCRQJ7.jpg",
        "https://d2lm6fxwu08ot6.cloudfront.net/img-thumbs/960w/EVHXF4MUT6.jpg",
        "https://d2lm6fxwu08ot6.cloudfront.net/img-thumbs/960w/D7VE3SK3RD.jpg",
        "https://d2lm6fxwu08ot6.cloudfront.net/img-thumbs/960w/0XRFUE80AZ.jpg",
        "https://d2lm6fxwu08ot6.cloudfront.net/img-thumbs/960w/2DQJJ9RLVD.jpg",
        "https://res.cloudinary.com/dot3alymv/image/upload/v1551995979/feinwort/imvd33suedshtovh1vgd.jpg"
      ],
      current: 0,
      isNext: true
    };

    this.handlerPrev = this.handlerPrev.bind(this);
    this.handlerNext = this.handlerNext.bind(this);
    this.goToHistoryClick = this.goToHistoryClick.bind(this);
  }

  handlerPrev() {
    let index = this.state.current,
      length = this.state.items.length;

    if (index < 1) {
      index = length;
    }

    index = index - 1;

    this.setState({
      current: index,
      isNext: false
    });
  }

  handlerNext() {
    let index = this.state.current,
      length = this.state.items.length - 1;

    if (index == length) {
      index = -1;
    }

    index = index + 1;

    this.setState({
      current: index,
      isNext: true
    });
  }

  goToHistoryClick(curIndex, index) {
    let next = curIndex < index;
    this.setState({
      current: index,
      isNext: next
    });
  }

  render() {
    let index = this.state.current,
      isnext = this.state.isNext,
      src = this.state.items[index];

    return (
      <StyledCarousel>
        <div className="app">
          <div className="carousel">
            <ReactCSSTransitionGroup
              transitionName={{
                enter: isnext ? "enter-next" : "enter-prev",
                enterActive: "enter-active",
                leave: "leave",
                leaveActive: isnext ? "leave-active-next" : "leave-active-prev"
              }}
            >
              <div className="carousel_slide" key={index}>
                <img src={src} />
              </div>
            </ReactCSSTransitionGroup>
            <button
              className="carousel_control carousel_control__prev"
              onClick={this.handlerPrev}
            >
              <span />
            </button>
            <button
              className="carousel_control carousel_control__next"
              onClick={this.handlerNext}
            >
              <span />
            </button>
            <div className="carousel_history">
              <History
                current={this.state.current}
                items={this.state.items}
                changeSilde={this.goToHistoryClick}
              />
            </div>
          </div>
        </div>
      </StyledCarousel>
    );
  }
}

class History extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let current = this.props.current;
    let items = this.props.items.map((el, index) => {
      let name = index == current ? "active" : "";
      return (
        <li key={index}>
          <button
            className={name}
            onClick={() => this.props.changeSilde(current, index)}
          />
        </li>
      );
    });

    return <ul>{items}</ul>;
  }
}

export default Carousel;
