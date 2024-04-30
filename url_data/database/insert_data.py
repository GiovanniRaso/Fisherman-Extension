import os
import django

# Setting up Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'database.settings')
django.setup()

# Importing your model
from database.models import UrlData

# Function to insert data
def insert_url(url, grade):
    new_url = UrlData(url=url, grade=grade)
    new_url.save()
    print(f"URL {url} with grade {grade} inserted successfully.")

# Main section to call the function
if __name__ == '__main__':
    # Example URL and grade
    insert_url('https://www.youtube.com/', 0)