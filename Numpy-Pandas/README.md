
# Heroes Of Pymoli Data Analysis

Males purchase the most in game items in Heroes of Pymoli. However, females have purchased more expensive items on average. This may be explained because 82.03% of the population is male and 16.08% are female. 

The majority of players, regardless of gender, are between the ages of 20-24. Which is roughly 41.79% of population falls between that age group. The next two popular age groups is 15-19, which is at 17.54%, and 25-29 which has 16.25% of the population. Meaning 75.58% of their population falls between 15-29. 

The majority of purchases occurs in the age group of 20-24. That average purchase price is $3.02 with that age group collectively spending $108.89. There is one outlier as the age group of 40+ and 35-39 had a higher average purchase, however their total purchases and purchase count were on the lower end. With their only being one purchase in the 40+ age group.



```python
import pandas as pd
import numpy as np
```

# Player Count


```python
player_csv = "Generators/HeroesOfPymoli/generated_data/players_complete.csv"
player_df = pd.read_csv(player_csv)
player_df.head()
```


```python
#player_df.count()
```


```python
count = player_df['Player ID'].count()
#count
```


```python
total_count = pd.DataFrame({"Total Players": [count]})
total_count
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>Total Players</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>1163</td>
    </tr>
  </tbody>
</table>
</div>



# Gender Demographics


```python
#Gender Count
gender_count = player_df["Gender"].value_counts()
#gender_count
```


```python
#Male Count & Percentage 
male_count = gender_count['Male']
#print(male_count)
male_count_percent = male_count/count*100
#print(male_count_percent)
```


```python
#Female Count & Percentage
female_count = gender_count['Female']
#print(female_count)
female_count_percent = female_count/count*100
#print(female_count_percent)
```


```python
#Other / Non-Disclosued Count & Percentage
other_count = gender_count['Other / Non-Disclosed']
#print(other_count)
other_count_percent = other_count/count*100
#print(other_count_percent)
```


```python
#Gender DataFrame
gender_df = pd.DataFrame({" ": ["Male", "Female", "Other / Non-Disclosed"],
                         "Percentage of Players": [male_count_percent, female_count_percent, other_count_percent],
                         "Total Count": [male_count, female_count, other_count]})
#Formatting
gender_df["Percentage of Players"] = gender_df["Percentage of Players"].map("{:.2f}%".format)
gender_df
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th></th>
      <th>Percentage of Players</th>
      <th>Total Count</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>Male</td>
      <td>82.03%</td>
      <td>954</td>
    </tr>
    <tr>
      <th>1</th>
      <td>Female</td>
      <td>16.08%</td>
      <td>187</td>
    </tr>
    <tr>
      <th>2</th>
      <td>Other / Non-Disclosed</td>
      <td>1.89%</td>
      <td>22</td>
    </tr>
  </tbody>
</table>
</div>




```python
#Purchasing Analysis (Total)
purchase_csv = "generated_data/purchase_data_3.csv"
items_csv = "generated_data/items_complete.csv"
purchase_df = pd.read_csv(purchase_csv)
items_df = pd.read_csv(items_csv)
#purchase_df.head()
```


```python
#Unique Items
unique_items = items_df["Item Name"].value_counts()
unique_items
num_unique = len(unique_items)
#num_unique
```


```python
#Average Price
average_price = items_df["Price"].mean()
#average_price
```


```python
#Number of Purchases
purchases = purchase_df["Purchase ID"].count()
#purchases
```


```python
#Total Revenue
Revenue = purchase_df["Price"].sum()
#Revenue
```


```python
#Purchase DataFrame
Purchase_analysis = pd.DataFrame({"Number of Unique Items": [num_unique],
                                 "Average Price": [average_price],
                                 "Number of Purchases": [purchases],
                                 "Total Revenue": [Revenue]})
#Re-organize
organized_purchase = Purchase_analysis [["Number of Unique Items", "Average Price", "Number of Purchases", "Total Revenue"]]
#Formatting
organized_purchase["Average Price"] = organized_purchase["Average Price"].map("${:.2f}".format)
organized_purchase["Total Revenue"] = organized_purchase["Total Revenue"].map("${:,.2f}".format)

organized_purchase
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>Number of Unique Items</th>
      <th>Average Price</th>
      <th>Number of Purchases</th>
      <th>Total Revenue</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>186</td>
      <td>$2.89</td>
      <td>78</td>
      <td>$228.10</td>
    </tr>
  </tbody>
</table>
</div>



# Gender Purchasing Analysis


```python
#purchase_df.head()
#Male Purchases
male_purchase = purchase_df.loc[purchase_df["Gender"] == "Male"]
male_purchase_count = male_purchase['Purchase ID'].count()
male_purchase_average = male_purchase['Price'].mean()
male_purchase_total = male_purchase['Price'].sum()
male_normalized_total = male_purchase['Price'].sum()/count
#male_normalized_total

