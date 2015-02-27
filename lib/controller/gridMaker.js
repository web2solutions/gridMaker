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

	,
	_loadDependencies: function (c, callBack) {
		'use strict';
		var dependencies = [
			c.base_path + "gridMaker/css/gridMaker.css"
			,c.base_path + "gridMaker/lib/settings/gridMaker.settings.js"
			,c.base_path + "gridMaker/lib/model/gridMaker.model.js"
			,c.base_path + "gridMaker/lib/view/gridMaker.view.js"		
		];
		
		typeof window.JSON === 'undefined' ? dependencies.unshift(c.base_path + "gridMaker/js/json2.js") : "";
		
		if( typeof window.dhx4 === 'undefined' )
		{
			dependencies.unshift(c.base_path + "gridMaker/codebase4.1/dhtmlx.css");
			dependencies.unshift(c.base_path + "gridMaker/codebase4.1/dhtmlx.js");
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
			
			
			if( typeof self.configuration.base_path === 'undefined' )
			{
				alert("Wrong component call. \n The base_path parameter is missing! The component will not start.");
				return;
			}
			
			if( typeof self.configuration.field_id === 'undefined' )
				self.configuration.field_id = 0;
			else
				if( ! CAIRS.isNumber(self.configuration.field_id) )
				{
					alert("Wrong component call. \n The field_id parameter shall to be an integer when calling the gridMaker! The component will not start.");
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
							self.view.render();
						}, function () {
							alert("Could not start model");
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
			console.log(">>> error when stating the component:");
			console.log(e.stack);
			console.log(">>>>>>>>>");
		}
	}
};