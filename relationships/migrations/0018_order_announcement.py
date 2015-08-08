# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('relationships', '0017_auto_20150719_2141'),
    ]

    operations = [
        migrations.AddField(
            model_name='order',
            name='announcement',
            field=models.ManyToManyField(to='relationships.Announcement'),
        ),
    ]
