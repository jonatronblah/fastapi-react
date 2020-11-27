from worker.celery_app import celery_app

'''
@celery_app.task
def my_task(msg):
    print(msg)
  
msg = "hello there!"
  
celery_app.conf.beat_schedule = {
    # test to send email every min
    'test-schedule': {
        'task': 'worker.tasks.my_task',
        'schedule': 10.0,
        'args': ([msg])
    },
}
'''