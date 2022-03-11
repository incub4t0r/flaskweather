from flask import Flask, render_template, request, jsonify, url_for, redirect

app = Flask(__name__)

@app.route('/', methods=['GET','POST'])
def landing():
    if request.method == 'POST':
        cityID = str(request.form.get('cityID')).replace(" ","+")
        return redirect(url_for('kiosk', cityID=cityID))
    return render_template('landing.html')

@app.route('/kiosk')
def kiosk():
    cityID = request.args.get('cityID', None)
    return render_template('index.html', cityID=cityID)

if __name__ == '__main__':
    app.run(host='0.0.0.0')


