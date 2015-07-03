# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0003_studentprofile_teacherprofile'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='account',
            name='tagline',
        ),
        migrations.AddField(
            model_name='account',
            name='phone',
            field=models.CharField(default='', max_length=11, blank=True),
            preserve_default=False,
        ),
    ]
