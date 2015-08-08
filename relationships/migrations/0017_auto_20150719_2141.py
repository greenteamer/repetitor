# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('relationships', '0016_announcement_teacher'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='announcement',
            name='teacher',
        ),
        migrations.AddField(
            model_name='offer',
            name='announcement',
            field=models.ManyToManyField(to='relationships.Announcement'),
        ),
    ]
