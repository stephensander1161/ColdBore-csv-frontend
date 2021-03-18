import os
import numpy as np
import pandas as pd
import psycopg2
from decouple import config


#find csv files in my current working directory
#isolate only the csv files
csv_files = []
for file in os.listdir(os.getcwd()):
  if file.endswith('.csv'):
    csv_files.append(file)

print(csv_files)


#make a new directory
dataset_dir = 'datasets'

#create the bash command to make a new directory
#mkdir dataset_dir

try:
  mkdir = 'mkdir {0}'.format(dataset_dir)
  os.system(mkdir)
except:
  pass

#move the csv files into the new directory
#mv filename directory
for csv in csv_files:
  mv_file = "move {0} {1}".format(csv, dataset_dir)
  os.system(mv_file)
  print(mv_file)


data_path = os.getcwd()+'/'+dataset_dir+'/'

df = {}
for file in csv_files:
  try:
    df[file] = pd.read_csv(data_path+file)
  except UnicodeDecodeError:
    df[file] = pd.read_csv(data_path+file, encoding="ISO-8859-1")
  print(file)

#clean table and header names
#lower case letters
#remove all white spaces
#replace -, /, \\, $ with _

for k in csv_files:

  dataframe = df[k]

  clean_tbl_name = k.lower().replace(" ","_").replace("?","") \
                  .replace("-","_").replace(r"/","_").replace("\\","_").replace("%","") \
                  .replace(")","").replace(r"(","_").replace("$","")

  #remove .csv extension from clean_tbl_name
  tbl_name = '{0}'.format(clean_tbl_name.split('.')[0])

  dataframe.columns = [x.lower().replace(" ","_").replace("?","") \
              .replace("-","_").replace(r"/","_").replace("\\","_").replace("%","") \
              .replace(")","").replace(r"(","_").replace("$","") for x in dataframe.columns]

  #replacement dictionary that maps pandas dtypes to sql dtypes
  replacements = {
  'object': 'varchar',
  'float64': 'float',
  'int64': 'int',
  'datetime64': 'timestamp',
  'timedelta64[ns]': 'varchar'
  }
  #table schema
  col_str = ", ".join("{} {}".format(n, d) for (n, d) in zip(dataframe.columns, dataframe.dtypes.replace(replacements)))

  #open a db connection
  conn_string = config('CONN_STRING')
  conn = psycopg2.connect(conn_string)
  cursor = conn.cursor()
  print('opened DB Successfully')

  #drop tables with the same name
  cursor.execute("drop table if exists %s;" % (tbl_name))

  #create table
  cursor.execute("create table %s (%s);" % (tbl_name, col_str))
  print('{0} was created successfully'.format(tbl_name))

  #insert values to table
  #save df to csv
  dataframe.to_csv(k, header=dataframe.columns, index=False, encoding='utf-8')

  #open the csv file, save it as an object, and upload to the db
  my_file = open(k)
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
  cursor.execute("grant select on table %s to public" % tbl_name)
  conn.commit()

  cursor.close()
  print('table {0} imported to db completed'.format(tbl_name))

#for loop end message
print('all tables have been successfully imported into the DB')
