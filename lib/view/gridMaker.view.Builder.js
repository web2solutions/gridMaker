gridMaker.view.Builder = {
	
	window : null
	,window_manager : null
	,status_bar : null
	,layout : null
	,grid: null
	,toolbar : null
	,tabbar : null
	,tabbar_tools : null
	
	,dependencies_loaded : false
	
	
	,
	/**
	 * Description
	 * @method _window_manager
	 * @return
	 */
	_window_manager: function () {
		var that = gridMaker, self = gridMaker.view.Builder;
		self.window_manager = new dhtmlXWindows({
			//image_path:"codebase/imgs/",
			skin:"dhx_blue"
		});
		//self.window_manager.setImagePath(self.model.window.image_path);
	}

	,
	/**
	 * Description
	 * @method _window
	 * @param {} uid
	 * @return
	 */
	_window: function ( ) {
		var that = gridMaker, self = gridMaker.view.Builder;

		if (self.window_manager.isWindow("window_gridMaker_builder"))
		{
			self.window.show();
			self.window.bringToTop();
			return;
		}
		
		self.window = self.window_manager.createWindow({
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
			
		self.window.setText("Set up the grid");
		//self.window.setIcon(self.model.window.icon, self.model.window.icon_dis);

		self.status_bar = self.window.attachStatusBar();
		self.status_bar.setText("");
	}
	
	
	,_toolbar : function(){
		var that = gridMaker, self = gridMaker.view.Builder;
		that.settings.Builder.toolbar.icon_path = that.settings.icons_path + "/32px/";
		self.toolbar = self.layout.attachToolbar(that.settings.Builder.toolbar);
	}
	
	,_layout : function(){
		var that = gridMaker, self = gridMaker.view.Builder;
		self.layout = self.window.attachLayout(that.settings.Builder.layout);
		//self.layout.setAutoSize("a", "a;c");
		//self.layout.cells("a").hideHeader();
		self.layout.cells("a").setText("Set up column properties");
		self.layout.cells("b").setText("Final columns configuration");
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

		//self.grid.enableHeaderMenu();
	}
	
	
	,_form : function(){
		var that = gridMaker, self = gridMaker.view.Builder;
		self.form = self.layout.cells("a").attachForm(that.settings.Builder.form.template);
	
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
	
	,render : function(){
		var that = gridMaker, self = gridMaker.view.Builder;
		
		if (self.window_manager === null)
			self._window_manager();
		
		try
		{
			self._window();
			self._layout();
			self._toolbar();
			self._form();
			self._grid();
		}
		catch(e)
		{
			console.log(e.stack);
		}
	}
};