import json
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


def handler(event: dict, context) -> dict:
    """Отправка заявки с сайта MOONLIGHT на почту nikita@moonlight.su"""

    if event.get('httpMethod') == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400',
            },
            'body': ''
        }

    raw_body = event.get('body', '{}')
    body = json.loads(raw_body) if isinstance(raw_body, str) else (raw_body or {})

    name = body.get('name', '')
    email = body.get('email', '')
    phone = body.get('phone', '')
    message = body.get('message', '')
    company = body.get('company', '')
    package = body.get('package', '')
    source = body.get('source', 'Форма на сайте')

    if not name or not email:
        return {
            'statusCode': 400,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Имя и email обязательны'})
        }

    to_email = 'nikita@moonlight.su'
    from_email = os.environ.get('SMTP_FROM', 'noreply@moonlight.su')
    smtp_host = os.environ.get('SMTP_HOST', 'smtp.yandex.ru')
    smtp_port = int(os.environ.get('SMTP_PORT', '465'))
    smtp_user = os.environ.get('SMTP_USER', to_email)
    smtp_password = os.environ.get('SMTP_PASSWORD', '')

    subject = f'Новая заявка с сайта MOONLIGHT — {name}'

    html_body = f"""
    <html><body style="font-family: Arial, sans-serif; color: #1a1a1a;">
      <h2 style="color: #0072ea;">Новая заявка с сайта MOONLIGHT</h2>
      <table style="border-collapse: collapse; width: 100%;">
        <tr><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Источник:</td><td style="padding: 8px; border-bottom: 1px solid #eee;">{source}</td></tr>
        <tr><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Имя:</td><td style="padding: 8px; border-bottom: 1px solid #eee;">{name}</td></tr>
        <tr><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">E-mail:</td><td style="padding: 8px; border-bottom: 1px solid #eee;">{email}</td></tr>
        <tr><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Телефон:</td><td style="padding: 8px; border-bottom: 1px solid #eee;">{phone or '—'}</td></tr>
        <tr><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Компания:</td><td style="padding: 8px; border-bottom: 1px solid #eee;">{company or '—'}</td></tr>
        <tr><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Тариф:</td><td style="padding: 8px; border-bottom: 1px solid #eee;">{package or '—'}</td></tr>
        <tr><td style="padding: 8px; font-weight: bold; vertical-align: top;">Сообщение:</td><td style="padding: 8px;">{message or '—'}</td></tr>
      </table>
    </body></html>
    """

    msg = MIMEMultipart('alternative')
    msg['Subject'] = subject
    msg['From'] = from_email
    msg['To'] = to_email
    msg.attach(MIMEText(html_body, 'html', 'utf-8'))

    with smtplib.SMTP_SSL(smtp_host, smtp_port) as server:
        server.login(smtp_user, smtp_password)
        server.sendmail(from_email, to_email, msg.as_string())

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'success': True, 'message': 'Заявка отправлена'})
    }