var clicks = 0;
var idClicked = [];
function doClick(e) {
	var id = e.source.id;
	if(idClicked.indexOf(id) == -1){
		var color = '';
		++clicks;
		idClicked.push(id);
	    if(clicks%2==0)
	    	color = 'rgba(0,0,250,0.5)';
    	else
	    	color = 'rgba(250,0,0,0.5)';
	    addColor(id, color);
	    
	    if(clicks >= 5){
	    	verifyVictory(id, color);
	    }
	}
}
function addColor(id, color) {
	switch(id){
		case 'tl' : 
			$.tl.backgroundColor = color;
			break;
		case 'tc' : 
			$.tc.backgroundColor = color;
			break;
		case 'tr' : 
			$.tr.backgroundColor = color;
			break;

		case 'cl' : 
			$.cl.backgroundColor = color;
			break;
		case 'cc' : 
			$.cc.backgroundColor = color;
			break;
		case 'cr' : 
			$.cr.backgroundColor = color;
			break;

		case 'bl' : 
			$.bl.backgroundColor = color;
			break;
		case 'bc' : 
			$.bc.backgroundColor = color;
			break;
		case 'br' : 
			$.br.backgroundColor = color;
			break;
	}
}
function reload(e) {
	clicks = 0;
    idClicked = [];
	var color = "rgba(255,255,255,.4)";
	$.tl.backgroundColor = color;
	$.tc.backgroundColor = color;
	$.tr.backgroundColor = color;

	$.cl.backgroundColor = color;
	$.cc.backgroundColor = color;
	$.cr.backgroundColor = color;

	$.bl.backgroundColor = color;
	$.bc.backgroundColor = color;
	$.br.backgroundColor = color;
}
function newGame(e) {
	reload(e);
	var index = Alloy.createController('index').getView();
	index.open();
}

function winTop(color){
	return $.tl.backgroundColor == color && $.tc.backgroundColor == color && $.tr.backgroundColor == color;
}
function winMid(color){
	return $.cl.backgroundColor == color && $.cc.backgroundColor == color && $.cr.backgroundColor == color;
}
function winBottom(color){
	return $.bl.backgroundColor == color && $.bc.backgroundColor == color && $.br.backgroundColor == color;
}
function winLeft(color){
	return $.tl.backgroundColor == color && $.cl.backgroundColor == color && $.bl.backgroundColor == color;
}
function winCenter(color){
	return $.tc.backgroundColor == color && $.cc.backgroundColor == color && $.bc.backgroundColor == color;
}
function winRight(color){
	return $.tr.backgroundColor == color && $.cr.backgroundColor == color && $.br.backgroundColor == color;
}
function winTlToBr(color){
	return $.tl.backgroundColor == color && $.cc.backgroundColor == color && $.br.backgroundColor == color;
}
function winTrToBl(color){
	return $.tr.backgroundColor == color && $.cc.backgroundColor == color && $.bl.backgroundColor == color;
}

function verifyVictory(id, color){
	var victory;
	switch(id){
		case 'tl' : 
			victory = winLeft(color) || winTop(color) || winTlToBr(color);
			break;
		case 'tc' : 
			victory = winCenter(color) || winTop(color);
			break;
		case 'tr' : 
			victory = winRight(color) || winTop(color) || winTrToBl(color);
			break;

		case 'cl' : 
			victory = winLeft(color) || winMid(color);
			break;
		case 'cc' : 
			victory = winCenter(color) || winMid(color) || winTlToBr(color) || winTrToBl(color);
			break;
		case 'cr' : 
			victory = winRight(color) || winMid(color);
			break;

		case 'bl' : 
			victory = winBottom(color) || winLeft(color) || winTrToBl(color);
			break;
		case 'bc' : 
			victory = winBottom(color) || winCenter(color);
			break;
		case 'br' : 
			victory = winBottom(color) || winRight(color) || winTlToBr(color);
			break;	
	}
	
	if(!victory){
		return;
	}
	var winner = $.redPlayer.text;
	if(color=='rgba(0,0,250,0.5)'){
		winner = $.bluePlayer.text;
	}
	Titanium.UI.createAlertDialog({title:'Vencedor', message:winner}).show();
	reload();

}

var args = arguments[0] || {};
$.redPlayer.text='Jogador Vermelho: ' + args.redPlayer;
$.bluePlayer.text='Jogador Azul: ' + args.bluePlayer;
$.jogo.open();