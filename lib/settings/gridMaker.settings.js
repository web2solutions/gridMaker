gridMaker.settings = {
	
	appName : "gridMaker"
	,version : 0.1
	,appId: "gridMaker"
	
	,base_path : ""
	,application_path : ""	
	,icons_path : ""
	,dhtmlx_codebase_path : ""
	
	,layout : {
		pattern : "1C"
		,skin : "dhx_skyblue"	
	}
	
	,toolbar : {
		icon_path: "",
		items: [
			{
                "type": "button",
                "id": "new_form",
                "text": "create new form",
                "img": "add_form.png",
                "img_disabled": "add_form_dis.png"
				//,disabled : false
            },{
                id: "new_s1",
                type: "separator"
            }
		]	
	}
	
	
	,CRUD : {
		window: {
			"left": CAIRS.getPagePosition( "x", 500, 400 ),
			"top": CAIRS.getPagePosition( "y", 500, 400 ),
			"width": 500,
			"height": 400,
			"icon": "form.png",
			"icon_dis": "form.png"
		}	
		,layout : {
			parent:document.body
			,pattern : "1C"
			,skin : "dhx_skyblue"	
		}
		,toolbar : {
			icon_path: "",
			items: [
				{
					"type": "button",
					"id": "add",
					"text": "add record",
					"img": 'add.png',
					"img_disabled": 'add.png'
					//,disabled : false
				}
				,{
					"type": "separator",
					"id": "sep0",
				}
				,{
					"type": "button",
					"id": "edit",
					"text": "edit record",
					"img": 'edit.png',
					"img_disabled": 'edit_dis.png'
					,disabled : true
				}
				,{
					"type": "button",
					"id": "delete",
					"text": "delete record",
					"img": 'delete.png',
					"img_disabled": 'delete_dis.png'
					,disabled : true
				}
			]
		}
		,toolbar_admin : {
			icon_path: "",
			items: [
				{
					"type": "button",
					"id": "edit",
					"text": "edit column",
					"img": 'edit.png',
					"img_disabled": 'edit_dis.png'
					//,disabled : false
				}
			]
		}
	}
	
	
	,Viewer : {
		window: {
			"left": CAIRS.getPagePosition( "x", 500, 400 ),
			"top": CAIRS.getPagePosition( "y", 500, 400 ),
			"width": 500,
			"height": 400,
			"icon": "form.png",
			"icon_dis": "form.png"
		}	
		,layout : {
			parent:document.body
			,pattern : "1C"
			,skin : "dhx_skyblue"	
		}
		,toolbar : {
			icon_path: "",
			items: [
				{
					"type": "button",
					"id": "add",
					"text": "add record",
					"img": 'add.png',
					"img_disabled": 'add.png'
					,disabled : true
				}
				,{
					"type": "separator",
					"id": "sep0",
				}
				,{
					"type": "button",
					"id": "edit",
					"text": "edit record",
					"img": 'edit.png',
					"img_disabled": 'edit_dis.png'
					,disabled : true
				}
				,{
					"type": "button",
					"id": "delete",
					"text": "delete record",
					"img": 'delete.png',
					"img_disabled": 'delete_dis.png'
					,disabled : true
				}
			]
		}
		,toolbar_admin : {
			icon_path: "",
			items: [
				{
					"type": "button",
					"id": "edit",
					"text": "edit column",
					"img": 'edit.png',
					"img_disabled": 'edit_dis.png'
					//,disabled : false
				}
			]
		}
	}
	
	,Builder : {
		window: {
			"left": CAIRS.getPagePosition( "x", 800, 550 ),
			"top": CAIRS.getPagePosition( "y", 800, 550 ),
			"width": 860,
			"height": 550,
			"icon": "form.png",
			"icon_dis": "form.png"
		}	
		,layout : {
			pattern : "2E"
			,skin : "dhx_skyblue"	
		}
		
		,toolbar : {
			icon_path: "",
			items: [
				{
					"type": "text",
					"id": "text_grid_name",
					"text": "Type a name for this grid: ",
				}
				,{
					"type": "buttonInput",
					"id": "grid_name",
					"text": "",
					width: 400
				},{
					"type": "separator",
					"id": "sep0",
				}
				
				,{
					"type": "button",
					"id": "save",
					"text": "save and create grid",
					"img": null,
					"img_disabled": null
					//,disabled : false
				}
				
				
				
			]	
		}
		,toolbar_form : {
			icon_path: "",
			items: [
				{
					"type": "button",
					"id": "save",
					"text": "add column",
					"img": "add_form.gif",
					"img_disabled": "add_form.gif"
					//,disabled : false
				}
				,{
					"type": "button",
					"id": "reset",
					"text": "reset form",
					"img": "disabled.png",
					"img_disabled": "disabled.png"
					//,disabled : false
				}
				
			]	
		}
		,toolbar_grid : {
			icon_path: "",
			items: [
				{
					"type": "button",
					"id": "edit",
					"text": "edit column",
					"img": "form2.gif",
					"img_disabled": "form2.gif"
					//,disabled : true
				}
				,{
					"type": "button",
					"id": "delete",
					"text": "delete column",
					"img": "delete.png",
					"img_disabled": "delete_dis.png"
					//,disabled : true
				}
				/*,{
					"type": "separator",
					"id": "sep0",
				}
				,{
					"type": "button",
					"id": "save",
					"text": "save columns",
					"img": "save.gif",
					"img_disabled": "save.gif"
					//,disabled : false
				}*/
			]	
		}
		,grid: {
			"headers": "Dhx header,Dhx type,SQL name,SQL type,Dhx sorting,Dhx width,Dhx align,Dhx footer",
			"ids": "dhtmlx_grid_header,dhtmlx_grid_type,column_name,column_type,dhtmlx_grid_sorting,dhtmlx_grid_width,dhtmlx_grid_align,dhtmlx_grid_footer",
			"widths": "120,120,120,90,70,70,70,90",
			"colaligns": "left,left,left,left,left,right,right,left",
			"coltypes": "ro,co,ro,ro,ro,ro,ro,ro",
			"colsorting": "str,str,str,str,str,str,str,str"
		}
		,form: {
			"template": [
				{
					type: "settings",
					position: "label-left",
					labelWidth: 160,
					inputWidth: 230
				}
				
				,{
					type: 'block',
					inputWidth: 'auto',
					inputHeight :'auto',
					list: [
						{
							type: "input", name: 'dhtmlx_grid_header', label: 'Header text:', 
							value : "", tooltip : "This is the header text of the column at the grid", 
							required: true, validate: 'NotEmpty', info : 1,
							note : { text : "Please provide the text that you want to set up as header for this column at the grid", width : 230}
						}
						,{type: "combo", name: 'dhtmlx_grid_type', label: 'Column type:',  
							options:[
								{text: "Color - varchar", value: "cp"}
								,{text: "Currency - numeric", value: "price"}
								,{text: "Date - date", value: "dhxCalendarA"}
								,{text: "Link - varchar", value: "link"}
								,{text: "Numeric - numeric", value: "edn"}
								,{text: "Text - varchar(max)", value: "txttxt", selected : true}
							], tooltip : "This is the column type at the grid",
							required: true, validate: 'NotEmpty', info : 1,
							note : { text : "Please provide the type of data that you want to store at this column", width : 230}
						}
						,{
							type: "hidden", name: 'column_name', label: 'SQL name - read only', 
							required: true, validate: 'NotEmpty', readonly : true
						}
						,{
							type: "hidden", name: 'column_type', label: 'SQL type - read only', 
							required: true, validate: 'NotEmpty', readonly : true, value: 'varchar(max)'
						}
					]
				}
				
				,{type:"newcolumn"/*, offset:20*/}
				
				,{
					type: 'block',
					inputWidth: 'auto',
					inputHeight :'auto',
					list: [
						{
							type: "hidden", name: 'dhtmlx_grid_sorting', label: 'Column sorting - read only', 
							tooltip : "This is the way how columns will be sorted", 
							required: true, validate: 'NotEmpty', info : true, readonly : true,
							value: 'str'
						}
						,{
							type: "input", name: 'dhtmlx_grid_width', label: 'Column width', 
							value : "*", tooltip : "This is column width at the grid", 
							required: true, validate: 'NotEmpty', info : true,
							note : { text : "Please define an integer number as width for this column. Use (*) wildcard for auto sizing.", width : 230}
						}
						,{type: "combo", name: 'dhtmlx_grid_align', label: 'Column alignment:',  
							options:[
								{text: "center", value: "center"}
								,{text: "left", value: "left", selected : true}
								,{text: "right", value: "right"}
								
							], tooltip : "This is the column alignment at the grid",
							required: true, validate: 'NotEmpty', info : 1,
							note : { text : "Please define how do you want to align data at this column.", width : 230}
						}
						,{
							type: "hidden", name: 'dhtmlx_grid_footer', label: 'Footer text:', 
							value : "", tooltip : "This is the footer text of the column at the grid", 
							info : 1
						}
					]
				}
			]
		}
	}
	
	
	,Admin : {
		window: {
			"left": CAIRS.getPagePosition( "x", 800, 550 ),
			"top": CAIRS.getPagePosition( "y", 800, 550 ),
			"width": 860,
			"height": 550,
			"icon": "form.png",
			"icon_dis": "form.png"
		}	
		,layout : {
			pattern : "2E"
			,skin : "dhx_skyblue"	
		}
		
		,toolbar : {
			icon_path: "",
			items: [
				{
					"type": "text",
					"id": "text_grid_name",
					"text": "Type a name for this grid: ",
				}
				,{
					"type": "buttonInput",
					"id": "grid_name",
					"text": "",
					width: 400
				},{
					"type": "separator",
					"id": "sep0",
				}
				
				,{
					"type": "button",
					"id": "save",
					"text": "save grid name",
					"img": null,
					"img_disabled": null
					//,disabled : false
				}
				
				
				
			]	
		}
		,toolbar_form : {
			icon_path: "",
			items: [
				{
					"type": "button",
					"id": "save",
					"text": "add column",
					"img": "add_form.gif",
					"img_disabled": "add_form.gif"
					//,disabled : false
				}
				,{
					"type": "button",
					"id": "reset",
					"text": "reset form",
					"img": "disabled.png",
					"img_disabled": "disabled.png"
					//,disabled : false
				}
				
			]	
		}
		,toolbar_grid : {
			icon_path: "",
			items: [
				/*{
					"type": "button",
					"id": "edit",
					"text": "edit column",
					"img": "form2.gif",
					"img_disabled": "form2.gif"
					//,disabled : true
				}
				,*/{
					"type": "button",
					"id": "delete",
					"text": "delete column",
					"img": "delete.png",
					"img_disabled": "delete_dis.png"
					,disabled : true
				}
				/*,{
					"type": "separator",
					"id": "sep0",
				}
				,{
					"type": "button",
					"id": "save",
					"text": "save columns",
					"img": "save.gif",
					"img_disabled": "save.gif"
					//,disabled : false
				}*/
			]	
		}
		,grid: {
			"headers": "Column header,Dhx type,SQL name,SQL type,Column sorting,Column width,Column align,Column footer",
			"ids": "dhtmlx_grid_header,dhtmlx_grid_type,column_name,column_type,dhtmlx_grid_sorting,dhtmlx_grid_width,dhtmlx_grid_align,dhtmlx_grid_footer",
			"widths": "160,0,0,0,0,100,100,160",
			"colaligns": "left,left,left,left,left,right,right,left",
			"coltypes": "ed,ro,ro,ro,ro,ed,co,ed",
			"colsorting": "str,str,str,str,str,str,str,str"
		}
		,form: {
			"template": [
				{
					type: "settings",
					position: "label-left",
					labelWidth: 160,
					inputWidth: 230
				}
				
				,{
					type: 'block',
					inputWidth: 'auto',
					inputHeight :'auto',
					list: [
						{
							type: "input", name: 'dhtmlx_grid_header', label: 'Header text:', 
							value : "", tooltip : "This is the header text of the column at the grid", 
							required: true, validate: 'NotEmpty', info : 1,
							note : { text : "Please provide the text that you want to set up as header for this column at the grid", width : 230}
						}
						,{type: "combo", name: 'dhtmlx_grid_type', label: 'Column type:',  
							options:[
								{text: "Color - varchar", value: "cp"}
								,{text: "Currency - numeric", value: "price"}
								,{text: "Date - date", value: "dhxCalendarA"}
								,{text: "Link - varchar", value: "link"}
								,{text: "Numeric - numeric", value: "edn"}
								,{text: "Text - varchar(max)", value: "txttxt", selected : true}
							], tooltip : "This is the column type at the grid",
							required: true, validate: 'NotEmpty', info : 1,
							note : { text : "Please provide the type of data that you want to store at this column", width : 230}
						}
						,{
							type: "hidden", name: 'column_name', label: 'SQL name - read only', 
							required: true, validate: 'NotEmpty', readonly : true
						}
						,{
							type: "hidden", name: 'column_type', label: 'SQL type - read only', 
							required: true, validate: 'NotEmpty', readonly : true, value: 'varchar(max)'
						}
					]
				}
				
				,{type:"newcolumn"/*, offset:20*/}
				
				,{
					type: 'block',
					inputWidth: 'auto',
					inputHeight :'auto',
					list: [
						{
							type: "hidden", name: 'dhtmlx_grid_sorting', label: 'Column sorting - read only', 
							tooltip : "This is the way how columns will be sorted", 
							required: true, validate: 'NotEmpty', info : true, readonly : true,
							value: 'str'
						}
						,{
							type: "input", name: 'dhtmlx_grid_width', label: 'Column width', 
							value : "*", tooltip : "This is column width at the grid", 
							required: true, validate: 'NotEmpty', info : true,
							note : { text : "Please define an integer number as width for this column. Use (*) wildcard for auto sizing.", width : 230}
						}
						,{type: "combo", name: 'dhtmlx_grid_align', label: 'Column alignment:',  
							options:[
								{text: "center", value: "center"}
								,{text: "left", value: "left", selected : true}
								,{text: "right", value: "right"}
								
							], tooltip : "This is the column alignment at the grid",
							required: true, validate: 'NotEmpty', info : 1,
							note : { text : "Please define how do you want to align data at this column.", width : 230}
						}
						,{
							type: "hidden", name: 'dhtmlx_grid_footer', label: 'Footer text:', 
							value : "", tooltip : "This is the footer text of the column at the grid", 
							info : 1
						}
					]
				}
			]
		}
	}
};