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
		
            window.onload = function()
            {
				var cdn_application_path = window.location.protocol + '//' + window.location.host + '/gridMaker/';
				//CAIRS.environment = "production";	
				/* load gridMaker */
				CAIRS.onDemand.load( [ cdn_application_path + "lib/controller/gridMaker.js" ], function ()
				{			
					var grid_id = 'grid_1';
					var field_id = 0;
					gridMaker.start( {  
                    	agency_id : 25 // Type: integer. Mandatory
						,ConnID : -85771 // Type: integer. Mandatory
                        ,ConnectionId : 275138 // Type: integer. Mandatory
						//,base_path : window.location.protocol + '//' + window.location.host + '/' // Type: string. Mandatory
						,fnCallBack : function(){
							gridMaker.view.Builder.render({
								field_id : field_id // Not mandatory, default 0. Type: integer
								,container: grid_id // Mandatory. DIV ID. Type string
								,fnCallBack : function( settings ){
									var storageName = gridMaker.settings.appId + "_gridSettings_" + grid_id;
									var settings = JSON.parse( localStorage.getItem( storageName ));
									gridMaker.view.Viewer.render({
										field_id : field_id // Not mandatory, default 0. Type: integer
										,container: grid_id // Mandatory. DIV ID. Type string
										,settings : settings // Mandatory. Grid settings 
									});
									
								}
							});	
						}	
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