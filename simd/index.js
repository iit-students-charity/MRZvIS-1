//Автор Вабищевич Евгений 621702

var time = 0;
var time_w_parallel = 0;
var L_aug = 0;

function drawTable(){

	var t_div = parseInt(document.getElementById('division').value);
	var t_sum = parseInt(document.getElementById('sum').value);
	var t_min = parseInt(document.getElementById('difference').value);
	var t_mult = parseInt(document.getElementById('multiplication').value);
	var t_com = parseInt(document.getElementById('comparison').value);
	var t_modul = parseInt(document.getElementById('module').value);
	var t_squ = parseInt(document.getElementById('squaring').value);

	var n = parseInt(document.getElementById('processorElement').value);

	var table_A = document.getElementById('aMatrix');
    table_A.innerHTML = "";
    var table_B = document.getElementById('bMatrix');
    table_B.innerHTML = "";
    var table_C = document.getElementById('cMatrix');
    table_C.innerHTML = "";

	var m = parseInt(document.getElementById('mInput').value);
	document.getElementById('m').innerHTML = "<br>m = " + m;

	var p = parseInt(document.getElementById('pInput').value);
	document.getElementById('p').innerHTML = "<br>p = " + p;

	var q = parseInt(document.getElementById('qInput').value);
	document.getElementById('q').innerHTML = "<br>q = " + q;

	var A = [];
	var B = [];
	var C = [];

	for (var r = 0; r < p; r++) {
        var row = table_A.insertRow(r);
		A[r] = [];
        for (var c = 0; c < m; c++) {
            var cell = row.insertCell(-1);
			A[r][c] = Math.round(getRandom(-1, 1) * 1000) / 1000;
            cell.innerHTML = A[r][c];
        }
    }

	for (var r = 0; r < m; r++){
		var row = table_B.insertRow(r);
		B[r] = [];
		for (var c = 0; c < q; c++){
			var cell = row.insertCell(-1);
			B[r][c] = Math.round(getRandom(-1, 1) * 1000) / 1000;
			cell.innerHTML = B[r][c];
		}
	}

	for (var r = 0; r < p; r++){
		var row = table_C.insertRow(r);
		C[r] = [];
		for (var c = 0; c < q; c++){
			var cell = row.insertCell(-1);
			C[r][c] = Math.round(getC_Value(A, B, m, r, c, t_div, t_sum, t_min, t_mult, t_com, t_modul, t_squ, n) * 1000) / 1000;
			cell.innerHTML = C[r][c];
		}
	}
	document.getElementById('time').innerHTML = "time = " + Math.ceil(time/n);

	document.getElementById('Ky').innerHTML = "Ky = " + time_w_parallel/time;
	document.getElementById('e').innerHTML = "e = " + time_w_parallel/(time * n);
	document.getElementById('D').innerHTML = "D = " + time * m * p * q/L_aug;
}

function getRandomInt(min, max){
	return Math.floor(Math.random() * (max - min + 1)) + min;
} //Автор http://javascript.ru/math.random

function getRandom(min, max){
  return Math.random() * (max - min) + min;
} //Автор http://javascript.ru/math.random

function getC_Value(A, B, m, r, c, t_div, t_sum, t_min, t_mult, t_com, t_modul, t_squ, n){
	var n_temp = n;
	var value = 0;
	for(var i = 0; i < m; i++){
		if(Math.pow(A[r][i], 2) > Math.abs(A[r][i] * B[i][c])){
			value += Math.pow(A[r][i], 2) - Math.abs(A[r][i] * B[i][c]);
			time_w_parallel += t_squ*2 + t_com + t_modul*2 + t_mult*2 + t_sum + t_min;
			if(n_temp != n && n!= 1) {
				time += t_squ + t_com + t_modul + t_mult + t_sum;
				L_aug += t_squ + t_com*2 + t_modul + t_mult*2 + t_sum*2;
				if(n_temp == 0) {
					n_temp = n;
					}
				else {
					n_temp--;
					}
				}
			else {
				n_temp--;
				time += t_squ*2 + t_com + t_modul*2 + t_mult*2 + t_sum + t_min;
				L_aug += t_squ*2 + t_com*2 + t_modul*2 + t_mult*2*2 + t_sum*2 + t_min*2;
			}
			continue;
		}
		else {
			if(B[i][c] == 0 && i != 0){
				value += A[r][i];
				time_w_parallel += t_com + t_sum;
				if(n_temp != n && n!= 1) {
					time += t_com;
					L_aug += t_com*2;
					n_temp--;
				}
				else {
					if(n_temp == 0) n_temp = n;
					time += t_com + t_sum;
					L_aug += t_com*2 + t_sum*2;
				}
				continue;
			}
			else {
				value += Math.pow(A[r][i], 2) / Math.abs(B[i][c]);
				time_w_parallel += t_squ + t_modul + t_sum;
				if(n_temp != n && n != 1) {
					time += t_sum;
					L_aug += t_sum*2;
				}
				else {
					time += t_squ + t_modul + t_sum;
					L_aug += t_squ + t_modul + t_sum*2;
					if(n_temp == 0) n_temp = n;
				}
			}
		}
	}

	return value;
}
