// Created by Tanya Akulich, group 721703
// Functions compute, summBinaryNums and front created by Stepan Ryzhevich, group 621701

class Conveyor {
  constructor(vectorA, vectorB, timer) {
    this.vectorA = vectorA,
    this.vectorB = vectorB;
    this.timer = timer;
  }

  run () {
    new InputChecker(this.vectorA, this.vectorB, this.timer)
    var arrayA = this.vectorA.split(',');
    var arrayB = this.vectorB.split(',');

    var pairNumber = arrayB.length;

    clearTable();
    createTable(pairNumber);

    for (var num = 0; num < pairNumber; num++) {
      new BinaryComputing(arrayA[num], arrayB[num], num).compute();
    }

    fillTable(pairNumber, arrayA, arrayB, this.timer);
  }
}

class InputChecker {
  static get VECTOR_REG_EXP() {
    return /(\d){1,2}(,( )*(\d){1,2})*/ig;
  }

  static get TIMER_REG_EXP() {
    return /^(\d)+$/ig;
  }

  static get MIN_VALUE() {
    return 0;
  }

  static get MAX_VALUE() {
    return 10;
  }

  constructor(vectorA, vectorB, timer) {
    this.vectorA = vectorA,
    this.vectorB = vectorB;
    this.timer = timer;
    this.inputCheck();
  }

  inputCheck() {
    var arrayA = this.vectorA.split(',');
    var arrayB = this.vectorB.split(',');

    if (!this.matchesRegularExps()) {
      alert('Invalid input');
      return;
    }

    if (!this.compareVectorsLengths(arrayA, arrayB)) {
      alert('You have entered different amount of pairs');
      return;
    }

    if (this.exitOfDiapason(arrayA) && this.exitOfDiapason(arrayB)) {
      alert('Enter numbers from 0 to 10');
      return;
    }
  }

  matchesRegularExps() {
    return (this.isInputValid(this.vectorA, InputChecker.VECTOR_REG_EXP) &&
      this.isInputValid(this.vectorB, InputChecker.VECTOR_REG_EXP) &&
      this.isInputValid(this.timer, InputChecker.TIMER_REG_EXP) &&
      this.timer)
  }

  isInputValid(inputToCheck, regExp) {
    return (inputToCheck.match(regExp) != null);
  }

  compareVectorsLengths (arrayA, arrayB) {
    return (arrayB.length == arrayA.length)
  }

  exitOfDiapason (array) {
    return !(InputChecker.MIN_VALUE < Math.min(...array) && InputChecker.MAX_VALUE) > Math.max(...array);
  }
}

function conveyorInit() {
  let vectorA = document.getElementById('numberA').value;
  let vectorB = document.getElementById('numberB').value;
  let timer = document.getElementById('timer').value;
  new Conveyor(vectorA, vectorB, timer).run();
}

// Tanslate number into binary four bit, calculate part sums and set them into row
class BinaryComputing {
  static get DIGITS() {
    return 4;
  }

  static get STEPS() {
    return 7;
  }

  static get ZERO() {
    return "0";
  }

  constructor(inputNumberA, inputNumberB, pair) {
    this.inputNumberA = +inputNumberA,
    this.inputNumberB = +inputNumberB;
    this.numberA = this.inputNumberA.toString(2)
    this.numberB = this.inputNumberB.toString(2)
    this.pair = pair;
    this.sum = "0000";
    this.retult = 0;
  }
// Functions compute, summBinaryNums and front created by Stepan Ryzhevich, group 621701

  compute() {
    this.numberA = this.makeFourBit(this.numberA);
    this.numberB = this.makeFourBit(this.numberB);

    for (var bitsOfB = BinaryComputing.DIGITS - 1; bitsOfB >= 0; bitsOfB--) {
      var partProd = BinaryComputing.ZERO;
      var bi = this.numberB.charAt(bitsOfB);

      if (+bi) {
        partProd = this.multiply(this.numberA);
      } else {
        partProd = this.setToZero();
      }

      document.getElementById((2 * (3 - bitsOfB) + 1 + this.pair) + '.' + (2 * (3 - bitsOfB) + 2)).innerHTML = '<b>A</b> = ' + this.numberA + '</br><b>B</b> = ' + this.numberB + '</br><b>bit[' + (3 - bitsOfB) + ']= </b>' + bi + '</br><b>A * b[' + (3-bitsOfB) + '] = </b>' + partProd;

      var partSum= "";
      partSum = summBinaryNums(this.sum, partProd);
      this.sum = this.shift(partSum);

      document.getElementById((2 * (3 - bitsOfB) + 2 + this.pair) + '.' + (2 * (3 - bitsOfB) + 3)).innerHTML += '<div align="right"><b>PS' + ((3 - bitsOfB) + 1) + ': </b>' + partSum + '<br><br><b> S' + ((3 - bitsOfB) + 1) + ': </b>' + this.sum + "</div>";
    }

    document.getElementById((BinaryComputing.STEPS + 1 + this.pair) + '.' + 10).innerHTML = '<b>Result: </br></b>' + parseInt(this.numberA, 2) + ' * ' + parseInt(this.numberB, 2) + ' = <br>' + this.sum + '<sub>2</sub> = ';

    this.result = parseInt(this.sum, 2);

    document.getElementById((BinaryComputing.STEPS + 1 + this.pair) + '.' + 10).innerHTML += this.result + '<sub>10</sub>';
  }

