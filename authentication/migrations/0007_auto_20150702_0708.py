# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0006_teacherprofile_foto'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='teacherprofile',
            name='foto',
        ),
        migrations.AddField(
            model_name='teacherprofile',
            name='photo',
            field=models.ImageField(default='', upload_to=b'teachers_photo'),
            preserve_default=False,
        ),
    ]
