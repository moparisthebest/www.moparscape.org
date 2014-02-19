<?php
function getRequest($request, $default = null)
{
    return empty($_REQUEST[$request]) ? $default : $_REQUEST[$request];
}

require_once("/home/www-data/htdocs/moparscape.org/smf/SSI.php");

header('Access-Control-Allow-Credentials: true');
header('Access-Control-Expose-Headers: Link, X-RateLimit-Limit, X-RateLimit-Remaining, X-OAuth-Scopes, X-Accepted-OAuth-Scopes');
header('Access-Control-Allow-Origin: *');

// do we want JSON, or JSONP
$callback = getRequest('callback');

//function ssi_boardNews($board = null, $limit = null, $start = null, $length = null, $output_method = 'echo')
$return = ssi_boardNews(getRequest('board'), getRequest('limit', 5), 0, getRequest('length', 100), 'array');
//print_r($return);

if ($callback != null) {
    header('Content-Type: application/javascript; charset=utf-8');
    echo $callback . '(';
} else {
    header('Content-Type: application/json; charset=utf-8');
}

echo json_encode($return);

if ($callback != null)
    echo ');';
?>