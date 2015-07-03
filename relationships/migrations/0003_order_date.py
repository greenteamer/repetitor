# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import datetime
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('relationships', '0002_auto_20150703_1150'),
    ]

    operations = [
        migrations.AddField(
            model_name='order',
            name='date',
            field=models.DateTimeField(default=datetime.datetime(2015, 7, 3, 11, 53, 30, 794388, tzinfo=utc), auto_now_add=True),
            preserve_default=False,
        ),
    ]
