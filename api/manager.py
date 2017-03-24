from flask_script import Manager, Server
from src import app

manager = Manager(app)
manager.add_command("runserver", Server('0.0.0.0', port=3001))

Application = app

if __name__ == '__main__':
    # manager.run()
    app.run(debug=True, host='0.0.0.0', port=3001)