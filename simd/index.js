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

  var table_C = document.getElementById('cMatrix');
  table_C.innerHTML = "";

	var mSize = parseInt(document.getElementById('mInput').value);
	document.getElementById('m').innerHTML = "<br>m = " + mSize;

	var pSize = parseInt(document.getElementById('pInput').value);
	document.getElementById('p').innerHTML = "<br>p = " + pSize;

	var qSize = parseInt(document.getElementById('qInput').value);
	document.getElementById('q').innerHTML = "<br>q = " + qSize;

	var AMatrix = [];
	var BMatrix = [];
	var CMatix = [];

	for (var r = 0; r < pSize; r++) {
    var row = tableA.insertRow(r);
		AMatrix[r] = [];
        for (var c = 0; c < mSize; c++) {
            var cell = row.insertCell(-1);
        AMatrix[r][c] = Math.round(getRandom(-1, 1) * 1000) / 1000;
            cell.innerHTML = AMatrix[r][c];
        }
    }

	for (var r = 0; r < mSize; r++){
		var row = tableB.insertRow(r);
		BMatrix[r] = [];
		for (var c = 0; c < qSize; c++){
			var cell = row.insertCell(-1);
			BMatrix[r][c] = Math.round(getRandom(-1, 1) * 1000) / 1000;
			cell.innerHTML = BMatrix[r][c];
		}
	}

	for (var r = 0; r < pSize; r++){
		var row = table_C.insertRow(r);
		CMatix[r] = [];
		for (var c = 0; c < qSize; c++){
			var cell = row.insertCell(-1);
			CMatix[r][c] = Math.round(getC_Value(AMatrix, BMatrix, mSize, r, c, tDivision, tSum, tDifference, tMultiplication, tComparison, tModule, tSquaring, numberOfProcessorElements) * 1000) / 1000;
			cell.innerHTML = CMatix[r][c];
		}
	}
	document.getElementById('time').innerHTML = "time = " + Math.ceil(time/numberOfProcessorElements);

	document.getElementById('Ky').innerHTML = "Ky = " + time_w_parallel/time;
	document.getElementById('e').innerHTML = "e = " + time_w_parallel/(time * numberOfProcessorElements);
	document.getElementById('D').innerHTML = "D = " + time * mSize * pSize * q/L_aug;
}

function getRandomInt(min, max){
	return Math.floor(Math.random() * (max - min + 1)) + min;
} //Автор http://javascript.ru/math.random

function getRandom(min, max){
  return Math.random() * (max - min) + min;
} //Автор http://javascript.ru/math.random

function getC_Value(AMatrix, BMatrix, mSize, r, c, tDivision, tSum, tDifference, tMultiplication, tComparison, tModule, tSquaring, numberOfProcessorElements){
	var n_temp = numberOfProcessorElements;
	var value = 0;
	for(var i = 0; i < mSize; i++){
		if(Math.pow(AMatrix[r][i], 2) > Math.abs(AMatrix[r][i] * BMatrix[i][c])){
			value += Math.pow(AMatrix[r][i], 2) - Math.abs(AMatrix[r][i] * BMatrix[i][c]);
			time_w_parallel += tSquaring*2 + tComparison + tModule*2 + tMultiplication*2 + tSum + tDifference;
			if(n_temp != numberOfProcessorElements && numberOfProcessorElements!= 1) {
				time += tSquaring + tComparison + tModule + tMultiplication + tSum;
				L_aug += tSquaring + tComparison*2 + tModule + tMultiplication*2 + tSum*2;
				if(n_temp == 0) {
					n_temp = numberOfProcessorElements;
					}
				else {
					n_temp--;
					}
				}
			else {
				n_temp--;
				time += tSquaring*2 + tComparison + tModule*2 + tMultiplication*2 + tSum + tDifference;
				L_aug += tSquaring*2 + tComparison*2 + tModule*2 + tMultiplication*2*2 + tSum*2 + tDifference*2;
			}
			continue;
		}
		else {
			if(BMatrix[i][c] == 0 && i != 0){
				value += AMatrix[r][i];
				time_w_parallel += tComparison + tSum;
				if(n_temp != numberOfProcessorElements && numberOfProcessorElements!= 1) {
					time += tComparison;
					L_aug += tComparison*2;
					n_temp--;
				}
				else {
					if(n_temp == 0) n_temp = numberOfProcessorElements;
					time += tComparison + tSum;
					L_aug += tComparison*2 + tSum*2;
				}
				continue;
			}
			else {
				value += Math.pow(AMatrix[r][i], 2) / Math.abs(BMatrix[i][c]);
				time_w_parallel += tSquaring + tModule + tSum;
				if(n_temp != numberOfProcessorElements && numberOfProcessorElements != 1) {
					time += tSum;
					L_aug += tSum*2;
				}
				else {
					time += tSquaring + tModule + tSum;
					L_aug += tSquaring + tModule + tSum*2;
					if(n_temp == 0) n_temp = numberOfProcessorElements;
				}
			}
		}
	}

	return value;
}
