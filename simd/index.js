// created by Tanya Akulich 721703

let timeInParallelCalculation = 0;
let timeInSequentialCalculation = 0;
let operationTime = 0;
let numberOfUsedProcessorElements = 0;

let tDivision;
let tSum;
let tDifference;
let tMultiplication;
let numberOfProcessorElements;

let rang = 0;
let Lavg = 0;


function drawTable(){
	var tableA = document.getElementById('aMatrix');
  tableA.innerHTML = "";

  var tableB = document.getElementById('bMatrix');
  tableB.innerHTML = "";

	var tableE = document.getElementById('eMatrix');
  tableE.innerHTML = "";

  var tableG = document.getElementById('gMatrix');
  tableG.innerHTML = "";

  var tableC = document.getElementById('cMatrix');
  tableC.innerHTML = "";

	var mSize = parseInt(document.getElementById('mInput').value);
	document.getElementById('m').innerHTML = "<br>m = " + mSize;

	var pSize = parseInt(document.getElementById('pInput').value);
	document.getElementById('p').innerHTML = "<br>p = " + pSize;

	var qSize = parseInt(document.getElementById('qInput').value);
	document.getElementById('q').innerHTML = "<br>q = " + qSize;

  tDivision       = parseInt(document.getElementById('division').value);
  tSum            = parseInt(document.getElementById('sum').value);
  tDifference     = parseInt(document.getElementById('difference').value);
  tMultiplication = parseInt(document.getElementById('multiplication').value);

  numberOfProcessorElements = parseInt(document.getElementById('processorElements').value);

  setMatrix(pSize, mSize, tableA, AMatrix);
  setMatrix(mSize, qSize, tableB, BMatrix);
  setMatrix(1, mSize, tableE, EMatrix);
  setMatrix(pSize, qSize, tableG, GMatrix);

  fMatrix = setFMatrix(mSize);
  dMatrix = setDMatrix(mSize);

  rang = mSize * (pSize + qSize + 1) + pSize * qSize;
  Lavg = Math.ceil(timeInSequentialCalculation / rang);

	document.getElementById('time').innerHTML = "time = " + timeInParallelCalculation;
	document.getElementById('t1').innerHTML = "time 1 = " + timeInSequentialCalculation;

	document.getElementById('Ky').innerHTML = "Ky = " + timeInSequentialCalculation/ timeInParallelCalculation;
	document.getElementById('e').innerHTML = "e = " + timeInSequentialCalculation/ (timeInParallelCalculation * numberOfProcessorElements);
	document.getElementById('D').innerHTML = "D = " + timeInParallelCalculation / Lavg;
	document.getElementById('r').innerHTML = "r = " + rang;

  rang = 0;
  Lavg = 0;
  timeInParallelCalculation = 0;
  timeInSequentialCalculation = 0;
  operationTime = 0;
  numberOfUsedProcessorElements = 0;
}

function setMatrix(xSize, ySize, table, matrix) {
  for (let rowNumber = 0; rowNumber < xSize; rowNumber++) {
    let row = table.insertRow(rowNumber);
		matrix[rowNumber] = [];
    for (let columnNumber = 0; columnNumber < ySize; columnNumber++) {
      let cell = row.insertCell(-1);
      matrix[rowNumber][columnNumber] = Math.round(getRandom(-1, 1) * 1000) / 1000;
      cell.innerHTML = matrix[rowNumber][columnNumber];
    }
  }
}

function setCMatrix(xSize, ySize, mSize, table, matrix) {
  for (let rowNumber = 0; rowNumber < xSize; rowNumber++) {
    let row = table.insertRow(rowNumber);
    matrix[rowNumber] = [];
    for (let i = 0; i <= xSize; i++) {
      for (let j = 0; j < 6 * i; j++) {
        setCalculationTime('multiplication');
      }
    }
    resetTimer();
    for (let columnNumber = 0; columnNumber < ySize; columnNumber++) {
      let cell = row.insertCell(-1);
      matrix[rowNumber][columnNumber] = Math.round(getValueForCMatrix(columnNumber, rowNumber) * 1000) / 1000;
      cell.innerHTML = matrix[rowNumber][columnNumber];
    }
  }
}

function resetTimer(){
  numberOfUsedProcessorElements = 0;
  operationTime = 0;
}

