var start;
var end;
var paths = [];

function resetTd(count){
	var count = count || parseInt($("[name=td_count]").val());
	var tbody = $("tbody");
		tbody.html("");
	for(var i=0; i<count; i++){
		var tds = '';
		for(var j=0; j<count; j++){
			tds += getTdHtml(i,j);
		}
		tbody.append('<tr>'+tds+'</tr>');
	}

	function getTdHtml(i,j){
		return '<td id="item_'+(j+1)+'_'+(i+1)+'" title="'+(j+1)+'*'+(i+1)+'" class="normarl" onclick="itemClick(this)">&nbsp;</td>';
	}
}
resetTd();
function itemClick(_this){
	var s =  $("td.start");
	var _this = $(_this);
	var ij = _this[0].id.split("_");
	if(s.length>0){
		_this.attr("class","end");
	} else {
		_this.attr("class","start");
	}
	console.log('x:'+ij[1]+',y:'+ij[2]);	
}

function getAroundItem(item){

}