```


```python
#Female Purchases
female_purchase = purchase_df.loc[purchase_df["Gender"] == "Female"]
female_purchase_count = female_purchase['Purchase ID'].count()
female_purchase_average = female_purchase['Price'].mean()
female_purchase_total = female_purchase['Price'].sum()
female_normalized_total = female_purchase['Price'].sum()/count
#female_normalized_total
```


```python
#Other / Non-Disclosed Purchases
other_purchase = purchase_df.loc[purchase_df["Gender"] == "Other / Non-Disclosed"]
other_purchase_count = other_purchase['Purchase ID'].count()
other_purchase_average = other_purchase['Price'].mean()
other_purchase_total = other_purchase['Price'].sum()
other_normalized_total = other_purchase['Price'].sum()/count
#other_normalized_total
```


```python
#Purchasing Analysis (Gender)
purchase_gender_df = pd.DataFrame({"Gender": ["Female", "Male", "Other / Non-Disclosed"],
                                  "Purchase Count": [female_purchase_count, male_purchase_count, other_purchase_count],
                                  "Average Purchase Price": [female_purchase_average, male_purchase_average, other_purchase_average],
                                  "Total Purchase Value": [female_purchase_total, male_purchase_total, other_purchase_total],
                                  "Normalized Totals": [female_normalized_total, male_normalized_total, other_normalized_total]})
#Re-organize
organized_purchase_gender_df = purchase_gender_df [["Gender", "Purchase Count", "Average Purchase Price", "Total Purchase Value", "Normalized Totals"]]
#Formatting
organized_purchase_gender_df["Average Purchase Price"] = organized_purchase_gender_df["Average Purchase Price"].map("${:,.2f}".format)
organized_purchase_gender_df["Total Purchase Value"] = organized_purchase_gender_df["Total Purchase Value"].map("${:,.2f}".format)
organized_purchase_gender_df["Normalized Totals"] = organized_purchase_gender_df["Normalized Totals"].map("${:,.2f}".format)
organized_purchase_gender_df
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>Gender</th>
      <th>Purchase Count</th>
      <th>Average Purchase Price</th>
      <th>Total Purchase Value</th>
      <th>Normalized Totals</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>Female</td>
      <td>13</td>
      <td>$3.18</td>
      <td>$41.38</td>
      <td>$0.04</td>
    </tr>
    <tr>
      <th>1</th>
      <td>Male</td>
      <td>64</td>
      <td>$2.88</td>
      <td>$184.60</td>
      <td>$0.16</td>
    </tr>
    <tr>
      <th>2</th>
      <td>Other / Non-Disclosed</td>
      <td>1</td>
      <td>$2.12</td>
      <td>$2.12</td>
      <td>$0.00</td>
    </tr>
  </tbody>
</table>
</div>



# Age Demographics (bins)


