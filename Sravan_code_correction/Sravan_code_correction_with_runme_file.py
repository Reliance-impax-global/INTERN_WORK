#this part of the program works on the error correction part of the code like it will recieve the error from runme.sh file which is generated on hand before and then it run the runme file then if it generate any error then it will find the path (the part of the application which caused error )  then it will find the path which caused the error it will resolve it until there is no error finally run the code and give the output 



import re
import subprocess
from openai import OpenAI
import openai
import os
import json
import time
import signal

api_key = "your api key"
client = OpenAI(api_key=api_key)


def generate_file_path(user_code):
    completion = client.chat.completions.create(
        model="gpt-3.5-turbo-16k",
        messages=[
            {"role": "system", "content": "You are an expert in solving problems, finding errors, and providing solutions. ,You will be provided with Error Information You need to find the file path that caused the error, and please go line by line. and you will only give filepath as   output  in json format like filepath:"""},
            {"role": "user",
             "content": f"{user_code}\n  check the whole error information and find exact file path and correct it and give it in 'utf-8' give only only path as output without any extra informationin  "}
        ]
    )
    # Check if 'choices' is present in the response
    return completion.choices[0].message.content


def read_code_from_file(file_path):
    try:
        with open(file_path, 'r') as file:
            code_read = file.read()
        return code_read

    except Exception as e:
        return f"Error reading code from file: {e}"


def write_code_to_file(file_path, code):
    try:
        with open(file_path, 'w') as file:
            file.write(code)
        return True
    except Exception as e:
        return f"Error writing code to file: {e}"


def generate_code_correction(user_code):
    completion = client.chat.completions.create(
        model="gpt-3.5-turbo-16k",
        messages=[
            {"role": "system", "content": "You are an expert in solving problems, finding errors, and providing solutions. ,You will be provided with the programming language information, and please go line by line."},
            {"role": "user",
             "content": f"{user_code}\n  check the whole code and correct it and give it in 'utf-8 give only only code as output without any extra information"}
        ]
    )
    # Check if 'choices' is present in the response
    return completion.choices[0].message.content


def run_process(command, timeout=10):
    # Start the process
    process = subprocess.Popen(
        command, stdout=subprocess.PIPE, stderr=subprocess.PIPE, preexec_fn=os.setsid)

    print("Ran process")

    # Wait for the process to finish or for the specified timeout
    start_time = time.time()
    while time.time() - start_time < timeout and process.poll() is None:
        time.sleep(0.1)

    # Check if the process is still running
    if process.poll() is None:
        # If the process has not terminated, kill it
        os.killpg(os.getpgid(process.pid), signal.SIGTERM)
        stdout, stderr = process.communicate()  # Capture output before killing
        print("Killed the process")
    else:
        # If the process has terminated, capture the output and check for errors
        stdout, stderr = process.communicate()

    # Decode the output to string
    output = stdout.decode('utf-8')
    error_message = stderr.decode('utf-8')

    # Print the output and error message
    # print("Command Output:")
    # print(output)

    if process.returncode != 0:
        return error_message
    else:
        return 1


code_correct = False

while not code_correct:
    command_to_run = ['bash', 'runme_gpt.sh']
    error = run_process(command_to_run)

    if error == 1:
        print("Code is correct")
        code_correct = True
    else:
        file_ph = generate_file_path(error)
        print(file_ph)
        data_dict = json.loads(file_ph)
        print(data_dict['filepath'])
        data_path = data_dict['filepath']

        existing_code = read_code_from_file(data_path)
        user_code = f"{existing_code}"
        corrected_code = generate_code_correction(user_code)

        # Write the corrected code back to the original file
        if write_code_to_file(data_path, corrected_code):
            print("Code has been successfully written to the file.")
        else:
            print("Error writing corrected code to the file.")
