gridMaker.view.Builder = {
	
	window : null
	,status_bar : null
	,status_bar_form : null
	,layout : null
	,grid: null
	,toolbar : null
	,toolbar_form : null
	,toolbar_grid : null
	
	,isOpened : false
	
	,dependencies_loaded : false
	
	,thereIsNotSavedColumn : false
	
	,tableName: ''
	,tableAlreadyCreated : false
	,teableCreatedID: -1
	,currentlyColumnIdBeingUpdated: -1
	
	,container : null
	
	
	,selectedColumnsOnGrid : ''

	
	,
	/**
	 * Description
	 * @method _window
	 * @param {} uid
	 * @return
	 */
	_window: function ( ) {
		'use strict';
		var that = gridMaker, self = gridMaker.view.Builder;

		if (that.window_manager.isWindow("window_gridMaker_builder"))
		{
			self.window.show();
			self.window.bringToTop();
			return;
		}
		
		self.window = that.window_manager.createWindow({
			id: "window_gridMaker_builder",
			left: that.settings.Builder.window.left,
			top: that.settings.Builder.window.top,
			width: that.settings.Builder.window.width,
			height: that.settings.Builder.window.height,
			// XXXXXXXXXXXX bug DHTMLX ... need to report XXXXXXXXX
			//center:true,
			//onClose:function(){
			//	console.log('closing');
			//	self.isOpened = false;
			//	return true;
			//}
		});
		
		
		self.window.attachEvent("onClose", function(win){
			//console.log('closing');
			
			/*if( self.thereIsNotSavedColumn )
			{
				dhtmlx.alert({
					title: "unsaved data",
					type: "alert-error",
					text: "There is unsaved data! Please reset the form before closing this window?"
				});

				return false;
			}*/
			
			
			self.thereIsNotSavedColumn = false;
			self.isOpened = false;
			self.helpers.column.added = 0;
			return true;
		});
		
			
		self.window.setText("Grid Builder");
		//self.window.setIcon(self.model.window.icon, self.model.window.icon_dis);

		self.status_bar = self.window.attachStatusBar();
		self.status_bar.setText("");
	}
	
	
	,_toolbar : function(){
		'use strict';
		var that = gridMaker, self = gridMaker.view.Builder;
		that.settings.Builder.toolbar.icon_path = that.settings.icons_path + "/32px/";
		self.toolbar = self.window.attachToolbar(that.settings.Builder.toolbar);
		self.toolbar.setIconSize(32);
		
		
	
		var grid_name_input = self.toolbar.getInput("grid_name");
		grid_name_input.onkeyup = function (event) {
			self.tableName = "gridMaker_data_" + that.configuration.field_id + "_" + self.helpers.toSQLname(this.value)
		};
		
		self.toolbar.attachEvent("onClick", function (id) {
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
		
		
		//console.log(self.toolbar)
		//self.toolbar.enableItem("delete");
	}
	
	,_toolbar_form : function(){
		var that = gridMaker, self = gridMaker.view.Builder;
		that.settings.Builder.toolbar_form.icon_path = that.settings.icons_path;
		self.toolbar_form = self.layout.cells("a").attachToolbar(that.settings.Builder.toolbar_form);
		
		self.toolbar_form.attachEvent("onClick", function (id) {
			//console.log( id );
			id == "save" ? self.helpers.column.add() : "";
			id == "reset" ? self.helpers.grid.columns.reset() : "";
			
			
		});
	}
	
	,_toolbar_grid : function(){
		var that = gridMaker, self = gridMaker.view.Builder;
		that.settings.Builder.toolbar_grid.icon_path = that.settings.icons_path;
		self.toolbar_grid = self.layout.cells("b").attachToolbar(that.settings.Builder.toolbar_grid);
		self.toolbar_grid.attachEvent("onClick", function (id) {
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
							self.helpers.grid.columns.del();
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
							self.helpers.grid.columns.save();
					}
				});
			}
		});
	}
	
	,_layout : function(){
		var that = gridMaker, self = gridMaker.view.Builder;
		self.layout = self.window.attachLayout(that.settings.Builder.layout);
		//self.layout.setAutoSize("a", "a;c");
		self.layout.cells("a").hideHeader();
		self.layout.cells("a").setText("Set up column properties");
		self.layout.cells("a").hideHeader();
		self.layout.cells("a").setHeight(190);
		
		self.layout.cells("b").setText("Columns preview");
		
		
		self.status_bar_form = self.layout.cells("a").attachStatusBar();
		self.status_bar_form.setText("Please set up column properties on the above form");
	}
	
	,_grid: function(){
		var that = gridMaker, self = gridMaker.view.Builder;
		
		self.grid = self.layout.cells("b").attachGrid();
		self.grid.setHeader(that.settings.Builder.grid.headers);
		self.grid.setColumnIds(that.settings.Builder.grid.ids);
		self.grid.setInitWidths(that.settings.Builder.grid.widths);
		self.grid.setColAlign(that.settings.Builder.grid.colaligns);
		self.grid.setColTypes(that.settings.Builder.grid.coltypes);
		self.grid.setColSorting(that.settings.Builder.grid.colsorting);

		self.grid.init();
		
		var dhtmlx_grid_type_combo = self.grid.getCombo(self.grid.getColIndexById("dhtmlx_grid_type"));
		dhtmlx_grid_type_combo.put("cp", "Color - varchar");
		dhtmlx_grid_type_combo.put("price", "Currency - numeric");
		dhtmlx_grid_type_combo.put("dhxCalendarA", "Date - date");
		dhtmlx_grid_type_combo.put("link", "Link - varchar");
		dhtmlx_grid_type_combo.put("edn", "Numeric - numeric");
		dhtmlx_grid_type_combo.put("txttxt", "Text - varchar(max)");
		
		
		
		self.grid.attachEvent("onRowSelect", function (id, ind) {
			//console.log(self.toolbar);
			// DHTMLX BUG
			//self.toolbar.enableItem("delete");
			//self.toolbar.enableItem("edit");
			
	

			self.selectedColumnsOnGrid = id;
		});

		//self.grid.enableHeaderMenu();
	}
	
	
	,_form : function(){
		var that = gridMaker, self = gridMaker.view.Builder, 
			column_name_input = null, column_type_input = null, column_name_doOnKeyUp = null, dhtmlx_grid_sorting_input = null 
			dhtmlx_grid_header_input = null, dhtmlx_grid_type_combo = null, dhtmlx_grid_width_input = null;
			
		self.form = self.layout.cells("a").attachForm(that.settings.Builder.form.template);
		CAIRS.dhtmlx.prepareForm("gridMaker_Builder_form", that.settings.Builder.form, self.form);
		
		
		column_name_input = self.form.getInput("column_name");
		column_type_input = self.form.getInput("column_type");
		dhtmlx_grid_header_input = self.form.getInput("dhtmlx_grid_header");
		dhtmlx_grid_sorting_input = self.form.getInput("dhtmlx_grid_sorting");
		
		dhtmlx_grid_width_input = self.form.getInput("dhtmlx_grid_width");
		dhtmlx_grid_width_input.onkeyup = function(event){
			//console.log(self.helpers.toDHTMLXsize( this.value ));
			this.value = self.helpers.toDHTMLXsize( this.value );
			self.form.updateValues();
		}
		
		dhtmlx_grid_header_doOnKeyUp =  function (event) {
			column_name_input.value = self.helpers.toSQLname(this.value);
			self.form.updateValues();
		};		
		
		if (window.addEventListener)
		{
			dhtmlx_grid_header_input.addEventListener("keyup", dhtmlx_grid_header_doOnKeyUp, false);
		}
		else
		{
			dhtmlx_grid_header_input.attachEvent("onkeyup", dhtmlx_grid_header_doOnKeyUp);
		}
		
		dhtmlx_grid_type_combo = self.form.getCombo("dhtmlx_grid_type");
		dhtmlx_grid_type_combo.attachEvent("onChange", function( value, text ){
			column_type_input.value = self.helpers.toSQLtype( value ); 
			dhtmlx_grid_sorting_input.value = self.helpers.toDHTMLXsorting( value ); 
			//toDHTMLXsorting
			
			self.form.updateValues();       
			return true;                                                           
		});
		
		
		self.form.attachEvent("onKeyUp",function(inp, ev, name, value){
			//console.log(ev);
			var key_code = ev.keyCode? ev.keyCode : ev.charCode;
			if(key_code == 13)
			{
				self.helpers.column.add();
			}
		});
		
		self.form.attachEvent("onChange", function (id, value)
		{
			self.thereIsNotSavedColumn = true;
			
			if(id == "dhtmlx_grid_type")
			{
				
			}
		});
	}


	,_loadDependencies : function( callBack ){
		var that = gridMaker, self = gridMaker.view.Builder;
		var dependencies = [
			//that.settings.application_path + "lib/view/gridMaker.view.Builder.PanelProperties.js"
			
		];
	
		CAIRS.onDemand.load( dependencies, function ()
		{
			if(callBack) callBack();
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
			,add : function(){
				var that = gridMaker, self = gridMaker.view.Builder;
				
				if (CAIRS.dhtmlx.validateForm("gridMaker_Builder_form", self.form)) {
					var hash = self.form.getFormData();
					//console.log(hash);					
					
					var row_data = [];
					for(var x in hash){
					  	row_data.push(hash[x]);
					  	//clear_hash[x] = "";
					}
					
					self.helpers.column.added = self.helpers.column.added + 1;
					self.grid.addRow(gridMaker.view.Builder.helpers.column.added, row_data);
					
					
					/*
						"headers": "CountryText,isHagueCountry,isStateFinalizationRequired",
						"ids": "CountryText,isHagueCountry,isStateFinalizationRequired",
						"widths": "150,150,100",
						"colaligns": "left,left,left",
						"coltypes": "ro,ro,ro",
						"colsorting": "str,str,str"
					*/
					
					// old style grid
					that.savedSettings[ self.container ].grid.headers.push( hash["dhtmlx_grid_header"] );
					that.savedSettings[ self.container ].grid.ids.push( hash["column_name"] );
					that.savedSettings[ self.container ].grid.widths.push( hash["dhtmlx_grid_width"] );
					that.savedSettings[ self.container ].grid.colaligns.push( hash["dhtmlx_grid_align"] );
					that.savedSettings[ self.container ].grid.coltypes.push( hash["dhtmlx_grid_type"] );
					that.savedSettings[ self.container ].grid.colsorting.push( hash["dhtmlx_grid_sorting"] );
					
					that.savedSettings[ self.container ].columns.push( hash );
					
					// new set up approach for grid
					that.savedSettings[ self.container ].grid.head.push( {
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
					var that = gridMaker, self = gridMaker.view.Builder, 
						grid_name_input = self.toolbar.getInput("grid_name"), 
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
							callback: function() {self.form.getInput("dhtmlx_grid_header").focus();}
						});
						self.form.getInput("dhtmlx_grid_header").focus();
						return;
					}
					
					
					hash_table = {
						table_name : self.tableName
						,grid_name : grid_name_input.value
					};
					
					self.layout.progressOn();
					
					
					
					
					if( ! self.tableAlreadyCreated && self.teableCreatedID == -1 )
					{
						CAIRS.MAP.API.post({
							resource :  "/gridmaker/builder/tables"
							,format : "json" // not mandatory, default json
							,payload : "table_name="+self.tableName+"&hash=" + JSON.stringify( hash_table )
							,onSuccess : function( request )
							{
								var json = JSON.parse( request.response );
								dhtmlx.message({
									type: "warning",
									text: json.response
								});
								grid_name_input.onkeyup = function (event) {};
								//console.log(request);
								//alert("Id of the new record: " + json.gridmaker_table_id);
								self.tableAlreadyCreated = true;
								self.teableCreatedID = json.gridmaker_table_id;
								self.toolbar.setItemText('save', 'Update grid name');
								
								that.savedSettings[ self.container ].grid_name = grid_name_input.value;
								that.savedSettings[ self.container ].table_name = self.tableName;
								that.savedSettings[ self.container ].gridmaker_table_id = self.teableCreatedID;
								
								self.layout.progressOff();
								
								self.helpers.grid.columns.save();
							}
							,onFail : function( request )
							{
								var json = JSON.parse( request.response );
								alert("error");
							}
						});
					}
					else
					{
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
									
									self.toolbar.setItemText('save', 'Update grid name');
								}
								catch(e)
								{
									console.log(e.stack);	
								}
								self.layout.progressOff();
							}
							,onFail : function( request )
							{
								var json = JSON.parse( request.response );
								alert("error");
							}
						});
					}
				}	
			}
			,columns : {
				reset : function(){
					var that = gridMaker, self = gridMaker.view.Builder;
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
					self.form.setFormData(clear_hash);
					window.setTimeout(function(){
						self.thereIsNotSavedColumn = false;
						self.form.updateValues();
					}, 300);
						
				}	
				,save: function( fnCallBack ){
					var that = gridMaker, self = gridMaker.view.Builder;
					
					if( ! self.tableAlreadyCreated )
					{
						dhtmlx.alert({
							title: "unable to save",
							type: "alert-error",
							text: "You need to save the table first!"
						});
						return;
					}
					
					self.layout.progressOn();
					
					that.savedSettings[ self.container ].columns.forEach(function (column, index, array_) {
						that.savedSettings[ self.container ].columns[ index ][ "gridmaker_table_id" ] =  self.teableCreatedID;
					});
					
					CAIRS.MAP.API.post({
						resource :  "/gridmaker/builder/tables/" + self.teableCreatedID + "/columns"
						,format : "json" // not mandatory, default json
						,payload : "table_name="+that.savedSettings[ self.container ].table_name+"&table_id="+self.teableCreatedID+"&hash=" + JSON.stringify( that.savedSettings[ self.container ].columns )
						,onSuccess : function( request )
						{
							try{
								var json = JSON.parse( request.response );
								dhtmlx.message({
									type: "warning",
									text: json.response
								}); 
								
								if( fnCallBack ) fnCallBack();
								
								
								console.log( JSON.stringify( that.savedSettings[ self.container ] ) );
								
								self.layout.progressOff();
								self.window.close();
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
				,del: function(  ){
					var that = gridMaker, self = gridMaker.view.Builder;
					
					if( typeof self.grid.getSelectedRowId() === 'undefined' )
					{
						return;
					}
					
					if( self.grid.getSelectedRowId() == null )
					{
						return;
					}
					
					var row_id = self.grid.getSelectedRowId();
					var column_name = self.grid.cells(row_id, 2).getValue();
					// delete row here
					
					self.helpers.column.added = self.helpers.column.added - 1;
					
					self.grid.deleteSelectedRows();
						
					that.savedSettings[ self.container ].columns.forEach(function (column, index, array_) {
						if( column.column_name == column_name ) that.savedSettings[ self.container ].columns.splice(index, 1);
					});
						
					that.savedSettings[ self.container ].grid.head.forEach(function (column, index, array_) {
						if( column.id == column_name ) that.savedSettings[ self.container ].grid.head.splice(index, 1);
					});
						
				}
				,edit: function(){
					var that = gridMaker, self = gridMaker.view.Builder;
					var hash = {};
					var row_id = self.grid.getSelectedRowId();
					
					if( typeof self.grid.getSelectedRowId() === 'undefined' )
					{
						return;
					}
					
					if( self.grid.getSelectedRowId() == null )
					{
						return;
					}
					
					self.layout.progressOn();
					
					self.grid.forEachCell(row_id, function(cellObj, ind){
						var columnID = self.grid.getColumnId(ind);
						var columnValue = self.grid.cells(row_id, ind).getValue();
						hash[ columnID ] = columnValue;
					});
					
					self.helpers.grid.columns.del();
					
					self.form.setFormData(hash);
					window.setTimeout(function(){
						self.thereIsNotSavedColumn = true;
						self.form.updateValues();
						
						self.currentlyColumnIdBeingUpdated = row_id;
						
						self.layout.progressOff();
					}, 300);
					
						
				}
			}
			
				
		}
	}
	
	,render : function( configuration ){
		var that = gridMaker, self = gridMaker.view.Builder;
		
		if( typeof configuration.field_id === 'undefined' )
			that.configuration.field_id = 0;
		else
			if( ! CAIRS.isNumber( configuration.field_id ) )
			{
				alert("Wrong component call. \n The field_id parameter shall to be an integer when calling the gridMaker Builder! The Builder will not start.");
				return;
			}
			else
			{
				that.configuration.field_id = configuration.field_id;
			}
			
		if( typeof configuration.container === 'undefined' )
		{
			alert("Wrong component call. \n The container parameter is missing! The Builder will not start.");
			return;
		}
		
		self.container = configuration.container;
		
		try
		{
			if(! self.isOpened)
			{
				that.addNewSettings( self.container );
				
				self._window();
				self._layout();
				self._toolbar();
				self._toolbar_form();
				self._toolbar_grid();
				self._form();
				self._grid();
				
				self.isOpened = true;
			}
			else
			{
				dhtmlx.alert({
					title: "builder grid screen",
					type: "alert-error",
					text: "You can't create 2 grids at same time!"
				});
				
				self.window.show();
				self.window.bringToTop();
				return;
			}
			
			
		}
		catch(e)
		{
			console.log(e.stack);
		}
	}
};