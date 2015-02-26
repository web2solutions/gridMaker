gridMaker.view.Builder = {
	
	layout : null
	,toolbar : null
	,tabbar : null
	,tabbar_tools : null
	
	,PanelProperties : null
	,PanelFields : null
	,DesignerGrid : null
	,PanelStructure : null
	
	,dependencies_loaded : false
	
	,_tabbar : function(){
		var that = gridMaker, self = gridMaker.view.Builder;
		self.tabbar = that.view.layout.cells("b").attachTabbar(that.settings.Designer.tabbar);
		
	}
	
	
	,_toolbar : function(){
		var that = gridMaker, self = gridMaker.view.Builder;
		that.settings.Designer.toolbar.icon_path = that.settings.icons_path + "/32px/";
		self.toolbar = that.view.layout.cells("b").attachToolbar(that.settings.Designer.toolbar);
	}
	
	,_layout : function(){
		var that = gridMaker, self = gridMaker.view.Builder;
		self.layout = self.tabbar.cells("gridMaker.view.Builder").attachLayout(that.settings.Designer.layout);
		self.layout.setAutoSize("a", "a;c");
		self.layout.cells("a").hideHeader();
		self.layout.cells("c").hideHeader();
		self.layout.cells("b").setText("Designer tools");
		self.layout.cells("b").setWidth(400);	
		self.layout.attachEvent("onExpand", function(id){
			/*if(id == "b")
				self.layout.cells("a").collapse();
			else if(id == "a")
				self.layout.cells("b").collapse();
			*/
		});
	}
	

	,_tabbar_tools : function(){
		var that = gridMaker, self = gridMaker.view.Builder;
		self.tabbar_tools = self.layout.cells("b").attachTabbar(that.settings.Designer.tabbar_tools);
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
		if(!self.dependencies_loaded)
		{
			
			
			//self._loadDependencies( function()
			//{
				//self.dependencies_loaded = true;
				
				/*self._tabbar();
				self._layout();
				self._tabbar_tools();
				self._toolbar();
				self.PanelProperties.render();
				self.DesignerGrid.render();
				self.PanelStructure.render();
				self.PanelFields.render();
				self.PanelSpecialFields.render();
				self.PanelComponents.render();
				self.PanelLibraryFields.render();
				
				that.Rules.view.render();
				
				that.FormInformation.view.render();
				*/
				
			//});
		}
		else
		{
			/*self._tabbar();
			self._layout();
			self._tabbar_tools();
			self._toolbar();
			self.PanelProperties.render();
			self.DesignerGrid.render();
			self.PanelStructure.render();
			self.PanelFields.render();
			
			that.Rules.view.render();
			
			that.FormInformation.view.render();*/
			
			
		}
	}
};