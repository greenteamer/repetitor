# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0004_auto_20150630_1907'),
    ]

    operations = [
        migrations.AddField(
            model_name='account',
            name='patronymic',
            field=models.CharField(default='', max_length=40, blank=True),
            preserve_default=False,
        ),
    ]
