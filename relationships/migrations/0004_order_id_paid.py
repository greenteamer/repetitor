# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('relationships', '0003_order_date'),
    ]

    operations = [
        migrations.AddField(
            model_name='order',
            name='id_paid',
            field=models.BooleanField(default=False),
            preserve_default=True,
        ),
    ]
