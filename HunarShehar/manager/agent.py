from google.adk.agents import Agent
from google.adk.agents import LlmAgent
from google.adk.tools import agent_tool
from google.adk.sessions import Session
from google.adk.tools import agent_tool
from google.genai.types import GenerateContentConfig
from manager import prompt
from manager.sub_agents.tutor.agent import tutor_agent
from manager.sub_agents.quiz_master.agent import quiz_master_agent
from manager.sub_agents.gamification.agent import gamification_agent
from manager.sub_agents.scenario_coach.agent import scenario_coach_agent
from manager.tools.memory import _load_user_profile

tutor_tool = agent_tool.AgentTool(agent=tutor_agent)
quiz_tool = agent_tool.AgentTool(agent=quiz_master_agent)
scenario_tool = agent_tool.AgentTool(agent=scenario_coach_agent)
gamification_tool = agent_tool.AgentTool(agent=gamification_agent)

root_agent = LlmAgent(
    name="LearningCoordinator",
    model="gemini-2.5-pro-preview-05-06",
    instruction=prompt.COORDINATOR_AGENT_INSTR,
    description="Manages the overall learning flow and return response in JSON format.",
    tools=[tutor_tool, quiz_tool, scenario_tool, gamification_tool],
    before_agent_callback=_load_user_profile
)