```python
#player_df
bins = [0, 9, 14, 19, 24, 29, 34, 39, 1000]
age_demographic_label = ["<10", "10-14", "15-19", "20-24", "25-29", "30-34", "35-39", "40+"]

player_df["Total Count"] = pd.cut(player_df["Age"], bins, labels=age_demographic_label) 
#player_df

player_df_count_group = player_df.groupby("Total Count")
#print(player_df_count_group["SN"].count())

#<10
lessthan10 = player_df.loc[player_df["Total Count"] == "<10"]
lessthan10_count = lessthan10["Player ID"].count()
lessthan10_percent = lessthan10["Player ID"].count()/player_df["Player ID"].count()*100

#10-14
ten_to_14 = player_df.loc[player_df["Total Count"] == "10-14"]
ten_to_14_count = ten_to_14["Player ID"].count()
ten_to_14_percent = ten_to_14["Player ID"].count()/player_df["Player ID"].count()*100

#15-19
fifteen_to_19 = player_df.loc[player_df["Total Count"] == "15-19"]
fifteen_to_19_count = fifteen_to_19["Player ID"].count()
fifteen_to_19_percent = fifteen_to_19["Player ID"].count()/player_df["Player ID"].count()*100

#20-24
twenty_to_24 = player_df.loc[player_df["Total Count"] == "20-24"]
twenty_to_24_count = twenty_to_24["Player ID"].count()
twenty_to_24_percent =twenty_to_24["Player ID"].count()/player_df["Player ID"].count()*100

#25-29
twentyfive_to_29 = player_df.loc[player_df["Total Count"] == "25-29"]
twentyfive_to_29_count = twentyfive_to_29["Player ID"].count()
twentyfive_to_29_percent = twentyfive_to_29["Player ID"].count()/player_df["Player ID"].count()*100

#30-34
thirty_to_34 = player_df.loc[player_df["Total Count"] == "30-34"]
thirty_to_34_count = thirty_to_34["Player ID"].count()
thirty_to_34_percent = thirty_to_34["Player ID"].count()/player_df["Player ID"].count()*100

#35-39
thirtyfive_to_39 = player_df.loc[player_df["Total Count"] == "35-39"]
thirtyfive_to_39_count = thirtyfive_to_39["Player ID"].count()
thirtyfive_to_39_percent = thirtyfive_to_39["Player ID"].count()/player_df["Player ID"].count()*100

#40+
fortyplus = player_df.loc[player_df["Total Count"] == "40+"]
fortyplus_count = fortyplus["Player ID"].count()
fortyplus_percent = fortyplus["Player ID"].count()/player_df["Player ID"].count()*100
```


```python
age_demographic_df = pd.DataFrame({" ": ["<10", "10-14", "15-19", "20-24", "25-29", "30-34", "35-39", "40+"],
                                   "Percentage of Players": [lessthan10_percent, ten_to_14_percent, fifteen_to_19_percent, twenty_to_24_percent, twentyfive_to_29_percent, \
                                                            thirty_to_34_percent, thirtyfive_to_39_percent, fortyplus_percent],
                                   "Total Count": [lessthan10_count, ten_to_14_count, fifteen_to_19_count, twenty_to_24_count, twentyfive_to_29_count, thirty_to_34_count, \
                                                  thirtyfive_to_39_count, fortyplus_count]})
#Formatting
age_demographic_df["Percentage of Players"] = age_demographic_df["Percentage of Players"].map("{:.2f}%".format)
age_demographic_df
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th></th>
      <th>Percentage of Players</th>
      <th>Total Count</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>&lt;10</td>
      <td>4.47%</td>
      <td>52</td>
    </tr>
    <tr>
      <th>1</th>
      <td>10-14</td>
      <td>4.82%</td>
      <td>56</td>
    </tr>
    <tr>
      <th>2</th>
      <td>15-19</td>
      <td>17.54%</td>
      <td>204</td>
    </tr>
    <tr>
      <th>3</th>
      <td>20-24</td>
      <td>41.79%</td>
      <td>486</td>
    </tr>
    <tr>
      <th>4</th>
      <td>25-29</td>
      <td>16.25%</td>
      <td>189</td>
    </tr>
    <tr>
      <th>5</th>
      <td>30-34</td>
      <td>8.17%</td>
      <td>95</td>
    </tr>
    <tr>
      <th>6</th>
      <td>35-39</td>
      <td>5.16%</td>
      <td>60</td>
    </tr>
    <tr>
      <th>7</th>
      <td>40+</td>
      <td>1.81%</td>
      <td>21</td>
    </tr>
  </tbody>
</table>
</div>



# Purchasing Analysis (Age)



```python
#purchase_df
bins = [0, 9, 14, 19, 24, 29, 34, 39, 1000]

age_demographic_label = ["<10", "10-14", "15-19", "20-24", "25-29", "30-34", "35-39", "40+"]

purchase_df["Purchase Count"] = pd.cut(purchase_df["Age"], bins, labels=age_demographic_label) 

