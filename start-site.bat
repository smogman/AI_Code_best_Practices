@echo off
title Claude Code Best Practices - Dev Server
echo Starting site at http://localhost:4321/
echo Press Ctrl+C to stop.
echo.
cd /d "%~dp0"
npm run dev
pause
