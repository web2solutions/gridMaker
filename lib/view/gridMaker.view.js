/*jslint browser: true, devel: true, eqeq: true, newcap: true, nomen: true, white: true */
/*global CAIRS, dhtmlx, dhtmlXLayoutObject, gridMaker */

gridMaker.view = {

	layout : null
	,toolbar : null
	,status_bar : null
	
	,dependencies_loaded : false

	,_layout : function(){
		var that = gridMaker, self = gridMaker.view;

		self.layout = new dhtmlXLayoutObject(that.configuration.container, that.settings.layout.pattern);
		self.layout.cells("a").hideHeader();

		self.status_bar = self.layout.attachStatusBar();
		self.status_bar.setText("<div id='status_info'>Application Builder</div><div id='expiration_info' title='time remaining for token expiration' class='expiration_info'></div><div id='user_info'><img id='user_info_status' src='" + that.settings.icons_path + "offline.png' /> <span>Not authorized yet</span></div><div id='data_transfer_info'> no data transferred</div><div id='socket_info' class='data_transfer_info'> </div><div id='errors_info'>no errors</div>");
	}


	,_toolbar : function(){
		var that = gridMaker, self = gridMaker.view;

		that.settings.toolbar.icon_path = that.settings.icons_path + "32px/";

		self.toolbar = self.layout.cells("a").attachToolbar( that.settings.toolbar );
		self.toolbar.setIconSize(32);

		self.toolbar.attachEvent("onClick", function (id) {
			if (id == "new_form") {
				//that.Designer.start();
			}
		});
	}


	,_loadDependencies : function( callBack ){
		var that = gridMaker,
			dependencies = [
				that.settings.application_path + "lib/view/gridMaker.view.Builder.js"
			];

		CAIRS.onDemand.load( dependencies, function ()
		{
			if(callBack) callBack();
		});
	}

	,render : function(){
		var that = gridMaker, self = gridMaker.view;
		CAIRS.showDirections("starting view ... ");
		
		if(!self.dependencies_loaded)
		{
			self._loadDependencies( function()
			{
				self.dependencies_loaded = true;
				//self._layout();
				//self._toolbar();
	
				//that.view.FormsListing.render();
	
				//self.layout.cells("b").collapse();
				
				self.Builder.render();
				
				CAIRS.hideDirections();
			} );
		}
		else
		{
			CAIRS.hideDirections();
		}
		
	}
};
