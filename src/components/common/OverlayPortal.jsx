import { createPortal } from "react-dom";

function OverlayPortal({ children }) {
  return createPortal(children, document.body);
}

export default OverlayPortal;
