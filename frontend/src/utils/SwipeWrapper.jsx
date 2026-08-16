import { useSwipeable } from 'react-swipeable';
import { useNavigate, useLocation } from 'react-router-dom';

const ROUTE_ORDER = ['/', '/about', '/contact'];

export default function SwipeWrapper({ children }) {
  const navigate = useNavigate();
  const location = useLocation();

  const currentIndex = ROUTE_ORDER.indexOf(location.pathname);

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      // Swiping left moves to the next tab
      if (currentIndex !== -1 && currentIndex < ROUTE_ORDER.length - 1) {
        navigate(ROUTE_ORDER[currentIndex + 1]);
      }
    },
    onSwipedRight: () => {
      // Swiping right moves to the previous tab
      if (currentIndex > 0) {
        navigate(ROUTE_ORDER[currentIndex - 1]);
      }
    },
    preventScrollOnSwipe: true, // Prevents page wobble while swiping horizontally
    trackTouch: true,
    trackMouse: false // Set to true if you want to test dragging with a mouse
  });

  return (
    <div {...handlers} style={{ touchAction: 'pan-y' }}>
      {children}
    </div>
  );
}