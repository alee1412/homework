import os
import csv

filepath = os.path.join("budget_data_1.csv")

#Total Months
with open(filepath, newline="") as csvfile:
    csvreader = csv.reader(csvfile, delimiter=",")

    print("Financial Analysis")
    print("**************************************")

    total_months = []

    for row in csvreader:
        total_months.append(row[0]) 

    months = (len(total_months) - 1)
    print("Total Months: " + str(months) + " Months")

#Total Revenue
with open(filepath, newline="") as csvfile:
    csvreader = csv.reader(csvfile, delimiter=",")

    total_revenue = 0

    for revenue in csvreader:
        if revenue[1] != "Revenue":
            total_revenue = total_revenue + int(revenue[1])
    print("Total Revenue: " + "$" + str(total_revenue))

#Average Change in revenue
with open(filepath, newline="") as csvfile:
    csvreader = csv.reader(csvfile, delimiter=",")

    average_change = []

    for row in csvreader:
        average_change.append(row[1])
    average_change.pop(0)
    average_change = list(map(int, average_change))
    #print(average_change)
    
    new_change = []
    change = 0
    
    for items in range(len(average_change)-1):
        new_change.append(average_change[change + 1] - average_change[change])
        change = change + 1
    #print(new_change)

    average_monthly_change = sum(new_change)/len(new_change)
    print("Average Revenue Change: " + "$" + str(average_monthly_change))

#Greatest increase in revenue (date and month)

    #print(new_change)
    i = len(new_change)

    def largest(new_change, i):
        return max(new_change)

    print("Greatest Increase in Revenue: " + "$" + str(largest(new_change, i)))

#Greatest decrease in revenue (date and month)
    
    #print(new_change)
    d = len(new_change)

    def lowest(new_change, d):
        return min(new_change)

    print("Greatest Decrease in Revenue: " + "$" + str(lowest(new_change, d)))

#Exporting to txt file

text_file = open("Main.txt", "w")
text_file.write("Financial Analysis \n")
text_file.write("**************************** \n")
text_file.write("Total Months: " + str(months) + " Months \n")
text_file.write("Average Revenue Change: " + "$" + str(average_monthly_change) + " \n")
text_file.write("Greatest Increase in Revenue: " + "$" + str(largest(new_change, i)) + " \n")
text_file.write("Greatest Decrease in Revenue: " + "$" + str(lowest(new_change, d)))