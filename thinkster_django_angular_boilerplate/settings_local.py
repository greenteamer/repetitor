# File for storing custom settings
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql', # Add 'postgresql_psycopg2', 'mysql', 'sqlite3' or 'oracle'.
        'NAME': 'repetitor_django',                      # Or path to database file if using sqlite3.
        'USER': 'root',                      # Not used with sqlite3.
        'PASSWORD': 'balabas',                  # Not used with sqlite3.
        'HOST': '',                      # Set to empty string for localhost. Not used with sqlite3.
        'PORT': '',                      # Set to empty string for default. Not used with sqlite3.
        # 'TEST_CHARSET': 'UTF8',
        # 'TEST_DEPENDENCIES': ['slave'],
        # 'TEST_DEPENDENCIES': [],
        # 'TEST_MIRROR': 'slave'
    }
}


ADMIN_EMAIL = 'greenteamer@bk.ru'
