from time import sleep

from celery import current_task

from .celery_app import celery_app


@celery_app.task(acks_late=True)
def test_task():
    pass