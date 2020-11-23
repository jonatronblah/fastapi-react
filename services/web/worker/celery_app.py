import os

from celery import Celery



celery_app = Celery(
    "worker",
    backend="redis://redis:6379/0",
    broker="redis://redis:6379/0"
)
celery_app.conf.imports = celery_app.conf.imports + ("worker.tasks",)

