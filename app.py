from flask import Flask, render_template, request, jsonify, url_for, redirect

app = Flask(__name__)

@app.route('/', methods=['GET','POST'])
def landing():
    if request.method == 'POST':
        zipID = request.form.get('zipID')
        return redirect(url_for('kiosk', zipID=zipID))
    return render_template('landing.html')

@app.route('/kiosk')
def kiosk():
    zipID = request.args.get('zipID', None)
    return render_template('index.html', zipID=zipID)

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)