purchase_df_count_group = purchase_df.groupby("Purchase Count")
#print(purchase_df_count_group["SN"].count())
```


```python
#<10
lessthan10 = purchase_df.loc[purchase_df["Purchase Count"] == "<10"]
lessthan10_count = lessthan10["Purchase ID"].count()
lessthan10_average = lessthan10["Price"].mean()
lessthan10_total = lessthan10["Price"].sum()
lessthan10_normalized = lessthan10["Price"].sum()/count

#10-14
ten_to_14 = purchase_df.loc[purchase_df["Purchase Count"] == "10-14"]
ten_to_14_count = ten_to_14["Purchase ID"].count()
ten_to_14_average = ten_to_14["Price"].mean()
ten_to_14_total = ten_to_14["Price"].sum()
ten_to_14_normalized = ten_to_14["Price"].sum()/count

#15-19
fifteen_to_19 = purchase_df.loc[purchase_df["Purchase Count"] == "15-19"]
fifteen_to_19_count = fifteen_to_19["Purchase ID"].count()
fifteen_to_19_average = fifteen_to_19["Price"].mean()
fifteen_to_19_total = fifteen_to_19["Price"].sum()
fifteen_to_19_normalized = fifteen_to_19["Price"].sum()/count

#20-24
twenty_to_24 = purchase_df.loc[purchase_df["Purchase Count"] == "20-24"]
twenty_to_24_count = twenty_to_24["Purchase ID"].count()
twenty_to_24_average = twenty_to_24["Price"].mean()
twenty_to_24_total = twenty_to_24["Price"].sum()
twenty_to_24_normalized = twenty_to_24["Price"].sum()/count

#25-29
twentyfive_to_29 = purchase_df.loc[purchase_df["Purchase Count"] == "25-29"]
twentyfive_to_29_count = twentyfive_to_29["Purchase ID"].count()
twentyfive_to_29_average = twentyfive_to_29["Price"].mean()
twentyfive_to_29_total = twentyfive_to_29["Price"].sum()
twentyfive_to_29_normalized = twentyfive_to_29["Price"].sum()/count

#30-34
thirty_to_34 = purchase_df.loc[purchase_df["Purchase Count"] == "30-34"]
thirty_to_34_count = thirty_to_34["Purchase ID"].count()
thirty_to_34_average = thirty_to_34["Price"].mean()
thirty_to_34_total = thirty_to_34["Price"].sum()
thirty_to_34_normalized = thirty_to_34["Price"].sum()/count

#35-39
thirtyfive_to_39 = purchase_df.loc[purchase_df["Purchase Count"] == "35-39"]
thirtyfive_to_39_count = thirtyfive_to_39["Purchase ID"].count()
thirtyfive_to_39_average = thirtyfive_to_39["Price"].mean()
thirtyfive_to_39_total = thirtyfive_to_39["Price"].sum()
thirtyfive_to_39_normalized = thirtyfive_to_39["Price"].sum()/count

#40+
fortyplus = purchase_df.loc[purchase_df["Purchase Count"] == "40+"]
fortyplus_count = fortyplus["Purchase ID"].count()
fortyplus_average = fortyplus["Price"].mean()
fortyplus_total = fortyplus["Price"].sum()
fortyplus_normalized = fortyplus["Price"].sum()/count
```


```python
purchasing_analysis_age_df = pd.DataFrame({" ": ["<10", "10-14", "15-19", "20-24", "25-29", "30-34", "35-39", "40+"],
                                            "Purchase Count": [lessthan10_count, ten_to_14_count, fifteen_to_19_count, twenty_to_24_count, twentyfive_to_29_count, \
                                                             thirty_to_34_count, thirtyfive_to_39_count, fortyplus_count],
                                            "Average Purchase Price": [lessthan10_average, ten_to_14_average, fifteen_to_19_average, twenty_to_24_average, \
                                                                     twentyfive_to_29_average, thirty_to_34_average, thirtyfive_to_39_average, fortyplus_average],
                                            "Total Purchase Value": [lessthan10_total, ten_to_14_total, fifteen_to_19_total, twenty_to_24_total, twentyfive_to_29_total, \
                                                                   thirty_to_34_total, thirtyfive_to_39_total, fortyplus_total],
                                            "Normalized Totals": [lessthan10_normalized, ten_to_14_normalized, fifteen_to_19_normalized, twenty_to_24_normalized, \
                                                                 twentyfive_to_29_normalized, thirty_to_34_normalized, thirtyfive_to_39_normalized, fortyplus_normalized]})