  // binary multiply
  multiply(number){
    var zero = BinaryComputing.ZERO;
    var fourBitted = number;
    if (number.length < BinaryComputing.DIGITS * 2) {
      for (var bit = 0; bit < (BinaryComputing.DIGITS * 2 - 1) - number.length; bit++)
        zero += BinaryComputing.ZERO;
      fourBitted = fourBitted + zero;
    }
    return fourBitted;
  }

  // push four zeros to binary num
  makeFourBit(number) {
    var zero = BinaryComputing.ZERO;
    var fourBitted = number;
    if (number.length < BinaryComputing.DIGITS) {
      for (var bit = 0; bit < (BinaryComputing.DIGITS - 1) - number.length; bit++)
        zero += "0";
      fourBitted = zero + fourBitted;
    }
    return fourBitted;
  }

  // setting number to binaty zero
  setToZero() {
    var tempS = BinaryComputing.ZERO;
    for (var i = 0; i < BinaryComputing.STEPS; i++){
      tempS += BinaryComputing.ZERO;
    }
    return tempS;
  }

  // Shit binary number right
  shift(number) {
    number = BinaryComputing.ZERO + number;
    number = number.substring(0, number.length - 1)
    return number;
  }
}

// Set origian (decart) numbs
function addOriginalNums(pairNumber, arrayA, arrayB) {
  var amount = pairNumber - 1;
  for (var i = 0; i < amount; i++) {
    document.getElementById(1 + i + ".1").innerHTML = '<b>A: </b>' + arrayA[i] + '; </br><b>B: </b>' + arrayB[i] + '; </br> ';
  }

  document.getElementById(1 + amount + ".1").innerHTML = '<b>A</b> = ' + arrayA[amount] + '; </br> <b>B</b> = ' + arrayB[amount];
}

// Set timer
function addTime(pairNumber, timer) {
  for (var i = 0; i < (pairNumber + BinaryComputing.STEPS); i++) {
    document.getElementById(1 + i + ".1").innerHTML += '</br><b>Time: </b>' + (1 + i) * timer;
  }
}

// clear table and set ititail value
function clearTable() {
  var body = document.querySelector("body"),
    table = document.querySelector("table");

  if (table != null)
    document.body.removeChild(table);

  var hTag = document.getElementById("reduction");
  hTag.innerHTML = "S - sum, PS - partial sum";
}

// create table with calculated values
 function createTable(rows) {
  var body = document.querySelector("body"),
    table = document.querySelector("table"),
    height = 60,
    width = 1500,
    columns = 10,
    rows = BinaryComputing.STEPS + rows,
    firstTable = document.querySelector("table");

  table = document.createElement("table");
  table.setAttribute("width", width);
  table.setAttribute("border", "1px");
  table.setAttribute("bordercolor", "black");
  table.setAttribute("cellpadding", "6");
  table.setAttribute("align", "center");

  var tableRow = document.createElement("tr");
  var tableHeader = document.createElement("th");
  var text = document.createTextNode('Number');
  tableHeader.appendChild(text);
  tableRow.appendChild(tableHeader);

  for (var countTable = 0; countTable < BinaryComputing.DIGITS; countTable++) {
    tableHeader = document.createElement("th");
    text = document.createTextNode('A * b[' + countTable + ']');
    tableHeader.appendChild(text);
    tableRow.appendChild(tableHeader);


    tableHeader = document.createElement("th");
    tableHeader.innerHTML = 'Right shift.</br> Step ' + (countTable + 1);
    tableRow.appendChild(tableHeader);
  }

  tableHeader = document.createElement("th");
  text = document.createTextNode('Result');
  tableHeader.appendChild(text);
  tableRow.appendChild(tableHeader);
  table.appendChild(tableRow);

  for (var i = 0; i < rows; i++) {
    tableRow = document.createElement("tr");
    for (var j = 0; j < columns; j++) {
      var tableData = document.createElement("td");
      tableData.id = ((i + 1) + "." + (j + 1));
      tableRow.appendChild(tableData);
      tableData.setAttribute("height", height);
    }
    table.appendChild(tableRow);
  }

  if (firstTable == null) {
    return body.appendChild(table);
  } else {
    var newTable = body.appendChild(table);
    return document.body.replaceChild(newTable, firstTable);
  }
}

function fillTable(pairNumber, arrayA, arrayB, timer) {
  addOriginalNums(pairNumber, arrayA, arrayB);
  addTime(pairNumber, timer);
}

// binary sum
function summBinaryNums(a, b) {
  if (a == null || +a == 0)
    return b;
  if (b == null || +b == 0)
    return a;

  var pa = a.length - 1;
  var pb = b.length - 1;

  var flag = 0;
  var sb = '';
  while (pa >= 0 || pb >= 0) {
    var va = 0;
    var vb = 0;

    if (pa >= 0) {
      va = a.charAt(pa) == '0' ? 0 : 1;
      pa--;
    }

    if (pb >= 0) {
      vb = b.charAt(pb) == '0' ? 0 : 1;
      pb--;
    }

    var sum = va + vb + flag;
    if (sum >= 2) {
      sb += (sum - 2);
      flag = 1;
    } else {
      flag = 0;
      sb += (sum);
    }
  }

  if (flag == 1) {
    sb += "1";
  }

  var reversed = sb.split('').reverse().join('');

  return reversed;
}
