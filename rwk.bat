@Echo Off
@title Raptorius Web Kit [Console Utility]
setlocal EnableExtensions EnableDelayedExpansion


:: ----------------------------------------
:: Shell
:: ----------------------------------------

Call :Checker_install

:Loop
  Call :Action
  pause
GoTo :Loop


:: ----------------------------------------
:: Change action
:: ----------------------------------------

:Action
Call :Banner

Echo Select action:
Echo.
Echo ----------------------------------------
Echo. "rwk -w" - Start Grunt
Echo. "rwk -p" - Start Grunt with parameters
Echo. "rwk -b" - Building project
Echo. "rwk -css" - Processing styles
Echo. "rwk -js" - Processing scripts
Echo. "rwk -img" - Processing images
Echo. "rwk -html" - Processing service files
Echo ----------------------------------------
Echo. "rwk -i" - Install dependencies
Echo. "rwk -c" - Cleaning build directory
Echo. "rwk -cmd" - Start CMD
Echo ----------------------------------------
Echo.

set /p rwk="rwk: "

IF "!rwk!"=="-w" (
  Call :Banner
  grunt
) ELSE IF  "!rwk!"=="-p" (
  Call :Banner
  set /p conf="Parameters: "
  grunt !conf!
) ELSE IF  "!rwk!"=="-i" (
  Call :Banner
  npm i
) ELSE IF  "!rwk!"=="-b" (
  Call :Banner
  grunt build
) ELSE IF  "!rwk!"=="-css" (
  Call :Banner
  grunt styles
) ELSE IF  "!rwk!"=="-js" (
  Call :Banner
  grunt scripts
) ELSE IF  "!rwk!"=="-img" (
  Call :Banner
  grunt images
) ELSE IF  "!rwk!"=="-html" (
  Call :Banner
  grunt html
) ELSE IF  "!rwk!"=="-c" (
  Call :Banner
  grunt clean:build
) ELSE IF  "!rwk!"=="-cmd" (
  Call :Banner
  set /p conf="cmd: "
  !conf!
) ELSE (
  GoTo :Loop
)
GoTo :EOF


:: ----------------------------------------
:: Check install
:: ----------------------------------------
:Checker_install
IF Not Exist %appdata%\npm\node_modules\grunt-cli\NUL (
  Call :Install_grunt
)

IF Not Exist node_modules\NUL (
  Call :Install_dependencies
)
GoTo :EOF


:: ----------------------------------------
:: Install Grunt-CLI
:: ----------------------------------------

:Install_grunt
Call :Banner
Echo The Grunt-CLI is not installed.
Echo Install now?
Echo.

set /p cli="([Y] Yes | [N] No): "
set install=false

IF "!cli!"=="Y" set install=true
IF "!cli!"=="y" set install=true

IF "!install!"=="true" (
  Call :Banner
  npm i -g grunt-cli
) ELSE (
  Exit
)
GoTo :EOF


:: ----------------------------------------
:: Install dependencies
:: ----------------------------------------

:Install_dependencies
Call :Banner
Echo The dependencies are not installed.
Echo Install now?
Echo.

set /p node="([Y] Yes | [N] No): "
set install=false

IF "!node!"=="Y" set install=true
IF "!node!"=="y" set install=true

IF "!install!"=="true" (
  Call :Banner
  npm i
) ELSE (
  Exit
)
pause
GoTo :EOF


:: ----------------------------------------
:: View banner
:: ----------------------------------------

:Banner
cls
Echo.
Echo ========================================
Echo. Raptorius Web Kit [Console Utility]
Echo. Version: 0.3.0
Echo ========================================
Echo.
GoTo :EOF
