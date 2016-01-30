import requests
import time
from flask import Flask, redirect, request, url_for, render_template, json

app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def hello_world():
	if(request.method == 'GET'):
		return render_template('index.html')
	else:
		return render_template('index.html')

@app.route('/fuel')
def fuel():
	today = time.time()
	lastweek = today - 60*60*24*7;

	endDate = time.strftime("%d%m%y", time.localtime(today))
	startDate = time.strftime("%d%m%y", time.localtime(lastweek))

	print startDate
	print endDate

	#deviceId=27ab3727-d8ae-4589-8b01-35fb6a2dd0cd
	#access_token=r0JWGX9zTL2GfMwAeRoG4JUreSAr
	#https://api.nike.com/v1.0/me/sync/lasttimestamp?deviceId=27ab3727-d8ae-4589-8b01-35fb6a2dd0cd&access_token=r0JWGX9zTL2GfMwAeRoG4JUreSAr

	#Number of Buckets to get the Data in. default: (24 * 60)
	fidelity = 24

	headers = {
		'Accept': 'application/json',
		'Content-Type': 'application/json',
    	'appid': 'fuelband'
	}

	params = {
		'access_token': '', #replace with yours
		'deviceId': '', #replace with yours
		'endDate': endDate,
		'fidelity': fidelity
	}

	data = {
		'protocol': 'https',
		'domain': 'api.nike.com',
		'version': 'v1.0',
		'path': 'me/activities/summary/'+ str(startDate)
	}

	url = data['protocol'] + '://' + data['domain'] + '/' + data['version'] + '/' + data['path']
	print url

	response = requests.get(url, params=params, headers=headers)
	responseText = response.text

	f = open('static/js/fuelBandData.json', 'w')
	json.dump(json.loads(responseText), f, indent=2)
	f.close()
	return responseText

@app.route('/news')
def news():
	country = 'us'
	time = request.args.get('t') #min hour day week
	if(not time):
		time = 'day'
	category = request.args.get('c') #1-News 2-Comedy 3-Tech 4-Sports 5-Business
	if(not category):
		category = '1'

	parameter = country + '-' + time + '-' + category;

	params = {
		'bid' : parameter
	}

	headers = {
		'Accept': 'application/json',
		'Content-Type': 'application/json',
	}

	data = {
		'protocol': 'http',
		'domain' : 'top.io/api/rb.php',
	}

	url = data['protocol'] + '://' + data['domain']

	print url
	print parameter

	response = requests.get(url, params=params, headers=headers)
	responseText = response.text
	f = open('static/js/newsData.json', 'w')
	json.dump(json.loads(responseText), f, indent=2)
	f.close()
	return responseText


if __name__ == '__main__':
	app.run(debug=True)
