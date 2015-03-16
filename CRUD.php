<?php
/*on development only */
$_SESSION["mapusername"] = "restoremleahy@adoptionassociates.net";
$_SESSION["mappassword"] = "2dnewszosNXN3t7k2OHiwt/g6MTN0OTZ3J3c1ePF6NOkn83JyZ0=";
$_SESSION['session_current_agency_id'] = 25;
/*on development only */

$user = $_SESSION["mapusername"];
$password = $_SESSION["mappassword"];
$private_key  = $_SERVER['HTTP_USER_AGENT'];

$user_credential = base64_encode( base64_encode( $user ) . ":" . hash('SHA256',$private_key . "_" . $password ) );	

setcookie(
	"apitemp", 
	$user_credential, 
	time()+3600, 
	"/", 
	"." . $_SERVER['SERVER_NAME'], 0
);
?>
<html>
    <head>
		<meta http-equiv='cache-control' content='no-cache'>
        <meta http-equiv='expires' content='0'>
        <meta http-equiv='pragma' content='no-cache'>
        <meta charset="UTF-8">
        
        <title>gridMaker Demo</title>
        <!-- CAIRS Framework -->
		<script type="text/javascript" src="../CAIRS_Framework/CAIRS_fw.js"></script>
        <style>
        
		.div_test{
			width:500px;
			height:400px;
			float:left;
			margin:50px;
			background:#FC0;
			font-family:Arial, Helvetica, sans-serif;
			cursor:pointer;
		}
		
        </style>
        <script type="text/javascript" >
		
		
		
			var settings = {
				"grid_name": "My complete grid demo",
				"table_name": "gridMaker_data_0_my_complete_grid_demo",
				"gridmaker_table_id": '34',
				"columns": [{
					"dhtmlx_grid_header": "Text field",
					"dhtmlx_grid_type": "txttxt",
					"column_name": "text_field",
					"column_type": "varchar(max)",
					"dhtmlx_grid_sorting": "str",
					"dhtmlx_grid_width": "*",
					"dhtmlx_grid_align": "left",
					"dhtmlx_grid_footer": "",
					"gridmaker_table_id": "34"
				}, {
					"dhtmlx_grid_header": "Date field",
					"dhtmlx_grid_type": "dhxCalendarA",
					"column_name": "date_field",
					"column_type": "date",
					"dhtmlx_grid_sorting": "date",
					"dhtmlx_grid_width": "*",
					"dhtmlx_grid_align": "left",
					"dhtmlx_grid_footer": "",
					"gridmaker_table_id": "34"
				}, {
					"dhtmlx_grid_header": "currency field",
					"dhtmlx_grid_type": "price",
					"column_name": "currency_field",
					"column_type": "numeric(16,2)",
					"dhtmlx_grid_sorting": "int",
					"dhtmlx_grid_width": "*",
					"dhtmlx_grid_align": "left",
					"dhtmlx_grid_footer": "",
					"gridmaker_table_id": "34"
				}, {
					"dhtmlx_grid_header": "link field",
					"dhtmlx_grid_type": "link",
					"column_name": "link_field",
					"column_type": "varchar(max)",
					"dhtmlx_grid_sorting": "str",
					"dhtmlx_grid_width": "*",
					"dhtmlx_grid_align": "left",
					"dhtmlx_grid_footer": "",
					"gridmaker_table_id": "34"
				}, {
					"dhtmlx_grid_header": "numeric field",
					"dhtmlx_grid_type": "edn",
					"column_name": "numeric_field",
					"column_type": "integer",
					"dhtmlx_grid_sorting": "int",
					"dhtmlx_grid_width": "*",
					"dhtmlx_grid_align": "left",
					"dhtmlx_grid_footer": "",
					"gridmaker_table_id": "34"
				}, {
					"dhtmlx_grid_header": "Color field",
					"dhtmlx_grid_type": "cp",
					"column_name": "color_field",
					"column_type": "varchar(20)",
					"dhtmlx_grid_sorting": "str",
					"dhtmlx_grid_width": "*",
					"dhtmlx_grid_align": "left",
					"dhtmlx_grid_footer": "",
					"gridmaker_table_id": "34"
				}],
				"grid": {
					"head": [{
						"id": "text_field",
						"width": "*",
						"type": "txttxt",
						"align": "left",
						"sort": "str",
						"value": "Text field"
					}, {
						"id": "date_field",
						"width": "*",
						"type": "dhxCalendarA",
						"align": "left",
						"sort": "date",
						"value": "Date field"
					}, {
						"id": "currency_field",
						"width": "*",
						"type": "price",
						"align": "left",
						"sort": "int",
						"value": "currency field"
					}, {
						"id": "link_field",
						"width": "*",
						"type": "link",
						"align": "left",
						"sort": "str",
						"value": "link field"
					}, {
						"id": "numeric_field",
						"width": "*",
						"type": "edn",
						"align": "left",
						"sort": "int",
						"value": "numeric field"
					}, {
						"id": "color_field",
						"width": "*",
						"type": "cp",
						"align": "left",
						"sort": "str",
						"value": "Color field"
					}],
					"data": [],
					"rows": [],
					"headers": ["Text field", "Date field", "currency field", "link field", "numeric field", "Color field"],
					"ids": ["text_field", "date_field", "currency_field", "link_field", "numeric_field", "color_field"],
					"widths": ["*", "*", "*", "*", "*", "*"],
					"colaligns": ["left", "left", "left", "left", "left", "left"],
					"coltypes": ["txttxt", "dhxCalendarA", "price", "link", "edn", "cp"],
					"colsorting": ["str", "date", "int", "str", "int", "str"]
				}
			}
			
			
			
			
			
			
			
		
            window.onload = function()
            {
				var cdn_application_path = window.location.protocol + '//' + window.location.host + '/gridMaker/';
				//CAIRS.environment = "production";	
				/* load gridMaker */
				CAIRS.onDemand.load( [ cdn_application_path + "lib/controller/gridMaker.js" ], function ()
				{			
					gridMaker.start( {  
                    	agency_id : 25 // Type: integer. Mandatory
						,ConnID : -85771 // Type: integer. Mandatory
                        ,ConnectionId : 275138 // Type: integer. Mandatory
						,base_path : window.location.protocol + '//' + window.location.host + '/' // Type: string. Mandatory
						,fnCallBack : function(){
							
							
							gridMaker.view.CRUD.render({
								field_id : 0 // Not mandatory, default 0. Type: integer
								,container: 'grid_1' // Mandatory. DIV ID. Type string
								,settings : settings // Mandatory. Grid settings 
								// (http://docs.dhtmlx.com/grid__json_configuration.html). Type JSON
								//,table_name : ''
								,agency_id : 25 // Type: integer. Mandatory
								,connID : -85771 // Type: integer. Mandatory
								,ConnectionId : 275138 // Type: integer. Mandatory
								,user_id : 0
							});
							
							
							
						}// not mandatory. success callback. Type Function
					} );
				});								
            }
			window.onerror = function(msg, url, line, column, errorObj)
			{
				dhtmlx.message( {type : "error", text : msg + ' ' + line + ' ' + column} );
				//dhtmlx.message( {type : "error", text : line} );
				console.log( errorObj );
			}
			
         </script>
     </head>
    <body>
    
    <div id="grid_1" class="div_test">
    	
    </div>
    
    
    </body>
</html>