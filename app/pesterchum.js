
var gui = require('nw.gui');
var fs = require("fs");

var dataPath = gui.App.dataPath;
var dataFile = dataPath+"/data.json";

var storage = {};
var settings = storage.settings = {};
var profile = storage.profile = {};

$.holdReady(true);
fs.readFile(dataFile,function(err,json){
	if(err){
		if(err.code === "ENOENT"){
			console.log("No dataFile found.");
			$.holdReady(false);
		}else{
			alert("Filesystem Error\n"+err.message);
		}
	}else{
		try{
			storage = JSON.parse(json);
			settings = storage.settings = storage.settings || {};
			profile = storage.profile = storage.profile || {};
			$.holdReady(false);
		}catch(e){
			alert("User data corrupted! Error!\n"+e.message);
		}
	}
});
var save = function(){
	try{
		var json = JSON.stringify(storage);
		fs.writeFile(dataFile,json,function(err){
			if(err){
				alert("Unable to save data!");
			}else{
				console.log("Data saved.");
			}
		});
	}catch(e){
		alert("Error! Errorrrr!!!!\n"+e.message);
	}
};


//this is temporary?
var mood = "CHUMMY";

$(function(){
	
	var $chums = $("#chums");
	
	var chums = {};

	function addChum(chumhandle){
		var $chum = $('<li class="chum offline"/>')
			.append(
				$('<img class="mood-indicator"/>').attr('src','chum.png'),
				$('<span class="handle"/>').text(chumhandle)
			)
			.appendTo($chums);
		var chum = chums[chumhandle] = {
			handle: chumhandle,
			$handle: $chum,
			IMwindow: null,
		};
	}
	
	addChum("turntechGodhead");
	addChum("ectoBiologist");
	addChum("chosenThree");
	addChum("someoneElse");
	addChum("assHole");
	
	$("#moods .mood").on("click",function(){
		$("#moods .mood").removeClass("selected");
		$(this).addClass("selected");
		mood = $(this).text();
	});
	
	$("#moods .mood").each(function(){
		if($(this).text() === mood){
			$(this).addClass("selected");
		}else{
			$(this).removeClass("selected");
		}
	});
	
	var profileWindow = null;
	$("#chumhandle").on("click",function(){
		if(profileWindow){
			profileWindow.focus();
		}else{
			profileWindow = gui.Window.get(
				window.open("profile.html"),{
					height: 200
				}
			);
			profileWindow.on("closed",function(){
				profileWindow = null;
			});
		}
	});
	
	
	// Create a tray icon
	var tray = new gui.Tray({ title: 'Pesterchum', icon: 'chum-16.png' });

	// Give it a menu
	tray.menu = new gui.Menu();
	tray.menu.append(new gui.MenuItem({
		label: "Don't Exit",
		click: function(){
			
		}
	}));
	tray.menu.append(new gui.MenuItem({
		label: "Exit",
		click: function(){
			gui.App.quit();
		}
	}));
	
	window.unloadhook = function(){
		tray.remove();
	};
});