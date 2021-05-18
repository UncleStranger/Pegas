<?php
class Config
{
    const EXPORT_PREFIX = 'export ';

    public function __construct(){
    } // __construct

    public function read($fileName) {
        $configLines = file($fileName, FILE_SKIP_EMPTY_LINES);
        $config = array();
        foreach ($configLines as $i => $line) {
            $line = trim($line);
            if (strpos($line, self::EXPORT_PREFIX) === 0) {
                $line = substr($line, strlen(self::EXPORT_PREFIX));
                $lineArr = explode('=', $line);
                if (count($lineArr) != 2)
                    continue;
                $name = trim($lineArr[0]);
                $value = trim($lineArr[1]);
                $value = trim($value, '"');
                $config[$name] = $value;
            }
        }
        return $config;
    } //read

    public function save($params, $oldConfigLines, $newFileName) {
        $configTxt = '';
        foreach ($oldConfigLines as $i => $line) {
            $matched = false;
            $line = trim($line);
            if (strpos($line, self::EXPORT_PREFIX) === 0) {
                $line = substr($line, strlen(self::EXPORT_PREFIX));
                $lineArr = explode('=', $line);
                if (count($lineArr) == 2){
                    $name = trim($lineArr[0]);
                    if(isset($params[$name]))
                    {
                        $configTxt .= self::EXPORT_PREFIX . "$name=\"$params[$name]\"\n";
                        $matched = true;
                    }
                }
            }
            if(!$matched) {
                $configTxt .= "$line\n";
            }
        }

        file_put_contents($newFileName, $configTxt);
        //exec('/home/set-ip.sh');
        //exec('../../private/scripts/reboot.sh > reboot.txt');
        return exec('/var/www/private/scripts/reboot.sh');
    } // save


}