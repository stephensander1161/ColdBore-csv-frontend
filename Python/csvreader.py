import csv
import os
import numpy as np
import pandas as pd
import psycopg2
from decouple import config
import time
from tkinter import *
from tkinter import filedialog
from PIL import Image, ImageTk
import tkinter as tk
import sys

def connect_to_db():
  #open a db connection
  global cursor
  global conn
  conn_string = config('CONN_STRING')
  conn = psycopg2.connect(conn_string)
  cursor = conn.cursor()
  l1 = Label(window, font=("Raleway", 15), text = "Connected to Database", padx=15, pady=15)
  l1.grid(column=1, row=4)

def define_table_values():
  global tbl_name
  global cols
  global col_str
  try:
    df = pd.read_csv(file_path)
    df = df[df.date != '2009-02-10']


    filename = os.path.basename(file_path)
    clean_tbl_name = filename.lower().replace(" ","_").replace("?","") \
      .replace("-","_").replace(r"/","_").replace("\\","_").replace("%","") \
      .replace(")","").replace(r"(","_").replace("$","")
    #remove .csv extension from clean_tbl_name
    tbl_name = '{0}'.format(clean_tbl_name.split('.')[0])

    #clean header names, lower case letters, remove all white spaces, replace -, /, \\, $ with _
    df.columns = [x.lower().replace(" ","_").replace("?","") \
      .replace("-","_").replace(r"/","_").replace("\\","_").replace("%","") \
      .replace(")","").replace(r"(","_").replace("$","") for x in df.columns]
    replacements = {
      'object': 'varchar',
      'float64': 'float',
      'int64': 'int',
      'datetime64': 'timestamp',
      'timedelta64[ns]': 'varchar',
      'double': 'varchar'
    }

    #get cols with datatypes for table creation
    col_str = ", ".join("{} {}".format(n, d) for (n, d) in zip(df.columns, df.dtypes.replace(replacements)))
    print(col_str)
    #remove datatypes for record insert
    lst = []
    for idx, word in enumerate(col_str.split()):
        if idx % 2 == 0:
            lst.append(word)
            lst.append(",")
    lst = lst[:-1]
    cols = " ".join(lst)
    insert_data()
  except:
    l1 = Label(window, font=("Raleway", 15), text = "Please Select a File First!", padx=15, pady=15)
    l1.grid(column=1, row=5)

def define_table_values_bulk():
  global tbl_name
  global cols
  global col_str
  global df
  global tbl_name
  try:
    df = pd.read_csv(file_path)
    #df["txvolume_usd"].fillna("bye", inplace = True)

    filename = os.path.basename(file_path)
    clean_tbl_name = filename.lower().replace(" ","_").replace("?","") \
      .replace("-","_").replace(r"/","_").replace("\\","_").replace("%","") \
      .replace(")","").replace(r"(","_").replace("$","")
    #remove .csv extension from clean_tbl_name
    tbl_name = '{0}'.format(clean_tbl_name.split('.')[0])
    #clean header names, lower case letters, remove all white spaces, replace -, /, \\, $ with _
    df.columns = [x.lower().replace(" ","_").replace("?","") \
      .replace("-","_").replace(r"/","_").replace("\\","_").replace("%","") \
      .replace(")","").replace(r"(","_").replace("$","") for x in df.columns]
    replacements = {
      'object': 'varchar',
      'float64': 'float',
      'int64': 'int',
      'datetime64': 'timestamp',
      'timedelta64[ns]': 'varchar',
    }


    #get cols with datatypes for table creation
    col_str = ", ".join("{} {}".format(n, d) for (n, d) in zip(df.columns, df.dtypes.replace(replacements)))
    print(col_str)
    #remove datatypes for record insert
    lst = []
    for idx, word in enumerate(col_str.split()):
        if idx % 2 == 0:
            lst.append(word)
            lst.append(",")
    lst = lst[:-1]
    cols = " ".join(lst)
    insert_data_bulk()
  except:
    l1 = Label(window, font=("Raleway", 15), text = "Please Select a File First!", padx=15, pady=15)
    l1.grid(column=1, row=5)

