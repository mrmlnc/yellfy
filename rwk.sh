#!/bin/bash
# Raptorius Web Kit [Console Utility]
# This script simplifies the work with task Manager Grunt.js.

# ----------------------------------------
# Helpers
# ----------------------------------------

# The anticipation of pressing any key.
sayWait()
{
  local AMSURE
  [ -n "$1" ] && echo "$@" 1>&2
  read -n 1 -p "(press any key to continue)" AMSURE
  echo "" 1>&2
}

# Reminder about the need administrator rights to run the command.
sayRoot()
{
  if [[ $EUID -ne 0 ]]; then
    echo " This is the first run Raptorius Web Kit [Console Utility]"
    echo " You need to install the Grunt-CLI."
    echo " Installation requires administrator rights."
    echo " Please run this script with administrator rights." 1>&2
    echo
    exit 1
  fi
}

# Start Grunt with parameters
sayParameters()
{
  echo
  echo -n " Parameters: "
  read conf
  echo

  grunt $conf
}


# ----------------------------------------
# Views
# ----------------------------------------

# Display banner
viewBanner()
{
  clear
  echo
  echo ========================================
  echo " Raptorius Web Kit [Console Utility]"
  echo " Version: 0.3.3"
  echo ========================================
  echo
}

# Display help
viewHelp()
{
  viewBanner
  echo " Actions:"
  echo
  echo ----------------------------------------
  echo " rwk -w - Start Grunt"
  echo " rwk -p - Start Grunt with parameters"
  echo " rwk -b - Building project"
  echo " rwk -css - Processing styles"
  echo " rwk -js - Processing scripts"
  echo " rwk -img - Processing images"
  echo " rwk -html - Processing service files"
  echo ----------------------------------------
  echo " rwk -i - Install dependencies"
  echo " rwk -c - Cleaning build directory"
  echo " rwk -cmd - Start CMD"
  echo ----------------------------------------
  echo
}


# ----------------------------------------
# Verifying system requirements
# ----------------------------------------

# Grunt-Cli
installGruntCli()
{
  viewBanner

  echo " The Grunt-CLI is not installed."
  echo " Install now?"
  echo
  echo -n " ([Y] Yes | [N] No): "
  read cli
  echo

  if [ "$cli" == "Y" ] || [ "$cli" == "y" ]; then
    viewBanner
    npm i -g grunt-cli
    sayWait
  else
    exit
  fi
}

# Dependencies
installProjectDependencies()
{
  viewBanner

  echo " The dependencies are not installed."
  echo " Install now?"
  echo
  echo -n " ([Y] Yes | [N] No): "
  read node
  echo

  if [ "$node" == "Y" ] || [ "$node" == "y" ]; then
    viewBanner
    npm i
    sayWait
  else
    exit
  fi
}



# ----------------------------------------
# The elimination of the incompatibility
# ----------------------------------------

checkInstallDependencies()
{
  if ! [ -d /usr/lib/node_modules/grunt-cli/ ]; then
    viewBanner
    sayRoot
    installGruntCli
  fi

  if ! [ -d /${PWD}/node_modules/ ]; then
    installProjectDependencies
  fi
}


# ----------------------------------------
# Shell
# ----------------------------------------

checkInstallDependencies
viewHelp

selection=
  until [ "$selection" = "exit" ]; do
    echo -n "Enter selection: "
    read selection
    echo
    case $selection in
      -w ) viewBanner; grunt ;;
      -p ) viewBanner; sayParameters ;;
      -b ) viewBanner; grunt build ;;
      -css ) viewBanner; grunt pre-styles ;;
      -js ) viewBanner; grunt pre-scripts ;;
      -img ) viewBanner; grunt pre-images ;;
      -html ) viewBanner; grunt pre-html ;;
      -i ) viewBanner; npm i ;;
      -c ) viewBanner; grunt clean:build ;;
      -cmd ) viewBanner; free ;;
      exit ) clear; exit ;;
      * ) viewHelp
    esac

    sayWait
    viewHelp
  done
