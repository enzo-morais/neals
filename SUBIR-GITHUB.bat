@echo off
title NEALS STREET - Subir no GitHub
cd /d "%~dp0"
set REPO=https://github.com/enzo-morais/neals.git

where git >nul 2>nul
if not %errorlevel%==0 (
    echo.
    echo  Git nao encontrado. Instale em https://git-scm.com/download/win e rode de novo.
    echo.
    pause
    exit /b
)

if not exist ".git" (
    echo  Primeira vez: preparando o repositorio...
    git init
    git branch -M main
    git remote add origin %REPO%
)

git remote set-url origin %REPO%
git add -A

set MSG=Atualiza site %date% %time:~0,5%
if not "%~1"=="" set MSG=%~1
git diff --cached --quiet && (
    echo  Nada novo pra enviar.
) || (
    git commit -m "%MSG%"
)

echo.
echo  Baixando o que mudou no GitHub (se tiver)...
git pull --rebase origin main

echo.
echo  Enviando pro GitHub... (se pedir login, entre com a conta enzo-morais)
git push -u origin main
if %errorlevel%==0 (
    echo.
    echo  PRONTO! Se o projeto ja estiver ligado na Vercel, o site atualiza sozinho em ~1 minuto.
) else (
    echo.
    echo  Deu erro no envio. Veja a mensagem acima.
)
echo.
pause
