Var SystemDrive

!include nsDialogs.nsh
!include LogicLib.nsh

!macro customInstall

!macroend


!macro preInit
    ReadEnvStr $SystemDrive ProgramFiles
    SetRegView 64
    WriteRegExpandStr HKLM "${INSTALL_REGISTRY_KEY}" InstallLocation "$SystemDrive\Electron React Webpack"
    WriteRegExpandStr HKCU "${INSTALL_REGISTRY_KEY}" InstallLocation "$SystemDrive\Electron React Webpack"
    SetRegView 32
    WriteRegExpandStr HKLM "${INSTALL_REGISTRY_KEY}" InstallLocation "$SystemDrive\Electron React Webpack"
    WriteRegExpandStr HKCU "${INSTALL_REGISTRY_KEY}" InstallLocation "$SystemDrive\Electron React Webpack"
!macroend

