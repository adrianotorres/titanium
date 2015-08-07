function startGame(e) {
	var redPlayer = $.redPlayer.getValue();
	var bluePlayer = $.bluePlayer.getValue();
	if(redPlayer=='' || bluePlayer ==''){
		Titanium.UI.createAlertDialog({title:'Por Favor', message:'Informe o nome dos dois jogadores'}).show();
		return;
	}
	
	var vwJogo = Alloy.createController('jogo', {redPlayer: redPlayer, bluePlayer: bluePlayer}).getView();
	vwJogo.open();
}
$.index.open();