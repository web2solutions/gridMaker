/*jslint browser: true, devel: true, eqeq: true, newcap: true, nomen: true, white: true */
/*global CAIRS, dhtmlx, dhtmlXLayoutObject, gridMaker */
var gridMaker = {

	configuration: {}

	,
	settings: {}

	,
	model: {}

	,
	view: {}
	
	,window_manager : null
	
	,savedSettings:[]
	
	
	,base_path : CAIRS.CDN
	
	,addNewSettings : function( container_id ){
		'use strict';
		var self = this;
		
		this.savedSettings[ container_id ]  = {
			grid_name: ''
			,table_name: ''
			,gridmaker_table_id: ''
			,columns: []
			,grid : { 
				head:[ ],
				data:[ ],
				rows: [ ],
				headers: [],
				ids: [],
				widths: [],
				colaligns: [],
				coltypes: [],
				colsorting: []
			}
		}
	}
	
	,
	/**
	 * Description
	 * @method _window_manager
	 * @return
	 */
	_window_manager: function () {
		'use strict';
		var self = this;
		self.window_manager = new dhtmlXWindows({
			//image_path:"codebase/imgs/",
			skin:"dhx_blue"
		});
		//self.window_manager.setImagePath(self.model.window.image_path);
	}

	,
	_loadDependencies: function (c, callBack) {
		'use strict';
		var dependencies = [
			c.base_path + "gridMaker/css/gridMaker.css"
			,c.base_path + "gridMaker/lib/settings/gridMaker.settings.js"
			,c.base_path + "gridMaker/lib/model/gridMaker.model.js"
			,c.base_path + "gridMaker/lib/view/gridMaker.view.js"		
		];
		
		if( typeof jQuery === 'undefined' )
		{
			dependencies.push( "//code.jquery.com/jquery-1.11.1.min.js" );
		}
		// Currency mask - shall to be loaded after JQUERY only
		dependencies.push( c.base_path + "gridMaker/js/jquery.price_format.1.7.min.js" );
		
		typeof window.JSON === 'undefined' ? dependencies.unshift(c.base_path + "gridMaker/js/json2.js") : "";
		
		if( typeof window.dhx4 === 'undefined' )
		{
			//console.log( c.base_path + "gridMaker/codebase4.0/dhtmlx.js" );
			dependencies.unshift(c.base_path + "gridMaker/codebase4.0/dhtmlx.css");
			dependencies.unshift(c.base_path + "gridMaker/codebase4.0/dhtmlx.js");
		}

		CAIRS.onDemand.load(dependencies, function () {
			if (callBack) {
				callBack();
			}
		});
	}

	,
	start: function (configuration) {
		'use strict';
		var self = this;
		try
		{
			console.log( 'start' );
			
			console.log( configuration );
			
			if(configuration.base_path) 
				self.base_path = configuration.base_path;
			else
				configuration.base_path = CAIRS.CDN;
			
			
			self.configuration = configuration;
			self.configuration.container = self.configuration.container || document.body;
			
			if( typeof self.configuration.agency_id === 'undefined' )
			{
				alert("Wrong component call. \n The agency_id parameter is missing! The component will not start.");
				return;
			}
			if( ! CAIRS.isNumber(self.configuration.agency_id) )
			{
				alert("Wrong component call. \n The agency_id parameter shall to be a number! The component will not start.");
				return;
			}
			
			
			if( typeof self.configuration.ConnID === 'undefined' )
			{
				alert("Wrong component call. \n The ConnID parameter is missing! The component will not start.");
				return;
			}
			if( ! CAIRS.isNumber(self.configuration.ConnID) )
			{
				alert("Wrong component call. \n The ConnID parameter shall to be a number! The component will not start.");
				return;
			}
			
			
			if( typeof self.configuration.ConnectionId === 'undefined' )
			{
				alert("Wrong component call. \n The ConnectionId parameter is missing! The component will not start.");
				return;
			}
			if( ! CAIRS.isNumber(self.configuration.ConnectionId) )
			{
				alert("Wrong component call. \n The ConnectionId parameter shall to be a number! The component will not start.");
				return;
			}
			
			
			
	
			self._loadDependencies(configuration, function () {
				//CAIRS.hideDirections();
				CAIRS.init();
				self.settings.base_path = configuration.base_path;
				self.settings.application_path = self.settings.base_path + "gridMaker/";
				self.settings.icons_path = self.settings.application_path + "icons/";
				self.settings.dhtmlx_codebase_path = self.settings.application_path + '/codebase4.0/';
	
				CAIRS.MAP.API.authorize({
					agency_id: configuration.agency_id,
					onSuccess: function ( request )
					{
						self.model.start(function () {
							self.view.render( configuration );
						}, function () {
							alert("Could not start gridMaker model");
						});
					},
					onFail: function () {
						alert("Not authorized to use MAP API");
					}
				});
			});
		}
		catch(e)
		{
			if (CAIRS._enable_log) console.log(">>> error when stating the component:");
			if (CAIRS._enable_log) console.log(e.stack);
			if (CAIRS._enable_log) console.log(">>>>>>>>>");
		}
	}
};