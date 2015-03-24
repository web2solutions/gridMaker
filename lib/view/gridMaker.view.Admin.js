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
	
	,teableCreatedID: []
	
	,uid : null
	
	,configuration : []
	
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
			
			
			var storageName = that.settings.appId + "_gridSettings_" + that.configuration.field_id;
			
			if( self.configuration[ uid ].fnCallBack ) self.configuration[ uid ].fnCallBack( JSON.parse( localStorage.getItem( storageName )), true );
			
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
		
		self.toolbar[ uid ].attachEvent("onClick", function (id) {
			if (id == "save") {
				
				self.helpers.grid.table.save( uid );
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
		
		//self.grid[ uid ].setColValidators([null,null,null,null,null,'ValidInteger',null,null]);
		//self.grid[ uid ].enableValidation(true); 
		//dhtmlx_grid_header,dhtmlx_grid_type,column_name,column_type,dhtmlx_grid_sorting,dhtmlx_grid_width,dhtmlx_grid_align,dhtmlx_grid_footer

		self.grid[ uid ].init();
		
		var dhtmlx_grid_align_combo = self.grid[ uid ].getCombo(self.grid[ uid ].getColIndexById("dhtmlx_grid_align"));
		dhtmlx_grid_align_combo.put("left", "left");
		dhtmlx_grid_align_combo.put("right", "right");
		dhtmlx_grid_align_combo.put("center", "center");
		
		
		self.grid[ uid ].attachEvent("onEditCell", function(stage,rId,cInd,nValue,oValue){
			if( stage == 0 )
			{
				//0-before start; can be canceled if return false
			}
			else if( stage == 1 )
			{
				// 1 - the editor is opened
			}
			else if( stage == 2 )
			{
				// 2- the editor is closed
				console.log();
				
				// if is width
				if( cInd == this.getColIndexById("dhtmlx_grid_width") )
				{
					if( nValue != '*' && ( !CAIRS.isNumber(nValue) ) )
					{
						dhtmlx.alert({
								title: "unable to save",
								type: "alert-error",
								text: "Please type '*' for auto sizing or a valid number",
								callback: function() {}
								
						});
						return false;
					}
				}
				
				console.log( nValue, oValue );
				if( nValue != oValue )
				{
					var colId = self.grid[ uid ].getColumnId(cInd);
					var hash = {};
					hash[ colId ] = nValue;
					//hash[ 'column_name' ] = self.grid[ uid ].cells(rId, self.grid[ uid ].getColIndexById('column_name')).getValue();
					gridMaker.view.Admin.helpers.column.edit( uid, rId, hash, function(){ return true; }, function(){ return false; } );
					return true;
				}
				else
					return false;
			}
		});
		
		
		self.grid[ uid ].attachEvent("onRowSelect", function (id, ind) {
			self.toolbar_grid[ uid ].enableItem("delete");
		});
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
			add : function( uid ){
				var that = gridMaker, self = gridMaker.view.Admin, hash = null, row_data = [];
				
				if (CAIRS.dhtmlx.validateForm("gridMaker_Builder_form_admin" + uid, self.form[ uid ])) {
					hash = self.form[ uid ].getFormData();
					//console.log(hash);
					
					self.layout[ uid ].progressOn();
					self.toolbar[ uid ].disableItem('save');				
					
					for(var x in hash){
					  	row_data.push(hash[x]);
					}
					
					console.log( hash );
					hash['gridmaker_table_id'] = self.teableCreatedID[ uid ];
					
					
					CAIRS.MAP.API.post({
						resource :  "/gridmaker/builder/tables/" + self.teableCreatedID[ uid ] + "/columns"
						,format : "json" // not mandatory, default json
						,payload : "table_name="+that.savedSettings[ uid ].table_name+"&table_id="+self.teableCreatedID[ uid ]+"&hash=" + JSON.stringify( hash )
						,onSuccess : function( request )
						{
							try{
								var json = JSON.parse( request.response );
								dhtmlx.message({
									type: "warning",
									text: json.response
								}); 
								
								// old style grid
								that.savedSettings[ uid ].grid.headers.push( hash["dhtmlx_grid_header"] );
								that.savedSettings[ uid ].grid.ids.push( hash["column_name"] );
								that.savedSettings[ uid ].grid.widths.push( hash["dhtmlx_grid_width"] );
								that.savedSettings[ uid ].grid.colaligns.push( hash["dhtmlx_grid_align"] );
								that.savedSettings[ uid ].grid.coltypes.push( hash["dhtmlx_grid_type"] );
								that.savedSettings[ uid ].grid.colsorting.push( hash["dhtmlx_grid_sorting"] );
								
								that.savedSettings[ uid ].columns.push( hash );
								
								
								
								
								localStorage.setItem(that.settings.appId + "_gridSettings_" + that.configuration.field_id, JSON.stringify(that.savedSettings[ uid ]));
								
								
								self.grid[ uid ].addRow(hash["column_name"], row_data);
								
								
								//gridMaker.view.Viewer.reBuild( uid );
								
								//self.thereIsNotSavedColumn = false;
								
								self.helpers.grid.columns.reset( uid );
								
								self.layout[ uid ].progressOff();
								self.toolbar[ uid ].enableItem('save');
								
								
							}catch(e)
							{
								//console.log(e.stack);	
							}
						}
						,onFail : function( request )
						{
							var json = JSON.parse( request.response );
							dhtmlx.alert({
								title: "unable to save",
								type: "alert-error",
								text: "Could not save the grid's column",
								callback: function() {}
								
							});
							self.layout[ uid ].progressOff();
							self.toolbar[ uid ].enableItem('save');
						}
					});
					
					
					
					
				}
			}
			,edit : function( uid, row_id, hash, onSuccess, onFail ){
				var that = gridMaker, self = gridMaker.view.Admin,row_data = [];
				
				
					//console.log(hash);
					
					self.layout[ uid ].progressOn();
					self.toolbar[ uid ].disableItem('save');				
					
					for(var x in hash){
					  	row_data.push(hash[x]);
					}
					
					console.log( hash );
					
					CAIRS.MAP.API.put({
						resource :  "/gridmaker/builder/tables/" + self.teableCreatedID[ uid ] + "/columns/" + row_id
						,format : "json" // not mandatory, default json
						,payload : "table_name="+that.savedSettings[ uid ].table_name+"&table_id="+self.teableCreatedID[ uid ]+"&column_name="+row_id+"&hash=" + JSON.stringify( hash )
						,onSuccess : function( request )
						{
							try{
								var json = JSON.parse( request.response );
								dhtmlx.message({
									type: "warning",
									text: json.response
								}); 
								
								// old style grid
								
								console.log( that.savedSettings[ uid ] );
								
								for(var i in hash)
								{
									if(hash.hasOwnProperty(i))
									{
										var whichArray = '';
										if( i == 'dhtmlx_grid_header' )
											whichArray = 'headers';
										else if( i == 'dhtmlx_grid_width' )
											whichArray = 'widths';
										else if( i == 'dhtmlx_grid_align' )
											whichArray = 'colaligns';
										
										var gridColumnIndex = self.grid[ uid ].getColIndexById(i);
										that.savedSettings[ uid ].grid[whichArray].forEach(function (header, index, array_) {
											if( index == self.grid[ uid ].getColIndexById(i) )
											{
												console.log(that.savedSettings[ uid ].grid[whichArray]);
												that.savedSettings[ uid ].grid[whichArray].splice(index, 1, hash[i]);
												console.log(whichArray);
												console.log(that.savedSettings[ uid ].grid[whichArray]);
											}
										});
									}
								}
								
								
								
								that.savedSettings[ uid ].columns.forEach(function (column, index, array_) {
									if( column.column_name == row_id)
										for(var i in hash)
											if(hash.hasOwnProperty(i))
												that.savedSettings[ uid ].columns[index][i] = hash[ i ];
								});
								
								
								console.log( that.savedSettings[ uid ] );
								
								localStorage.setItem(that.settings.appId + "_gridSettings_" + that.configuration.field_id, JSON.stringify(that.savedSettings[ uid ]));
								
								//gridMaker.view.Viewer.reBuild( uid );
								
								if(onSuccess) onSuccess();
								
								
								self.layout[ uid ].progressOff();
								self.toolbar[ uid ].enableItem('save');
								
								
							}catch(e)
							{
								console.log(e.stack);	
							}
						}
						,onFail : function( request )
						{
							var json = JSON.parse( request.response );
							dhtmlx.alert({
								title: "unable to save",
								type: "alert-error",
								text: "Could not save the grid's column",
								callback: function() {}
								
							});
							if(onFail) onFail();
							self.layout[ uid ].progressOff();
							self.toolbar[ uid ].enableItem('save');
						}
					});
			}
			
			,del : function( uid, onSuccess, onFail ){
				var that = gridMaker, self = gridMaker.view.Admin,row_data = [];
				
				if( typeof self.grid[ uid ].getSelectedRowId() === 'undefined' )
				{
					return;
				}
				
				if( self.grid[ uid ].getSelectedRowId() == null )
				{
					return;
				}
					
					
				var row_id = self.grid[ uid ].getSelectedRowId();
				//var column_name = self.grid[ uid ].cells(row_id, self.grid[ uid ].getColIndexById('column_name')).getValue();
				
				self.layout[ uid ].progressOn();
				self.toolbar[ uid ].disableItem('save');
				self.toolbar_grid[ uid ].disableItem("delete");				
				
				CAIRS.MAP.API.del({
					resource :  "/gridmaker/builder/tables/" + self.teableCreatedID[ uid ] + "/columns/" + row_id
					,format : "json" // not mandatory, default json
					,onSuccess : function( request )
					{
						try{
							var json = JSON.parse( request.response );
							dhtmlx.message({
								type: "warning",
								text: json.response
							}); 
							
							
							/*
							
							var whichArray = '';
										if( i == 'dhtmlx_grid_header' )
											whichArray = 'headers';
										else if( i == 'dhtmlx_grid_width' )
											whichArray = 'widths';
										else if( i == 'dhtmlx_grid_align' )
											whichArray = 'colaligns';
										
										var gridColumnIndex = self.grid[ uid ].getColIndexById(i);
										that.savedSettings[ uid ].grid[whichArray].forEach(function (header, index, array_) {
											if( index == self.grid[ uid ].getColIndexById(i) )
											{
												that.savedSettings[ uid ].grid[whichArray].splice(index, 1, hash[i]);
												console.log(whichArray);
												console.log(that.savedSettings[ uid ].grid[whichArray]);
											}
										});
							
							
							*/
							
						
							that.savedSettings[ uid ].columns.forEach(function (column, index, array_) {
								if( column.column_name == row_id ) that.savedSettings[ uid ].columns.splice(index, 1);
							});
								
						
							
							localStorage.setItem(that.settings.appId + "_gridSettings_" + that.configuration.field_id, JSON.stringify(that.savedSettings[ uid ]));
							
							//gridMaker.view.Viewer.reBuild( uid );
							
							self.grid[ uid ].deleteSelectedRows();
							
							
							if(onSuccess) onSuccess();
							
							
							self.layout[ uid ].progressOff();
							self.toolbar[ uid ].enableItem('save');
							
							
						}catch(e)
						{
							console.log(e.stack);	
						}
					}
					,onFail : function( request )
					{
						var json = JSON.parse( request.response );
						dhtmlx.alert({
							title: "unable to save",
							type: "alert-error",
							text: "Could not delete the grid's column",
							callback: function() {}
							
						});
						if(onFail) onFail();
						self.layout[ uid ].progressOff();
						self.toolbar[ uid ].enableItem('save');
					}
				});
			}	
		}
		
		,grid : {
			table : {
				save: function( uid ){
					var that = gridMaker, self = gridMaker.view.Admin, 
						grid_name_input = self.toolbar[ uid ].getInput("grid_name"), 
						hash_table = null;
					
					
					
					
					if( grid_name_input.value.length < 1 )
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
						grid_name : grid_name_input.value
					};
					
					self.layout[ uid ].progressOn();
					self.toolbar[ uid ].disableItem('save');
					self.toolbar[ uid ].setItemText('save', 'please, hold on ...');
					
					
					//return;
					
					CAIRS.MAP.API.put({
						resource :  "/gridmaker/builder/tables/" + self.teableCreatedID[ uid ]
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
								
								// review
								
								self.toolbar[ uid ].enableItem('save');
								self.toolbar[ uid ].setItemText('save', 'save grid name');
								
								that.savedSettings[ uid ].grid_name = hash_table['grid_name'];
								
								//console.log( that.savedSettings[ uid ].grid_name );
								
								localStorage.setItem(that.settings.appId + "_gridSettings_" + that.configuration.field_id, JSON.stringify(that.savedSettings[ uid ]));
								
								//gridMaker.view.Viewer.reBuild( uid );
								
								self.layout[ uid ].progressOff();
							
								//self.helpers.grid.columns.save();
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
						
						self.form[ uid ].updateValues();
					}, 300);
						
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
					
					
					
					self.toolbar_grid[ uid ].disableItem("delete");
						
					that.savedSettings[ uid ].columns.forEach(function (column, index, array_) {
						if( column.column_name == column_name ) that.savedSettings[ uid ].columns.splice(index, 1);
					});
						
				
					
					localStorage.setItem(that.settings.appId + "_gridSettings_" + that.configuration.field_id, JSON.stringify(that.savedSettings[ uid ]));
					
					//gridMaker.view.Viewer.reBuild( uid );
					
					self.grid[ uid ].deleteSelectedRows();
						
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
						
						self.form[ uid ].updateValues();
						
						
						
						self.layout[ uid ].progressOff();
					}, 300);
					
						
				}
			}
			
				
		}
	}
	
	,_renderSettings : function( uid ){
		var that = gridMaker, self = gridMaker.view.Admin;
		if (CAIRS._enable_log) console.log('-----------------------START _renderSettings---------------------');
		
		if (CAIRS._enable_log) console.log(' >>>>>>>>>> grid name: ', that.savedSettings[ uid ].grid_name);
		if (CAIRS._enable_log) console.log(' >>>>>>>>>> gridmaker_table_id: ', that.savedSettings[ uid ].gridmaker_table_id);
		
		self.teableCreatedID[ uid ] = that.savedSettings[ uid ].gridmaker_table_id;
		
		self.toolbar[ uid ].getInput("grid_name").value = that.savedSettings[ uid ].grid_name;
		
		if (CAIRS._enable_log) console.log(' >> start rendering columns as row at grid');
		that.savedSettings[ uid ].columns.forEach(function (column, index, array_) {
			
			if (CAIRS._enable_log) console.log(' >>>>>>>> start parsing: ', column.dhtmlx_grid_header);
			if (CAIRS._enable_log) console.log(' column object : ', column);
			var row_data = [];
			for(var i in column)
			{
				if( column.hasOwnProperty(i) )
				{
					if (CAIRS._enable_log) console.log( i, column[ i ] );	
					row_data.push(column[ i ]);
				}
					
			}
			
			self.grid[ uid ].addRow(column.column_name, row_data);
			if (CAIRS._enable_log) console.log(' <<<<<<<< end parsing: ', column.dhtmlx_grid_header);			
		});
		if (CAIRS._enable_log) console.log(' <<<<<<<<<< end rendering columns as row at grid');
		
		
		
		if (CAIRS._enable_log) console.log('-----------------------END _renderSettings---------------------');
	
		
		
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
		
		self.uid = configuration.field_id;
		
		self.configuration[ self.uid ]  = configuration;
		
		that.savedSettings[ self.uid ]  = configuration.settings;
		
		try
		{
			self._window( self.uid );
			self._layout( self.uid );
			self._toolbar( self.uid );
			self._toolbar_form( self.uid );
			self._toolbar_grid( self.uid );
			self._form( self.uid );
			self._grid( self.uid );
				
				
			self._renderSettings( self.uid );
		}
		catch(e)
		{
			console.log(e.stack);
		}
	}
};