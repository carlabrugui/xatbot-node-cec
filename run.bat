@ECHO OFF

ECHO Clearing proxy...
CALL npm config rm proxy
CALL npm config rm https-proxy

ECHO Running node...
CALL node index.js