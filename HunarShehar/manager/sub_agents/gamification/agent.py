from google.adk.agents import Agent
from google.adk.agents import LlmAgent
from google.adk.tools.agent_tool import AgentTool
from google.genai.types import GenerateContentConfig
from manager.sub_agents.gamification import prompt

gamification_agent = LlmAgent(
    name="gamification_agent",
    model="gemini-2.5-pro-preview-05-06",
    description="Motivates with rewards and progress tracking",
    instruction=prompt.GAMIFICATION_AGENT_INSTR,
    tools=[],
    generate_content_config=GenerateContentConfig(
    temperature=0.0,
    top_p=0.5
)
)
