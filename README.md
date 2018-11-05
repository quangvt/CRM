# CRM
This is an example of React Native - Learning

# Guide to setup firebase for this sample
1. Create google firebase account

2. Login to console
https://console.firebase.google.com/u/0/

3. Create project

4. Go to Project => Setup authentication method
- Select on left menu => Under group of Develop: select "Authentication"
- Choose tab: "Sign-in method"
- Enable for Provider "Email/Password" => Click button "Save"

5. Go to Project => Create new database
- Select on left menu => Under group of Develop: select "Database"
- Choose "Create Database" => you can choose "start in locked mode" => click "Enable"
- After create database successful. Select "Realtime database"
- Choose tab "Rules". Replace the content with the list below:
START HERE (Not copy this line)
	{				
		"rules": {			
			"users": {		
				"$uid": {	
					".read": "$uid === auth.uid",
					".write": "$uid === auth.uid"
				}	
			}		
		}			
	}
END HERE (Not copy this line)

