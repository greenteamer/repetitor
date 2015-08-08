# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('relationships', '0009_auto_20150717_2035'),
    ]

    operations = [
        migrations.AddField(
            model_name='offer',
            name='is_mutate',
            field=models.BooleanField(default=False),
        ),
        migrations.AlterField(
            model_name='order',
            name='status',
            field=models.CharField(default=b'', max_length=100, verbose_name='\u0421\u0442\u0430\u0442\u0443\u0441', choices=[(b'is_active', b'\xd0\xa3\xd1\x87\xd0\xb5\xd0\xbd\xd0\xb8\xd0\xba \xd0\xbf\xd1\x80\xd0\xb8\xd0\xbd\xd1\x8f\xd1\x82'), (b'is_canseled', b'\xd0\x9e\xd1\x82\xd0\xba\xd0\xb0\xd0\xb7 \xd0\xbe\xd1\x82 \xd1\x83\xd1\x87\xd0\xb5\xd0\xbd\xd0\xb8\xd0\xba\xd0\xb0'), (b'id_paid', b'\xd0\xa3\xd1\x81\xd0\xbf\xd0\xb5\xd1\x88\xd0\xbd\xd1\x8b\xd0\xb5 \xd0\xbe\xd1\x82\xd0\xbd\xd0\xbe\xd1\x88\xd0\xb5\xd0\xbd\xd0\xb8\xd1\x8f'), (b'is_fail', b'\xd0\x9e\xd1\x82\xd0\xbd\xd0\xbe\xd1\x88\xd0\xb5\xd0\xbd\xd0\xb8\xd1\x8f \xd0\xbf\xd1\x80\xd0\xb5\xd1\x80\xd0\xb2\xd0\xb0\xd0\xbd\xd1\x8b')]),
        ),
    ]
