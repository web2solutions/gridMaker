gridMaker.view.CRUD = {
	
	window : []
	,status_bar : []
	,layout : []
	,grid: []
	,toolbar : []

	,uid : null
	
	,configuration: []
	
	,_layout : function( uid ){
		var that = gridMaker, self = gridMaker.view.CRUD;
		self.layout[ uid ] = new dhtmlXLayoutObject(that.settings.CRUD.layout);
		self.layout[ uid ].cells("a").setText("Set up column properties");
		self.status_bar[ uid ] = self.layout[ uid ].cells("a").attachStatusBar();
		self.status_bar[ uid ].setText("Please set up column properties on the above form");
	}
	
	
	,_toolbar : function( uid ){
		var that = gridMaker, self = gridMaker.view.CRUD;
		that.settings.CRUD.toolbar.icon_path = that.settings.icons_path + "/32px/";
		self.toolbar[ uid ] = self.layout[ uid ].attachToolbar(that.settings.CRUD.toolbar);
		self.toolbar[ uid ].setIconSize(32);
	}
	
	,_grid: function( uid ){
		var that = gridMaker, self = gridMaker.view.CRUD;
		
		self.grid[ uid ] = self.layout[ uid ].cells("a").attachGrid();
		//self.grid[ uid ].selMultiRows = true;
		//self.grid[ uid ].setDateFormat("%m-%d-%Y");
		
		self.grid[ uid ].init();
		
		//self.grid[ uid ].load("grid.json","json");
		
		console.log( that.savedSettings[ uid ].grid );
		
		// DHTMLX BUG
		self.grid[ uid ].parse(that.savedSettings[ uid ].grid, "json");
	}
	
	,
	_window: function ( uid ) {
		'use strict';
		var that = gridMaker, self = gridMaker.view.CRUD;

		if (that.window_manager.isWindow("window_gridMaker_crud_"+uid))
		{
			self.window[ uid ][ uid ].show();
			self.window[ uid ].bringToTop();
			return;
		}
		
		self.window[ uid ] = that.window_manager.createWindow({
			id: "window_gridMaker_crud_"+uid,
			left: that.settings.CRUD.window.left,
			top: that.settings.CRUD.window.top,
			width: that.settings.CRUD.window.width,
			height: that.settings.CRUD.window.height,
		});
		
		self.window[ uid ].attachEvent("onClose", function(win){
			//console.log('closing');
			self.isOpened = false;
			return true;
		});
			
		self.window[ uid ].setText("Add/Update record");
		self.status_bar[ uid ] = self.window[ uid ].attachStatusBar();
		self.status_bar[ uid ].setText("");
	}
	
	
	,render : function( configuration ){
		var that = gridMaker, self = gridMaker.view.CRUD;
		
		if( typeof configuration.container === 'undefined' )
		{
			alert("Wrong component call. \n The container parameter is missing! The CRUD will not start.");
			return;
		}
		
		self.uid  = configuration.container;
		that.settings.CRUD.layout.parent = configuration.container;
		
		self.configuration[ self.uid ] = configuration;
		
		try
		{
			self._layout( self.uid );
			self._toolbar( self.uid );
			self._grid( self.uid );
		}
		catch(e)
		{
			console.log(e.stack);
		}
	}
};