#Re-organize
purchasing_analysis_age_df = purchasing_analysis_age_df[[" ", "Purchase Count", "Average Purchase Price", "Total Purchase Value", "Normalized Totals"]]
purchasing_analysis_age_df

#Formatting
purchasing_analysis_age_df["Average Purchase Price"] = purchasing_analysis_age_df["Average Purchase Price"].map("${:,.2f}".format)
purchasing_analysis_age_df["Total Purchase Value"] = purchasing_analysis_age_df["Total Purchase Value"].map("${:,.2f}".format)
purchasing_analysis_age_df["Normalized Totals"] = purchasing_analysis_age_df["Normalized Totals"].map("${:,.2f}".format)
purchasing_analysis_age_df
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th></th>
      <th>Purchase Count</th>
      <th>Average Purchase Price</th>
      <th>Total Purchase Value</th>
      <th>Normalized Totals</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>&lt;10</td>
      <td>5</td>
      <td>$2.76</td>
      <td>$13.82</td>
      <td>$0.01</td>
    </tr>
    <tr>
      <th>1</th>
      <td>10-14</td>
      <td>3</td>
      <td>$2.99</td>
      <td>$8.96</td>
      <td>$0.01</td>
    </tr>
    <tr>
      <th>2</th>
      <td>15-19</td>
      <td>11</td>
      <td>$2.76</td>
      <td>$30.41</td>
      <td>$0.03</td>
    </tr>
    <tr>
      <th>3</th>
      <td>20-24</td>
      <td>36</td>
      <td>$3.02</td>
      <td>$108.89</td>
      <td>$0.09</td>
    </tr>
    <tr>
      <th>4</th>
      <td>25-29</td>
      <td>9</td>
      <td>$2.90</td>
      <td>$26.11</td>
      <td>$0.02</td>
    </tr>
    <tr>
      <th>5</th>
      <td>30-34</td>
      <td>7</td>
      <td>$1.98</td>
      <td>$13.89</td>
      <td>$0.01</td>
    </tr>
    <tr>
      <th>6</th>
      <td>35-39</td>
      <td>6</td>
      <td>$3.56</td>
      <td>$21.37</td>
      <td>$0.02</td>
    </tr>
    <tr>
      <th>7</th>
      <td>40+</td>
      <td>1</td>
      <td>$4.65</td>
      <td>$4.65</td>
      <td>$0.00</td>
    </tr>
  </tbody>
</table>
</div>



# Top Spenders


```python
top_spenders_df = pd.DataFrame(purchase_df)
top_spenders_grouped = top_spenders_df.groupby("SN")

top_spenders_total = top_spenders_grouped["Price"].sum()
top_spenders_count = top_spenders_grouped["Price"].count()
top_spenders_average = top_spenders_grouped["Price"].mean()
```


```python
top_spenders_summary = pd.DataFrame({"Purchase Count": top_spenders_count,
                                "Average Purchase Price": top_spenders_average,
                                "Total Purchase Value": top_spenders_total})

#Formatting
top_spenders_summary["Average Purchase Price"] = top_spenders_summary["Average Purchase Price"].map("${:.2f}".format)
top_spenders_summary["Total Purchase Value"] = top_spenders_summary["Total Purchase Value"].map("${:.2f}".format)
    
top_spenders = top_spenders_summary.sort_values("Total Purchase Value", ascending=False)
top_spenders.iloc[0:5]
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>Average Purchase Price</th>
      <th>Purchase Count</th>
      <th>Total Purchase Value</th>
    </tr>
    <tr>
      <th>SN</th>
      <th></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>Sundaky74</th>
      <td>$3.71</td>
      <td>2</td>
      <td>$7.41</td>
    </tr>
    <tr>
      <th>Aidaira26</th>
      <td>$2.56</td>
      <td>2</td>
      <td>$5.13</td>
    </tr>
    <tr>
      <th>Eusty71</th>
      <td>$4.81</td>
      <td>1</td>
      <td>$4.81</td>
    </tr>
    <tr>
      <th>Chanirra64</th>
      <td>$4.78</td>
      <td>1</td>
      <td>$4.78</td>
    </tr>
    <tr>
      <th>Alarap40</th>
      <td>$4.71</td>
      <td>1</td>
      <td>$4.71</td>
    </tr>
  </tbody>
</table>
</div>



# Most Popular Items


```python
most_popular = pd.DataFrame(purchase_df)
most_popular_grouped = most_popular.groupby(["Item ID", "Item Name"])

