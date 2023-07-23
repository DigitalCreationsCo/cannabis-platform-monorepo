import argparse
# import easyocr

def read_image(image):
    print("hello")
    print(image)
    binary_image = image.encode("utf-8")
    print(binary_image)
    # reader = easyocr.Reader(['th','en'])

    # # read file from args
    # # bounds = reader.readtext(image)

    # # read file from path
    # bounds = reader.readtext('identification.png')
    # print(bounds)

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Process an image.")
    parser.add_argument("image", help="Image File Data")
    args = parser.parse_args()

    read_image(args.image)