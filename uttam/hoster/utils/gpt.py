from openai import OpenAI
import openai
from dotenv import load_dotenv
import os 
import json
import mistune
import concurrent.futures
import subprocess
import time
import pathspec
import signal


load_dotenv()

def is_json(string):
    try:
        json.loads(string)
        return True
    except json.JSONDecodeError:
        return False


def get_code(file_path):
    with open(file_path, 'r') as f:
        code = f.read()
    client = OpenAI(
    # defaults to os.environ.get("OPENAI_API_KEY")
    api_key= os.getenv("GPT3_API_KEY")
#     api_key= st.secrets["GPT3_API_KEY"]
)

    MODEL_NAME = "gpt-3.5-turbo-16k"
    query = generate_query_for_logo_and_credits_changing_in_code(code)
    # print(query)
    # st.write(query)
    messages = [
                {"role": 'system', "content": query} #our query 
            ]
    gpt_response = {
        "code": "",
    }
    content=""
    while True:
        response = client.chat.completions.create(
            model = MODEL_NAME,
            messages = messages,
        )
    
        content+= response.choices[0].message.content
        messages.append({"role": 'user', "content": response.choices[0].message.content})
        if (is_json(content) and json.loads(content)['code']):
            # and "message" in code_data and code_data["message"]=="completed"
            break
        else:
            print("running one more iteration")

    code_data = json.loads(content)
    code = code_data['code']
    gpt_response['code']+=code
        

    


    
    # st.header(gpt_response['completion_tokens'])
    # st.header(gpt_response['prompt_tokens'])
    # st.header(gpt_response['total_tokens'])
    # print(gpt_response)
    #write response to a file
    

    #create a dummy file and write code to it
    with open(file_path, 'w') as f:
        f.write(gpt_response['code'])

    response_dict = response.dict()
    response_json = json.dumps(response_dict)
    # Write response to a file
    with open('response.json', 'w') as f:
        f.write(response_json)

    return gpt_response



def generate_query_for_logo_and_credits_changing_in_code(data):
    query = f'''You are an expert system in changing the logo and credits in the code. 
        Replace the logo with "logo.png" and set the credits to "rig-group" in the following HTML code:

        {data}

        Return the modified code in the following format:
        {{
            "code": "modified code here",
            "message": "completed" or "error message here"
        }}
        '''
    return query


# with open("response.json", 'r') as f:
#     response = f.read()

# response=json.loads(response)
# code=response["choices"][0]["message"]["content"]
# with open('code', 'w') as f:
#     f.write(code)


def generate_query_for_creating_runme_file(data,port):
    print(data)
    query = f'''You are an expert system in creating a runme file. 
        Create a runme file to run the service on Port {port} for the following file structures
        it should be a start script for the file structure

        {data}
        Return the modified code in the following format:
        {{
            "code": "modified code here",
            "message": "completed" or "error message here"
        }}
        If there is already a runme file for the project just give a command to run it
        '''

    return query

def generate_runme(port):
    print("in generate_runme")
    filesPaths=[]
    root_folder=os.getcwd()

    with open('.gitignore', 'r') as f:
        gitignore = f.read()


