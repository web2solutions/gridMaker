gridMaker.view.Viewer = {
	
	window : []
	,status_bar : []
	,layout : []
	,grid: []
	,toolbar : []
	
	,savedSettings : []

	,uid : null
	
	,configuration: []
	
	,settings : []
	
	
	,reBuild : function( uid ){
		var that = gridMaker, self = gridMaker.view.Viewer;
		
		try
		{
			self.toolbar[ uid ].unload();
			self.toolbar[ uid ] = null;
			
			self.grid[ uid ].destructor();
			self.grid[ uid ] = null;
			
			
			// bug DHTMLX 4.0.3
			//self.layout[ uid ].unload();
			//self.layout[ uid ] = null;
			
			self.render({
				field_id : self.configuration[ uid ] // Not mandatory, default 0. Type: integer
				,container: uid // Mandatory. DIV ID. Type string
				,settings : JSON.parse( localStorage.getItem(	
					gridMaker.settings.appId + "_gridSettings_" + uid
				)) // Mandatory. Grid settings 
			});
		}
		catch(e)
		{
			console.log( e.stack );
		}
	}
	
	,_layout : function( uid ){
		var that = gridMaker, self = gridMaker.view.Viewer;
		self.layout[ uid ] = new dhtmlXLayoutObject(that.settings.Viewer.layout);
		//self.layout[ uid ].cells("a").setText(self.savedSettings[ uid ].grid_name);
		self.layout[ uid ].cells("a").hideHeader();
		self.status_bar[ uid ] = self.layout[ uid ].cells("a").attachStatusBar();
		self.status_bar[ uid ].setText("Demo grid!");
	}
	
	
	,_toolbar : function( uid ){
		var that = gridMaker, self = gridMaker.view.Viewer;
		that.settings.Viewer.toolbar.icon_path = that.settings.icons_path;
		self.toolbar[ uid ] = self.layout[ uid ].attachToolbar(that.settings.Viewer.toolbar);
		//self.toolbar[ uid ].setIconSize(32);
		
		self.toolbar[ uid ].attachEvent("onClick", function (id) {
			
		});
	}
	
	
	,_grid: function( uid ){
		var that = gridMaker, self = gridMaker.view.Viewer;
		
		self.grid[ uid ] = self.layout[ uid ].cells("a").attachGrid();
		
		
		self.grid[ uid ].setHeader(self.savedSettings[ uid ].grid.headers.join());
		self.grid[ uid ].setColumnIds(self.savedSettings[ uid ].grid.ids.join());
		
		console.log('>>>>>>>>>>>>');
		console.log(self.savedSettings[ uid ].grid.widths.join());
		
		self.grid[ uid ].setInitWidths(self.savedSettings[ uid ].grid.widths.join());
		self.grid[ uid ].setColAlign(self.savedSettings[ uid ].grid.colaligns.join());
		self.grid[ uid ].setColTypes(self.savedSettings[ uid ].grid.coltypes.join());
		//console.log( self.savedSettings[ uid ].grid.coltypes.join() );
		self.grid[ uid ].setColSorting(self.savedSettings[ uid ].grid.colsorting.join());
		
		
		self.grid[ uid ].setDateFormat("%Y-%m-%d");
		
		self.grid[ uid ].init();
		
		self.grid[ uid ].attachEvent("onRowSelect", function(id, ind) {
                
         });
		
		//self.grid[ uid ].load("grid.json","json");
		
		//console.log( self.savedSettings[ uid ].grid );
		
		// DHTMLX BUG
		//self.grid[ uid ].parse(self.savedSettings[ uid ].grid, "json");
	}
	
	,
	_window: function ( uid ) {
		'use strict';
		var that = gridMaker, self = gridMaker.view.Viewer;

		if (that.window_manager.isWindow("window_gridMaker_crud_"+uid))
		{
			self.window[ uid ].show();
			self.window[ uid ].bringToTop();
			return;
		}
		
		self.window[ uid ] = that.window_manager.createWindow({
			id: "window_gridMaker_crud_" + uid,
			left: that.settings.Viewer.window.left,
			top: that.settings.Viewer.window.top,
			width: that.settings.Viewer.window.width,
			height: that.settings.Viewer.window.height,
		});
		
		self.window[ uid ].attachEvent("onClose", function(win){
			win.hide();
			//self.isOpened = false;
			return false;
		});
			
		
		self.status_bar[ uid ] = self.window[ uid ].attachStatusBar();
		self.status_bar[ uid ].setText("");
	}
	
	
	
	,render : function( configuration ){
		var that = gridMaker, self = gridMaker.view.Viewer;
		
		if( typeof configuration.container === 'undefined' )
		{
			alert("Wrong component call. \n The container parameter is missing! The Viewer will not start.");
			return;
		}
		
		if( typeof configuration.settings === 'undefined' )
		{
			alert("Wrong component call. \n The settings parameter is missing! The Viewer will not start.");
			return;
		}
		
		self.uid  = configuration.container;
		
		console.log( 'configuration ', configuration );
		console.log( self.uid );
		
		
		self.savedSettings[ self.uid ]  = configuration.settings;
		
		console.log( self.savedSettings );
		console.log( self.savedSettings[ self.uid ] );
		
		
		that.settings.Viewer.layout.parent = configuration.container;
		
		self.configuration[ self.uid ] = configuration;
		
		console.log('uid ', self.uid);
	
		
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