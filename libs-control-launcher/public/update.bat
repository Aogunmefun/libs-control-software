
cd %1
curl http://3.15.145.129/release/release.zip --output ../../release/release.zip
curl http://3.15.145.129/release/info.json --output ../../release/info.json
@REM curl http://3.15.145.129/release/release.zip --output %1\release\release.zip
@REM cd ../../release
@REM tar -xf release.zip
@REM tar -xf release.zip
@REM echo \release\release.zip
@REM echo %1