# Compile the .gitignore file into a list of pathspec patterns
    spec = pathspec.PathSpec.from_lines(pathspec.patterns.GitWildMatchPattern, gitignore.splitlines())
    with concurrent.futures.ThreadPoolExecutor() as executor:
        for folder_path, _, file_names in os.walk(root_folder):
            if '/.' in folder_path:  # skip hidden directories
                continue
            for file_name in file_names:
                if file_name.startswith('.'):  # skip hidden files
                    continue
                file_path = os.path.join(folder_path, file_name)
                relative_path = os.path.relpath(file_path, root_folder)
                # Check if the file matches any of the .gitignore patterns
                if spec.match_file(relative_path):
                    continue  # Skip this file
                filesPaths.append(relative_path)
                # executor.submit(get_code, file_path)
    
    client = OpenAI(api_key= os.getenv("GPT3_API_KEY"))
    MODEL_NAME = "gpt-3.5-turbo-16k"
    filesPaths_string = ' '.join(filesPaths)
    query=generate_query_for_creating_runme_file(filesPaths_string,port)
    messages = [
                {"role": 'user', "content": query} #our query 
            ]
    # print(messages)
    while True:
            
            response = client.chat.completions.create(
            model = MODEL_NAME,
            messages = messages,

            )

            # print(response)

            messages.append({"role": 'system', "content": response.choices[0].message.content})
            code=json.loads(response.choices[0].message.content)["code"]
            with open('runme_gpt.sh', 'w') as f:
                f.write(code)
            
            process = subprocess.Popen(['bash', 'chmod','+x','runme_gpt.sh'], stdout=subprocess.PIPE, stderr=subprocess.PIPE)
            process = subprocess.Popen(['bash', 'runme_gpt.sh'], stdout=subprocess.PIPE, stderr=subprocess.PIPE, preexec_fn=os.setsid)
            print("Ran process")
            time.sleep(10)
            if process.poll() is None:
                print("Ran process so killing")
    # If the process has not terminated, kill it
                os.killpg(os.getpgid(process.pid), signal.SIGTERM)
                break
            else:
                # If the process has terminated, check if there were any errors
                stdout, stderr = process.communicate()
                if process.returncode != 0:
                    error_message = stderr.decode('utf-8')
                    # print(error_message)
                    # print(stdout)
                    messages.append({
                        "role":"user",
                        "content":error_message,


                    })
                else:
                    break
    for file in filesPaths:
        continue


           

def generate_query_for_checking_runme_for_every_code_file(file,runme):
    with open(file, 'r') as f:
        file = f.read()
    with open("runme_gpt.sh","r") as f:
        runme=f.read()
    query = f'''You are an expert system in generating runme file. 
        you will be given an existing runme file and a code file you need to tailor the runme as required for the file if required:

        the file is {file} and current runme is {runme}
        Return the modified code in the following format:
        {{
            "code": "modified runme here if modified else the old runme",
            "message": "completed" or "error message here"
        }}
        '''
    
def generate_query_for_getting_code_files(filesPaths_string):
    query = f'''You are an expert system in getting the code files. 
        Get the code files for the following file structures:

        {filesPaths_string}
        Return the modified code in the following format:
        {{
            "code": "code files array here",
            "message": "completed" or "error message here"
        }}
        '''

    return query



def get_code_files():
    root_folder=os.getcwd()
    with open('.gitignore', 'r') as f:
        gitignore = f.read()
    filesPaths=[]
# Compile the .gitignore file into a list of pathspec patterns
    spec = pathspec.PathSpec.from_lines(pathspec.patterns.GitWildMatchPattern, gitignore.splitlines())
    with concurrent.futures.ThreadPoolExecutor() as executor:
        for folder_path, _, file_names in os.walk(root_folder):
            if '/.' in folder_path:  # skip hidden directories
                continue
            for file_name in file_names:
                if file_name.startswith('.'):  # skip hidden files
                    continue
                file_path = os.path.join(folder_path, file_name)
                relative_path = os.path.relpath(file_path, root_folder)
                # Check if the file matches any of the .gitignore patterns
                if spec.match_file(relative_path):
                    continue  # Skip this file
                filesPaths.append(relative_path)
                
    client = OpenAI(api_key= os.getenv("GPT3_API_KEY"))
    MODEL_NAME = "gpt-3.5-turbo-16k"
    filesPaths_string = ' '.join(filesPaths)
    query=generate_query_for_getting_code_files(filesPaths_string)
    messages = [
                {"role": 'user', "content": query} #our query 
            ]
    response = client.chat.completions.create(
            model = MODEL_NAME,
            messages = messages,

            )
    
    code=json.loads(response.choices[0].message.content)["code"]
    #make the files to get absolute path
    for i in range(len(code)):
        code[i]=os.path.join(root_folder,code[i])


    return code
    

def change_logo_credits(files):
    with concurrent.futures.ThreadPoolExecutor() as executor:
        for file in files:
            executor.submit(get_code, file)

