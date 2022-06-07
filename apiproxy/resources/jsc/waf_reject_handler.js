// Reject hanlder for WAF, because WAF rejects AS HTTP 200
//
/*<html>

<head>
	<title>Request Rejected</title>
</head>

<body>The requested URL was rejected. Please consult with your
	administrator.<br><br>Your support ID is: 5987627247880895536<br><br><a href='javascript:history.back();'>[Go
		Back]</a></body>

</html>
*/

try {
    
    var response = context.getVariable("response.content");
    var responseHttpCode = context.getVariable("response.status.code");
    if (responseHttpCode == 200 && response.includes("Request Rejected")) {
        context.setVariable("waferror.code", 500);
        context.setVariable("waferror.message", "Telia WAF rejected request. Contact Telia WAF admin. " + response);
    } 

} catch (err) {

    print("Error occurred in RequestClientValidation.js");
    throw err;
}