from google.adk.agents import Agent
from google.adk.agents import LlmAgent
from google.adk.tools.agent_tool import AgentTool
from google.genai.types import GenerateContentConfig
from manager.sub_agents.quiz_master import prompt

quiz_master_agent = LlmAgent(
    name="quiz_master_agent",
    model="gemini-2.5-pro-preview-05-06",
    description="Tests knowledge after tutoring",
    instruction=prompt.QUIZ_AGENT_INSTR,
    generate_content_config=GenerateContentConfig(
    temperature=0.0,
    top_p=0.5
)
)
