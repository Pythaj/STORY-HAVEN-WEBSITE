@echo off
echo ========================================
echo  Story Haven - Logo Setup Script
echo ========================================
echo.

REM Create public folder if it doesn't exist
if not exist "public" (
    echo Creating public folder...
    mkdir public
    echo ✓ Public folder created
) else (
    echo ✓ Public folder already exists
)

echo.

REM Move Logo.jpg
if exist "Logo.jpg" (
    echo Moving Logo.jpg to public folder...
    move /Y "Logo.jpg" "public\"
    echo ✓ Logo.jpg moved successfully
) else (
    if exist "public\Logo.jpg" (
        echo ✓ Logo.jpg already in public folder
    ) else (
        echo ✗ Logo.jpg not found!
    )
)

echo.

REM Move Watermark.jpg
if exist "Watermark.jpg" (
    echo Moving Watermark.jpg to public folder...
    move /Y "Watermark.jpg" "public\"
    echo ✓ Watermark.jpg moved successfully
) else (
    if exist "public\Watermark.jpg" (
        echo ✓ Watermark.jpg already in public folder
    ) else (
        echo ✗ Watermark.jpg not found!
    )
)

echo.
echo ========================================
echo  Setup Complete!
echo ========================================
echo.
echo Your logo files are now in the correct location.
echo You can now run: npm run dev
echo.
pause
