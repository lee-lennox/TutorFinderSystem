#!/bin/bash

# TutorFinder Mobile - Installation and Run Script
# This script automates the setup and launch process

set -e  # Exit on error

echo "🚀 TutorFinder Mobile - Setup Script"
echo "===================================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if Node.js is installed
echo "📦 Checking prerequisites..."
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js is not installed${NC}"
    echo "Please install Node.js from https://nodejs.org"
    exit 1
fi

echo -e "${GREEN}✅ Node.js $(node --version) found${NC}"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo -e "${RED}❌ npm is not installed${NC}"
    exit 1
fi

echo -e "${GREEN}✅ npm $(npm --version) found${NC}"

# Check if Expo CLI is installed
if ! command -v expo &> /dev/null; then
    echo -e "${YELLOW}⚠️  Expo CLI not found. Installing globally...${NC}"
    npm install -g expo-cli
    echo -e "${GREEN}✅ Expo CLI installed${NC}"
else
    echo -e "${GREEN}✅ Expo CLI found${NC}"
fi

echo ""
echo "📥 Installing dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Dependencies installed successfully${NC}"
else
    echo -e "${RED}❌ Failed to install dependencies${NC}"
    exit 1
fi

echo ""
echo "⚙️  Checking environment configuration..."

if [ ! -f ".env" ]; then
    echo -e "${YELLOW}⚠️  .env file not found. Creating from template...${NC}"
    cat > .env << EOF
# TutorFinder Mobile - Environment Configuration

# API Configuration
# For Android Emulator (10.0.2.2 is the special alias for localhost)
EXPO_PUBLIC_API_URL=http://10.0.2.2:8080

# For iOS Simulator, use:
# EXPO_PUBLIC_API_URL=http://localhost:8080

# For Physical Device on same network, use your computer's IP:
# EXPO_PUBLIC_API_URL=http://192.168.1.XXX:8080

# Feature Flags
EXPO_PUBLIC_ENABLE_ANALYTICS=false
EXPO_PUBLIC_ENABLE_CRASH_REPORTING=false
EXPO_PUBLIC_DEBUG_MODE=true
EOF
    echo -e "${GREEN}✅ .env file created${NC}"
else
    echo -e "${GREEN}✅ .env file exists${NC}"
fi

echo ""
echo "🔍 Checking backend connection..."
API_URL=$(grep EXPO_PUBLIC_API_URL .env | cut -d '=' -f2)
echo "Testing connection to: $API_URL"

# Try to ping the backend
if command -v curl &> /dev/null; then
    if curl -s --connect-timeout 5 "$API_URL/tutors/all" > /dev/null 2>&1; then
        echo -e "${GREEN}✅ Backend is reachable${NC}"
    else
        echo -e "${YELLOW}⚠️  Cannot reach backend at $API_URL${NC}"
        echo "Make sure your Spring Boot server is running on port 8080"
        echo ""
        read -p "Continue anyway? (y/n) " -n 1 -r
        echo
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            exit 1
        fi
    fi
fi

echo ""
echo "✨ Setup complete!"
echo ""
echo "📱 Choose how to run the app:"
echo "1) Start Expo DevTools (scan QR code with Expo Go app)"
echo "2) Run on iOS Simulator (Mac only)"
echo "3) Run on Android Emulator"
echo "4) Exit"
echo ""
read -p "Enter your choice (1-4): " choice

case $choice in
    1)
        echo ""
        echo "🚀 Starting Expo DevTools..."
        echo "Scan the QR code with Expo Go app on your phone"
        npm start
        ;;
    2)
        echo ""
        echo "🍎 Starting iOS Simulator..."
        npm run ios
        ;;
    3)
        echo ""
        echo "🤖 Starting Android Emulator..."
        npm run android
        ;;
    4)
        echo "👋 Goodbye!"
        exit 0
        ;;
    *)
        echo -e "${RED}Invalid choice${NC}"
        exit 1
        ;;
esac
