# Snapshot file
# Unset all aliases to avoid conflicts with functions
# Functions
gawklibpath_append () 
{ 
    [ -z "$AWKLIBPATH" ] && AWKLIBPATH=`gawk 'BEGIN {print ENVIRON["AWKLIBPATH"]}'`;
    export AWKLIBPATH="$AWKLIBPATH:$*"
}
gawklibpath_default () 
{ 
    unset AWKLIBPATH;
    export AWKLIBPATH=`gawk 'BEGIN {print ENVIRON["AWKLIBPATH"]}'`
}
gawklibpath_prepend () 
{ 
    [ -z "$AWKLIBPATH" ] && AWKLIBPATH=`gawk 'BEGIN {print ENVIRON["AWKLIBPATH"]}'`;
    export AWKLIBPATH="$*:$AWKLIBPATH"
}
gawkpath_append () 
{ 
    [ -z "$AWKPATH" ] && AWKPATH=`gawk 'BEGIN {print ENVIRON["AWKPATH"]}'`;
    export AWKPATH="$AWKPATH:$*"
}
gawkpath_default () 
{ 
    unset AWKPATH;
    export AWKPATH=`gawk 'BEGIN {print ENVIRON["AWKPATH"]}'`
}
gawkpath_prepend () 
{ 
    [ -z "$AWKPATH" ] && AWKPATH=`gawk 'BEGIN {print ENVIRON["AWKPATH"]}'`;
    export AWKPATH="$*:$AWKPATH"
}

# setopts 3
set -o braceexpand
set -o hashall
set -o interactive-comments

# aliases 0

