@ECHO OFF

ECHO Setting proxy...
CALL npm config set proxy http://10.110.8.42:8080
CALL npm config set https-proxy http://10.110.8.42:8080

ECHO Running node...
CALL node index.js