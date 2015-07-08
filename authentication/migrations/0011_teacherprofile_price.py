# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0010_auto_20150703_1127'),
    ]

    operations = [
        migrations.AddField(
            model_name='teacherprofile',
            name='price',
            field=models.IntegerField(default=1000),
            preserve_default=False,
        ),
    ]
