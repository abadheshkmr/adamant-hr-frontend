import React from "react";
import "./OurProcess.css";

const steps = [
  {
    number: "1",
    title: "Requirement gathering",
    description:
      "Recieving the requirement from the Client.",
  },
  {
    number: "2",
    title: "Matching Profiles",
    description:
      "Sourcing matching candidates from our vast available database & head hunting & sending best suitable profile to the clients.",
  },
  {
    number: "3",
    title: "Coordination",
    description:
      "Coordinating client & candidates for salary negotiation if candidate is selected or sourcing new candidates.",
  },
  {
    number: "4",
    title: "Interview Scheduling",
    description:
      "Scheduling interview as per client feedback & sourcing backup candidates for the same requirement.",
  },
  {
    number: "5",
    title: "Interview & Offer",
    description:
      "Interview candidates over phone or face to face.",
  },
  {
    number: "6",
    title: "Hire & Onboard",
    description:
      "Follow up the candidates till joining and after.", 
  },
  {
    number: "7",
    title: "Post Joining Support",
    description:
    "Post joining handling training, induction, payroll, mobile app etc.",
  }
];

const OurProcess = () => {
  return (
    <section className="process-section">
      <h2 className="process-title">Our Process</h2>
      <div className="process-container">
        {steps.map((step) => (
          <div key={step.number} className="process-step">
            <div className="step-number">{step.number}</div>
            <h3>{step.title}</h3>
            <p>{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OurProcess;
