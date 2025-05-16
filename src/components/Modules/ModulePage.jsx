import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import { PointsContext } from '../../context/PointsContext';

const ModulePage = () => {
  const { domain } = useParams();
  const { addPoints } = useContext(PointsContext);
  const [activeTab, setActiveTab] = useState('theoretical');

  const theoreticalTopics = [
    { id: 1, title: 'Topic 1', image: 'placeholder1.jpg', quiz: [
      { question: 'Question 1?', options: ['A', 'B', 'C'], correct: 'A' },
      { question: 'Question 2?', options: ['A', 'B', 'C'], correct: 'B' },
      { question: 'Question 3?', options: ['A', 'B', 'C'], correct: 'C' }
    ]},
    { id: 2, title: 'Topic 2', image: 'placeholder2.jpg', quiz: [
      { question: 'Question 1?', options: ['A', 'B', 'C'], correct: 'A' },
      { question: 'Question 2?', options: ['A', 'B', 'C'], correct: 'B' },
      { question: 'Question 3?', options: ['A', 'B', 'C'], correct: 'C' }
    ]},
    { id: 3, title: 'Topic 3', image: 'placeholder3.jpg', quiz: [
      { question: 'Question 1?', options: ['A', 'B', 'C'], correct: 'A' },
      { question: 'Question 2?', options: ['A', 'B', 'C'], correct: 'B' },
      { question: 'Question 3?', options: ['A', 'B', 'C'], correct: 'C' }
    ]},
    { id: 4, title: 'Topic 4', image: 'placeholder4.jpg', quiz: [
      { question: 'Question 1?', options: ['A', 'B', 'C'], correct: 'A' },
      { question: 'Question 2?', options: ['A', 'B', 'C'], correct: 'B' },
      { question: 'Question 3?', options: ['A', 'B', 'C'], correct: 'C' }
    ]},
    { id: 5, title: 'Topic 5', image: 'placeholder5.jpg', quiz: [
      { question: 'Question 1?', options: ['A', 'B', 'C'], correct: 'A' },
      { question: 'Question 2?', options: ['A', 'B', 'C'], correct: 'B' },
      { question: 'Question 3?', options: ['A', 'B', 'C'], correct: 'C' }
    ]}
  ];

  const handleQuizSubmit = (topicId, answers) => {
    const topic = theoreticalTopics.find(t => t.id === topicId);
    const correctAnswers = topic.quiz.filter((q, i) => q.correct === answers[i]).length;
    addPoints(correctAnswers * 10);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">{domain.charAt(0).toUpperCase() + domain.slice(1)}</h1>
      <div className="mb-4">
        <button
          onClick={() => setActiveTab('theoretical')}
          className={`p-2 mr-2 ${activeTab === 'theoretical' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Theoretical
        </button>
        <button
          onClick={() => setActiveTab('practical')}
          className={`p-2 ${activeTab === 'practical' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Practical
        </button>
      </div>
      {activeTab === 'theoretical' ? (
        <div>
          {theoreticalTopics.map((topic) => (
            <div key={topic.id} className="mb-4 p-4 bg-white rounded shadow">
              <h2 className="text-xl font-bold mb-2">{topic.title}</h2>
              <img src={topic.image} alt={topic.title} className="w-full h-48 object-cover mb-2" />
              <div className="mb-2">
                {topic.quiz.map((q, i) => (
                  <div key={i} className="mb-2">
                    <p className="font-bold">{q.question}</p>
                    {q.options.map((opt, j) => (
                      <label key={j} className="block">
                        <input type="radio" name={`q${i}`} value={opt} /> {opt}
                      </label>
                    ))}
                  </div>
                ))}
                <button
                  onClick={() => handleQuizSubmit(topic.id, topic.quiz.map((_, i) => document.querySelector(`input[name="q${i}"]:checked`)?.value))}
                  className="p-2 bg-blue-500 text-white rounded"
                >
                  Submit
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-4 bg-white rounded shadow">
          <h2 className="text-xl font-bold mb-2">Practical Module</h2>
          <p>Simulation/exercise instructions go here.</p>
          <div className="mt-4 p-4 bg-gray-200 rounded">
            <p className="text-center">Chatbot Placeholder</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModulePage; 