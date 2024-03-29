# Generated by Django 4.2.4 on 2023-08-16 11:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0002_user_is_verified_token'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='token',
            name='is_used',
        ),
        migrations.AddField(
            model_name='token',
            name='used_at',
            field=models.DateTimeField(help_text='The expiration date of the token', null=True),
        ),
    ]
