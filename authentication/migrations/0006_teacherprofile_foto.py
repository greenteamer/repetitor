# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0005_account_patronymic'),
    ]

    operations = [
        migrations.AddField(
            model_name='teacherprofile',
            name='foto',
            field=models.ImageField(default='', upload_to=b'teachers_foto'),
            preserve_default=False,
        ),
    ]
