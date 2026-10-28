@echo off
title NEALS STREET - Site local
cd /d "%~dp0"
set PORT=8080
echo.
echo  NEALS STREET(R) - iniciando o site em http://localhost:%PORT%
echo  Para parar: feche esta janela ou aperte Ctrl+C
echo.

where python >nul 2>nul
if %errorlevel%==0 (
    start "" "http://localhost:%PORT%"
    python -m http.server %PORT%
    goto :fim
)

where py >nul 2>nul
if %errorlevel%==0 (
    start "" "http://localhost:%PORT%"
    py -m http.server %PORT%
    goto :fim
)

where node >nul 2>nul
if %errorlevel%==0 (
    start "" "http://localhost:%PORT%"
    npx --yes http-server -p %PORT% -c-1 .
    goto :fim
)

echo  Python e Node nao encontrados. Abrindo o arquivo direto no navegador...
start "" "%~dp0index.html"

:fim
pause
