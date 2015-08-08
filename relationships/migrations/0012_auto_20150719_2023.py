# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('relationships', '0011_announcement'),
    ]

    operations = [
        migrations.RenameField(
            model_name='announcement',
            old_name='clarification',
            new_name='text',
        ),
    ]
