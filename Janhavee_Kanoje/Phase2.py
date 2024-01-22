import code
import subprocess
from openai import OpenAI
import os
import json
import send_bug_report_to_website_api
import requests
 
api_key = "INSERT_YOUR_API_KEY"
client = OpenAI(api_key=api_key)
chatgpt_api_url = 'INSERT_YOUR_URL' 
 
def read_code_from_file(file_path):
    try:
        with open(file_path, 'r') as file:
            code_read = file.read()
        return code_read
 
    except Exception as e:
        return f"Error reading code from file: {e}"
 
 
def generate_code_correction(user_code):
    response = client.chat.completions.create(
        model="gpt-3.5-turbo-16k",
        messages=[
            {"role": "system", "content": "You are developing an automated code review tool for the Engineering department of a technology/software company. Given a code snippet or file, analyze the code's quality and provide suggestions for improvement. Identify common issues such as code smells, anti-patterns, potential bugs, performance bottlenecks, also if the code contains errors try to find them and give suggestions to resolve them and security vulnerabilities. Improve the overall quality of the code also provide a corrected code in JSON format. code={code} , language={language} "},
            {"role": "user", "content": f" Code: {user_code} \nLanguage:you identify the language or any framework also check the whole code and correct it also for each provided context do create a bug analysis documentation and give it in 'utf-8 "},
        ]
    )

    headers = {
        'Content-Type': 'application/json',
        'Authorization': f'Bearer {api_key}'
    }
    payload = {
        'prompt': prompt,
        'temperature': 0.7,
        'max_tokens': 150
    }
    response = requests.post(chatgpt_api_url, headers=headers, data=json.dumps(payload))
    return response.choices[0].message.content
 
 

def extract_bug_information(chatgpt_response):
    try:
        # Assuming the response structure has a key 'bugs' containing bug information
        bugs_information = chatgpt_response['bugs']
        return bugs_information
        
    except KeyError:
       print("No 'bugs' key found in the ChatGPT response.")
       return None  
def generate_bug_report(code, bug_information):
    # Implement logic to create a detailed bug report based on code and bug information
    # For simplicity, let's assume bug information is directly used in the report
    bug_summary = bug_information.get("summary", "No summary provided")
    bug_severity = bug_information.get("severity", "Unknown")
    
    bug_report = f"Bug Report:\n\n"
    bug_report += f"Code:\n{code}\n\n"
    bug_report += f"Bug Summary: {bug_summary}\n"
    bug_report += f"Severity: {bug_severity}\n"

    return f"Bug Report:\n\nCode:\n{code}\n\nBugs Identified:\n{bug_information}"

def choose_report_format(bug_report, format_type="text"):
    if format_type == "text":      
     return bug_report
def send_bug_report_to_website(bug_report):
    website_api_url = 'INSERT_YOUR_URL'
    website_api_key = 'your_website_api_key'    
   
    headers = {
        'Content-Type': 'text/plain',
        'Authorization': f'Bearer {website_api_key}'
    }

    try:
        response = requests.post(website_api_url, headers=headers, data=bug_report)

        if response.status_code == 200:
            return "Bug report successfully submitted to the website API."
        else:
            return f"Error: Failed to submit bug report. Status code: {response.status_code}, Response: {response.text}"
    except Exception as e:
        return f"Error: {str(e)}"

bug_report = generate_bug_report(code, bug_information)
result = send_bug_report_to_website_api(bug_report, website_api_url, website_api_key)
print(result)

def main():
    file_path = input("Enter the path to the code file: ")
    reCode = read_code_from_file(file_path)
    corrected_code = generate_code_correction(reCode)
 
# Save the corrected code to a document file
    output_document_path = "output_document.txt"
    with open(output_document_path, 'w') as output_file:
     output_file.write(f"Corrected Code:\n{corrected_code}")

    chatgpt_response = generate_code_correction(code)
    bug_information = extract_bug_information(chatgpt_response)
    bug_report = generate_bug_report(code, bug_information)
    bug_report = choose_report_format(bug_report)

    print(f"Corrected code saved to {output_document_path}")

         
 
