# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0009_studentprofile_age'),
    ]

    operations = [
        migrations.CreateModel(
            name='Order',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('subject', models.CharField(max_length=100)),
                ('price', models.IntegerField()),
                ('StudentProfile', models.ForeignKey(to='authentication.StudentProfile')),
                ('teacher', models.ForeignKey(to='authentication.TeacherProfile')),
            ],
            options={
            },
            bases=(models.Model,),
        ),
    ]
