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
        
        <script type="text/javascript" >
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
						,field_id : 0 // Not mandatory, default 0. Type: integer	
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
    </body>
</html>