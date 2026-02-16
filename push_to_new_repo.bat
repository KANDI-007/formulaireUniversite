@echo off
echo ========================================
echo Push vers KANDI-007/formulaireCite
echo ========================================
echo.
echo Entrez votre Personal Access Token GitHub:
set /p GITHUB_TOKEN=
echo.
echo Poussage du code...
git push https://%GITHUB_TOKEN%@github.com/KANDI-007/formulaireCite.git master
if %ERRORLEVEL% EQU 0 (
    echo.
    echo ========================================
    echo SUCCES! Le code a ete pousse vers GitHub
    echo ========================================
) else (
    echo.
    echo ========================================
    echo ERREUR lors du push
    echo ========================================
)
pause

