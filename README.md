![](https://github.com/samillamacedo/RemotePLAY/blob/master/RemotePlay.png)

______________________________
Remote control with keypad that uses the arduino platform sending commands through the serial port

![](https://github.com/samillamacedo/RemotePLAY/blob/master/Terminal.gif)


> ## What do you need

* Arduino Uno/Nano/Mega or similar
* Digital infrared receiver
* Remote control
* Jumpers

> ## How to Install - Hardware
1. Consult infrared receiver datasheet
2. Use the jumpers to connect the infrared receiver to the arduino plataform
![](https://github.com/samillamacedo/RemotePLAY/blob/master/Circuit.png)

> ## How to Install - Software
#### Arduino
1. Install Arduino IDE
2. Connect Arduino to PC/Notebook
3. On Tolls > Ports select the Arduino port
4. Run the file RemotePLAY.ino
5. Open the Serial Monitor and press the buttons on the remote control
6. The code on the Serial Monitor are the buttons id.

#### Node js
1. Install [node.js](https://nodejs.org/en/download/)
2. Open RemotePLAY.js in a text editor
3. Set the port to Arduino port and if you want, set the buttons id
4. On Terminal Install acess the folder **RemotePLAY** 
5. run 
---
npm start
---
6. ENJOY IT!
