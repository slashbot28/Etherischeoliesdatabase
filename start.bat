@echo off
cd /d "%~dp0"
echo ===================================================
echo   Etherische Olien Database - Lokaal Opstarten
echo ===================================================
echo.
echo De lokale webserver wordt gestart op http://localhost:3000...
echo Je browser opent zo dadelijk automatisch.
echo.
echo (Sluit dit venster om de website te stoppen)
echo.

start http://localhost:3000
npm run dev
pause

