from datetime import datetime
import json
import os
from typing import Dict, Any, Union

from google.adk.agents.callback_context import CallbackContext
from google.adk.sessions.state import State
from google.adk.tools import ToolContext

# Define constants used throughout the app
class constants:
    SYSTEM_TIME = "system_time"
    PROFILE_INITIALIZED = "profile_initialized"
    USER_PROFILE_KEY = "user_profile"
    CURRENT_DOMAIN = "learning_domain"
    START_TIME = "session_start_time"
    LESSON_TITLE = "lesson_title" # Added
    LESSON_SUMMARY = "lesson_summary" # Added
    NEXT_STEP = "next_step" # Added

# Safe path to the default user profile JSON
SAMPLE_PROFILE_PATH = os.getenv(
    "HUNAR_SHEHER_PROFILE", os.path.join("manager", "profiles", "hunar_default_state.json")
)

def memorize_list(key: str, value: str, tool_context: ToolContext) -> Dict[str, str]:
    mem_dict = tool_context.state
    if key not in mem_dict:
        mem_dict[key] = []
    if value not in mem_dict[key]:
        mem_dict[key].append(value)
    return {"status": f'Stored "{key}": "{value}"'}

def memorize(key: str, value: str, tool_context: ToolContext) -> Dict[str, str]:
    """
    Memorizes a key-value pair in the session state.

    Args:
        key: The key to store the value under.
        value: The value to store.
        tool_context: The ADK tool context.

    Returns:
        A status message.
    """
    tool_context.state[key] = value
    return {"status": f'Stored "{key}": "{value}"'}

def forget(key: str, value: str, tool_context: ToolContext) -> Dict[str, str]:
    if tool_context.state.get(key) is None:
        tool_context.state[key] = []
    if value in tool_context.state[key]:
        tool_context.state[key].remove(value)
    return {"status": f'Removed "{key}": "{value}"'}

def _set_initial_states(source: Dict[str, Any], target: Union[State, Dict[str, Any]]) -> None:
    if constants.SYSTEM_TIME not in target:
        target[constants.SYSTEM_TIME] = str(datetime.now())

    if constants.PROFILE_INITIALIZED not in target:
        target[constants.PROFILE_INITIALIZED] = True

        target.update(source)

        profile = source.get("user_profile", {})
        for key in ["preferred_language", "region", "education_level", "preferred_learning_style"]:
            if key in profile:
                target[key] = profile[key]

        if "domain" in source:
            target[constants.CURRENT_DOMAIN] = source["domain"]
        if "goal" not in target:
            target["goal"] = ""

        # Or set a default if not present
        if constants.CURRENT_DOMAIN not in target:
            target[constants.CURRENT_DOMAIN] = "Soft Skills"

def _load_user_profile(callback_context: CallbackContext) -> None:
    try:
        with open(SAMPLE_PROFILE_PATH, "r", encoding="utf-8") as file:
            data = json.load(file)
            print(f"\nLoading User Profile: {data}\n")

        _set_initial_states(data["state"], callback_context.state)
    except FileNotFoundError:
        print(f"⚠️ ERROR: Could not find user profile at {SAMPLE_PROFILE_PATH}")
    except json.JSONDecodeError:
        print(f"⚠️ ERROR: Could not decode JSON in {SAMPLE_PROFILE_PATH}")