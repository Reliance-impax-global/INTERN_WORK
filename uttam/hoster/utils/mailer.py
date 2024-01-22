# from fastapi.params import Depends, Form
# from fastapi_mail import FastMail, ConnectionConfig
# from dotenv import load_dotenv
# import os

# load_dotenv()
# # Configuration for email sending
# mail_config = ConnectionConfig(
#     MAIL_USERNAME=os.getenv("EMAIL"),
#     MAIL_PASSWORD=os.getenv("EMAIL_PASSWORD"),
#     MAIL_FROM=  os.getenv("EMAIL"),
#     MAIL_PORT=587,
#     MAIL_SERVER="smtp.gmail.com",
#     MAIL_TLS=True,
#     MAIL_SSL=False,
# )

# # FastMail instance
# fastmail = FastMail(mail_config)


# async def get_mailer():
#     return fastmail


# async def send_email(
#     to: str ,
#     subject:str,
#     message: str,
#     mailer: FastMail = Depends(get_mailer),
# ):
#     try:
#         # Create the email message
#         email_message = Message(
#             subject=subject,
#             recipients=[to],
#             body=message,
#             subtype="html",
#         )
        
#         # Send the email
#         await mailer.send_message(email_message)
#         return {"message": "Email sent successfully"}

#     except Exception as e:
#         return {"message": f"An error occurred: {e}"}