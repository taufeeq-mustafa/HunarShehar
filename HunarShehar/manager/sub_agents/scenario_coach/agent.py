from google.adk.agents import Agent
from google.adk.agents import LlmAgent
from google.adk.tools.agent_tool import AgentTool
from google.genai.types import GenerateContentConfig
from manager.sub_agents.scenario_coach import prompt

scenario_coach_agent = LlmAgent(
    name="scenario_coach_agent",
    model="gemini-2.5-pro-preview-05-06",
    description="Applies skill to real-world scenarios",
    instruction=prompt.SCENARIO_COACH_AGENT_INSTR,
    tools=[],
    generate_content_config=GenerateContentConfig(
    temperature=0.0,
    top_p=0.5
)
)
