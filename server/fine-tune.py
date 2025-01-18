from dotenv import load_dotenv
import openai
import os
from pathlib import Path

# Load variables from the .env file
load_dotenv()

client = openai()
# Set OpenAI API key
client.api_key = os.getenv("OPENAI_API_KEY")

# Step 1: Upload the training file
try:
    client.fine_tuning.jobs.create(
        model="gpt-4o",
        training_file="file-abc123",
    )
except openai.APIConnectionError as e:
    print("The server could not be reached")
    print(e.__cause__)  # an underlying Exception, likely raised within httpx.
except openai.RateLimitError as e:
    print("A 429 status code was received; we should back off a bit.")
except openai.APIStatusError as e:
    print("Another non-200-range status code was received")
    print(e.status_code)
    print(e.response)