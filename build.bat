@echo off

set EXE_PATH=%CD%\release\pesterchum.exe
set ICO_PATH=%CD%\app\pesterchum.ico
set NWEXE_PATH=%CD%\buildTools\nw\nw.exe
set NWZIP_PATH=%CD%\release\app.nw

SETLOCAL EnableDelayedExpansion
for /F "tokens=1,2 delims=#" %%a in ('"prompt #$H#$E# & echo on & for %%b in (1) do rem"') do (
  set "DEL=%%a"
)

call :ColorText 0C "nodebob v0.1"
echo.
call :ColorText 0C "---"
echo.
echo.

if not exist release md release

echo.
call :ColorText 0a "Creating app package..."
cd buildTools\7z
7z a -r -tzip %NWZIP_PATH% ..\..\app\*
cd ..\..

echo.
call :ColorText 0a "Creating executable..."
echo.
copy /b /y %NWEXE_PATH% %EXE_PATH%
cd buildTools\ar
if exist %ICO_PATH% Resourcer -op:upd -src:%EXE_PATH% -type:14 -name:IDR_MAINFRAME -file:%ICO_PATH%
copy /b /y %EXE_PATH% + %NWZIP_PATH% %EXE_PATH%
cd ..\..

echo.
call :ColorText 0a "Copying files..."
echo.
if not exist %CD%\release\ffmpegsumo.dll copy %CD%\buildTools\nw\ffmpegsumo.dll %CD%\release\ffmpegsumo.dll
if not exist %CD%\release\icudt.dll copy %CD%\buildTools\nw\icudt.dll %CD%\release\icudt.dll
if not exist %CD%\release\libEGL.dll copy %CD%\buildTools\nw\libEGL.dll %CD%\release\libEGL.dll
if not exist %CD%\release\libGLESv2.dll copy %CD%\buildTools\nw\libGLESv2.dll %CD%\release\libGLESv2.dll
if not exist %CD%\release\nw.pak copy %CD%\buildTools\nw\nw.pak %CD%\release\nw.pak

echo.
call :ColorText 0a "Deleting temporary files..."
echo.
del %NWZIP_PATH%

echo.
call :ColorText 0a "Done!"
echo.
goto :eof


:ColorText
echo off
<nul set /p ".=%DEL%" > "%~2"
findstr /v /a:%1 /R "^$" "%~2" nul
del "%~2" > nul 2>&1
goto :eof