gridMaker.settings = {
	
	appName : "gridMaker"
	,version : 0.1
	
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
	
	,Builder : {
		window: {
			"left": CAIRS.getPagePosition( "x", 800, 450 ),
			"top": CAIRS.getPagePosition( "y", 800, 450 ),
			"width": 800,
			"height": 450,
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
				
			]	
		}
		,grid: {
			"headers": "Name,Type,Dhx header,Dhx type,Dhx sorting,Dhx width,Dhx align,Dhx footer",
			"ids": "column_name,column_type,dhtmlx_grid_header,dhtmlx_grid_type,dhtmlx_grid_sorting,dhtmlx_grid_width,dhtmlx_grid_align,dhtmlx_grid_footer",
			"widths": "90,*",
			"colaligns": "right,left,left,left,left,left,left,left",
			"coltypes": "ro,ro,ro,ro,ro,ro,ro,ro",
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
					type: "input", name: 'column_name', label: 'column_name', 
					required: true, validate: 'NotEmpty'
				}
				,{
					type: "input", name: 'column_type', label: 'column_type', 
					required: true, validate: 'NotEmpty'
				}
				,{
					type: "input", name: 'dhtmlx_grid_header', label: 'Header text:', 
					value : "", tooltip : "This is the header text of the column at the grid", 
					required: true, validate: 'NotEmpty', info : 1, required : 1
				}
				,{type: "combo", name: 'dhtmlx_grid_type', label: 'Column type:',  
					options:[
						{text: "Color - varchar", value: "cp"}
						,{text: "Currency - numeric", value: "price"}
						,{text: "Date - date", value: "dhxCalendarA"}
						,{text: "Link - varchar", value: "link"}
						,{text: "Numeric - numeric", value: "edn"}
						,{text: "Text - varchar(max)", value: "txttxt"}
					], tooltip : "This is the column type at the grid"
				}
				,{
					type: "input", name: 'dhtmlx_grid_sorting', label: 'Column sorting:', 
					value : "", tooltip : "This is the header text of the column at the grid", 
					required: true, validate: 'NotEmpty', info : 1, required : 1
				}
			]
		}
	}
};