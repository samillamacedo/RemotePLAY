const SerialPort = require("serialport");
const robot = require("robotjs");

//arduino serial port
var port = "/dev/cu.wchusbserialfa130"

var serial = new SerialPort(port,{
  baudrate: 9600,
  parser: SerialPort.parsers.readline("\n")
});

serial.on("open", function(){
  console.log("Serial on!");
});

var previousButton = ""
var buttonCount = 0
var timeout = null;

//define buttons
var buttons = [
  new Button("FF6897", ["0", "space", "_"]),
  new Button("FF30CF", ["1", "+", "-", "*", "/"]),
  new Button("FF18E7", ["2", "a", "b", "c"]),
  new Button("FF7A85", ["3", "d", "e", "f"]),
  new Button("FF10EF", ["4", "g", "h", "i"]),
  new Button("FF38C7", ["5", "j", "k", "l"]),
  new Button("FF5AA5", ["6", "m", "n", "o"]),
  new Button("FF42BD", ["7", "p", "q", "r", "s"]),
  new Button("FF4AB5", ["8", "t", "u", "v"]),
  new Button("FF52AD", ["9", "w", "x", "y", "z"]),
  new Button("FFE01F", ["audio_vol_down"]),
  new Button("FFA857", ["audio_vol_up"]),
  new Button("FF02FD", ["right"]),
  new Button("FF22DD", ["left"]),
  new Button("FFC23D", ["f5"]),
  new Button("FF906F", ["escape"]),
]

serial.on("data", function (data){
  // Filter first
  var codigoIR = data.substring(0, 6);
  var button = buttonForCode(codigoIR)
  if (button) {
    if(button != previousButton){
      clearHistory()
    }
    buttonCount++
    postergateHistoryClearing()
    select(button)
    previousButton = button
  }
})

function Button(id, actions){
  this.id = id;
  this.actions = actions;
}

Button.prototype.print = function (count){
  // var index = Math.min(count, this.actions.length - 1)
  // var isImpar = (Math.floor(count / this.actions.length) % 2)
  // if (isImpar) {
  //   index = this.actions.length - (count % this.actions.length) - 1
  // }else {
  //   index = count % this.actions.length
  // }
  var index = count % this.actions.length
  var action = this.actions[index]
  robot.keyTap(action);
}

// Encontra botão pelo código
function buttonForCode(codigoIR){
  return buttons.find(({id}) => codigoIR == id)
}

function postergateHistoryClearing() {
  // Limpa timer anterior
  clearTimeout(timeout)

  // Inicia um novo timer para zerar histórico
  timeout = setTimeout(clearHistory, 4000)
}

function select(button){
  // Computa menor index: Actions do button ou do history
  var lastIndex = Math.min(button.actions.length, buttonCount)
  var actionIndex = buttonCount - 1

  if (actionIndex == 0){
    return button.print(0)
  }else {
    // Apaga ultima ação
    robot.keyTap("backspace");
    return button.print(actionIndex)
  }
}
function clearHistory(){
  buttonCount = 0
}
