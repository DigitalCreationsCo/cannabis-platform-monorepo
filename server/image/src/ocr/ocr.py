import easyocr
reader = easyocr.Reader(['th','en'])

bounds = reader.readtext('identification.png')
bounds