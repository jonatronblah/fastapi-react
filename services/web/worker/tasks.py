from worker.celery_app import celery_app


@celery_app.task
def my_task():
    pass