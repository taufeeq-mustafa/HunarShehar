import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAgent } from '../../context/AgentContext';
import Navbar from '../Navbar/Navbar';

const LearningModule = () => {
  const { moduleId } = useParams();
  const { processLearningRequest, loading, error } = useAgent();
  const [moduleContent, setModuleContent] = useState(null);
  const [userInput, setUserInput] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [currentSection, setCurrentSection] = useState(0);
  const [activeAgent, setActiveAgent] = useState('tutor'); // Default to tutor agent

  useEffect(() => {
    const initializeModule = async () => {
      try {
        const response = await processLearningRequest(
          `Initialize learning module for ${moduleId}`,
          { 
            moduleId,
            action: 'initialize',
            agent: 'tutor',
            context: {
              userLevel: 'beginner',
              preferredLanguage: 'en'
            }
          }
        );
        if (response.status === 'success') {
          setModuleContent(response.data);
          // Add initial agent message
          setChatHistory([{
            type: 'agent',
            content: response.data.welcomeMessage || 'Welcome to the learning module! How can I help you today?',
            agent: 'tutor'
          }]);
        }
      } catch (err) {
        console.error('Error initializing module:', err);
      }
    };

    initializeModule();
  }, [moduleId, processLearningRequest]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    // Add user message to chat
    const userMessage = { type: 'user', content: userInput };
    setChatHistory(prev => [...prev, userMessage]);
    setUserInput('');

    try {
      // Determine which agent to use based on the input
      let agent = activeAgent;
      if (userInput.toLowerCase().includes('quiz') || userInput.toLowerCase().includes('test')) {
        agent = 'quiz_master';
      } else if (userInput.toLowerCase().includes('game') || userInput.toLowerCase().includes('play')) {
        agent = 'gamification';
      }

      const response = await processLearningRequest(userInput, {
        moduleId,
        action: 'interact',
        agent,
        context: {
          currentSection,
          moduleContent,
          chatHistory: chatHistory.slice(-5), // Send last 5 messages for context
          activeAgent: agent
        }
      });

      if (response.status === 'success') {
        // Add agent response to chat
        const agentMessage = { 
          type: 'agent', 
          content: response.data,
          agent
        };
        setChatHistory(prev => [...prev, agentMessage]);
        setActiveAgent(agent);

        // Update current section if provided
        if (response.data.nextSection !== undefined) {
          setCurrentSection(response.data.nextSection);
        }
      }
    } catch (err) {
      console.error('Error processing request:', err);
    }
  };

  const handleSectionChange = async (sectionIndex) => {
    try {
      const response = await processLearningRequest(
        `Navigate to section ${sectionIndex}`,
        {
          moduleId,
          action: 'navigate',
          agent: 'tutor',
          context: {
            currentSection: sectionIndex,
            moduleContent
          }
        }
      );

      if (response.status === 'success') {
        setCurrentSection(sectionIndex);
        setChatHistory(prev => [...prev, {
          type: 'agent',
          content: response.data.message || `Moving to section ${sectionIndex + 1}`,
          agent: 'tutor'
        }]);
      }
    } catch (err) {
      console.error('Error changing section:', err);
    }
  };

  const renderMessageContent = (content, agent) => {
    if (typeof content === 'object') {
      if (content.title && content.description) {
        return (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className={`px-2 py-1 rounded text-xs ${
                agent === 'tutor' ? 'bg-blue-100 text-blue-800' :
                agent === 'quiz_master' ? 'bg-purple-100 text-purple-800' :
                'bg-green-100 text-green-800'
              }`}>
                {agent === 'tutor' ? 'Tutor' :
                 agent === 'quiz_master' ? 'Quiz Master' :
                 'Game Master'}
              </span>
            </div>
            <h3 className="font-semibold">{content.title}</h3>
            <p>{content.description}</p>
            {content.content && <p>{content.content}</p>}
            {content.timestamp && (
              <p className="text-sm text-gray-500">
                {new Date(content.timestamp).toLocaleString()}
              </p>
            )}
          </div>
        );
      }
      return <pre>{JSON.stringify(content, null, 2)}</pre>;
    }
    return content;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Module Header */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              {moduleContent?.title || 'Loading...'}
            </h1>
            <p className="text-gray-600">
              {moduleContent?.description || 'Loading module content...'}
            </p>
          </div>

          {/* Navigation */}
          {moduleContent?.sections && (
            <div className="bg-white rounded-lg shadow-md p-4 mb-6">
              <div className="flex space-x-2 overflow-x-auto">
                {moduleContent.sections.map((section, index) => (
                  <button
                    key={index}
                    onClick={() => handleSectionChange(index)}
                    className={`px-4 py-2 rounded-lg ${
                      currentSection === index
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {section.title}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Learning Interface */}
          <div className="bg-white rounded-lg shadow-md p-6">
            {/* Chat History */}
            <div className="h-[500px] overflow-y-auto mb-4 space-y-4">
              {chatHistory.map((message, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg ${
                    message.type === 'user'
                      ? 'bg-indigo-100 ml-12'
                      : 'bg-gray-100 mr-12'
                  }`}
                >
                  {renderMessageContent(message.content, message.agent)}
                </div>
              ))}
              {loading && (
                <div className="text-center text-gray-500">
                  Processing your request...
                </div>
              )}
            </div>

            {/* Input Form */}
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Ask a question, request a quiz, or start a game..."
                className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
              >
                Send
              </button>
            </form>
          </div>

          {/* Error Display */}
          {error && (
            <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              {error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LearningModule; 