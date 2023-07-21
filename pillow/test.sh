#!/bin/bash
source /vpy3/bin/activate
cd /Pillow
make clean
make install-coverage
python3 -c "from PIL import Image"
/usr/bin/xvfb-run -a pytest -vx --cov PIL --cov-report term Tests