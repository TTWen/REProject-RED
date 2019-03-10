# -*- coding: utf-8 -*-
# Generated by Django 1.11.6 on 2019-03-07 17:42
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('hotcommend', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='transaction_record',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('user_id', models.CharField(max_length=255)),
                ('item_id', models.CharField(max_length=255)),
                ('rating', models.CharField(blank=True, max_length=100, null=True)),
                ('date', models.CharField(max_length=255)),
            ],
            options={
                'db_table': 'transaction_record',
            },
        ),
    ]
