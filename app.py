from flask import Flask, render_template, request, jsonify, url_for, redirect

DEV = True
app = Flask(__name__)

# @app.route('/', methods=['GET','POST'])
# def landing():
#     if request.method == 'POST':
#         cityID = str(request.form.get('cityID')).replace(" ","+")
#         return redirect(url_for('kiosk', cityID=cityID))
#     return render_template('landing.html')

@app.route('/')
def selector():
    return render_template('selector.html')
    
@app.route('/kiosk')
def kiosk():
    cityID = request.args.get('cityID', None)
    return render_template('kiosk.html', cityID=cityID)

@app.route('/stand')
def stand():
    cityID = request.args.get('cityID', None)
    return render_template('stand.html', cityID=cityID)

@app.route('/stack')
def stack():
    cityID = request.args.get('cityID', None)
    return render_template('stack.html', cityID=cityID)

# @app.route('/testing')
# def testing():
#     return render_template('testing.html')

if __name__ == '__main__':
    if DEV:
        app.run(host="127.0.0.1", port=6464, debug=True)
    else:
        app.run(host='0.0.0.0', debug=True)


