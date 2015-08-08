# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('relationships', '0013_subject'),
    ]

    operations = [
        migrations.AlterField(
            model_name='announcement',
            name='subject',
            field=models.ForeignKey(to='relationships.Subject'),
        ),
    ]
