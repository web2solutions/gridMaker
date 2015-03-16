gridMaker.view.Admin = {
	
	window: []
	,status_bar : []
	,status_bar_form : []
	,layout : []
	,form: []
	,grid: []
	,toolbar : []
	,toolbar_form : []
	,toolbar_grid : []
	
	,isOpened : false
	
	,thereIsNotSavedColumn : false
	
	,tableName: ''
	,tableAlreadyCreated : false
	,teableCreatedID: -1
	,currentlyColumnIdBeingUpdated: -1
	
	,container : []
	
	,uid : null
	
	
	,selectedColumnsOnGrid : ''

	
	
	,
	/**
	 * Description
	 * @method _window
	 * @param {} uid
	 * @return
	 */
	_window: function ( uid ) {
		'use strict';
		var that = gridMaker, self = gridMaker.view.Admin;

		if (that.window_manager.isWindow("window_gridMaker_admin" + uid))
		{
			self.window[ uid ].show();
			self.window[ uid ].bringToTop();
			return;
		}
		
		self.window[ uid ] = that.window_manager.createWindow({
			id: "window_gridMaker_admin" + uid,
			left: that.settings.Admin.window.left,
			top: that.settings.Admin.window.top,
			width: that.settings.Admin.window.width,
			height: that.settings.Admin.window.height,
		});
		
		
		self.window[ uid ].attachEvent("onClose", function(win){
			//console.log('closing');
			

			
			
			self.thereIsNotSavedColumn = false;
			self.isOpened = false;
			self.helpers.column.added = 0;
			return true;
		});
		
			
		self.window[ uid ].setText("Grid Admin");
		//self.window[ uid ].setIcon(self.model.window.icon, self.model.window.icon_dis);

		self.status_bar = self.window[ uid ].attachStatusBar();
		self.status_bar.setText("");
	}
	
	,_toolbar : function( uid ){
		'use strict';
		var that = gridMaker, self = gridMaker.view.Admin;
		that.settings.Admin.toolbar.icon_path = that.settings.icons_path + "/32px/";
		self.toolbar[ uid ] = self.window[ uid ].attachToolbar(that.settings.Admin.toolbar);
		self.toolbar[ uid ].setIconSize(32);
		
		
	
		var grid_name_input = self.toolbar[ uid ].getInput("grid_name");
		grid_name_input.onkeyup = function (event) {
			//self.tableName = "gridMaker_data_" + that.configuration.field_id + "_" + self.helpers.toSQLname(this.value)
		};
		
		self.toolbar[ uid ].attachEvent("onClick", function (id) {
			if (id == "save") {
				
				dhtmlx.confirm({
					title: "Save and create grid",
					type: "confirm-warning",
					text: "Do you really want to create the grid and it columns? <br> <br> This window will be closed when saved and you will not be able to change the grid properties.!",
					ok: "yes",
					cancel: "no, I'll review ...",
					callback: function (ok) {
						if( ok )
							self.helpers.grid.table.save();
					}
				});
			}
		});
		
		
		//console.log(self.toolbar[ uid ])
		//self.toolbar[ uid ].enableItem("delete");
	}
	
	,_toolbar_form : function( uid ){
		var that = gridMaker, self = gridMaker.view.Admin;
		that.settings.Admin.toolbar_form.icon_path = that.settings.icons_path;
		self.toolbar_form[ uid ] = self.layout[ uid ].cells("a").attachToolbar(that.settings.Admin.toolbar_form);
		
		self.toolbar_form[ uid ].attachEvent("onClick", function (id) {
			//console.log( id );
			id == "save" ? self.helpers.column.add( uid ) : "";
			id == "reset" ? self.helpers.grid.columns.reset( uid ) : "";
			
			
		});
	}
	
	,_toolbar_grid : function( uid ){
		var that = gridMaker, self = gridMaker.view.Admin;
		that.settings.Admin.toolbar_grid.icon_path = that.settings.icons_path;
		self.toolbar_grid[ uid ] = self.layout[ uid ].cells("b").attachToolbar(that.settings.Admin.toolbar_grid);
		self.toolbar_grid[ uid ].attachEvent("onClick", function (id) {
			if (id == "edit") {
				self.helpers.grid.columns.edit();
			}
			else if (id == "delete") {
				dhtmlx.confirm({
					title: "delete columns",
					type: "confirm-warning",
					text: "Do you really want to delete the selected columns?",
					ok: "yes",
					cancel: "no, thanks ...",
					callback: function (ok) {
						if(ok)
							self.helpers.grid.columns.del( uid );
					}
				});
			}
			else if (id == 'save') {
				dhtmlx.confirm({
					title: "Save and create columns",
					type: "confirm-warning",
					text: "Do you really want to save and create the columns? This window will be closed when saved!",
					ok: "yes",
					cancel: "no, I'll review ...",
					callback: function (ok) {
						if(ok)
							self.helpers.grid.columns.save( uid );
					}
				});
			}
		});
	}
	
	,_layout : function( uid ){
		var that = gridMaker, self = gridMaker.view.Admin;
		self.layout[ uid ] = self.window[ uid ].attachLayout(that.settings.Admin.layout);
		//self.layout[ uid ].setAutoSize("a", "a;c");
		self.layout[ uid ].cells("a").hideHeader();
		self.layout[ uid ].cells("a").setText("Set up column properties");
		self.layout[ uid ].cells("a").hideHeader();
		self.layout[ uid ].cells("a").setHeight(190);
		
		self.layout[ uid ].cells("b").setText("Columns preview");
		
		
		self.status_bar_form = self.layout[ uid ].cells("a").attachStatusBar();
		self.status_bar_form.setText("Please set up column properties on the above form");
	}
	
	,_grid: function( uid ){
		var that = gridMaker, self = gridMaker.view.Admin;
		
		self.grid[ uid ] = self.layout[ uid ].cells("b").attachGrid();
		self.grid[ uid ].setHeader(that.settings.Admin.grid.headers);
		self.grid[ uid ].setColumnIds(that.settings.Admin.grid.ids);
		self.grid[ uid ].setInitWidths(that.settings.Admin.grid.widths);
		self.grid[ uid ].setColAlign(that.settings.Admin.grid.colaligns);
		self.grid[ uid ].setColTypes(that.settings.Admin.grid.coltypes);
		self.grid[ uid ].setColSorting(that.settings.Admin.grid.colsorting);

		self.grid[ uid ].init();
		
		var dhtmlx_grid_align_combo = self.grid[ uid ].getCombo(self.grid[ uid ].getColIndexById("dhtmlx_grid_align"));
		dhtmlx_grid_align_combo.put("left", "left");
		dhtmlx_grid_align_combo.put("right", "right");
		dhtmlx_grid_align_combo.put("center", "center");
		
		
		
		self.grid[ uid ].attachEvent("onRowSelect", function (id, ind) {
			//console.log(self.toolbar[ uid ]);
			// DHTMLX BUG
			//self.toolbar[ uid ].enableItem("delete");
			//self.toolbar[ uid ].enableItem("edit");
			
	

			self.selectedColumnsOnGrid = id;
		});

		//self.grid[ uid ].enableHeaderMenu();
	}
	
	
	,_form : function( uid ){
		var that = gridMaker, self = gridMaker.view.Admin, 
			column_name_input = null, column_type_input = null, column_name_doOnKeyUp = null, dhtmlx_grid_sorting_input = null 
			dhtmlx_grid_header_input = null, dhtmlx_grid_type_combo = null, dhtmlx_grid_width_input = null;
			
		self.form[ uid ] = self.layout[ uid ].cells("a").attachForm(that.settings.Admin.form.template);
		CAIRS.dhtmlx.prepareForm("gridMaker_Builder_form_admin" + uid, that.settings.Admin.form, self.form[ uid ]);
		
		
		column_name_input = self.form[ uid ].getInput("column_name");
		column_type_input = self.form[ uid ].getInput("column_type");
		dhtmlx_grid_header_input = self.form[ uid ].getInput("dhtmlx_grid_header");
		dhtmlx_grid_sorting_input = self.form[ uid ].getInput("dhtmlx_grid_sorting");
		
		dhtmlx_grid_width_input = self.form[ uid ].getInput("dhtmlx_grid_width");
		dhtmlx_grid_width_input.onkeyup = function(event){
			//console.log(self.helpers.toDHTMLXsize( this.value ));
			this.value = self.helpers.toDHTMLXsize( this.value );
			self.form[ uid ].updateValues();
		}
		
		dhtmlx_grid_header_doOnKeyUp =  function (event) {
			column_name_input.value = self.helpers.toSQLname(this.value);
			self.form[ uid ].updateValues();
		};		
		
		if (window.addEventListener)
		{
			dhtmlx_grid_header_input.addEventListener("keyup", dhtmlx_grid_header_doOnKeyUp, false);
		}
		else
		{
			dhtmlx_grid_header_input.attachEvent("onkeyup", dhtmlx_grid_header_doOnKeyUp);
		}
		
		/*dhtmlx_grid_type_combo = self.form[ uid ].getCombo("dhtmlx_grid_type");
		dhtmlx_grid_type_combo.attachEvent("onChange", function( value, text ){
			column_type_input.value = self.helpers.toSQLtype( value ); 
			dhtmlx_grid_sorting_input.value = self.helpers.toDHTMLXsorting( value ); 
			//toDHTMLXsorting
			
			self.form[ uid ].updateValues();       
			return true;                                                           
		});*/
		
		
		self.form[ uid ].attachEvent("onKeyUp",function(inp, ev, name, value){
			//console.log(ev);
			var key_code = ev.keyCode? ev.keyCode : ev.charCode;
			if(key_code == 13)
			{
				self.helpers.column.add();
			}
		});
		
		self.form[ uid ].attachEvent("onChange", function (id, value)
		{
			self.thereIsNotSavedColumn = true;
			
			if(id == "dhtmlx_grid_type")
			{
				
			}
		});
	}
	
	,helpers : {
		toSQLname : function( name ){
			try {
				name = name.replace(/ /gi, "_");
				name = name.replace(/[^a-z0-9\_]/gi, '');
				name = name.toLowerCase();
				return name;
			}
			catch (e) {
				console.log(e.stack)
			};
		}
		
		,toSQLtype : function( type ){
			switch (type) 
			{
				case "cp":
					return 'varchar(20)';
					break;
				case "price":
					return 'numeric(16,2)';
					break;
				case "dhxCalendarA":
					return 'date';
					break;
				case "link":
					return 'varchar(max)';
					break;
				case "edn":
					return 'integer';
					break;
				case "txttxt":
					return 'varchar(max)';
					break;
				default:
					return 'varchar(max)';
			}
		}
		
		,toDHTMLXsorting : function( type ){
			switch (type) 
			{
				case "cp":
					return 'str';
					break;
				case "price":
					return 'int';
					break;
				case "dhxCalendarA":
					return 'date';
					break;
				case "link":
					return 'str';
					break;
				case "edn":
					return 'int';
					break;
				case "txttxt":
					return 'str';
					break;
				default:
					return 'str';
			}
		}
		
		
		,toDHTMLXFormType : function( type ){
			switch (type) 
			{
				case "cp":
					return 'colorpicker';
					break;
				case "price":
					return 'input';
					break;
				case "dhxCalendarA":
					return 'calendar';
					break;
				case "link":
					return 'input';
					break;
				case "edn":
					return 'input';
					break;
				case "txttxt":
					return 'input';
					break;
				default:
					return 'input';
			}
		}
		
		,toDHTMLXsize : function( size ){
			try {
				size = size.replace(/ /gi, "");
				size = size.replace(/[^0-9\_\*]/gi, '');
				size = size.toLowerCase();
				
				if( size.indexOf("*") != -1 )
					return '*';
				else
				{
					if( size.length > 0 )
						return parseInt( size );
					else
						return '';
				}
				return '*'
			}
			catch (e) {
				console.log(e.stack)
			};
		}
		
		,column : {
			added : 0
			,add : function( uid ){
				var that = gridMaker, self = gridMaker.view.Admin;
				
				if (CAIRS.dhtmlx.validateForm("gridMaker_Builder_form_admin" + uid, self.form[ uid ])) {
					var hash = self.form[ uid ].getFormData();
					//console.log(hash);					
					
					var row_data = [];
					for(var x in hash){
					  	row_data.push(hash[x]);
					  	//clear_hash[x] = "";
					}
					
					self.helpers.column.added = self.helpers.column.added + 1;
					self.grid[ uid ].addRow(gridMaker.view.Admin.helpers.column.added, row_data);
					
					
					/*
						"headers": "CountryText,isHagueCountry,isStateFinalizationRequired",
						"ids": "CountryText,isHagueCountry,isStateFinalizationRequired",
						"widths": "150,150,100",
						"colaligns": "left,left,left",
						"coltypes": "ro,ro,ro",
						"colsorting": "str,str,str"
					*/
					
					// old style grid
					that.savedSettings[ uid ].grid.headers.push( hash["dhtmlx_grid_header"] );
					that.savedSettings[ uid ].grid.ids.push( hash["column_name"] );
					that.savedSettings[ uid ].grid.widths.push( hash["dhtmlx_grid_width"] );
					that.savedSettings[ uid ].grid.colaligns.push( hash["dhtmlx_grid_align"] );
					that.savedSettings[ uid ].grid.coltypes.push( hash["dhtmlx_grid_type"] );
					that.savedSettings[ uid ].grid.colsorting.push( hash["dhtmlx_grid_sorting"] );
					
					that.savedSettings[ uid ].columns.push( hash );
					
					// new set up approach for grid
					that.savedSettings[ uid ].grid.head.push( {
						id: hash["column_name"],    
						width: hash["dhtmlx_grid_width"],  
						type: hash["dhtmlx_grid_type"],   
						align: hash["dhtmlx_grid_align"],  
						sort: hash["dhtmlx_grid_sorting"], 
						value: hash["dhtmlx_grid_header"]
					} );
					
					self.thereIsNotSavedColumn = false;
					self.currentlyColumnIdBeingUpdated = -1;
					self.helpers.grid.columns.reset();
				}
			}	
		}
		
		,grid : {
			table : {
				save: function(){
					var that = gridMaker, self = gridMaker.view.Admin, 
						grid_name_input = self.toolbar[ uid ].getInput("grid_name"), 
						hash_table = null;
					
					
					if( self.thereIsNotSavedColumn == true )
					{
						dhtmlx.alert({
							title: "unable to save",
							type: "alert-error",
							text: "There is a not saved column on the first panel, please clear the form or save the column first!"
						});
						return;
					}
					
					if( grid_name_input.value.length < 1 || self.tableName.length < 1 )
					{
						grid_name_input.focus();
						dhtmlx.alert({
							title: "unable to save",
							type: "alert-error",
							text: "Please provide a name to the grid!",
							callback: function() {grid_name_input.focus();}
							
						});
						return;	
					}
					
					
					if( self.helpers.column.added == 0 )
					{
						dhtmlx.alert({
							title: "unable to save",
							type: "alert-error",
							text: "Please add at least one column to this grid before saving!",
							callback: function() {self.form[ uid ].getInput("dhtmlx_grid_header").focus();}
						});
						self.form[ uid ].getInput("dhtmlx_grid_header").focus();
						return;
					}
					
					
					hash_table = {
						/*table_name : self.tableName
						,*/grid_name : grid_name_input.value
					};
					
					self.layout[ uid ].progressOn();
					
					
					
					CAIRS.MAP.API.put({
							resource :  "/gridmaker/builder/tables/" + self.teableCreatedID
							,format : "json" // not mandatory, default json
							,payload : "hash=" + JSON.stringify( hash_table )
							,onSuccess : function( request )
							{
								try{
									var json = JSON.parse( request.response );
									dhtmlx.message({
										type: "warning",
										text: json.response
									});
									grid_name_input.onkeyup = function (event) {
									
									};
									self.tableAlreadyCreated = true;
									
									self.toolbar[ uid ].setItemText('save', 'Update grid name');
									
									self.layout[ uid ].progressOff();
								
									self.helpers.grid.columns.save();
								}
								catch(e)
								{
									console.log(e.stack);	
								}
								self.layout[ uid ].progressOff();
							}
							,onFail : function( request )
							{
								var json = JSON.parse( request.response );
								alert("error");
							}
						});
					
				}	
			}
			,columns : {
				reset : function( uid ){
					var that = gridMaker, self = gridMaker.view.Admin;
					var clear_hash = {
						column_name: "",
						column_type: "varchar(max)",
						dhtmlx_grid_align: "left",
						dhtmlx_grid_footer: "",
						dhtmlx_grid_header: "",
						dhtmlx_grid_sorting: "str",
						dhtmlx_grid_type: "txttxt",
						dhtmlx_grid_width: "*"	
					};
					self.form[ uid ].setFormData(clear_hash);
					window.setTimeout(function(){
						self.thereIsNotSavedColumn = false;
						self.form[ uid ].updateValues();
					}, 300);
						
				}	
				,save: function( uid, fnCallBack ){
					var that = gridMaker, self = gridMaker.view.Admin;
					
					if( ! self.tableAlreadyCreated )
					{
						dhtmlx.alert({
							title: "unable to save",
							type: "alert-error",
							text: "You need to save the table first!"
						});
						return;
					}
					
					self.layout[ uid ].progressOn();
					
					that.savedSettings[ uid ].columns.forEach(function (column, index, array_) {
						that.savedSettings[ uid ].columns[ index ][ "gridmaker_table_id" ] =  self.teableCreatedID;
					});
					
					CAIRS.MAP.API.post({
						resource :  "/gridmaker/builder/tables/" + self.teableCreatedID + "/columns"
						,format : "json" // not mandatory, default json
						,payload : "table_name="+that.savedSettings[ uid ].table_name+"&table_id="+self.teableCreatedID+"&hash=" + JSON.stringify( that.savedSettings[ uid ].columns )
						,onSuccess : function( request )
						{
							try{
								var json = JSON.parse( request.response );
								dhtmlx.message({
									type: "warning",
									text: json.response
								}); 
								
								if( fnCallBack ) fnCallBack();
								
								
								console.log( JSON.stringify( that.savedSettings[ uid ] ) );
								
								self.layout[ uid ].progressOff();
								self.window[ uid ].close();
							}catch(e)
							{
								console.log(e.stack);	
							}
						}
						,onFail : function( request )
						{
							var json = JSON.parse( request.response );
							alert("error");
						}
					});
					
					
				}
				,del: function( uid ){
					var that = gridMaker, self = gridMaker.view.Admin;
					
					if( typeof self.grid[ uid ].getSelectedRowId() === 'undefined' )
					{
						return;
					}
					
					if( self.grid[ uid ].getSelectedRowId() == null )
					{
						return;
					}
					
					var row_id = self.grid[ uid ].getSelectedRowId();
					var column_name = self.grid[ uid ].cells(row_id, 2).getValue();
					// delete row here
					
					self.helpers.column.added = self.helpers.column.added - 1;
					
					self.grid[ uid ].deleteSelectedRows();
						
					that.savedSettings[ uid ].columns.forEach(function (column, index, array_) {
						if( column.column_name == column_name ) that.savedSettings[ uid ].columns.splice(index, 1);
					});
						
					that.savedSettings[ uid ].grid.head.forEach(function (column, index, array_) {
						if( column.id == column_name ) that.savedSettings[ uid ].grid.head.splice(index, 1);
					});
						
				}
				,edit: function( uid ){
					var that = gridMaker, self = gridMaker.view.Admin;
					var hash = {};
					var row_id = self.grid[ uid ].getSelectedRowId();
					
					if( typeof self.grid[ uid ].getSelectedRowId() === 'undefined' )
					{
						return;
					}
					
					if( self.grid[ uid ].getSelectedRowId() == null )
					{
						return;
					}
					
					self.layout[ uid ].progressOn();
					
					self.grid[ uid ].forEachCell(row_id, function(cellObj, ind){
						var columnID = self.grid[ uid ].getColumnId(ind);
						var columnValue = self.grid[ uid ].cells(row_id, ind).getValue();
						hash[ columnID ] = columnValue;
					});
					
					self.helpers.grid.columns.del();
					
					self.form[ uid ].setFormData(hash);
					
					window.setTimeout(function(){
						self.thereIsNotSavedColumn = true;
						self.form[ uid ].updateValues();
						
						self.currentlyColumnIdBeingUpdated = row_id;
						
						self.layout[ uid ].progressOff();
					}, 300);
					
						
				}
			}
			
				
		}
	}
	
	,_renderSettings : function( uid ){
		var that = gridMaker, self = gridMaker.view.Admin;
		
		
		self.toolbar[ uid ].getInput("grid_name").value = that.savedSettings[ uid ].grid_name
		
		
		that.savedSettings[ uid ].columns.forEach(function (column, index, array_) {
			var row_data = [];
			for(var i in column)
			{
				if( column.hasOwnProperty(i) )
				{
					console.log( i, column[ i ] );	
					row_data.push(column[ i ]);
				}
					
			}
			console.log('--------------------------------------------------');
			self.grid[ uid ].addRow(column.column_name, row_data);
		});
		
		
		//self.helpers.column.added = self.helpers.column.added + 1;
		
		
		//self.toolbar[ uid ].setItemText("grid_name", );
		
		//that.savedSettings[ uid ]
	}
	
	,render : function( configuration ){
		var that = gridMaker, self = gridMaker.view.Admin;
		
		if( typeof configuration.field_id === 'undefined' )
			that.configuration.field_id = 0;
		else
			if( ! CAIRS.isNumber( configuration.field_id ) )
			{
				alert("Wrong component call. \n The field_id parameter shall to be an integer when calling the gridMaker Admin! The Admin will not start.");
				return;
			}
			else
			{
				that.configuration.field_id = configuration.field_id;
			}
			
		if( typeof configuration.container === 'undefined' )
		{
			alert("Wrong component call. \n The container parameter is missing! The Admin will not start.");
			return;
		}
		
		self.uid = configuration.container;
		
		self.container[ self.uid ] = configuration.container;
		
		that.savedSettings[ configuration.container ]  = configuration.settings
		
		try
		{
			//self.addNewSettings( self.container[ uid ] );
				
				self._window( self.uid );
				self._layout( self.uid );
				self._toolbar( self.uid );
				self._toolbar_form( self.uid );
				self._toolbar_grid( self.uid );
				self._form( self.uid );
				self._grid( self.uid );
				
				
				self._renderSettings( self.uid );
				
				//self.isOpened = true;
			
			
		}
		catch(e)
		{
			console.log(e.stack);
		}
	}
};