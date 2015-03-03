gridMaker.view.Builder = {
	
	window : null
	,status_bar : null
	,status_bar_form : null
	,layout : null
	,grid: null
	,toolbar : null
	,toolbar_form : null
	,toolbar_grid : null
	
	,dependencies_loaded : false
	
	,thereIsNotSavedColumn : false
	
	,tableName : ''
	,tableAlreadyCreated : false
	,teableCreatedID : -1

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
			//center:true,
			onClose:function(){
				alert("I'm closed");
			}
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
				
				/*dhtmlx.confirm({
					title: "Save and create grid",
					type: "confirm-warning",
					text: "Do you really want to save and create the grid? This window will be closed when saved!",
					ok: "yes",
					cancel: "no, I'll review ...",
	
					callback: function (ok) {
						if( ok )*/
							self.helpers.grid.table.save();
					/*}
				});*/
			}
			else if (id == "save_columns")
			{	
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
	
	,_toolbar_form : function(){
		var that = gridMaker, self = gridMaker.view.Builder;
		that.settings.Builder.toolbar_form.icon_path = that.settings.icons_path;
		self.toolbar_form = self.layout.cells("a").attachToolbar(that.settings.Builder.toolbar_form);
		
		self.toolbar_form.attachEvent("onClick", function (id) {
			//console.log( id );
			id == "save" ? self.helpers.column.add() : "";
			id == "reset" ? self.form.reset() : "";
		});
	}
	
	,_toolbar_grid : function(){
		var that = gridMaker, self = gridMaker.view.Builder;
		that.settings.Builder.toolbar_grid.icon_path = that.settings.icons_path;
		self.toolbar_grid = self.layout.cells("b").attachToolbar(that.settings.Builder.toolbar_grid);
		self.toolbar_grid.attachEvent("onClick", function (id) {
			if (id == "edit") {
				
			}
			else if (id == "delete") {
				
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
		self.grid.selMultiRows = true;
		self.grid.setDateFormat("%m-%d-%Y");

		self.grid.init();
		
		var dhtmlx_grid_type_combo = self.grid.getCombo(self.grid.getColIndexById("dhtmlx_grid_type"));
		dhtmlx_grid_type_combo.put("cp", "Color - varchar");
		dhtmlx_grid_type_combo.put("price", "Currency - numeric");
		dhtmlx_grid_type_combo.put("dhxCalendarA", "Date - date");
		dhtmlx_grid_type_combo.put("link", "Link - varchar");
		dhtmlx_grid_type_combo.put("edn", "Numeric - numeric");
		dhtmlx_grid_type_combo.put("txttxt", "Text - varchar(max)");

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
					return 'datetime';
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
			add : function(){
				var that = gridMaker, self = gridMaker.view.Builder;
				
				if (CAIRS.dhtmlx.validateForm("gridMaker_Builder_form", self.form)) {
					var hash = self.form.getFormData();
					//console.log(hash);
					
					
					
					var row_data = [];
					for(var x in hash){
					  row_data.push(hash[x]);
					  //clear_hash[x] = "";	
					}
					
					var newId = (new Date()).valueOf();
					self.grid.addRow(newId,row_data);
					
					
					
					self.thereIsNotSavedColumn = false;
				}
			}	
		}
		
		,grid : {
			table : {
				save : function(){
					var that = gridMaker, self = gridMaker.view.Builder, grid_name_input = null, hash_table = null;
					if( self.thereIsNotSavedColumn == true )
					{
						dhtmlx.alert({
							title: "unable to save",
							type: "alert-error",
							text: "There is a not saved column on the first panel, please clear the form or save the column first!"
						});
						return;
					}
					
					grid_name_input = self.toolbar.getInput("grid_name");
					
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
							,payload : "hash=" + JSON.stringify( hash_table )
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
								self.layout.progressOff();
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
								var json = JSON.parse( request.response );
								
								dhtmlx.message({
									type: "warning",
									text: json.response
								});
								
								
								grid_name_input.onkeyup = function (event) {
									
								};
								
								console.log(request);
								//alert("Id of the new record: " + json.gridmaker_table_id);
								
								self.tableAlreadyCreated = true;
								
								self.toolbar.setItemText('save', 'Update grid name');
								
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
						column_type: "txttxt",
						dhtmlx_grid_align: "left",
						dhtmlx_grid_footer: "",
						dhtmlx_grid_header: "",
						dhtmlx_grid_sorting: "str",
						dhtmlx_grid_type: "txttxt",
						dhtmlx_grid_width: "*"	
					};
					self.form.setFormData(clear_hash);
					window.setTimeout(function(){
						self.form.updateValues();
					}, 300);	
				}	
				,save: function(){
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
						
				}
			}
			
				
		}
	}
	
	,render : function(){
		var that = gridMaker, self = gridMaker.view.Builder;
		
		try
		{
			self._window();
			self._layout();
			self._toolbar();
			self._toolbar_form();
			self._toolbar_grid();
			self._form();
			self._grid();
		}
		catch(e)
		{
			console.log(e.stack);
		}
	}
};