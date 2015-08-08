# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0012_auto_20150716_0156'),
        ('relationships', '0005_comments'),
    ]

    operations = [
        migrations.CreateModel(
            name='Offer',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('date', models.DateTimeField(auto_now_add=True)),
                ('student', models.ForeignKey(to='authentication.StudentProfile')),
                ('teacher', models.ForeignKey(to='authentication.TeacherProfile')),
            ],
        ),
    ]
