# main.py
from fastapi import FastAPI, HTTPException, Form
from fastapi.responses import HTMLResponse
from pyngrok import ngrok
import subprocess
import os
import random
import asyncio
import shutil
import concurrent.futures
# from utils.mailer import send_email
from utils.gpt import get_code,generate_runme


app = FastAPI()
async def set_up(temp_dir):
    os.chdir(temp_dir)
    # for each file in the current folder change logo using generate code
    root_folder=os.getcwd()
    # filesPaths=[]
    # with concurrent.futures.ThreadPoolExecutor() as executor:
    #     for folder_path, _, file_names in os.walk(root_folder):
    #         for file_name in file_names:
    #             file_path = os.path.join(folder_path, file_name)
    #             filesPaths.append(file_path)
    #             executor.submit(get_code, file_path)

    print("in SET_UP")

    port=random.randint(3000,10000)
    generate_runme(port)
    process = subprocess.Popen(['bash','runme_gpt.sh'], stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    return port
async def cleanup_after_delay(ngrok_url, temp_dir):
    # Wait for 1 hour
    print("Waiting for 10 min before cleaning up...")
    await asyncio.sleep(360)
    try:
        if ngrok_url:
            # Close the Ngrok tunnel
            print(f"Closing Ngrok tunnel: {ngrok_url}")
            ngrok.disconnect(ngrok_url)

        # Remove the temporary directory
        print(f"Removing temporary directory: {temp_dir}")
        await asyncio.to_thread(shutil.rmtree, temp_dir)
    except Exception as e:
        print(f"Error during cleanup: {e}")


@app.get("/", response_class=HTMLResponse)
def read_root():
    return """
    <html>
        <body>
            <h1>GitHub to Ngrok Link Converter</h1>
            <form action="/clone" method="post">
                <label for="github_link">GitHub Link:</label>
                <input type="text" id="github_link" name="github_link" required>
                <button type="submit">Convert</button>
            </form>
        </body>
    </html>
    """


async def convert_github_link(github_link):
    # Validate the GitHub link (you can add more validation logic)
    if "github.com" not in github_link:
        raise HTTPException(status_code=400, detail="Invalid GitHub link")
    # Open an Ngrok tunnel to the GitHub link
    try:
    # Validate the GitHub link (you can add more validation logic)
        if "github.com" not in github_link:
            raise HTTPException(status_code=400, detail="Invalid GitHub link")

        # Create a temporary directory to clone the repository
        pwd=os.getcwd()
        temp_dir =pwd+ "/hosted_dirs/temp_repo"+str(random.randint(1,100000))
        os.makedirs(temp_dir, exist_ok=True)
        print(f"Created temporary directory: {temp_dir}")

        # Clone the GitHub repository
        await asyncio.to_thread(subprocess.run, ["git", "clone", github_link, temp_dir])
        port= await set_up(temp_dir)
        # Open an Ngrok tunnel to the cloned repository
        ngrok_url =  ngrok.connect(port, proto="http")
        ngrok_url=ngrok_url.public_url
        print("ngrok tunnel \"{}\" -> \"http://127.0.0.1:{}\"".format(ngrok_url, port))
        asyncio.create_task(cleanup_after_delay(ngrok_url, temp_dir))
        return  ngrok_url
    except Exception as e:
        print(f"Error: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")
        
    
@app.post("/clone", response_class=HTMLResponse)
async def clone_and_setup(github_link: str = Form(...)):
    result = await convert_github_link(github_link)
    ngrok_url = result
    # Send an email with the Ngrok URL

    str= f"""
    <html>
        <body>
            <h1>GitHub Repo Cloner and Ngrok Link Generator</h1>
            <p>Cloning and setup is Complete</p>
            <p>Ngrok URL: {ngrok_url}</p>
            <p id="countdown"></p>

            <script>
                // Countdown timer
                var countdown = 360; // seconds
                var countdownElement = document.getElementById('countdown');

                function updateCountdown() {{
                    countdownElement.innerHTML = 'Time remaining: ' + countdown + ' seconds';
                    countdown--;

                    if (countdown < 0) {{
                        location.reload(); // Reload the page after the countdown
                    }} else {{
                        setTimeout(updateCountdown, 1000); // Update every second
                    }}
                }}

                updateCountdown();
            </script>
        </body>
    </html>
    """
    # send_email("uttamthummala@gmail.com","Cloning and setup is Complete",str)
    return str