gridMaker.view.Builder = {
	
	window : null
	,window_manager : null
	,status_bar : null
	,status_bar_form : null
	,layout : null
	,grid: null
	,toolbar : null
	,toolbar_form : null
	,toolbar_grid : null
	
	,dependencies_loaded : false
	
	,thereIsNotSavedColumn : false
	
	
	

	,
	/**
	 * Description
	 * @method _window
	 * @param {} uid
	 * @return
	 */
	_window: function ( ) {
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
		var that = gridMaker, self = gridMaker.view.Builder;
		that.settings.Builder.toolbar.icon_path = that.settings.icons_path + "/32px/";
		self.toolbar = self.window.attachToolbar(that.settings.Builder.toolbar);
		self.toolbar.setIconSize(32);
		
		
		var table_name_input = self.toolbar.getInput("table_name");
		table_name_input.setAttribute("readOnly", "true");
		table_name_input.onclick = function(){ }
		
		var grid_name_input = self.toolbar.getInput("grid_name");
		grid_name_input.onkeyup = function (event) {
			table_name_input.setAttribute("value", "gridMaker_data_FID_" + self.helpers.toSQLname(this.value))
		};
		
		self.toolbar.attachEvent("onClick", function (id) {
			if (id == "save") {
				
				dhtmlx.message({
							title: "Save and create grid",
							type: "confirm",
							text: "Do you really want to save and create the grid? This window will be closed when saved!",
							ok: "yes",
							cancel: "no, I'll review ...",
							/**
							 * Description
							 * @method callback
							 * @param {} ok
							 * @return
							 */
							callback: function (ok) {
								self.helpers.grid.save();
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
			if (id == "save") {
				
			}
			else if (id == "delete") {
				
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
		
		//mygrid.setNumberFormat("0,000.00",0,".",","); 

		//self.grid[ uid ].enablePaging(false, 100, 10, "toolbar_taskbar_FormBuilder", true);

		//self.grid[ uid ].setPagingSkin("toolbar", "dhx_skyblue");

		//self._form_context_menu(uid);

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
			console.log(ev);
			
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
					
					var row_data = [];
					for(var x in hash){
					  row_data.push(hash[x]);
					  clear_hash[x] = "";	
					}
					
					var newId = (new Date()).valueOf();
					self.grid.addRow(newId,row_data);
					
					
					self.form.setFormData(clear_hash);
					window.setTimeout(function(){
						self.form.updateValues();
					}, 300);
					
					self.thereIsNotSavedColumn = false;
				}
			}	
		}
		
		,grid : {
			save : function(){
				var that = gridMaker, self = gridMaker.view.Builder;
				if( self.thereIsNotSavedColumn == true )
				{
					
					dhtmlx.alert({
						type: "error",
						text: "There is a not saved column on the first panel, please clear the form or save the column first!"
					});
					return;
				}
				
				var hash = {};
				
				var table_name_input = self.toolbar.getInput("table_name");
				var grid_name_input = self.toolbar.getInput("grid_name");
				
				
				if( grid_name_input.value.length < 1 || table_name_input.value.length < 1 )
				{
					dhtmlx.alert({
						type: "error",
						text: "Please provide a name for the grid!"
					});
					return;	
				}
				
				
				// save table now
				
				
				// onsucess of saving table, lets save the columns
				
				
				console.log(hash);
				
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