# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import datetime
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('relationships', '0014_auto_20150719_2041'),
    ]

    operations = [
        migrations.AddField(
            model_name='announcement',
            name='date',
            field=models.DateTimeField(default=datetime.datetime(2015, 7, 19, 21, 15, 23, 806968, tzinfo=utc), auto_now_add=True),
            preserve_default=False,
        ),
    ]
