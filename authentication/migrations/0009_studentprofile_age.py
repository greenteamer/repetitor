# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0008_auto_20150702_0717'),
    ]

    operations = [
        migrations.AddField(
            model_name='studentprofile',
            name='age',
            field=models.IntegerField(default=12),
            preserve_default=False,
        ),
    ]
