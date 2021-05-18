<?php

error_reporting(E_ALL);

if(!($sock = socket_create(AF_UNIX, SOCK_STREAM, 0)))
{
    $errorcode = socket_last_error();
    $errormsg = socket_strerror($errorcode);

    die("Couldn't create socket: [$errorcode] $errormsg \n");
}

echo "Socket created";

if(!socket_connect($sock , '/var/www/server.sock'))
{
    $errorcode = socket_last_error();
    $errormsg = socket_strerror($errorcode);
    die("Could not connect: [$errorcode] $errormsg \n");
}

echo "Connection established \n";

//$message = $argv[1];
$message = "Test message";

if(!socket_send( $sock , $message , strlen($message) , 0))
{
    $errorcode = socket_last_error();
    $errormsg = socket_strerror($errorcode);

    die("Could not send data: [$errorcode] $errormsg \n");
}

echo "Message send successfully \n";

// Now receive reply from server
if(socket_recv( $sock , $buf , 1024, MSG_WAITALL ) === FALSE)
{
    $errorcode = socket_last_error();
    $errormsg = socket_strerror($errorcode);
    die("Could not receive data: [$errorcode] $errormsg \n");
}

echo "Message received \n";

// print the received message
var_dump($buf);

socket_close($sock);

/*
error_reporting(E_ALL);

const SOCK_FILE = '/var/www/server.sock';

function showPerms(){
    $file = file_get_contents(SOCK_FILE);
    echo $file;

    $perms = fileperms(SOCK_FILE);

    switch ($perms & 0xF000) {
        case 0xC000: // socket
            $info = 's';
            break;
        case 0xA000: // symbolic link
            $info = 'l';
            break;
        case 0x8000: // regular
            $info = 'r';
            break;
        case 0x6000: // block special
            $info = 'b';
            break;
        case 0x4000: // directory
            $info = 'd';
            break;
        case 0x2000: // character special
            $info = 'c';
            break;
        case 0x1000: // FIFO pipe
            $info = 'p';
            break;
        default: // unknown
            $info = 'u';
    }

// Owner
    $info .= (($perms & 0x0100) ? 'r' : '-');
    $info .= (($perms & 0x0080) ? 'w' : '-');
    $info .= (($perms & 0x0040) ?
        (($perms & 0x0800) ? 's' : 'x' ) :
        (($perms & 0x0800) ? 'S' : '-'));

// Group
    $info .= (($perms & 0x0020) ? 'r' : '-');
    $info .= (($perms & 0x0010) ? 'w' : '-');
    $info .= (($perms & 0x0008) ?
        (($perms & 0x0400) ? 's' : 'x' ) :
        (($perms & 0x0400) ? 'S' : '-'));

// World
    $info .= (($perms & 0x0004) ? 'r' : '-');
    $info .= (($perms & 0x0002) ? 'w' : '-');
    $info .= (($perms & 0x0001) ?
        (($perms & 0x0200) ? 't' : 'x' ) :
        (($perms & 0x0200) ? 'T' : '-'));

    echo $info;
}

showPerms();
echo '<br />';

if(!($sock = socket_create(AF_UNIX, SOCK_STREAM, 0)))
{
    $errorcode = socket_last_error();
    $errormsg = socket_strerror($errorcode);

    die("Couldn't create socket: [$errorcode] $errormsg \n");
}

echo "Socket created";

if(!socket_connect($sock , SOCK_FILE))
{
    $errorcode = socket_last_error();
    $errormsg = socket_strerror($errorcode);
    die("Could not connect: [$errorcode] $errormsg \n");
}

echo "Connection established \n";

$message = $argv[1];

if(!socket_send( $sock , $message , strlen($message) , 0))
{
    $errorcode = socket_last_error();
    $errormsg = socket_strerror($errorcode);

    die("Could not send data: [$errorcode] $errormsg \n");
}

echo "Message send successfully \n";

// Now receive reply from server
if(socket_recv( $sock , $buf , 1024, MSG_WAITALL ) === FALSE)
{
    $errorcode = socket_last_error();
    $errormsg = socket_strerror($errorcode);
    die("Could not receive data: [$errorcode] $errormsg \n");
}

echo "Message received \n";

// print the received message
var_dump($buf);

socket_close($sock);
*/
?>
