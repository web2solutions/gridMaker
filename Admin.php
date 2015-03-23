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
		
		
		
			var settings = {"grid_name":"My newest grid sample","table_name":"gridMaker_data_0_my_newest_grid_sample_1427059815947","gridmaker_table_id":"35","columns":[{"dhtmlx_grid_header":"Test text field","dhtmlx_grid_type":"txttxt","column_name":"test_text_field_1427059824843","column_type":"varchar(max)","dhtmlx_grid_sorting":"str","dhtmlx_grid_width":"*","dhtmlx_grid_align":"left","dhtmlx_grid_footer":"","gridmaker_table_id":"35"},{"dhtmlx_grid_header":"Test color field","dhtmlx_grid_type":"cp","column_name":"test_color_field_1427059835578","column_type":"varchar(20)","dhtmlx_grid_sorting":"str","dhtmlx_grid_width":"*","dhtmlx_grid_align":"left","dhtmlx_grid_footer":"","gridmaker_table_id":"35"},{"dhtmlx_grid_header":"Test currency field","dhtmlx_grid_type":"price","column_name":"test_currency_field_1427059847690","column_type":"numeric(16,2)","dhtmlx_grid_sorting":"int","dhtmlx_grid_width":"*","dhtmlx_grid_align":"left","dhtmlx_grid_footer":"","gridmaker_table_id":"35"},{"dhtmlx_grid_header":"Test date field","dhtmlx_grid_type":"dhxCalendarA","column_name":"test_date_field_1427059879353","column_type":"date","dhtmlx_grid_sorting":"date","dhtmlx_grid_width":"*","dhtmlx_grid_align":"left","dhtmlx_grid_footer":"","gridmaker_table_id":"35"},{"dhtmlx_grid_header":"Test numeric field","dhtmlx_grid_type":"edn","column_name":"test_numeric_field_1427059888944","column_type":"integer","dhtmlx_grid_sorting":"int","dhtmlx_grid_width":"*","dhtmlx_grid_align":"left","dhtmlx_grid_footer":"","gridmaker_table_id":"35"}],"grid":{"head":[],"data":[],"rows":[],"headers":["Test text field","Test color field","Test currency field","Test date field","Test numeric field"],"ids":["test_text_field_1427059824843","test_color_field_1427059835578","test_currency_field_1427059847690","test_date_field_1427059879353","test_numeric_field_1427059888944"],"widths":["*","*","*","*","*"],"colaligns":["left","left","left","left","left"],"coltypes":["txttxt","cp","price","dhxCalendarA","edn"],"colsorting":["str","str","int","date","int"]}}
			
			
			
			
			
			
			
		
            window.onload = function()
            {
				var grid_id = 'grid_1';
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
							
							var storageName = gridMaker.settings.appId + "_gridSettings_" + grid_id;
							
							if( typeof localStorage.getItem(storageName) === 'undefined')
								localStorage.setItem(storageName, JSON.stringify( settings ));
							
							gridMaker.view.Admin.render({
								field_id : 0 // Not mandatory, default 0. Type: integer
								,container: grid_id // Mandatory. DIV ID. Type string
								,settings : JSON.parse( localStorage.getItem(	
									gridMaker.settings.appId + "_gridSettings_" + grid_id
								)) // Mandatory. Grid settings 
								,agency_id : 25 // Type: integer. Mandatory
								
							});
							
							
							gridMaker.view.Viewer.render({
								field_id : 0 // Not mandatory, default 0. Type: integer
								,container: grid_id // Mandatory. DIV ID. Type string
								,settings : JSON.parse( localStorage.getItem(	
									gridMaker.settings.appId + "_gridSettings_" + grid_id
								)) // Mandatory. Grid settings 
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