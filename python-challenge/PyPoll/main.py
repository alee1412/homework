import os
import csv

filepath = os.path.join("election_data_1.csv")

print("Election Results")
print("************************************")

#total votes
with open(filepath, newline="") as csvfile:
    csvreader = csv.reader(csvfile, delimiter=",")

    total_votes = []

    for row in csvreader:
        total_votes.append(row[0]) 
    
    all_votes = len(total_votes) - 1

    print("Total Votes: " + str(len(total_votes) - 1))

    print("************************************")
#List of candidates
with open(filepath, newline="") as csvfile:
    csvreader = csv.reader(csvfile, delimiter=",")

    candidate_list = []

    for row in csvreader:
        if row[2] in candidate_list:
            pass
        else:
            candidate_list.append(row[2])
    candidate_list.remove("Candidate")
    #print(candidate_list)

first_candidate = candidate_list[0]
second_candidate = candidate_list[1]
third_candidate = candidate_list[2]
fourth_candidate = candidate_list[3]

#Total number of votes each candidate won
with open(filepath, newline="") as csvfile:
    csvreader = csv.reader(csvfile, delimiter=",")

    candidate_0 = 0
    candidate_1 = 0
    candidate_2 = 0
    candidate_3 = 0

    for total in csvreader:
        if total[2] == candidate_list[0]:
            candidate_0 = candidate_0 + 1
        elif total[2] == candidate_list[1]:
            candidate_1 = candidate_1 + 1
        elif total[2] == candidate_list[2]:
            candidate_2 = candidate_2 + 1
        elif total[2] == candidate_list[3]:
            candidate_3 = candidate_3 + 1

#Percentage of votes each candidate won
with open(filepath, newline="") as csvfile:
    csvreader = csv.reader(csvfile, delimiter=",")

    percentage = round(int(candidate_0)/int(all_votes) * 100, 2)
    percentage1 = round(int(candidate_1)/int(all_votes) * 100, 2)
    percentage2 = round(int(candidate_2)/int(all_votes) * 100, 2)
    percentage3 = round(int(candidate_3)/int(all_votes) * 100, 2)

#Winner

print(first_candidate + ": " + str(percentage) + "% " + " (" + str(candidate_0) + ")")
print(second_candidate + ": " + str(percentage1) + "% " + " (" + str(candidate_1) + ")")
print(third_candidate + ": " + str(percentage2) + "% " + " (" + str(candidate_2) + ")")
print(fourth_candidate + ": " + str(percentage3) + "% " + " (" + str(candidate_3) + ")")

print("************************************")

winner = [percentage, percentage1, percentage2, percentage3]
if max(winner) == percentage:
    print("Winner: " + first_candidate)
elif max(winner) == percentage1:
    print("Winner: " + second_candidate)
elif max(winner) == percentage1:
    print("Winner: " + third_candidate)
elif max(winner) == percentage1:
    print("Winner: " + fourth_candidate)
