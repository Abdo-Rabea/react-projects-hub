import { useState } from "react";
const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];

function App() {
  const [step, setStep] = useState(1);
  const [showPage, setShowPage] = useState(true);
  function handleClickNext() {
    setStep((s) => (s === 3 ? s : s + 1));
  }
  function handleClickPrevious() {
    setStep((s) => (s === 1 ? s : s - 1));
  }

  function toggleShowPage() {
    setShowPage((s) => !s);
  }
  return (
    <>
      {showPage && (
        <div className="steps">
          <Numbers step={step} />
          <Message step={step} />
          <div className="buttons">
            <Button handleClick={handleClickPrevious}>
              <span>👈</span>
              Previous
            </Button>
            <Button handleClick={handleClickNext}>
              Next <span>👉</span> <span>🤓</span>
            </Button>
          </div>
        </div>
      )}
      <button className="close" onClick={toggleShowPage}>
        ×
      </button>
    </>
  );
}

function Numbers({ step }) {
  return (
    <div className="numbers">
      <Number isActive={step >= 1}>1</Number>
      <Number isActive={step >= 2}>2</Number>
      <Number isActive={step >= 3}>3</Number>
    </div>
  );
}

function Number({ children, isActive = false }) {
  return <div className={isActive ? "active" : ""}>{children}</div>;
}

function Message({ step }) {
  const message = messages[step - 1];
  function handleLearnHow() {
    alert("Learn how to " + message);
  }
  return (
    <div className="message">
      <h3>STEP {step}</h3>
      <div>{message}</div>
      <div className="buttons">
        <button onClick={handleLearnHow}>Learn how</button>
      </div>
    </div>
  );
}

function Button({ children, handleClick }) {
  return (
    <button
      onClick={handleClick}
      style={{ background: "#7950f2", color: "#fff" }}
    >
      {children}
    </button>
  );
}
export default App;
