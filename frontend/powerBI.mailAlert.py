import smtplib
from email.message import EmailMessage

def send_email():
    msg = EmailMessage()
    msg["Subject"] = "Rapport Power BI Quotidien"
    msg["From"] = "youssefkentari56@gmail.com"  # Remplacez par votre e-mail
    msg["To"] = "youssefkentari48@gmail.com"        # E-mail de l'employé
    msg.set_content("Bonjour,\n\nVeuillez trouver ci-joint le rapport Power BI du jour.\n\nCordialement.")

    # Joindre le fichier PDF
    with open("C:/Users/youss/Documents/Stage OCP/kpi.pdf", "rb") as f:
        file_data = f.read()
        msg.add_attachment(file_data, maintype="application", subtype="pdf", filename="kpi.pdf")

    # Connexion sécurisée au serveur SMTP de Gmail
    with smtplib.SMTP_SSL("smtp.gmail.com", 465) as smtp:
        smtp.login("youssefkentari56@gmail.com", "lzer tbfr pnlc jgiq")  # utilisez le mot de passe d'application ici
        smtp.send_message(msg)

send_email()
