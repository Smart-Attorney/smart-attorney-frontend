from flask import Flask, jsonify
from flask_cors import CORS  # Import Flask-CORS
import os
from dotenv import load_dotenv
import requests
from groq import Groq
from docx import Document

# Load environment variables from .env
load_dotenv()

app = Flask(__name__)

def extract_text(file_path):
    """Extract text based on file type."""
    if file_path.endswith(".pdf"):
        return extract_text_from_pdf(file_path)
    elif file_path.endswith(".docx"):
        return extract_text_from_docx(file_path)
    else:
        raise ValueError("Unsupported file type. Please provide a .pdf or .docx file.")

# Function to extract text from the PDF
def extract_text_from_pdf(file_path):
    import fitz  # PyMuPDF

    # Open the PDF file
    pdf_document = fitz.open(file_path)

    # Initialize a list to store the extracted text
    pdf_text = ""

    # Iterate through each page and extract text
    for page_num in range(pdf_document.page_count):
        page = pdf_document.load_page(page_num)
        page_text = page.get_text()
        pdf_text += page_text.strip()  # Append the text from the current page

    return pdf_text

def extract_text_from_docx(file_path):
    doc = Document(file_path)
    text = []
    for paragraph in doc.paragraphs:
        text.append(paragraph.text)
    return "\n".join(text)

# Function to get Groq response
def get_groq_response():
    text = extract_text('Calvin_Yang_Resume.docx')
    
    # Initialize Groq client
    client = Groq(api_key=os.getenv("GROQ_API_KEY"))
    
    # Prepare the request payload
    chat_completion = client.chat.completions.create(
        messages=[
            {
                "role": "system",
                "content": "You are a professional immigration lawyer. In at MOST 2 sentences, I want you to generate an accurate argument of why the client in question should be allowed to stay in the USA."
            },
            {
                "role": "user",
                "content": f"Why should this person be allowed to stay in the USA? Here is the context: {text}"
            }
        ],
        model="llama-3.3-70b-versatile",
    )

    # Return the generated response
    return chat_completion.choices[0].message.content
app = Flask(__name__)
CORS(app)
     
@app.route('/response', methods=['GET'])
def response():
    try:
        groq_response = get_groq_response()
        return jsonify({"response": groq_response})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
