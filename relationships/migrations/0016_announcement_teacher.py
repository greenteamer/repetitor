# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0012_auto_20150716_0156'),
        ('relationships', '0015_announcement_date'),
    ]

    operations = [
        migrations.AddField(
            model_name='announcement',
            name='teacher',
            field=models.ManyToManyField(to='authentication.TeacherProfile'),
        ),
    ]
