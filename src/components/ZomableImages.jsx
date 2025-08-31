import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import mouse from '../assets/mouse.jpg'

const ZoomableImages = ({ src, alt }) => {
  return (
    <Zoom>
      {/* <img
        src={mouse}
        className="w-full max-w-md rounded-2xl shadow-md cursor-zoom-in"
      /> */}
      <img src={mouse} alt="" />
    </Zoom>
  );
};

export default ZoomableImages;
