<?php
    require_once  "../../private/vendor/jsonwrapper/jsonwrapper.php";
    require_once "../../private/utils/utils.php";
    require_once "../../private/objects/config.php";

    Utils::cors();

    header('Content-Type: application/json');

    $configFileName = "/etc/rc.d/rc.conf";

    $debugIps = array(
        '127.0.0.1',
        '::1'
    );

    if(in_array($_SERVER['REMOTE_ADDR'], $debugIps)){
        // Debug mode
        $configFileName = "../../rootfs/etc/rc.d/rc.conf";
    }


    $config = new Config();
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $data = (array)json_decode(file_get_contents("php://input"));

        $oldConfigLines = file($configFileName, FILE_SKIP_EMPTY_LINES);

        $saveResult = $config->save($data, $oldConfigLines, $configFileName);
        echo json_encode((object)array(result => $saveResult)); // return code 200 OK
    } else {
        echo json_encode($config->read($configFileName));
    }
?>