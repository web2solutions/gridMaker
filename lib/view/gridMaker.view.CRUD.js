gridMaker.view.CRUD = {
	
	window : []
	,status_bar : []
	,layout : []
	,grid: []
	,toolbar : []
	
	,form: []

	,uid : null
	
	,configuration: []
	
	,settings : []
	
	,_layout : function( uid ){
		var that = gridMaker, self = gridMaker.view.CRUD;
		self.layout[ uid ] = new dhtmlXLayoutObject(that.settings.CRUD.layout);
		self.layout[ uid ].cells("a").setText(that.savedSettings[ uid ].grid_name);
		self.layout[ uid ].cells("a").hideHeader();
		self.status_bar[ uid ] = self.layout[ uid ].cells("a").attachStatusBar();
		self.status_bar[ uid ].setText("Loading grid ... please hold on!");
	}
	
	
	,_toolbar : function( uid ){
		var that = gridMaker, self = gridMaker.view.CRUD;
		that.settings.CRUD.toolbar.icon_path = that.settings.icons_path;
		self.toolbar[ uid ] = self.layout[ uid ].attachToolbar(that.settings.CRUD.toolbar);
		//self.toolbar[ uid ].setIconSize(32);
		
		self.toolbar[ uid ].attachEvent("onClick", function (id) {
			//console.log( id );
			id == "add" ? self.mountWindow.add( uid ) : "";
			id == "edit" ? self.mountWindow.edit( uid ) : "";
			if(id == "delete")
			{
				self.layout[ uid ].progressOn();
				CAIRS.jDBd.del({
					data_set_name: that.savedSettings[ uid ].table_name,
					record_id: self.grid[ uid ].getSelectedRowId(),
					live: true,
					onSuccess: function(record_id) {
						//console.log( record_id + " deleted" );
						dhtmlx.message({
							type: "warning",
							text: record_id + " deleted"
						});
						
						self.toolbar[ uid ].disableItem('edit');
						self.toolbar[ uid ].disableItem('delete');
						
						self.layout[ uid ].progressOff();
					},
					onFail: function(response) {
						//console.log( "was not deleted" );
						dhtmlx.message({
							type: "error",
							text: "record was not deleted"
						});
						self.layout[ uid ].progressOff();
					}
				})
			}
		});
	}
	
	
	,_grid: function( uid ){
		var that = gridMaker, self = gridMaker.view.CRUD;
		
		self.grid[ uid ] = self.layout[ uid ].cells("a").attachGrid();
		
		
		self.grid[ uid ].setHeader(that.savedSettings[ uid ].grid.headers.join());
		self.grid[ uid ].setColumnIds(that.savedSettings[ uid ].grid.ids.join());
		self.grid[ uid ].setInitWidths(that.savedSettings[ uid ].grid.widths.join());
		self.grid[ uid ].setColAlign(that.savedSettings[ uid ].grid.colaligns.join());
		self.grid[ uid ].setColTypes(that.savedSettings[ uid ].grid.coltypes.join());
		//console.log( that.savedSettings[ uid ].grid.coltypes.join() );
		self.grid[ uid ].setColSorting(that.savedSettings[ uid ].grid.colsorting.join());
		
		
		self.grid[ uid ].setDateFormat("%Y-%m-%d");
		
		self.grid[ uid ].init();
		
		self.grid[ uid ].attachEvent("onRowSelect", function(id, ind) {
                // set cursor position to the selected grid row
                CAIRS.jDBd.setCursor({
                    data_set_name: that.savedSettings[ self.uid ].table_name,
                    position: id
         	});
			self.toolbar[ uid ].enableItem('edit');
			self.toolbar[ uid ].enableItem('delete');
         });
		
		//self.grid[ uid ].load("grid.json","json");
		
		//console.log( that.savedSettings[ uid ].grid );
		
		// DHTMLX BUG
		//self.grid[ uid ].parse(that.savedSettings[ uid ].grid, "json");
	}
	
	,
	_window: function ( uid ) {
		'use strict';
		var that = gridMaker, self = gridMaker.view.CRUD;

		if (that.window_manager.isWindow("window_gridMaker_crud_"+uid))
		{
			self.window[ uid ].show();
			self.window[ uid ].bringToTop();
			return;
		}
		
		self.window[ uid ] = that.window_manager.createWindow({
			id: "window_gridMaker_crud_" + uid,
			left: that.settings.CRUD.window.left,
			top: that.settings.CRUD.window.top,
			width: that.settings.CRUD.window.width,
			height: that.settings.CRUD.window.height,
		});
		
		self.window[ uid ].attachEvent("onClose", function(win){
			win.hide();
			//self.isOpened = false;
			return false;
		});
			
		
		self.status_bar[ uid ] = self.window[ uid ].attachStatusBar();
		self.status_bar[ uid ].setText("");
	}
	
	
	,_form : function( uid ){
		var that = gridMaker, self = gridMaker.view.CRUD;
			
		self.form[ uid ] = self.window[ uid ].attachForm(self.settings[ uid ].form.template);
		CAIRS.dhtmlx.prepareForm("gridMaker_CRUD_form_crud", self.settings[ uid ].form, self.form[ uid ]);
		
		self.form[ uid ].attachEvent("onButtonClick", function(name){
				if( name == "save" )
				{
				 	self.form[ uid ].lock();
					var hash_form = self.form[ uid ].getFormData();
					var hash = {};
					that.savedSettings[ uid ].columns.forEach(function (column, index, array_) {
						if( column.dhtmlx_grid_type == 'price' )
						{
							if( hash_form[ column.column_name ] == '' )
								hash[ column.column_name ] = null;
							else
								hash[ column.column_name ] = hash_form[ column.column_name ];
						}
						else if( column.dhtmlx_grid_type == 'edn' )
						{
							if( hash_form[ column.column_name ] == '' )
								hash[ column.column_name ] = null;
							else
								hash[ column.column_name ] = hash_form[ column.column_name ];
						}
						else if( column.dhtmlx_grid_type == 'dhxCalendarA' )
						{
							if( hash_form[ column.column_name ] == '' )
								hash[ column.column_name ] = null;
							else
								hash[ column.column_name ] = hash_form[ column.column_name ];
						}
						else
						{
							hash[ column.column_name ] = hash_form[ column.column_name ];
						}
					});
					
					hash[ 'user_id' ] = hash_form[ 'user_id' ];
					hash[ 'connID' ] = hash_form[ 'connID' ];
					hash[ 'ConnectionId' ] = hash_form[ 'ConnectionId' ];					
					
					self.form[ uid ].save( hash, function(){
						self.form[ uid ].unlock();
						self.window[ uid ].hide();
					});   // call only when bound to a dataset to be able to save trhough MAP API
				}
				else if( name == "update" )
				{	
					self.form[ uid ].lock();
					var hash_form = self.form[ uid ].getFormData();
					var hash = {};
					that.savedSettings[ uid ].columns.forEach(function (column, index, array_) {
						if( column.dhtmlx_grid_type == 'price' )
						{
							if( hash_form[ column.column_name ] == '' )
								hash[ column.column_name ] = null;
							else
								hash[ column.column_name ] = hash_form[ column.column_name ];
						}
						else if( column.dhtmlx_grid_type == 'edn' )
						{
							if( hash_form[ column.column_name ] == '' )
								hash[ column.column_name ] = null;
							else
								hash[ column.column_name ] = hash_form[ column.column_name ];
						}
						else if( column.dhtmlx_grid_type == 'dhxCalendarA' )
						{
							if( hash_form[ column.column_name ] == '' )
								hash[ column.column_name ] = null;
							else
								hash[ column.column_name ] = hash_form[ column.column_name ];
						}
						else
						{
							hash[ column.column_name ] = hash_form[ column.column_name ];
						}
					});
					
					hash[ 'user_id' ] = hash_form[ 'user_id' ];
					hash[ 'connID' ] = hash_form[ 'connID' ];
					hash[ 'ConnectionId' ] = hash_form[ 'ConnectionId' ];
					hash[ 'data_id' ] = hash_form[ 'data_id' ];
					
					self.form[ uid ].update( hash, function(){
						self.window[ uid ].hide();
						self.form[ uid ].unlock();
					});  // call only when bound to a dataset
				}
				else if( name == "delete" )
					self.form[ uid ].erase();  // call only when bound to a dataset
		});
		
	}
	
	,_setUpFormSettings : function( uid ){
		var that = gridMaker, self = gridMaker.view.CRUD;
			
		
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
	
	
	,mountWindow : {
		add : function( uid ){
			var that = gridMaker, self = gridMaker.view.CRUD;
			self._window( uid );
			self.window[ uid ].setText("Add record");
			
			self._form( uid );
			self.form[ uid ].hideItem('update');
			
			// bind form
			CAIRS.jDBd.bind({
				data_set_name: that.savedSettings[ uid ].table_name // mandatory
				,component: gridMaker.view.CRUD.form[ uid ] // mandatory
				,component_id: "form" // mandatory
			});
			
			var hash = {};
			that.savedSettings[ uid ].columns.forEach(function (column, index, array_) {
				hash[ column.column_name ] = '';
			});
			
			self.form[ uid ].setFormData( hash );
		}
		,edit : function( uid ){
			var that = gridMaker, self = gridMaker.view.CRUD;
			self._window( uid );
			self.window[ uid ].setText("Update record");
			self._form( uid );
			self.form[ uid ].hideItem('save');
			
			// bind form
			CAIRS.jDBd.bind({
				data_set_name: that.savedSettings[ uid ].table_name // mandatory
				,component: gridMaker.view.CRUD.form[ uid ] // mandatory
				,component_id: "form" // mandatory
			});
		}
	}
	
	,render : function( configuration ){
		var that = gridMaker, self = gridMaker.view.CRUD;
		
		if( typeof configuration.container === 'undefined' )
		{
			alert("Wrong component call. \n The container parameter is missing! The CRUD will not start.");
			return;
		}
		
		
		if( typeof configuration.user_id === 'undefined' )
		{
			alert("Wrong component call. \n The user_id parameter is missing! The CRUD will not start.");
			return;
		}
		
		if( typeof configuration.ConnectionId === 'undefined' )
		{
			alert("Wrong component call. \n The ConnectionId parameter is missing! The CRUD will not start.");
			return;
		}
		
		if( typeof configuration.user_id === 'undefined' )
		{
			alert("Wrong component call. \n The user_id parameter is missing! The CRUD will not start.");
			return;
		}
		
		
		if( typeof configuration.settings === 'undefined' )
		{
			that.addNewSettings( configuration.container );
		}
		else
		{
			that.savedSettings[ configuration.container ]  = configuration.settings
		}
		
		self.uid  = configuration.container;
		that.settings.CRUD.layout.parent = configuration.container;
		
		self.configuration[ self.uid ] = configuration;
		
		
		self._setUpFormSettings( self.uid );
	
		
		try
		{
			self._layout( self.uid );
			self._toolbar( self.uid );
			self._grid( self.uid );
			
			self.layout[ self.uid ].progressOn();
			
			// create main the dataset. 
			CAIRS.jDBd.create({
				data_set_name: that.savedSettings[ self.uid ].table_name
				,primary_key: "data_id"
				//,data : []
				,overwrite: true
				,api_service: {
					end_point: "/gridmaker/grid/records" // default API end point, use it when all end points are equal
					,collection_name: "records" // API data collection name -> MANDATORY
					,api_payload: "table_name=" + that.savedSettings[ self.uid ].table_name + "&columns=" + that.savedSettings[ self.uid ].grid.ids.join() + ",data_id" // not mandatory
				} // not mandatory default false
				,
				onSuccess: function() {
			
			
					// sync grid
					CAIRS.jDBd.sync({
						data_set_name: that.savedSettings[ self.uid ].table_name // mandatory
						,component: self.grid[ self.uid ] // mandatory
						,component_id: "grid_maker_CRUD_grid_" + self.uid // mandatory
						,onSuccess: function() {
	
							self.grid[ self.uid ].selectRow(0, true, false, false);
							
							self.status_bar[ self.uid ].setText("Ready.");
			
							self.layout[ self.uid ].progressOff();
			
							//CAIRS.hideDirections();
						},
						onFail: function(reason) {
							//console.log(reason);
							//CAIRS.hideDirections();
						}
					});
				}
			}); // end create dataset
			
			
			
		}
		catch(e)
		{
			//console.log(e.stack);
		}
	}
};