from flask import Flask, jsonify, redirect, request
from flask_cors import CORS
from flask_cors import cross_origin
import requests
import base64 #Used to encode the client ID and client secret in the proper format for the authorization header. (Spotify)

import time, datetime, calendar
import jwt
from cryptography.hazmat.primitives import serialization

#from authlib.integrations.requests_client import OAuth2Session

import applemusicpy
from applemusicpy import AppleMusic

music_user_token = "AkWM9entFmCQxgutW8C4ioXNZZ4hCzARkhDsB6ziIudmv/KDc7ShVat5flpQQpTBsI8bbSLqUraM8E8ASPEeJeho6x2J0hTJ9xPTwiGApxjuSz1sjta0F93os+Thm97lXH1cCMh84lnSlp72fh2na07jhK+xf3r8Pgx8QLi52AISJAG/uTxYAuySTDtrT17mpg0kG73DOkILl0wLDWQ3Mh15bT7z4dD7y+ISAyic62lbWJt5sw=="

#"https://idmsa.apple.com/IDMSWebAuth/auth?oauth_token=OATTKN8cc36fc2-c4ca-451c-ab63-4b347ac8576c74221ff39bb7a06dbfbca7b079b24ef3467956ee738368cdb9c1b7dca84f43aeea595fe7d31377a8aa48b47cc829620e039a1711b1b6392e026fb3a0e43a98bf8b94c71d9f1134a9837753a4316c99c8585a47"


def getAppleMusic(musicUserToken): #Get the most recently played song from Apple Music
    
    url = "https://api.music.apple.com/v1/me/recent/played/tracks?limit=10&types=songs"
    #url = "https://api.music.apple.com/v1/catalog/us/songs/1613600188"
    developerToken = getDeveloperToken()
    musicToken = musicUserToken #getMusicToken(developerToken)
    print(f'Developer token: {developerToken}')
    print(f'Music token: {musicToken}')

    headers = {
        "Authorization": f"Bearer {developerToken}",
        "Music-User-Token": musicToken
    }

    response = requests.get(url, headers=headers)
    data = response.json()
    print(response.content)
    
    source = data['data'][0]
    #print(source)
    w = source['attributes']['artwork']['width']
    h = source['attributes']['artwork']['height']

    DATA = {
        'id': source['id'],
        'title': source['attributes']['name'],
        'image': source['attributes']['artwork']['url'].format(w=w, h=h),
        'description': source['attributes']['artistName'],
    }
    
    print(DATA)
    return DATA

def getDeveloperToken(): #Generates a Developer Token
    path = "./AuthKey_H5YZQ5ZKZ4.p8"  # Path to private key file
    alg = "ES256"
    key_id = "H5YZQ5ZKZ4"  # 10-character key identifier

    time_now = int(time.time())
    time_exp = int(calendar.timegm((datetime.datetime.now() + datetime.timedelta(days=180)).utctimetuple()))

    with open(path, "rb") as key_file:
        private_key = serialization.load_pem_private_key(
            key_file.read(),
            password=None
        )

    headers = {
	"alg": alg,
	"kid": key_id
    }

    jwt_payload = {
        "iss": "X3392H7G44",
        "iat": time_now,
        "exp": time_exp,
    }

    developer_token = jwt.encode(jwt_payload, private_key, algorithm=alg, headers=headers)
    
    return developer_token

def getMusicToken(devToken): #Generates the Music User Token using the Developer Token
    developer_token = devToken
    team_id = "X3392H7G44"
    key_id = "H5YZQ5ZKZ4"
    path = """-----BEGIN PRIVATE KEY-----
MIGTAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBHkwdwIBAQQgXb4BLJcRFWHkJX63
8IVahBvlGFk5Nnr+YLC7eACT9SCgCgYIKoZIzj0DAQehRANCAATsLE9rLgD7dipN
gf6xPfz4I3t8VINUHxDsaoamcq1z13c1ZOlzCL/WWpiopSnc5mbdMIw8YHNZra/2
XWCjQJ8K
-----END PRIVATE KEY-----"""  # Path to private key file

    
    redirect_uri = "https://localhost:5000/callback"  # Your redirect URL
    
    # Redirect the user to the Apple Music authorization page
    authUrl = f"https://appleid.apple.com/auth/authorize?response_type=code&client_id={team_id}&redirect_uri={redirect_uri}&scope=user-library-read"
    print(authUrl)
    return redirect(authUrl)



def getRecentGames(): # Method to get most recently played game from Steam
    key = "0D836EDE33B2BBFA7AB2EF93DF2FEBFF"
    steamID = "76561199242197802"
    url = f"https://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/?key={key}&steamid={steamID}"

    response = requests.get(url)
    data = response.json()

    game = data['response']['games'][0]
    
    title = game['name']
    image = getGrid(game['appid'])

    DATA = {
        'id': game['appid'],
        'title': title,
        'image': image,
        'description': "This is a game"
    }
    
    return DATA
            
def getGrid(id): # Method to get decent cover art of game
    key = "b067ec1341a4f261e19156d57226ce32"  # Replace with your actual API key
    url = f"https://www.steamgriddb.com/api/v2/grids/steam/{id}"

    headers = {
        "Authorization": f"Bearer {key}"
    }

    response = requests.get(url, headers=headers)
    data = response.json()
    #print(response.content)
    source = data['data'][0]
    image = source['url']
    return image




app = Flask(__name__) # Initialize the Flask application
CORS(app) # and enable CORS

@app.route('/api/Music', methods=['GET']) # Recently played songs endpoint
@cross_origin()
def getMusic():
    #musicUserToken = request.get_json().get('musicUserToken')
    musicUserToken = "AkWM9entFmCQxgutW8C4ioXNZZ4hCzARkhDsB6ziIudmv/KDc7ShVat5flpQQpTBsI8bbSLqUraM8E8ASPEeJeho6x2J0hTJ9xPTwiGApxjuSz1sjta0F93os+Thm97lXH1cCMh84lnSlp72fh2na07jhK+xf3r8Pgx8QLi52AISJAG/uTxYAuySTDtrT17mpg0kG73DOkILl0wLDWQ3Mh15bT7z4dD7y+ISAyic62lbWJt5sw=="

    #musicUserToken = source['musicUserToken']  # Retrieve the Music User Token from the request payload
    #print(source)
    data = getAppleMusic(musicUserToken)
    return jsonify(data)

@app.route('/api/Gaming', methods=['GET']) # Define a route for my REST API endpoint
@cross_origin()
def get_data():
    data = getRecentGames() # Your code to handle the API request and generate the response
    return jsonify(data)


@app.route('/callback', methods=['POST'])
@cross_origin()
def callback():
    data = request.get_json()
    music_user_token = data['musicUserToken']

    # Process the Music User Token on the server-side
    # ...
    # Return a response to the client if needed
    print(music_user_token)

    return jsonify({'message': 'Token received'})


if __name__ == '__main__': #Run the server
    app.run()
