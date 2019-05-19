// created by Tanya Akulich 721702

var time = 0;
var time_w_parallel = 0;
var L_aug = 0;

function drawTable(){
	var tDivision       = parseInt(document.getElementById('division').value);
	var tSum            = parseInt(document.getElementById('sum').value);
	var tDifference     = parseInt(document.getElementById('difference').value);
	var tMultiplication = parseInt(document.getElementById('multiplication').value);
	var tComparison     = parseInt(document.getElementById('comparison').value);
	var tModule         = parseInt(document.getElementById('module').value);
	var tSquaring       = parseInt(document.getElementById('squaring').value);

	var numberOfProcessorElements = parseInt(document.getElementById('processorElements').value);

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

	var AMatrix = [];
	var BMatrix = [];
	var EMatrix = [];
	var GMatrix = [];

  var CMatrix = [];

  setMatrix(pSize, mSize, tableA, AMatrix);
  setMatrix(mSize, qSize, tableB, BMatrix);
  setMatrix(1, mSize, tableE, EMatrix);
  setMatrix(pSize, qSize, tableG, GMatrix);

  setCMatrix(pSize, qSize, mSize, tableC, CMatrix, AMatrix, BMatrix, EMatrix, GMatrix, tDivision, tSum, tDifference, tMultiplication, tComparison, tModule, tSquaring, numberOfProcessorElements);

	document.getElementById('time').innerHTML = "time = " + Math.ceil(time/numberOfProcessorElements);

	document.getElementById('Ky').innerHTML = "Ky = " + time_w_parallel/time;
	document.getElementById('e').innerHTML = "e = " + time_w_parallel/(time * numberOfProcessorElements);
	document.getElementById('D').innerHTML = "D = " + time * mSize * pSize * qSize/L_aug;
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

function setCMatrix(xSize, ySize, mSize, table, matrix, AMatrix, BMatrix, EMatrix, GMatrix, tDivision, tSum, tDifference, tMultiplication, tComparison, tModule, tSquaring, numberOfProcessorElements) {
  for (let rowNumber = 0; rowNumber < ySize; rowNumber++) {
    let row = table.insertRow(rowNumber);
		matrix[rowNumber] = [];
    for (let columnNumber = 0; columnNumber < xSize; columnNumber++) {
      let cell = row.insertCell(-1);
      matrix[rowNumber][columnNumber] = Math.round(getValueForCMatrix(AMatrix, BMatrix, GMatrix, EMatrix, mSize, rowNumber, columnNumber, tDivision, tSum, tDifference, tMultiplication, tComparison, tModule, tSquaring, numberOfProcessorElements) * 1000) / 1000;
      cell.innerHTML = matrix[rowNumber][columnNumber];
    }
  }
}

function setFMatrix(AMatrix, BMatrix, EMatrix, zSize, matrix) {
  for (let yNumber = 0; yNumber < AMatrix.length; yNumber++) {
		matrix[yNumber] = [];
    for (let xNumber = 0; xNumber < BMatrix[0].length; xNumber++) {
      matrix[yNumber][xNumber] = [];
      for (let zNumber = 0; zNumber < zSize; zNumber++) {
        matrix[yNumber][xNumber][zNumber] = fValueCalculation(AMatrix, BMatrix, EMatrix, yNumber, xNumber, zNumber);
      }
    }
  }
  return matrix;
}

function setDMatrix(AMatrix, BMatrix, zSize, matrix) {
  for (let yNumber = 0; yNumber < AMatrix.length; yNumber++) {
    matrix[yNumber] = [];
    for (let xNumber = 0; xNumber < BMatrix[0].length; xNumber++) {
      matrix[yNumber][xNumber] = [];
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

function fValueCalculation(AMatrix, BMatrix, EMatrix, i, j, k) {
  return (1 - AMatrix[i][k]) * (2 * EMatrix[0][k] - 1) * EMatrix[0][k] + (1 - BMatrix[k][j]) * (1 + 4 * (1 - AMatrix[i][k]) - 2 * EMatrix[0][k]) * (1 - EMatrix[0][k]);
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

function getValueForCMatrix(AMatrix, BMatrix, GMatrix, EMatrix, mSize, j, i, tDivision, tSum, tDifference, tMultiplication, tComparison, tModule, tSquaring, numberOfProcessorElements){
	var n_temp = numberOfProcessorElements;
  var value = 0;
  let fMatrix = setFMatrix(AMatrix, BMatrix, EMatrix, mSize, []);
  let dMatrix = setDMatrix(AMatrix, BMatrix, mSize, []);

  for (let k = 0; k <= i; k++){
    value += sequenceMultiplication(fMatrix[i][j], k) * (3 * GMatrix[i][j] - 2) * GMatrix[i][j] + (1 - multiplicationOfDifferenceSequences(1, dMatrix[i][j], k) + (4 * sequenceMultiplication(fMatrix[i][j], k) * multiplicationOfDifferenceSequences(1, dMatrix[i][j], k) - 3 * multiplicationOfDifferenceSequences(1, dMatrix[i][j], k)) * GMatrix[i][j]) * (1 - GMatrix[i][j])
  }


	// for(var i = 0; i < mSize; i++){
	// 	if(Math.pow(AMatrix[r][i], 2) > Math.abs(AMatrix[rowNumber][i] * BMatrix[i][columnNumber])){
	// 		value += Math.pow(AMatrix[rowNumber][i], 2) - Math.abs(AMatrix[rowNumber][i] * BMatrix[i][columnNumber]);
	// 		time_w_parallel += tSquaring*2 + tComparison + tModule*2 + tMultiplication*2 + tSum + tDifference;
	// 		if(n_temp != numberOfProcessorElements && numberOfProcessorElements!= 1) {
	// 			time += tSquaring + tComparison + tModule + tMultiplication + tSum;
	// 			L_aug += tSquaring + tComparison*2 + tModule + tMultiplication*2 + tSum*2;
	// 			if(n_temp == 0) {
	// 				n_temp = numberOfProcessorElements;
	// 				}
	// 			else {
	// 				n_temp--;
	// 				}
	// 			}
	// 		else {
	// 			n_temp--;
	// 			time += tSquaring*2 + tComparison + tModule*2 + tMultiplication*2 + tSum + tDifference;
	// 			L_aug += tSquaring*2 + tComparison*2 + tModule*2 + tMultiplication*2*2 + tSum*2 + tDifference*2;
	// 		}
	// 		continue;
	// 	}
	// 	else {
	// 		if(BMatrix[i][columnNumber] == 0 && i != 0){
	// 			value += AMatrix[rowNumber][i];
	// 			time_w_parallel += tComparison + tSum;
	// 			if(n_temp != numberOfProcessorElements && numberOfProcessorElements!= 1) {
	// 				time += tComparison;
	// 				L_aug += tComparison*2;
	// 				n_temp--;
	// 			}
	// 			else {
	// 				if(n_temp == 0) n_temp = numberOfProcessorElements;
	// 				time += tComparison + tSum;
	// 				L_aug += tComparison*2 + tSum*2;
	// 			}
	// 			continue;
	// 		}
	// 		else {
	// 			value += Math.pow(AMatrix[rowNumber][i], 2) / Math.abs(BMatrix[i][columnNumber]);
	// 			time_w_parallel += tSquaring + tModule + tSum;
	// 			if(n_temp != numberOfProcessorElements && numberOfProcessorElements != 1) {
	// 				time += tSum;
	// 				L_aug += tSum*2;
	// 			}
	// 			else {
	// 				time += tSquaring + tModule + tSum;
	// 				L_aug += tSquaring + tModule + tSum*2;
	// 				if(n_temp == 0) n_temp = numberOfProcessorElements;
	// 			}
	// 		}
	// 	}
	// }

	return value;
}