function setFMatrix(zSize) {
  let matrix = []
  for (let yNumber = 0; yNumber < AMatrix.length; yNumber++) {
		matrix[yNumber] = [];
    for (let xNumber = 0; xNumber < BMatrix[0].length; xNumber++) {
      matrix[yNumber][xNumber] = [];
      for (let i = 0; i < 4; i++) {
        for (let j = 0; j < zSize; j++) {
          setCalculationTime('multiplication');
        }
      }
      resetTimer();
      for (let i = 0; i < zSize; i++) {
        setCalculationTime('difference');
      }
      resetTimer();
      for (let i = 0; i < zSize; i++) {
        setCalculationTime('sum');
      }
      resetTimer();
      for (let i = 0; i < zSize; i++) {
        for (let j = 0; j < 2; j++) {
          setCalculationTime('division');
        }
      }
      resetTimer();
      for (let zNumber = 0; zNumber < zSize; zNumber++) {
        setCalculationTime('division');
        setCalculationTime('division');
      }
      forsTimeIncrease();
      for (let zNumber = 0; zNumber < zSize; zNumber++) {
        setCalculationTime('multiplication');
        setCalculationTime('multiplication');
        setCalculationTime('multiplication');
        setCalculationTime('multiplication');
      }
      forsTimeIncrease();
      for (let zNumber = 0; zNumber < zSize; zNumber++) {
        setCalculationTime('difference');
      }
      forsTimeIncrease();
      for (let zNumber = 0; zNumber < zSize; zNumber++) {
        setCalculationTime('sum');
      }
      forsTimeIncrease();
      for (let zNumber = 0; zNumber < zSize; zNumber++) {
        matrix[yNumber][xNumber][zNumber] = fValueCalculation(AMatrix, BMatrix, EMatrix, yNumber, xNumber, zNumber);
      }
    }
  }
  return matrix;
}

function setDMatrix(zSize) {
  let matrix = []
  for (let yNumber = 0; yNumber < AMatrix.length; yNumber++) {
    matrix[yNumber] = [];
    for (let xNumber = 0; xNumber < BMatrix[0].length; xNumber++) {
      matrix[yNumber][xNumber] = [];
      for (let i = 0; i < zSize; i++) {
        setCalculationTime('multiplication');
      }
      resetTimer();
      for (let zNumber = 0; zNumber < zSize; zNumber++) {
        matrix[yNumber][xNumber][zNumber] = AMatrix[yNumber][zNumber] * BMatrix[zNumber][xNumber];
      }
    }
  }
  return matrix;
}

function getRandom(min, max){
  return Math.random() * (max - min) + min;
} //Автор http://javascript.ru/math.random

function controlNumberOfUsedProcessorElements(){
  if (numberOfUsedProcessorElements == numberOfProcessorElements){
    timeInParallelCalculation += 1;
    resetTimer();
  }
}

function forsTimeIncrease(){
  timeInParallelCalculation += operationTime;
  numberOfUsedProcessorElements = 0;
  operationTime = 0;
}

function setCalculationTime(operation){
  switch(operation){
    case 'division':
      timeInSequentialCalculation += tDivision;
      // operationTime = operationTime < tDivision ? tDivision : operationTime;
      numberOfUsedProcessorElements += 1;
      controlNumberOfUsedProcessorElements();
      break;
    case 'multiplication':
      timeInSequentialCalculation += tMultiplication;
      // operationTime = operationTime < tMultiplication ? tMultiplication : operationTime;

      numberOfUsedProcessorElements += 1;
      controlNumberOfUsedProcessorElements();
      break;
    case 'difference':
      timeInSequentialCalculation += tDifference;
      // operationTime = operationTime < tDifference ? tDifference : operationTime;
      numberOfUsedProcessorElements += 1;
      controlNumberOfUsedProcessorElements();
      break;
    case 'sum':
      timeInSequentialCalculation += tSum;
      // operationTime = operationTime < tSum ? tSum : operationTime;
      numberOfUsedProcessorElements += 1;
      controlNumberOfUsedProcessorElements();
      break;
  }
}

function deltaCalculation(a, b) {
  return b / (1 - a);
}

function fValueCalculation(i, j, k) {
  let ABDelta = deltaCalculation(AMatrix[i][k], BMatrix[k][j]);
  let BADelta = deltaCalculation(BMatrix[k][j], AMatrix[i][k]);

  return ABDelta * (2 * EMatrix[0][k] - 1) * EMatrix[0][k] + BADelta * (1 + 4 * ABDelta - 2 * EMatrix[0][k]) * (1 - EMatrix[0][k]);
}

function sequenceMultiplication(sequence, numberOfElements) {
  let result = 1;
  while (numberOfElements) {
    numberOfElements -= 1;
    result *= sequence[numberOfElements];
  }
  return result;
}

function multiplicationOfDifferenceSequences(minuend, sequence, numberOfElements) {
  let result = 1;
  while (numberOfElements) {
    numberOfElements -= 1;
    result *= (minuend - sequence[numberOfElements]);
  }
  return result;
}

function getValueForCMatrix(j, i){
  var value = 0;
  for (let k = 0; k <= i; k++){
    value += sequenceMultiplication(fMatrix[i][j], k) * (3 * GMatrix[i][j] - 2) * GMatrix[i][j] + (1 - multiplicationOfDifferenceSequences(1, dMatrix[i][j], k) + (4 * sequenceMultiplication(fMatrix[i][j], k) * multiplicationOfDifferenceSequences(1, dMatrix[i][j], k) - 3 * multiplicationOfDifferenceSequences(1, dMatrix[i][j], k)) * GMatrix[i][j]) * (1 - GMatrix[i][j])
  }
  numberOfUsedProcessorElements = 0;
	return value;
}
