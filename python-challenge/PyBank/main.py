import os
import csv

filepath = os.path.join("budget_data_1.csv")

#Total Months
with open(filepath, newline="") as csvfile:
    csvreader = csv.reader(csvfile, delimiter=",")

    months = []

    for row in csvreader:
        months.append(row[0]) 

    #print(months)
    a = (len(months) - 1)
    print(a)

#Total Revenue
with open(filepath, newline="") as csvfile:
    csvreader = csv.reader(csvfile, delimiter=",")

    amount = 0

    for total in csvreader:
        if total[1] != "Revenue":
            amount = amount + int(total[1])
    print(amount)

#Average Change in revenue
with open(filepath, newline="") as csvfile:
    csvreader = csv.reader(csvfile, delimiter=",")

    change = []

    for row in csvreader:
        change.append(row[1])
    change.pop(0)
    change = list(map(int, change))
    print (change)
    
    new = []
    j = 0
    for items in range(len(change)-1):
        new.append(change[j + 1] - change[j])
        j = j + 1
    print(new)

    average_change = []
    average_change = new/a
    print(average_change)
#Greatest increase in revenue (date and month)
#with open(filepath, newline="") as csvfile:
   # csvreader = csv.reader(csvfile, delimiter=",")

#Greatest decrease in revenue (date and month)
#with open(filepath, newline="") as csvfile:
    #csvreader = csv.reader(csvfile, delimiter=",")