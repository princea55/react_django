# Generated by Django 3.0.8 on 2020-07-24 04:12

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0012_auto_20200724_0334'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='students',
            name='profile_pic',
        ),
    ]
