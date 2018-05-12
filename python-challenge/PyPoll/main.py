import os
import csv

filepath = os.path.join("election_data_1.csv")

#total votes
with open(filepath, newline="") as csvfile:
    csvreader = csv.reader(csvfile, delimiter=",")

    total_votes = []

    for row in csvreader:
        total_votes.append(row[0]) 

    print(len(total_votes) - 1)

#List of candidates

    candidates = []

    for row in csvreader:
        candidates.pop(0)
        candidates.append(row[2])
        candidates.pop(0)
