# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('relationships', '0008_auto_20150717_2028'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='order',
            name='id_paid',
        ),
        migrations.RemoveField(
            model_name='order',
            name='is_active',
        ),
        migrations.RemoveField(
            model_name='order',
            name='is_done',
        ),
        migrations.RemoveField(
            model_name='order',
            name='is_fail',
        ),
        migrations.AddField(
            model_name='order',
            name='status',
            field=models.CharField(default=b'', max_length=100, verbose_name='\u0421\u0442\u0430\u0442\u0443\u0441', choices=[(b'id_paid', b'\xd0\x9e\xd0\xbf\xd0\xbb\xd0\xb0\xd1\x87\xd0\xb5\xd0\xbd\xd0\xbe'), (b'is_active', b'\xd0\x92 \xd0\xbf\xd1\x80\xd0\xbe\xd1\x86\xd0\xb5\xd1\x81\xd1\x81\xd0\xb5'), (b'is_fail', b'\xd0\x9e\xd1\x82\xd0\xbd\xd0\xbe\xd1\x88\xd0\xb5\xd0\xbd\xd0\xb8\xd1\x8f \xd0\xbf\xd1\x80\xd0\xb5\xd1\x80\xd0\xb2\xd0\xb0\xd0\xbd\xd1\x8b')]),
        ),
    ]
