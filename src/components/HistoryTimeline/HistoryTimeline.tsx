import React, {useState} from 'react';
import {VerticalTimeline, VerticalTimelineElement} from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';

interface HistoricalEvent {
    date: string;
    text: string;
}

interface HistoryTimelineProps {
    events: HistoricalEvent[];
}

const HistoryTimeline: React.FC<HistoryTimelineProps> = ({events}) => {

 const [expanded, setExpanded] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [chronologicalStates, setChronologicalStates] = useState(events.map((_, index) => index === 0));

  const handleExpand = () => {
    setExpanded(true);
  };

  const handleShowQuiz = () => {
    setShowQuiz(true);
    setExpanded(false);
  };

  const handleAnswerQuiz = (correct: boolean) => {
    if (correct) {
      const updatedStates = chronologicalStates.map((_, index) => index === 0 || chronologicalStates[index]);
      setChronologicalStates(updatedStates);
    }
    setShowQuiz(false);
  };
    return (
 <div>
      <h1>History Timeline</h1>
      <VerticalTimeline>
        {events.map((event, index) => (
          <VerticalTimelineElement
            key={index}
            date={event.date}
            iconStyle={{ background: '#007BFF', color: '#fff' }}
          >
            <h3 className="vertical-timeline-element-title">{event.date}</h3>
            <p>{event.text}</p>
            {!expanded && index === 0 && (
              <button className="learn-more-button" onClick={handleExpand}>
                Дізнатися більше
              </button>
            )}
            {expanded && index === 0 && (
              <div>
                <p>Текст дізнання більше...</p>
                <button className="quiz-button" onClick={handleShowQuiz}>
                  Пройти тест
                </button>
              </div>
            )}
            {index !== 0 && (
              <button
                className="learn-more-button"
                disabled={!chronologicalStates[index]}
                onClick={handleShowQuiz}
              >
                Дізнатися більше
              </button>
            )}
          </VerticalTimelineElement>
        ))}
      </VerticalTimeline>

      {showQuiz && (
        <div>
          <p>Текст для тестування</p>
          <button className="answer-quiz-button" onClick={() => handleAnswerQuiz(true)}>
            Вірно
          </button>
          <button className="answer-quiz-button" onClick={() => handleAnswerQuiz(false)}>
            Невірно
          </button>
        </div>
      )}
    </div>    );
};

export default HistoryTimeline;
