from google.adk.agents import Agent
from google.adk.agents import LlmAgent
from google.adk.tools.agent_tool import AgentTool
from google.genai.types import GenerateContentConfig
from manager.sub_agents.tutor import prompt
# from manager.tools.memory import store_lesson_state

tutor_agent = LlmAgent(
    name="tutor_agent",
    model="gemini-2.5-pro-preview-05-06",
    description="Guides users through conceptual learning",
    instruction=prompt.TUTOR_AGENT_INSTR,
    tools=[],
    generate_content_config=GenerateContentConfig(
    temperature=0.0,
    top_p=0.5
)
)
