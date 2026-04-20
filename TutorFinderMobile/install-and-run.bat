@echo off
REM TutorFinder Mobile - Installation and Run Script for Windows
REM This script automates the setup and launch process

echo ========================================
echo TutorFinder Mobile - Setup Script
echo ========================================
echo.

REM Check if Node.js is installed
echo Checking prerequisites...
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Node.js is not installed
    echo Please install Node.js from https://nodejs.org
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
echo [OK] Node.js %NODE_VERSION% found

REM Check if npm is installed
where npm >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] npm is not installed
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('npm --version') do set NPM_VERSION=%%i
echo [OK] npm %NPM_VERSION% found

REM Check if Expo CLI is installed
where expo >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [WARNING] Expo CLI not found. Installing globally...
    call npm install -g expo-cli
    if %ERRORLEVEL% NEQ 0 (
        echo [ERROR] Failed to install Expo CLI
        pause
        exit /b 1
    )
    echo [OK] Expo CLI installed
) else (
    echo [OK] Expo CLI found
)

echo.
echo Installing dependencies...
call npm install
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Failed to install dependencies
    pause
    exit /b 1
)
echo [OK] Dependencies installed successfully

echo.
echo Checking environment configuration...

if not exist ".env" (
    echo [WARNING] .env file not found. Creating from template...
    (
        echo # TutorFinder Mobile - Environment Configuration
        echo.
        echo # API Configuration
        echo # For Android Emulator ^(10.0.2.2 is the special alias for localhost^)
        echo EXPO_PUBLIC_API_URL=http://10.0.2.2:8080
        echo.
        echo # For iOS Simulator, use:
        echo # EXPO_PUBLIC_API_URL=http://localhost:8080
        echo.
        echo # For Physical Device on same network, use your computer's IP:
        echo # EXPO_PUBLIC_API_URL=http://192.168.1.XXX:8080
        echo.
        echo # Feature Flags
        echo EXPO_PUBLIC_ENABLE_ANALYTICS=false
        echo EXPO_PUBLIC_ENABLE_CRASH_REPORTING=false
        echo EXPO_PUBLIC_DEBUG_MODE=true
    ) > .env
    echo [OK] .env file created
) else (
    echo [OK] .env file exists
)

echo.
echo Setup complete!
echo.
echo Choose how to run the app:
echo 1^) Start Expo DevTools ^(scan QR code with Expo Go app^)
echo 2^) Run on Android Emulator
echo 3^) Exit
echo.
set /p choice="Enter your choice (1-3): "

if "%choice%"=="1" (
    echo.
    echo Starting Expo DevTools...
    echo Scan the QR code with Expo Go app on your phone
    call npm start
) else if "%choice%"=="2" (
    echo.
    echo Starting Android Emulator...
    call npm run android
) else if "%choice%"=="3" (
    echo Goodbye!
    exit /b 0
) else (
    echo Invalid choice
    pause
    exit /b 1
)
