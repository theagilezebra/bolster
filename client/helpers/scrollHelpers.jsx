import Scroll from 'react-scroll';
const scrollAnimate = Scroll.animateScroll;
const scroller = Scroll.scroller;

const toBottom = () => {
  scrollAnimate.scrollToBottom();
};

const toElement = (element) => {
  scroller.scrollTo(element, {
    duration: 1000,
    delay: 100,
    smooth: true,
  });
};


module.exports = {
  toBottom,
  toElement,
};