# exports 47
declare -x CLAUDE_CODE_ENABLE_CFC="false"
declare -x CLAUDE_CODE_SSE_PORT="24382"
declare -x CODEX_HOME="/home/warrick/Dev/WS-Portfolio-New/.codex"
declare -x CODEX_MANAGED_BY_NPM="1"
declare -x COLORTERM="truecolor"
declare -x DBUS_SESSION_BUS_ADDRESS="unix:path=/run/user/1000/bus"
declare -x DISPLAY=":0"
declare -x ENABLE_IDE_INTEGRATION="true"
declare -x GEMINI_CLI_IDE_AUTH_TOKEN="b0341837-7baf-4987-9a98-0ed7521a8cf3"
declare -x GEMINI_CLI_IDE_SERVER_PORT="37845"
declare -x GEMINI_CLI_IDE_WORKSPACE_PATH="/home/warrick/Dev/WS-Portfolio-New"
declare -x GIT_ASKPASS="/home/warrick/.vscode-server/bin/cfbea10c5ffb233ea9177d34726e6056e89913dc/extensions/git/dist/askpass.sh"
declare -x GK_GL_ADDR="http://127.0.0.1:39601"
declare -x GK_GL_PATH="/tmp/gitkraken/gitlens/gitlens-ipc-server-1016-39601.json"
declare -x HOME="/home/warrick"
declare -x HOSTTYPE="x86_64"
declare -x LANG="C.UTF-8"
declare -x LESSCLOSE="/usr/bin/lesspipe %s %s"
declare -x LESSOPEN="| /usr/bin/lesspipe %s"
declare -x LOGNAME="warrick"
declare -x LS_COLORS="rs=0:di=01;34:ln=01;36:mh=00:pi=40;33:so=01;35:do=01;35:bd=40;33;01:cd=40;33;01:or=40;31;01:mi=00:su=37;41:sg=30;43:ca=00:tw=30;42:ow=34;42:st=37;44:ex=01;32:*.tar=01;31:*.tgz=01;31:*.arc=01;31:*.arj=01;31:*.taz=01;31:*.lha=01;31:*.lz4=01;31:*.lzh=01;31:*.lzma=01;31:*.tlz=01;31:*.txz=01;31:*.tzo=01;31:*.t7z=01;31:*.zip=01;31:*.z=01;31:*.dz=01;31:*.gz=01;31:*.lrz=01;31:*.lz=01;31:*.lzo=01;31:*.xz=01;31:*.zst=01;31:*.tzst=01;31:*.bz2=01;31:*.bz=01;31:*.tbz=01;31:*.tbz2=01;31:*.tz=01;31:*.deb=01;31:*.rpm=01;31:*.jar=01;31:*.war=01;31:*.ear=01;31:*.sar=01;31:*.rar=01;31:*.alz=01;31:*.ace=01;31:*.zoo=01;31:*.cpio=01;31:*.7z=01;31:*.rz=01;31:*.cab=01;31:*.wim=01;31:*.swm=01;31:*.dwm=01;31:*.esd=01;31:*.avif=01;35:*.jpg=01;35:*.jpeg=01;35:*.mjpg=01;35:*.mjpeg=01;35:*.gif=01;35:*.bmp=01;35:*.pbm=01;35:*.pgm=01;35:*.ppm=01;35:*.tga=01;35:*.xbm=01;35:*.xpm=01;35:*.tif=01;35:*.tiff=01;35:*.png=01;35:*.svg=01;35:*.svgz=01;35:*.mng=01;35:*.pcx=01;35:*.mov=01;35:*.mpg=01;35:*.mpeg=01;35:*.m2v=01;35:*.mkv=01;35:*.webm=01;35:*.webp=01;35:*.ogm=01;35:*.mp4=01;35:*.m4v=01;35:*.mp4v=01;35:*.vob=01;35:*.qt=01;35:*.nuv=01;35:*.wmv=01;35:*.asf=01;35:*.rm=01;35:*.rmvb=01;35:*.flc=01;35:*.avi=01;35:*.fli=01;35:*.flv=01;35:*.gl=01;35:*.dl=01;35:*.xcf=01;35:*.xwd=01;35:*.yuv=01;35:*.cgm=01;35:*.emf=01;35:*.ogv=01;35:*.ogx=01;35:*.aac=00;36:*.au=00;36:*.flac=00;36:*.m4a=00;36:*.mid=00;36:*.midi=00;36:*.mka=00;36:*.mp3=00;36:*.mpc=00;36:*.ogg=00;36:*.ra=00;36:*.wav=00;36:*.oga=00;36:*.opus=00;36:*.spx=00;36:*.xspf=00;36:*~=00;90:*#=00;90:*.bak=00;90:*.crdownload=00;90:*.dpkg-dist=00;90:*.dpkg-new=00;90:*.dpkg-old=00;90:*.dpkg-tmp=00;90:*.old=00;90:*.orig=00;90:*.part=00;90:*.rej=00;90:*.rpmnew=00;90:*.rpmorig=00;90:*.rpmsave=00;90:*.swp=00;90:*.tmp=00;90:*.ucf-dist=00;90:*.ucf-new=00;90:*.ucf-old=00;90:"
declare -x NAME="Infinity"
declare -x NVM_BIN="/home/warrick/.nvm/versions/node/v24.12.0/bin"
declare -x NVM_CD_FLAGS=""
declare -x NVM_DIR="/home/warrick/.nvm"
declare -x NVM_INC="/home/warrick/.nvm/versions/node/v24.12.0/include/node"
declare -x PATH="/home/warrick/.local/bin:/home/warrick/Dev/WS-Portfolio-New/.codex/tmp/arg0/codex-arg0M5rgiH:/home/warrick/.nvm/versions/node/v24.12.0/lib/node_modules/@openai/codex/node_modules/@openai/codex-linux-x64/vendor/x86_64-unknown-linux-musl/path:/home/warrick/.vscode-server/data/User/globalStorage/github.copilot-chat/debugCommand:/home/warrick/.vscode-server/data/User/globalStorage/github.copilot-chat/copilotCli:/home/warrick/.vscode-server/bin/cfbea10c5ffb233ea9177d34726e6056e89913dc/bin/remote-cli:/home/warrick/.local/bin:/home/warrick/.nvm/versions/node/v24.12.0/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games:/usr/lib/wsl/lib:/mnt/c/Users/Warrick Smith/AppData/Local/Programs/Microsoft VS Code:/mnt/c/WINDOWS/system32:/mnt/c/WINDOWS:/mnt/c/WINDOWS/System32/Wbem:/mnt/c/WINDOWS/System32/WindowsPowerShell/v1.0/:/mnt/c/WINDOWS/System32/OpenSSH/:/Docker/host/bin:/mnt/c/Users/Warrick Smith/AppData/Local/Microsoft/WindowsApps:/mnt/c/Users/Warrick Smith/AppData/Local/Programs/Microsoft VS Code/bin:/mnt/c/Users/Warrick Smith/AppData/Local/Programs/Antigravity/bin:/snap/bin"
declare -x PULSE_SERVER="unix:/mnt/wslg/PulseServer"
declare -x SHELL="/bin/bash"
declare -x SHLVL="2"
declare -x TERM="xterm-256color"
declare -x TERM_PROGRAM="vscode"
declare -x TERM_PROGRAM_VERSION="1.113.0"
declare -x USER="warrick"
declare -x VSCODE_GIT_ASKPASS_EXTRA_ARGS=""
declare -x VSCODE_GIT_ASKPASS_MAIN="/home/warrick/.vscode-server/bin/cfbea10c5ffb233ea9177d34726e6056e89913dc/extensions/git/dist/askpass-main.js"
declare -x VSCODE_GIT_ASKPASS_NODE="/home/warrick/.vscode-server/bin/cfbea10c5ffb233ea9177d34726e6056e89913dc/node"
declare -x VSCODE_GIT_IPC_HANDLE="/run/user/1000/vscode-git-5defcc853b.sock"
declare -x VSCODE_IPC_HOOK_CLI="/run/user/1000/vscode-ipc-af9a0d4a-da1e-49fc-88ab-0e7adc92955d.sock"
declare -x VSCODE_PYTHON_AUTOACTIVATE_GUARD="1"
declare -x WAYLAND_DISPLAY="wayland-0"
declare -x WSL2_GUI_APPS_ENABLED="1"
declare -x WSLENV="VSCODE_WSL_EXT_LOCATION/up"
declare -x WSL_DISTRO_NAME="Ubuntu-24.04"
declare -x WSL_INTEROP="/run/WSL/1004_interop"
declare -x XDG_DATA_DIRS="/usr/local/share:/usr/share:/var/lib/snapd/desktop"
declare -x XDG_RUNTIME_DIR="/run/user/1000/"
