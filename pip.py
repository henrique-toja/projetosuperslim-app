for /F "delims=" %i in ('pip freeze') do pip uninstall -y %i