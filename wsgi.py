#the entry point for Gunicorn to start the Flask app
import gunicorn
from server import app

if __name__ == '__main__':
  pass  # No need for the app.run() line, as Gunicorn will handle the server initialization