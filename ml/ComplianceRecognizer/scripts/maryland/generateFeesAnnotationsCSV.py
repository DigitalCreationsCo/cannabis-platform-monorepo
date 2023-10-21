import csv 
import os

if not os.path.exists("ml/ComplianceRecognizer/annotations/maryland"):
    os.makedirs("ml/ComplianceRecognizer/annotations/maryland")

with open("ml/ComplianceRecognizer/annotations/maryland/fees.csv", "w", encoding="utf-8") as csv_file:
    csv_writer = csv.writer(csv_file)
    csv_writer.writerow(["File", "Line", "Begin Offset", "End Offset", "Type"])
    csv_writer.writerow(["maryland/fees.txt", 0, 0, 12, "TITLE"])
    csv_writer.writerow(["maryland/fees.txt", 38, 23, 29, "DISPENSARY_APPLICATION_FEE"])
    csv_writer.writerow(["maryland/fees.txt", 38, 40, 46, "DISPENSARY_APPLICATION_FEE"])
    csv_writer.writerow(["maryland/fees.txt", 38, 57, 63, "DISPENSARY_APPLICATION_FEE"])
    csv_writer.writerow(["maryland/fees.txt", 40, 26, 33, "DISPENSARY_ANNUAL_FEE"])
    csv_writer.writerow(["maryland/fees.txt", 44, 24, 28, "DISPENSARY_AGENT_FEE"])
    csv_writer.writerow(["maryland/fees.txt", 46, 43, 47, "DISPENSARY_AGENT_REPLACEMENT_CARD_FEE"])
    csv_writer.writerow(["maryland/fees.txt", 82, 24, 28, "ANCILLARY_BUSINESS_APPLICATION_FEE"])
    csv_writer.writerow(["maryland/fees.txt", 84, 19, 23, "ANCILLARY_BUSINESS_ANNUAL_FEE"])
    csv_writer.writerow(["maryland/fees.txt", 88, 24, 28, "ANCILLARY_BUSINESS_AGENT_FEE"])
    csv_writer.writerow(["maryland/fees.txt", 90, 43, 47, "ANCILLARY_BUSINESS_AGENT_REPLACEMENT_CARD_FEE"])