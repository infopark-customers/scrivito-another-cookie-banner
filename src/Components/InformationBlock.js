import * as React from "react";

function InformationBlock({ children, cookieName, disabled }) {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="accordion-item">
      <button
        className="accordion-button"
        type="button"
        aria-expanded={open}
        aria-controls={`infoCollapseOne-${cookieName}`}
        onClick={() => setOpen(!open)}
      >
        <i className="fas fa-info-circle"></i>
      </button>
      <div
        id={`infoCollapseOne-${cookieName}`}
        className={`accordion-collapse collapse ${open ? "show" : ""} ${disabled ? 'opacity-50' : ''}`}
      >
        <div className="accordion-body">{children}</div>
      </div>
    </div>
  );
}
export default InformationBlock;
