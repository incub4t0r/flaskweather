from flask import Flask, render_template, request, jsonify, url_for, redirect, send_file
import os

ROOT = os.path.dirname(os.path.abspath(__file__))
app = Flask(__name__)

day_map = {}
night_map = {}

def preprocess():
    global day_map, night_map
    with open(os.path.join(ROOT, 'preprocess', 'day_map.txt')) as f:
        content = f.readlines()
    day_map = {x.strip().split("=")[0]: x.strip().split("=")[1] for x in content}

    with open(os.path.join(ROOT, 'preprocess', 'night_map.txt')) as f:
        content = f.readlines()
    night_map = {x.strip().split("=")[0]: x.strip().split("=")[1] for x in content}

@app.route('/')
def selector():
    return render_template('selector.html')
    
@app.route('/kiosk')
def kiosk():
    cityID = request.args.get('cityID', None)
    return render_template('kiosk.html', cityID=cityID)

# @app.route('/stand')
# def stand():
#     cityID = request.args.get('cityID', None)
#     return render_template('stand.html', cityID=cityID)

# @app.route('/stack')
# def stack():
#     cityID = request.args.get('cityID', None)
#     return render_template('stack.html', cityID=cityID)


@app.route('/icon', methods=["GET"])
def icon():
    # # read in the data from the get request
    req_icon = request.args.get('req_icon', None)
    req_time = request.args.get('req_icon_time', None)
    response_icon = 'climacon-'
    # check if the icon is in the day or night map
    try:
        if req_time == 'day' and req_icon in day_map:
            response_icon += day_map[req_icon]
        elif req_time == 'night' and req_icon in night_map:
            response_icon += night_map[req_icon]
    except Exception as e:
        print(e)
        response_icon = "climacon"
    # print(response_icon)
    return jsonify({'icon': response_icon })


# @app.route('/testing')
# def testing():
#     return render_template('testing.html')

if __name__ == '__main__':
    preprocess()
    app.run(host="0.0.0.0", port=6464, debug=True)


