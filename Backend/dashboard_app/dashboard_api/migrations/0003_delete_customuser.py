# Generated by Django 5.1.1 on 2024-09-24 12:32

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('dashboard_api', '0002_customuser'),
    ]

    operations = [
        migrations.DeleteModel(
            name='CustomUser',
        ),
    ]
