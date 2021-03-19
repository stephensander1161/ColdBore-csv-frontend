import csv
import os
import numpy as np
import pandas as pd
import psycopg2
from decouple import config
import time
from tkinter import *
from tkinter import filedialog

def get_file_path():
    global file_path
    # Open and return file path
    file_path= filedialog.askopenfilename(title = "Select A File", filetypes = ((".csv", "*.csv"), (".txt", "*.txt")))
    l1 = Label(window, text = "File path: " + file_path).pack()

window = Tk()
# Creating a button to search the file
b1 = Button(window, text = "Open File", command = get_file_path).pack()
window.mainloop()

df = pd.read_csv(file_path)

filename = os.path.basename(file_path)

clean_tbl_name = filename.lower().replace(" ","_").replace("?","") \
  .replace("-","_").replace(r"/","_").replace("\\","_").replace("%","") \
  .replace(")","").replace(r"(","_").replace("$","")

#remove .csv extension from clean_tbl_name
tbl_name = '{0}'.format(clean_tbl_name.split('.')[0])

#clean header names
#lower case letters
#remove all white spaces
#replace -, /, \\, $ with _

df.columns = [x.lower().replace(" ","_").replace("?","") \
  .replace("-","_").replace(r"/","_").replace("\\","_").replace("%","") \
  .replace(")","").replace(r"(","_").replace("$","") for x in df.columns]


replacements = {
  'object': 'varchar',
  'float64': 'float',
  'int64': 'int',
  'datetime64': 'timestamp',
  'timedelta64[ns]': 'varchar'
}



col_str = ", ".join("{} {}".format(n, d) for (n, d) in zip(df.columns, df.dtypes.replace(replacements)))
print(col_str)



#open a db connection
conn_string = config('CONN_STRING')
conn = psycopg2.connect(conn_string)
cursor = conn.cursor()

#drop tables with the same name
cursor.execute("drop table if exists %s;" % (tbl_name))

#create table
cursor.execute("create table %s (date VARCHAR(255), txvolume_usd VARCHAR(255), adjustedtxvolume VARCHAR(255), txcount VARCHAR(255), marketcap VARCHAR(255), price_usd VARCHAR(255), exchangevolume VARCHAR(255), generatedcoins VARCHAR(255), fees VARCHAR(255), activeaddresses VARCHAR(255), averagedifficulty VARCHAR(255), paymentcount VARCHAR(255), mediantxvalue VARCHAR(255), medianfee VARCHAR(255), blocksize VARCHAR(255), blockcount VARCHAR(255));" % (tbl_name))
print('table was created successfully')
print(tbl_name)
with open(file_path, newline='') as csvfile:
  reader = csv.reader(csvfile)
  next(csvfile)
  for row in reader:
    cursor.execute('''INSERT INTO %s (date, txvolume_usd, adjustedtxvolume, txcount, marketcap, price_usd, exchangevolume, generatedcoins, fees, activeaddresses, averagedifficulty, paymentcount, mediantxvalue, medianfee, blocksize, blockcount) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)''' % (tbl_name, row[0], row[1], row[2], row[3], row[4],row[5], row[6], row[7], row[8], row[9], row[10], row[11], row[12], row[13], row[14], row[15]))

    #make public
    cursor.execute('''grant select on table %s to public''' % (tbl_name))
    conn.commit()

    time.sleep(1)
    print('im in the loop')



