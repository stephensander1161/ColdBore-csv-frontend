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
  df = pd.read_csv(file_path)
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
  #remove datatypes for record insert
  lst = []
  for idx, word in enumerate(col_str.split()):
      if idx % 2 == 0:
          lst.append(word)
          lst.append(",")
  lst = lst[:-1]
  cols = " ".join(lst)
  insert_data()

def insert_data():
  #create table
  cursor.execute("create table IF NOT EXISTS %s (%s);" % (tbl_name, col_str))
  l1 = Label(window, font=("Raleway", 15), text = "Table " + tbl_name + " Was Created Successfully", padx=15, pady=15)
  l1.grid(column=1, row=3)


  with open(file_path, newline='') as csvfile:
    reader = csv.reader(csvfile)
    next(csvfile)
    for row in reader:
      print(row)
      cursor.execute("INSERT INTO %s (%s) \
        VALUES (%%s, %%s, %%s, %%s, %%s, %%s, %%s, %%s, %%s, %%s, %%s, %%s, %%s, %%s, %%s, %%s)" \
        % (tbl_name, cols), row[:16])
      time.sleep(1)
      #make public
      cursor.execute('''grant select on table %s to public''' % (tbl_name))
      conn.commit()


      print('im in the loop')

#currently not used in program
def drop_table_if_exists():
  #drop tables with the same name
  cursor.execute("drop table if exists %s;" % (tbl_name))

def get_file_path():
    global file_path
    browse_text.set("Loading...")
    # Open and return file path
    file_path= filedialog.askopenfilename(title = "Select A File", filetypes = ((".csv", "*.csv"), (".txt", "*.txt")))
    l1 = Label(window, font=("Raleway", 15), text = "File path: " + file_path, padx=15, pady=15)
    l1.grid(column=1, row=2)
    browse_text.set("Replace")

def exit_program():
  sys.exit()

def close_window():
  window.destroy()

#set up gui window
window = tk.Tk()

connect_to_db()

canvas = tk.Canvas(window, width=600, height=100)
canvas.grid(columnspan=3, rowspan=3)

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
browse_text.set("Browse")
browse_btn.grid(column=0, row=1)

#accept button
accept_text = tk.StringVar()
accept_btn = tk.Button(window, textvariable=accept_text, font="Raleway", bg="#20bebe", fg="white", height=2, width=15, command = define_table_values)
accept_text.set("Accept")
accept_btn.grid(column=1, row=1)

#cancel button
cancel_text = tk.StringVar()
cancel_btn = tk.Button(window, textvariable=cancel_text, font="Raleway", bg="#20bebe", fg="white", height=2, width=15, command = exit_program)
cancel_text.set("Close")
cancel_btn.grid(column=2, row=1)


canvas = tk.Canvas(window, width=600, height=100)
canvas.grid(columnspan=3)

window.mainloop()
