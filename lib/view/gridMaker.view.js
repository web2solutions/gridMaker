/*jslint browser: true, devel: true, eqeq: true, newcap: true, nomen: true, white: true */
/*global CAIRS, dhtmlx, dhtmlXLayoutObject, gridMaker */

gridMaker.view = {

	dependencies_loaded : false

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
				
				
				that._window_manager();
				
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
