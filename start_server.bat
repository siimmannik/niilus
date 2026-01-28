@echo off
echo Starting local server...
echo.
echo On your computer, open: http://localhost:8000/niiluse_teekond.html
echo.
echo To play on your phone:
echo 1. Connect your phone to the SAME Wi-Fi as this computer.
echo 2. Find your computer's IP address (open a new terminal and type 'ipconfig').
echo 3. On your phone, open: http://[YOUR_IP_ADDRESS]:8000/niiluse_teekond.html
echo.
python -m http.server 8000
pause