most_popular_count = most_popular_grouped["Item ID"].count()
most_popular_total = most_popular_grouped["Price"].sum()
most_popular_price = most_popular_grouped["Price"].sum()/most_popular_grouped["Price"].count()

```


```python
most_popular_summary = pd.DataFrame({"Purchase Count": most_popular_count,
                                    "Item Price": most_popular_price,
                                    "Total Purchase Value": most_popular_total})

#Formatting
most_popular_summary["Item Price"] = most_popular_summary["Item Price"].map("${:.2f}".format)
most_popular_summary["Total Purchase Value"] = most_popular_summary["Total Purchase Value"].map("${:.2f}".format)

most_popular_final = most_popular_summary.sort_values("Purchase Count", ascending=False)
most_popular_final.iloc[0:5]
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th></th>
      <th>Item Price</th>
      <th>Purchase Count</th>
      <th>Total Purchase Value</th>
    </tr>
    <tr>
      <th>Item ID</th>
      <th>Item Name</th>
      <th></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>94</th>
      <th>Mourning Blade</th>
      <td>$3.64</td>
      <td>3</td>
      <td>$10.92</td>
    </tr>
    <tr>
      <th>90</th>
      <th>Betrayer</th>
      <td>$4.12</td>
      <td>2</td>
      <td>$8.24</td>
    </tr>
    <tr>
      <th>111</th>
      <th>Misery's End</th>
      <td>$1.79</td>
      <td>2</td>
      <td>$3.58</td>
    </tr>
    <tr>
      <th>64</th>
      <th>Fusion Pummel</th>
      <td>$2.42</td>
      <td>2</td>
      <td>$4.84</td>
    </tr>
    <tr>
      <th>154</th>
      <th>Feral Katana</th>
      <td>$4.11</td>
      <td>2</td>
      <td>$8.22</td>
    </tr>
  </tbody>
</table>
</div>



# Most Profitable Items


```python
most_profit = pd.DataFrame(purchase_df)
most_profit_grouped = most_profit.groupby(["Item ID", "Item Name"])

most_profit_count = most_profit_grouped["Item ID"].count()
most_profit_total = most_profit_grouped["Price"].sum()
most_profit_price = most_profit_grouped["Price"].sum()/most_profit_grouped["Price"].count()
```


```python
most_profit_summary = pd.DataFrame({"Purchase Count": most_profit_count,
                                    "Item Price": most_profit_price,
                                    "Total Purchase Value": most_profit_total})

most_profit_summary["Item Price"] = most_profit_summary["Item Price"].map("${:.2f}".format)
most_profit_summary["Total Purchase Value"] = most_profit_summary["Total Purchase Value"].map("${:.2f}".format)

most_profit_final = most_profit_summary.sort_values("Total Purchase Value", ascending=False)
most_profit_final.iloc[0:5]
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th></th>
      <th>Item Price</th>
      <th>Purchase Count</th>
      <th>Total Purchase Value</th>
    </tr>
    <tr>
      <th>Item ID</th>
      <th>Item Name</th>
      <th></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>117</th>
      <th>Heartstriker, Legacy of the Light</th>
      <td>$4.71</td>
      <td>2</td>
      <td>$9.42</td>
    </tr>
    <tr>
      <th>93</th>
      <th>Apocalyptic Battlescythe</th>
      <td>$4.49</td>
      <td>2</td>
      <td>$8.98</td>
    </tr>
    <tr>
      <th>90</th>
      <th>Betrayer</th>
      <td>$4.12</td>
      <td>2</td>
      <td>$8.24</td>
    </tr>
    <tr>
      <th>154</th>
      <th>Feral Katana</th>
      <td>$4.11</td>
      <td>2</td>
      <td>$8.22</td>
    </tr>
    <tr>
      <th>180</th>
      <th>Stormcaller</th>
      <td>$2.77</td>
      <td>2</td>
      <td>$5.54</td>
    </tr>
  </tbody>
</table>
</div>


