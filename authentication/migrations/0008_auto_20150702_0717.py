# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0007_auto_20150702_0708'),
    ]

    operations = [
        migrations.RenameField(
            model_name='teacherprofile',
            old_name='subjec',
            new_name='subject',
        ),
    ]
