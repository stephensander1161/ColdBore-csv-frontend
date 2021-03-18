import csv
import os
import numpy as np
import pandas as pd
import psycopg2
from decouple import config
import time


#open a db connection
conn_string = config('CONN_STRING')
conn = psycopg2.connect(conn_string)
cursor = conn.cursor()

#drop tables with the same name
cursor.execute("drop table if exists %s;" % ('coins'))

#create table
cursor.execute("create table coins (date VARCHAR(255), txvolume_usd VARCHAR(255), adjustedtxvolume VARCHAR(255), txcount VARCHAR(255), marketcap VARCHAR(255), price_usd VARCHAR(255), exchangevolume VARCHAR(255), generatedcoins VARCHAR(255), fees VARCHAR(255), activeaddresses VARCHAR(255), averagedifficulty VARCHAR(255), paymentcount VARCHAR(255), mediantxvalue VARCHAR(255), medianfee VARCHAR(255), blocksize VARCHAR(255), blockcount VARCHAR(255));")
print('table was created successfully')

with open('test.csv', newline='') as csvfile:
  reader = csv.reader(csvfile, delimiter=' ', quotechar='|')
  for row in reader:
    cursor.execute("INSERT INTO coins " + \
        "(date, txvolume_usd, adjustedtxvolume, txcount, marketcap, price_usd, exchangevolume, generatedcoins, fees, activeaddresses, averagedifficulty, paymentcount, mediantxvalue, medianfee, blocksize, blockcount) " + \
        "VALUES ('{0}', '{1}', '{2}', '{3}', '{4}', '{5}', '{6}', '{7}', '{8}', '{9}', '{10}', '{11}', '{12}', '{13}', '{14}', '{15}')".format(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15))

    #make public
    cursor.execute("grant select on table coins to public")
    conn.commit()

    time.sleep(5)
    print('im in the loop')



