var convertPitch = function(strPitch) {
	var letter = strPitch.substr(0, 1);
	var octave = strPitch.substr(1, 1);
	var letters = {'c':0, 'd':2, 'e':4, 'f':5, 'g':7, 'a':9, 'b':11};
	var letterPitch = letters[letter];
	return 12 + 12 * octave + letterPitch;
};
var process = function(rezult, expr, time) {
    if (expr.tag == 'note') {
        rezult.push({tag:'note', pitch:convertPitch(expr.pitch), 
                     start:time, dur: expr.dur});
        return time + expr.dur;
    } else if (expr.tag == 'repeat') {
    	for (var i=0;i<expr.count;i++)
	    	time += process(rezult, expr.section, time);
	    return time;
    } else if (expr.tag == 'rest') {
    	return time + expr.duration;
    } else if (expr.tag=='seq'){
        return process(rezult, expr.right, process(rezult, expr.left, time));
    }else if (expr.tag=='par'){
        var timeLeft = process(rezult, expr.left, time);
        var timeRight = process(rezult, expr.right, time);
        return Math.max(timeLeft, timeRight);
    }
};
var compile = function (musexpr) {
    // your code here
    var rez = [];
    process(rez, musexpr, 0);
    return rez;
};
var melody_mus = 
    { tag: 'seq',
      left: 
       { tag: 'seq',
         left: { tag: 'note', pitch: 'a4', dur: 250 },
         right: { tag: 'note', pitch: 'b4', dur: 250 } },
      right:
       { tag: 'seq',
         left: { tag: 'note', pitch: 'c4', dur: 500 },
         right: { tag: 'note', pitch: 'd4', dur: 500 } } };

console.log(melody_mus);
console.log(compile(melody_mus));