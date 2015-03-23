gridMaker.view.Viewer = {
	
	window : []
	,status_bar : []
	,layout : []
	,grid: []
	,toolbar : []

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
		self.layout[ uid ].cells("a").setText(that.savedSettings[ uid ].grid_name);
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
		
		
		self.grid[ uid ].setHeader(that.savedSettings[ uid ].grid.headers.join());
		self.grid[ uid ].setColumnIds(that.savedSettings[ uid ].grid.ids.join());
		
		console.log('>>>>>>>>>>>>');
		console.log(that.savedSettings[ uid ].grid.widths.join());
		
		self.grid[ uid ].setInitWidths(that.savedSettings[ uid ].grid.widths.join());
		self.grid[ uid ].setColAlign(that.savedSettings[ uid ].grid.colaligns.join());
		self.grid[ uid ].setColTypes(that.savedSettings[ uid ].grid.coltypes.join());
		//console.log( that.savedSettings[ uid ].grid.coltypes.join() );
		self.grid[ uid ].setColSorting(that.savedSettings[ uid ].grid.colsorting.join());
		
		
		self.grid[ uid ].setDateFormat("%Y-%m-%d");
		
		self.grid[ uid ].init();
		
		self.grid[ uid ].attachEvent("onRowSelect", function(id, ind) {
                
         });
		
		//self.grid[ uid ].load("grid.json","json");
		
		//console.log( that.savedSettings[ uid ].grid );
		
		// DHTMLX BUG
		//self.grid[ uid ].parse(that.savedSettings[ uid ].grid, "json");
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
	
	
	
	
	,_setUpFormSettings : function( uid ){
		var that = gridMaker, self = gridMaker.view.Viewer;
			
		
		self.settings[ uid ] = {
			form : {
				template : [
					{
						type: "settings",
						position: "label-left",
						labelWidth: 160,
						inputWidth: 160
					}
					,{
						type: 'block',
						inputWidth: 'auto',
						inputHeight :'auto',
						list: [
						
						]
					}
					//
					
					,{
						type: 'block',
						inputWidth: 'auto',
						inputHeight :'auto',
						list: [
							{
								type: "button",
								value: "save",
								name: "save" // x_special_button_save id automatically recognized when binding a form to a dataset
							}
							,{
								type: "button",
								value: "update",
								name: "update" // x_special_button_update id automatically recognized when binding a form to a dataset
							}
							,{
								type: "hidden", name: 'user_id', label: 'user_id', 
								required: true, validate: 'NotEmpty', value : self.configuration[ uid ].user_id
							}
							,{
								type: "hidden", name: 'connID', label: 'connID', 
								required: true, validate: 'NotEmpty', value : self.configuration[ uid ].connID
							}
							,{
								type: "hidden", name: 'ConnectionId', label: 'ConnectionId', 
								required: true, validate: 'NotEmpty', value : self.configuration[ uid ].ConnectionId
							}
						]
					}
					
				]	
			}	
		};
		
		
		that.savedSettings[ uid ].columns.forEach(function (column, index, array_) {
			var field = {
				type: gridMaker.view.Builder.helpers.toDHTMLXFormType( column.dhtmlx_grid_type )
				,name: column.column_name
				,label: column.dhtmlx_grid_header
			};
			
			
			if(column.dhtmlx_grid_width == '0' || column.dhtmlx_grid_width == 0)
				field["type"] = "hidden";
			
			if( column.dhtmlx_grid_type == 'price' )
				field["mask_to_use"] = "currency";
				
			if( column.dhtmlx_grid_type == 'edn' )
				field["mask_to_use"] = "integer";
				
			if( column.dhtmlx_grid_type == 'dhxCalendarA' )
			{
				field["dateFormat"] = "%Y-%m-%d";
				field["readonly"] = true;
			}
				
				/// dateFormat:"%Y-%m-%d %H:%i",
				
			if( column.dhtmlx_grid_type == 'link' )
				field["mask_to_use"] = "website";
			
			
			self.settings[ uid ].form.template[1].list.push( field );
		});
		
		
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
		
		
		that.savedSettings[ configuration.container ]  = configuration.settings
		
		self.uid  = configuration.container;
		that.settings.Viewer.layout.parent = configuration.container;
		
		self.configuration[ self.uid ] = configuration;
		
		
		self._setUpFormSettings( self.uid );
	
		
		try
		{
			self._layout( self.uid );
			self._toolbar( self.uid );
			self._grid( self.uid );
			
			//self.layout[ self.uid ].progressOn();
			
			var storageName = gridMaker.settings.appId + "_gridSettings_" + self.uid;
			window.addEventListener('storage', function (storageEvent){
				console.log(storageEvent);
								
				console.log( storageEvent.key == storageName );
								
				if( storageEvent.key == storageName )
				{
									
				}
					
			}, false);
			
			
			
		}
		catch(e)
		{
			//console.log(e.stack);
		}
	}
};