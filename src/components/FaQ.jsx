import { useState } from 'react';
import '../styles/Dashboard.css';

const FaqWidget = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "Hoe volg ik een cursus?",
      answer: "Klik op de gewenste cursus en bekijk de curcus!"
    },
    {
      question: "Is er een donkere modus beschikbaar?",
      answer: "Ja! Gebruik de schakelaar rechtsboven om te wisselen tussen licht en donker."
    },
    {
      question: "Zijn de cursussen gratis?",
      answer: "Alle curcussen die wij aanbieden zijn gratis!"
    },
    {
      question: "Hoe filter ik op tags?",
      answer: "Klik op de gewenste tag in de lijst met onderwerpen bovenaan. Je kunt meerdere tags tegelijk selecteren."
    },
    {
      question: "Hoe voeg ik een cursus toe aan favorieten?",
      answer: "Klik op het Ster-icoon bij de cursus om deze als favoriet op te slaan."
    }
  ];

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="widget-container faq-widget">
      <h3 className="widget-title">Veelgestelde Vragen</h3>
      <ul className="faq-widget-list">
        {faqs.map((item, index) => (
          <li key={index} className="faq-widget-item">
            <button
              className="faq-question-button"
              onClick={() => toggle(index)}
              aria-expanded={openIndex === index}
            >
              {item.question}
              <span className="faq-toggle-icon">{openIndex === index ? '−' : '+'}</span>
            </button>
            {openIndex === index && <p className="faq-answer">{item.answer}</p>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FaqWidget;