def insert_data():
  drop_table_if_exists()
  #create table
  cursor.execute("create table IF NOT EXISTS %s (%s);" % (tbl_name, col_str))

  with open(file_path, newline='') as csvfile:
    reader = csv.reader(csvfile)
    next(csvfile)
    for row in reader:
      #print(row)
      if all(row):
        cursor.execute("INSERT INTO %s (%s) \
          VALUES (%%s, %%s, %%s, %%s, %%s, %%s, %%s, %%s, %%s, %%s, %%s, %%s, %%s, %%s, %%s, %%s)" \
          % (tbl_name, cols), row[:16])
        time.sleep(1)
        #make public
        cursor.execute('''grant select on table %s to public''' % (tbl_name))
        conn.commit()

        print('im in the loop')


def insert_data_bulk():
  drop_table_if_exists()
  #create table
  cursor.execute("create table %s (%s);" % (tbl_name, col_str))
  print('{0} was created successfully'.format(tbl_name))
  df.to_csv(file_path, header=df.columns, index=False, encoding='utf-8')
  #open the csv file, save it as an object, and upload to the db
  my_file = open(file_path)
  print('file opened in memory')

  #upload to db
  SQL_STATEMENT = """
  COPY %s FROM STDIN WITH
    CSV
    HEADER
    DELIMITER AS ','
  """

  cursor.copy_expert(sql=SQL_STATEMENT % tbl_name, file = my_file)

  print(' file copied to db')
  #make public
  cursor.execute('''grant select on table %s to public''' % (tbl_name))
  conn.commit()

  print('im in the loop')
  l1 = Label(window, font=("Raleway", 15), text = "Table {0} Created".format(tbl_name), padx=15, pady=15)
  l1.grid(column=1, row=5)









def drop_table_if_exists():
  #drop tables with the same name
  cursor.execute("drop table if exists %s;" % (tbl_name))

def get_file_path():
    global file_path
    browse_text.set("Loading...")
    # Open and return file path
    file_path= filedialog.askopenfilename(title = "Select A File", filetypes = ((".csv", "*.csv"), (".txt", "*.txt")))
    l1 = Label(window, font=("Raleway", 15), text = "File path: " + file_path, padx=15, pady=15)
    l1.grid(column=1, row=3)
    browse_text.set("Replace")

def exit_program():
  cursor.close()
  conn.close()
  sys.exit()

def close_window():
  window.destroy()

#set up gui window
window = tk.Tk()

connect_to_db()

canvas = tk.Canvas(window, width=600, height=100)
canvas.grid(columnspan=3, rowspan=5)

#logo
logo = Image.open('logo_small.png')
logo = ImageTk.PhotoImage(logo)
logo_label = tk.Label(image=logo)
logo_label.image = logo
logo_label.grid(column=1, row=0)

#instructions
instructions = tk.Label(window, text="Select a CSV on your computer to upload to the Database", padx=15, font=("Raleway", 32))
instructions.grid(columnspan=3, column=0, row =0)

#browse button
browse_text = tk.StringVar()
browse_btn = tk.Button(window, textvariable=browse_text, font="Raleway", bg="#20bebe", fg="white", height=2, width=15, command = get_file_path)
browse_text.set("1. Browse")
browse_btn.grid(column=0, row=1)

#create button
create_text = tk.StringVar()
create_btn = tk.Button(window, textvariable=create_text, font="Raleway", bg="#20bebe", fg="white", height=2, width=15, command = define_table_values)
create_text.set("2. Create")
create_btn.grid(column=1, row=1)
#Drop table if exists button
bulk_import_text = tk.StringVar()
bulk_import_btn = tk.Button(window, textvariable=bulk_import_text, font="Raleway", bg="#20bebe", fg="white", height=2, width=15, command = define_table_values_bulk)
bulk_import_text.set("Bulk Import")
bulk_import_btn.grid(column=1, row=2)

#cancel button
cancel_text = tk.StringVar()
cancel_btn = tk.Button(window, textvariable=cancel_text, font="Raleway", bg="#20bebe", fg="white", height=2, width=15, command = exit_program)
cancel_text.set("3. Close")
cancel_btn.grid(column=2, row=1)


canvas = tk.Canvas(window, width=600, height=100)
canvas.grid(columnspan=3)

window.mainloop()
