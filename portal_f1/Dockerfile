FROM python:3.10


COPY manage.py requirements.txt .env ./
COPY core core
COPY core_access core_access
COPY core_log core_log
COPY core_pages core_pages
COPY core_registration core_registration
COPY staticfiles staticfiles
COPY applications applications
COPY gunicorn/gunicorn-cfg.py gunicorn-cfg.py


RUN pip install -r requirements.txt

WORKDIR .
CMD ["gunicorn", "--config", "gunicorn-cfg.py", "core.wsgi"]
