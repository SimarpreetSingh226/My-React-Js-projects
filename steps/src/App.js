import { useState } from "react";
const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];
export default function App() {
  return (
    <div>
      <Steps />;
      <Steps />;
    </div>
  );
}

function Steps() {
  const [step, setStep] = useState(1);
  // const [test, setTest] = useState({ name: "Simar" });
  const [isOpen, setIsOpen] = useState(true);

  // const step = 1;
  function handlePrevious() {
    // alert("Previous");
    // if (step > 1) setStep(step - 1);
    if (step > 1) setStep((s) => s - 1);
  }
  function handleNext() {
    // alert("Next");
    // if (step < 3) setStep(step + 1);
    if (step < 3) setStep((s) => s + 1);
    // if (step < 3) setStep((s) => s + 1);
    //Bad prctice
    // test.name = "Fred";
    // setTest({ name: "Fred" });
  }
  return (
    <div>
      <button className="close" onClick={() => setIsOpen((is) => !is)}>
        &times;
      </button>
      {isOpen && (
        <div className="steps">
          <div className="numbers">
            {/* <div className={`${step >= 1 ? "active" : ""}`}>1</div> */}
            <div className={step >= 1 ? "active" : ""}>1</div>
            <div className={step >= 2 ? "active" : ""}>2</div>
            <div className={step >= 3 ? "active" : ""}>3</div>
          </div>

          <div>
            <p className="message">
              Step{step}: {messages[step - 1]}
            </p>
          </div>

          <div className="buttons">
            {/* <p className="message">Hello</p> */}
            <button
              style={{ backgroundColor: "#7950f2", color: "#fff" }}
              // onClick={() => alert("previous")}
              onClick={handlePrevious}
              //   onMouseEnter={() => alert("TEST")}
            >
              Previous
            </button>
            <button
              style={{ backgroundColor: "#7950f2", color: "#fff" }}
              onClick={handleNext}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
